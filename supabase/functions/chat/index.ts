import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authorization required" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const token = authHeader.replace("Bearer ", "");
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    let userId: string | null = null;

    // Try getUser first
    const { data: { user } } = await adminClient.auth.getUser(token);
    if (user?.id) {
      userId = user.id;
    } else {
      // Fallback: decode JWT to get sub, verify user exists
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

    if (!userId) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get user settings
    const { data: settings } = await adminClient
      .from("user_settings")
      .select("openrouter_model, gemini_model")
      .eq("user_id", userId)
      .maybeSingle();

    const openrouterModel = settings?.openrouter_model || "openai/gpt-4o-mini";
    const geminiModel = settings?.gemini_model || "gemini-2.0-flash";

    // Get user API keys
    const { data: keys } = await adminClient
      .from("user_api_keys")
      .select("api_key, provider")
      .eq("user_id", userId);

    if (!keys || keys.length === 0) {
      return new Response(JSON.stringify({ error: "API Key မထည့်ရသေးပါ။ Settings မှာ API Key ထည့်ပါ။" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemMessage = {
      role: "system",
      content: "You are a friendly and helpful AI assistant. You can chat in any language the user uses, including Myanmar (Burmese). Keep answers clear, concise, and helpful. Use markdown formatting when appropriate.",
    };

    // Try each provider
    for (const keyRow of keys) {
      const apiKey = await decrypt(keyRow.api_key);
      const isGemini = keyRow.provider === "gemini";

      const apiUrl = isGemini
        ? "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
        : OPENROUTER_URL;

      const model = isGemini ? geminiModel : openrouterModel;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            ...(isGemini ? {} : { "HTTP-Referer": "https://kmn-prompt-generator.lovable.app" }),
          },
          body: JSON.stringify({
            model,
            messages: [systemMessage, ...messages],
            stream: true,
          }),
        });

        if (response.ok) {
          return new Response(response.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
          });
        }

        console.warn(`${keyRow.provider} failed [${response.status}]`);
      } catch (err) {
        console.error(`${keyRow.provider} error:`, err);
      }
    }

    return new Response(JSON.stringify({ error: "AI providers အားလုံး fail ဖြစ်နေပါတယ်။ API Key စစ်ပါ။" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
