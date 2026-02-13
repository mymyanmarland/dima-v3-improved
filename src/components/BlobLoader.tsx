const BlobLoader = ({ text = "LOADING" }: { text?: string }) => {
  return (
    <div className="hourglass-loader-container">
      <div className="hourglass-wrapper">
        {/* Background blob */}
        <div className="hourglass-blob" />
        
        {/* Hourglass */}
        <div className="hourglass">
          {/* Top cap */}
          <div className="hourglass-cap hourglass-cap-top" />
          {/* Glass body */}
          <div className="hourglass-glass">
            {/* Top sand */}
            <div className="hourglass-sand-top" />
            {/* Sand stream */}
            <div className="hourglass-stream" />
            {/* Bottom sand */}
            <div className="hourglass-sand-bottom" />
          </div>
          {/* Bottom cap */}
          <div className="hourglass-cap hourglass-cap-bottom" />
        </div>

        {/* Shadow */}
        <div className="hourglass-shadow" />
      </div>
      <span className="hourglass-text">{text}</span>
    </div>
  );
};

export default BlobLoader;
