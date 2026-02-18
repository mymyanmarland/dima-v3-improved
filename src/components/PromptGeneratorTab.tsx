import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Sparkles, Wand2, Layout, Layers, Globe, BookOpen, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import OutputLanguageSelector, { getLanguageInstruction } from "./OutputLanguageSelector";
import AiSuggestButton from "./AiSuggestButton";
import RainbowButton from "./RainbowButton";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";
import CategorySelector from "./CategorySelector";
import {
  ALL_CATEGORIES,
  TONES,
  PROMPT_METHODS,
  OUTPUT_FORMATS,
  AUDIENCES,
  OUTPUT_LANGUAGES,
  DETAIL_LEVELS,
} from "@/data/generalPromptData";

const PromptGeneratorTab = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("general");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [promptMethod, setPromptMethod] = useState("standard");
  const [outputFormat, setOutputFormat] = useState("default");
  const [audience, setAudience] = useState("general");
  const [outputLanguage, setOutputLanguage] = useState("english");
  const [detailLevel, setDetailLevel] = useState("detailed");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [executedResult, setExecutedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeMode, setActiveMode] = useState<"generate" | "execute" | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(topic, [
      { key: "category", label: "Category", options: ALL_CATEGORIES.map((c) => c.id) },
      { key: "tone", label: "Tone", options: TONES },
      { key: "promptMethod", label: "Prompt Method", options: PROMPT_METHODS.map((m) => m.id) },
      { key: "outputFormat", label: "Output Format", options: OUTPUT_FORMATS.map((f) => f.id) },
      { key: "audience", label: "Audience", options: AUDIENCES.map((a) => a.id) },
      { key: "detailLevel", label: "Detail Level", options: DETAIL_LEVELS.map((d) => d.id) },
    ]);
    if (result) {
      if (result.category) setCategory(result.category as string);
      if (result.tone) setTone(result.tone as string);
      if (result.promptMethod) setPromptMethod(result.promptMethod as string);
      if (result.outputFormat) setOutputFormat(result.outputFormat as string);
      if (result.audience) setAudience(result.audience as string);
      if (result.detailLevel) setDetailLevel(result.detailLevel as string);
    }
  };

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const randItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    setCategory(randItem(ALL_CATEGORIES).id);
    setTone(randItem(TONES));
    setPromptMethod(randItem(PROMPT_METHODS).id);
    setOutputFormat(randItem(OUTPUT_FORMATS).id);
    setAudience(randItem(AUDIENCES).id);
    setDetailLevel(randItem(DETAIL_LEVELS).id);
    setOutputLanguage(randItem(OUTPUT_LANGUAGES).id);

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

  const selectedCategory = ALL_CATEGORIES.find((c) => c.id === category);
  const selectedMethod = PROMPT_METHODS.find((m) => m.id === promptMethod);
  const selectedFormat = OUTPUT_FORMATS.find((f) => f.id === outputFormat);
  const selectedAudience = AUDIENCES.find((a) => a.id === audience);
  const selectedLanguage = OUTPUT_LANGUAGES.find((l) => l.id === outputLanguage);
  const selectedDetail = DETAIL_LEVELS.find((d) => d.id === detailLevel);

  const buildEnhancedContext = () => {
    const parts: string[] = [];

    // Prompt method instructions
    const methodInstructions: Record<string, string> = {
      "chain-of-thought": "Use Chain-of-Thought reasoning: break down the problem step-by-step, showing your reasoning process before reaching conclusions.",
      "few-shot": "Use Few-Shot prompting: include 2-3 concrete examples that demonstrate the expected input/output pattern before the actual task.",
      "role-play": "Use Role-Play method: assign a specific expert persona with relevant credentials, experience, and domain expertise.",
      "tree-of-thought": "Use Tree-of-Thought: explore multiple solution paths, evaluate each branch, and select the most promising approach.",
      "socratic": "Use Socratic method: guide through a series of probing questions that lead to deeper understanding and self-discovery.",
      "mega-prompt": "Create a Mega Prompt: extremely comprehensive with every possible detail, constraint, example, and quality marker. Minimum 800 words.",
      "react": "Use ReAct framework: alternate between Thought (reasoning), Action (what to do), and Observation (what was learned) steps.",
      "constraint": "Use Constraint-Based prompting: define strict boundaries, rules, and limitations that must be followed exactly.",
      "iterative": "Use Iterative Refinement: start with a basic version, then progressively improve with specific enhancement instructions.",
    };
    if (promptMethod !== "standard" && methodInstructions[promptMethod]) {
      parts.push(`PROMPT METHOD: ${methodInstructions[promptMethod]}`);
    }

    // Output format
    const formatInstructions: Record<string, string> = {
      markdown: "Format output in clean Markdown with proper headings (##), lists, bold text, and code blocks where appropriate.",
      json: "Structure the output as a valid JSON object with clear key-value pairs and nested structures.",
      "step-by-step": "Present as numbered step-by-step instructions, each step clearly explained.",
      "bullet-points": "Use concise bullet points for easy scanning. Group related points under sub-headings.",
      essay: "Write as a well-structured essay with introduction, body paragraphs, and conclusion.",
      table: "Present information in a tabular format with clear column headers for comparison.",
      checklist: "Format as an actionable checklist with [ ] checkbox items.",
      qa: "Structure as Question & Answer pairs, covering key aspects of the topic.",
      outline: "Present as a hierarchical outline with main topics, subtopics, and supporting details.",
    };
    if (outputFormat !== "default" && formatInstructions[outputFormat]) {
      parts.push(`OUTPUT FORMAT: ${formatInstructions[outputFormat]}`);
    }

    // Audience
    const audienceInstructions: Record<string, string> = {
      beginner: "Target audience: BEGINNERS. Use simple language, avoid jargon, explain concepts from scratch, include analogies.",
      intermediate: "Target audience: INTERMEDIATE learners. Assume basic knowledge, focus on deeper concepts and practical applications.",
      expert: "Target audience: EXPERTS. Use technical terminology freely, focus on advanced concepts, nuances, and edge cases.",
      kids: "Target audience: CHILDREN (5-12). Use very simple words, fun examples, emoji, and engaging storytelling.",
      teens: "Target audience: TEENAGERS (13-18). Use relatable examples, modern references, clear but not condescending language.",
      academic: "Target audience: ACADEMICS. Use formal academic tone, cite methodologies, include theoretical frameworks.",
      business: "Target audience: BUSINESS PROFESSIONALS. Focus on ROI, metrics, actionable insights, and strategic implications.",
    };
    if (audience !== "general" && audienceInstructions[audience]) {
      parts.push(audienceInstructions[audience]);
    }

    // Language
    if (outputLanguage !== "english") {
      parts.push(`OUTPUT LANGUAGE: Write the entire output in ${selectedLanguage?.label || outputLanguage}. All content must be in this language.`);
    }

    // Detail level
    const detailInstructions: Record<string, string> = {
      brief: "DETAIL LEVEL: Keep it concise and focused (200-400 words). Hit key points only.",
      detailed: "DETAIL LEVEL: Be thorough and well-organized (400-800 words). Include specific details, examples, and clear structure.",
      mega: "DETAIL LEVEL: Be EXTREMELY comprehensive (800-1500+ words). Include every detail, edge case, example, and consideration. Leave nothing to imagination.",
    };
    if (detailInstructions[detailLevel]) {
      parts.push(detailInstructions[detailLevel]);
    }

    if (context.trim()) {
      parts.push(`ADDITIONAL CONTEXT: ${context.trim()}`);
    }

    return parts.join("\n\n");
  };

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
        } catch { /* not JSON */ }
        return raw;
      }
      if (typeof raw === "object") {
        const maybeErr = raw as any;
        if (typeof maybeErr.error === "string") return maybeErr.error;
        if (typeof maybeErr.message === "string") return maybeErr.message;
      }
      return "Unknown error";
    };

    const enhancedContext = buildEnhancedContext();

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: topic.trim(),
          category,
          categoryDescription: selectedCategory?.description || "General Purpose",
          tone,
          context: enhancedContext || undefined,
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
        <label className="text-base font-medium text-foreground mb-3 block">
          <Wand2 className="w-5 h-5 inline mr-2" />
          အကြောင်းအရာရေးပါ
        </label>
        <GlowTextarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onClear={() => setTopic("")}
          placeholder="How to create Gemini API Key စတဲ့အရာ Design ကစခု ဖန်တီးပေးပါ..."
          rows={3}
        />
      </div>

      {/* Category (Accordion) */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Layout className="w-5 h-5 inline mr-2" />
          Category အမျိုးအစား
        </label>
        <CategorySelector value={category} onChange={setCategory} />
      </div>

      {/* Prompt Engineering Method */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Zap className="w-5 h-5 inline mr-2" />
          Prompt Engineering Method
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PROMPT_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setPromptMethod(m.id)}
              className={`glossy-chip glossy-chip--lg ${promptMethod === m.id ? "glossy-chip--active" : ""}`}
            >
              <div>{m.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Sparkles className="w-5 h-5 inline mr-2" />
          Tone / Style
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

      {/* Output Format & Audience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">
            <BookOpen className="w-5 h-5 inline mr-2" />
            Output Format
          </label>
          <div className="grid grid-cols-2 gap-2">
            {OUTPUT_FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setOutputFormat(f.id)}
                className={`glossy-chip glossy-chip--lg ${outputFormat === f.id ? "glossy-chip--active" : ""}`}
              >
                <div>{f.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">
            <Globe className="w-5 h-5 inline mr-2" />
            Target Audience
          </label>
          <div className="grid grid-cols-2 gap-2">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                onClick={() => setAudience(a.id)}
                className={`glossy-chip glossy-chip--lg ${audience === a.id ? "glossy-chip--active" : ""}`}
              >
                <div>{a.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{a.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language & Detail Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <OutputLanguageSelector value={outputLanguage} onChange={setOutputLanguage} />

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
      </div>

      {/* Context */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          Additional Context <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <GlowTextarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          onClear={() => setContext("")}
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
