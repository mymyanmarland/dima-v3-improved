import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, Users, BarChart3, ArrowLeft, Activity,
  UserCheck, TrendingUp, Zap, ImageIcon, MessageSquare,
  Clock, Search, RefreshCw, Ban, CheckCircle, KeyRound,
  CalendarClock, XCircle, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  user_id: string;
  display_name: string | null;
  email?: string;
  created_at: string;
  role: string;
  usage_count: number;
  is_banned: boolean;
  banned_until: string | null;
  ban_reason: string | null;
  access_expires_at: string | null;
  last_sign_in?: string | null;
}

interface UsageLog {
  action_type: string;
  topic: string | null;
  category: string | null;
  created_at: string;
  user_id: string;
  user_name?: string;
}

const Admin = () => {
  const { isAdmin, loading, session } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"dashboard" | "users" | "analytics" | "activity">("dashboard");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("permanent");
  const [expiryDate, setExpiryDate] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalPrompts: 0,
    totalImages: 0,
    totalAdPosters: 0,
    totalImagePrompts: 0,
    todayUsage: 0,
    weekUsage: 0,
    bannedUsers: 0,
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
      toast.error("Admin access only");
    }
  }, [loading, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const callAdminAction = async (action: string, userId: string, params: Record<string, unknown> = {}) => {
    const base = import.meta.env.VITE_SUPABASE_URL + "/functions/v1";
    const res = await fetch(`${base}/admin-actions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify({ action, userId, ...params }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Action failed");
    return data;
  };

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, created_at, is_banned, banned_until, ban_reason, access_expires_at");

      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      const { data: logs } = await supabase
        .from("usage_logs")
        .select("action_type, topic, category, created_at, user_id")
        .order("created_at", { ascending: false });

      // Fetch user emails via admin edge function
      let userEmails: Record<string, { email: string; last_sign_in: string | null }> = {};
      try {
        const emailData = await callAdminAction("get_users_detail", "");
        userEmails = emailData.users || {};
      } catch (e) {
        console.warn("Could not fetch user emails:", e);
      }

      const usageCounts: Record<string, number> = {};
      (logs || []).forEach((log) => {
        usageCounts[log.user_id] = (usageCounts[log.user_id] || 0) + 1;
      });

      const combinedUsers: UserProfile[] = (profiles || []).map((p: any) => ({
        user_id: p.user_id,
        display_name: p.display_name,
        email: userEmails[p.user_id]?.email || "",
        created_at: p.created_at,
        role: roles?.find((r) => r.user_id === p.user_id)?.role || "user",
        usage_count: usageCounts[p.user_id] || 0,
        is_banned: p.is_banned || false,
        banned_until: p.banned_until,
        ban_reason: p.ban_reason,
        access_expires_at: p.access_expires_at,
        last_sign_in: userEmails[p.user_id]?.last_sign_in || null,
      }));

      setUsers(combinedUsers);

      const userNameMap: Record<string, string> = {};
      (profiles || []).forEach((p: any) => {
        userNameMap[p.user_id] = p.display_name || "Unknown";
      });

      const logsWithNames: UsageLog[] = (logs || []).map((log) => ({
        ...log,
        user_name: userNameMap[log.user_id] || "Unknown",
      }));
      setUsageLogs(logsWithNames);

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const actionCounts: Record<string, number> = {};
      let todayCount = 0;
      let weekCount = 0;

      (logs || []).forEach((log) => {
        actionCounts[log.action_type] = (actionCounts[log.action_type] || 0) + 1;
        const logDate = new Date(log.created_at);
        if (logDate >= today) todayCount++;
        if (logDate >= weekAgo) weekCount++;
      });

      setStats({
        totalUsers: combinedUsers.length,
        totalAdmins: combinedUsers.filter((u) => u.role === "admin").length,
        totalPrompts: actionCounts["prompt"] || 0,
        totalImages: actionCounts["image"] || 0,
        totalAdPosters: actionCounts["ad_poster"] || 0,
        totalImagePrompts: actionCounts["image-prompt"] || 0,
        todayUsage: todayCount,
        weekUsage: weekCount,
        bannedUsers: combinedUsers.filter((u) => u.is_banned).length,
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
      toast.error("Data fetch error");
    } finally {
      setLoadingData(false);
    }
  };

  const toggleAdmin = async (userId: string, currentRole: string) => {
    try {
      if (currentRole === "admin") {
        await supabase.from("user_roles").update({ role: "user" }).eq("user_id", userId).eq("role", "admin");
        toast.success("Admin role removed");
      } else {
        await supabase.from("user_roles").upsert({ user_id: userId, role: "admin" });
        toast.success("Admin role granted");
      }
      fetchAllData();
    } catch {
      toast.error("Error updating role");
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;
    setActionLoading("ban");
    try {
      let bannedUntil: string | null = null;
      if (banDuration !== "permanent") {
        const now = new Date();
        const days = parseInt(banDuration);
        bannedUntil = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
      }
      await callAdminAction("ban_user", selectedUser.user_id, { reason: banReason, bannedUntil });
      toast.success(`${selectedUser.display_name || "User"} ကို ban လုပ်ပြီးပါပြီ`);
      setShowBanModal(false);
      setBanReason("");
      setBanDuration("permanent");
      fetchAllData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ban failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    setActionLoading(userId);
    try {
      await callAdminAction("unban_user", userId);
      toast.success("User unban ပြီးပါပြီ");
      fetchAllData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unban failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetPassword = async (userId: string, userName: string) => {
    setActionLoading(userId + "-reset");
    try {
      const result = await callAdminAction("reset_password", userId);
      toast.success(result.message || `${userName} အတွက် password reset link ပို့ပြီးပါပြီ`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSetExpiry = async () => {
    if (!selectedUser) return;
    setActionLoading("expiry");
    try {
      await callAdminAction("set_access_expiry", selectedUser.user_id, {
        expiresAt: expiryDate ? new Date(expiryDate).toISOString() : null,
      });
      toast.success(expiryDate ? "Access expiry သတ်မှတ်ပြီးပါပြီ" : "Access expiry ဖယ်ရှားပြီးပါပြီ");
      setShowExpiryModal(false);
      setExpiryDate("");
      fetchAllData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.display_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalGenerations = stats.totalPrompts + stats.totalImages + stats.totalAdPosters + stats.totalImagePrompts;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "activity", label: "Activity Log", icon: Clock },
  ] as const;

  const isAccessExpired = (u: UserProfile) => {
    if (!u.access_expires_at) return false;
    return new Date(u.access_expires_at) < new Date();
  };

  const getUserStatus = (u: UserProfile) => {
    if (u.is_banned) {
      if (u.banned_until && new Date(u.banned_until) > new Date()) {
        return { label: "Temp Banned", color: "bg-orange-500/15 text-orange-400 border-orange-500/20" };
      }
      if (u.banned_until && new Date(u.banned_until) <= new Date()) {
        return { label: "Active", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" };
      }
      return { label: "Banned", color: "bg-destructive/15 text-destructive border-destructive/20" };
    }
    if (isAccessExpired(u)) {
      return { label: "Expired", color: "bg-orange-500/15 text-orange-400 border-orange-500/20" };
    }
    return { label: "Active", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" };
  };

  return (
    <div className="min-h-screen bg-background bg-grid relative">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="w-full py-4 px-4 md:px-6 border-b border-border/50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-lg bg-accent/10 glow-border flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-[10px] text-muted-foreground">System Management & User Control</p>
              </div>
            </div>
            <button
              onClick={fetchAllData}
              disabled={loadingData}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-lg text-xs font-medium hover:bg-primary/20 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          {/* Navigation */}
          <div className="w-full overflow-x-auto scrollbar-hide mb-6">
            <div className="flex gap-1 p-1 bg-secondary/30 rounded-xl border border-border/50 min-w-max">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {loadingData ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* DASHBOARD */}
              {activeSection === "dashboard" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="primary" />
                    <StatCard icon={UserCheck} label="Admins" value={stats.totalAdmins} color="accent" />
                    <StatCard icon={Ban} label="Banned" value={stats.bannedUsers} color="destructive" />
                    <StatCard icon={Zap} label="Today" value={stats.todayUsage} color="primary" />
                    <StatCard icon={TrendingUp} label="This Week" value={stats.weekUsage} color="accent" />
                  </div>

                  <div className="glass glow-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Generation Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <MiniStat label="Text Prompts" value={stats.totalPrompts} total={totalGenerations} icon="✨" />
                      <MiniStat label="Image Prompts" value={stats.totalImagePrompts} total={totalGenerations} icon="🎨" />
                      <MiniStat label="Images" value={stats.totalImages} total={totalGenerations} icon="🖼️" />
                      <MiniStat label="Ad Posters" value={stats.totalAdPosters} total={totalGenerations} icon="📢" />
                    </div>
                  </div>

                  <div className="glass glow-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      Recent Activity
                    </h3>
                    <div className="space-y-2">
                      {usageLogs.slice(0, 8).map((log, i) => (
                        <ActivityRow key={i} log={log} />
                      ))}
                      {usageLogs.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No activity yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* USERS */}
              {activeSection === "users" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or email..."
                      className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div className="glass glow-border rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-foreground">Users ({filteredUsers.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">User</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Role</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Usage</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Access Expiry</th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((u) => {
                            const status = getUserStatus(u);
                            return (
                              <tr key={u.user_id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                      {(u.display_name || "U")[0].toUpperCase()}
                                    </div>
                                    <div>
                                      <span className="text-sm text-foreground font-medium block">
                                        {u.display_name || "Unknown"}
                                      </span>
                                      <span className="text-[10px] text-muted-foreground">{u.email}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                                    {status.label}
                                  </span>
                                  {u.ban_reason && u.is_banned && (
                                    <p className="text-[10px] text-muted-foreground mt-1 max-w-[120px] truncate" title={u.ban_reason}>
                                      {u.ban_reason}
                                    </p>
                                  )}
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                    u.role === "admin"
                                      ? "bg-accent/20 text-accent border border-accent/30"
                                      : "bg-secondary/50 text-muted-foreground border border-border/50"
                                  }`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell">
                                  <span className="text-sm text-foreground">{u.usage_count}</span>
                                  <span className="text-xs text-muted-foreground ml-1">gens</span>
                                </td>
                                <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                                  {u.access_expires_at ? (
                                    <span className={isAccessExpired(u) ? "text-destructive" : "text-foreground"}>
                                      {new Date(u.access_expires_at).toLocaleDateString()}
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground/50">—</span>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                    {/* Ban / Unban */}
                                    {u.is_banned ? (
                                      <button
                                        onClick={() => handleUnbanUser(u.user_id)}
                                        disabled={actionLoading === u.user_id}
                                        className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                                        title="Unban user"
                                      >
                                        <CheckCircle className="w-3 h-3 inline mr-1" />
                                        Allow
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => { setSelectedUser(u); setShowBanModal(true); }}
                                        className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all"
                                        title="Ban user"
                                      >
                                        <Ban className="w-3 h-3 inline mr-1" />
                                        Stop
                                      </button>
                                    )}

                                    {/* Password Reset */}
                                    <button
                                      onClick={() => handleResetPassword(u.user_id, u.display_name || "User")}
                                      disabled={actionLoading === u.user_id + "-reset"}
                                      className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all disabled:opacity-50"
                                      title="Reset password"
                                    >
                                      <KeyRound className="w-3 h-3 inline mr-1" />
                                      Reset PW
                                    </button>

                                    {/* Access Expiry */}
                                    <button
                                      onClick={() => { setSelectedUser(u); setExpiryDate(u.access_expires_at ? u.access_expires_at.split("T")[0] : ""); setShowExpiryModal(true); }}
                                      className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-secondary/50 text-foreground border border-border/50 hover:bg-secondary transition-all"
                                      title="Set access expiry"
                                    >
                                      <CalendarClock className="w-3 h-3 inline mr-1" />
                                      Expiry
                                    </button>

                                    {/* Toggle Admin */}
                                    <button
                                      onClick={() => toggleAdmin(u.user_id, u.role)}
                                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border ${
                                        u.role === "admin"
                                          ? "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20"
                                          : "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20"
                                      }`}
                                    >
                                      {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {filteredUsers.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">No users found</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ANALYTICS */}
              {activeSection === "analytics" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={MessageSquare} label="Text Prompts" value={stats.totalPrompts} color="primary" />
                    <StatCard icon={ImageIcon} label="Image Prompts" value={stats.totalImagePrompts} color="accent" />
                    <StatCard icon={ImageIcon} label="Images" value={stats.totalImages} color="primary" />
                    <StatCard icon={Zap} label="Ad Posters" value={stats.totalAdPosters} color="accent" />
                  </div>

                  <div className="glass glow-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-6">Usage Distribution</h3>
                    <div className="space-y-4">
                      <BarRow label="✨ Text Prompts" value={stats.totalPrompts} max={totalGenerations} colorClass="bg-primary" />
                      <BarRow label="🎨 Image Prompts" value={stats.totalImagePrompts} max={totalGenerations} colorClass="bg-accent" />
                      <BarRow label="🖼️ Images" value={stats.totalImages} max={totalGenerations} colorClass="bg-primary" />
                      <BarRow label="📢 Ad Posters" value={stats.totalAdPosters} max={totalGenerations} colorClass="bg-accent" />
                    </div>
                  </div>

                  <div className="glass glow-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Top Users by Usage</h3>
                    <div className="space-y-3">
                      {[...users].sort((a, b) => b.usage_count - a.usage_count).slice(0, 10).map((u, i) => (
                        <div key={u.user_id} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-5 text-right">#{i + 1}</span>
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {(u.display_name || "U")[0].toUpperCase()}
                          </div>
                          <span className="text-sm text-foreground flex-1">{u.display_name || "Unknown"}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${Math.min((u.usage_count / (users[0]?.usage_count || 1)) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-primary w-8 text-right">{u.usage_count}</span>
                          </div>
                        </div>
                      ))}
                      {users.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIVITY LOG */}
              {activeSection === "activity" && (
                <div className="glass glow-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Activity Log ({usageLogs.length})</h3>
                  </div>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                    {usageLogs.map((log, i) => (
                      <ActivityRow key={i} log={log} showUser />
                    ))}
                    {usageLogs.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">No activity yet</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Ban Modal */}
      {showBanModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="glass glow-border rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Ban className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">User ကို Stop လုပ်မယ်</h3>
                <p className="text-xs text-muted-foreground">{selectedUser.display_name} ({selectedUser.email})</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">အကြောင်းပြချက်</label>
              <input
                type="text"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="Ban reason..."
                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Duration</label>
              <select
                value={banDuration}
                onChange={(e) => setBanDuration(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30"
              >
                <option value="permanent">Permanent</option>
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">1 Week</option>
                <option value="14">2 Weeks</option>
                <option value="30">1 Month</option>
                <option value="90">3 Months</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setShowBanModal(false); setBanReason(""); }}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-secondary/50 text-foreground border border-border hover:bg-secondary transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBanUser}
                disabled={actionLoading === "ban"}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all disabled:opacity-50"
              >
                {actionLoading === "ban" ? "Processing..." : "Stop User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expiry Modal */}
      {showExpiryModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="glass glow-border rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarClock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Access Expiry သတ်မှတ်မယ်</h3>
                <p className="text-xs text-muted-foreground">{selectedUser.display_name} ({selectedUser.email})</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-[10px] text-muted-foreground mt-1">ဗလာထားရင် expiry ဖယ်ရှားမယ်</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setShowExpiryModal(false); setExpiryDate(""); }}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-secondary/50 text-foreground border border-border hover:bg-secondary transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSetExpiry}
                disabled={actionLoading === "expiry"}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {actionLoading === "expiry" ? "Processing..." : expiryDate ? "Set Expiry" : "Remove Expiry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========== Sub-Components ========== */

const StatCard = ({
  icon: Icon, label, value, color,
}: {
  icon: React.ElementType; label: string; value: number; color: "primary" | "accent" | "destructive";
}) => {
  const colorMap = {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    accent: { bg: "bg-accent/10", text: "text-accent" },
    destructive: { bg: "bg-destructive/10", text: "text-destructive" },
  };
  const c = colorMap[color];
  return (
    <div className="glass glow-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
};

const MiniStat = ({ label, value, total, icon }: { label: string; value: number; total: number; icon: string }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[10px] text-muted-foreground">{pct}%</span>
      </div>
    </div>
  );
};

const BarRow = ({ label, value, max, colorClass }: { label: string; value: number; max: number; colorClass: string }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-foreground w-36 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-secondary/50 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-medium text-foreground w-12 text-right">{value}</span>
    </div>
  );
};

const ActivityRow = ({ log, showUser = false }: { log: UsageLog; showUser?: boolean }) => {
  const actionEmoji: Record<string, string> = { prompt: "✨", image: "🖼️", "image-prompt": "🎨", ad_poster: "📢" };
  const actionLabel: Record<string, string> = { prompt: "Text Prompt", image: "Image", "image-prompt": "Image Prompt", ad_poster: "Ad Poster" };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/20 transition-colors">
      <span className="text-base">{actionEmoji[log.action_type] || "⚡"}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">{actionLabel[log.action_type] || log.action_type}</span>
          {showUser && log.user_name && <span className="text-[10px] text-muted-foreground">by {log.user_name}</span>}
        </div>
        {log.topic && <p className="text-xs text-muted-foreground truncate max-w-xs">{log.topic}</p>}
      </div>
      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(log.created_at)}</span>
    </div>
  );
};

export default Admin;
