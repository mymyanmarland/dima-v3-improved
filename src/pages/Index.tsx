import { useState } from "react";
import AppHeader from "../components/AppHeader";
import TabNav from "../components/TabNav";
import PromptGeneratorTab from "../components/PromptGeneratorTab";
import CodingPromptTab from "../components/CodingPromptTab";
import ImagePromptTab from "../components/ImagePromptTab";
import ImageToPromptTab from "../components/ImageToPromptTab";
import VideoPromptTab from "../components/VideoPromptTab";
import HowToUseTab from "../components/HowToUseTab";
import StarryBackground from "../components/StarryBackground";

const Index = () => {
  const [activeTab, setActiveTab] = useState("prompt");

  const renderTab = () => {
    switch (activeTab) {
      case "how-to-use":
        return <HowToUseTab />;
      case "prompt":
        return <PromptGeneratorTab />;
      case "coding-prompt":
        return <CodingPromptTab />;
      case "video-prompt":
        return <VideoPromptTab />;
      case "image-prompt":
        return <ImagePromptTab />;
      case "image-to-prompt":
        return <ImageToPromptTab />;
      default:
        return <PromptGeneratorTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />

      {/* Gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/12 via-primary/4 to-transparent blur-[160px]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-accent/12 via-accent/4 to-transparent blur-[160px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-r from-primary/5 via-transparent to-accent/5 blur-[200px]" />
        {/* Subtle noise overlay for depth */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10">
        <AppHeader />

        <main className="max-w-3xl mx-auto px-4 md:px-6 py-6">
          {/* Tab Navigation */}
          <div className="mb-6">
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Tab Content */}
          {renderTab()}
        </main>
      </div>
    </div>
  );
};

export default Index;
