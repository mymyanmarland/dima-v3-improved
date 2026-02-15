import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface RainbowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const RainbowButton = forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold",
          "cursor-pointer border-0 px-3.5 py-1.5 transition-transform duration-200",
          "hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          "animate-[rainbow_3s_linear_infinite]",
          "bg-[length:200%]",
          "bg-[linear-gradient(hsl(var(--card)),hsl(var(--card))),linear-gradient(hsl(var(--card))_50%,hsl(var(--card)/0.6)_80%,transparent),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))]",
          "[background-clip:padding-box,border-box,border-box]",
          "[background-origin:border-box]",
          "[border:2px_solid_transparent]",
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-[20%] before:w-[60%] before:-translate-x-1/2",
          "before:animate-[rainbow_3s_linear_infinite] before:bg-[length:200%]",
          "before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))]",
          "before:[filter:blur(0.6rem)]",
          "text-foreground",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      </button>
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export default RainbowButton;
