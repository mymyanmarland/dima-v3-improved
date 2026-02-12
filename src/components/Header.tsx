import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 px-6 md:px-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 glow-border flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Prompt<span className="text-gradient">Gen</span>
            </h1>
            <p className="text-xs text-muted-foreground">AI Prompt Generator</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground/60">
          Powered by AI ✨
        </span>
      </div>
    </header>
  );
};

export default Header;
