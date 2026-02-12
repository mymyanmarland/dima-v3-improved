import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";

const StarryBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let effect: any = null;

    const initVanta = async () => {
      // Destroy previous
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }

      try {
        const WAVES = (await import("vanta/dist/vanta.waves.min")).default;
        if (!vantaRef.current) return;

        const isDark = theme === "dark";

        effect = WAVES({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: isDark ? 0x0 : 0x60718b,
        });
        effectRef.current = effect;
      } catch (err) {
        console.error("Vanta init error:", err);
      }
    };

    initVanta();

    return () => {
      if (effect) effect.destroy();
    };
  }, [theme]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
    />
  );
};

export default StarryBackground;
