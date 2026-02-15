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
      {/* Floating Button - Cute animated bot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat Assistant"
      >
        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen 
            ? "bg-destructive/90 scale-90 rotate-90" 
            : "bg-gradient-to-br from-primary via-accent to-primary scale-100"
        }`}
          style={{
            boxShadow: isOpen
              ? "0 4px 20px hsl(var(--destructive) / 0.4)"
              : "0 4px 30px hsl(var(--primary) / 0.5), 0 0 60px hsl(var(--accent) / 0.2)",
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary-foreground transition-transform duration-300" />
          ) : (
            <div className="relative">
              {/* Cute robot face */}
              <div className="text-2xl animate-bounce" style={{ animationDuration: "2s" }}>🤖</div>
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background animate-pulse" />
            </div>
          )}
        </div>
        {/* Ripple ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" style={{ animationDuration: "2.5s" }} />
        )}
      </button>

      {/* Popup Window */}
      {isOpen && (
        <div 
          className="fixed bottom-[5.5rem] right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[72vh] flex flex-col overflow-hidden animate-scale-in"
          style={{
            borderRadius: "1.5rem",
            background: "hsl(var(--card) / 0.85)",
            backdropFilter: "blur(20px) saturate(1.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid hsl(var(--border) / 0.5)",
            boxShadow: "0 25px 60px -12px hsl(var(--primary) / 0.2), 0 0 0 1px hsl(var(--border) / 0.3), inset 0 1px 0 hsl(var(--foreground) / 0.05)",
          }}
        >
          {/* Header - Gradient glassmorphism */}
          <div 
            className="relative flex items-center justify-between px-4 py-3.5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))",
              borderBottom: "1px solid hsl(var(--border) / 0.4)",
            }}
          >
            {/* Decorative blobs */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -top-4 right-10 w-14 h-14 rounded-full bg-accent/10 blur-xl" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                    boxShadow: "0 4px 12px hsl(var(--primary) / 0.4)",
                  }}
                >
                  🤖
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-card" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  Guide Bot
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                </h3>
                <p className="text-[10px] text-muted-foreground font-medium">သုံးနည်း သင်ပေးမယ် 💫</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 relative z-10">
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
                {/* Cute welcome illustration */}
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent) / 0.12))",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    <span className="animate-bounce" style={{ animationDuration: "2s" }}>👋</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-lg">✨</div>
                </div>
                
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-foreground/80">မင်္ဂလာပါ!</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Website သုံးနည်း မေးခွန်းမေးလို့ရပါတယ် 🚀
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 w-full mt-1">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="group/chip text-xs text-left px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2"
                      style={{
                        background: "hsl(var(--secondary) / 0.5)",
                        border: "1px solid hsl(var(--border) / 0.4)",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      <span className="text-base">{["💡", "🔑", "⚡"][i]}</span>
                      <span className="text-foreground/70 group-hover/chip:text-foreground transition-colors">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-2.5 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                {msg.role === "assistant" && (
                  <div 
                    className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-1 text-sm"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-xs whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-2xl rounded-br-lg text-primary-foreground"
                      : "rounded-2xl rounded-bl-lg text-foreground"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent) / 0.8))",
                          boxShadow: "0 2px 12px hsl(var(--primary) / 0.25)",
                        }
                      : {
                          background: "hsl(var(--secondary) / 0.6)",
                          border: "1px solid hsl(var(--border) / 0.3)",
                        }
                  }
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div 
                    className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-1 text-sm"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                      boxShadow: "0 2px 8px hsl(var(--primary) / 0.3)",
                    }}
                  >
                    😊
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5 animate-fade-in">
                <div 
                  className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-sm"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))",
                    border: "1px solid hsl(var(--primary) / 0.15)",
                  }}
                >
                  🤖
                </div>
                <div 
                  className="rounded-2xl rounded-bl-lg px-4 py-3"
                  style={{
                    background: "hsl(var(--secondary) / 0.6)",
                    border: "1px solid hsl(var(--border) / 0.3)",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Glassmorphic */}
          <div 
            className="px-3 py-3"
            style={{
              borderTop: "1px solid hsl(var(--border) / 0.3)",
              background: "hsl(var(--secondary) / 0.2)",
            }}
          >
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl"
              style={{
                background: "hsl(var(--background) / 0.7)",
                border: "1px solid hsl(var(--border) / 0.4)",
                boxShadow: "inset 0 1px 3px hsl(var(--background) / 0.5)",
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="မေးခွန်းမေးပါ... ✨"
                className="flex-1 resize-none bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none py-1.5"
                rows={1}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-30 transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                style={{
                  background: input.trim() && !isLoading
                    ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))"
                    : "hsl(var(--muted))",
                  boxShadow: input.trim() && !isLoading
                    ? "0 2px 10px hsl(var(--primary) / 0.4)"
                    : "none",
                }}
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
