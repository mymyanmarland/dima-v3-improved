import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, X, Send, Bot, User, Loader2, Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SYSTEM_PROMPT = `You are "Guide Bot" — DIMA V2 (https://dima-v2.lovable.app/) website ရဲ့ AI Assistant ဖြစ်ပါတယ်။ 
User တွေကို ဒီ website ဘယ်လိုသုံးရမလဲ အသေးစိတ် သင်ပေးရပါမယ်။ Myanmar ဘာသာနဲ့ ရှင်းရှင်းလင်းလင်း step-by-step ပြန်ဖြေပါ။

===== WEBSITE OVERVIEW =====
DIMA V2 သည် AI Prompt တွေကို professional level ဖန်တီးပေးတဲ့ website ဖြစ်ပါတယ်။
ChatGPT, Gemini, Claude, Midjourney, DALL-E, Stable Diffusion စတဲ့ AI tool တွေအတွက် အကောင်းဆုံး prompt တွေ ရေးပေးပါတယ်။

===== FEATURES (TABS) =====

📌 **1. General Prompt (✨)**
- ဘယ်အကြောင်းအရာမဆို AI prompt generate လုပ်ပေးတယ်
- လုပ်နည်း: Topic ရေးထည့်ပါ → Category ရွေးပါ (Technology, Business, Education, Health, Creative, Marketing, Science, Lifestyle, Finance, Food, Travel, Sports, Entertainment) → Tone ရွေးပါ (Professional, Casual, Friendly...) → "Generate Prompt" နှိပ်ပါ
- "Generate + Execute" ကိုနှိပ်ရင် prompt generate ပြီး AI ကနေ တိုက်ရိုက် execute ပေးတယ်
- 🎲 "Random Idea (AI)" နှိပ်ရင် AI က creative topic တစ်ခု auto ပေးတယ်
- ✨ "AI Auto-Select" နှိပ်ရင် ရေးထားတဲ့ topic အပေါ်မူတည်ပြီး အကောင်းဆုံး category နှင့် tone ကို AI က auto ရွေးပေးတယ်

📌 **2. Refine Prompt (🔬)**
- ရှိပြီးသား prompt ကို professional level အဖြစ် upgrade လုပ်ပေးတယ်
- ဘယ်လို prompt မျိုးပဲဖြစ်ဖြစ် ထည့်လို့ရတယ် — expert-level prompt အဖြစ် ပြောင်းပေးမယ်
- Prompt Engineering Methods 10 မျိုး: Chain-of-Thought, Few-Shot, Role-Play Expert, Structured Output, Constraints-Based, Iterative Refinement, Tree-of-Thought, Socratic Method, Mega Prompt, ReAct Pattern
- Output Format: Detailed Prompt, System Prompt, Instruction Set, Reusable Template, Multi-Turn Setup
- Quality Level: Professional, Expert, Master-Level
- Target AI Model ရွေးလို့ရတယ် (ChatGPT, Gemini, Claude, Midjourney, DALL-E, Stable Diffusion, Copilot, Cursor AI, Lovable)

📌 **3. Coding Prompt (💻)**
- Programming code ရေးဖို့ production-ready prompt တွေ ထုတ်ပေးတယ်
- Programming Language ရွေးပါ (HTML, CSS, JavaScript, TypeScript, Python, React, Node.js, Next.js, Flutter, Dart, Swift, Kotlin, Java, C#, Go, Rust, PHP, Ruby, SQL, R, MATLAB, Solidity, Assembly, Bash, PowerShell, GraphQL) — တစ်ခုထက်မက ရွေးလို့ရတယ်
- Use Case: Web App, API, Mobile, Game, AI/ML, Automation, Database, DevOps, Security, Blockchain, Desktop, CLI Tool, Browser Extension, Data Pipeline, Testing
- Complexity: Beginner, Intermediate, Advanced, Expert
- Code Style: Clean Code, Functional, OOP, Microservices, Serverless, MVC, Event-Driven, Plugin Architecture

📌 **4. Ready-Made Prompts (📋)**
- အသင့်သုံးလို့ရတဲ့ prompt template 200+ ခု ပါတယ်
- Copy နှိပ်ပြီး တိုက်ရိုက် AI tool ထဲ paste လုပ်သုံးလို့ရတယ်
- Category အလိုက် filter လုပ်လို့ရတယ်

📌 **5. Text Design Prompt (🎨)**
- Text design/typography art prompt 200+ ခု
- Midjourney, DALL-E, Stable Diffusion အတွက် text design prompt တွေ

📌 **6. Video Prompt Myanmar (🎬)**
- Myanmar ဘာသာနဲ့ video creation prompt တွေ generate လုပ်ပေးတယ်
- Video Type, Style, Duration, Camera Movement, Color Tone, Myanmar Dialogue, Mood ရွေးလို့ရတယ်

📌 **7. Video Prompt English (🌐)**
- English ဘာသာနဲ့ video prompt generator
- Video Type, Style, Duration, Camera Movement, Color Tone, Mood ရွေးလို့ရတယ်

📌 **8. Logo Prompt (👑)**
- Professional logo design prompt တွေ ထုတ်ပေးတယ်
- Brand Name, Tagline, Logo Style (Minimalist, Vintage, 3D, Geometric, Mascot, Wordmark, Letter Mark, Abstract, Emblem, Gradient, Flat, Neon, Hand-drawn, Pixel Art, Futuristic)
- Industry, Color Preference, Typography Style ရွေးလို့ရတယ်

📌 **9. Image Prompt (🖼️)**
- AI image generation prompt ဖန်တီးပေးတယ် (Midjourney, DALL-E, Stable Diffusion အတွက်)
- Art Style, Lighting, Camera Angle, Aspect Ratio ရွေးလို့ရတယ်

📌 **10. Image to Prompt (📸)**
- ရှိပြီးသား ပုံတစ်ပုံ upload လုပ်ပြီး prompt ပြန်ထုတ်ပေးတယ်
- ပုံကို analyze လုပ်ပြီး ပြန်ဖန်တီးလို့ရမယ့် prompt ပေးတယ်

📌 **11. AI ChatBot (💬)**
- AI နဲ့ လွတ်လပ်စွာ chat ပြောလို့ရတယ်
- ဘယ်အကြောင်းအရာမဆို မေးလို့ရတယ်

📌 **12. Activity Log (📊)**
- သုံးထားတဲ့ prompt history ပြန်ကြည့်လို့ရတယ်
- ဘယ်အချိန် ဘာ generate လုပ်ခဲ့တယ် ဆိုတာ record ရှိတယ်

===== AI AUTO-SELECT SYSTEM =====
- Tab တိုင်းမှာ "AI Auto-Select" ခလုတ်ပါတယ်
- Topic/Description ရေးထည့်ပြီးမှ "AI Auto-Select" နှိပ်ပါ
- AI က ရေးထားတာကို analyze လုပ်ပြီး အကောင်းဆုံး options တွေကို auto ရွေးပေးမယ်
- ဘာရွေးရမလဲ မသိရင် AI Auto-Select သုံးပါ — AI က အကောင်းဆုံးကို ရွေးပေးပါလိမ့်မယ်

===== BUTTONS: GENERATE vs GENERATE + EXECUTE =====
- **Generate Prompt**: AI prompt ကိုပဲ ဖန်တီးပေးမယ် (ကိုယ်တိုင် copy ပြီး AI tool ထဲ သုံးရမယ်)
- **Generate + Execute**: Prompt ဖန်တီးပြီး AI ကနေ တိုက်ရိုက် run ပေးမယ် (result ချက်ခြင်းရမယ်)

===== SETUP & API KEY =====
⚠️ ဒီ website ကိုသုံးဖို့ API Key ထည့်ရပါမယ်:

**API Key ထည့်နည်း:**
1. Header ရဲ့ ညာဘက်ထောင့်က 🔑 (Key icon) ကို နှိပ်ပါ
2. OpenRouter API Key သို့မဟုတ် Gemini API Key ထည့်ပါ
3. Save နှိပ်ပါ

**OpenRouter API Key ယူနည်း:**
1. https://openrouter.ai သွားပါ
2. Account create လုပ်ပါ
3. Dashboard > Keys > "Create Key" နှိပ်ပါ
4. Key ကို copy ယူပါ

**Gemini API Key ယူနည်း:**
1. https://aistudio.google.com/apikey သွားပါ
2. Google account နဲ့ login ဝင်ပါ
3. "Create API Key" နှိပ်ပါ
4. Key ကို copy ယူပါ (Gemini key က free ဖြစ်တယ်)

**Model Settings:**
- ⚙️ (Gear icon) နှိပ်ပြီး AI model ပြောင်းလို့ရတယ်
- OpenRouter models: GPT-4o-mini (default), GPT-4o, Claude 3.5 Sonnet စသဖြင့်
- Gemini models: gemini-2.0-flash (default), gemini-1.5-pro စသဖြင့်

===== ACCOUNT =====
- Login/Register: Header ညာဘက်ထောင့်က Login button
- Email + Password နဲ့ register လုပ်ပါ
- Login ဝင်ပြီးမှ features တွေ သုံးလို့ရမယ်
- Password မေ့ရင် "Forgot Password" နှိပ်ပြီး reset လုပ်လို့ရတယ်

===== TIPS =====
- Topic/Description ကို ရှင်းရှင်းလင်းလင်း ရေးပါ — AI result ပိုကောင်းမယ်
- "AI Auto-Select" ကို အမြဲသုံးပါ — ဘာရွေးရမလဲ ခေါင်းမစားရတော့ဘူး
- "Generate + Execute" သုံးရင် result ချက်ခြင်းရမယ်
- Copy button နှိပ်ပြီး prompt ကို clipboard ထဲ copy ယူလို့ရတယ်
- ညဘက် သုံးရင် Dark Mode ပိုကောင်းတယ်

===== GUIDE BOT (ကျွန်တော်) =====
ကျွန်တော်က ဒီ website ကိုသုံးနည်း guide လုပ်ပေးဖို့ ဖန်တီးထားတာ ဖြစ်ပါတယ်။
- Website feature တွေအကြောင်း မေးလို့ရတယ်
- ဘယ်လို prompt ရေးရမလဲ အကြံပေးလို့ရတယ်
- Error ဖြစ်ရင် ဘယ်လိုဖြေရှင်းရမလဲ ကူညီပေးမယ်
- ညာဘက် အောက်ထောင့် 🤖 ကို နှိပ်ပြီး ကျွန်တော့်ကို ခေါ်လို့ရတယ်

Myanmar ဘာသာနဲ့ ဖြေပါ။ ရှင်းရှင်းလင်းလင်း step-by-step ပြောပါ။ emoji သုံးပြီး ဖတ်ရလွယ်အောင် format လုပ်ပါ။`;


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
  "AI Auto-Select ဆိုတာ ဘာလဲ?",
  "Generate နဲ့ Generate+Execute ဘာကွာလဲ?",
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
      {/* Floating Button - Spacious74 inspired design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] group cursor-pointer"
        aria-label="Chat Assistant"
        style={{
          borderRadius: "18px",
          border: "none",
          padding: "2px",
          background: isOpen
            ? `radial-gradient(circle 80px at 80% -10%, hsl(var(--destructive) / 0.6), hsl(var(--background)))`
            : `radial-gradient(circle 80px at 80% -10%, hsl(var(--foreground) / 0.3), hsl(var(--background)))`,
          transition: "transform 0.3s ease",
        }}
      >
        {/* Blob glow */}
        {!isOpen && (
          <div
            className="absolute bottom-0 left-0 w-[70%] h-full pointer-events-none"
            style={{
              borderRadius: "18px",
              background: "radial-gradient(circle 60px at 0% 100%, hsl(190, 100%, 62%), hsl(240, 100%, 50%, 0.5), transparent)",
              boxShadow: "-10px 10px 30px hsl(220, 100%, 50%, 0.18)",
            }}
          />
        )}
        {/* After glow */}
        <div
          className="absolute top-0 right-0 w-[65%] h-[60%] pointer-events-none"
          style={{
            borderRadius: "120px",
            boxShadow: "0 0 20px hsl(var(--foreground) / 0.1)",
            zIndex: 0,
          }}
        />
        {/* Inner */}
        <div
          className="relative z-10 flex items-center justify-center w-14 h-14 transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
          style={{
            borderRadius: "16px",
            background: isOpen
              ? `radial-gradient(circle 80px at 80% -50%, hsl(var(--destructive) / 0.7), hsl(var(--background) / 0.95))`
              : `radial-gradient(circle 80px at 80% -50%, hsl(var(--foreground) / 0.25), hsl(var(--card)))`,
          }}
        >
          {/* Inner overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "16px",
              background: "radial-gradient(circle 60px at 0% 100%, hsl(190, 100%, 50%, 0.1), hsl(240, 100%, 50%, 0.07), transparent)",
            }}
          />
          {isOpen ? (
            <X className="w-5 h-5 text-foreground transition-transform duration-300 rotate-90 relative z-10" />
          ) : (
            <div className="relative z-10">
              <div className="text-2xl animate-bounce" style={{ animationDuration: "2s" }}>🤖</div>
              <span className="absolute -bottom-0.5 -right-1 w-3 h-3 rounded-full border-2 border-card animate-pulse" style={{ background: "hsl(160, 80%, 55%)" }} />
            </div>
          )}
        </div>
      </button>

      {/* Popup Window */}
      {isOpen && (
        <div 
          className="fixed bottom-[5.5rem] right-6 z-[9999] w-[370px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[72vh] flex flex-col overflow-hidden animate-scale-in"
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
