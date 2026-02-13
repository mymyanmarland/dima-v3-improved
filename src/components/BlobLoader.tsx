const BlobLoader = ({ text = "LOADING" }: { text?: string }) => {
  return (
    <div className="blob-loader-container">
      <div className="blob-hand">
        <div className="blob-body" />
        <div className="blob-finger blob-finger-1" />
        <div className="blob-finger blob-finger-2" />
        <div className="blob-finger blob-finger-3" />
        <div className="blob-shadow" />
      </div>
      <span className="blob-text">{text}</span>
    </div>
  );
};

export default BlobLoader;
