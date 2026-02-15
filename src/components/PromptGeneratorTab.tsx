import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import AiSuggestButton from "./AiSuggestButton";
import RainbowButton from "./RainbowButton";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

const CATEGORIES = [
  { id: "coding", label: "💻 Coding", description: "Programming & Development" },
  { id: "writing", label: "✍️ Writing", description: "Content & Creative Writing" },
  { id: "marketing", label: "📢 Marketing", description: "Marketing & Advertising" },
  { id: "education", label: "📚 Education", description: "Teaching & Learning" },
  { id: "business", label: "💼 Business", description: "Business & Strategy" },
  { id: "creative", label: "🎨 Creative", description: "Art & Design" },
  { id: "data", label: "📊 Data", description: "Data Analysis & Science" },
  { id: "general", label: "🌐 General", description: "General Purpose" },
  { id: "seo", label: "🔍 SEO", description: "Search Engine Optimization" },
  { id: "social-media", label: "📱 Social Media", description: "Social Media Content" },
  { id: "email", label: "📧 Email", description: "Email Writing & Campaigns" },
  { id: "copywriting", label: "✏️ Copywriting", description: "Sales & Ad Copy" },
  { id: "storytelling", label: "📖 Storytelling", description: "Narrative & Stories" },
  { id: "poetry", label: "🎭 Poetry", description: "Poems & Lyrics" },
  { id: "translation", label: "🌍 Translation", description: "Language Translation" },
  { id: "summarization", label: "📝 Summarization", description: "Text Summarization" },
  { id: "research", label: "🔬 Research", description: "Research & Analysis" },
  { id: "legal", label: "⚖️ Legal", description: "Legal Documents & Advice" },
  { id: "medical", label: "🏥 Medical", description: "Healthcare & Medical" },
  { id: "finance", label: "💰 Finance", description: "Finance & Accounting" },
  { id: "hr", label: "👥 HR", description: "Human Resources" },
  { id: "customer-service", label: "🎧 Customer Service", description: "Support & Service" },
  { id: "productivity", label: "⚡ Productivity", description: "Workflow & Efficiency" },
  { id: "psychology", label: "🧠 Psychology", description: "Mental Health & Behavior" },
  { id: "philosophy", label: "💭 Philosophy", description: "Philosophy & Ethics" },
  { id: "science", label: "🧪 Science", description: "Science & Discovery" },
  { id: "math", label: "🔢 Math", description: "Mathematics & Logic" },
  { id: "gaming", label: "🎮 Gaming", description: "Game Design & Reviews" },
  { id: "music", label: "🎵 Music", description: "Music Theory & Lyrics" },
  { id: "cooking", label: "🍳 Cooking", description: "Recipes & Food" },
  { id: "travel", label: "✈️ Travel", description: "Travel Planning & Guides" },
  { id: "fitness", label: "💪 Fitness", description: "Health & Exercise" },
  { id: "parenting", label: "👶 Parenting", description: "Childcare & Family" },
  { id: "resume", label: "📄 Resume", description: "CV & Job Applications" },
  { id: "presentation", label: "📊 Presentation", description: "Slides & Pitches" },
  { id: "debate", label: "🗣️ Debate", description: "Arguments & Persuasion" },
  { id: "automation", label: "🤖 Automation", description: "Bots & Workflows" },
];

const TONES = [
  "Professional", "Casual", "Technical", "Creative", "Persuasive", "Educational",
];

