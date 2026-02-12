import { useEffect, useState } from "react";

const FACES = ["😊", "😄", "😎", "🤖", "😁", "🤩", "😜", "🥳", "😏", "🤗"];

const AiRobotFace = () => {
  const [faceIndex, setFaceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFaceIndex((prev) => (prev + 1) % FACES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-white/10 flex items-center justify-center overflow-hidden select-none cursor-default"
      title="AI Assistant"
    >
      <span
        className="text-lg transition-all duration-500 inline-block"
        style={{
          animation: "robotBounce 2s ease-in-out infinite",
        }}
      >
        {FACES[faceIndex]}
      </span>
      <style>{`
        @keyframes robotBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.15) rotate(-5deg); }
          50% { transform: scale(1) rotate(0deg); }
          75% { transform: scale(1.15) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default AiRobotFace;
