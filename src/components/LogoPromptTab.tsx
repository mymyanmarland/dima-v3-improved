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

const LOGO_STYLES = [
  { id: "minimalist", label: "🔲 Minimalist", desc: "Clean, simple, modern" },
  { id: "vintage", label: "🏛️ Vintage / Retro", desc: "Classic, nostalgic feel" },
  { id: "3d", label: "🧊 3D / Isometric", desc: "Depth, dimension, realism" },
  { id: "flat", label: "🎨 Flat Design", desc: "Bold colors, no gradients" },
  { id: "gradient", label: "🌈 Gradient", desc: "Smooth color transitions" },
  { id: "lettermark", label: "🔤 Lettermark", desc: "Initials-based logo" },
  { id: "wordmark", label: "✏️ Wordmark", desc: "Typography-focused" },
  { id: "emblem", label: "🛡️ Emblem / Badge", desc: "Enclosed, official look" },
  { id: "mascot", label: "🐾 Mascot", desc: "Character-based logo" },
  { id: "abstract", label: "💠 Abstract", desc: "Geometric, symbolic shapes" },
  { id: "handdrawn", label: "✍️ Hand-drawn", desc: "Organic, artisan feel" },
  { id: "luxury", label: "👑 Luxury / Premium", desc: "Elegant, high-end" },
  { id: "geometric", label: "📐 Geometric", desc: "Precise shapes & patterns" },
  { id: "negative-space", label: "🕳️ Negative Space", desc: "Clever hidden imagery" },
  { id: "line-art", label: "〰️ Line Art", desc: "Single-weight outlines" },
  { id: "monogram", label: "🅰️ Monogram", desc: "Interlocking letters" },
];

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "Food & Beverage",
  "Fashion & Beauty", "Real Estate", "Sports & Fitness", "Entertainment",
  "Travel & Tourism", "Automotive", "Agriculture", "Legal", "Music",
  "Gaming", "E-commerce", "Crypto & Web3", "Non-Profit", "Media",
  "Architecture", "Photography", "Consulting", "SaaS / Startup", "Art & Creative",
];

const COLOR_SCHEMES = [
  { id: "monochrome", label: "⚫ Monochrome" },
  { id: "duo-tone", label: "🎭 Duo-tone" },
  { id: "vibrant", label: "🌟 Vibrant & Bold" },
  { id: "pastel", label: "🍬 Pastel & Soft" },
  { id: "earth-tones", label: "🌿 Earth Tones" },
  { id: "neon", label: "💡 Neon & Electric" },
  { id: "gold-dark", label: "✨ Gold & Dark" },
  { id: "gradient-warm", label: "🔥 Warm Gradient" },
  { id: "gradient-cool", label: "❄️ Cool Gradient" },
  { id: "black-white", label: "🖤 Black & White" },
];

const TYPOGRAPHY_STYLES = [
  "Sans-Serif (Modern)", "Serif (Classic)", "Script (Elegant)", "Slab Serif (Bold)",
  "Display (Unique)", "Handwritten (Personal)", "Futuristic (Tech)", "Gothic (Strong)",
];

const ICON_TYPES = [
  "Abstract Symbol", "Letterform", "Animal / Mascot", "Nature Element",
  "Geometric Shape", "Human Figure", "Object / Tool", "No Icon (Typography Only)",
];

