import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PromptOutput from "./PromptOutput";

const ImageToPromptTab = () => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size 5MB ထက်ကြီးပါတယ်");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setImageUrl(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    if (!imageUrl) {
      toast.error("ပုံတင်ပေးပါ");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");

    try {
      const { data, error } = await supabase.functions.invoke("image-to-prompt", {
        body: { imageUrl },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.prompt) {
        setGeneratedPrompt(data.prompt);
        toast.success("Prompt generated from image! 🔄");

        if (user) {
          await supabase.from("usage_logs").insert({
            user_id: user.id,
            action_type: "image_to_prompt",
            topic: "Image to Prompt",
            category: "image_to_prompt",
          });
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error ဖြစ်ပါတယ်");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Upload */}
      <div className="glass glow-border rounded-xl p-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          ပုံတင်ပါ
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-all cursor-pointer relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Upload className="w-8 h-8" />
              <p className="text-sm">Click သို့မဟုတ် drag & drop</p>
              <p className="text-xs">PNG, JPG, WEBP (Max 5MB)</p>
            </div>
          )}
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={generate}
        disabled={isLoading || !imageUrl}
        className="w-full py-3.5 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-accent"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? "Analyzing..." : "Generate Prompt from Image 🔄"}
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default ImageToPromptTab;
