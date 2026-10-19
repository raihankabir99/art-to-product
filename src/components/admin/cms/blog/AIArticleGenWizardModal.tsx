import React, { useState } from "react";
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Languages,
  Sliders,
  Users,
  Feather,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { AIArticleGenConfig, ArticleItem, ArticleBlock } from "./blog-types";
import { INITIAL_CATEGORIES } from "./blog-initial-data";

interface AIArticleGenWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleGenerated: (article: Partial<ArticleItem>) => void;
}

export function AIArticleGenWizardModal({
  isOpen,
  onClose,
  onArticleGenerated,
}: AIArticleGenWizardModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [config, setConfig] = useState<AIArticleGenConfig>({
    topic: "Minimalist fashion trends and brutalist typography in Berlin ateliers",
    audience: "European design purists and fashion-conscious minimalists",
    tone: "Premium / Editorial",
    length: "Medium (~1,000 words)",
    language: "English",
    includeProductEmbeds: true,
    category: "Design",
  });

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      // Generate structured blocks
      const generatedBlocks: ArticleBlock[] = [
        {
          id: `blk_gen_${Date.now()}_1`,
          type: "paragraph",
          content: `In an era saturated with seasonal hyper-production, a deliberate counter-movement is taking hold across European design capitals. Grounded in the stark geometries of brutalist architecture and the quiet permanence of heavyweight natural textiles, this new design paradigm prioritizes form, material honesty, and typographic discipline.`,
        },
        {
          id: `blk_gen_${Date.now()}_2`,
          type: "heading",
          content: "The Architecture of Restraint",
          settings: { level: 2 },
        },
        {
          id: `blk_gen_${Date.now()}_3`,
          type: "paragraph",
          content: `When color palettes are restricted to obsidian, bone, and raw ecru, the tactile reality of the garment becomes the primary expressive canvas. At 240gsm to 400gsm, combed organic cotton ceases to be merely fabric—it functions as a tailored structural framework that retains its poise throughout relentless wear.`,
        },
        {
          id: `blk_gen_${Date.now()}_4`,
          type: "quote",
          content: `True luxury in the modern age is not about conspicuous branding; it is the silent conviction of exceptional weight and impeccable vector alignment.`,
          settings: {
            quoteAuthor: "Editorial Studio",
            quoteRole: "Design Direction",
          },
        },
        {
          id: `blk_gen_${Date.now()}_5`,
          type: "image",
          content:
            "Minimalist studio composition showcasing organic cotton garments and architectural lines",
          settings: {
            imageUrl:
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
            imageCaption:
              "Studio Noir Nocturne Capsule — Precision screen print with zero deadstock manufacturing.",
            aspectRatio: "16/9",
          },
        },
        {
          id: `blk_gen_${Date.now()}_6`,
          type: "heading",
          content: "Featured Silhouette: The Heavyweight Foundation",
          settings: { level: 3 },
        },
      ];

      if (config.includeProductEmbeds) {
        generatedBlocks.push({
          id: `blk_gen_${Date.now()}_7`,
          type: "product",
          content: "Featured print-on-demand garment recommendation",
          settings: {
            productId: "tshirt",
            productTitle: "Midnight Lion Heavyweight T-Shirt",
            productCategory: "240gsm Organic Combed Cotton",
            productPrice: "€49.00",
            productImage:
              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
            productDesign: "Midnight Lion",
            productBadge: "Bestseller",
          },
        });
      }

      generatedBlocks.push({
        id: `blk_gen_${Date.now()}_8`,
        type: "cta",
        content: "Join the Collector Dispatch",
        settings: {
          ctaTitle: "RECEIVE CURATED ESSAYS & CAPSULE ACCESS",
          ctaSubtitle: "Strictly limited print runs. Delivered directly to your inbox.",
          ctaButtonText: "SUBSCRIBE TO DISPATCH",
          ctaButtonUrl: "#newsletter",
          ctaStyle: "gold",
        },
      });

      const slugifiedTitle = config.topic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const generatedArticle: Partial<ArticleItem> = {
        title: config.topic.charAt(0).toUpperCase() + config.topic.slice(1),
        slug: slugifiedTitle || `article-${Date.now()}`,
        excerpt: `An editorial exploration into ${config.topic.toLowerCase()}, exploring textile weight, typographic geometry, and sustainable craft for ${config.audience.toLowerCase()}.`,
        category: config.category,
        featuredImage:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
        featuredImageAlt: config.topic,
        author: "Creative Studio",
        authorRole: "Editorial Direction",
        status: "draft",
        readTime: config.length.includes("Short")
          ? "3 min read"
          : config.length.includes("Long")
            ? "8 min read"
            : "5 min read",
        language: config.language,
        tags: ["Minimalism", "Streetwear", "Design", "Editorial AI"],
        seo: {
          seoTitle: `${config.topic} | Studio Noir Journal`,
          metaDescription: `Discover the design philosophy behind ${config.topic.toLowerCase()} curated for ${config.audience.toLowerCase()}.`,
          urlSlug: slugifiedTitle || `article-${Date.now()}`,
          canonicalUrl: `https://studionoir.fashion/journal/${slugifiedTitle}`,
          ogTitle: config.topic,
          ogDescription: `An editorial deep dive into ${config.topic.toLowerCase()}.`,
          ogImage:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
          keywords: ["minimal fashion", "studio noir journal", "sustainable apparel"],
          robotsIndex: true,
          robotsFollow: true,
        },
        blocks: generatedBlocks,
      };

      onArticleGenerated(generatedArticle);
      toast.success("AI Editorial Draft Generated!", {
        description:
          "Draft created with structured blocks and SEO metadata. Please review before publishing.",
      });
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-soft"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface border border-border-strong shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/60">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-none bg-gold/10 border border-gold/40 flex items-center justify-center">
              <Sparkles className="size-4 text-gold" />
            </div>
            <div>
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
                AI Article Generation Wizard
                <span className="text-[9px] font-mono px-2 py-0.5 bg-gold/20 text-gold border border-gold/40">
                  ENTERPRISE GEN-AI
                </span>
              </h3>
              <p className="text-[11px] text-muted-foreground">
                6-step guided editorial assistant. Generates structured magazine blocks & SEO
                metadata.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-6 border-b border-border text-[10px] font-mono uppercase bg-surface-2/30">
          {[
            { n: 1, label: "Topic" },
            { n: 2, label: "Audience" },
            { n: 3, label: "Tone" },
            { n: 4, label: "Length" },
            { n: 5, label: "Language" },
            { n: 6, label: "Review" },
          ].map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStep(s.n)}
              className={`py-2 px-1 text-center transition-colors border-r border-border last:border-r-0 ${
                step === s.n
                  ? "bg-gold/15 text-gold font-bold border-b-2 border-b-gold"
                  : step > s.n
                    ? "text-foreground bg-surface-2/50"
                    : "text-muted-foreground opacity-60"
              }`}
            >
              <span className="mr-1">{s.n}.</span> {s.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 min-h-[320px] flex flex-col justify-between">
          {/* STEP 1: TOPIC */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in-soft">
              <div className="flex items-center gap-2 text-gold">
                <Feather className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Step 1 — Topic & Concept
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                What central theme, silhouette, cultural movement, or fabric innovation do you wish
                to explore?
              </p>

              <div className="space-y-3">
                <label className="text-xs font-mono text-foreground block uppercase">
                  Article Subject / Working Title
                </label>
                <input
                  type="text"
                  value={config.topic}
                  onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                  placeholder="e.g. How Minimal Design Is Changing Modern Streetwear"
                  className="w-full px-3 py-2.5 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-muted-foreground block mb-1 uppercase">
                      Pillar Category
                    </label>
                    <select
                      value={config.category}
                      onChange={(e) => setConfig({ ...config, category: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                    >
                      {INITIAL_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-muted-foreground block mb-1 uppercase">
                      Quick Topic Inspiration
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Zero-Waste POD Luxury",
                        "240gsm vs 400gsm Cotton",
                        "Berlin Street Typography",
                      ].map((idea) => (
                        <button
                          key={idea}
                          type="button"
                          onClick={() => setConfig({ ...config, topic: idea })}
                          className="text-[10px] font-mono px-2 py-1 bg-surface-2 hover:bg-gold/10 hover:text-gold border border-border text-muted-foreground transition-colors"
                        >
                          + {idea}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AUDIENCE */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in-soft">
              <div className="flex items-center gap-2 text-gold">
                <Users className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Step 2 — Target Audience
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Calibrate the vocabulary, contextual depth, and reference points to match your core
                demographic.
              </p>

              <div className="space-y-3">
                <label className="text-xs font-mono text-foreground block uppercase">
                  Target Reader Profile
                </label>
                <input
                  type="text"
                  value={config.audience}
                  onChange={(e) => setConfig({ ...config, audience: e.target.value })}
                  placeholder="e.g. European fashion-conscious customers & minimal design collectors"
                  className="w-full px-3 py-2.5 bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                />

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[
                    {
                      title: "Design Purists & Architects",
                      desc: "Values minimalism, vector craft & spatial balance",
                    },
                    {
                      title: "Sustainable Fashion Collectors",
                      desc: "Focused on organic certifications & zero deadstock",
                    },
                    {
                      title: "Streetwear Enthusiasts",
                      desc: "Prioritizes boxy cuts, heavy GSM & drop culture",
                    },
                    {
                      title: "Luxury Gift Shoppers",
                      desc: "Seeking bespoke packaging & heirloom durability",
                    },
                  ].map((aud) => (
                    <button
                      key={aud.title}
                      type="button"
                      onClick={() => setConfig({ ...config, audience: aud.title })}
                      className={`p-3 text-left border transition-all ${
                        config.audience.includes(aud.title)
                          ? "bg-gold/10 border-gold text-foreground"
                          : "bg-surface-2/60 border-border hover:border-gold/40 text-muted-foreground"
                      }`}
                    >
                      <p className="text-xs font-medium text-foreground">{aud.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{aud.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TONE */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in-soft">
              <div className="flex items-center gap-2 text-gold">
                <Sliders className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Step 3 — Editorial Voice & Tone
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Select the stylistic persona for the article syntax and vocabulary.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    tone: "Premium / Editorial",
                    desc: "Literary, poised, understated luxury. Resembles high-end European periodicals.",
                  },
                  {
                    tone: "Architectural / Minimal",
                    desc: "Crisp, analytical, sharp. Focuses on structural lines and geometric restraint.",
                  },
                  {
                    tone: "Warm & Informative",
                    desc: "Approachable, educational, transparent guide to fabrics and care.",
                  },
                  {
                    tone: "Underground Luxury",
                    desc: "Subcultural, bold, raw energy inspired by Berlin and London creative hubs.",
                  },
                ].map((t) => (
                  <button
                    key={t.tone}
                    type="button"
                    onClick={() =>
                      setConfig({ ...config, tone: t.tone as AIArticleGenConfig["tone"] })
                    }
                    className={`p-3.5 text-left border transition-all ${
                      config.tone === t.tone
                        ? "bg-gold/10 border-gold text-foreground ring-1 ring-gold"
                        : "bg-surface-2/60 border-border hover:border-gold/40 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                        {t.tone}
                      </span>
                      {config.tone === t.tone && <CheckCircle2 className="size-3.5 text-gold" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: LENGTH & COMMERCE INTEGRATION */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in-soft">
              <div className="flex items-center gap-2 text-gold">
                <FileText className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Step 4 — Article Length & Features
                </span>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono text-foreground block uppercase">
                  Target Word Count & Reading Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Short (~500 words)",
                      duration: "3 min read",
                      sub: "Quick Trend / Drop Summary",
                    },
                    {
                      label: "Medium (~1,000 words)",
                      duration: "5 min read",
                      sub: "Standard Editorial Essay",
                    },
                    {
                      label: "Long-Form (~1,800 words)",
                      duration: "8 min read",
                      sub: "Comprehensive Deep-Dive",
                    },
                  ].map((l) => (
                    <button
                      key={l.label}
                      type="button"
                      onClick={() =>
                        setConfig({ ...config, length: l.label as AIArticleGenConfig["length"] })
                      }
                      className={`p-3 text-left border transition-all ${
                        config.length === l.label
                          ? "bg-gold/10 border-gold text-foreground ring-1 ring-gold"
                          : "bg-surface-2/60 border-border hover:border-gold/40 text-muted-foreground"
                      }`}
                    >
                      <p className="text-xs font-semibold text-foreground">{l.label}</p>
                      <p className="text-[10px] font-mono text-gold mt-0.5">{l.duration}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{l.sub}</p>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-border">
                  <label className="flex items-center justify-between p-3 bg-surface-2 border border-border cursor-pointer hover:border-gold/50">
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="size-4 text-gold" />
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          Embed Print-On-Demand Product Cards
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Automatically integrate relevant shop silhouettes (T-Shirts, Hoodies,
                          Posters) to drive conversion.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.includeProductEmbeds}
                      onChange={(e) =>
                        setConfig({ ...config, includeProductEmbeds: e.target.checked })
                      }
                      className="size-4 accent-gold"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: LANGUAGE */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in-soft">
              <div className="flex items-center gap-2 text-gold">
                <Languages className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Step 5 — Target Language
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Internationalized generation with native typographic conventions.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { code: "en", name: "English", region: "International / UK / US" },
                  { code: "de", name: "Deutsch", region: "Berlin / DACH Region" },
                  { code: "fr", name: "Français", region: "Paris / Luxury Editorial" },
                  { code: "ar", name: "العربية (Arabic)", region: "Gulf / RTL Mode Ready" },
                  { code: "es", name: "Español", region: "Madrid / LatAm" },
                  { code: "it", name: "Italiano", region: "Milan / Atelier Fashion" },
                ].map((lang) => (
                  <button
                    key={lang.name}
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        language: lang.name as AIArticleGenConfig["language"],
                      })
                    }
                    className={`p-3 text-left border transition-all ${
                      config.language === lang.name
                        ? "bg-gold/10 border-gold text-foreground ring-1 ring-gold"
                        : "bg-surface-2/60 border-border hover:border-gold/40 text-muted-foreground"
                    }`}
                  >
                    <p className="text-xs font-semibold text-foreground">{lang.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{lang.region}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & GENERATE */}
          {step === 6 && (
            <div className="space-y-4 animate-fade-in-soft">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="size-4" />
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Step 6 — Configuration Summary
                </span>
              </div>

              <div className="p-4 bg-surface-2 border border-border space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground uppercase font-mono text-[10px]">
                    Topic
                  </span>
                  <span className="text-foreground font-medium text-right max-w-xs truncate">
                    {config.topic}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground uppercase font-mono text-[10px]">
                    Category & Audience
                  </span>
                  <span className="text-foreground">
                    {config.category} • {config.audience}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground uppercase font-mono text-[10px]">
                    Voice & Length
                  </span>
                  <span className="text-foreground">
                    {config.tone} • {config.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground uppercase font-mono text-[10px]">
                    Language
                  </span>
                  <span className="text-gold font-mono">{config.language}</span>
                </div>
              </div>

              {/* Critical Policy Banner */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                <AlertCircle className="size-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-300">Human-In-The-Loop Editorial Policy</p>
                  <p className="text-[11px] text-amber-200/80 mt-0.5">
                    AI output is delivered strictly as a staged draft requiring human editorial
                    review, fact-checking, and styling before publication.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-5 border-t border-border mt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={isGenerating}
                className="px-4 py-2 border border-border text-xs uppercase font-mono tracking-wider text-muted-foreground hover:text-foreground hover:border-gold/50 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 bg-foreground text-background text-xs uppercase font-mono tracking-wider font-semibold hover:bg-gold hover:text-background flex items-center gap-1.5 transition-colors"
              >
                Next Step <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-2.5 bg-gold text-background text-xs uppercase font-mono tracking-wider font-bold hover:bg-foreground hover:text-background flex items-center gap-2 transition-all shadow-lg disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Synthesizing Editorial Draft...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Generate Article Draft
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
