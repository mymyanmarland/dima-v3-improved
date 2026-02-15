import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "prompt", label: "General Prompt", emoji: "✨" },
  { id: "refine-prompt", label: "Refine Prompt", emoji: "🔬" },
  { id: "coding-prompt", label: "Coding Prompt", emoji: "💻" },
  { id: "ready-made", label: "Ready-Made Coding Prompt", emoji: "📦" },
  { id: "text-design", label: "Text Design Prompt", emoji: "🔤" },
  { id: "video-prompt", label: "Video Prompt", emoji: "🎬" },
  { id: "video-prompt-en", label: "Video Prompt (EN)", emoji: "🎬" },
  { id: "logo-prompt", label: "Logo Prompt", emoji: "👑" },
  { id: "image-prompt", label: "Image Prompt", emoji: "🎨" },
  { id: "image-to-prompt", label: "Image to Prompt", emoji: "🔄" },
  { id: "chatbot", label: "AI Chat", emoji: "🤖" },
  { id: "activity-log", label: "Activity Log", emoji: "📊" },
  { id: "api-test", label: "API Test", emoji: "🧪" },
];

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  const isMobile = useIsMobile();
  const activeLabel = TABS.find((t) => t.id === activeTab);

  if (isMobile) {
    return (
      <div className="w-full">
        <Select value={activeTab} onValueChange={onTabChange}>
          <SelectTrigger
            className="w-full h-14 rounded-2xl text-base font-semibold tracking-wide border-none text-primary"
            style={{
              background: "hsl(var(--neu-bg))",
              boxShadow:
                "-6px -6px 14px hsl(var(--neu-shadow-light)), 6px 6px 14px hsl(var(--neu-shadow-dark)), inset 0 1px 0 hsl(var(--neu-inset-light) / 0.3), 0 0 20px hsl(var(--primary) / 0.1)",
            }}
          >
            <SelectValue>
              {activeLabel ? (
                <span className="flex items-center gap-2">
                  <span className="text-lg">{activeLabel.emoji}</span>
                  <span
                    className="text-gradient font-bold"
                  >
                    {activeLabel.label}
                  </span>
                </span>
              ) : (
                "Select tab"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className="z-[200] rounded-2xl border-none p-1.5 max-h-[70vh]"
            style={{
              background: "hsl(var(--neu-bg))",
              boxShadow:
                "-8px -8px 18px hsl(var(--neu-shadow-light)), 8px 8px 18px hsl(var(--neu-shadow-dark)), 0 0 30px hsl(var(--primary) / 0.12)",
            }}
          >
            {TABS.map((tab) => (
              <SelectItem
                key={tab.id}
                value={tab.id}
                className="rounded-xl cursor-pointer text-sm py-3 px-3 my-0.5 font-medium text-foreground transition-all duration-200 focus:bg-transparent data-[highlighted]:bg-transparent"
                style={{
                  ...(activeTab === tab.id
                    ? {
                        background: "hsl(var(--primary) / 0.12)",
                        boxShadow:
                          "inset -2px -2px 5px hsl(var(--neu-inset-light) / 0.15), inset 2px 2px 5px hsl(var(--neu-inset-dark) / 0.25), 0 0 12px hsl(var(--primary) / 0.08)",
                      }
                    : {}),
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{tab.emoji}</span>
                  <span
                    className={
                      activeTab === tab.id
                        ? "text-primary font-semibold"
                        : "text-foreground"
                    }
                    style={
                      activeTab === tab.id
                        ? {
                            textShadow: "0 0 12px hsl(var(--primary) / 0.4)",
                          }
                        : {}
                    }
                  >
                    {tab.label}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 p-3 glass-card rounded-2xl">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`glossy-tab relative overflow-hidden transition-all duration-200 whitespace-nowrap ${
                isActive ? "glossy-tab--active" : ""
              }`}
            >
              <span className="glossy-tab__wrap">
                <span className="glossy-tab__text">
                  {tab.emoji} {tab.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNav;
