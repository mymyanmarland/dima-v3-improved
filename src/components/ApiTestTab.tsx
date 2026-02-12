import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, XCircle, Loader2, Play, RotateCcw, Zap, Shield } from "lucide-react";

interface TestResult {
  name: string;
  status: "idle" | "testing" | "pass" | "fail";
  message: string;
  duration?: number;
}

const TESTS: { id: string; name: string; emoji: string; description: string }[] = [
  { id: "generate-prompt", name: "Generate Prompt", emoji: "✨", description: "Prompt တစ်ခု generate လုပ်ပါမယ်" },
  { id: "execute-prompt", name: "Execute Prompt", emoji: "⚡", description: "Prompt တစ်ခုကို AI နဲ့ run ပါမယ်" },
  { id: "chat", name: "AI Chat", emoji: "🤖", description: "Chat message တစ်ခု ပို့ပါမယ်" },
  { id: "generate-image", name: "Image Generate", emoji: "🎨", description: "ပုံတစ်ခု generate ခိုင်းပါမယ်" },
  { id: "image-to-prompt", name: "Image to Prompt", emoji: "🔄", description: "ပုံမှ prompt ထုတ်ပါမယ်" },
];

const ApiTestTab = () => {
  const { session } = useAuth();
  const [results, setResults] = useState<Record<string, TestResult>>(
    Object.fromEntries(TESTS.map((t) => [t.id, { name: t.name, status: "idle", message: "" }]))
  );
  const [isRunningAll, setIsRunningAll] = useState(false);

  const updateResult = (id: string, update: Partial<TestResult>) => {
    setResults((prev) => ({ ...prev, [id]: { ...prev[id], ...update } }));
  };

  const runSingleTest = async (testId: string) => {
    if (!session?.access_token) return;
    updateResult(testId, { status: "testing", message: "Testing...", duration: undefined });
    const start = Date.now();

    try {
      let response: Response;
      const headers: Record<string, string> = {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      };
      const base = import.meta.env.VITE_SUPABASE_URL + "/functions/v1";

      switch (testId) {
        case "generate-prompt":
          response = await fetch(`${base}/generate-prompt`, {
            method: "POST",
            headers,
            body: JSON.stringify({ topic: "API test", category: "general", tone: "professional" }),
          });
          break;
        case "execute-prompt":
          response = await fetch(`${base}/execute-prompt`, {
            method: "POST",
            headers,
            body: JSON.stringify({ prompt: "Say hello in one word." }),
          });
          break;
        case "chat":
          response = await fetch(`${base}/chat`, {
            method: "POST",
            headers,
            body: JSON.stringify({ messages: [{ role: "user", content: "Hi, just testing. Reply with OK." }] }),
          });
          break;
        case "generate-image":
          response = await fetch(`${base}/generate-image`, {
            method: "POST",
            headers,
            body: JSON.stringify({ prompt: "A small blue dot on white background" }),
          });
          break;
        case "image-to-prompt":
          response = await fetch(`${base}/image-to-prompt`, {
            method: "POST",
            headers,
            body: JSON.stringify({ imageUrl: "https://picsum.photos/200" }),
          });
          break;
        default:
          throw new Error("Unknown test");
      }

      const duration = Date.now() - start;

      if (response!.ok) {
        // For chat (streaming), just check ok status
        if (testId === "chat") {
          updateResult(testId, { status: "pass", message: "✅ Streaming response received", duration });
        } else {
          const data = await response!.json();
          const preview =
            data.prompt?.substring(0, 80) ||
            data.result?.substring(0, 80) ||
            (data.imageUrl ? "Image URL received" : "") ||
            "Response received";
          updateResult(testId, { status: "pass", message: `✅ ${preview}...`, duration });
        }
      } else {
        let errorMsg = `Status ${response!.status}`;
        try {
          const err = await response!.json();
          errorMsg = err.error || errorMsg;
        } catch {}
        updateResult(testId, { status: "fail", message: `❌ ${errorMsg}`, duration });
      }
    } catch (err) {
      const duration = Date.now() - start;
      updateResult(testId, {
        status: "fail",
        message: `❌ ${err instanceof Error ? err.message : "Unknown error"}`,
        duration,
      });
    }
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    for (const test of TESTS) {
      await runSingleTest(test.id);
    }
    setIsRunningAll(false);
  };

  const resetAll = () => {
    setResults(
      Object.fromEntries(TESTS.map((t) => [t.id, { name: t.name, status: "idle", message: "" }]))
    );
  };

  const passCount = Object.values(results).filter((r) => r.status === "pass").length;
  const failCount = Object.values(results).filter((r) => r.status === "fail").length;
  const testingCount = Object.values(results).filter((r) => r.status === "testing").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">API Key Test Center</h2>
              <p className="text-sm text-muted-foreground">
                ထည့်ထားတဲ့ API Key တွေ Function အားလုံးမှာ အလုပ်လုပ်မလုပ် စစ်ပါ
              </p>
            </div>
          </div>

          {/* Summary badges */}
          {(passCount > 0 || failCount > 0) && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {passCount > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> {passCount} Passed
                </span>
              )}
              {failCount > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/20">
                  <XCircle className="w-3 h-3" /> {failCount} Failed
                </span>
              )}
              {testingCount > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  <Loader2 className="w-3 h-3 animate-spin" /> {testingCount} Testing
                </span>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={runAllTests}
              disabled={isRunningAll || !session}
              className="fancy-button px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {isRunningAll ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              {isRunningAll ? "Testing..." : "Test All Functions"}
            </button>
            <button
              onClick={resetAll}
              className="glossy-tab px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Test Cards */}
      <div className="space-y-3">
        {TESTS.map((test) => {
          const result = results[test.id];
          const statusColor =
            result.status === "pass"
              ? "border-emerald-500/30 bg-emerald-500/5"
              : result.status === "fail"
              ? "border-red-500/30 bg-red-500/5"
              : result.status === "testing"
              ? "border-blue-500/30 bg-blue-500/5"
              : "border-border/50";

          return (
            <div
              key={test.id}
              className={`glass-card rounded-xl p-4 border transition-all duration-300 ${statusColor}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">{test.emoji}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">{test.name}</h3>
                    <p className="text-xs text-muted-foreground">{test.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {result.duration !== undefined && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {(result.duration / 1000).toFixed(1)}s
                    </span>
                  )}

                  {result.status === "pass" && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                  {result.status === "fail" && <XCircle className="w-5 h-5 text-red-400" />}
                  {result.status === "testing" && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}

                  <button
                    onClick={() => runSingleTest(test.id)}
                    disabled={result.status === "testing" || isRunningAll || !session}
                    className="glossy-tab px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    Test
                  </button>
                </div>
              </div>

              {/* Result message */}
              {result.message && result.status !== "idle" && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground break-all leading-relaxed">
                    {result.message}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!session && (
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 API Key Test လုပ်ရန် Login ဝင်ထားရပါမယ်
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiTestTab;
