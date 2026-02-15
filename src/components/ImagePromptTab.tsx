import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import AiSuggestButton from "./AiSuggestButton";
import RainbowButton from "./RainbowButton";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

const IMAGE_STYLES = [
  "Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Anime",
  "3D Render", "Pixel Art", "Cinematic", "Comic Book", "Surrealism",
  "Minimalist", "Fantasy Art", "Concept Art", "Sketch", "Pop Art",
  "Art Nouveau", "Art Deco", "Baroque", "Impressionism", "Expressionism",
  "Cubism", "Futurism", "Gothic", "Steampunk", "Cyberpunk",
  "Vaporwave", "Retro/Vintage", "Ukiyo-e", "Stained Glass", "Mosaic",
  "Pencil Drawing", "Charcoal", "Ink Wash", "Gouache", "Pastel",
  "Low Poly", "Isometric", "Claymation", "Paper Cut", "Origami",
  "Graffiti/Street Art", "Psychedelic", "Noir", "Ethereal", "Hyper-Surreal",
];

const IMAGE_TYPES = [
  { id: "illustration", label: "🎨 Illustration", desc: "ပန်းချီ / ရုပ်ပုံ" },
  { id: "photo", label: "📸 Photo", desc: "ဓာတ်ပုံပုံစံ" },
  { id: "poster", label: "🪧 Poster", desc: "ပိုစတာ ဒီဇိုင်း" },
  { id: "wallpaper", label: "🖥️ Wallpaper", desc: "နောက်ခံပုံ" },
  { id: "icon", label: "🔷 Icon/Logo", desc: "အိုင်ကွန် / လိုဂို" },
  { id: "texture", label: "🧱 Texture/Pattern", desc: "အသွင်အပြင် / ပုံစံ" },
  { id: "character", label: "🧑‍🎤 Character Design", desc: "ဇာတ်ကောင် ဒီဇိုင်း" },
  { id: "landscape", label: "🏞️ Landscape/Scene", desc: "ရှုခင်း / မြင်ကွင်း" },
  { id: "product", label: "📦 Product Shot", desc: "ထုတ်ကုန် ဓာတ်ပုံ" },
  { id: "fashion", label: "👗 Fashion", desc: "ဖက်ရှင် ဓာတ်ပုံ" },
  { id: "food", label: "🍽️ Food Photography", desc: "အစားအစာ ဓာတ်ပုံ" },
  { id: "abstract", label: "🌀 Abstract Art", desc: "စိတ်ကူးယဉ် အနုပညာ" },
  { id: "meme", label: "😂 Meme/Fun", desc: "ဟာသ / Meme ပုံ" },
  { id: "book-cover", label: "📚 Book Cover", desc: "စာအုပ်မျက်နှာဖုံး" },
  { id: "sticker", label: "🏷️ Sticker", desc: "စတစ်ကာ ပုံစံ" },
  { id: "portrait", label: "🧑 Portrait", desc: "လူပုံတူ ဓာတ်ပုံ" },
  { id: "infographic", label: "📊 Infographic", desc: "အချက်အလက် ဂရပ်ဖစ်" },
  { id: "ui-mockup", label: "📱 UI/Mockup", desc: "UI ဒီဇိုင်း" },
  { id: "album-cover", label: "💿 Album Cover", desc: "တေးသီချင်း မျက်နှာဖုံး" },
  { id: "game-asset", label: "🎮 Game Asset", desc: "ဂိမ်း ပုံရိပ်" },
  { id: "comic-panel", label: "💬 Comic Panel", desc: "ကာတွန်း အကွက်" },
  { id: "avatar", label: "👤 Avatar/Profile", desc: "ကိုယ်ပွား ပုံ" },
  { id: "banner", label: "🏳️ Banner/Ad", desc: "ဘန်နာ / ကြော်ငြာ" },
  { id: "packaging", label: "🎁 Packaging", desc: "ထုပ်ပိုး ဒီဇိုင်း" },
  { id: "tattoo", label: "🖋️ Tattoo Design", desc: "တက်တူး ဒီဇိုင်း" },
  { id: "coloring-page", label: "🖍️ Coloring Page", desc: "အရောင်ခြယ် စာမျက်နှာ" },
  { id: "emoji", label: "😊 Emoji/Emoticon", desc: "အီမိုဂျီ" },
  { id: "map", label: "🗺️ Map/Fantasy Map", desc: "မြေပုံ ဒီဇိုင်း" },
  { id: "architecture", label: "🏛️ Architecture", desc: "ဗိသုကာ ဒီဇိုင်း" },
  { id: "vehicle", label: "🚗 Vehicle Design", desc: "ယာဉ် ဒီဇိုင်း" },
  { id: "jewelry", label: "💎 Jewelry Design", desc: "လက်ဝတ်ရတနာ" },
  { id: "interior", label: "🛋️ Interior Design", desc: "အိမ်တွင်း အလှဆင်" },
  { id: "nature-macro", label: "🌿 Nature/Macro", desc: "သဘာဝ အနီးကပ်" },
  { id: "sci-fi-scene", label: "🚀 Sci-Fi Scene", desc: "သိပ္ပံစိတ်ကူး မြင်ကွင်း" },
  { id: "horror", label: "👻 Horror/Dark", desc: "ထိတ်လန့် ပုံ" },
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
  const [imageType, setImageType] = useState("illustration");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(subject, [
      { key: "style", label: "Art Style", options: IMAGE_STYLES },
      { key: "imageType", label: "Image Type", options: IMAGE_TYPES.map((t) => t.id) },
      { key: "lighting", label: "Lighting", options: LIGHTING_OPTIONS },
      { key: "cameraAngle", label: "Camera Angle", options: CAMERA_ANGLES },
      { key: "aspectRatio", label: "Aspect Ratio", options: ASPECT_RATIOS.map((a) => a.id) },
    ]);
    if (result) {
      if (result.style) setStyle(result.style as string);
      if (result.imageType) setImageType(result.imageType as string);
      if (result.lighting) setLighting(result.lighting as string);
      if (result.cameraAngle) setCameraAngle(result.cameraAngle as string);
      if (result.aspectRatio) setAspectRatio(result.aspectRatio as string);
    }
  };

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
Image Type: ${IMAGE_TYPES.find(t => t.id === imageType)?.label || imageType}
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
        <AiSuggestButton onClick={handleAiSuggest} isLoading={isSuggesting} disabled={!subject.trim()} />
        <RainbowButton onClick={fillRandomIdea} disabled={isRandomizing}>
          {isRandomizing ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              Generating...
            </>
          ) : "🎲 Random Idea (AI)"}
        </RainbowButton>
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

      {/* Image Type */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">🎯 Image Type (ဘယ်လိုရလဒ်မျိုး ထွက်စေချင်သလဲ)</label>
        <div className="flex flex-wrap gap-2">
          {IMAGE_TYPES.map((t) => (
            <button key={t.id} onClick={() => setImageType(t.id)} className={chipClass(imageType === t.id)} title={t.desc}>
              {t.label}
            </button>
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
