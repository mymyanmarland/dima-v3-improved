import { useState } from "react";
import GlowTextarea from "./GlowTextarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { playSuccessSound } from "@/utils/notificationSound";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";

const REFINE_METHODS = [
  { id: "chain-of-thought", label: "🧠 Chain-of-Thought", desc: "Step-by-step reasoning logic" },
  { id: "few-shot", label: "📋 Few-Shot", desc: "Include examples for clarity" },
  { id: "role-play", label: "🎭 Role-Play Expert", desc: "Assign expert persona" },
  { id: "structured-output", label: "📐 Structured Output", desc: "Define format & schema" },
  { id: "constraints", label: "🔒 Constraints-Based", desc: "Add boundaries & rules" },
  { id: "iterative", label: "🔄 Iterative Refinement", desc: "Multi-pass improvement" },
  { id: "tree-of-thought", label: "🌳 Tree-of-Thought", desc: "Explore multiple paths" },
  { id: "socratic", label: "❓ Socratic Method", desc: "Question-driven depth" },
  { id: "mega-prompt", label: "💎 Mega Prompt", desc: "All-in-one comprehensive" },
  { id: "react-agent", label: "⚡ ReAct Pattern", desc: "Reason + Act framework" },
];

const OUTPUT_FORMATS = [
  { id: "detailed", label: "📝 Detailed Prompt" },
  { id: "system-prompt", label: "🖥️ System Prompt" },
  { id: "instruction-set", label: "📋 Instruction Set" },
  { id: "template", label: "📄 Reusable Template" },
  { id: "multi-turn", label: "💬 Multi-Turn Setup" },
];

const QUALITY_LEVELS = [
  { id: "professional", label: "💼 Professional" },
  { id: "expert", label: "🏆 Expert" },
  { id: "master", label: "👑 Master-Level" },
];

const TARGET_AI = [
  "Any AI Model", "ChatGPT / GPT", "Gemini", "Claude", "Midjourney",
  "DALL-E", "Stable Diffusion", "Copilot", "Cursor AI", "Lovable",
];

