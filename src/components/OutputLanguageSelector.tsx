import { Globe } from "lucide-react";
import { OUTPUT_LANGUAGES } from "@/data/generalPromptData";

interface OutputLanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const OutputLanguageSelector = ({ value, onChange }: OutputLanguageSelectorProps) => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <label className="text-base font-medium text-foreground mb-3 block">
        <Globe className="w-5 h-5 inline mr-2" />
        Output Language (ဘာသာစကား)
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {OUTPUT_LANGUAGES.map((l) => (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            className={`glossy-chip ${value === l.id ? "glossy-chip--active" : ""}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OutputLanguageSelector;

/** Helper to build the language instruction for AI context */
export const getLanguageInstruction = (languageId: string): string => {
  if (languageId === "english") return "";
  const lang = OUTPUT_LANGUAGES.find((l) => l.id === languageId);
  return `\n\nOUTPUT LANGUAGE: You MUST write the ENTIRE output in ${lang?.label || languageId}. Every sentence, heading, and detail must be in this language. Do NOT write in English.`;
};
