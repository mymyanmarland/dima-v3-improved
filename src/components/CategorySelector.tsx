import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORY_GROUPS } from "@/data/generalPromptData";

interface CategorySelectorProps {
  value: string;
  onChange: (id: string) => void;
}

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const selectedGroup = CATEGORY_GROUPS.find((g) =>
    g.items.some((i) => i.id === value)
  );
  const selectedItem = selectedGroup?.items.find((i) => i.id === value);

  return (
    <div className="space-y-2">
      {selectedItem && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">ရွေးထားသည်:</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold glass-subtle border border-primary/30 text-primary">
            {selectedItem.label} — {selectedItem.description}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {CATEGORY_GROUPS.map((group) => {
          const isOpen = openCategories.includes(group.category);
          const hasSelected = group.items.some((i) => i.id === value);

          return (
            <div
              key={group.category}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                hasSelected
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/50 bg-background/30"
              }`}
            >
              <button
                onClick={() => toggleCategory(group.category)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{group.emoji}</span>
                  <span>{group.category}</span>
                  <span className="text-xs text-muted-foreground">({group.items.length})</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-2 pb-2 grid grid-cols-1 gap-1.5">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onChange(item.id)}
                      className={`glossy-chip glossy-chip--lg text-left ${
                        value === item.id ? "glossy-chip--active" : ""
                      }`}
                    >
                      <div>{item.label}</div>
                      <div className="text-xs opacity-70 mt-0.5">{item.description}</div>
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

export default CategorySelector;
