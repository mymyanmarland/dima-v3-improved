import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SuggestionField {
  key: string;
  label: string;
  options: string[];
}

export function useAiSuggestion() {
  const [isSuggesting, setIsSuggesting] = useState(false);

  const suggest = async (
    topic: string,
    fields: SuggestionField[]
  ): Promise<Record<string, string> | null> => {
    if (!topic.trim()) {
      toast.error("အကြောင်းအရာ အရင်ရေးထည့်ပါ");
      return null;
    }

    setIsSuggesting(true);

    try {
      const fieldDescriptions = fields
        .map(
          (f) =>
            `"${f.key}": one of [${f.options.map((o) => `"${o}"`).join(", ")}]`
        )
        .join("\n");

      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: topic.trim(),
          category: "ai-suggestion",
          categoryDescription: "AI Auto-Selection System",
          tone: "Technical",
          context: `You are an expert AI that analyzes user input and selects the BEST matching options for each field.

USER INPUT: "${topic.trim()}"

For each field below, pick the SINGLE BEST option that matches the user's input most accurately.

FIELDS:
${fieldDescriptions}

CRITICAL RULES:
- Return ONLY a valid JSON object with the exact field keys
- Each value MUST be exactly one of the provided options (copy the exact string)
- Do NOT add any explanation, markdown, or extra text
- Analyze the user's input carefully and choose the most relevant option for each field
- If unsure, pick the most commonly appropriate option

Example output format:
{${fields.map((f) => `"${f.key}":"${f.options[0]}"`).join(",")}}`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        const raw = data.prompt.trim();
        // Extract JSON from possible markdown code blocks
        const jsonMatch =
          raw.match(/```(?:json)?\s*([\s\S]*?)```/) || raw.match(/(\{[\s\S]*\})/);

        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1].trim());

          // Validate that values are from allowed options
          const result: Record<string, string> = {};
          for (const field of fields) {
            const val = parsed[field.key];
            if (val && field.options.includes(val)) {
              result[field.key] = val;
            } else {
              // Find closest match (case-insensitive)
              const match = field.options.find(
                (o) => o.toLowerCase() === String(val).toLowerCase()
              );
              if (match) result[field.key] = match;
            }
          }

          toast.success("AI က အကောင်းဆုံး ရွေးချယ်မှုတွေ ပြုလုပ်ပေးပြီးပါပြီ! 🤖✨");
          return result;
        }

        throw new Error("AI response format error");
      }

      throw new Error("No response from AI");
    } catch (err) {
      console.error("AI suggestion error:", err);
      toast.error(
        err instanceof Error ? err.message : "AI suggestion error ဖြစ်ပါတယ်"
      );
      return null;
    } finally {
      setIsSuggesting(false);
    }
  };

  return { suggest, isSuggesting };
}
