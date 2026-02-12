import { useState } from "react";
import AppHeader from "../components/AppHeader";
import TabNav from "../components/TabNav";
import PromptGeneratorTab from "../components/PromptGeneratorTab";
import CodingPromptTab from "../components/CodingPromptTab";
import ImagePromptTab from "../components/ImagePromptTab";
import ImageGeneratorTab from "../components/ImageGeneratorTab";
import AdPosterTab from "../components/AdPosterTab";
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
      case "image":
        return <ImageGeneratorTab />;
      case "ad-poster":
        return <AdPosterTab />;
      case "image-to-prompt":
        return <ImageToPromptTab />;
      default:
        return <PromptGeneratorTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />

      {/* Gradient orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-accent/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 via-transparent to-accent/5 blur-[150px] pointer-events-none" />

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
