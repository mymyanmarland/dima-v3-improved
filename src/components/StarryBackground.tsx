import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const StarryBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    let effect: any = null;

    const initVanta = async () => {
      if (vantaEffect) return;
      try {
        const WAVES = (await import("vanta/dist/vanta.waves.min")).default;
        if (!vantaRef.current) return;
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
          color: 0x0,
        });
        setVantaEffect(effect);
      } catch (err) {
        console.error("Vanta init error:", err);
      }
    };

    initVanta();

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
    />
  );
};

export default StarryBackground;
