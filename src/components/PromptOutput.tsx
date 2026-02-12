import { useState } from "react";
import { Copy, Check, Wand2, Download, ChevronDown, ChevronUp } from "lucide-react";

interface PromptOutputProps {
  prompt: string;
  isLoading: boolean;
  imageUrl?: string;
  isImageMode?: boolean;
  executedResult?: string;
  isExecuting?: boolean;
}

const PromptOutput = ({ prompt, isLoading, imageUrl, isImageMode, executedResult, isExecuting }: PromptOutputProps) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  const handleCopy = async (text: string, type: "prompt" | "result") => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    if (type === "prompt") {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-8 min-h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-base text-muted-foreground animate-pulse">
            {isImageMode ? "Generating image... 🎨" : "Prompt generate လုပ်နေပါတယ်..."}
          </p>
        </div>
      </div>
    );
  }

  if (!prompt && !imageUrl && !isExecuting) {
    return (
      <div className="glass-card rounded-2xl p-8 min-h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
            <Wand2 className="w-8 h-8 animate-float" />
          </div>
          <p className="text-base">
            {isImageMode ? "Generated image ဒီမှာ ပေါ်ပါမယ် 🎨" : "Generated prompt များ ဒီမှာ ပေါ်ပါမယ်"}
          </p>
        </div>
      </div>
    );
  }

  // Image output
  if (imageUrl) {
    return (
      <div className="glass-card rounded-2xl p-6 relative group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-primary">Generated Image 🎨</h3>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-primary"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
        <div className="glass-subtle rounded-xl p-2 overflow-hidden">
          <img
            src={imageUrl}
            alt="AI Generated"
            className="w-full rounded-xl object-contain max-h-[512px]"
          />
        </div>
        {prompt && (
          <div className="mt-3 glass-subtle rounded-xl p-3">
            <p className="text-xs text-muted-foreground">{prompt}</p>
          </div>
        )}
      </div>
    );
  }

  // Text prompt + executed result output
  const hasExecutedResult = !!executedResult || isExecuting;

  return (
    <div className="space-y-4">
      {/* Generated Prompt */}
      {prompt && (
        <div className="glass-card rounded-2xl p-6 relative group">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-primary">
              {hasExecutedResult ? "📝 Generated Prompt" : "Generated Prompt"}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(prompt, "prompt")}
                className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-primary"
              >
                {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedPrompt ? "Copied!" : "Copy"}
              </button>
              {hasExecutedResult && (
                <button
                  onClick={() => setShowPrompt(!showPrompt)}
                  className="flex items-center gap-1 px-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPrompt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
          {showPrompt && (
            <div className="glass-subtle rounded-xl p-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{prompt}</p>
            </div>
          )}
        </div>
      )}

      {/* Executing spinner */}
      {isExecuting && (
        <div className="glass-card rounded-2xl p-8 min-h-[200px] flex items-center justify-center border-accent/20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            <p className="text-base text-muted-foreground animate-pulse">
              Prompt ကို execute လုပ်နေပါတယ်... 🚀
            </p>
          </div>
        </div>
      )}

      {/* Executed Result */}
      {executedResult && (
        <div className="glass-card rounded-2xl p-6 relative group border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-accent">🚀 Executed Result</h3>
            <button
              onClick={() => handleCopy(executedResult, "result")}
              className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-accent"
            >
              {copiedResult ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedResult ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="glass-subtle rounded-xl p-4">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{executedResult}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptOutput;
