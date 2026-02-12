interface StyleSelectorProps {
  selected: string;
  onChange: (style: string) => void;
}

const STYLES = [
  "Random (ကျပန်း)",
  "Professional (ပရော်ဖက်ရှင်နယ်)",
  "Cinematic (ရုပ်ရှင်)",
  "Muted (အောက်ချိုး)",
  "High Contrast (ပြတ်သားသော အရောင်အသက်)",
  "Vintage Analog (Vintage)",
  "Polaroid (ပို့လာရွိုက်)",
  "Editorial (သာလီစာ)",
  "Black & White (အမဲနှင့်အဖြူ)",
  "Film Noir (ရုပ်ရှင် Noir)",
  "Raw Flash (Flash)",
];

const StyleSelector = ({ selected, onChange }: StyleSelectorProps) => {
  return (
    <div className="glass glow-border rounded-xl p-4">
      <label className="text-sm font-medium text-foreground mb-3 block">
        စတိုင် (Style)
      </label>
      <div className="flex flex-wrap gap-2">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => onChange(style)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selected === style
                ? "bg-primary/15 text-primary border-primary/40 glow-primary"
                : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
