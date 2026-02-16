import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DESIGN_STYLE_CATEGORIES } from "@/data/designStyles";

interface DesignStyleSelectorProps {
  value: string;
  onChange: (id: string) => void;
  allowDeselect?: boolean;
}

const DesignStyleSelector = ({ value, onChange, allowDeselect = true }: DesignStyleSelectorProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Find which category the selected style belongs to
  const selectedCategory = DESIGN_STYLE_CATEGORIES.find((c) =>
    c.styles.some((s) => s.id === value)
  );
  const selectedStyle = selectedCategory?.styles.find((s) => s.id === value);

  return (
    <div className="space-y-2">
      {/* Selected indicator */}
      {selectedStyle && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">ရွေးထားသည်:</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold glass-subtle border border-primary/30 text-primary">
            {selectedStyle.label}
          </span>
        </div>
      )}

      {/* Category accordions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {DESIGN_STYLE_CATEGORIES.map((cat) => {
          const isOpen = openCategories.includes(cat.category);
          const hasSelected = cat.styles.some((s) => s.id === value);

          return (
            <div
              key={cat.category}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                hasSelected
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/50 bg-background/30"
              }`}
            >
              <button
                onClick={() => toggleCategory(cat.category)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{cat.emoji}</span>
                  <span>{cat.category}</span>
                  <span className="text-xs text-muted-foreground">({cat.styles.length})</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-2 pb-2 grid grid-cols-1 gap-1.5">
                  {cat.styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() =>
                        onChange(allowDeselect && value === style.id ? "" : style.id)
                      }
                      className={`glossy-chip glossy-chip--lg text-left ${
                        value === style.id ? "glossy-chip--active" : ""
                      }`}
                    >
                      <div>{style.label}</div>
                      <div className="text-xs opacity-70 mt-0.5">{style.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignStyleSelector;
