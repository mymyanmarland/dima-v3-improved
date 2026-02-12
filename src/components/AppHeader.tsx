import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Key, Shield, LogOut, Lock, Sun, Moon, Settings } from "lucide-react";
import { useState } from "react";
import ApiKeyModal from "./ApiKeyModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ModelSettingsModal from "./ModelSettingsModal";
import GlossyTitle from "./GlossyTitle";

const AppHeader = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  return (
    <>
      <header className="w-full py-4 px-4 md:px-6 bg-background sticky top-0 z-50" style={{ boxShadow: '-4px -4px 10px hsl(var(--neu-shadow-light)), 4px 4px 10px hsl(var(--neu-shadow-dark))' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <GlossyTitle />

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-xl btn-glass"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>

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
