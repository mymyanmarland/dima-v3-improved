import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Video } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import AiSuggestButton from "./AiSuggestButton";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";
import OutputLanguageSelector, { getLanguageInstruction } from "./OutputLanguageSelector";

const VIDEO_TYPES = [
  { id: "talking-head", label: "🗣️ Talking Head", desc: "လူပြောနေတဲ့ Video" },
  { id: "explainer", label: "📖 Explainer", desc: "ရှင်းပြ Video" },
  { id: "product", label: "🛍️ Product Demo", desc: "ကုန်ပစ္စည်း Video" },
  { id: "story", label: "📚 Story", desc: "ပုံပြင် Video" },
  { id: "ad", label: "📢 Advertisement", desc: "ကြော်ငြာ Video" },
  { id: "music-video", label: "🎵 Music Video", desc: "သီချင်း Video" },
  { id: "tutorial", label: "🎓 Tutorial", desc: "သင်ခန်းစာ Video" },
  { id: "cinematic", label: "🎬 Cinematic", desc: "ရုပ်ရှင်ပုံစံ" },
];

const VISUAL_STYLES = [
  "Realistic", "Cinematic", "Anime", "3D Animation",
  "Documentary", "Vintage Film", "Motion Graphics", "Slow Motion",
];

const CAMERA_MOVEMENTS = [
  "Static (ကင်မရာငြိမ်)", "Pan (ဘယ်/ညာ)", "Tilt (အပေါ်/အောက်)",
  "Zoom In", "Zoom Out", "Tracking Shot", "Dolly", "Drone Shot",
  "Handheld", "360° Rotation",
];

const DURATIONS = [
  { id: "5", label: "5 စက္ကန့်" },
  { id: "10", label: "10 စက္ကန့်" },
  { id: "15", label: "15 စက္ကန့်" },
  { id: "30", label: "30 စက္ကန့်" },
  { id: "60", label: "1 မိနစ်" },
];

const ASPECT_RATIOS = [
  { id: "16:9", label: "16:9 Landscape" },
  { id: "9:16", label: "9:16 Portrait (TikTok/Reels)" },
  { id: "1:1", label: "1:1 Square" },
  { id: "4:3", label: "4:3 Standard" },
  { id: "21:9", label: "21:9 Cinematic" },
];

