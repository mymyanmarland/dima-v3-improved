import { useEffect, useState } from "react";
import { Lightbulb, X, Settings, Wand2 } from "lucide-react";

const STORAGE_KEY = "dima_onboarding_hidden_v1";

const OnboardingHelper = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isHidden = localStorage.getItem(STORAGE_KEY) === "1";
    setHidden(isHidden);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setHidden(true);
  };

  if (hidden) return null;

  return (
    <div className="glass-card rounded-2xl p-4 md:p-5 border border-primary/30 mb-4 relative">
      <button
        onClick={close}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        aria-label="Close onboarding helper"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm md:text-base font-semibold text-foreground">
            Quick Start (1 min)
          </h3>
          <div className="space-y-1.5 text-xs md:text-sm text-foreground/85">
            <p className="flex items-center gap-2"><Settings className="w-4 h-4 text-primary" /> Header က ⚙️ ကိုနှိပ်ပြီး API Key ထည့်ပါ</p>
            <p className="flex items-center gap-2"><Wand2 className="w-4 h-4 text-accent" /> Topic ရေးပြီး <b>Prompt Generate</b> (သို့) <b>Generate + Execute</b> ကိုနှိပ်ပါ</p>
            <p>Gemini အဆင်မပြေရင် system က OpenRouter Auto / Qwen fallback နဲ့ ဆက်လုပ်ပေးပါမယ် ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingHelper;
