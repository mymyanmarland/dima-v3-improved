import { useState, useEffect } from "react";
import { Key, Eye, EyeOff, X, Save, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ApiKeyModalProps {
  onClose: () => void;
}

type Provider = "gemini" | "openrouter";

const PROVIDERS: { id: Provider; label: string; placeholder: string; helpUrl: string; helpLabel: string }[] = [
  {
    id: "openrouter",
    label: "🌐 OpenRouter",
    placeholder: "sk-or-v1-... API Key ထည့်ပါ",
    helpUrl: "https://openrouter.ai/keys",
    helpLabel: "OpenRouter",
  },
  {
    id: "gemini",
    label: "✨ Gemini",
    placeholder: "AIzaSy... API Key ထည့်ပါ",
    helpUrl: "https://aistudio.google.com/apikey",
    helpLabel: "Google AI Studio",
  },
];

const validateApiKey = (provider: Provider, value: string) => {
  const key = value.trim();
  if (!key) return { ok: false, message: "API Key ထည့်ပါ" };

  if (provider === "openrouter") {
    if (!key.startsWith("sk-or-")) {
      return { ok: false, message: "OpenRouter key က sk-or- နဲ့ စရပါမယ်" };
    }
    return { ok: true, message: "" };
  }

  if (!key.startsWith("AIza")) {
    return { ok: false, message: "Gemini key က AIza နဲ့ စရပါမယ်" };
  }
  return { ok: true, message: "" };
};

const ApiKeyModal = ({ onClose }: ApiKeyModalProps) => {
  const { user } = useAuth();
  const [provider, setProvider] = useState<Provider>("openrouter");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  // Track keys per provider
  const [providerKeys, setProviderKeys] = useState<Record<Provider, { hasKey: boolean; maskedKey: string }>>({
    gemini: { hasKey: false, maskedKey: "" },
    openrouter: { hasKey: false, maskedKey: "" },
  });

  useEffect(() => {
    if (user) {
      loadAllKeys();
    }
  }, [user]);

  useEffect(() => {
    const pk = providerKeys[provider];
    if (pk.hasKey) {
      setApiKey(pk.maskedKey);
      setHasKey(true);
    } else {
      setApiKey("");
      setHasKey(false);
    }
    setShowKey(false);
    setValidationMsg("");
  }, [provider, providerKeys]);

  const loadAllKeys = async () => {
    for (const p of PROVIDERS) {
      try {
        const { data, error } = await supabase.functions.invoke("manage-api-key", {
          body: { action: "check", provider: p.id },
        });
        if (error) throw error;
        if (data?.hasKey) {
          setProviderKeys((prev) => ({
            ...prev,
            [p.id]: { hasKey: true, maskedKey: data.maskedKey },
          }));
        }
      } catch (err) {
        console.error(`Failed to check ${p.id} API key:`, err);
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const validation = validateApiKey(provider, apiKey);
    if (!validation.ok) {
      setValidationMsg(validation.message);
      toast.error(validation.message);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("manage-api-key", {
        body: { action: "save", apiKey: apiKey.trim(), provider },
      });
      if (error) throw error;

      // Reload to show masked version
      const { data: checkData } = await supabase.functions.invoke("manage-api-key", {
        body: { action: "check", provider },
      });

      setProviderKeys((prev) => ({
        ...prev,
        [provider]: {
          hasKey: true,
          maskedKey: checkData?.maskedKey || "●●●●",
        },
      }));

      toast.success(`${provider === "openrouter" ? "OpenRouter" : "Gemini"} API Key သိမ်းပြီးပါပြီ ✅`);
    } catch (err) {
      toast.error("API Key သိမ်းရာတွင် error ဖြစ်ပါတယ်");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("manage-api-key", {
        body: { action: "delete", provider },
      });
      if (error) throw error;

      setProviderKeys((prev) => ({
        ...prev,
        [provider]: { hasKey: false, maskedKey: "" },
      }));

      toast.success(`${provider === "openrouter" ? "OpenRouter" : "Gemini"} API Key ဖျက်ပြီးပါပြီ`);
    } catch (err) {
      toast.error("Error ဖြစ်ပါတယ်");
    } finally {
      setLoading(false);
    }
  };

  const currentProvider = PROVIDERS.find((p) => p.id === provider)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
      <div className="glass glow-border rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">API Key Settings</h3>
        </div>

        {/* Provider Selector */}
        <div className="flex gap-2 mb-4">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setProvider(p.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
                provider === p.id
                  ? "bg-primary/15 text-primary border-primary/40"
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20"
              }`}
            >
              <span>{p.label}</span>
              {providerKeys[p.id].hasKey && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          {provider === "openrouter" ? (
            <>
              OpenRouter API Key ထည့်ပြီး AI models အမျိုးမျိုးကို အသုံးပြုနိုင်ပါတယ်။
              API Key ကို{" "}
              <a href={currentProvider.helpUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {currentProvider.helpLabel}
              </a>{" "}
              မှာ ရယူနိုင်ပါတယ်။
            </>
          ) : (
            <>
              ကိုယ်ပိုင် Gemini API Key ထည့်ပါ။ မထည့်ရင် Lovable AI ကို အသုံးပြုပါမယ်။
              API Key ကို{" "}
              <a href={currentProvider.helpUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {currentProvider.helpLabel}
              </a>{" "}
              မှာ ရယူနိုင်ပါတယ်။
            </>
          )}
        </p>

        <div className="relative mb-4">
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => {
              const next = e.target.value;
              setApiKey(next);
              const validation = validateApiKey(provider, next);
              setValidationMsg(validation.ok ? "" : validation.message);
            }}
            placeholder={currentProvider.placeholder}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-mono"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {validationMsg && (
          <p className="text-xs text-amber-400 mb-3">⚠️ {validationMsg}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim() || loading || !validateApiKey(provider, apiKey).ok}
            className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          {hasKey && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="py-2.5 px-4 bg-destructive/10 text-destructive border border-destructive/30 rounded-lg font-medium text-sm hover:bg-destructive/20 transition-all disabled:opacity-40 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-secondary/20 rounded-lg border border-border/50">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            💡 API Key ထည့်ထားရင် ကိုယ်ပိုင် key ကို ဦးစားပေးသုံးပါမယ်။ မထည့်ရင် Lovable AI ကို အသုံးပြုပါမယ်။
            Key တွေကို encrypted လုပ်ပြီး လုံခြုံစွာ သိမ်းထားပါတယ် 🔒
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
