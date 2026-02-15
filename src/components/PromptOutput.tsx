import { useState } from "react";
import { Copy, Check, Wand2, Download, ChevronDown, ChevronUp, Braces, FileText } from "lucide-react";
import BlobLoader from "./BlobLoader";

interface PromptOutputProps {
  prompt: string;
  isLoading: boolean;
  imageUrl?: string;
  isImageMode?: boolean;
  executedResult?: string;
  isExecuting?: boolean;
}

/**
 * Convert a plain-text prompt into a structured JSON object.
 * Splits by sentence boundaries and groups into logical sections.
 */
function toStructuredJson(prompt: string): string {
  const lines = prompt.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  // Try to detect sections by headings / numbered items / dashes
  const sections: { title: string; content: string[] }[] = [];
  let current: { title: string; content: string[] } = { title: "Main Prompt", content: [] };

  for (const line of lines) {
    // Detect heading-like patterns: "## Heading", "**Heading**", "Heading:", numbered "1. "
    const headingMatch = line.match(
      /^(?:#{1,4}\s+|(?:\*\*|__)(.+?)(?:\*\*|__)\s*$|(\d+)\.\s+(.{3,60}):)/
    );
    if (headingMatch) {
      if (current.content.length > 0 || sections.length === 0) {
        sections.push({ ...current });
      }
      const title = line
        .replace(/^#{1,4}\s+/, "")
        .replace(/^\*\*|^\__|__$|\*\*$/g, "")
        .replace(/:$/, "")
        .trim();
      current = { title, content: [] };
    } else {
      current.content.push(line);
    }
  }
  if (current.content.length > 0 || sections.length === 0) {
    sections.push(current);
  }

  // If only one section with everything in it, produce a simpler structure
  if (sections.length === 1 && sections[0].title === "Main Prompt") {
    const obj: Record<string, unknown> = {
      prompt: prompt.trim(),
      format: "structured",
      sections: splitIntoSentences(prompt),
    };
    return JSON.stringify(obj, null, 2);
  }

  const obj: Record<string, unknown> = {
    format: "structured",
    sections: sections.map((s) => ({
      title: s.title,
      content: s.content.length === 1 ? s.content[0] : s.content,
    })),
    full_prompt: prompt.trim(),
  };
  return JSON.stringify(obj, null, 2);
}

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const PromptOutput = ({ prompt, isLoading, imageUrl, isImageMode, executedResult, isExecuting }: PromptOutputProps) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [viewMode, setViewMode] = useState<"text" | "json">("text");

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

  const displayPrompt = viewMode === "json" && prompt ? toStructuredJson(prompt) : prompt;
  const copyText = viewMode === "json" && prompt ? toStructuredJson(prompt) : prompt;

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-8 min-h-[200px] flex items-center justify-center">
        <BlobLoader text={isImageMode ? "GENERATING IMAGE..." : "GENERATING..."} />
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
              {/* Text / JSON Toggle */}
              <div className="flex items-center rounded-lg overflow-hidden border border-primary/20">
                <button
                  onClick={() => setViewMode("text")}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "text"
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Text ပုံစံ"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Text
                </button>
                <button
                  onClick={() => setViewMode("json")}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "json"
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="JSON/Structured ပုံစံ"
                >
                  <Braces className="w-3.5 h-3.5" />
                  JSON
                </button>
              </div>

              <button
                onClick={() => handleCopy(copyText, "prompt")}
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
              {viewMode === "json" ? (
                <pre className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                  {displayPrompt}
                </pre>
              ) : (
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{displayPrompt}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Executing spinner */}
      {isExecuting && (
        <div className="glass-card rounded-2xl p-8 min-h-[200px] flex items-center justify-center border-accent/20">
          <BlobLoader text="EXECUTING..." />
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
