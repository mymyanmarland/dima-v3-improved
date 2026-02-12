import { useState } from "react";
import { Sparkles, ChevronDown, ImageIcon } from "lucide-react";
import PromptOutput from "./PromptOutput";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = [
  { id: "coding", label: "💻 Coding", description: "Programming & Development" },
  { id: "writing", label: "✍️ Writing", description: "Content & Creative Writing" },
  { id: "marketing", label: "📢 Marketing", description: "Marketing & Advertising" },
  { id: "education", label: "📚 Education", description: "Teaching & Learning" },
  { id: "business", label: "💼 Business", description: "Business & Strategy" },
  { id: "creative", label: "🎨 Creative", description: "Art & Design" },
  { id: "data", label: "📊 Data", description: "Data Analysis & Science" },
  { id: "general", label: "🌐 General", description: "General Purpose" },
  { id: "image", label: "🖼️ Image", description: "AI Image Generation" },
];

const TONES = [
  "Professional",
  "Casual",
  "Technical",
  "Creative",
  "Persuasive",
  "Educational",
];

const PromptGenerator = () => {
  const [category, setCategory] = useState("general");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const selectedCategory = CATEGORIES.find((c) => c.id === category);
  const isImageMode = category === "image";

  const generatePrompt = async () => {
    if (!topic.trim()) {
      toast.error("Topic ထည့်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");
    setGeneratedImage("");

    try {
      if (isImageMode) {
        // Image generation mode
        const imagePrompt = context.trim()
          ? `${topic.trim()}. ${context.trim()}`
          : topic.trim();

        const { data, error } = await supabase.functions.invoke("generate-image", {
          body: { prompt: imagePrompt },
        });

        if (error) {
          throw new Error(error.message || "Image generate လုပ်ရာတွင် error ဖြစ်ပါသည်");
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        if (data?.imageUrl) {
          setGeneratedImage(data.imageUrl);
          setGeneratedPrompt(data.text || "");
          toast.success("Image generated successfully! 🎨");
        } else {
          throw new Error("Image generate မရပါ");
        }
      } else {
        // Prompt generation mode
        const { data, error } = await supabase.functions.invoke("generate-prompt", {
          body: {
            topic: topic.trim(),
            category,
            categoryDescription: selectedCategory?.description || "General Purpose",
            tone,
            context: context.trim() || undefined,
          },
        });

        if (error) {
          throw new Error(error.message || "Prompt generate လုပ်ရာတွင် error ဖြစ်ပါသည်");
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        if (data?.prompt) {
          setGeneratedPrompt(data.prompt);
          toast.success("Prompt generated successfully! ✨");
        } else {
          throw new Error("Response ထဲမှာ prompt မပါပါ");
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Generate လုပ်ရာတွင် error ဖြစ်ပါသည်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Category Selection */}
      <div className="glass glow-border rounded-xl p-4 relative z-20">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Category ရွေးပါ
        </label>
        <div className="relative">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground hover:border-primary/30 transition-all"
          >
            <span>{selectedCategory?.label} {selectedCategory?.description}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showCategories ? "rotate-180" : ""}`} />
          </button>
          {showCategories && (
            <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    setShowCategories(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-primary/5 ${
                    category === cat.id ? "bg-primary/10 text-primary" : "text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-muted-foreground text-xs">{cat.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tone Selection - hidden for image mode */}
      {!isImageMode && (
        <div className="glass glow-border rounded-xl p-4">
          <label className="text-sm font-medium text-foreground mb-3 block">
            Tone ရွေးပါ
          </label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  tone === t
                    ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                    : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Topic Input */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          {isImageMode ? "Image Description *" : "Topic / Subject *"}
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={isImageMode
            ? "e.g., A beautiful sunset over mountains with purple sky"
            : "e.g., React component for user dashboard"
          }
          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Context Input */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          {isImageMode ? "Style Details" : "Additional Context"}{" "}
          <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={isImageMode
            ? "e.g., digital art, 4k, vibrant colors, cinematic lighting..."
            : "ထပ်ဖြည့်ချင်တဲ့ details တွေ ထည့်ပါ..."
          }
          rows={3}
          className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePrompt}
        disabled={isLoading || !topic.trim()}
        className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-primary"
      >
        {isImageMode ? <ImageIcon className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        {isLoading
          ? isImageMode ? "Generating Image..." : "Generating..."
          : isImageMode ? "Generate Image 🎨" : "Generate Prompt"
        }
      </button>

      {/* Output */}
      <PromptOutput
        prompt={generatedPrompt}
        isLoading={isLoading}
        imageUrl={generatedImage}
        isImageMode={isImageMode}
      />
    </div>
  );
};

export default PromptGenerator;
