import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { Code2, Terminal, Layers, Cpu, Braces, GitBranch, Globe } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";
import AiSuggestButton from "./AiSuggestButton";
import RainbowButton from "./RainbowButton";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";
const LANGUAGES = [
  { id: "python", label: "🐍 Python" },
  { id: "javascript", label: "⚡ JavaScript" },
  { id: "typescript", label: "🔷 TypeScript" },
  { id: "react", label: "⚛️ React" },
  { id: "nextjs", label: "▲ Next.js" },
  { id: "nodejs", label: "🟢 Node.js" },
  { id: "java", label: "☕ Java" },
  { id: "csharp", label: "🟣 C#" },
  { id: "go", label: "🐹 Go" },
  { id: "rust", label: "🦀 Rust" },
  { id: "swift", label: "🍎 Swift" },
  { id: "kotlin", label: "🟠 Kotlin" },
  { id: "php", label: "🐘 PHP" },
  { id: "sql", label: "🗄️ SQL" },
  { id: "html-css", label: "🌐 HTML/CSS" },
  { id: "flutter", label: "💙 Flutter/Dart" },
];

const USE_CASES = [
  { id: "build-feature", label: "🚀 Feature တည်ဆောက်", desc: "New feature/module ရေးမယ်" },
  { id: "debug", label: "🐛 Debug / Fix", desc: "Bug ရှာ/ပြင်မယ်" },
  { id: "refactor", label: "♻️ Refactor", desc: "Code ကို ပိုကောင်းအောင် ပြင်မယ်" },
  { id: "api-integration", label: "🔗 API Integration", desc: "API ချိတ်ဆက်မယ်" },
  { id: "database", label: "🗄️ Database Design", desc: "DB schema/query ရေးမယ်" },
  { id: "auth", label: "🔐 Authentication", desc: "Login/Auth system" },
  { id: "testing", label: "🧪 Testing", desc: "Test ရေးမယ်" },
  { id: "deployment", label: "📦 Deployment", desc: "Deploy/DevOps setup" },
  { id: "optimization", label: "⚡ Optimization", desc: "Performance ပိုကောင်းအောင်" },
  { id: "architecture", label: "🏗️ Architecture", desc: "System design/structure" },
  { id: "ui-component", label: "🎨 UI Component", desc: "UI/UX component ရေးမယ်" },
  { id: "algorithm", label: "🧮 Algorithm", desc: "Algorithm/Data Structure" },
];

const COMPLEXITY_LEVELS = [
  { id: "beginner", label: "🌱 Beginner", desc: "အခြေခံ" },
  { id: "intermediate", label: "🌿 Intermediate", desc: "အလယ်အလတ်" },
  { id: "advanced", label: "🌳 Advanced", desc: "အဆင့်မြင့်" },
  { id: "expert", label: "🔥 Expert", desc: "ကျွမ်းကျင်" },
];

const WEBSITE_TYPES = [
  { id: "static", label: "📄 Static Website", desc: "HTML/CSS/JS only, no backend" },
  { id: "dynamic", label: "⚡ Dynamic Website", desc: "Server-side rendering, DB connected" },
  { id: "spa", label: "🔄 SPA (Single Page App)", desc: "Client-side routing, API-based" },
  { id: "fullstack", label: "🏗️ Full Stack", desc: "Frontend + Backend + Database" },
  { id: "jamstack", label: "🥞 JAMstack", desc: "Static gen + APIs + Headless CMS" },
  { id: "ssr", label: "🖥️ SSR (Server-Side)", desc: "Next.js/Nuxt server rendering" },
  { id: "pwa", label: "📱 PWA", desc: "Progressive Web App, offline support" },
  { id: "serverless", label: "☁️ Serverless", desc: "Edge functions, no traditional server" },
  { id: "headless", label: "🔌 Headless (API Only)", desc: "Backend API without frontend" },
  { id: "micro-frontend", label: "🧩 Micro Frontend", desc: "Module federation architecture" },
];

const PROMPT_STYLES = [
  { id: "step-by-step", label: "📋 Step-by-Step Guide" },
  { id: "full-code", label: "💻 Full Code Solution" },
  { id: "explain-then-code", label: "📖 Explain + Code" },
  { id: "best-practices", label: "✅ Best Practices" },
  { id: "compare", label: "⚖️ Compare Approaches" },
  { id: "review", label: "🔍 Code Review Style" },
];

