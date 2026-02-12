import React from "react";

interface GlowTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const GlowTextarea = React.forwardRef<HTMLTextAreaElement, GlowTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="glow-input-wrap">
        <div className="glow-blur-layer" />
        <div className="glow-dark-border" />
        <div className="glow-border-layer" />
        <div className="glow-layer" />
        <textarea
          ref={ref}
          className={`glow-textarea ${className || ""}`}
          {...props}
        />
      </div>
    );
  }
);

GlowTextarea.displayName = "GlowTextarea";

export default GlowTextarea;
