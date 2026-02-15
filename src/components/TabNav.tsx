interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "how-to-use", label: "အသုံးပြုနည်း", emoji: "📖" },
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
