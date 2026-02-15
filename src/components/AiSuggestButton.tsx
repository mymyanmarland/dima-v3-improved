import { Wand2 } from "lucide-react";

interface AiSuggestButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const AiSuggestButton = ({ onClick, isLoading, disabled }: AiSuggestButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="px-4 py-1.5 rounded-full text-xs font-semibold border border-accent/40 text-accent hover:bg-accent/10 transition-all disabled:opacity-50 flex items-center gap-1.5 glass-subtle"
    >
      {isLoading ? (
        <>
          <span className="w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          AI Selecting...
        </>
      ) : (
        <>
          <Wand2 className="w-3 h-3" />
          AI Auto-Select
        </>
      )}
    </button>
  );
};

export default AiSuggestButton;
