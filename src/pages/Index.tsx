import { useState } from "react";
import AppHeader from "../components/AppHeader";
import PriceTicker from "../components/PriceTicker";
import TabNav from "../components/TabNav";
import PromptGeneratorTab from "../components/PromptGeneratorTab";
import CodingPromptTab from "../components/CodingPromptTab";
import ImagePromptTab from "../components/ImagePromptTab";
import ImageToPromptTab from "../components/ImageToPromptTab";
import VideoPromptTab from "../components/VideoPromptTab";
import VideoPromptEnglishTab from "../components/VideoPromptEnglishTab";
import HowToUseTab from "../components/HowToUseTab";
import AboutTab from "../components/AboutTab";
import ChatBotTab from "../components/ChatBotTab";
import ReadyMadePromptTab from "../components/ReadyMadePromptTab";
import ApiTestTab from "../components/ApiTestTab";
import TextDesignPromptTab from "../components/TextDesignPromptTab";
import ActivityLogTab from "../components/ActivityLogTab";
import StarryBackground from "../components/StarryBackground";

const Index = () => {
  const [activeTab, setActiveTab] = useState("prompt");

  const renderTab = () => {
    switch (activeTab) {
      case "about":
        return <AboutTab />;
      case "how-to-use":
        return <HowToUseTab />;
      case "prompt":
        return <PromptGeneratorTab />;
      case "coding-prompt":
        return <CodingPromptTab />;
      case "ready-made":
        return <ReadyMadePromptTab />;
      case "text-design":
        return <TextDesignPromptTab />;
      case "video-prompt":
        return <VideoPromptTab />;
      case "video-prompt-en":
        return <VideoPromptEnglishTab />;
      case "image-prompt":
        return <ImagePromptTab />;
      case "image-to-prompt":
        return <ImageToPromptTab />;
      case "chatbot":
        return <ChatBotTab />;
      case "activity-log":
        return <ActivityLogTab />;
      case "api-test":
        return <ApiTestTab />;
      default:
        return <PromptGeneratorTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />

      <div className="relative z-10">
        <AppHeader />
        <PriceTicker />

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
