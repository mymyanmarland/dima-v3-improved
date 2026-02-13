import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";

const VIDEO_TYPES = [
  { id: "talking-head", label: "🗣️ Talking Head" },
  { id: "explainer", label: "📖 Explainer" },
  { id: "product", label: "🛍️ Product Demo" },
  { id: "story", label: "📚 Storytelling" },
  { id: "ad", label: "📢 Advertisement" },
  { id: "music-video", label: "🎵 Music Video" },
  { id: "tutorial", label: "🎓 Tutorial" },
  { id: "cinematic", label: "🎬 Cinematic" },
  { id: "vlog", label: "📹 Vlog" },
  { id: "documentary", label: "🎞️ Documentary" },
  { id: "animation", label: "✨ Animation" },
  { id: "short-film", label: "🎭 Short Film" },
  { id: "timelapse", label: "⏳ Timelapse" },
  { id: "hyperlapse", label: "🏃 Hyperlapse" },
  { id: "interview", label: "🎙️ Interview" },
  { id: "montage", label: "🎞️ Montage" },
  { id: "lyric-video", label: "🎶 Lyric Video" },
  { id: "trailer", label: "🎥 Trailer" },
  { id: "commercial", label: "💼 Commercial" },
  { id: "nature", label: "🌿 Nature/Wildlife" },
  { id: "sports", label: "⚽ Sports Highlight" },
  { id: "horror", label: "👻 Horror" },
  { id: "sci-fi", label: "🚀 Sci-Fi" },
  { id: "fashion", label: "👗 Fashion Film" },
];

const VISUAL_STYLES = [
  "Realistic", "Cinematic", "Anime", "3D Animation",
  "Documentary", "Vintage Film", "Motion Graphics", "Slow Motion",
  "Noir", "Cyberpunk", "Watercolor", "Stop Motion",
  "Retro VHS", "Neon Glow", "Minimalist", "Fantasy",
  "Steampunk", "Vaporwave", "Glitch Art", "Claymation",
  "Pixel Art", "Isometric", "Surrealist", "Art Deco",
  "Gothic", "Dreamlike", "Sketch/Hand-Drawn", "Oil Painting",
  "Low Poly 3D", "Hyper-Realistic CGI", "Comic Book", "Ukiyo-e",
];

const CAMERA_MOVEMENTS = [
  "Static", "Pan Left/Right", "Tilt Up/Down",
  "Zoom In", "Zoom Out", "Tracking Shot", "Dolly",
  "Drone Shot", "Handheld", "360° Rotation",
  "Crane Shot", "Steadicam", "Whip Pan", "Rack Focus",
];

const DURATIONS = [
  { id: "5", label: "5s" },
  { id: "10", label: "10s" },
  { id: "15", label: "15s" },
  { id: "30", label: "30s" },
  { id: "60", label: "1 min" },
  { id: "120", label: "2 min" },
];

const ASPECT_RATIOS = [
  { id: "16:9", label: "16:9 Landscape" },
  { id: "9:16", label: "9:16 Portrait" },
  { id: "1:1", label: "1:1 Square" },
  { id: "4:3", label: "4:3 Standard" },
  { id: "21:9", label: "21:9 Cinematic" },
];

const MOODS = [
  "Energetic", "Calm", "Dramatic", "Mysterious",
  "Romantic", "Dark", "Uplifting", "Nostalgic",
  "Futuristic", "Whimsical", "Intense", "Peaceful",
];

const LIGHTING_STYLES = [
  "Natural Daylight", "Golden Hour", "Blue Hour", "Studio Lighting",
  "Neon Lights", "Candlelight", "Moonlight", "Dramatic Shadows",
  "Backlit Silhouette", "Soft Diffused", "High Key", "Low Key",
];

const COLOR_GRADES = [
  "Warm Tones", "Cool Tones", "Desaturated", "Vibrant",
  "Teal & Orange", "Monochrome", "Pastel", "High Contrast",
  "Sepia", "Cross-Processed", "Muted Earth", "Neon Pop",
];

const TRANSITION_STYLES = [
  "Cut", "Dissolve", "Fade to Black", "Whip Pan",
  "Morph", "Zoom Transition", "Slide", "Glitch",
  "Light Leak", "Match Cut", "Jump Cut", "Iris Wipe",
];

