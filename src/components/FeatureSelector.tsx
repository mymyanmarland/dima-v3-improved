import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FEATURE_CATEGORIES } from "@/data/vibeCodingFeatures";

interface FeatureSelectorProps {
  selected: string[];
  onChange: (features: string[]) => void;
}

const FeatureSelector = ({ selected, onChange }: FeatureSelectorProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleFeature = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((f) => f !== id)
        : [...selected, id]
    );
  };

  const selectedCount = selected.length;

  return (
    <div className="space-y-2">
      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-xs text-muted-foreground">ရွေးထားသည် ({selectedCount}):</span>
          {selected.slice(0, 8).map((id) => {
            const feat = FEATURE_CATEGORIES.flatMap((c) => c.features).find((f) => f.id === id);
            return feat ? (
              <span key={id} className="px-2 py-0.5 rounded-full text-[10px] font-medium glass-subtle border border-primary/30 text-primary">
                {feat.label}
              </span>
            ) : null;
          })}
          {selectedCount > 8 && (
            <span className="text-xs text-muted-foreground">+{selectedCount - 8} more</span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {FEATURE_CATEGORIES.map((cat) => {
          const isOpen = openCategories.includes(cat.category);
          const selectedInCat = cat.features.filter((f) => selected.includes(f.id)).length;

          return (
            <div
              key={cat.category}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                selectedInCat > 0
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
                  {selectedInCat > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary">
                      {selectedInCat}
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-2 pb-2 grid grid-cols-1 gap-1.5">
                  {cat.features.map((feat) => (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`glossy-chip text-left ${
                        selected.includes(feat.id) ? "glossy-chip--active" : ""
                      }`}
                    >
                      {feat.label}
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

export default FeatureSelector;
