import { useAuth } from "@/hooks/useAuth";
import { Key, Shield, LogOut, Lock, Settings, Menu } from "lucide-react";
import { useState } from "react";
import ApiKeyModal from "./ApiKeyModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ModelSettingsModal from "./ModelSettingsModal";
import GlossyTitle from "./GlossyTitle";
import ThemeSwitch from "./ThemeSwitch";
import AiRobotFace from "./AiRobotFace";
import DigitalClock from "./DigitalClock";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const AppHeader = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const actionButtons = user ? (
    <>
      <span className="text-sm text-muted-foreground flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1.5 animate-pulse" />
        {user.email}
      </span>

      <button
        onClick={() => { setShowKeyModal(true); setSheetOpen(false); }}
        className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-primary w-full md:w-auto"
      >
        <Key className="w-4 h-4" />
        <span>Key</span>
      </button>

      <button
        onClick={() => { setShowModelModal(true); setSheetOpen(false); }}
        className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-foreground w-full md:w-auto"
      >
        <Settings className="w-4 h-4" />
        <span>Model</span>
      </button>

      <button
        onClick={() => { setShowPasswordModal(true); setSheetOpen(false); }}
        className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-primary w-full md:w-auto"
      >
        <Lock className="w-4 h-4" />
        <span>Password</span>
      </button>

      {isAdmin && (
        <a
          href="/admin"
          className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-accent w-full md:w-auto"
        >
          <Shield className="w-4 h-4" />
          <span>Admin</span>
        </a>
      )}

      <button
        onClick={() => { signOut(); setSheetOpen(false); }}
        className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-destructive w-full md:w-auto"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </>
  ) : null;

  return (
    <>
      <header className="w-full py-3 px-3 md:py-4 md:px-6 bg-background/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <GlossyTitle />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <AiRobotFace />
            <DigitalClock />
            <ThemeSwitch />
            {actionButtons}
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeSwitch />
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2 btn-glass rounded-xl">
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-white/10 w-72">
                <SheetHeader>
                  <SheetTitle className="text-foreground">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AiRobotFace />
                    <DigitalClock />
                  </div>
                  {actionButtons}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {showKeyModal && <ApiKeyModal onClose={() => setShowKeyModal(false)} />}
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
      {showModelModal && <ModelSettingsModal onClose={() => setShowModelModal(false)} />}
    </>
  );
};

export default AppHeader;
