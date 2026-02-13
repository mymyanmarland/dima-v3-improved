import { Info, Sparkles, Code, Video, ImageIcon, RefreshCw, MessageSquare, Zap, Shield, Globe, Cpu, Database, Layers } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    title: "General Prompt Generator",
    desc: "AI Prompt တွေကို အလိုအလျောက် ဖန်တီးပေးပြီး ChatGPT, Gemini စတဲ့ AI tools မှာ တိုက်ရိုက်သုံးနိုင်ပါတယ်။",
  },
  {
    icon: <Code className="w-5 h-5 text-primary" />,
    title: "Coding Prompt Generator",
    desc: "Programming နှင့် Development အတွက် အထူးပြုလုပ်ထားတဲ့ Prompt တွေ ဖန်တီးပေးပါတယ်။",
  },
  {
    icon: <Layers className="w-5 h-5 text-primary" />,
    title: "Ready-Made Coding Prompts",
    desc: "ကြိုတင်ပြင်ဆင်ထားတဲ့ Coding Prompt Templates တွေကို တစ်ချက်နှိပ်ရုံနဲ့ သုံးနိုင်ပါတယ်။",
  },
  {
    icon: <Video className="w-5 h-5 text-primary" />,
    title: "Video Prompt Generator",
    desc: "Runway ML, Pika Labs, Sora စတဲ့ AI Video tools အတွက် Prompt တွေ ဖန်တီးပေးပါတယ်။",
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-primary" />,
    title: "Image Prompt Generator",
    desc: "Midjourney, DALL-E, Stable Diffusion အတွက် အရည်အသွေးမြင့် Image Prompt တွေ ထုတ်ပေးပါတယ်။",
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-accent" />,
    title: "Image to Prompt",
    desc: "ပုံတစ်ပုံကို AI နဲ့ analyze လုပ်ပြီး ထပ်တူ ဖန်တီးနိုင်တဲ့ Prompt ပြန်ထုတ်ပေးပါတယ်။",
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
    title: "AI Chatbot",
    desc: "မြန်မာဘာသာအပါအဝင် ဘာသာစကားအမျိုးမျိုးနဲ့ AI နဲ့ စကားပြောနိုင်ပါတယ်။",
  },
];

const benefits = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "အချိန်ကုန်သက်သာ",
    desc: "AI Prompt တွေကို ကိုယ်တိုင်ရေးစရာမလိုဘဲ စက္ကန့်ပိုင်းအတွင်း ရရှိပါတယ်",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "လုံခြုံမှု",
    desc: "API Key များကို encrypted ဖြင့်သိမ်းဆည်းထားပြီး user data ကို ကာကွယ်ထားပါတယ်",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "မြန်မာဘာသာ Support",
    desc: "မြန်မာဘာသာဖြင့် အပြည့်အဝ အသုံးပြုနိုင်ပြီး UI အားလုံး မြန်မာလို ဖြစ်ပါတယ်",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Model ရွေးချယ်နိုင်",
    desc: "Gemini, GPT စတဲ့ AI Model အမျိုးမျိုးကို ကိုယ်တိုင်ရွေးချယ်ပြီး သုံးနိုင်ပါတယ်",
  },
];

const technologies = [
  { icon: <Cpu className="w-5 h-5" />, name: "React + TypeScript", desc: "Modern frontend framework" },
  { icon: <Layers className="w-5 h-5" />, name: "Tailwind CSS", desc: "Utility-first CSS framework" },
  { icon: <Zap className="w-5 h-5" />, name: "Vite", desc: "Lightning-fast build tool" },
  { icon: <Database className="w-5 h-5" />, name: "Lovable Cloud", desc: "Backend & Database" },
  { icon: <Shield className="w-5 h-5" />, name: "Edge Functions", desc: "Serverless backend logic" },
  { icon: <Globe className="w-5 h-5" />, name: "OpenRouter / Gemini API", desc: "AI Model providers" },
];

const AboutTab = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="glass-strong rounded-2xl p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Info className="w-7 h-7 text-primary" />
          <h2 className="text-xl font-bold text-foreground">DIMA Prompt Gen အကြောင်း</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          DIMA Prompt Gen သည် AI Prompt တွေကို လွယ်ကူမြန်ဆန်စွာ ဖန်တီးပေးနိုင်တဲ့ All-in-One AI Tool Platform ဖြစ်ပါတယ်။
          Coding, Image, Video, Chat စတဲ့ AI features အားလုံးကို တစ်နေရာတည်းမှာ အသုံးပြုနိုင်ပါတယ်။
        </p>
      </div>

      {/* Features */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          🚀 Features များ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl glass-subtle">
              <div className="flex-shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          🎯 အကျိုးကျေးဇူးများ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl glass-subtle border border-primary/10">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                {b.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          🛠️ အသုံးပြုထားတဲ့ နည်းပညာများ
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {technologies.map((t, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl glass-subtle text-center">
              <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                {t.icon}
              </div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="glass-subtle rounded-2xl p-5 text-center space-y-2">
        <p className="text-sm text-foreground font-medium">
          💡 DIMA Prompt Gen ဖြင့် AI ရဲ့ စွမ်းအားကို အပြည့်အဝ အသုံးချလိုက်ပါ!
        </p>
        <p className="text-xs text-muted-foreground">
          Made with ❤️ using Lovable
        </p>
      </div>
    </div>
  );
};

export default AboutTab;
