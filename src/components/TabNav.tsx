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
      <div className="flex flex-wrap gap-2 p-3 glass-card rounded-2xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={activeTab === tab.id ? {
              boxShadow: 'inset -3px -3px 7px hsl(var(--neu-inset-light) / 0.25), inset 3px 3px 7px hsl(var(--neu-inset-dark) / 0.5), 0 0 8px hsl(var(--primary) / 0.15)'
            } : {
              boxShadow: '-3px -3px 7px hsl(var(--neu-shadow-light)), 3px 3px 7px hsl(var(--neu-shadow-dark))'
            }}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNav;
