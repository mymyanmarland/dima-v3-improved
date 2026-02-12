interface SizeSelectorProps {
  selected: string;
  onChange: (size: string) => void;
}

const SIZES = [
  { id: "1:1", label: "Square (1:1)", icon: "□" },
  { id: "3:4", label: "Portrait (3:4)", icon: "▯" },
  { id: "9:16", label: "Story (9:16)", icon: "▯" },
  { id: "4:3", label: "Landscape (4:3)", icon: "▭" },
  { id: "16:9", label: "Widescreen (16:9)", icon: "▭" },
];

const SizeSelector = ({ selected, onChange }: SizeSelectorProps) => {
  return (
    <div className="glass glow-border rounded-xl p-4">
      <label className="text-sm font-medium text-foreground mb-3 block">
        အရွယ်အစား (Size)
      </label>
      <div className="grid grid-cols-5 gap-2">
        {SIZES.map((size) => (
          <button
            key={size.id}
            onClick={() => onChange(size.id)}
            className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg text-xs font-medium transition-all border ${
              selected === size.id
                ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
            }`}
          >
            <span className="text-lg">{size.icon}</span>
            <span className="text-[10px] leading-tight text-center">{size.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
