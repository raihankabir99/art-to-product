import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  RefreshCw,
  Edit3,
  Save,
  Send,
  CheckCircle2,
  Globe,
  Sliders,
  Search,
  HelpCircle,
  Tag,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export function AIBlogAssistant() {
  const [topic, setTopic] = useState("The Geometry of Negative Space in Modern Streetwear");
  const [targetAudience, setTargetAudience] = useState("Contemporary Designers & Art Collectors");
  const [tone, setTone] = useState("Luxury Editorial");
  const [language, setLanguage] = useState("English (US/UK)");
  const [keywords, setKeywords] = useState(
    "minimalism, bauhaus streetwear, heavyweight cotton, waterless DTG",
  );
  const [articleLength, setArticleLength] = useState("Editorial (~1,200 words)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Generated article state
  const [articleData, setArticleData] = useState({
    title: "The Geometry of Negative Space: How Restraint Defines Modern Streetwear",
    introduction:
      "Negative space is not the absence of thought; it is the discipline of knowing when to stop. In contemporary garment architecture, the unprinted void carries equal gravity to the graphic imprint. As mass-market fast fashion continues to saturate silhouettes with disposable maximalism, the discerning patron turns toward the quiet confidence of deliberate restraint.",
    headings: [
      {
        h2: "1. The Bauhaus Heritage in Contemporary Silhouettes",
        body: "Form follows function is more than a modernist slogan; it is the foundational philosophy of modern boxy streetwear. When a graphic artwork like our Midnight Lion motif is placed with millimeter precision against a 400gsm combed organic cotton canvas, the surrounding unprinted area acts as an architectural frame, guiding the eye toward subtle hand-screened details.",
      },
      {
        h2: "2. Zero-Waste Print-on-Demand as an Aesthetic Choice",
        body: "Historically, luxury was synonymous with artificial scarcity and warehouse overproduction. The modern atelier reimagines this equation. By utilizing high-density waterless direct-to-garment (DTG) print engineering, garments are realized only when called into existence by a collector—eliminating landfill deadstock while preserving pigment richness.",
      },
      {
        h2: "3. Tactile Longevity: Why Weight Matters",
        body: "A garment's longevity begins at the fiber level. Combed organic ring-spun cotton fibers are tightly twisted to create a structural French Terry weave that resists pilling and distortion over years of laundering.",
      },
    ],
    seoTitle: "The Geometry of Negative Space in Modern Streetwear | Studio Noir Journal",
    metaDescription:
      "Explore how architectural restraint, heavyweight organic cotton, and zero-waste DTG printing define the new standard of contemporary minimalist streetwear.",
    tags: [
      "negative-space",
      "bauhaus-design",
      "sustainable-fashion",
      "organic-cotton",
      "print-culture",
    ],
    faqs: [
      {
        q: "What makes 400gsm French Terry different from standard cotton hoodies?",
        a: "400gsm French Terry possesses higher structural density, retaining its boxy architectural drape without collapsing, while remaining breathable for year-round wear.",
      },
      {
        q: "How does waterless DTG printing reduce environmental footprint?",
        a: "Waterless pigment printing uses closed-loop ink delivery systems that consume 95% less water and produce zero chemical runoff compared to traditional rotary vat dyeing.",
      },
    ],
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setArticleData({
        title: `The Architecture of Longevity: Deconstructing ${topic}`,
        introduction: `In an era defined by ephemeral digital cycles, ${topic.toLowerCase()} represents a return to tactile permanence. Tailored for ${targetAudience.toLowerCase()}, this inquiry dissects the convergence of material craft and visual discipline.`,
        headings: [
          {
            h2: "1. Material Purity & The Modern Collector",
            body: "The contemporary wardrobe is no longer a receptacle for fast trends; it is a curated gallery of personal artifacts. When textiles are selected for tensile strength and ethical provenance, the garment transcends seasonal obsolescence.",
          },
          {
            h2: "2. Precision Pigment Dynamics",
            body: "Digital print-on-demand technology has matured from commercial novelty to fine-art precision. Utilizing 300 DPI micro-droplet deposition, artwork vector fidelity is rendered with absolute fidelity.",
          },
        ],
        seoTitle: `${topic} - In-Depth Analysis | Studio Noir Journal`,
        metaDescription: `Discover our comprehensive breakdown of ${topic.toLowerCase()}. An editorial inquiry for ${targetAudience.toLowerCase()}.`,
        tags: ["atelier-journal", "print-on-demand", "minimalism", "textile-engineering"],
        faqs: [
          {
            q: "How does Studio Noir ensure sustainable production?",
            a: "All items are crafted on-demand across European and UK regional print nodes to avoid overproduction waste.",
          },
        ],
      });
      toast.success("AI Blog Assistant Synthesized Article", {
        description: "Draft ready for editorial inspection.",
      });
    }, 1100);
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI Blog & Editorial Assistant
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Draft long-form culture essays, sustainable craftsmanship journals, and artist
            spotlights with automated SEO metadata and FAQ schemas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Human-in-the-Loop Gating Active
          </span>
        </div>
      </div>

      {/* Main Workspace: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input Configuration Parameters (4 Cols) */}
        <div className="lg:col-span-4 p-5 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Article Parameters
            </h3>
            <Sliders className="size-4 text-gold" />
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1.5">
              Topic / Thesis Statement
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                Tone & Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="Luxury Editorial">Luxury Editorial</option>
                <option value="European Minimalist">European Minimalist</option>
                <option value="Technical Craft">Technical Craft</option>
                <option value="Avant-Garde">Avant-Garde</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="English (US/UK)">English (US/UK)</option>
                <option value="German (DE)">German (DE)</option>
                <option value="French (FR)">French (FR)</option>
                <option value="Japanese (JA)">Japanese (JA)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1.5">
              Target Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1.5">
              Article Target Length
            </label>
            <select
              value={articleLength}
              onChange={(e) => setArticleLength(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="Concise (~600 words)">Concise (~600 words)</option>
              <option value="Editorial (~1,200 words)">Editorial (~1,200 words)</option>
              <option value="Deep Dive (~2,000 words)">Deep Dive (~2,000 words)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-gold text-background font-bold text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="size-4" />
            {isGenerating ? "Synthesizing Article..." : "GENERATE ARTICLE"}
          </button>
        </div>

        {/* RIGHT COLUMN: Generated Article Display (8 Cols) */}
        <div className="lg:col-span-8 p-6 bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-gold">Status: Staged Draft</span>
              <span className="text-xs text-muted-foreground">• {articleLength}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border transition-colors flex items-center gap-1 ${
                  isEditing
                    ? "bg-gold text-background border-gold font-bold"
                    : "bg-surface-2 text-foreground border-border hover:border-gold"
                }`}
              >
                <Edit3 className="size-3.5" />
                {isEditing ? "Done Editing" : "Edit Copy"}
              </button>
            </div>
          </div>

          {/* Article Display Area */}
          <div className="space-y-6 bg-surface-2 p-6 border border-border">
            {/* Title */}
            <div>
              <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                Article Headline
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={articleData.title}
                  onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                  className="w-full p-2 bg-background border border-border text-base font-display text-foreground"
                />
              ) : (
                <h1 className="text-xl font-display font-medium text-foreground tracking-wide leading-snug">
                  {articleData.title}
                </h1>
              )}
            </div>

            {/* Introduction */}
            <div className="border-l-2 border-gold pl-4 py-1">
              <span className="text-[10px] font-mono uppercase text-gold block mb-1">
                Introduction Lead
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={articleData.introduction}
                  onChange={(e) => setArticleData({ ...articleData, introduction: e.target.value })}
                  className="w-full p-2 bg-background border border-border text-xs text-foreground"
                />
              ) : (
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  {articleData.introduction}
                </p>
              )}
            </div>

            {/* Headings & Body */}
            <div className="space-y-4 pt-2">
              {articleData.headings.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h2 className="text-sm font-semibold font-display uppercase tracking-wider text-foreground">
                    {item.h2}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* SEO Meta Box */}
            <div className="p-4 bg-background border border-border space-y-2 font-mono text-xs">
              <span className="text-[10px] uppercase text-gold flex items-center gap-1.5">
                <Search className="size-3" /> SEO META PAYLOAD
              </span>
              <p className="text-foreground font-semibold">{articleData.seoTitle}</p>
              <p className="text-muted-foreground text-[11px]">{articleData.metaDescription}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {articleData.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 bg-surface-2 border border-border text-gold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ Accordion Preview */}
            <div className="p-4 bg-background border border-border space-y-3">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1.5">
                <HelpCircle className="size-3 text-gold" /> SYNTHESIZED ARTICLE FAQS (SCHEMA READY)
              </span>
              {articleData.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <p className="font-semibold text-foreground">Q: {faq.q}</p>
                  <p className="text-muted-foreground leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-3.5 py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="size-3.5" />
                Regenerate
              </button>

              <button
                type="button"
                onClick={() => toast.success("Draft saved to CMS Blog Library")}
                className="px-3.5 py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <Save className="size-3.5" />
                Save Draft
              </button>
            </div>

            {/* Strict Notice: Do NOT auto-publish */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-mono text-muted-foreground block">
                  DO NOT AUTO-PUBLISH
                </span>
                <span className="text-[10px] font-mono text-gold">Requires Human Sign-off</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.success("Article Draft Routed to AI Approval Center", {
                    description: "Senior editor notification dispatched for review.",
                  })
                }
                className="px-4 py-2 bg-gold text-background hover:bg-foreground hover:text-background font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Send className="size-3.5" />
                Send to Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
