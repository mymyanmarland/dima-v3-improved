import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, Users, BarChart3, ArrowLeft, Activity,
  UserCheck, TrendingUp, Zap, ImageIcon, MessageSquare,
  Calendar, Clock, Search, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  user_id: string;
  display_name: string | null;
  created_at: string;
  role: string;
  usage_count: number;
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
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"dashboard" | "users" | "analytics" | "activity">("dashboard");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalPrompts: 0,
    totalImages: 0,
    totalAdPosters: 0,
    totalImagePrompts: 0,
    todayUsage: 0,
    weekUsage: 0,
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

  const fetchAllData = async () => {
    setLoadingData(true);
    console.log("[Admin] Fetching all data...");
    try {
      // Fetch profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, created_at");

      // Fetch roles
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      // Fetch all usage logs
      const { data: logs } = await supabase
        .from("usage_logs")
        .select("action_type, topic, category, created_at, user_id")
        .order("created_at", { ascending: false });

      // Build user data with usage counts
      const usageCounts: Record<string, number> = {};
      (logs || []).forEach((log) => {
        usageCounts[log.user_id] = (usageCounts[log.user_id] || 0) + 1;
      });

      const combinedUsers: UserProfile[] = (profiles || []).map((p) => ({
        user_id: p.user_id,
        display_name: p.display_name,
        created_at: p.created_at,
        role: roles?.find((r) => r.user_id === p.user_id)?.role || "user",
        usage_count: usageCounts[p.user_id] || 0,
      }));

      console.log("[Admin] Profiles:", profiles?.length, "Roles:", roles?.length, "Logs:", logs?.length);
      setUsers(combinedUsers);

      // Build usage logs with user names
      const userNameMap: Record<string, string> = {};
      (profiles || []).forEach((p) => {
        userNameMap[p.user_id] = p.display_name || "Unknown";
      });

      const logsWithNames: UsageLog[] = (logs || []).map((log) => ({
        ...log,
        user_name: userNameMap[log.user_id] || "Unknown",
      }));
      setUsageLogs(logsWithNames);

      // Calculate stats
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
        await supabase
          .from("user_roles")
          .update({ role: "user" })
          .eq("user_id", userId)
          .eq("role", "admin");
        toast.success("Admin role removed");
      } else {
        await supabase
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" });
        toast.success("Admin role granted");
      }
      fetchAllData();
    } catch {
      toast.error("Error updating role");
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.display_name || "").toLowerCase().includes(searchQuery.toLowerCase())
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
                <p className="text-[10px] text-muted-foreground">System Management & Analytics</p>
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
          {/* Navigation Tabs */}
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
              {/* ========== DASHBOARD ========== */}
              {activeSection === "dashboard" && (
                <div className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="primary" />
                    <StatCard icon={UserCheck} label="Admins" value={stats.totalAdmins} color="accent" />
                    <StatCard icon={Zap} label="Today" value={stats.todayUsage} color="primary" />
                    <StatCard icon={TrendingUp} label="This Week" value={stats.weekUsage} color="accent" />
                  </div>

                  {/* Generation Stats */}
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

                  {/* Recent Activity */}
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

              {/* ========== USERS ========== */}
              {activeSection === "users" && (
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..."
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
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Role</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Usage</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Joined</th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((u) => (
                            <tr key={u.user_id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                    {(u.display_name || "U")[0].toUpperCase()}
                                  </div>
                                  <span className="text-sm text-foreground font-medium">
                                    {u.display_name || "Unknown"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
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
                              <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                                {new Date(u.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  onClick={() => toggleAdmin(u.user_id, u.role)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                    u.role === "admin"
                                      ? "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20"
                                      : "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20"
                                  }`}
                                >
                                  {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredUsers.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">No users found</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ========== ANALYTICS ========== */}
              {activeSection === "analytics" && (
                <div className="space-y-6">
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={MessageSquare} label="Text Prompts" value={stats.totalPrompts} color="primary" />
                    <StatCard icon={ImageIcon} label="Image Prompts" value={stats.totalImagePrompts} color="accent" />
                    <StatCard icon={ImageIcon} label="Images" value={stats.totalImages} color="primary" />
                    <StatCard icon={Zap} label="Ad Posters" value={stats.totalAdPosters} color="accent" />
                  </div>

                  {/* Bar Chart Style */}
                  <div className="glass glow-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-6">Usage Distribution</h3>
                    <div className="space-y-4">
                      <BarRow label="✨ Text Prompts" value={stats.totalPrompts} max={totalGenerations} colorClass="bg-primary" />
                      <BarRow label="🎨 Image Prompts" value={stats.totalImagePrompts} max={totalGenerations} colorClass="bg-accent" />
                      <BarRow label="🖼️ Images" value={stats.totalImages} max={totalGenerations} colorClass="bg-primary" />
                      <BarRow label="📢 Ad Posters" value={stats.totalAdPosters} max={totalGenerations} colorClass="bg-accent" />
                    </div>
                  </div>

                  {/* Top Users */}
                  <div className="glass glow-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Top Users by Usage</h3>
                    <div className="space-y-3">
                      {[...users]
                        .sort((a, b) => b.usage_count - a.usage_count)
                        .slice(0, 10)
                        .map((u, i) => (
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
                                  style={{
                                    width: `${Math.min((u.usage_count / (users[0]?.usage_count || 1)) * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium text-primary w-8 text-right">{u.usage_count}</span>
                            </div>
                          </div>
                        ))}
                      {users.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ========== ACTIVITY LOG ========== */}
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
    </div>
  );
};

/* ========== Sub-Components ========== */

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "primary" | "accent";
}) => {
  const bgClass = color === "primary" ? "bg-primary/10" : "bg-accent/10";
  const textClass = color === "primary" ? "text-primary" : "text-accent";
  return (
    <div className="glass glow-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${bgClass} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${textClass}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
};

const MiniStat = ({
  label,
  value,
  total,
  icon,
}: {
  label: string;
  value: number;
  total: number;
  icon: string;
}) => {
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

const BarRow = ({
  label,
  value,
  max,
  colorClass,
}: {
  label: string;
  value: number;
  max: number;
  colorClass: string;
}) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-foreground w-36 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-secondary/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-medium text-foreground w-12 text-right">{value}</span>
    </div>
  );
};

const ActivityRow = ({ log, showUser = false }: { log: UsageLog; showUser?: boolean }) => {
  const actionEmoji: Record<string, string> = {
    prompt: "✨",
    image: "🖼️",
    "image-prompt": "🎨",
    ad_poster: "📢",
  };

  const actionLabel: Record<string, string> = {
    prompt: "Text Prompt",
    image: "Image",
    "image-prompt": "Image Prompt",
    ad_poster: "Ad Poster",
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/20 transition-colors">
      <span className="text-base">{actionEmoji[log.action_type] || "⚡"}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">
            {actionLabel[log.action_type] || log.action_type}
          </span>
          {showUser && log.user_name && (
            <span className="text-[10px] text-muted-foreground">by {log.user_name}</span>
          )}
        </div>
        {log.topic && (
          <p className="text-xs text-muted-foreground truncate max-w-xs">{log.topic}</p>
        )}
      </div>
      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(log.created_at)}</span>
    </div>
  );
};

export default Admin;
