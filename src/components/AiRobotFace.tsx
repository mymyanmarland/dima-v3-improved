import { useEffect, useState } from "react";

const AiRobotFace = () => {
  const [expression, setExpression] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpression((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Eye shapes per expression: [leftEye, rightEye, mouth]
  const expressions = [
    // Happy smile
    { leftEye: "circle", rightEye: "circle", mouth: "smile", blink: false },
    // Wink
    { leftEye: "circle", rightEye: "line", mouth: "smile", blink: false },
    // Laughing (closed eyes)
    { leftEye: "arc", rightEye: "arc", mouth: "open", blink: false },
    // Cool (flat eyes)
    { leftEye: "flat", rightEye: "flat", mouth: "smirk", blink: false },
    // Blinking
    { leftEye: "circle", rightEye: "circle", mouth: "smile", blink: true },
  ];

  const expr = expressions[expression];

  const renderEye = (type: string, cx: number) => {
    switch (type) {
      case "circle":
        return (
          <>
            <circle cx={cx} cy="14" r="3.5" fill="hsl(var(--primary))" className="animate-pulse" />
            <circle cx={cx} cy="13" r="1.2" fill="white" opacity="0.7" />
          </>
        );
      case "line":
        return <line x1={cx - 3} y1="14" x2={cx + 3} y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />;
      case "arc":
        return <path d={`M${cx - 3} 15 Q${cx} 11 ${cx + 3} 15`} stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case "flat":
        return (
          <>
            <rect x={cx - 4} y="12" width="8" height="3" rx="1.5" fill="hsl(var(--primary))" opacity="0.9" />
            <rect x={cx - 2} y="12.5" width="2" height="2" rx="1" fill="white" opacity="0.5" />
          </>
        );
      default:
        return <circle cx={cx} cy="14" r="3" fill="hsl(var(--primary))" />;
    }
  };

  const renderMouth = (type: string) => {
    switch (type) {
      case "smile":
        return <path d="M11 22 Q18 28 25 22" stroke="hsl(var(--primary))" strokeWidth="1.8" fill="none" strokeLinecap="round" />;
      case "open":
        return <ellipse cx="18" cy="24" rx="4" ry="3" fill="hsl(var(--primary))" opacity="0.8" />;
      case "smirk":
        return <path d="M13 23 Q20 26 24 22" stroke="hsl(var(--primary))" strokeWidth="1.8" fill="none" strokeLinecap="round" />;
      default:
        return <path d="M11 22 Q18 28 25 22" stroke="hsl(var(--primary))" strokeWidth="1.8" fill="none" strokeLinecap="round" />;
    }
  };

  return (
    <div
      className="relative w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted border border-white/10 flex items-center justify-center select-none cursor-pointer group"
      title="AI Assistant"
    >
      <svg viewBox="0 0 36 36" className="w-8 h-8" style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.4))" }}>
        {/* Head outline */}
        <rect x="4" y="4" width="28" height="28" rx="8" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />

        {/* Antenna */}
        <line x1="18" y1="4" x2="18" y2="1" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="18" cy="0.5" r="1.5" fill="hsl(var(--primary))" className="animate-pulse" />

        {/* Eyes */}
        <g style={{ transition: "all 0.4s ease" }}>
          {expr.blink ? (
            <>
              <line x1="8" y1="14" x2="14" y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
                <animate attributeName="y1" values="14;14;14;14" dur="0.3s" />
              </line>
              <line x1="22" y1="14" x2="28" y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              {renderEye(expr.leftEye, 11)}
              {renderEye(expr.rightEye, 25)}
            </>
          )}
        </g>

        {/* Mouth */}
        <g style={{ transition: "all 0.4s ease" }}>
          {renderMouth(expr.mouth)}
        </g>

        {/* Cheek blush */}
        <circle cx="7" cy="20" r="2.5" fill="hsl(var(--primary))" opacity="0.1" />
        <circle cx="29" cy="20" r="2.5" fill="hsl(var(--primary))" opacity="0.1" />
      </svg>

      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)]" />
    </div>
  );
};

export default AiRobotFace;
