import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Wand2,
  FileText,
  Minimize2,
  Maximize2,
  Languages,
  Share2,
  HelpCircle,
  Hash,
  Crown,
  Search,
  Check,
  ArrowRight,
  Sliders,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { ArticleItem } from "./blog-types";

interface AIContentStudioPanelProps {
  article: ArticleItem;
  onUpdateArticle: (updated: Partial<ArticleItem>) => void;
  onOpenWizard: () => void;
}

export function AIContentStudioPanel({
  article,
  onUpdateArticle,
  onOpenWizard,
}: AIContentStudioPanelProps) {
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [aiOutputPreview, setAiOutputPreview] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [targetLang, setTargetLang] = useState<string>("Deutsch");

  const runAiAction = (actionName: string, durationMs = 800) => {
    setActiveTask(actionName);
    setAiOutputPreview(null);

    setTimeout(() => {
      setActiveTask(null);

      if (actionName === "make_premium") {
        const enrichedExcerpt = `A study in architectural restraint: how ${article.category.toLowerCase()} silhouettes and heavyweight 240–400gsm textiles establish a new benchmark for heirloom-grade luxury on demand.`;
        setAiOutputPreview({
          type: "Elevated Luxury Excerpt",
          text: enrichedExcerpt,
        });
        toast.success("Content elevated to luxury editorial standard");
      } else if (actionName === "generate_title") {
        const generatedTitles = [
          `The Architecture of ${article.category}: A Modern Study in Form & Heavy Cotton`,
          `Beyond Fast Fashion: Why Restraint Defines the New European Luxury`,
          `Obsidian & Ecru: Inside the Nocturne Design Methodology`,
        ];
        const selected = generatedTitles[Math.floor(Math.random() * generatedTitles.length)];
        setAiOutputPreview({
          type: "Generated Editorial Title",
          text: selected,
        });
        toast.success("Generated 3 editorial title options");
      } else if (actionName === "generate_seo") {
        const seoTitle = `${article.title} | Studio Noir Journal`;
        const metaDesc = `Read the design monograph on ${article.title.toLowerCase()}. Curated print-on-demand luxury crafted in Berlin and London.`;
        onUpdateArticle({
          seo: {
            ...article.seo,
            seoTitle,
            metaDescription: metaDesc,
          },
        });
        toast.success("SEO Meta Title & Description optimized for SERP indexing");
      } else if (actionName === "generate_tags") {
        const suggested = [
          "Minimalism",
          "Sustainable Luxury",
          "Berlin Ateliers",
          "Heavyweight Cotton",
          "Drop Culture",
        ];
        onUpdateArticle({ tags: Array.from(new Set([...article.tags, ...suggested])) });
        toast.success("Contextual SEO tags synthesized and appended");
      } else if (actionName === "generate_faq") {
        const faqBlock = `### Frequently Asked Questions\n\n**Q: What makes this fabric archival grade?**\nA: 240gsm combed organic cotton undergoes enzyme bio-polishing to resist pilling across 100+ wash cycles.\n\n**Q: How does the zero-waste print workflow operate?**\nA: Each piece is printed upon order confirmation in Berlin, eliminating surplus stock.`;
        setAiOutputPreview({
          type: "Generated FAQ Block",
          text: faqBlock,
        });
        toast.success("Editorial FAQ schema generated");
      } else if (actionName === "social_caption") {
        const caption = `Discipline in every seam. An exploration into ${article.title.toLowerCase()}—where heavy organic cotton meets brutalist typography.\n\nRead the full monograph at studionoir.fashion/journal\n\n#StudioNoir #MinimalStreetwear #PrintOnDemand #QuietLuxury #ArchivalFashion`;
        setAiOutputPreview({
          type: "Instagram / LinkedIn Caption",
          text: caption,
        });
        toast.success("Social caption with tags synthesized");
      } else if (actionName === "translate") {
        const translatedSample =
          targetLang === "العربية (Arabic)"
            ? `دراسة في التصميم البسيط: كيف تعيد الأقمشة الثقيلة صياغة أزياء الشارع الفاخرة.`
            : targetLang === "Deutsch"
              ? `Eine Studie architektonischer Zurückhaltung: Wie schwere Baumwollstoffe und minimale Typografie europäischen Luxus neu definieren.`
              : targetLang === "Français"
                ? `Une étude de la retenue architecturale : comment les textiles lourds et la typographie minimale redéfinissent le luxe contemporain.`
                : `Un estudio sobre la moderación arquitectónica y los tejidos pesados de lujo.`;
        setAiOutputPreview({
          type: `Translation Preview (${targetLang})`,
          text: translatedSample,
        });
        toast.success(`Content translated to ${targetLang}`);
      } else {
        toast.success(`Action "${actionName}" completed`);
      }
    }, durationMs);
  };

  const applyPreview = () => {
    if (!aiOutputPreview) return;
    if (aiOutputPreview.type.includes("Title")) {
      onUpdateArticle({ title: aiOutputPreview.text });
      toast.success("Applied as article title");
    } else if (aiOutputPreview.type.includes("Excerpt")) {
      onUpdateArticle({ excerpt: aiOutputPreview.text });
      toast.success("Applied as article excerpt");
    } else {
      toast.success("Content copied to clipboard");
      navigator.clipboard?.writeText?.(aiOutputPreview.text);
    }
    setAiOutputPreview(null);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner Card */}
      <div className="p-4 bg-surface-2 border border-gold/30 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-gold" />
            <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">
              AI Content Studio
            </h4>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-gold/15 text-gold border border-gold/40">
            PRO STUDIO
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
          Integrated creative copilot trained on European luxury editorial standards, typography,
          and POD merchandising.
        </p>

        <button
          type="button"
          onClick={onOpenWizard}
          className="w-full mt-3 py-2 bg-gold text-background text-xs uppercase font-mono tracking-wider font-bold hover:bg-foreground hover:text-background flex items-center justify-center gap-1.5 transition-colors"
        >
          <Wand2 className="size-3.5" /> Full Article Generator Wizard
        </button>
      </div>

      {/* Output Preview Card if present */}
      {aiOutputPreview && (
        <div className="p-3.5 bg-surface-2 border border-gold animate-fade-in-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gold font-semibold flex items-center gap-1.5">
              <Sparkles className="size-3 text-gold" /> {aiOutputPreview.type}
            </span>
            <button
              type="button"
              onClick={() => setAiOutputPreview(null)}
              className="text-[10px] text-muted-foreground hover:text-foreground font-mono"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-foreground bg-background/60 p-2.5 border border-border/80 font-sans leading-relaxed whitespace-pre-line">
            {aiOutputPreview.text}
          </p>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText?.(aiOutputPreview.text);
                toast.success("Copied to clipboard");
              }}
              className="px-2.5 py-1 text-[10px] font-mono uppercase border border-border hover:border-gold text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Copy className="size-3" /> Copy
            </button>
            <button
              type="button"
              onClick={applyPreview}
              className="px-3 py-1 text-[10px] font-mono uppercase bg-gold text-background font-semibold hover:bg-foreground hover:text-background flex items-center gap-1"
            >
              <Check className="size-3" /> Apply to Article
            </button>
          </div>
        </div>
      )}

      {/* Quick Editorial Actions */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
          Editorial & Tone Refinement
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("make_premium")}
            className="p-2.5 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-foreground font-medium group-hover:text-gold">
              <span className="flex items-center gap-1.5">
                <Crown className="size-3.5 text-gold" /> Make More Premium
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Elevate tone to luxury standard
            </p>
          </button>

          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("generate_title")}
            className="p-2.5 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-foreground font-medium group-hover:text-gold">
              <span className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-gold" /> Generate Titles
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">3 high-CTR editorial options</p>
          </button>

          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("shorten")}
            className="p-2.5 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-foreground font-medium group-hover:text-gold">
              <span className="flex items-center gap-1.5">
                <Minimize2 className="size-3.5 text-gold" /> Condense & Shorten
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Strip fluff, sharpen flow</p>
          </button>

          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("expand")}
            className="p-2.5 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-foreground font-medium group-hover:text-gold">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="size-3.5 text-gold" /> Expand Section
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Add deeper textile analysis</p>
          </button>
        </div>
      </div>

      {/* SEO & Merchandising Assistants */}
      <div className="space-y-2 pt-2 border-t border-border">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
          Search & Social Intelligence
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("generate_seo")}
            className="p-2 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all text-xs flex items-center gap-2 group"
          >
            <Search className="size-3.5 text-gold shrink-0" />
            <span className="truncate group-hover:text-gold">Generate SEO Meta</span>
          </button>

          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("generate_tags")}
            className="p-2 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all text-xs flex items-center gap-2 group"
          >
            <Hash className="size-3.5 text-gold shrink-0" />
            <span className="truncate group-hover:text-gold">Generate Tags</span>
          </button>

          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("generate_faq")}
            className="p-2 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all text-xs flex items-center gap-2 group"
          >
            <HelpCircle className="size-3.5 text-gold shrink-0" />
            <span className="truncate group-hover:text-gold">Generate FAQ Block</span>
          </button>

          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("social_caption")}
            className="p-2 bg-surface-2 border border-border hover:border-gold/60 text-left transition-all text-xs flex items-center gap-2 group"
          >
            <Share2 className="size-3.5 text-gold shrink-0" />
            <span className="truncate group-hover:text-gold">Social Captions</span>
          </button>
        </div>
      </div>

      {/* Multi-Language Translation Suite */}
      <div className="space-y-2 pt-2 border-t border-border">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block flex items-center justify-between">
          <span>International Translation</span>
          <Languages className="size-3 text-gold" />
        </label>
        <div className="flex gap-2">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-2/3 px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          >
            <option value="Deutsch">Deutsch (German)</option>
            <option value="Français">Français (French)</option>
            <option value="العربية (Arabic)">العربية (Arabic - RTL)</option>
            <option value="Español">Español (Spanish)</option>
            <option value="Italiano">Italiano (Italian)</option>
          </select>
          <button
            type="button"
            disabled={activeTask !== null}
            onClick={() => runAiAction("translate")}
            className="w-1/3 px-2 py-1.5 bg-surface-2 hover:bg-gold hover:text-background border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors flex items-center justify-center gap-1"
          >
            Translate <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
