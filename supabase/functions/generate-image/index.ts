import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOVABLE_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

interface ApiConfig {
  apiUrl: string;
  apiKey: string;
  source: string;
}

// Image generation ONLY works via Lovable AI Gateway (supports modalities: ["image", "text"])
// OpenRouter and direct Gemini API do NOT support this feature
function getImageApiConfig(): ApiConfig[] {
  const configs: ApiConfig[] = [];
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

  if (LOVABLE_API_KEY) {
    configs.push({ apiUrl: LOVABLE_URL, apiKey: LOVABLE_API_KEY, source: "lovable" });
  }

  if (configs.length === 0) throw new Error("Image generation requires Lovable AI Gateway. Credits ထပ်ဖြည့်ပါ။");
  return configs;
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

    const configs = getImageApiConfig();
    const config = configs[0];

    console.log(`Generating image for prompt: "${prompt.substring(0, 50)}..." via ${config.source}`);

    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt.trim() }],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI error [${response.status}] (${config.source}):`, errorText);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded။ ခဏစောင့်ပြီး ပြန်ကြိုးစားပါ။" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Lovable AI Credits ကုန်သွားပါပြီ။ Image generation အတွက် Credits ထပ်ဖြည့်ပါ။" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({ error: "Image generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message;
    const finishReason = data.choices?.[0]?.native_finish_reason || data.choices?.[0]?.finish_reason;
    const imageUrl = message?.images?.[0]?.image_url?.url;
    const text = message?.content;

    if (!imageUrl) {
      console.error("No image in AI response:", JSON.stringify(data));
      
      if (text && text.trim()) {
        return new Response(JSON.stringify({ error: text.trim() }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      
      if (finishReason === "IMAGE_SAFETY") {
        return new Response(JSON.stringify({ error: "Content safety filter ကြောင့် ဒီပုံကို generate မပေးနိုင်ပါ။ Prompt ကို ပြင်ပြီး ပြန်ကြိုးစားပါ။" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      
      return new Response(JSON.stringify({ error: "Image generate မရပါ။ Prompt ကို ပြင်ပြီး ပြန်ကြိုးစားပါ။" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    console.log(`Image generated successfully via ${config.source}`);
    return new Response(JSON.stringify({ imageUrl, text: text || "" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("generate-image error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
