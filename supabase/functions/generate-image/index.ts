import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ENCRYPTION_PREFIX = "enc:v1:";

async function deriveKey(): Promise<CryptoKey> {
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: encoder.encode("lovable-api-key-encryption-salt"), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function decrypt(encryptedText: string): Promise<string> {
  if (!encryptedText.startsWith(ENCRYPTION_PREFIX)) return encryptedText;
  const base64Data = encryptedText.slice(ENCRYPTION_PREFIX.length);
  const key = await deriveKey();
  const combined = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return new TextDecoder().decode(decrypted);
}

interface ImageApiConfig {
  apiUrl: string;
  apiKey: string;
  source: "gemini" | "openrouter";
}

interface ImageApiResult {
  configs: ImageApiConfig[];
  geminiModel: string;
}

async function getImageApiConfig(authHeader: string | null): Promise<ImageApiResult> {
  const configs: ImageApiConfig[] = [];
  let geminiModel = "gemini-2.0-flash-exp-image-generation";

  if (authHeader) {
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const token = authHeader.replace("Bearer ", "");
      const adminClient = createClient(supabaseUrl, supabaseServiceKey);
      
      let userId: string | null = null;
      const { data: { user } } = await adminClient.auth.getUser(token);
      if (user?.id) {
        userId = user.id;
      } else {
        try {
          const parts = token.split(".");
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
            if (payload.sub && payload.aud === "authenticated") {
              const { data: { user: verified } } = await adminClient.auth.admin.getUserById(payload.sub);
              if (verified?.id) userId = verified.id;
            }
          }
        } catch (e) { console.error("JWT decode failed:", e); }
      }

      if (userId) {
        // Get user's preferred Gemini model for image gen
        const { data: settings } = await adminClient
          .from("user_settings")
          .select("gemini_model")
          .eq("user_id", userId)
          .maybeSingle();

        if (settings?.gemini_model) {
          geminiModel = settings.gemini_model;
        }

        // Gemini API supports image generation natively
        const { data: geminiKey } = await adminClient
          .from("user_api_keys").select("api_key")
          .eq("user_id", userId).eq("provider", "gemini").maybeSingle();

        if (geminiKey?.api_key) {
          const decrypted = await decrypt(geminiKey.api_key);
          configs.push({
            apiUrl: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            apiKey: decrypted,
            source: "gemini",
          });
        }

        // OpenRouter also supports some image models
        const { data: orKey } = await adminClient
          .from("user_api_keys").select("api_key")
          .eq("user_id", userId).eq("provider", "openrouter").maybeSingle();

        if (orKey?.api_key) {
          const decrypted = await decrypt(orKey.api_key);
          configs.push({
            apiUrl: "https://openrouter.ai/api/v1/chat/completions",
            apiKey: decrypted,
            source: "openrouter",
          });
        }
      }
    } catch (err) {
      console.warn("Failed to get user API key:", err);
    }
  }

  if (configs.length === 0) {
    throw new Error("Image generation အတွက် Gemini API Key လိုအပ်ပါတယ်။ Settings မှာ Gemini API Key ထည့်ပါ။");
  }

  return { configs, geminiModel };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || !prompt.trim()) {
      return new Response(JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const authHeader = req.headers.get("Authorization");
    const { configs, geminiModel } = await getImageApiConfig(authHeader);

    let lastError: string | null = null;

    for (const config of configs) {
      console.log(`Generating image via ${config.source} for prompt: "${prompt.substring(0, 50)}..."`);

      try {
        const body: Record<string, unknown> = {
          model: config.source === "gemini" ? geminiModel : "google/gemini-2.5-flash",
          messages: [{ role: "user", content: prompt.trim() }],
        };

        // Gemini API supports modalities for image generation
        if (config.source === "gemini") {
          body.modalities = ["image", "text"];
        }

        const response = await fetch(config.apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
            "Content-Type": "application/json",
            ...(config.source === "openrouter" ? { "HTTP-Referer": "https://kmn-prompt-generator.lovable.app" } : {}),
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`${config.source} image gen failed [${response.status}]:`, errorText);

          if (response.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit exceeded။ ခဏစောင့်ပြီး ပြန်ကြိုးစားပါ။" }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }
          if (response.status === 402) {
            return new Response(JSON.stringify({ error: "API Credits ကုန်သွားပါပြီ။" }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }

          lastError = errorText;
          continue;
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message;
        const finishReason = data.choices?.[0]?.native_finish_reason || data.choices?.[0]?.finish_reason;
        const imageUrl = message?.images?.[0]?.image_url?.url;
        const text = message?.content;

        if (!imageUrl) {
          console.warn("No image in response:", JSON.stringify(data));

          if (text && text.trim()) {
            lastError = text.trim();
            continue;
          }

          if (finishReason === "IMAGE_SAFETY") {
            return new Response(JSON.stringify({ error: "Content safety filter ကြောင့် ဒီပုံကို generate မပေးနိုင်ပါ။ Prompt ကို ပြင်ပြီး ပြန်ကြိုးစားပါ။" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }

          lastError = "Image generate မရပါ";
          continue;
        }

        console.log(`Image generated successfully via ${config.source}`);
        return new Response(JSON.stringify({ imageUrl, text: text || "" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch (fetchErr) {
        console.error(`Fetch error for ${config.source}:`, fetchErr);
        lastError = fetchErr instanceof Error ? fetchErr.message : "Fetch failed";
      }
    }

    return new Response(JSON.stringify({ error: lastError || "Image generate မရပါ။ Prompt ကို ပြင်ပြီး ပြန်ကြိုးစားပါ။" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("generate-image error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