const RefinePromptTab = () => {
  const { user } = useAuth();
  const [rawPrompt, setRawPrompt] = useState("");
  const [refineMethod, setRefineMethod] = useState("mega-prompt");
  const [outputFormat, setOutputFormat] = useState("detailed");
  const [qualityLevel, setQualityLevel] = useState("expert");
  const [targetAi, setTargetAi] = useState("Any AI Model");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [executedResult, setExecutedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeMode, setActiveMode] = useState<"generate" | "execute" | null>(null);

  const selectedMethod = REFINE_METHODS.find((m) => m.id === refineMethod);
  const selectedFormat = OUTPUT_FORMATS.find((f) => f.id === outputFormat);
  const selectedQuality = QUALITY_LEVELS.find((q) => q.id === qualityLevel);

  const buildRefineContext = () => {
    return `You are a world-class Prompt Engineer with 10+ years of experience crafting prompts for every major AI model. Your task is to take a RAW, unrefined prompt and transform it into a ${selectedQuality?.label} quality, expertly engineered prompt.

=== RAW PROMPT TO REFINE ===
"${rawPrompt.trim()}"

=== REFINEMENT METHOD ===
Method: ${selectedMethod?.label} — ${selectedMethod?.desc}

=== REQUIREMENTS ===
- Output Format: ${selectedFormat?.label}
- Quality Level: ${selectedQuality?.label}
- Target AI: ${targetAi}
${additionalNotes.trim() ? `- Additional Notes: ${additionalNotes.trim()}` : ""}

=== PROMPT ENGINEERING PRINCIPLES TO APPLY ===
1. **Clarity & Specificity**: Replace vague language with precise, unambiguous instructions
2. **Context Setting**: Add relevant background, domain context, and constraints
3. **Role Assignment**: Define the AI's expertise, persona, and knowledge level
4. **Output Specification**: Clearly define expected format, length, style, and structure
5. **Edge Case Handling**: Address potential misinterpretations and boundary conditions
6. **Quality Markers**: Include evaluation criteria and quality standards
7. **Examples (if Few-Shot)**: Provide input/output examples for pattern clarity
8. **Chain Logic (if CoT)**: Break complex tasks into sequential reasoning steps
9. **Guardrails**: Add safety constraints and scope boundaries
10. **Iteration Hooks**: Include self-check and refinement instructions

=== ADDITIONAL TECHNIQUES TO USE ===
- Use delimiters (""", ---, ###) to separate sections
- Include "Think step by step" triggers where appropriate
- Add "Before answering, consider..." metacognitive prompts
- Use positive instructions ("Do X") over negative ("Don't do Y")
- Include output format examples when helpful
- Add confidence/certainty qualifiers
- Specify tone, audience level, and communication style

=== OUTPUT ===
Transform the raw prompt into a refined, professional prompt that is:
- 10x more effective than the original
- Optimized for ${targetAi}
- Following ${selectedMethod?.label} methodology
- Formatted as ${selectedFormat?.label}
- At ${selectedQuality?.label} quality standard

Return ONLY the refined prompt. Do not include explanations about what you changed.`;
  };

  const generatePromptOnly = async () => {
    if (!rawPrompt.trim()) {
      toast.error("Raw Prompt ထည့်ပေးပါ");
      return;
    }
    setIsLoading(true);
    setGeneratedPrompt("");
    setExecutedResult("");
    setActiveMode("generate");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Refine this prompt: "${rawPrompt.trim().slice(0, 100)}..."`,
          category: "prompt-refine",
          categoryDescription: "Expert Prompt Refinement",
          tone: "Professional",
          context: buildRefineContext(),
        },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        playSuccessSound();
        toast.success("Prompt refine ပြီးပါပြီ! ✨");
        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id, action_type: "refine_prompt", topic: rawPrompt.trim().slice(0, 200), category: "prompt-refine",
          });
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAndExecute = async () => {
    if (!rawPrompt.trim()) {
      toast.error("Raw Prompt ထည့်ပေးပါ");
      return;
    }
    setIsLoading(true);
    setGeneratedPrompt("");
    setExecutedResult("");
    setActiveMode("execute");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Refine this prompt: "${rawPrompt.trim().slice(0, 100)}..."`,
          category: "prompt-refine",
          categoryDescription: "Expert Prompt Refinement",
          tone: "Professional",
          context: buildRefineContext(),
        },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        setIsLoading(false);
        setIsExecuting(true);

        const { data: execData, error: execError } = await supabase.functions.invoke("execute-prompt", {
          body: { prompt: data.prompt },
        });
        if (execError) throw new Error(execError.message);
        if (execData?.error) throw new Error(execData.error);
        if (execData?.result) {
          setExecutedResult(execData.result);
          playSuccessSound();
          toast.success("Refined prompt execute ပြီးပါပြီ! 🚀");
          if (user) {
            await supabase.from("usage_logs").insert({
              user_id: user.id, action_type: "refine_prompt_execute", topic: rawPrompt.trim().slice(0, 200), category: "prompt-refine",
            });
          }
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
      setIsExecuting(false);
    }
  };

  const isDisabled = isLoading || isExecuting || !rawPrompt.trim();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          🔬 Refine Prompt (Expert)
        </span>
      </div>

      {/* Raw Prompt Input */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Raw Prompt ထည့်ပါ *
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          ဘယ်လို prompt မျိုးပဲဖြစ်ဖြစ် ထည့်လိုက်ပါ — Professional & Expert level prompt အဖြစ် ပြောင်းပေးပါမယ်
        </p>
        <GlowTextarea
          value={rawPrompt}
          onChange={(e) => setRawPrompt(e.target.value)}
          placeholder="e.g. Write me a blog post about AI... / Build a todo app... / Design a logo for my brand..."
          rows={4}
        />
      </div>

      {/* Refinement Method */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Prompt Engineering Method
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REFINE_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setRefineMethod(method.id)}
              className={`glossy-chip text-left text-xs py-2 px-3 ${refineMethod === method.id ? "glossy-chip--active" : ""}`}
            >
              <div className="font-medium">{method.label}</div>
              <div className="text-[10px] opacity-70">{method.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Output Format & Quality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <label className="text-sm font-medium text-foreground mb-3 block">Output Format</label>
          <div className="flex flex-wrap gap-2">
            {OUTPUT_FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setOutputFormat(f.id)}
                className={`glossy-chip ${outputFormat === f.id ? "glossy-chip--active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <label className="text-sm font-medium text-foreground mb-3 block">Quality Level</label>
          <div className="flex flex-wrap gap-2">
            {QUALITY_LEVELS.map((q) => (
              <button
                key={q.id}
                onClick={() => setQualityLevel(q.id)}
                className={`glossy-chip ${qualityLevel === q.id ? "glossy-chip--active" : ""}`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target AI */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">Target AI Model</label>
        <div className="flex flex-wrap gap-2">
          {TARGET_AI.map((ai) => (
            <button
              key={ai}
              onClick={() => setTargetAi(ai)}
              className={`glossy-chip ${targetAi === ai ? "glossy-chip--active" : ""}`}
            >
              {ai}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Additional Notes <span className="text-muted-foreground">(optional)</span>
        </label>
        <GlowTextarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="ထပ်ဖြည့်ချင်တဲ့ requirements, audience, tone..."
          rows={2}
        />
      </div>

      {/* Button Descriptions */}
      <div className="glass-subtle rounded-2xl p-3">
        <div className="grid grid-cols-2 gap-3 text-xs text-foreground/80">
          <div className="flex items-start gap-1.5">
            <span className="text-primary font-bold">①</span>
            <span>Raw prompt ကို refined prompt အဖြစ် ပြောင်းပေးမယ်</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-accent font-bold">②</span>
            <span>Refine ပြီး AI ကနေ တိုက်ရိုက် execute လုပ်ပေးမယ်</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={generatePromptOnly} disabled={isDisabled} className="gen-btn gen-sm">
          {isLoading && activeMode === "generate" && <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
          <span>Refine Prompt</span>
        </button>
        <button onClick={generateAndExecute} disabled={isDisabled} className="gen-btn gen-sm">
          {(isLoading || isExecuting) && activeMode === "execute" && <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
          <span>{isExecuting ? "Execute လုပ်နေတယ်..." : "Refine + Execute"}</span>
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

export default RefinePromptTab;
