import { useEffect, useState } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const showColon = time.getSeconds() % 2 === 0;

  return (
    <div className="relative px-3 py-1.5 rounded-xl bg-secondary/60 border border-white/10 backdrop-blur-sm flex items-center gap-0.5 select-none font-mono">
      {/* Glow behind */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 blur-sm" />

      <span className="relative text-sm font-bold text-primary tracking-wider"
        style={{ textShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      >
        {hours}
      </span>
      <span
        className={`relative text-sm font-bold text-primary transition-opacity duration-300 ${showColon ? "opacity-100" : "opacity-30"}`}
        style={{ textShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      >
        :
      </span>
      <span className="relative text-sm font-bold text-primary tracking-wider"
        style={{ textShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      >
        {minutes}
      </span>
      <span
        className={`relative text-sm font-bold text-primary transition-opacity duration-300 ${showColon ? "opacity-100" : "opacity-30"}`}
        style={{ textShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      >
        :
      </span>
      <span className="relative text-xs font-bold text-accent tracking-wider"
        style={{ textShadow: "0 0 8px hsl(var(--accent) / 0.6)" }}
      >
        {seconds}
      </span>
    </div>
  );
};

export default DigitalClock;
