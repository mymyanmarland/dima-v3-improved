import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";

const IMAGE_STYLES = [
  "Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Anime",
  "3D Render", "Pixel Art", "Cinematic", "Comic Book", "Surrealism",
  "Minimalist", "Fantasy Art", "Concept Art", "Sketch", "Pop Art",
];

const LIGHTING_OPTIONS = [
  "Natural Light", "Golden Hour", "Studio Lighting", "Dramatic",
  "Neon", "Backlit", "Soft Ambient", "Moody Dark",
];

const CAMERA_ANGLES = [
  "Close-up", "Wide Shot", "Bird's Eye", "Low Angle",
  "Eye Level", "Dutch Angle", "Macro", "Panoramic",
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1 Square" },
  { id: "16:9", label: "16:9 Landscape" },
  { id: "9:16", label: "9:16 Portrait" },
  { id: "4:3", label: "4:3 Standard" },
  { id: "3:2", label: "3:2 Photo" },
  { id: "21:9", label: "21:9 Ultra-wide" },
];

const ImagePromptTab = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("Photorealistic");
  const [lighting, setLighting] = useState("Natural Light");
  const [cameraAngle, setCameraAngle] = useState("Eye Level");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateImagePrompt = async () => {
    if (!subject.trim()) {
      toast.error("ဘာပုံမျိုး ဖန်တီးချင်တယ်ဆိုတာ ရေးပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: subject.trim(),
          category: "image-prompt",
          categoryDescription: "Image Generation Prompt",
          tone: "Technical",
          context: `Generate a highly detailed image generation prompt. 
Style: ${style}
Lighting: ${lighting}
Camera Angle: ${cameraAngle}
Aspect Ratio: ${aspectRatio}
${additionalDetails ? `Additional Details: ${additionalDetails}` : ""}
${negativePrompt ? `Things to avoid (negative prompt): ${negativePrompt}` : ""}

IMPORTANT: Output ONLY a single, detailed image generation prompt that can be directly used in AI image generators like Midjourney, DALL-E, or Stable Diffusion. 
Include technical details like resolution quality keywords (8k, ultra HD, masterpiece), style modifiers, composition details, color palette suggestions, and atmosphere/mood descriptors.
Format it as one continuous prompt, not a list. Do not include explanations.`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        toast.success("Image Prompt generated! 🎨✨");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "prompt",
            topic: subject.trim(),
            category: "image-prompt",
          });
        }
      } else {
        throw new Error("Prompt generate မရပါ");
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
      {/* Subject */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          🖼️ ဘာပုံမျိုး ဖန်တီးချင်ပါသလဲ
        </label>
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="ဥပမာ - A dragon flying over a medieval castle, A girl in cyberpunk city..."
          rows={3}
          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
        />
      </div>

      {/* Art Style */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          🎨 Art Style
        </label>
        <div className="flex flex-wrap gap-2">
          {IMAGE_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                style === s
                  ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Lighting */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          💡 Lighting
        </label>
        <div className="flex flex-wrap gap-2">
          {LIGHTING_OPTIONS.map((l) => (
            <button
              key={l}
              onClick={() => setLighting(l)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                lighting === l
                  ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Angle */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          📷 Camera Angle
        </label>
        <div className="flex flex-wrap gap-2">
          {CAMERA_ANGLES.map((c) => (
            <button
              key={c}
              onClick={() => setCameraAngle(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                cameraAngle === c
                  ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Aspect Ratio */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          📐 Aspect Ratio
        </label>
        <div className="flex flex-wrap gap-2">
          {ASPECT_RATIOS.map((ar) => (
            <button
              key={ar.id}
              onClick={() => setAspectRatio(ar.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                aspectRatio === ar.id
                  ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {ar.label}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          📝 ထပ်ဖြည့်ချင်တဲ့ details <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Color palette, mood, texture, background details..."
          rows={2}
          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
        />
      </div>

      {/* Negative Prompt */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          🚫 ပါမစေချင်တာ (Negative Prompt) <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="blurry, low quality, watermark, text..."
          rows={2}
          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateImagePrompt}
        disabled={isLoading || !subject.trim()}
        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-primary"
      >
        {isLoading ? (
          <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4" />
        )}
        Image Prompt Generate လုပ်မယ်
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default ImagePromptTab;
