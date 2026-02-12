import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ENCRYPTION_PREFIX = "enc:v1:";

async function deriveKey(): Promise<CryptoKey> {
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("lovable-api-key-encryption-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(plainText: string): Promise<string> {
  const key = await deriveKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plainText)
  );
  const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return ENCRYPTION_PREFIX + btoa(String.fromCharCode(...combined));
}

async function decrypt(encryptedText: string): Promise<string> {
  if (!encryptedText.startsWith(ENCRYPTION_PREFIX)) {
    return encryptedText;
  }
  const base64Data = encryptedText.slice(ENCRYPTION_PREFIX.length);
  const key = await deriveKey();
  const combined = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}

function maskKey(key: string): string {
  if (key.length <= 8) return "●●●●●●●●";
  return key.slice(0, 4) + "●●●●" + key.slice(-4);
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Authenticate user using multiple approaches for reliability
async function authenticateUser(authHeader: string): Promise<{ id: string } | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const token = authHeader.replace("Bearer ", "");

  // Approach 1: Use service role client with explicit token
  try {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await adminClient.auth.getUser(token);
    if (!error && data?.user?.id) {
      return { id: data.user.id };
    }
    console.warn("Service role getUser failed:", error?.message);
  } catch (e) {
    console.warn("Service role getUser exception:", e);
  }

  // Approach 2: Direct API call to auth endpoint
  try {
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey,
      },
    });
    if (authResponse.ok) {
      const user = await authResponse.json();
      if (user?.id) return { id: user.id };
    }
    console.warn("Direct auth API failed:", authResponse.status);
  } catch (e) {
    console.warn("Direct auth API exception:", e);
  }

  // Approach 3: Use anon client with auth header
  try {
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user } } = await userClient.auth.getUser();
    if (user?.id) return { id: user.id };
    console.warn("Anon client getUser failed");
  } catch (e) {
    console.warn("Anon client getUser exception:", e);
  }

  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const user = await authenticateUser(authHeader);
    if (!user) {
      console.error("All auth approaches failed");
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    console.log(`Authenticated user: ${user.id}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { action, apiKey, provider = "gemini" } = await req.json();

    // Validate provider
    const validProviders = ["gemini", "openrouter"];
    if (!validProviders.includes(provider)) {
      return jsonResponse({ error: "Invalid provider. Use: gemini, openrouter" }, 400);
    }

    switch (action) {
      case "save": {
        if (!apiKey?.trim()) {
          return jsonResponse({ error: "API key is required" }, 400);
        }

        const encryptedKey = await encrypt(apiKey.trim());

        const { data: existing } = await adminClient
          .from("user_api_keys")
          .select("id")
          .eq("user_id", user.id)
          .eq("provider", provider)
          .maybeSingle();

        if (existing) {
          const { error } = await adminClient
            .from("user_api_keys")
            .update({ api_key: encryptedKey })
            .eq("user_id", user.id)
            .eq("provider", provider);
          if (error) throw error;
        } else {
          const { error } = await adminClient
            .from("user_api_keys")
            .insert({ user_id: user.id, api_key: encryptedKey, provider });
          if (error) throw error;
        }

        console.log(`API key saved (encrypted) for user ${user.id}, provider: ${provider}`);
        return jsonResponse({ success: true });
      }

      case "check": {
        const { data } = await adminClient
          .from("user_api_keys")
          .select("api_key")
          .eq("user_id", user.id)
          .eq("provider", provider)
          .maybeSingle();

        if (!data) {
          return jsonResponse({ hasKey: false });
        }

        let decryptedKey: string;

        if (!data.api_key.startsWith(ENCRYPTION_PREFIX)) {
          decryptedKey = data.api_key;
          const encryptedKey = await encrypt(decryptedKey);
          await adminClient
            .from("user_api_keys")
            .update({ api_key: encryptedKey })
            .eq("user_id", user.id)
            .eq("provider", provider);
          console.log(`Migrated plain text key to encrypted for user ${user.id}, provider: ${provider}`);
        } else {
          decryptedKey = await decrypt(data.api_key);
        }

        return jsonResponse({ hasKey: true, maskedKey: maskKey(decryptedKey) });
      }

      case "get": {
        const { data } = await adminClient
          .from("user_api_keys")
          .select("api_key")
          .eq("user_id", user.id)
          .eq("provider", provider)
          .maybeSingle();

        if (!data) {
          return jsonResponse({ hasKey: false });
        }

        const decryptedKey = await decrypt(data.api_key);
        return jsonResponse({ hasKey: true, apiKey: decryptedKey });
      }

      case "delete": {
        const { error } = await adminClient
          .from("user_api_keys")
          .delete()
          .eq("user_id", user.id)
          .eq("provider", provider);
        if (error) throw error;

        console.log(`API key deleted for user ${user.id}, provider: ${provider}`);
        return jsonResponse({ success: true });
      }

      default:
        return jsonResponse({ error: "Invalid action. Use: save, check, get, delete" }, 400);
    }
  } catch (error) {
    console.error("manage-api-key error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
