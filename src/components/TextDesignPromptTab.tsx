import { useState, useMemo } from "react";
import { Copy, Check, Search, ChevronDown, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TEXT_DESIGN_CATEGORIES, TEXT_DESIGNS, type TextDesign } from "@/data/textDesignPrompts";

const TextDesignPromptTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<TextDesign | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [userInstructions, setUserInstructions] = useState("");
  const [showRefineInput, setShowRefineInput] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return TEXT_DESIGNS.filter((d) => {
      const matchCat = selectedCategory === "all" || d.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.sampleText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyPrompt = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt ကို clipboard ထဲ copy ပြီးပါပြီ" });
    setTimeout(() => setCopied(false), 2000);
  };

  const refinePrompt = async () => {
    if (!selectedDesign) return;
    setIsRefining(true);
    setRefinedPrompt("");

    const sourcePrompt = refinedPrompt || selectedDesign.prompt;
    const instructions = userInstructions.trim()
      ? `User's additional instructions: ${userInstructions}\n\n`
      : "";

    try {
      const { data, error } = await supabase.functions.invoke("execute-prompt", {
        body: {
          prompt: `${instructions}You are an expert text design and typography prompt engineer. Improve this text design prompt to make it more detailed, creative, and visually stunning. Add specific details about lighting, texture, materials, camera angle, and artistic style. Output ONLY the improved prompt:\n\n${sourcePrompt}`,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setRefinedPrompt(data.result);
      setUserInstructions("");
      setShowRefineInput(false);
      toast({ title: "✨ Refined!", description: "Prompt ကို AI နဲ့ ပိုကောင်းအောင် ပြင်ပြီးပါပြီ" });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "AI refine မအောင်မြင်ပါ",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const displayPrompt = refinedPrompt || selectedDesign?.prompt || "";

  const handleSelectDesign = (design: TextDesign) => {
    setSelectedDesign(design);
    setRefinedPrompt("");
    setUserInstructions("");
    setShowRefineInput(false);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Text design ရှာပါ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl bg-background"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {TEXT_DESIGN_CATEGORIES.map((cat) => (
          selectedCategory === cat.id ? (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setSelectedDesign(null); setRefinedPrompt(""); }}
              className="glossy-project-btn ring-2 ring-primary/50 ring-offset-1 ring-offset-background"
            >
              <div className="glossy-project-btn-wrap">
                <span className="text-xs font-medium text-white/90">
                  {cat.emoji} {cat.label}
                </span>
              </div>
            </button>
          ) : (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setSelectedDesign(null); setRefinedPrompt(""); }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {cat.emoji} {cat.label}
            </button>
          )
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} design(s) တွေ့ပါတယ်
      </p>

      {selectedDesign ? (
        /* Selected Design Detail */
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <button
                onClick={() => { setSelectedDesign(null); setRefinedPrompt(""); }}
                className="text-xs text-primary hover:underline mb-2 block"
              >
                ← ပြန်သွားမယ်
              </button>
              <h3 className="text-lg font-bold text-foreground">
                {selectedDesign.emoji} {selectedDesign.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {TEXT_DESIGN_CATEGORIES.find((c) => c.id === selectedDesign.category)?.label}
                </span>
                <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                  Sample: "{selectedDesign.sampleText}"
                </span>
                {refinedPrompt && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    ✨ AI Refined
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowRefineInput(!showRefineInput)}
                disabled={isRefining}
                className="rounded-xl"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                AI Refine
              </Button>
              <Button
                size="sm"
                onClick={() => copyPrompt(displayPrompt)}
                className="rounded-xl"
              >
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {/* AI Refine Input */}
          {showRefineInput && (
            <div className="bg-muted/50 rounded-xl p-3 space-y-2">
              <p className="text-xs text-muted-foreground">
                ဘာတွေ ထပ်ထည့်ချင်လဲ / ဘာတွေ ပြောင်းချင်လဲ ရေးပါ (optional)
              </p>
              <Textarea
                value={userInstructions}
                onChange={(e) => setUserInstructions(e.target.value)}
                placeholder="ဥပမာ: color ပြောင်းပါ, background ထပ်ထည့်ပါ, more realistic ဖြစ်အောင်..."
                className="min-h-[60px] rounded-xl bg-background text-sm"
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={refinePrompt}
                  disabled={isRefining}
                  className="rounded-xl"
                >
                  {isRefining ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      Refining...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" />
                      {refinedPrompt ? "ထပ် Refine မယ်" : "Refine & Make Better"}
                    </>
                  )}
                </Button>
                {refinedPrompt && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { setRefinedPrompt(""); }}
                    className="rounded-xl text-xs"
                  >
                    Original ပြန်ကြည့်မယ်
                  </Button>
                )}
              </div>
            </div>
          )}

          <ScrollArea className="h-[50vh]">
            <pre className="whitespace-pre-wrap text-sm text-foreground/90 font-sans leading-relaxed">
              {isRefining ? (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI နဲ့ prompt ကို ပိုကောင်းအောင် ပြင်နေပါတယ်...
                </span>
              ) : (
                displayPrompt
              )}
            </pre>
          </ScrollArea>
        </div>
      ) : (
        /* Design Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map((design) => (
            <button
              key={design.id}
              onClick={() => handleSelectDesign(design)}
              className="glass-card rounded-xl p-4 text-left hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{design.emoji}</span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {design.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground capitalize">
                      {TEXT_DESIGN_CATEGORIES.find((c) => c.id === design.category)?.label}
                    </span>
                    <span className="text-[10px] text-accent font-mono bg-accent/10 px-1.5 py-0.5 rounded">
                      "{design.sampleText}"
                    </span>
                  </div>
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

export default TextDesignPromptTab;
