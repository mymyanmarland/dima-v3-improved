import { Wand2 } from "lucide-react";
import RainbowButton from "./RainbowButton";

interface AiSuggestButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const AiSuggestButton = ({ onClick, isLoading, disabled }: AiSuggestButtonProps) => {
  return (
    <RainbowButton onClick={onClick} disabled={isLoading || disabled}>
      {isLoading ? (
        <>
          <span className="w-3 h-3 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
          AI Selecting...
        </>
      ) : (
        <>
          <Wand2 className="w-3 h-3" />
          AI Auto-Select
        </>
      )}
    </RainbowButton>
  );
};

export default AiSuggestButton;
