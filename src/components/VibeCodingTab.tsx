import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Wand2, Sparkles, Palette, Layout, Layers, Monitor, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import AiSuggestButton from "./AiSuggestButton";
import RainbowButton from "./RainbowButton";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

const AI_PLATFORMS = [
  { id: "lovable", label: "💜 Lovable" },
  { id: "cursor", label: "⚡ Cursor" },
  { id: "bolt", label: "⚡ Bolt.new" },
  { id: "v0", label: "▲ v0 (Vercel)" },
  { id: "replit", label: "💻 Replit Agent" },
  { id: "windsurf", label: "🏄 Windsurf" },
  { id: "copilot", label: "🤖 GitHub Copilot" },
  { id: "claude", label: "🟠 Claude Code" },
  { id: "devin", label: "🧠 Devin" },
  { id: "cline", label: "🔷 Cline" },
];

const PROJECT_TYPES = [
  { id: "web-app", label: "🌐 Web App", desc: "Full web application" },
  { id: "landing", label: "🏠 Landing Page", desc: "Marketing / product page" },
  { id: "dashboard", label: "📊 Dashboard", desc: "Admin / analytics panel" },
  { id: "ecommerce", label: "🛒 E-Commerce", desc: "Online store" },
  { id: "saas", label: "☁️ SaaS Platform", desc: "Subscription service" },
  { id: "portfolio", label: "🎨 Portfolio", desc: "Personal showcase" },
  { id: "blog", label: "📝 Blog / CMS", desc: "Content platform" },
  { id: "social", label: "💬 Social App", desc: "Community / messaging" },
  { id: "mobile-web", label: "📱 Mobile Web App", desc: "Mobile-first PWA" },
  { id: "ai-tool", label: "🤖 AI Tool", desc: "AI-powered application" },
  { id: "marketplace", label: "🏪 Marketplace", desc: "Multi-vendor platform" },
  { id: "game", label: "🎮 Web Game", desc: "Browser-based game" },
];

const TECH_STACKS = [
  { id: "react-tailwind", label: "⚛️ React + Tailwind" },
  { id: "nextjs", label: "▲ Next.js" },
  { id: "vue-nuxt", label: "💚 Vue / Nuxt" },
  { id: "svelte", label: "🔥 SvelteKit" },
  { id: "react-native", label: "📱 React Native" },
  { id: "flutter", label: "💙 Flutter Web" },
  { id: "astro", label: "🚀 Astro" },
  { id: "remix", label: "💿 Remix" },
  { id: "vanilla", label: "🌐 Vanilla JS/TS" },
  { id: "angular", label: "🅰️ Angular" },
];

import { DESIGN_STYLES } from "@/data/designStyles";
import DesignStyleSelector from "./DesignStyleSelector";
import FeatureSelector from "./FeatureSelector";
import { ALL_FEATURES } from "@/data/vibeCodingFeatures";


const DETAIL_LEVELS = [
  { id: "brief", label: "📝 Brief", desc: "Short & focused prompt" },
  { id: "detailed", label: "📋 Detailed", desc: "Step-by-step instructions" },
  { id: "mega", label: "📖 Mega Prompt", desc: "Extremely comprehensive" },
];

