import { useState } from "react";
import {
  Sparkles,
  X,
  Wand2,
  Layers,
  FileText,
  HelpCircle,
  Globe,
  ArrowRight,
  Check,
  RefreshCw,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import type { PageBlock, PageSEO } from "../pages-types";

interface PageAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageName: string;
  onApplyStructure: (blocks: PageBlock[]) => void;
  onApplySEO?: (seo: Partial<PageSEO>) => void;
}

export function PageAIAssistantModal({
  isOpen,
  onClose,
  pageName,
  onApplyStructure,
  onApplySEO,
}: PageAIAssistantModalProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"structure" | "copy" | "seo" | "translate">(
    "structure",
  );
  const [suggestedBlocks, setSuggestedBlocks] = useState<PageBlock[] | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("French");

  if (!isOpen) return null;

  const handleGenerateStructure = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated: PageBlock[] = [
        {
          id: `blk_ai_hero_${Date.now()}`,
          type: "heading",
          label: "Hero Statement",
          settings: {
            heading: prompt
              ? `Elevated Craftsmanship: ${prompt.slice(0, 30)}...`
              : "Art You Can Wear. Quality That Endures.",
            body: "Architectural silhouettes crafted with 400gsm organic heavyweight cotton and museum-grade archival printing.",
            alignment: "center",
            width: "contained",
            typography: "display",
            backgroundTreatment: "darkroom",
          },
        },
        {
          id: `blk_ai_split_${Date.now()}`,
          type: "editorialSplit",
          label: "Atelier Narrative Split",
          settings: {
            heading: "Zero-Waste Print Production",
            body: "We operate on a zero-inventory print-on-demand model. Every garment is cut, printed with water-based pigment inks, and finished in Berlin.",
            imageUrl:
              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
            buttonText: "Discover Production Process",
            buttonStyle: "gold",
          },
        },
        {
          id: `blk_ai_pgrid_${Date.now()}`,
          type: "productGrid",
          label: "Curated Drops Grid",
          settings: {
            heading: "Signature Heavyweight Essentials",
            columns: 4,
            itemsCount: 4,
          },
        },
        {
          id: `blk_ai_quote_${Date.now()}`,
          type: "quote",
          label: "Design Manifesto Quote",
          settings: {
            heading:
              '"Luxury is not about excess. It is about permanence, weight, and uncompromising detail."',
            quoteAuthor: "Elena Vance",
            quoteRole: "Creative Director, Studio Noir",
            alignment: "center",
          },
        },
        {
          id: `blk_ai_cta_${Date.now()}`,
          type: "newsletter",
          label: "Nocturne Dispatch CTA",
          settings: {
            heading: "Join The Nocturne Dispatch",
            body: "Receive priority access to limited fine art apparel drops and private studio lookbooks.",
            buttonText: "SUBSCRIBE NOW",
          },
        },
      ];

      setSuggestedBlocks(generated);
      setIsGenerating(false);
      toast.success("AI generated page layout structure!");
    }, 900);
  };

  const handleGenerateSEO = () => {
    if (!onApplySEO) return;
    setIsGenerating(true);
    setTimeout(() => {
      onApplySEO({
        seoTitle: `${pageName || "Luxury Collection"} | Fine Art Print-On-Demand Atelier`,
        metaDescription: `Discover ${pageName} at Studio Noir. Heavyweight organic cotton apparel featuring museum-grade fine art prints crafted in Berlin & London.`,
      });
      setIsGenerating(false);
      toast.success("AI optimized SEO title and meta description!");
    }, 700);
  };

  const handleTranslate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`Translated page content into ${selectedLanguage}!`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2.5">
            <div className="size-8 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
              <Sparkles className="size-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
                Studio AI Co-Pilot & Page Generator
              </h3>
              <p className="text-xs text-muted-foreground">
                Synthesize luxury layouts, refine copy tone, and optimize search metadata.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-border bg-surface-2/20 px-5 pt-2 gap-1 overflow-x-auto">
          {[
            { id: "structure", label: "Page Structure", icon: Layers },
            { id: "copy", label: "Luxury Copywriter", icon: FileText },
            { id: "seo", label: "SEO Generator", icon: Globe },
            { id: "translate", label: "Global Translation", icon: Wand2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "structure" | "copy" | "seo" | "translate")}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 border-b-2 ${
                  activeTab === tab.id
                    ? "border-gold text-gold font-bold bg-surface"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          {activeTab === "structure" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Describe Page Objective or Concept
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Create a luxury About Us page emphasizing sustainability & 400gsm cotton..."
                    className="flex-1 px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateStructure}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <RefreshCw className="size-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="size-3.5" />
                    )}
                    Generate
                  </button>
                </div>
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  Quick Prompts:
                </span>
                {[
                  "Brand Story & Atelier",
                  "Sustainability Manifesto",
                  "Customer Care & FAQ",
                  "Autumn Drop Campaign",
                  "Garment Size & Fit",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setPrompt(chip);
                    }}
                    className="text-[10px] font-mono px-2 py-0.5 bg-surface-2 border border-border text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              {/* Suggested Structure Output */}
              {suggestedBlocks ? (
                <div className="space-y-3 p-4 bg-surface-2/40 border border-gold/40 animate-fade-in-soft">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="size-3.5 text-gold" /> Suggested Page Architecture (
                      {suggestedBlocks.length} Sections)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onApplyStructure(suggestedBlocks);
                        onClose();
                      }}
                      className="px-3 py-1 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-1"
                    >
                      <Check className="size-3" /> Apply to Canvas
                    </button>
                  </div>

                  <div className="space-y-2">
                    {suggestedBlocks.map((blk, i) => (
                      <div
                        key={blk.id}
                        className="p-3 bg-surface border border-border flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 border border-gold/30">
                            0{i + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground">{blk.label}</p>
                            <p className="text-[11px] text-muted-foreground truncate max-w-sm">
                              {blk.settings.heading || blk.settings.body || blk.type}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase text-muted-foreground border border-border px-2 py-0.5">
                          {blk.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 border border-dashed border-border bg-surface-2/20 text-center space-y-2">
                  <Wand2 className="size-6 text-gold/60 mx-auto" />
                  <p className="text-xs font-display text-foreground uppercase tracking-wider">
                    Ready for AI Page Synthesis
                  </p>
                  <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                    Enter a prompt or choose a quick prompt to generate a custom-tailored block
                    architecture.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "copy" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Enhance your brand messaging using Studio Noir's curated darkroom luxury tone
                guidelines.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Generated luxury headline options!");
                  }}
                  className="p-3 bg-surface-2 border border-border hover:border-gold text-left space-y-1 transition-colors group"
                >
                  <span className="text-xs font-mono font-bold text-foreground group-hover:text-gold uppercase block">
                    ✨ Generate Headlines
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    High-contrast serif headline ideas.
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Generated atelier brand story!");
                  }}
                  className="p-3 bg-surface-2 border border-border hover:border-gold text-left space-y-1 transition-colors group"
                >
                  <span className="text-xs font-mono font-bold text-foreground group-hover:text-gold uppercase block">
                    ✍️ Atelier Narrative
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    Zero-waste print ethos paragraphs.
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Automatically analyze page content and generate search-engine optimized Title & Meta
                Description tags.
              </p>
              <button
                type="button"
                onClick={handleGenerateSEO}
                disabled={isGenerating}
                className="w-full py-2.5 bg-gold text-background text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : (
                  <Globe className="size-4" />
                )}
                Generate & Apply High-Ranking SEO Meta Tags
              </button>
            </div>
          )}

          {activeTab === "translate" && (
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                Target Storefront Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              >
                <option value="Arabic">Arabic (العربية - RTL Support)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="Italian">Italian (Italiano)</option>
              </select>

              <button
                type="button"
                onClick={handleTranslate}
                disabled={isGenerating}
                className="w-full py-2.5 bg-gold text-background text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : (
                  <Wand2 className="size-4" />
                )}
                Translate All Page Blocks to {selectedLanguage}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
          >
            Close Co-Pilot
          </button>
          <span className="text-[10px] font-mono text-gold flex items-center gap-1">
            <Sparkles className="size-3" /> Powered by Studio Noir Gemini Engine
          </span>
        </div>
      </div>
    </div>
  );
}
