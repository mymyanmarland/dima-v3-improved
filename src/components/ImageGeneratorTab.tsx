import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import SizeSelector from "./SizeSelector";
import StyleSelector from "./StyleSelector";

const ImageGeneratorTab = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Random (ကျပန်း)");
  const [size, setSize] = useState("1:1");
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Image description ထည့်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedImage("");
    setGeneratedText("");

    try {
      const fullPrompt = style !== "Random (ကျပန်း)"
        ? `${prompt.trim()}, ${style} style`
        : prompt.trim();

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: fullPrompt },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGeneratedText(data.text || "");
        toast.success("Image generated successfully! 🎨");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "image",
            topic: prompt.trim(),
            category: "image",
          });
        }
      } else {
        throw new Error("Image generate မရပါ");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Prompt */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          အကြောင်းအရာရေးပါ
        </label>
        <GlowTextarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A beautiful sunset over mountains with purple sky, digital art..."
          rows={3}
        />
      </div>

      {/* Size */}
      <SizeSelector selected={size} onChange={setSize} />

      {/* Style */}
      <StyleSelector selected={style} onChange={setStyle} />

      {/* Generate */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={generateImage}
          disabled={isLoading || !prompt.trim()}
          className="py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Prompt မရှိမယ့်
        </button>
        <button
          onClick={generateImage}
          disabled={isLoading || !prompt.trim()}
          className="py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-accent"
        >
          <ImageIcon className="w-4 h-4" />
          Prompt ကိုအကောင်အထည်ဖော်မယ့်
        </button>
      </div>

      {/* Output */}
      <PromptOutput
        prompt={generatedText}
        isLoading={isLoading}
        imageUrl={generatedImage}
        isImageMode
      />
    </div>
  );
};

export default ImageGeneratorTab;