const VibeCodingTab = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("lovable");
  const [projectType, setProjectType] = useState("web-app");
  const [selectedStacks, setSelectedStacks] = useState<string[]>(["react-tailwind"]);
  const [designStyle, setDesignStyle] = useState("modern-minimal");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["responsive", "dark-mode"]);
  const [detailLevel, setDetailLevel] = useState("detailed");
  const [colorScheme, setColorScheme] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(description, [
      { key: "platform", label: "Platform", options: AI_PLATFORMS.map((p) => p.id) },
      { key: "projectType", label: "Project Type", options: PROJECT_TYPES.map((p) => p.id) },
      { key: "stack", label: "Tech Stack", options: TECH_STACKS.map((s) => s.id), multiple: true },
      { key: "designStyle", label: "Design Style", options: DESIGN_STYLES.map((d) => d.id) },
      { key: "features", label: "Features", options: ALL_FEATURES.map((f) => f.id), multiple: true },
      { key: "detailLevel", label: "Detail Level", options: DETAIL_LEVELS.map((d) => d.id) },
    ]);
    if (result) {
      if (result.platform) setSelectedPlatform(result.platform as string);
      if (result.projectType) setProjectType(result.projectType as string);
      if (result.stack) setSelectedStacks(Array.isArray(result.stack) ? result.stack : [result.stack]);
      if (result.designStyle) setDesignStyle(result.designStyle as string);
      if (result.features) setSelectedFeatures(Array.isArray(result.features) ? result.features : [result.features]);
      if (result.detailLevel) setDetailLevel(result.detailLevel as string);
    }
  };

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const randItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const randItems = <T extends { id: string }>(arr: T[], count: number) => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count).map((i) => i.id);
    };

    setSelectedPlatform(randItem(AI_PLATFORMS).id);
    setProjectType(randItem(PROJECT_TYPES).id);
    setSelectedStacks([randItem(TECH_STACKS).id]);
    setDesignStyle(randItem(DESIGN_STYLES).id);
    setSelectedFeatures(randItems(ALL_FEATURES, 3 + Math.floor(Math.random() * 4)));
    setDetailLevel(randItem(DETAIL_LEVELS).id);

    const vibeIdeas = [
      "AI-powered recipe recommendation app with meal planning and grocery lists",
      "Real-time collaborative whiteboard with drawing tools and video chat",
      "Personal finance tracker with AI insights and spending predictions",
      "Music discovery platform with AI-curated playlists and social sharing",
      "Habit tracking app with gamification, streaks, and community challenges",
      "Virtual event platform with live streaming, chat, and networking rooms",
      "AI writing assistant with tone analysis, grammar fixes, and templates",
      "Smart bookmark manager with AI tagging, search, and reading list",
      "Freelancer project management tool with time tracking and invoicing",
      "Plant care app with AI identification, watering schedules, and community",
      "Language learning platform with AI conversation partner and spaced repetition",
      "Fitness app with AI workout generator, progress tracking, and social feeds",
    ];

    try {
      const seed = `Idea: ${randItem(vibeIdeas)}. Unique seed: ${Math.random().toString(36).slice(2, 8)}`;
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Generate a unique vibe coding project idea. ${seed}`,
          category: "random-vibe-idea",
          categoryDescription: "Random Vibe Coding Idea",
          tone: "Creative",
          context: `You are a creative app designer brainstorming UNIQUE project ideas for vibe coding (AI-assisted development). ${seed}. Generate ONE short (1-2 sentences) innovative app idea that is SPECIFIC, VISUAL, and FUN to build with AI tools. Focus on modern web apps. Return ONLY the project description.`,
        },
      });
      if (error) throw error;
      if (data?.prompt) {
        setDescription(data.prompt.replace(/^["']|["']$/g, "").trim());
        toast.success("AI generated a vibe coding idea! 🎨✨");
      } else {
        setDescription(randItem(vibeIdeas));
        toast.success("Random vibe idea loaded! 🎲");
      }
    } catch {
      setDescription(randItem(vibeIdeas));
      toast.success("Random vibe idea loaded! 🎲");
    } finally {
      setIsRandomizing(false);
    }
  };

  const toggleStack = (id: string) => {
    setSelectedStacks((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };



  const platformLabel = AI_PLATFORMS.find((p) => p.id === selectedPlatform)?.label || "";
  const projectLabel = PROJECT_TYPES.find((p) => p.id === projectType);
  const stackLabels = TECH_STACKS.filter((s) => selectedStacks.includes(s.id)).map((s) => s.label).join(", ");
  const designLabel = DESIGN_STYLES.find((d) => d.id === designStyle);
  const featureLabels = ALL_FEATURES.filter((f) => selectedFeatures.includes(f.id)).map((f) => f.label).join(", ");
  const detailLabel = DETAIL_LEVELS.find((d) => d.id === detailLevel);

  const generateVibePrompt = async () => {
    if (!description.trim()) {
      toast.error("ဘာဖန်တီးချင်တယ်ဆိုတာ ရေးပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");

    const detailInstructions: Record<string, string> = {
      brief: `Generate a CONCISE vibe coding prompt (200-400 words). Focus on the key requirements and let the AI figure out the details. Perfect for quick builds.`,
      detailed: `Generate a DETAILED vibe coding prompt (400-800 words). Include specific component structures, page layouts, feature requirements, and design specifications. Well-organized with clear sections.`,
      mega: `Generate an EXTREMELY COMPREHENSIVE mega prompt (800-1500 words). Include EVERY detail: exact page layouts, component hierarchy, color codes, typography, animations, database schema, API endpoints, user flows, edge cases, responsive breakpoints, accessibility, SEO, and deployment notes. Leave NOTHING to imagination.`,
    };

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: description.trim(),
          category: "vibe-coding-prompt",
          categoryDescription: "Vibe Coding Prompt Generator",
          tone: "Technical-Creative",
          context: `You are an expert vibe coding prompt engineer who creates PERFECT prompts for AI coding platforms. Your prompts should be optimized for ${platformLabel} platform.

PROJECT DETAILS:
- Platform: ${platformLabel}
- Project Type: ${projectLabel?.label} - ${projectLabel?.desc}
- Tech Stack: ${stackLabels}
- Design Style: ${designLabel?.label} - ${designLabel?.desc}
- Features: ${featureLabels}
${colorScheme ? `- Color Scheme: ${colorScheme}` : ""}
${additionalNotes ? `- Additional Notes: ${additionalNotes}` : ""}

DETAIL LEVEL: ${detailLabel?.label} - ${detailLabel?.desc}
${detailInstructions[detailLevel]}

PLATFORM-SPECIFIC OPTIMIZATIONS:
${selectedPlatform === "lovable" ? `- Lovable uses React + Vite + Tailwind + shadcn/ui + Supabase
- Mention specific shadcn components to use
- Include Supabase table structures if database is needed
- Specify Tailwind classes and design tokens` : ""}
${selectedPlatform === "cursor" ? `- Cursor works with any codebase, be specific about file structure
- Include terminal commands for setup
- Specify package.json dependencies` : ""}
${selectedPlatform === "bolt" ? `- Bolt.new creates full-stack apps, specify both frontend and backend
- Include deployment considerations
- Mention specific npm packages` : ""}
${selectedPlatform === "v0" ? `- v0 specializes in React + Tailwind UI components
- Focus on component design and props
- Include specific Tailwind utility classes` : ""}
${["replit", "windsurf", "copilot", "claude", "devin", "cline"].includes(selectedPlatform) ? `- Be specific about the project structure and dependencies
- Include clear setup instructions
- Specify file naming conventions` : ""}

PROMPT STRUCTURE:
1. Start with a clear project overview
2. List all pages/screens with their components
3. Describe the design system (colors, typography, spacing)
4. Detail each feature with user interactions
5. Include data models if database is needed
6. Specify responsive behavior
7. Add animation/transition details
8. Include error states and loading states

IMPORTANT RULES:
- Write the prompt as if you're giving instructions to an AI coding assistant
- Be specific enough that the AI can build it in ONE shot
- Use clear, actionable language
- Include visual references where helpful (describe exactly how things should look)
- Output ONLY the prompt, no meta-explanations
- Write in English for maximum AI compatibility
- Make it feel like a natural "vibe coding" conversation`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        playSuccessSound();
        toast.success("Vibe Coding Prompt ဖန်တီးပြီးပါပြီ! 🎨✨");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "prompt",
            topic: description.trim(),
            category: "vibe-coding",
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
    <div className="space-y-6">
      {/* Header badge */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          Vibe Coding
        </span>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-accent/20 text-accent">
          🎨 AI-Powered Development
        </span>
        <AiSuggestButton onClick={handleAiSuggest} isLoading={isSuggesting} disabled={!description.trim()} />
        <RainbowButton onClick={fillRandomIdea} disabled={isRandomizing}>
          {isRandomizing ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              Generating...
            </>
          ) : "🎲 Random Idea (AI)"}
        </RainbowButton>
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Wand2 className="w-5 h-5 inline mr-2" />
          ဘာဖန်တီးချင်တာလဲ?
        </label>
        <GlowTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ဥပမာ - AI chatbot ပါတဲ့ task management app, Spotify-like music player, ..."
          rows={3}
        />
      </div>

      {/* AI Platform */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Sparkles className="w-5 h-5 inline mr-2" />
          AI Platform
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {AI_PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`glossy-chip ${selectedPlatform === p.id ? "glossy-chip--active" : ""}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Type */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Layout className="w-5 h-5 inline mr-2" />
          Project အမျိုးအစား
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PROJECT_TYPES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => setProjectType(pt.id)}
              className={`glossy-chip glossy-chip--lg ${projectType === pt.id ? "glossy-chip--active" : ""}`}
            >
              <div>{pt.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{pt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Layers className="w-5 h-5 inline mr-2" />
          Tech Stack <span className="text-muted-foreground text-xs">(တစ်ခုထက်မက ရွေးလို့ရ)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TECH_STACKS.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleStack(s.id)}
              className={`glossy-chip ${selectedStacks.includes(s.id) ? "glossy-chip--active" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Design Style */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Palette className="w-5 h-5 inline mr-2" />
          Design Style
        </label>
        <DesignStyleSelector value={designStyle} onChange={setDesignStyle} allowDeselect={false} />
      </div>

      {/* Features */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Zap className="w-5 h-5 inline mr-2" />
          Features <span className="text-muted-foreground text-xs">(လိုချင်တာတွေ ရွေးပါ)</span>
        </label>
        <FeatureSelector selected={selectedFeatures} onChange={setSelectedFeatures} />
      </div>

      {/* Detail Level & Color Scheme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">
            <Layers className="w-5 h-5 inline mr-2" />
            Prompt Detail Level
          </label>
          <div className="flex flex-wrap gap-2">
            {DETAIL_LEVELS.map((dl) => (
              <button
                key={dl.id}
                onClick={() => setDetailLevel(dl.id)}
                className={`glossy-chip glossy-chip--lg ${detailLevel === dl.id ? "glossy-chip--active" : ""}`}
              >
                <div>{dl.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{dl.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">
            <Palette className="w-5 h-5 inline mr-2" />
            Color Scheme <span className="text-muted-foreground text-sm">(optional)</span>
          </label>
          <GlowTextarea
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value)}
            placeholder="ဥပမာ - Purple & dark theme, Pastel colors, Ocean blue & white..."
            rows={2}
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Monitor className="w-5 h-5 inline mr-2" />
          Additional Notes <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <GlowTextarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="ဥပမာ - Framer Motion animations ထည့်ပေးပါ, Mobile-first ဖြစ်ရမယ်, Supabase backend သုံးမယ်..."
          rows={2}
        />
        <p className="text-xs text-muted-foreground mt-2">
          💡 သီးသန့် requirements, references, inspirations စသည် ထပ်ထည့်ပေးနိုင်ပါတယ်
        </p>
      </div>

      {/* Generate Button */}
      <button onClick={generateVibePrompt} disabled={isLoading || !description.trim()} className="gen-btn">
        {isLoading && <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
        <span>Vibe Coding Prompt Generate လုပ်မယ်</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default VibeCodingTab;
