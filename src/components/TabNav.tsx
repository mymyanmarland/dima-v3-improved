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
  { id: "image", label: "Image Generator", emoji: "🖼️" },
  { id: "ad-poster", label: "Ad Poster Generator", emoji: "📢" },
  { id: "image-to-prompt", label: "Image to Prompt", emoji: "🔄" },
];

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-secondary/30 rounded-xl border border-border/50">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground glow-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
