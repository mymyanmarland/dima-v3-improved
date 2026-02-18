import { useState, lazy, Suspense, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import PriceTicker from "../components/PriceTicker";
import TabNav from "../components/TabNav";
import PromptGeneratorTab from "../components/PromptGeneratorTab";
import CodingPromptTab from "../components/CodingPromptTab";
import VibeCodingTab from "../components/VibeCodingTab";
import ImagePromptTab from "../components/ImagePromptTab";
import ImageToPromptTab from "../components/ImageToPromptTab";
import VideoPromptTab from "../components/VideoPromptTab";
import VideoPromptEnglishTab from "../components/VideoPromptEnglishTab";

import ChatBotTab from "../components/ChatBotTab";
import ReadyMadePromptTab from "../components/ReadyMadePromptTab";
import ApiTestTab from "../components/ApiTestTab";
import TextDesignPromptTab from "../components/TextDesignPromptTab";
import LogoPromptTab from "../components/LogoPromptTab";
import RefinePromptTab from "../components/RefinePromptTab";
import ActivityLogTab from "../components/ActivityLogTab";
import { ChevronUp, ChevronDown } from "lucide-react";

const StarryBackground = lazy(() => import("../components/StarryBackground"));
const ChatBotPopup = lazy(() => import("../components/ChatBotPopup"));

const ScrollButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div className="fixed bottom-32 right-4 z-40 flex flex-col gap-2">
      {showTop && (
        <button
          onClick={scrollTop}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: "hsl(var(--primary) / 0.85)",
            color: "hsl(var(--primary-foreground))",
            backdropFilter: "blur(8px)",
            border: "1px solid hsl(var(--primary) / 0.3)",
          }}
          title="Page ထိပ်သို့"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      <button
        onClick={scrollBottom}
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "hsl(var(--accent) / 0.85)",
          color: "hsl(var(--accent-foreground))",
          backdropFilter: "blur(8px)",
          border: "1px solid hsl(var(--accent) / 0.3)",
        }}
        title="Page အောက်သို့"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("prompt");

  const renderTab = () => {
    switch (activeTab) {
      case "prompt":
        return <PromptGeneratorTab />;
      case "refine-prompt":
        return <RefinePromptTab />;
      case "coding-prompt":
        return <CodingPromptTab />;
      case "vibe-coding":
        return <VibeCodingTab />;
      case "ready-made":
        return <ReadyMadePromptTab />;
      case "text-design":
        return <TextDesignPromptTab />;
      case "video-prompt":
        return <VideoPromptTab />;
      case "video-prompt-en":
        return <VideoPromptEnglishTab />;
      case "logo-prompt":
        return <LogoPromptTab />;
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
    <>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Suspense fallback={null}>
          <StarryBackground />
        </Suspense>

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
      <ScrollButtons />
      <Suspense fallback={null}>
        <ChatBotPopup />
      </Suspense>
    </>
  );
};

export default Index;