const VideoPromptTab = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [videoType, setVideoType] = useState("talking-head");
  const [visualStyle, setVisualStyle] = useState("Realistic");
  const [cameraMovement, setCameraMovement] = useState("Static (ကင်မရာငြိမ်)");
  const [duration, setDuration] = useState("10");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [myanmarDialogue, setMyanmarDialogue] = useState("");
  const [mood, setMood] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("myanmar");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(description, [
      { key: "videoType", label: "Video Type", options: VIDEO_TYPES.map((v) => v.id) },
      { key: "visualStyle", label: "Visual Style", options: VISUAL_STYLES },
      { key: "cameraMovement", label: "Camera Movement", options: CAMERA_MOVEMENTS },
      { key: "duration", label: "Duration", options: DURATIONS.map((d) => d.id) },
      { key: "aspectRatio", label: "Aspect Ratio", options: ASPECT_RATIOS.map((a) => a.id) },
    ]);
    if (result) {
      if (result.videoType) setVideoType(result.videoType as string);
      if (result.visualStyle) setVisualStyle(result.visualStyle as string);
      if (result.cameraMovement) setCameraMovement(result.cameraMovement as string);
      if (result.duration) setDuration(result.duration as string);
      if (result.aspectRatio) setAspectRatio(result.aspectRatio as string);
    }
  };

  const selectedType = VIDEO_TYPES.find((t) => t.id === videoType);

  const generateVideoPrompt = async () => {
    if (!description.trim()) {
      toast.error("Video ဖော်ပြချက် ရေးပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: description.trim(),
          category: "video-prompt",
          categoryDescription: "Veo 3.1 Video Generation Prompt",
          tone: "Technical",
          context: `Generate a highly detailed video generation prompt optimized for Google Veo 3.1.

CRITICAL REQUIREMENTS:
- This video MUST feature MYANMAR LANGUAGE (Burmese) spoken dialogue/narration
- The characters in the video should speak Myanmar/Burmese language naturally
- Include specific Myanmar cultural elements where appropriate

Video Type: ${selectedType?.label} - ${selectedType?.desc}
Visual Style: ${visualStyle}
Camera Movement: ${cameraMovement}
Target Duration: ${duration} seconds
Aspect Ratio: ${aspectRatio}
${myanmarDialogue ? `Myanmar Dialogue/Script: ${myanmarDialogue}` : ""}
${mood ? `Mood/Atmosphere: ${mood}` : ""}

OUTPUT FORMAT:
Generate a single, comprehensive Veo 3.1 video prompt that includes:
1. Opening scene description with camera setup
2. Character descriptions (appearance, clothing, expressions)
3. Myanmar language dialogue directions (what they should say in Burmese)
4. Camera movements and transitions
5. Lighting and color grading
6. Background/environment details
7. Audio/sound design notes
8. Timing and pacing instructions

Make the prompt highly specific and directly usable in Veo 3.1. 
Do NOT include any explanations, just the prompt.${getLanguageInstruction(outputLanguage)}`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        playSuccessSound();
        toast.success("Video Prompt generate ပြီးပါပြီ! 🎬✨");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "prompt",
            topic: description.trim(),
            category: "video-prompt",
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
    <div className="space-y-6">
      {/* Header badge */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          Veo 3.1 Optimized
        </span>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-accent/20 text-accent">
          🇲🇲 Myanmar Language
        </span>
        <AiSuggestButton onClick={handleAiSuggest} isLoading={isSuggesting} disabled={!description.trim()} />
      </div>

      {/* Video Description */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          🎬 Video ဖော်ပြချက်
        </label>
        <GlowTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ဥပမာ - မြန်မာဘာသာနဲ့ AI အကြောင်း ရှင်းပြနေတဲ့ လူငယ်တစ်ယောက်၊ ရန်ကုန်မြို့ လမ်းပေါ်မှာ..."
          rows={3}
        />
      </div>

      {/* Video Type */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">📹 Video အမျိုးအစား</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {VIDEO_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setVideoType(type.id)}
              className={`glossy-chip glossy-chip--lg ${videoType === type.id ? "glossy-chip--active" : ""}`}
            >
              <div>{type.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Style */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">🎨 Visual Style</label>
        <div className="flex flex-wrap gap-2">
          {VISUAL_STYLES.map((s) => (
            <button key={s} onClick={() => setVisualStyle(s)} className={chipClass(visualStyle === s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Camera Movement */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">📷 Camera Movement</label>
        <div className="flex flex-wrap gap-2">
          {CAMERA_MOVEMENTS.map((c) => (
            <button key={c} onClick={() => setCameraMovement(c)} className={chipClass(cameraMovement === c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Duration & Aspect Ratio */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">⏱️ Duration</label>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button key={d.id} onClick={() => setDuration(d.id)} className={chipClass(duration === d.id)}>{d.label}</button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">📐 Aspect Ratio</label>
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map((ar) => (
              <button key={ar.id} onClick={() => setAspectRatio(ar.id)} className={chipClass(aspectRatio === ar.id)}>{ar.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Myanmar Dialogue */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          🇲🇲 မြန်မာစကားပြော / Dialogue <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <GlowTextarea
          value={myanmarDialogue}
          onChange={(e) => setMyanmarDialogue(e.target.value)}
          placeholder="ဥပမာ - &quot;မင်္ဂလာပါ၊ ဒီနေ့ ကျွန်တော် AI အကြောင်း ပြောပြပေးမှာပါ...&quot;"
          rows={3}
        />
        <p className="text-xs text-muted-foreground mt-2">
          💡 Video ထဲမှာ ပါစေချင်တဲ့ မြန်မာစကားပြော/စကားလုံးတွေ ထည့်ပေးပါ
        </p>
      </div>

      {/* Mood */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          🎭 Mood / Atmosphere <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="ဥပမာ - Warm and friendly, Professional, Energetic, Dramatic..."
          className="w-full glass-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      {/* Output Language */}
      <OutputLanguageSelector value={outputLanguage} onChange={setOutputLanguage} />

      {/* Generate Button */}
      <button onClick={generateVideoPrompt} disabled={isLoading || !description.trim()} className="gen-btn">
        {isLoading && <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
        <span>Video Prompt Generate လုပ်မယ်</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default VideoPromptTab;
