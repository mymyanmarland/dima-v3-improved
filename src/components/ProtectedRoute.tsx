import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, signOut } = useAuth();
  const [accessStatus, setAccessStatus] = useState<"loading" | "allowed" | "banned" | "expired">("loading");
  const [banReason, setBanReason] = useState("");
  const [bannedUntil, setBannedUntil] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setAccessStatus("loading");
      return;
    }

    const checkAccess = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("is_banned, banned_until, ban_reason, access_expires_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!data) {
        setAccessStatus("allowed");
        return;
      }

      // Check ban (auto-unban if temp ban expired)
      if (data.is_banned) {
        if (data.banned_until && new Date(data.banned_until) <= new Date()) {
          // Temp ban expired - still show as allowed
          setAccessStatus("allowed");
        } else {
          setBanReason(data.ban_reason || "");
          setBannedUntil(data.banned_until);
          setAccessStatus("banned");
          return;
        }
      }

      // Check access expiry
      if (data.access_expires_at && new Date(data.access_expires_at) < new Date()) {
        setAccessStatus("expired");
        return;
      }

      setAccessStatus("allowed");
    };

    checkAccess();
  }, [user]);

  if (loading || (user && accessStatus === "loading")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (accessStatus === "banned") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-3xl">🚫</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Account ကို ပိတ်ထားပါတယ်</h1>
          {banReason && (
            <p className="text-sm text-muted-foreground">အကြောင်းပြချက်: {banReason}</p>
          )}
          {bannedUntil && (
            <p className="text-sm text-muted-foreground">
              ပြန်ဖွင့်မယ့်ရက်: {new Date(bannedUntil).toLocaleDateString("my-MM", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          <p className="text-xs text-muted-foreground">Admin ကို ဆက်သွယ်ပါ</p>
          <button
            onClick={signOut}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground border border-border hover:bg-secondary/80 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  if (accessStatus === "expired") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center">
            <span className="text-3xl">⏰</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Access သက်တမ်း ကုန်သွားပါပြီ</h1>
          <p className="text-sm text-muted-foreground">
            ဒီ website ကို ဆက်သုံးချင်ရင် Admin ကို ဆက်သွယ်ပါ
          </p>
          <button
            onClick={signOut}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground border border-border hover:bg-secondary/80 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
