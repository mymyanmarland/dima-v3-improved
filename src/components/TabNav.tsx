interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "how-to-use", label: "အသုံးပြုနည်း", emoji: "📖" },
  { id: "prompt", label: "စိတ်ကြို Prompt", emoji: "✨" },
  { id: "coding-prompt", label: "Coding Prompt", emoji: "💻" },
  { id: "video-prompt", label: "Video Prompt", emoji: "🎬" },
  { id: "image-prompt", label: "Image Prompt", emoji: "🎨" },
  { id: "image-to-prompt", label: "Image to Prompt", emoji: "🔄" },
];

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1.5 p-2 glass-strong rounded-2xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary border border-primary/30 glow-primary backdrop-blur-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30 border border-transparent"
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNav;