const CodingPromptTab = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["typescript"]);
  const [useCase, setUseCase] = useState("build-feature");
  const [complexity, setComplexity] = useState("intermediate");
  const [promptStyle, setPromptStyle] = useState("explain-then-code");
  const [websiteType, setWebsiteType] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(description, [
      { key: "language", label: "Language", options: LANGUAGES.map((l) => l.id), multiple: true },
      { key: "useCase", label: "Use Case", options: USE_CASES.map((u) => u.id) },
      { key: "complexity", label: "Complexity", options: COMPLEXITY_LEVELS.map((c) => c.id) },
      { key: "promptStyle", label: "Prompt Style", options: PROMPT_STYLES.map((p) => p.id) },
      { key: "websiteType", label: "Website Type", options: WEBSITE_TYPES.map((w) => w.id) },
    ]);
    if (result) {
      if (result.language) setSelectedLanguages(Array.isArray(result.language) ? result.language : [result.language]);
      if (result.useCase) setUseCase(result.useCase as string);
      if (result.complexity) setComplexity(result.complexity as string);
      if (result.promptStyle) setPromptStyle(result.promptStyle as string);
      if (result.websiteType) setWebsiteType(result.websiteType as string);
    }
  };

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const randItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    setSelectedLanguages([randItem(LANGUAGES).id]);
    setUseCase(randItem(USE_CASES).id);
    setComplexity(randItem(COMPLEXITY_LEVELS).id);
    setPromptStyle(randItem(PROMPT_STYLES).id);

    const techDomains = ["WebRTC video streaming", "blockchain smart contracts", "IoT device dashboard", "machine learning pipeline", "geolocation-based social app", "real-time multiplayer game", "browser extension", "CLI developer tool", "GraphQL API gateway", "serverless microservice", "progressive web app", "accessibility auditing tool", "code playground/sandbox", "data pipeline ETL", "payment processing system", "notification engine", "search engine with ranking", "file encryption service", "CI/CD pipeline manager", "API rate limiter", "WebAssembly module", "natural language processing", "computer vision app", "recommendation engine", "workflow automation builder"];
    const twists = ["with AI-powered features", "using only edge functions", "with real-time collaboration", "that works offline-first", "with voice control interface", "using WebSocket streams", "with gamification mechanics", "using peer-to-peer architecture", "with end-to-end encryption", "that generates visualizations", "with plugin/extension system", "using event-driven architecture"];
    const seed = `Tech: ${randItem(techDomains)}. Twist: ${randItem(twists)}. Seed: ${Math.random().toString(36).slice(2, 8)}`;

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Generate a unique coding project idea. ${seed}`,
          category: "random-coding-idea",
          categoryDescription: "Random Coding Idea Generator",
          tone: "Technical",
          context: `You are a senior developer brainstorming UNIQUE project ideas. ${seed}. Generate ONE short (1-2 sentences) innovative coding project idea that is SPECIFIC and ACTIONABLE. Avoid generic ideas like "todo app" or "blog". Be creative and technically interesting. Return ONLY the project description. No quotes, no explanations, no numbering.`,
        },
      });
      if (error) throw new Error(error.message);
      if (data?.prompt) {
        setDescription(data.prompt.replace(/^["']|["']$/g, "").trim());
        toast.success("AI generated a random coding idea! 💻✨");
      } else {
        setDescription("Build a real-time collaborative markdown editor with WebSocket support");
        toast.success("Random coding idea loaded! 🎲");
      }
    } catch {
      setDescription("Build a real-time collaborative markdown editor with WebSocket support");
      toast.success("Random coding idea loaded! 🎲");
    } finally {
      setIsRandomizing(false);
    }
  };

  const toggleLanguage = (langId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(langId)
        ? prev.length > 1
          ? prev.filter((l) => l !== langId)
          : prev
        : [...prev, langId]
    );
  };

  const selectedUseCase = USE_CASES.find((u) => u.id === useCase);
  const selectedComplexity = COMPLEXITY_LEVELS.find((c) => c.id === complexity);
  const selectedStyle = PROMPT_STYLES.find((s) => s.id === promptStyle);
  const selectedLangLabels = LANGUAGES.filter((l) => selectedLanguages.includes(l.id)).map((l) => l.label).join(", ");

  const generateCodingPrompt = async () => {
    if (!description.trim()) {
      toast.error("ဘာလုပ်ချင်တယ်ဆိုတာ ရေးပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: description.trim(),
          category: "coding-prompt",
          categoryDescription: "Advanced Coding Prompt Generator",
          tone: "Technical",
          context: `You are an expert software engineering prompt architect. Generate a highly detailed, production-ready coding prompt that an AI coding assistant can use to produce excellent code.

REQUIREMENTS:
- Languages/Frameworks: ${selectedLangLabels}
- Use Case: ${selectedUseCase?.label} - ${selectedUseCase?.desc}
- Complexity Level: ${selectedComplexity?.label} - ${selectedComplexity?.desc}
- Output Style: ${selectedStyle?.label}
${websiteType ? `- Website Type: ${WEBSITE_TYPES.find(w => w.id === websiteType)?.label} - ${WEBSITE_TYPES.find(w => w.id === websiteType)?.desc}` : ""}
${additionalContext ? `- Additional Context: ${additionalContext}` : ""}

