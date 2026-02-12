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
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-medium text-foreground mb-3 block">
          ပုံတင်ပါ
        </label>
        <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center hover:border-primary/30 transition-all cursor-pointer relative glass-subtle">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-xl object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center">
                <Upload className="w-7 h-7" />
              </div>
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
        className="fancy-button w-full"
      >
        <span className="dots_border" />
        {isLoading ? (
          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin relative z-10" />
        ) : (
          <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="path" d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" strokeWidth="1.5" />
            <path className="path" d="M5 5l1.5 4.5L11 11l-4.5 1.5L5 17l-1.5-4.5L-1 11l4.5-1.5L5 5z" strokeWidth="1" />
            <path className="path" d="M19 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" strokeWidth="1" />
          </svg>
        )}
        <span className="text_button">{isLoading ? "Analyzing..." : "Generate Prompt from Image 🔄"}</span>
      </button>

      {/* Output */}
      <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
    </div>
  );
};

export default ImageToPromptTab;
