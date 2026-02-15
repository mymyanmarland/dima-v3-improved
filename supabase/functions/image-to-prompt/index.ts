import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const ENCRYPTION_PREFIX = "enc:v1:";

// Vision-capable free models for image analysis
const VISION_MODELS = [
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "google/gemma-3n-e4b-it:free",
  "stepfun/step-3.5-flash:free",
];

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

interface UserApiConfig {
  apiUrl: string;
  apiKey: string;
  source: "openrouter" | "gemini";
}

interface UserApiResult {
  configs: UserApiConfig[];
  geminiModel: string;
}

async function getUserApiConfig(authHeader: string | null): Promise<UserApiResult> {
  const configs: UserApiConfig[] = [];
  let geminiModel = "gemini-2.0-flash";

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
        // Fallback: decode JWT
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
        // Get user's preferred Gemini model
        const { data: settings } = await adminClient
          .from("user_settings")
          .select("gemini_model")
          .eq("user_id", userId)
          .maybeSingle();

        if (settings?.gemini_model) {
          geminiModel = settings.gemini_model;
        }

        const { data: orKey } = await adminClient
          .from("user_api_keys").select("api_key")
          .eq("user_id", userId).eq("provider", "openrouter").maybeSingle();

        if (orKey?.api_key) {
          const decrypted = await decrypt(orKey.api_key);
          configs.push({ apiUrl: OPENROUTER_URL, apiKey: decrypted, source: "openrouter" });
        }

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
      }
    } catch (err) {
      console.warn("Failed to get user API key:", err);
    }
  }

  if (configs.length === 0) throw new Error("OpenRouter API Key မထည့်ရသေးပါ။ Settings မှာ API Key ထည့်ပါ။");
  return { configs, geminiModel };
}

// Error codes that trigger fallback (auth errors + payment required + rate limit + not found)
const FALLBACK_STATUS_CODES = [400, 401, 402, 403, 404, 429];

interface CallResult {
  success: boolean;
  data?: unknown;
  error?: { status: number; message: string };
  source: string;
  model?: string;
}

async function callAIWithModelFallback(
  configs: UserApiConfig[],
  buildRequest: (config: UserApiConfig, model: string) => { url: string; init: RequestInit }
): Promise<CallResult> {
  let lastError: { status: number; message: string } | undefined;

  for (const config of configs) {
    for (let modelIndex = 0; modelIndex < VISION_MODELS.length; modelIndex++) {
      const model = VISION_MODELS[modelIndex];
      const { url, init } = buildRequest(config, model);

      console.log(`Trying AI call via ${config.source} with model ${model}...`);
      
      try {
        const response = await fetch(url, init);
        const responseText = await response.text();

        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            return { success: true, data, source: config.source, model };
          } catch {
            console.error("Failed to parse successful response:", responseText);
            lastError = { status: 500, message: "Invalid JSON response" };
            continue;
          }
        }

        console.warn(`${config.source} [${model}] failed [${response.status}]: ${responseText}`);
        lastError = { status: response.status, message: responseText };

        // If rate limit (429), payment issue (402), model not found (404), or blocked (403), try next model
        if ((response.status === 429 || response.status === 402 || response.status === 404 || response.status === 403) && modelIndex < VISION_MODELS.length - 1) {
          console.log(`Model issue (${response.status}), trying next model...`);
          continue;
        }

        if (FALLBACK_STATUS_CODES.includes(response.status)) {
          break;
        }

        return { success: false, error: lastError, source: config.source, model };
      } catch (fetchError) {
        console.error(`Fetch error for ${config.source} [${model}]:`, fetchError);
        lastError = { status: 500, message: fetchError instanceof Error ? fetchError.message : "Fetch failed" };
      }
    }
  }

  return { success: false, error: lastError || { status: 500, message: "All AI providers and models failed" }, source: "unknown" };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "Image URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const authHeader = req.headers.get("Authorization");
    const { configs, geminiModel } = await getUserApiConfig(authHeader);

    console.log("Analyzing image to generate prompt...");

    const result = await callAIWithModelFallback(configs, (config, modelToUse) => ({
      url: config.apiUrl,
      init: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          ...(config.source === "openrouter" ? { "HTTP-Referer": "https://kmn-prompt-generator.lovable.app" } : {}),
        },
        body: JSON.stringify({
          model: config.source === "openrouter" ? modelToUse : geminiModel,
          messages: [
            {
              role: "system",
              content: `You are an expert at analyzing images and creating detailed prompts that could recreate them using AI image generators. 

When given an image, analyze it thoroughly and create a comprehensive prompt that captures:
- Subject matter and composition
- Art style, medium, and technique
- Color palette and lighting
- Mood and atmosphere
- Camera angle and perspective
- Background and environment details
- Texture and material details

Return ONLY the prompt text, nothing else. Make it detailed enough to recreate a similar image.`,
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Analyze this image and create a detailed prompt that could recreate it:" },
                { type: "image_url", image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: 1024,
        }),
      },
    }));

    if (!result.success) {
      console.error(`AI error [${result.error?.status}] (${result.source}):`, result.error?.message);

      if (result.error?.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded။ Vision models busy ဖြစ်နေပါတယ်။" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (result.error?.status === 402) {
        return new Response(JSON.stringify({ error: "Credits ကုန်သွားပါပြီ။" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({ error: "Image analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = result.data as { choices?: Array<{ message?: { content?: string } }> };
    const prompt = data.choices?.[0]?.message?.content;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    console.log(`Image-to-prompt generated successfully via ${result.source} using model ${result.model}`);
    return new Response(JSON.stringify({ prompt }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("image-to-prompt error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
