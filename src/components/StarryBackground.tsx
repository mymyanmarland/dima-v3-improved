import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const density = isDark ? 8000 : 15000;
      const count = Math.floor((canvas.width * canvas.height) / density);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * (isDark ? 0.6 : 0.35) + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);
        const currentSize = star.size * (0.8 + twinkle * 0.2);

        const glowHue = isDark ? "250, 85%, 80%" : "250, 70%, 55%";
        const midHue = isDark ? "280, 75%, 70%" : "280, 60%, 50%";

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, currentSize * 3
        );
        gradient.addColorStop(0, `hsla(${glowHue}, ${currentOpacity})`);
        gradient.addColorStop(0.4, `hsla(${midHue}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `hsla(330, 80%, 62%, 0)`);

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(0, 0%, 100%, ${currentOpacity})`
          : `hsla(250, 70%, 45%, ${currentOpacity * 0.8})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: theme === "dark" ? 0.7 : 0.4 }}
    />
  );
};

export default StarryBackground;
