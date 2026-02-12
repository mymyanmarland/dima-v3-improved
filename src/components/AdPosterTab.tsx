import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import SizeSelector from "./SizeSelector";
import StyleSelector from "./StyleSelector";

const AdPosterTab = () => {
  const { user } = useAuth();
  const [topic, setTopic] = useState("");
  const [size, setSize] = useState("1:1");
  const [style, setStyle] = useState("Professional (ပရော်ဖက်ရှင်နယ်)");
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("ကြော်ငြာ အကြောင်းအရာ ထည့်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedImage("");
    setGeneratedText("");

    try {
      const fullPrompt = `Create a professional advertising poster for: ${topic.trim()}. Style: ${style}. The poster should be visually striking, modern, and suitable for social media advertising.`;

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: fullPrompt },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGeneratedText(data.text || "");
        toast.success("Ad Poster generated! 📢");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "ad_poster",
            topic: topic.trim(),
            category: "ad_poster",
          });
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          ကြော်ငြာ အကြောင်းအရာ
        </label>
        <GlowTextarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Modern coffee shop opening promotion, 50% off all drinks..."
          rows={3}
        />
      </div>

      <SizeSelector selected={size} onChange={setSize} />
      <StyleSelector selected={style} onChange={setStyle} />

      <button
        onClick={generate}
        disabled={isLoading || !topic.trim()}
        className="w-full py-3.5 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-accent"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? "Generating..." : "Generate Ad Poster 📢"}
      </button>

      <PromptOutput prompt={generatedText} isLoading={isLoading} imageUrl={generatedImage} isImageMode />
    </div>
  );
};

export default AdPosterTab;