PROMPT OUTPUT FORMAT (based on style "${promptStyle}"):
${promptStyle === "step-by-step" ? `Generate a step-by-step implementation guide prompt that includes:
1. Project setup instructions
2. File structure
3. Each step with clear code snippets
4. Error handling considerations
5. Testing suggestions` : ""}
${promptStyle === "full-code" ? `Generate a prompt that asks for complete, production-ready code including:
1. All necessary imports
2. Type definitions (if TypeScript)
3. Main implementation
4. Error handling
5. Comments explaining key decisions` : ""}
${promptStyle === "explain-then-code" ? `Generate a prompt that asks for:
1. Conceptual explanation of the approach
2. Architecture decisions and why
3. Complete implementation code
4. Usage examples
5. Edge cases to consider` : ""}
${promptStyle === "best-practices" ? `Generate a prompt focused on:
1. Industry best practices for this task
2. Common pitfalls to avoid
3. Recommended patterns and anti-patterns
4. Performance considerations
5. Security considerations
6. Code with best practices applied` : ""}
${promptStyle === "compare" ? `Generate a prompt that asks for:
1. Multiple approaches to solve the problem
2. Pros and cons of each approach
3. Performance comparison
4. When to use which approach
5. Recommended approach with implementation` : ""}
${promptStyle === "review" ? `Generate a prompt in code review style:
1. Initial implementation
2. Issues and improvements identified
3. Refactored version with explanations
4. Performance and security audit
5. Final polished code` : ""}

IMPORTANT RULES:
- The prompt should be specific enough that an AI can produce production-quality code
- Include relevant technical specifications
- Mention error handling, edge cases, and testing
- For ${complexity} level, adjust complexity accordingly
- Make the prompt reusable and well-structured
- Output ONLY the prompt, no meta-explanations
- Write the prompt in English for maximum AI compatibility`,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        playSuccessSound();
        toast.success("Coding Prompt generate ပြီးပါပြီ! 💻✨");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "prompt",
            topic: description.trim(),
            category: "coding-prompt",
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
          Advanced Coding
        </span>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-accent/20 text-accent">
          💻 Production-Ready Prompts
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
          <Code2 className="w-5 h-5 inline mr-2" />
          ဘာလုပ်ချင်တာလဲ?
        </label>
        <GlowTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ဥပမာ - User authentication system with JWT, refresh tokens, role-based access control..."
          rows={3}
        />
      </div>

      {/* Languages */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Braces className="w-5 h-5 inline mr-2" />
          Language / Framework <span className="text-muted-foreground text-xs">(တစ်ခုထက်မက ရွေးလို့ရ)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => toggleLanguage(lang.id)}
              className={`glossy-chip ${selectedLanguages.includes(lang.id) ? "glossy-chip--active" : ""}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Use Case */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Layers className="w-5 h-5 inline mr-2" />
          Use Case
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setUseCase(uc.id)}
              className={`glossy-chip glossy-chip--lg ${useCase === uc.id ? "glossy-chip--active" : ""}`}
            >
              <div>{uc.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{uc.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Website Type */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Globe className="w-5 h-5 inline mr-2" />
          Website အမျိုးအစား <span className="text-muted-foreground text-xs">(Website ဖန်တီးမယ်ဆိုရင် ရွေးပါ)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WEBSITE_TYPES.map((wt) => (
            <button
              key={wt.id}
              onClick={() => setWebsiteType(websiteType === wt.id ? "" : wt.id)}
              className={`glossy-chip glossy-chip--lg ${websiteType === wt.id ? "glossy-chip--active" : ""}`}
            >
              <div>{wt.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{wt.desc}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Complexity & Prompt Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">
            <Cpu className="w-5 h-5 inline mr-2" />
            Complexity Level
          </label>
          <div className="flex flex-wrap gap-2">
            {COMPLEXITY_LEVELS.map((cl) => (
              <button
                key={cl.id}
                onClick={() => setComplexity(cl.id)}
                className={`glossy-chip ${complexity === cl.id ? "glossy-chip--active" : ""}`}
              >
                {cl.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <label className="text-base font-medium text-foreground mb-3 block">
            <GitBranch className="w-5 h-5 inline mr-2" />
            Output Style
          </label>
          <div className="flex flex-wrap gap-2">
            {PROMPT_STYLES.map((ps) => (
              <button
                key={ps.id}
                onClick={() => setPromptStyle(ps.id)}
                className={`glossy-chip ${promptStyle === ps.id ? "glossy-chip--active" : ""}`}
              >
                {ps.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Context */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Terminal className="w-5 h-5 inline mr-2" />
          Additional Context <span className="text-muted-foreground text-sm">(optional)</span>
        </label>
        <GlowTextarea
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="ဥပမာ - Using PostgreSQL, Docker deployment, must support 10k concurrent users, REST API with OpenAPI spec..."
          rows={2}
        />
        <p className="text-xs text-muted-foreground mt-2">
          💡 Tech stack, constraints, requirements စသည် ထပ်ထည့်ပေးနိုင်ပါတယ်
        </p>
      </div>

      {/* Generate Button */}
      <button onClick={generateCodingPrompt} disabled={isLoading || !description.trim()} className="gen-btn">
        {isLoading && <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
        <span>Coding Prompt Generate လုပ်မယ်</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default CodingPromptTab;
