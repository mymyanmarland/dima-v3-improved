import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, X, Send, Bot, User, Loader2, Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SYSTEM_PROMPT = `You are KMN Prompt Generator website ရဲ့ AI Assistant ဖြစ်ပါတယ်။ User တွေကို ဒီ website ဘယ်လိုသုံးရမလဲ သင်ပေးပါ။

ဒီ Website မှာ ပါဝင်တဲ့ Features တွေ:
1. **Prompt Generator** - AI prompt တွေ generate လုပ်ပေးတယ်။ Topic ထည့်၊ Category ရွေး၊ Generate နှိပ်ရုံပဲ။
2. **Refine Prompt 🔬** - Raw prompt တွေကို professional prompt engineering method တွေသုံးပြီး ပိုကောင်းအောင် refine လုပ်ပေးတယ်။
3. **Coding Prompt** - Code ရေးဖို့ prompt တွေ ထုတ်ပေးတယ်။
4. **Ready-Made Prompts** - အသင့်သုံးလို့ရတဲ့ prompt template တွေ။
5. **Text Design Prompt** - Text design prompt တွေ generate လုပ်ပေးတယ်။
6. **Video Prompt (MM/EN)** - Video ဖန်တီးဖို့ prompt တွေ Myanmar နဲ့ English နှစ်မျိုးလုံး။
7. **Logo Prompt 👑** - Professional logo design prompt တွေ ထုတ်ပေးတယ်။
8. **Image Prompt** - Image generation prompt တွေ ဖန်တီးပေးတယ်။
9. **Image to Prompt** - ရှိပြီးသား image ကနေ prompt ပြန်ထုတ်ပေးတယ်။
10. **AI ChatBot** - AI နဲ့ chat ပြောလို့ရတယ်။
11. **Activity Log** - သုံးထားတဲ့ history ပြန်ကြည့်လို့ရတယ်။

**အရေးကြီးတဲ့ Setup:**
- Settings (Key button) မှာ API Key ထည့်ရပါမယ်။ OpenRouter သို့မဟုတ် Gemini API key ထည့်ပါ။
- Model Settings မှာ သုံးချင်တဲ့ AI model ရွေးလို့ရပါတယ်။

Myanmar ဘာသာနဲ့ ပြန်ဖြေပါ။ ရှင်းရှင်းလင်းလင်း step-by-step သင်ပေးပါ။`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  if (!token) { onError("Login လုပ်ပါ။"); return; }

  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    onError(body.error || `Error ${resp.status}`);
    return;
  }

  if (!resp.body) { onError("No response body"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: d, value } = await reader.read();
    if (d) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (c) onDelta(c);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw || !raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {}
    }
  }
  onDone();
}

const TypingDots = () => (
  <div className="flex items-center gap-1 px-2 py-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-primary/60"
        style={{ animation: `chatBounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
      />
    ))}
  </div>
);

const SUGGESTIONS = [
  "ဒီ website ဘယ်လိုသုံးရမလဲ?",
  "API Key ဘယ်လိုထည့်ရမလဲ?",
  "Prompt generate ဘယ်လိုလုပ်ရမလဲ?",
];

const ChatBotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    if (!user) {
      toast({ title: "Login လိုပါတယ်", description: "Chat သုံးဖို့ Login လုပ်ပါ။", variant: "destructive" });
      return;
    }

    const userMsg: Msg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast({ title: "Error", description: err, variant: "destructive" });
          setIsLoading(false);
        },
      });
    } catch {
      toast({ title: "Error", description: "Connection failed", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse" />
          </>
        )}
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1">
                  Guide Bot <Sparkles className="w-3 h-3 text-primary" />
                </h3>
                <p className="text-[10px] text-muted-foreground">သုံးနည်း သင်ပေးမယ် ✨</p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="text-xs text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary/50" />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Website သုံးနည်း မေးခွန်းမေးလို့ရပါတယ် 🚀
                </p>
                <div className="flex flex-col gap-1.5 w-full mt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs text-left px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary text-foreground/80 transition-colors border border-border/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-bl-md px-3 py-2">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-2 border-t border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="မေးခွန်းမေးပါ..."
                className="flex-1 resize-none bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                rows={1}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotPopup;
