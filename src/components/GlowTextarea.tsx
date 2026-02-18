import React from "react";
import { X } from "lucide-react";

interface GlowTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onClear?: () => void;
}

const GlowTextarea = React.forwardRef<HTMLTextAreaElement, GlowTextareaProps>(
  ({ className, onClear, value, onChange, ...props }, ref) => {
    const hasValue = typeof value === "string" ? value.length > 0 : false;

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        // Simulate a change event with empty value
        const syntheticEvent = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }
    };

    return (
      <div className="glow-input-wrap relative">
        <div className="glow-blur-layer" />
        <div className="glow-dark-border" />
        <div className="glow-border-layer" />
        <div className="glow-layer" />
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          className={`glow-textarea ${hasValue ? "pr-10" : ""} ${className || ""}`}
          {...props}
        />
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2.5 right-2.5 z-20 w-6 h-6 flex items-center justify-center rounded-full bg-muted/80 hover:bg-destructive/20 hover:text-destructive text-muted-foreground transition-all duration-200 backdrop-blur-sm"
            title="Clear"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);

GlowTextarea.displayName = "GlowTextarea";

export default GlowTextarea;
