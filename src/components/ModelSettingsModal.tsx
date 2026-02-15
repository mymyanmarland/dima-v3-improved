import { useState, useEffect } from "react";
import { Settings, X, Save, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ModelSettingsModalProps {
  onClose: () => void;
}

const GEMINI_MODELS = [
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", description: "Google's most capable model" },
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash", description: "Fast & efficient reasoning" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", description: "Previous gen fast model" },
  { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite", description: "Lightweight & fast" },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", description: "Long context, reliable" },
  { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash", description: "Fast previous gen" },
];

const OPENROUTER_MODELS = [
  // --- Premium Models ---
  { id: "openai/gpt-4.1", label: "GPT-4.1", description: "OpenAI's latest flagship model" },
  { id: "openai/gpt-4.1-mini", label: "GPT-4.1 Mini", description: "Fast & affordable, great quality" },
  { id: "openai/gpt-4.1-nano", label: "GPT-4.1 Nano", description: "Ultra-fast, cheapest OpenAI" },
  { id: "openai/gpt-4o", label: "GPT-4o", description: "Powerful multimodal model" },
  { id: "openai/gpt-4o-mini", label: "GPT-4o Mini", description: "Compact & efficient" },
  { id: "openai/o3", label: "O3", description: "OpenAI reasoning model" },
  { id: "openai/o3-mini", label: "O3 Mini", description: "Fast reasoning model" },
  { id: "openai/o4-mini", label: "O4 Mini", description: "Latest reasoning model" },
  { id: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4", description: "Most capable Claude" },
  { id: "anthropic/claude-3.5-haiku", label: "Claude 3.5 Haiku", description: "Fast Claude model" },
  { id: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro", description: "Google's top model" },
  { id: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", description: "Fast Gemini model" },
  { id: "google/gemini-2.5-flash-preview", label: "Gemini 2.5 Flash Preview", description: "Preview version, image gen support" },
  { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", description: "Previous gen fast model" },
  { id: "meta-llama/llama-4-maverick", label: "Llama 4 Maverick", description: "Meta's latest model" },
  { id: "meta-llama/llama-4-scout", label: "Llama 4 Scout", description: "Meta's efficient model" },
  { id: "meta-llama/llama-3.3-70b-instruct", label: "Llama 3.3 70B", description: "Meta's open model" },
  { id: "deepseek/deepseek-chat-v3-0324", label: "DeepSeek V3", description: "Strong coding & reasoning" },
  { id: "deepseek/deepseek-r1", label: "DeepSeek R1", description: "DeepSeek reasoning model" },
  { id: "mistralai/mistral-large-2411", label: "Mistral Large", description: "Mistral's flagship" },
  { id: "qwen/qwen-2.5-72b-instruct", label: "Qwen 2.5 72B", description: "Alibaba's top model" },
  // --- Free Models ---
  { id: "google/gemma-3-1b-it:free", label: "Gemma 3 1B (Free)", description: "Free, basic tasks" },
  { id: "meta-llama/llama-3.2-3b-instruct:free", label: "Llama 3.2 3B (Free)", description: "Free Llama model" },
  { id: "mistralai/mistral-small-3.1-24b-instruct:free", label: "Mistral Small (Free)", description: "Free Mistral model" },
  { id: "nousresearch/hermes-3-llama-3.1-405b:free", label: "Hermes 3 405B (Free)", description: "Free large model" },
  { id: "deepseek/deepseek-chat-v3-0324:free", label: "DeepSeek V3 (Free)", description: "Free DeepSeek model" },
  { id: "nvidia/nemotron-nano-12b-v2-vl:free", label: "Nemotron Nano 12B VL (Free)", description: "NVIDIA vision-language model" },
  { id: "allenai/molmo-2-8b", label: "Molmo 2 8B", description: "Allen AI vision-language model" },
  { id: "bytedance-seed/seed-1.6-flash", label: "Seed 1.6 Flash", description: "ByteDance fast model" },
  { id: "bytedance-seed/seedream-4.5", label: "Seedream 4.5", description: "ByteDance image generation" },
  { id: "anthropic/claude-opus-4.6", label: "Claude Opus 4.6", description: "Anthropic's most powerful" },
  { id: "sourceful/riverflow-v2-pro", label: "Riverflow V2 Pro", description: "Sourceful advanced model" },
  { id: "sourceful/riverflow-v2-fast", label: "Riverflow V2 Fast", description: "Sourceful fast model" },
  { id: "openai/gpt-5-image-mini", label: "GPT-5 Image Mini", description: "OpenAI image gen (mini)" },
  { id: "openai/gpt-5-image", label: "GPT-5 Image", description: "OpenAI image generation" },
  { id: "google/gemini-2.5-flash-image", label: "Gemini Flash Image", description: "Google image generation" },
  { id: "openrouter/auto", label: "Auto (OpenRouter)", description: "Auto-select best available" },
];

type TabType = "openrouter" | "gemini";

const ModelSettingsModal = ({ onClose }: ModelSettingsModalProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("openrouter");
  const [selectedOpenrouterModel, setSelectedOpenrouterModel] = useState("openai/gpt-4o-mini");
  const [selectedGeminiModel, setSelectedGeminiModel] = useState("gemini-2.0-flash");
  const [loading, setLoading] = useState(false);
  const [initialOpenrouterModel, setInitialOpenrouterModel] = useState("openai/gpt-4o-mini");
  const [initialGeminiModel, setInitialGeminiModel] = useState("gemini-2.0-flash");

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("user_settings")
        .select("openrouter_model, gemini_model")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data?.openrouter_model) {
        setSelectedOpenrouterModel(data.openrouter_model);
        setInitialOpenrouterModel(data.openrouter_model);
      }
      if (data?.gemini_model) {
        setSelectedGeminiModel(data.gemini_model);
        setInitialGeminiModel(data.gemini_model);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const updateData = activeTab === "openrouter"
        ? { openrouter_model: selectedOpenrouterModel }
        : { gemini_model: selectedGeminiModel };

      const { data: existing } = await supabase
        .from("user_settings")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("user_settings")
          .update(updateData)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_settings")
          .insert({ user_id: user.id, ...updateData });
        if (error) throw error;
      }

      if (activeTab === "openrouter") {
        setInitialOpenrouterModel(selectedOpenrouterModel);
      } else {
        setInitialGeminiModel(selectedGeminiModel);
      }
      toast.success("Model setting saved ✅");
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = activeTab === "openrouter"
    ? selectedOpenrouterModel !== initialOpenrouterModel
    : selectedGeminiModel !== initialGeminiModel;

  const currentModels = activeTab === "openrouter" ? OPENROUTER_MODELS : GEMINI_MODELS;
  const selectedModel = activeTab === "openrouter" ? selectedOpenrouterModel : selectedGeminiModel;
  const setSelectedModel = activeTab === "openrouter" ? setSelectedOpenrouterModel : setSelectedGeminiModel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
      <div className="glass glow-border rounded-2xl p-6 w-full max-w-md relative max-h-[85vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Model Settings</h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 mb-4 p-1 bg-secondary/30 rounded-lg border border-border/50">
          <button
            onClick={() => setActiveTab("openrouter")}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              activeTab === "openrouter"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            OpenRouter
          </button>
          <button
            onClick={() => setActiveTab("gemini")}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              activeTab === "gemini"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Gemini
          </button>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          {activeTab === "openrouter"
            ? "OpenRouter API Key သုံးတဲ့အခါ ဘယ် AI model သုံးမည်ကို ရွေးချယ်ပါ။"
            : "Gemini API Key သုံးတဲ့အခါ ဘယ် model သုံးမည်ကို ရွေးချယ်ပါ။"}
        </p>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {currentModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                selectedModel === model.id
                  ? "bg-primary/15 border-primary/40"
                  : "bg-secondary/30 border-border hover:border-primary/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    selectedModel === model.id ? "text-primary" : "text-foreground"
                  }`}>
                    {model.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{model.description}</p>
                </div>
                {selectedModel === model.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
              <p className="text-[9px] text-muted-foreground/70 mt-1 font-mono">{model.id}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={handleSave}
            disabled={!hasChanges || loading}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>

        <div className="mt-3 p-3 bg-secondary/20 rounded-lg border border-border/50">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            {activeTab === "openrouter"
              ? "💡 ဒီ setting က OpenRouter API Key သုံးတဲ့အခါပဲ အသက်ဝင်ပါတယ်။"
              : "💡 ဒီ setting က Gemini API Key သုံးတဲ့အခါပဲ အသက်ဝင်ပါတယ်။ Image generation အတွက်လည်း ဒီ model ကိုပဲ သုံးပါမယ်။"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelSettingsModal;
