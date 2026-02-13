import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Clock, Filter, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface UsageLog {
  id: string;
  action_type: string;
  topic: string | null;
  category: string | null;
  created_at: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  "general": "🌐",
  "coding": "💻",
  "coding-prompt": "💻",
  "image-prompt": "🎨",
  "video-prompt": "🎬",
  "video-prompt-en": "🎬",
  "text-design": "🔤",
  "image-to-prompt": "🔄",
  "chatbot": "🤖",
  "random-general-idea": "🎲",
  "random-coding-idea": "🎲",
  "random-image-idea": "🎲",
  "random-video-idea": "🎲",
  "prompt": "✨",
  "prompt_execute": "🚀",
};

const ACTION_LABELS: Record<string, string> = {
  "prompt": "Prompt Generate",
  "prompt_execute": "Generate + Execute",
  "chat": "AI Chat",
  "image-to-prompt": "Image to Prompt",
};

const FILTER_OPTIONS = [
  { id: "all", label: "🔍 All" },
  { id: "prompt", label: "✨ Prompt" },
  { id: "prompt_execute", label: "🚀 Execute" },
  { id: "chat", label: "🤖 Chat" },
];

const ActivityLogTab = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchLogs = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      let query = supabase
        .from("usage_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);

      if (filter !== "all") {
        query = query.eq("action_type", filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Activity log ဖတ်၍ မရပါ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user, filter]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "ခုနက";
    if (diffMins < 60) return `${diffMins} မိနစ်အကြာ`;
    if (diffHours < 24) return `${diffHours} နာရီအကြာ`;
    if (diffDays < 7) return `${diffDays} ရက်အကြာ`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getCategoryEmoji = (category: string | null) => {
    if (!category) return "📝";
    return CATEGORY_EMOJI[category] || "📝";
  };

  const getActionLabel = (actionType: string) => {
    return ACTION_LABELS[actionType] || actionType;
  };

  if (!user) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Activity log ကြည့်ရန် Login ဝင်ပါ</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 px-1 flex-wrap">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/20 text-primary">
          📊 Activity Log
        </span>
        <span className="text-xs text-muted-foreground">
          သင် generate လုပ်ခဲ့တဲ့ prompt များ
        </span>
        <button
          onClick={fetchLogs}
          disabled={isLoading}
          className="ml-auto px-3 py-1.5 rounded-full text-xs font-semibold glass-subtle border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 inline mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`glossy-chip ${filter === opt.id ? "glossy-chip--active" : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{logs.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Activities</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-accent">
            {logs.filter((l) => l.action_type === "prompt").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Prompts</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {logs.filter((l) => l.action_type === "prompt_execute").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Executions</div>
        </div>
      </div>

      {/* Log List */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Activity မရှိသေးပါ</p>
            <p className="text-xs text-muted-foreground mt-1">Prompt generate လုပ်ပြီးရင် ဒီမှာ ပေါ်လာပါမယ်</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="glass-card rounded-xl p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-start gap-3">
                <div className="text-xl flex-shrink-0 mt-0.5">
                  {getCategoryEmoji(log.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium glass-subtle border border-primary/20 text-primary">
                      {getActionLabel(log.action_type)}
                    </span>
                    {log.category && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium glass-subtle border border-accent/20 text-accent">
                        {log.category}
                      </span>
                    )}
                  </div>
                  {log.topic && (
                    <p className="text-sm text-foreground/90 line-clamp-2 mt-1">{log.topic}</p>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(log.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLogTab;
