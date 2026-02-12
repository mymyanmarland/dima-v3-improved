import { Sparkles } from "lucide-react";

const GlossyTitle = () => {
  return (
    <div className="glossy-title-wrap">
      <div className="glossy-title-btn">
        <div className="glossy-title-corner" />
        <div className="glossy-title-inner">
          <Sparkles className="w-5 h-5 text-[#ff7a3c] drop-shadow-[0_0_8px_rgba(255,122,60,0.6)]" />
          <div className="glossy-title-text">
            <span className="glossy-title-main">Prompt</span>
            <span className="glossy-title-sub">Engine</span>
          </div>
        </div>
        <div className="glossy-title-glow" />
      </div>
      <div className="glossy-title-bg">
        <div className="glossy-title-shine" />
      </div>
      <div className="glossy-title-led" />
    </div>
  );
};

export default GlossyTitle;