const SOUND_DESIGN = [
  "Ambient Nature", "Cinematic Score", "Electronic/Synth", "Orchestral",
  "Lo-fi Beats", "Sound Effects Only", "Voiceover", "Silence",
  "Rock/Guitar", "Jazz", "Hip-Hop Beat", "Classical Piano",
];

const RANDOM_IDEAS = [
  "A lone astronaut discovers a garden growing on Mars, with bioluminescent flowers blooming under a crimson sky",
  "A street musician plays violin in the rain while city lights reflect off wet cobblestone streets at night",
  "A time-lapse of an abandoned building being reclaimed by nature over centuries, vines and trees growing through concrete",
  "A futuristic city at sunset where flying cars weave between towering glass skyscrapers covered in vertical gardens",
  "A deep sea exploration revealing an underwater cave filled with glowing jellyfish and ancient coral formations",
  "A samurai walking through a field of cherry blossoms in slow motion, petals swirling in the wind",
  "A child opening a mysterious book that projects holographic worlds into the room around them",
  "A phoenix rising from volcanic ashes during a thunderstorm, wings trailing fire and lightning",
  "A cozy coffee shop on a rainy evening, steam rising from cups, jazz playing, rain on windows",
  "Two robots learning to dance together in an empty ballroom with dramatic spotlighting",
  "A dragon flying over snow-capped mountains at golden hour, casting enormous shadows on valleys below",
  "A surreal dreamscape where gravity shifts and people walk on walls and ceilings of a grand library",
  "A vintage train traveling through the Swiss Alps in autumn, passing through tunnels and over stone bridges",
  "A wolf howling on a cliff edge under the Northern Lights with snow gently falling",
  "A bustling night market in Asia with colorful lanterns, sizzling street food, and crowds of people",
  "A ballet dancer performing on the surface of a still lake at dawn, water rippling with each movement",
  "A massive whale breaching out of the ocean in ultra slow motion with the sun directly behind it",
  "A cyberpunk detective walking through neon-lit alleyways in a dystopian megacity during a blackout",
  "A painter's canvas coming to life as painted birds fly off and painted rivers begin to flow",
  "An ancient temple emerging from jungle fog at sunrise with monkeys playing in the ruins",
];

