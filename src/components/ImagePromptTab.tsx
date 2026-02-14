import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
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
  const [isRandomizing, setIsRandomizing] = useState(false);

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const randItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    setStyle(randItem(IMAGE_STYLES));
    setLighting(randItem(LIGHTING_OPTIONS));
    setCameraAngle(randItem(CAMERA_ANGLES));
    setAspectRatio(randItem(ASPECT_RATIOS).id);

    const subjects = ["abandoned space station interior", "bioluminescent deep sea creature", "ancient temple in jungle ruins", "steampunk clockwork city", "crystal cave with underground lake", "floating island above clouds", "cyberpunk street food market", "aurora borealis over volcano", "microscopic cell universe", "post-apocalyptic nature reclaim", "underwater ancient civilization", "magical library with living books", "desert oasis mirage at sunset", "mechanical garden of metal flowers", "parallel dimension portal opening", "ice palace interior with prismatic light", "giant tree city at golden hour", "storm chaser capturing tornado", "zen garden in autumn rain", "forgotten robot in overgrown field"];
    const artStyles = ["Renaissance painting style", "Studio Ghibli dreamscape", "hyperrealistic macro photography", "surrealist Dalí-inspired", "ukiyo-e woodblock print", "art nouveau poster", "brutalist architecture study", "biopunk organic technology", "vaporwave aesthetic", "double exposure photography", "tilt-shift miniature effect", "infrared photography", "cyanotype print process", "pointillism technique", "low-poly 3D render"];
    const seed = `Subject: ${randItem(subjects)}. Style influence: ${randItem(artStyles)}. Seed: ${Math.random().toString(36).slice(2, 8)}`;

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Generate a visually stunning image concept. ${seed}`,
          category: "random-image-idea",
          categoryDescription: "Random Image Idea Generator",
          tone: "Creative",
          context: `You are a visionary digital artist generating UNIQUE image concepts. ${seed}. Generate ONE short (1-2 sentences) SPECIFIC and VIVID image description. Focus on unexpected combinations, dramatic compositions, and emotional impact. Be HIGHLY SPECIFIC about colors, mood, and scene details. Return ONLY the description. No quotes, no explanations.`,
        },
      });
      if (error) throw new Error(error.message);
      if (data?.prompt) {
        setSubject(data.prompt.replace(/^["']|["']$/g, "").trim());
        toast.success("AI generated a random image idea! 🎨✨");
      } else {
        setSubject("A mystical forest with glowing mushrooms and fireflies at twilight");
        toast.success("Random image idea loaded! 🎲");
      }
    } catch {
      setSubject("A mystical forest with glowing mushrooms and fireflies at twilight");
      toast.success("Random image idea loaded! 🎲");
    } finally {
      setIsRandomizing(false);
    }
  };

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
        playSuccessSound();
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

  const chipClass = (active: boolean) =>
    `glossy-chip ${active ? "glossy-chip--active" : ""}`;

  return (
    <div className="space-y-5">
      {/* Header with Random Idea button */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          🖼️ Image Prompt
        </span>
        <button
          onClick={fillRandomIdea}
          disabled={isRandomizing}
          className="ml-auto px-4 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          {isRandomizing ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Generating...
            </span>
          ) : "🎲 Random Idea (AI)"}
        </button>
      </div>

      {/* Subject */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          🖼️ ဘာပုံမျိုး ဖန်တီးချင်ပါသလဲ
        </label>
        <GlowTextarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="ဥပမာ - A dragon flying over a medieval castle, A girl in cyberpunk city..."
          rows={3}
        />
      </div>

      {/* Art Style */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">🎨 Art Style</label>
        <div className="flex flex-wrap gap-2">
          {IMAGE_STYLES.map((s) => (
            <button key={s} onClick={() => setStyle(s)} className={chipClass(style === s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Lighting */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">💡 Lighting</label>
        <div className="flex flex-wrap gap-2">
          {LIGHTING_OPTIONS.map((l) => (
            <button key={l} onClick={() => setLighting(l)} className={chipClass(lighting === l)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Camera Angle */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">📷 Camera Angle</label>
        <div className="flex flex-wrap gap-2">
          {CAMERA_ANGLES.map((c) => (
            <button key={c} onClick={() => setCameraAngle(c)} className={chipClass(cameraAngle === c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Aspect Ratio */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">📐 Aspect Ratio</label>
        <div className="flex flex-wrap gap-2">
          {ASPECT_RATIOS.map((ar) => (
            <button key={ar.id} onClick={() => setAspectRatio(ar.id)} className={chipClass(aspectRatio === ar.id)}>{ar.label}</button>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          📝 ထပ်ဖြည့်ချင်တဲ့ details <span className="text-muted-foreground">(optional)</span>
        </label>
        <GlowTextarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Color palette, mood, texture, background details..."
          rows={2}
        />
      </div>

      {/* Negative Prompt */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          🚫 ပါမစေချင်တာ (Negative Prompt) <span className="text-muted-foreground">(optional)</span>
        </label>
        <GlowTextarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="blurry, low quality, watermark, text..."
          rows={2}
        />
      </div>

      {/* Generate Button */}
      <button onClick={generateImagePrompt} disabled={isLoading || !subject.trim()} className="gen-btn">
        {isLoading && <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
        <span>Image Prompt Generate လုပ်မယ်</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default ImagePromptTab;
