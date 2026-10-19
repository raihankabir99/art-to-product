import { useState } from "react";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Check,
  Copy,
  ArrowRight,
  Sliders,
  Layers,
  Search,
  Zap,
  Bot,
  Flame,
  LayoutTemplate,
} from "lucide-react";
import type { HomepageSection } from "../homepage-types";
import { toast } from "sonner";

interface AIHomepageAssistantPanelProps {
  activeSection: HomepageSection;
  onApplyChanges: (changes: Partial<HomepageSection>) => void;
  onSuggestNewSections?: () => void;
}

interface AIProposal {
  actionName: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  seoTag?: string;
  tone: string;
  rationale: string;
}

export function AIHomepageAssistantPanel({
  activeSection,
  onApplyChanges,
  onSuggestNewSections,
}: AIHomepageAssistantPanelProps) {
  const [promptInput, setPromptInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeProposal, setActiveProposal] = useState<AIProposal | null>(null);

  const quickActions = [
    {
      id: "hero-copy",
      label: "Generate Hero Copy",
      category: "COPY",
      icon: Sparkles,
    },
    {
      id: "improve-headline",
      label: "Improve Headline",
      category: "COPY",
      icon: Wand2,
    },
    {
      id: "generate-cta",
      label: "Generate CTA",
      category: "CONVERSION",
      icon: Zap,
    },
    {
      id: "section-copy",
      label: "Generate Section Copy",
      category: "COPY",
      icon: Layers,
    },
    {
      id: "layout-suggest",
      label: "Suggest Layout Flow",
      category: "STRUCTURE",
      icon: LayoutTemplate,
    },
    {
      id: "promo-copy",
      label: "Create Promo Banner Copy",
      category: "MARKETING",
      icon: Flame,
    },
    {
      id: "product-sections",
      label: "Suggest Product Sections",
      category: "COMMERCE",
      icon: Layers,
    },
    {
      id: "generate-seo",
      label: "Generate SEO Meta",
      category: "SEARCH",
      icon: Search,
    },
  ];

  const handleRunAction = (actionId: string, customPrompt = "") => {
    setIsGenerating(true);
    setActiveProposal(null);

    setTimeout(() => {
      setIsGenerating(false);
      let proposal: AIProposal;

      switch (actionId) {
        case "hero-copy":
          proposal = {
            actionName: "Synthesized Hero Narrative",
            eyebrow: "Autumn / Winter 2026 · Graphic Edition",
            headline: "Wear the Idea. Embody the Blueprint.",
            subheadline:
              "Original architectural vector art rendered onto 280gsm organic combed cotton. Zero-waste production, crafted on demand in Europe and delivered worldwide.",
            ctaText: "Explore The Capsule",
            ctaLink: "/collections/capsule-2026",
            tone: "Architectural, High-End Luxury, Minimalist",
            rationale:
              "Emphasizes the POD craft story while leading with authoritative editorial typography.",
          };
          break;

        case "improve-headline":
          proposal = {
            actionName: "Headline Refinement",
            headline: "The Architecture of Silent Expression.",
            subheadline: "Where precise vector lines converge with museum-grade natural textiles.",
            tone: "Philosophical, Direct, Punchy",
            rationale:
              "Shortened character count from 42 to 38 for high-impact responsive typography.",
          };
          break;

        case "generate-cta":
          proposal = {
            actionName: "Conversion-Optimized CTAs",
            ctaText: "Claim First Edition",
            ctaLink: "/shop/new-drops",
            tone: "Urgent, Exclusive, Collector-focused",
            rationale:
              "Shifts from passive 'Shop Now' to high-value collector acquisition phrasing.",
          };
          break;

        case "promo-copy":
          proposal = {
            actionName: "Capsule Drop Promo Copy",
            eyebrow: "48-Hour Private Release",
            headline: "Nocturne Studio Archive: Batch 04",
            subheadline: "Strictly limited to 150 individually serialized heavyweight garments.",
            ctaText: "Enter Private Drop",
            ctaLink: "/capsule/nocturne-04",
            tone: "Scarcity, High Urgency, Velvet Rope",
            rationale: "Creates natural pre-order momentum for limited on-demand batch runs.",
          };
          break;

        case "generate-seo":
          proposal = {
            actionName: "SEO Title & Meta Description",
            seoTag: "Atelier Noir | Luxury Print on Demand Apparel & Architectural Artworks",
            subheadline:
              "Shop bespoke graphic apparel made on demand. Premium heavyweight hoodies, organic tees, and fine art prints crafted sustainably.",
            tone: "High Keyword Density & Semantic Intent",
            rationale:
              "Includes primary commercial keywords: POD apparel, luxury graphic tees, fine art prints.",
          };
          break;

        default:
          proposal = {
            actionName: customPrompt ? `Custom AI Prompt: "${customPrompt}"` : "Editorial Polish",
            eyebrow: "Curated Studio Selection",
            headline: "Precision Form. Tactile Longevity.",
            subheadline:
              "Each garment is calibrated to order using archival water-based pigment inks.",
            ctaText: "Discover Silhouettes",
            ctaLink: "/products",
            tone: "Confident Atelier Voice",
            rationale: "Tailored to align seamlessly with the existing dark aesthetic.",
          };
          break;
      }

      setActiveProposal(proposal);
      toast.success("AI synthesized new copy proposal");
    }, 700);
  };

  const handleApply = () => {
    if (!activeProposal) return;
    const patch: Record<string, unknown> = {};

    if ("eyebrow" in activeSection && activeProposal.eyebrow) {
      patch.eyebrow = activeProposal.eyebrow;
    }
    if ("headline" in activeSection && activeProposal.headline) {
      patch.headline = activeProposal.headline;
    }
    if ("title" in activeSection && activeProposal.headline) {
      patch.title = activeProposal.headline;
    }
    if ("subheadline" in activeSection && activeProposal.subheadline) {
      patch.subheadline = activeProposal.subheadline;
    }
    if ("description" in activeSection && activeProposal.subheadline) {
      patch.description = activeProposal.subheadline;
    }
    if ("primaryCtaText" in activeSection && activeProposal.ctaText) {
      patch.primaryCtaText = activeProposal.ctaText;
    }
    if ("ctaText" in activeSection && activeProposal.ctaText) {
      patch.ctaText = activeProposal.ctaText;
    }
    if (activeProposal.seoTag) {
      patch.seoTag = activeProposal.seoTag;
    }

    onApplyChanges(patch as Partial<HomepageSection>);
    toast.success(`Applied AI proposal to "${activeSection.name}"`);
  };

  return (
    <div className="space-y-5 animate-fade-in-soft">
      {/* Header Banner */}
      <div className="p-3 bg-gradient-to-br from-gold/15 to-transparent border border-gold/40">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-gold" />
          <span className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
            AI Homepage Copilot
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
          Generate editorial copy, conversion triggers, SEO metadata, and structural layout
          recommendations calibrated to your POD brand ethos.
        </p>
      </div>

      {/* Custom Prompt Input */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-mono text-muted-foreground block">
          Custom Generation Prompt
        </label>
        <div className="relative">
          <textarea
            rows={2}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. Write an avant-garde hero headline focusing on zero overproduction and heavyweight Japanese fleece..."
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
          />
        </div>
        <button
          type="button"
          disabled={!promptInput.trim() || isGenerating}
          onClick={() => handleRunAction("custom", promptInput)}
          className="w-full py-1.5 bg-gold text-background text-xs font-mono uppercase font-semibold hover:bg-white transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="size-3.5 animate-spin" /> Synthesizing...
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" /> Run Custom Prompt
            </>
          )}
        </button>
      </div>

      {/* Quick Action Matrix (8 Quick Actions) */}
      <div className="space-y-2 pt-3 border-t border-border">
        <label className="text-[10px] uppercase font-mono text-muted-foreground block">
          Curated Studio Presets
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                disabled={isGenerating}
                onClick={() => handleRunAction(action.id)}
                className="p-2 bg-surface-2 border border-border hover:border-gold hover:bg-gold/5 text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon className="size-3.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono text-zinc-500 uppercase">
                    {action.category}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-200 group-hover:text-gold line-clamp-1">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proposal Card */}
      {isGenerating && (
        <div className="p-6 bg-surface-2 border border-gold/30 text-center space-y-2 animate-pulse">
          <RefreshCw className="size-5 text-gold animate-spin mx-auto" />
          <p className="text-xs font-mono text-gold">Synthesizing editorial proposal...</p>
          <p className="text-[10px] text-muted-foreground">
            Evaluating typographic rhythm and brand semantics
          </p>
        </div>
      )}

      {activeProposal && !isGenerating && (
        <div className="p-3.5 bg-surface-2 border border-gold/60 space-y-3 animate-fade-in-soft">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-mono text-gold font-semibold flex items-center gap-1.5">
              <Sparkles className="size-3" /> {activeProposal.actionName}
            </span>
            <span className="text-[9px] font-mono bg-gold/10 text-gold border border-gold/30 px-1.5 py-0.5">
              READY TO APPLY
            </span>
          </div>

          {activeProposal.eyebrow && (
            <div>
              <span className="text-[9px] font-mono uppercase text-muted-foreground block">
                Eyebrow
              </span>
              <p className="text-xs font-mono text-gold mt-0.5">{activeProposal.eyebrow}</p>
            </div>
          )}

          {activeProposal.headline && (
            <div>
              <span className="text-[9px] font-mono uppercase text-muted-foreground block">
                Headline (H1 / Title)
              </span>
              <p className="text-sm font-display font-medium text-foreground mt-0.5">
                {activeProposal.headline}
              </p>
            </div>
          )}

          {activeProposal.subheadline && (
            <div>
              <span className="text-[9px] font-mono uppercase text-muted-foreground block">
                Subheadline / Narrative
              </span>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                {activeProposal.subheadline}
              </p>
            </div>
          )}

          {activeProposal.ctaText && (
            <div>
              <span className="text-[9px] font-mono uppercase text-muted-foreground block">
                Call to Action
              </span>
              <p className="text-xs font-mono text-emerald-400 mt-0.5">
                {activeProposal.ctaText} → {activeProposal.ctaLink || "/"}
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>Tone: {activeProposal.tone}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleApply}
              className="py-1.5 bg-gold text-background text-xs font-mono uppercase font-semibold hover:bg-white transition-colors flex items-center justify-center gap-1"
            >
              <Check className="size-3" /> Apply to Block
            </button>
            <button
              type="button"
              onClick={() => setActiveProposal(null)}
              className="py-1.5 bg-surface border border-border hover:bg-surface-2 text-xs font-mono text-muted-foreground transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
