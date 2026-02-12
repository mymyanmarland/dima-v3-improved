import { useState } from "react";
import { Code2, Terminal, Layers, Cpu, Braces, GitBranch } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";

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
  const [additionalContext, setAdditionalContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex items-center gap-2 px-1">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          Advanced Coding
        </span>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-accent/20 text-accent">
          💻 Production-Ready Prompts
        </span>
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-base font-medium text-foreground mb-3 block">
          <Code2 className="w-5 h-5 inline mr-2" />
          ဘာလုပ်ချင်တာလဲ?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ဥပမာ - User authentication system with JWT, refresh tokens, role-based access control..."
          rows={3}
          className="w-full glass-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
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
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                selectedLanguages.includes(lang.id)
                  ? "bg-primary/15 text-primary border-primary/30 glow-primary"
                  : "glass-subtle text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
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
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border text-left ${
                useCase === uc.id
                  ? "bg-primary/15 text-primary border-primary/30 glow-primary"
                  : "glass-subtle text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              <div>{uc.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{uc.desc}</div>
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  complexity === cl.id
                    ? "bg-primary/15 text-primary border-primary/30 glow-primary"
                    : "glass-subtle text-muted-foreground hover:text-foreground hover:border-primary/20"
                }`}
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  promptStyle === ps.id
                    ? "bg-primary/15 text-primary border-primary/30 glow-primary"
                    : "glass-subtle text-muted-foreground hover:text-foreground hover:border-primary/20"
                }`}
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
        <textarea
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="ဥပမာ - Using PostgreSQL, Docker deployment, must support 10k concurrent users, REST API with OpenAPI spec..."
          rows={2}
          className="w-full glass-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
        />
        <p className="text-xs text-muted-foreground mt-2">
          💡 Tech stack, constraints, requirements စသည် ထပ်ထည့်ပေးနိုင်ပါတယ်
        </p>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateCodingPrompt}
        disabled={isLoading || !description.trim()}
        className="fancy-button w-full"
      >
        <span className="dots_border" />
        {isLoading ? (
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin relative z-10" />
        ) : (
          <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="path" d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" strokeWidth="1.5" />
            <path className="path" d="M5 5l1.5 4.5L11 11l-4.5 1.5L5 17l-1.5-4.5L-1 11l4.5-1.5L5 5z" strokeWidth="1" />
            <path className="path" d="M19 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" strokeWidth="1" />
          </svg>
        )}
        <span className="text_button">Coding Prompt Generate လုပ်မယ်</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default CodingPromptTab;