const PromptGeneratorTab = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("general");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [executedResult, setExecutedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeMode, setActiveMode] = useState<"generate" | "execute" | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(topic, [
      { key: "category", label: "Category", options: CATEGORIES.map((c) => c.id) },
      { key: "tone", label: "Tone", options: TONES },
    ]);
    if (result) {
      if (result.category) setCategory(result.category as string);
      if (result.tone) setTone(result.tone as string);
    }
  };

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const randItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    setCategory(randItem(CATEGORIES).id);
    setTone(randItem(TONES));

    const domains = ["science fiction storytelling", "educational game design", "philosophical debate simulation", "historical event recreation", "music composition guidance", "architectural visualization", "psychological analysis", "culinary innovation", "space exploration scenario", "environmental sustainability plan", "artistic movement manifesto", "medical diagnosis training", "legal argument construction", "sports strategy optimization", "fashion trend forecasting", "wildlife documentary narration", "cryptocurrency analysis", "urban planning proposal", "theatrical script writing", "robotics programming challenge", "language translation nuance", "dream interpretation guide", "mythological world building", "data visualization storytelling", "mindfulness meditation script"];
    const constraints = ["must include an unexpected twist", "should blend two unrelated fields", "needs a controversial angle", "requires step-by-step breakdown", "should challenge common assumptions", "must incorporate sensory details", "needs measurable outcomes", "should tell a personal story", "requires cultural sensitivity", "must be implementable in 24 hours"];
    const seed = `Domain focus: ${randItem(domains)}. Constraint: ${randItem(constraints)}. Random seed: ${Math.random().toString(36).slice(2, 8)}`;

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Generate a wildly creative and unique topic idea. ${seed}`,
          category: "random-general-idea",
          categoryDescription: "Random General Idea Generator",
          tone: "Creative",
          context: `You are a creative genius generating UNIQUE, NEVER-BEFORE-SEEN topic ideas. ${seed}. Generate ONE short (1-2 sentences) creative and SURPRISING topic idea. It must be DIFFERENT from common AI prompts. Be bold, unconventional, and specific. Return ONLY the topic text. No quotes, no explanations, no numbering.`,
        },
      });
      if (error) throw new Error(error.message);
      if (data?.prompt) {
        setTopic(data.prompt.replace(/^["']|["']$/g, "").trim());
        toast.success("AI generated a random idea! ✨");
      } else {
        setTopic("How to build a personal productivity system using AI tools");
        toast.success("Random idea loaded! 🎲");
      }
    } catch {
      setTopic("How to build a personal productivity system using AI tools");
      toast.success("Random idea loaded! 🎲");
    } finally {
      setIsRandomizing(false);
    }
  };

  const selectedCategory = CATEGORIES.find((c) => c.id === category);

  const generatePromptOnly = async () => {
    if (!topic.trim()) {
      toast.error("Topic ထည့်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");
    setExecutedResult("");
    setActiveMode("generate");

    try {
      const prompt = await callGeneratePrompt();
      setGeneratedPrompt(prompt);
      playSuccessSound();
      toast.success("Prompt generate ပြီးပါပြီ! ✨");
      logUsage("prompt");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAndExecute = async () => {
    if (!topic.trim()) {
      toast.error("Topic ထည့်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");
    setExecutedResult("");
    setActiveMode("execute");

    try {
      const prompt = await callGeneratePrompt();
      setGeneratedPrompt(prompt);

      setIsLoading(false);
      setIsExecuting(true);

      const { data, error } = await supabase.functions.invoke("execute-prompt", {
        body: { prompt },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.result) {
        setExecutedResult(data.result);
        playSuccessSound();
        toast.success("Prompt execute ပြီးပါပြီ! 🚀");
        logUsage("prompt_execute");
      } else {
        throw new Error("Response ထဲမှာ result မပါပါ");
      }
    } catch (error) {
      console.error("Execute error:", error);
      toast.error(error instanceof Error ? error.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
      setIsExecuting(false);
    }
  };

  const callGeneratePrompt = async (): Promise<string> => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const extractMessage = (raw: unknown): string => {
      if (!raw) return "Unknown error";
      if (typeof raw === "string") {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object" && "error" in parsed && typeof (parsed as any).error === "string") {
            return (parsed as any).error;
          }
        } catch {
          // not JSON
        }
        return raw;
      }
      if (typeof raw === "object") {
        const maybeErr = raw as any;
        if (typeof maybeErr.error === "string") return maybeErr.error;
        if (typeof maybeErr.message === "string") return maybeErr.message;
      }
      return "Unknown error";
    };

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: topic.trim(),
          category,
          categoryDescription: selectedCategory?.description || "General Purpose",
          tone,
          context: context.trim() || undefined,
        },
      });

      if (!error && !data?.error && data?.prompt) return data.prompt;

      const anyErr = error as unknown as { message?: string; context?: { status?: number; body?: unknown } } | null;
      const status = anyErr?.context?.status;
      const msg = extractMessage(data?.error ?? anyErr?.context?.body ?? anyErr?.message);

      if (status === 429 && attempt < maxAttempts) {
        const delayMs = 900 * Math.pow(2, attempt - 1);
        toast.message(`Free models busy… retrying (${attempt}/${maxAttempts})`, { duration: 1200 });
        await sleep(delayMs);
        continue;
      }

      throw new Error(msg);
    }

    throw new Error("Rate limit exceeded—ခဏစောင့်ပြီး ပြန်ကြိုးစားပါ");
  };

  const logUsage = async (actionType: string) => {
    if (user) {
      await supabase.from("usage_logs").insert({
        user_id: user.id,
        action_type: actionType,
        topic: topic.trim(),
        category,
      });
    }
  };

  const isDisabled = isLoading || isExecuting || !topic.trim();

  return (
    <div className="space-y-5">
      {/* Header with Random Idea */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          ✨ General Prompt
        </span>
        <AiSuggestButton onClick={handleAiSuggest} isLoading={isSuggesting} disabled={!topic.trim()} />
        <RainbowButton onClick={fillRandomIdea} disabled={isRandomizing}>
          {isRandomizing ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              Generating...
            </>
          ) : "🎲 Random Idea (AI)"}
        </RainbowButton>
      </div>

      {/* Topic */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          အကြောင်းအရာရေးပါ
        </label>
        <GlowTextarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="How to create Gemini API Key စတဲ့အရာ Design ကစခု ဖန်တီးပေးပါ..."
          rows={3}
        />
      </div>

      {/* Category */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          ကိရိယာများ (Tools)
        </label>
        <label className="text-xs text-muted-foreground mb-2 block">အမျိုးအစား</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
        >
          <option value="" disabled>-- အမျိုးအစားရွေးပါ --</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label} {cat.description}
            </option>
          ))}
        </select>
      </div>

      {/* Tone */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          စတိုင် (Style)
        </label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`glossy-chip ${tone === t ? "glossy-chip--active" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Context */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Additional Context <span className="text-muted-foreground">(optional)</span>
        </label>
        <GlowTextarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="ထပ်ဖြည့်ချင်တဲ့ details တွေ ထည့်ပါ..."
          rows={2}
        />
      </div>

      {/* Button descriptions */}
      <div className="glass-subtle rounded-2xl p-3">
        <div className="grid grid-cols-2 gap-3 text-xs text-foreground/80">
          <div className="flex items-start gap-1.5">
            <span className="text-primary font-bold">①</span>
            <span>Prompt ကိုပဲ generate လုပ်ပြီး ပြပေးမယ် — copy ယူပြီး ကိုယ်တိုင်သုံးနိုင်ပါတယ်</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-accent font-bold">②</span>
            <span>Prompt generate ပြီး AI ကနေ တိုက်ရိုက် အဖြေထုတ်ပေးမယ်</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={generatePromptOnly} disabled={isDisabled} className="gen-btn gen-sm">
          {isLoading && activeMode === "generate" && <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
          <span>Prompt Generate မယ်</span>
        </button>
        <button onClick={generateAndExecute} disabled={isDisabled} className="gen-btn gen-sm">
          {(isLoading || isExecuting) && activeMode === "execute" && <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
          <span>{isExecuting ? "Execute လုပ်နေတယ်..." : "Generate + Execute"}</span>
        </button>
      </div>

      {/* Output */}
      <PromptOutput
        prompt={generatedPrompt}
        isLoading={isLoading}
        executedResult={executedResult}
        isExecuting={isExecuting}
      />
    </div>
  );
};

export default PromptGeneratorTab;
