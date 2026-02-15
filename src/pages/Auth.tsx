import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import GlossyTitle from "@/components/GlossyTitle";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import StarryBackground from "@/components/StarryBackground";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("Email နှင့် Password ထည့်ပေးပါ");
      return;
    }

    if (password.length < 6) {
      toast.error("Password အနည်းဆုံး ၆ လုံး ရှိရပါမယ်");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email သို့မဟုတ် Password မှားနေပါတယ်");
          } else if (error.message.includes("Email not confirmed")) {
            toast.error("Email ကို confirm လုပ်ပါ။ Inbox စစ်ကြည့်ပါ");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Login အောင်မြင်ပါတယ်! 🎉");
          // Speak welcome message
          try {
            const utterance = new SpeechSynthesisUtterance(
              "Welcome To The Dynamic Idea Maker App, Prompt Generator"
            );
            utterance.lang = "en-US";
            utterance.rate = 0.95;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
          } catch {}
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("ဒီ Email ဖြင့် အကောင့်ရှိပြီးသားဖြစ်ပါတယ်");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("အကောင့်ဖန်တီးပြီးပါပြီ! Email confirm လုပ်ပေးပါ 📧");
        }
      }
    } catch (err) {
      toast.error("တစ်ခုခုမှားနေပါတယ်");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <GlossyTitle />
          <p className="text-sm text-muted-foreground mt-3">Advanced AI Generation Suite</p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl p-7 bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20">
          <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="သင့်နာမည်"
                    className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 btn-gradient text-primary-foreground rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              ) : null}
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            {isLogin && (
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="w-full text-xs text-muted-foreground hover:text-primary transition-colors text-right"
              >
                Password မေ့သွားလား?
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? (
                <>အကောင့်မရှိသေးဘူးလား? <span className="text-gradient font-medium">Sign Up</span></>
              ) : (
                <>အကောင့်ရှိပြီးသားလား? <span className="text-gradient font-medium">Sign In</span></>
              )}
            </button>
          </div>
        </div>
      </div>

      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
    </div>
  );
};

export default Auth;
