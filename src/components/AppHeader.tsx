import { useAuth } from "@/hooks/useAuth";
import { Key, Shield, LogOut, Lock, Settings } from "lucide-react";
import { useState } from "react";
import ApiKeyModal from "./ApiKeyModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ModelSettingsModal from "./ModelSettingsModal";
import GlossyTitle from "./GlossyTitle";
import ThemeSwitch from "./ThemeSwitch";

const AppHeader = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  return (
    <>
      <header className="w-full py-4 px-4 md:px-6 bg-background/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <GlossyTitle />

          <div className="flex items-center gap-2">
            <ThemeSwitch />

            {user && (
              <>
                <span className="text-sm text-muted-foreground hidden md:block">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1.5 animate-pulse" />
                  {user.email}
                </span>
                
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-primary"
                >
                  <Key className="w-4 h-4" />
                  <span className="hidden sm:inline">Key</span>
                </button>

                <button
                  onClick={() => setShowModelModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-foreground"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Model</span>
                </button>

                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-primary"
                >
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Password</span>
                </button>

                {isAdmin && (
                  <a
                    href="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-accent"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </a>
                )}

                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 px-3.5 py-2 btn-glass rounded-xl text-sm font-medium text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
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
