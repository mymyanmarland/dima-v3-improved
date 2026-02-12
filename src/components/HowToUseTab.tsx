import { BookOpen, Sparkles, Code, Video, ImageIcon, RefreshCw, ArrowRight } from "lucide-react";

const sections = [
  {
    id: "prompt",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "✨ စိတ်ကြို Prompt Generator",
    subtitle: "AI Prompt တွေကို အလိုအလျောက် ဖန်တီးပေးတယ်",
    steps: [
      "\"အကြောင်းအရာရေးပါ\" မှာ သင်လိုချင်တဲ့ prompt ရဲ့ အကြောင်းအရာကို ရေးပါ။ ဥပမာ - \"How to create Gemini API Key\"",
      "\"ကိရိယာများ (Tools)\" မှာ Category ရွေးပါ — Coding, Writing, Marketing, Education, Business, Creative, Data, General",
      "\"စတိုင် (Style)\" မှာ Tone ရွေးပါ — Professional, Casual, Technical, Creative, Persuasive, Educational",
      "\"Additional Context\" မှာ ထပ်ဖြည့်ချင်တဲ့ details တွေထည့်ပါ (optional)",
    ],
    buttons: [
      { label: "Prompt Generate မယ်", desc: "Prompt ကိုပဲ generate လုပ်ပေးမယ် — ထွက်လာတဲ့ prompt ကို copy ယူပြီး ChatGPT, Gemini စတဲ့ AI tools မှာ paste လုပ်ပြီးသုံးနိုင်ပါတယ်" },
      { label: "Generate + Execute", desc: "Prompt ကို generate လုပ်ပြီး AI ကနေ တိုက်ရိုက် အဖြေထုတ်ပေးမယ် — Prompt generate + AI ကနေ တိုက်ရိုက် result ရမယ်" },
    ],
    tips: [
      "Topic ကို တတ်နိုင်သမျှ ရှင်းရှင်းလင်းလင်း ရေးပါ",
      "Category ကို မှန်ကန်စွာ ရွေးခြင်းဖြင့် ပိုမိုကောင်းမွန်တဲ့ prompt ရရှိနိုင်ပါတယ်",
      "Generate + Execute ကိုနှိပ်ရင် prompt generate ပြီး AI ကနေ တိုက်ရိုက် အဖြေပေးတာမို့ ပိုမြန်ပါတယ်",
    ],
  },
  {
    id: "coding",
    icon: <Code className="w-6 h-6 text-primary" />,
    title: "💻 Coding Prompt Generator",
    subtitle: "Programming နှင့် Development အတွက် Prompt တွေ ဖန်တီးပေးတယ်",
    steps: [
      "\"အကြောင်းအရာရေးပါ\" မှာ coding နဲ့ ပတ်သက်တဲ့ topic ရေးပါ။ ဥပမာ - \"React Login Form Component\"",
      "Category ရွေးပါ — Coding ရွေးရင် programming-specific prompt ထွက်မယ်",
      "Style ရွေးပါ — Technical ရွေးရင် code-focused ဖြစ်မယ်",
      "Additional Context မှာ programming language, framework, library စတာတွေ ထည့်ပေးပါ",
    ],
    buttons: [
      { label: "Prompt Generate မယ်", desc: "Coding prompt ကိုပဲ generate လုပ်ပေးမယ်" },
      { label: "Generate + Execute", desc: "Coding prompt generate ပြီး AI ကနေ code ကို တိုက်ရိုက်ရေးပေးမယ်" },
    ],
    tips: [
      "Programming language ကို specify လုပ်ပါ",
      "Framework/Library ကို ထည့်ပါ",
      "ဘယ်လို feature လိုချင်တယ်ဆိုတာ ရှင်းရှင်းလင်းလင်း ရေးပါ",
    ],
  },
  {
    id: "video",
    icon: <Video className="w-6 h-6 text-primary" />,
    title: "🎬 Video Prompt Generator",
    subtitle: "AI Video Generation Tools အတွက် Prompt တွေ ဖန်တီးပေးတယ်",
    steps: [
      "Video ရဲ့ အကြောင်းအရာကို ရေးပါ",
      "Video Style ရွေးပါ — Cinematic, Anime, Documentary စသည်",
      "Duration ရွေးပါ",
      "Motion Type ရွေးပါ",
    ],
    buttons: [
      { label: "Video Prompt Generate", desc: "AI video tools မှာ သုံးဖို့ prompt ထုတ်ပေးမယ်" },
    ],
    tips: [
      "Scene ကို အသေးစိတ် describe လုပ်ပါ",
      "Camera movement ကို ထည့်ပါ",
      "ထွက်လာတဲ့ prompt ကို Runway ML, Pika Labs, Sora မှာ သုံးပါ",
    ],
  },
  {
    id: "image-prompt",
    icon: <ImageIcon className="w-6 h-6 text-primary" />,
    title: "🎨 Image Prompt Generator",
    subtitle: "AI Image Generation Tools အတွက် Prompt တွေ ဖန်တီးပေးတယ်",
    steps: [
      "ဖန်တီးချင်တဲ့ ပုံကို describe လုပ်ပါ",
      "Art Style, Lighting, Camera Angle ရွေးပါ",
      "Aspect Ratio ရွေးပါ",
      "Negative Prompt ထည့်ပါ (optional)",
    ],
    buttons: [
      { label: "Image Prompt Generate လုပ်မယ်", desc: "Midjourney, DALL-E, Stable Diffusion မှာ သုံးဖို့ prompt ထုတ်ပေးမယ်" },
    ],
    tips: [
      "Subject ကို တတ်နိုင်သမျှ အသေးစိတ် describe လုပ်ပါ",
      "Negative prompt သုံးခြင်းဖြင့် မလိုချင်တဲ့ element တွေကို ဖယ်ရှားနိုင်ပါတယ်",
    ],
  },
  {
    id: "image-to-prompt",
    icon: <RefreshCw className="w-6 h-6 text-accent" />,
    title: "🔄 Image to Prompt",
    subtitle: "ပုံတစ်ပုံကို analyze လုပ်ပြီး prompt ပြန်ထုတ်ပေးတယ်",
    steps: [
      "ပုံတင်ပါ — Click လုပ်ပြီး ပုံရွေးပါ (PNG, JPG, WEBP — အများဆုံး 5MB)",
      "\"Generate Prompt from Image\" ခလုတ်ကိုနှိပ်ပါ",
      "AI ကပုံကို analyze လုပ်ပြီး prompt ထုတ်ပေးမယ်",
      "ထွက်လာတဲ့ prompt ကို copy ယူပြီး Image Generator tools မှာ သုံးနိုင်ပါတယ်",
    ],
    buttons: [
      { label: "Generate Prompt from Image 🔄", desc: "ပုံကို analyze လုပ်ပြီး AI image generation prompt အဖြစ် ပြောင်းပေးမယ်" },
    ],
    tips: [
      "ရှင်းလင်းပြတ်သားတဲ့ ပုံတင်ရင် ပိုကောင်းတဲ့ prompt ရပါတယ်",
      "ပုံ size 5MB အောက်ဖြစ်ရပါမယ်",
    ],
  },
];

const HowToUseTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-strong rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <BookOpen className="w-7 h-7 text-primary" />
          <h2 className="text-xl font-bold text-foreground">အသုံးပြုနည်း လမ်းညွှန်</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          DIMA Prompt Gen ရဲ့ Feature တွေအားလုံးကို ဘယ်လိုအသုံးပြုရမလဲဆိုတာ အသေးစိတ်ရှင်းပြထားပါတယ်
        </p>
      </div>

      {/* Quick Overview */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-base font-semibold text-foreground mb-4">📋 Feature များ အကျဉ်းချုပ်</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#section-${s.id}`}
              className="flex items-center gap-3 p-3 rounded-xl glass-subtle hover:border-primary/30 transition-all group"
            >
              {s.icon}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                <p className="text-xs text-muted-foreground truncate">{s.subtitle}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Detailed Sections */}
      {sections.map((section) => (
        <div key={section.id} id={`section-${section.id}`} className="glass-card rounded-2xl p-5 space-y-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            {section.icon}
            <div>
              <h3 className="text-base font-bold text-foreground">{section.title}</h3>
              <p className="text-xs text-muted-foreground">{section.subtitle}</p>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              📝 အဆင့်ဆင့် လုပ်ဆောင်နည်း
            </h4>
            <ol className="space-y-2.5">
              {section.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons explanation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              🔘 ခလုတ်များ
            </h4>
            <div className="space-y-2">
              {section.buttons.map((btn, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl glass-subtle">
                  <span className="flex-shrink-0 px-3 py-1 rounded-lg bg-primary/15 text-primary text-xs font-semibold whitespace-nowrap">
                    {btn.label}
                  </span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{btn.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              💡 အသုံးဝင်တဲ့ Tips
            </h4>
            <ul className="space-y-2">
              {section.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="glass-subtle rounded-2xl p-5 text-center">
        <p className="text-sm text-muted-foreground">
          🎯 ပြဿနာရှိရင် ဒီ tab ကို ပြန်လာကြည့်နိုင်ပါတယ်။
        </p>
      </div>
    </div>
  );
};

export default HowToUseTab;
