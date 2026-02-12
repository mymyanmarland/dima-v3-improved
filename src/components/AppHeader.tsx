import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Sparkles, Key, Shield, LogOut, Lock, Sun, Moon, Settings } from "lucide-react";
import { useState } from "react";
import ApiKeyModal from "./ApiKeyModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ModelSettingsModal from "./ModelSettingsModal";

const AppHeader = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  return (
    <>
      <header className="w-full py-5 px-4 md:px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 glow-border flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                AI <span className="text-gradient">Prompt Book</span>
              </h1>
              <p className="text-xs text-muted-foreground">Advanced AI Generation Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-all"
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
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary mr-1.5" />
                  {user.email}
                </span>
                
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-primary/10 text-primary border border-primary/30 rounded-xl text-sm font-medium hover:bg-primary/20 transition-all"
                >
                  <Key className="w-4 h-4" />
                  Key
                </button>

                <button
                  onClick={() => setShowModelModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-secondary/50 text-foreground border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-all"
                >
                  <Settings className="w-4 h-4" />
                  Model
                </button>

                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-primary/10 text-primary border border-primary/30 rounded-xl text-sm font-medium hover:bg-primary/20 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </button>

                {isAdmin && (
                  <a
                    href="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-accent/10 text-accent border border-accent/30 rounded-xl text-sm font-medium hover:bg-accent/20 transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </a>
                )}

                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-destructive/10 text-destructive border border-destructive/30 rounded-xl text-sm font-medium hover:bg-destructive/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
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