const LogoPromptTab = () => {
  const { user } = useAuth();
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [logoStyle, setLogoStyle] = useState("minimalist");
  const [industry, setIndustry] = useState("Technology");
  const [colorScheme, setColorScheme] = useState("monochrome");
  const [typographyStyle, setTypographyStyle] = useState("Sans-Serif (Modern)");
  const [iconType, setIconType] = useState("Abstract Symbol");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [executedResult, setExecutedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeMode, setActiveMode] = useState<"generate" | "execute" | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { suggest, isSuggesting } = useAiSuggestion();

  const handleAiSuggest = async () => {
    const result = await suggest(brandName + (tagline ? " - " + tagline : ""), [
      { key: "logoStyle", label: "Logo Style", options: LOGO_STYLES.map((s) => s.id) },
      { key: "industry", label: "Industry", options: INDUSTRIES },
      { key: "colorScheme", label: "Color Scheme", options: COLOR_SCHEMES.map((c) => c.id) },
      { key: "typographyStyle", label: "Typography", options: TYPOGRAPHY_STYLES },
      { key: "iconType", label: "Icon Type", options: ICON_TYPES },
    ]);
    if (result) {
      if (result.logoStyle) setLogoStyle(result.logoStyle as string);
      if (result.industry) setIndustry(result.industry as string);
      if (result.colorScheme) setColorScheme(result.colorScheme as string);
      if (result.typographyStyle) setTypographyStyle(result.typographyStyle as string);
      if (result.iconType) setIconType(result.iconType as string);
    }
  };

  const fillRandomIdea = async () => {
    setIsRandomizing(true);
    const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    setLogoStyle(rand(LOGO_STYLES).id);
    setIndustry(rand(INDUSTRIES));
    setColorScheme(rand(COLOR_SCHEMES).id);
    setTypographyStyle(rand(TYPOGRAPHY_STYLES));
    setIconType(rand(ICON_TYPES));

    const brandConcepts = [
      "a futuristic AI companion app", "an artisan coffee roastery in Yangon",
      "a sustainable ocean cleanup startup", "a luxury pet hotel chain",
      "a cybersecurity firm for small businesses", "a retro arcade gaming bar",
      "an organic skincare brand using local herbs", "a space tourism booking platform",
      "a blockchain-based voting system", "a premium meditation & wellness studio",
      "a drone delivery service for rural areas", "an underground vinyl record label",
      "a quantum computing education platform", "a zero-waste fashion marketplace",
      "a holographic display technology company", "a biotech gene therapy startup",
      "an autonomous vehicle ride-sharing app", "a virtual reality architecture firm",
      "a deep-sea exploration research lab", "a neural interface wearable brand",
      "a gourmet mushroom farming collective", "an AR-powered museum guide app",
      "a renewable energy microfinancing platform", "a digital nomad co-living network",
      "a personalized AI nutrition coach", "an ethical diamond traceability platform",
      "a bioluminescent lighting design studio", "a vertical farming technology company",
    ];

    const styleDirections = [
      "with a hidden meaning in the negative space",
      "that works perfectly at both 16px favicon and billboard size",
      "inspired by ancient Myanmar art patterns",
      "that cleverly combines two unrelated symbols",
      "with a kinetic/animated version in mind",
      "that tells the brand story in a single icon",
      "using optical illusions for memorability",
      "with cultural symbolism from Southeast Asia",
      "that evolves across brand touchpoints",
      "incorporating sacred geometry principles",
    ];

    const seed = `Brand concept: ${rand(brandConcepts)}. Direction: ${rand(styleDirections)}. Seed: ${Math.random().toString(36).slice(2, 8)}`;

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Generate a unique brand name and tagline concept for a logo. ${seed}`,
          category: "logo-brand-concept",
          categoryDescription: "Logo Brand Concept Generator",
          tone: "Creative",
          context: `You are a world-class brand strategist. ${seed}. Generate ONE creative brand name (1-2 words, catchy, memorable) and a short tagline (3-6 words). Format: "BrandName — Tagline". Be bold and original. Return ONLY the result. No quotes, no explanations.`,
        },
      });
      if (error) throw error;
      if (data?.prompt) {
        const parts = data.prompt.replace(/^["']|["']$/g, "").trim().split(/\s*[—–-]\s*/);
        setBrandName(parts[0]?.trim() || "");
        setTagline(parts[1]?.trim() || "");
        toast.success("AI generated a logo concept! 🎨");
      }
    } catch {
      setBrandName("NovaSpark");
      setTagline("Ignite Your Vision");
      toast.success("Random logo concept loaded! 🎲");
    } finally {
      setIsRandomizing(false);
    }
  };

  const selectedStyle = LOGO_STYLES.find((s) => s.id === logoStyle);
  const selectedColor = COLOR_SCHEMES.find((c) => c.id === colorScheme);

  const buildLogoContext = () => {
    return `You are an expert logo designer. Generate a prompt that produces EXACTLY ONE clean logo image — NOT multiple versions, NOT a grid, NOT variations side by side.

Specifications:
— Brand Name: "${brandName.trim()}"
${tagline.trim() ? `— Tagline: "${tagline.trim()}"` : ""}
— Logo Style: ${selectedStyle?.label} (${selectedStyle?.desc})
— Industry: ${industry}
— Color Scheme: ${selectedColor?.label}
— Typography: ${typographyStyle}
— Icon/Symbol: ${iconType}
${additionalDetails.trim() ? `— Extra: ${additionalDetails.trim()}` : ""}

CRITICAL: Describe ONE single logo on a clean background. Include the brand name text, icon/symbol composition, exact colors, and style. Add "single logo, centered, clean background, professional logo design, vector style, high resolution" as quality tags. NEVER mention "variations", "options", "versions", or "grid".`;
  };

  const generatePromptOnly = async () => {
    if (!brandName.trim()) {
      toast.error("Brand Name ထည့်ပေးပါ");
      return;
    }
    setIsLoading(true);
    setGeneratedPrompt("");
    setExecutedResult("");
    setActiveMode("generate");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Professional logo design for "${brandName.trim()}"`,
          category: "logo-design",
          categoryDescription: "Professional Logo Design Prompt",
          tone: "Professional",
          context: buildLogoContext(),
        },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        playSuccessSound();
        toast.success("Logo prompt ထုတ်ပြီးပါပြီ! 🎨");
        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id, action_type: "logo_prompt", topic: brandName.trim(), category: "logo-design",
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
    if (!brandName.trim()) {
      toast.error("Brand Name ထည့်ပေးပါ");
      return;
    }
    setIsLoading(true);
    setGeneratedPrompt("");
    setExecutedResult("");
    setActiveMode("execute");

    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          topic: `Professional logo design for "${brandName.trim()}"`,
          category: "logo-design",
          categoryDescription: "Professional Logo Design Prompt",
          tone: "Professional",
          context: buildLogoContext(),
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
          toast.success("Logo prompt execute ပြီးပါပြီ! 🚀");
          if (user) {
            await supabase.from("usage_logs").insert({
              user_id: user.id, action_type: "logo_prompt_execute", topic: brandName.trim(), category: "logo-design",
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

  const isDisabled = isLoading || isExecuting || !brandName.trim();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          👑 Logo Prompt Generator
        </span>
        <AiSuggestButton onClick={handleAiSuggest} isLoading={isSuggesting} disabled={!brandName.trim()} />
        <RainbowButton onClick={fillRandomIdea} disabled={isRandomizing}>
          {isRandomizing ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              Generating...
            </>
          ) : "🎲 Random Idea (AI)"}
        </RainbowButton>
      </div>

      {/* Brand Name & Tagline */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Brand Name *</label>
          <GlowTextarea
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. NovaSpark, TechVault, AuraFlow..."
            rows={1}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Tagline <span className="text-muted-foreground">(optional)</span>
          </label>
          <GlowTextarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Ignite Your Vision, Beyond Innovation..."
            rows={1}
          />
        </div>
      </div>

      {/* Logo Style */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">Logo Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LOGO_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setLogoStyle(style.id)}
              className={`glossy-chip text-left text-xs py-2 px-3 ${logoStyle === style.id ? "glossy-chip--active" : ""}`}
            >
              <div className="font-medium">{style.label}</div>
              <div className="text-[10px] opacity-70">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Industry */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">Industry / Niche</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
        >
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {/* Color Scheme */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">Color Scheme</label>
        <div className="flex flex-wrap gap-2">
          {COLOR_SCHEMES.map((c) => (
            <button
              key={c.id}
              onClick={() => setColorScheme(c.id)}
              className={`glossy-chip ${colorScheme === c.id ? "glossy-chip--active" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Typography & Icon Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <label className="text-sm font-medium text-foreground mb-3 block">Typography Style</label>
          <select
            value={typographyStyle}
            onChange={(e) => setTypographyStyle(e.target.value)}
            className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
          >
            {TYPOGRAPHY_STYLES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <label className="text-sm font-medium text-foreground mb-3 block">Icon / Symbol Type</label>
          <select
            value={iconType}
            onChange={(e) => setIconType(e.target.value)}
            className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
          >
            {ICON_TYPES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Details */}
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Additional Details <span className="text-muted-foreground">(optional)</span>
        </label>
        <GlowTextarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Target audience, brand personality, specific symbols to include/avoid..."
          rows={2}
        />
      </div>

      {/* Button Descriptions */}
      <div className="glass-subtle rounded-2xl p-3">
        <div className="grid grid-cols-2 gap-3 text-xs text-foreground/80">
          <div className="flex items-start gap-1.5">
            <span className="text-primary font-bold">①</span>
            <span>Logo prompt ကိုပဲ generate လုပ်ပြီး copy ယူနိုင်</span>
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
          <span>Logo Prompt Generate</span>
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

export default LogoPromptTab;