const VideoPromptEnglishTab = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [videoType, setVideoType] = useState("cinematic");
  const [visualStyle, setVisualStyle] = useState("Realistic");
  const [cameraMovement, setCameraMovement] = useState("Static");
  const [duration, setDuration] = useState("10");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [selectedMood, setSelectedMood] = useState("Dramatic");
  const [lighting, setLighting] = useState("Natural Daylight");
  const [colorGrade, setColorGrade] = useState("Warm Tones");
  const [transition, setTransition] = useState("Cut");
  const [sound, setSound] = useState("Cinematic Score");
  const [dialogue, setDialogue] = useState("");
  const [sceneDetails, setSceneDetails] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const randItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    setVideoType(randItem(VIDEO_TYPES).id);
    setVisualStyle(randItem(VISUAL_STYLES));
    setCameraMovement(randItem(CAMERA_MOVEMENTS));
    setDuration(randItem(DURATIONS).id);
    setAspectRatio(randItem(ASPECT_RATIOS).id);
    setSelectedMood(randItem(MOODS));
    setLighting(randItem(LIGHTING_STYLES));
    setColorGrade(randItem(COLOR_GRADES));
    setTransition(randItem(TRANSITION_STYLES));
    setSound(randItem(SOUND_DESIGN));

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: "Generate a unique, creative, cinematic video concept idea",
          category: "random-video-idea",
          categoryDescription: "Random Video Idea Generator",
          tone: "Creative",
          context: `Generate a single, short (2-3 sentences) creative video description idea for video generation AI like Veo 3.1.
The idea should be visually striking, unique, and inspiring. Return ONLY the video description text, nothing else. No quotes, no explanations, no numbering.`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.prompt) {
        setDescription(data.prompt.replace(/^["']|["']$/g, "").trim());
        toast.success("AI generated a random video idea! 🎲✨");
      } else {
        setDescription(RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)]);
        toast.success("Random video idea loaded! 🎲");
      }
    } catch {
      setDescription(RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)]);
      toast.success("Random video idea loaded! 🎲");
    } finally {
      setIsRandomizing(false);
    }
  };

  const generateVideoPrompt = async () => {
    if (!description.trim()) {
      toast.error("Please enter a video description");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: description.trim(),
          category: "video-prompt-en",
          categoryDescription: "Veo 3.1 Video Generation Prompt (English)",
          tone: "Technical",
          context: `Generate a highly detailed video generation prompt optimized for Google Veo 3.1.

Video Type: ${videoType}
Visual Style: ${visualStyle}
Camera Movement: ${cameraMovement}
Target Duration: ${duration} seconds
Aspect Ratio: ${aspectRatio}
Mood/Atmosphere: ${selectedMood}
Lighting: ${lighting}
Color Grading: ${colorGrade}
Transitions: ${transition}
Sound Design: ${sound}
${dialogue ? `Dialogue/Narration: ${dialogue}` : ""}
${sceneDetails ? `Additional Scene Details: ${sceneDetails}` : ""}

OUTPUT FORMAT:
Generate a single, comprehensive Veo 3.1 video prompt that includes:
1. Opening scene description with camera setup
2. Character descriptions (appearance, clothing, expressions)
3. Dialogue or narration directions (in English)
4. Camera movements and transitions
5. Lighting setup and color grading details
6. Background/environment details
7. Audio/sound design notes
8. Timing and pacing instructions
9. Mood and atmosphere throughout

Make the prompt highly specific and directly usable in Veo 3.1.
Write everything in English only.
Do NOT include any explanations, just the prompt.`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        playSuccessSound();
        toast.success("Video Prompt generated successfully! 🎬✨");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "prompt",
            topic: description.trim(),
            category: "video-prompt-en",
          });
        }
      } else {
        throw new Error("Failed to generate prompt");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
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
          🌐 English Version
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

      {/* Video Description */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          🎬 Video Description
        </label>
        <GlowTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. A young entrepreneur presenting a tech startup in a modern office with floor-to-ceiling windows overlooking a city skyline..."
          rows={3}
        />
      </div>

      {/* Video Type */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">📹 Video Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {VIDEO_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setVideoType(type.id)}
              className={`glossy-chip glossy-chip--lg ${videoType === type.id ? "glossy-chip--active" : ""}`}
            >
              {type.label}
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

      {/* Mood */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">🎭 Mood & Atmosphere</label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button key={m} onClick={() => setSelectedMood(m)} className={chipClass(selectedMood === m)}>{m}</button>
          ))}
        </div>
      </div>

      {/* Lighting */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">💡 Lighting Style</label>
        <div className="flex flex-wrap gap-2">
          {LIGHTING_STYLES.map((l) => (
            <button key={l} onClick={() => setLighting(l)} className={chipClass(lighting === l)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Color Grade */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">🎨 Color Grading</label>
        <div className="flex flex-wrap gap-2">
          {COLOR_GRADES.map((cg) => (
            <button key={cg} onClick={() => setColorGrade(cg)} className={chipClass(colorGrade === cg)}>{cg}</button>
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

      {/* Transitions */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">🔀 Transition Style</label>
        <div className="flex flex-wrap gap-2">
          {TRANSITION_STYLES.map((t) => (
            <button key={t} onClick={() => setTransition(t)} className={chipClass(transition === t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Sound Design */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">🔊 Sound Design</label>
        <div className="flex flex-wrap gap-2">
          {SOUND_DESIGN.map((sd) => (
            <button key={sd} onClick={() => setSound(sd)} className={chipClass(sound === sd)}>{sd}</button>
          ))}
        </div>
      </div>

      {/* Dialogue */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          🎤 Dialogue / Narration <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <GlowTextarea
          value={dialogue}
          onChange={(e) => setDialogue(e.target.value)}
          placeholder='e.g. "Welcome to our channel. Today we are going to explore the future of AI..."'
          rows={3}
        />
      </div>

      {/* Scene Details */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          🏞️ Additional Scene Details <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <GlowTextarea
          value={sceneDetails}
          onChange={(e) => setSceneDetails(e.target.value)}
          placeholder="e.g. Rain falling on a glass window, city lights reflecting, character wearing a leather jacket..."
          rows={3}
        />
      </div>

      {/* Generate Button */}
      <button onClick={generateVideoPrompt} disabled={isLoading || !description.trim()} className="gen-btn">
        {isLoading && <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
        <span>Generate Video Prompt</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default VideoPromptEnglishTab;
