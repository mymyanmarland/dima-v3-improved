import { useState, useMemo } from "react";
import { Copy, Check, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { CATEGORIES, READY_MADE_PROJECTS, type ReadyMadeProject } from "@/data/readyMadePrompts";

const ReadyMadePromptTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ReadyMadeProject | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return READY_MADE_PROJECTS.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyPrompt = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt ကို clipboard ထဲ copy ပြီးပါပြီ" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Project ရှာပါ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl bg-background"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat.id); setSelectedProject(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} project(s) တွေ့ပါတယ်
      </p>

      {selectedProject ? (
        /* Selected Project Detail */
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-primary hover:underline mb-2 block"
              >
                ← ပြန်သွားမယ်
              </button>
              <h3 className="text-lg font-bold text-foreground">
                {selectedProject.emoji} {selectedProject.title}
              </h3>
              <span className="text-xs text-muted-foreground capitalize">
                {CATEGORIES.find((c) => c.id === selectedProject.category)?.label}
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => copyPrompt(selectedProject.prompt)}
              className="shrink-0 rounded-xl"
            >
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <ScrollArea className="h-[50vh]">
            <pre className="whitespace-pre-wrap text-sm text-foreground/90 font-sans leading-relaxed">
              {selectedProject.prompt}
            </pre>
          </ScrollArea>
        </div>
      ) : (
        /* Project Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-xl p-4 text-left hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{project.emoji}</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {project.title}
                  </h4>
                  <span className="text-xs text-muted-foreground capitalize">
                    {CATEGORIES.find((c) => c.id === project.category)?.label}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto shrink-0 -rotate-90 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadyMadePromptTab;
