import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  Wand2,
  Copy,
  Save,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  Tag,
  Search,
  ShieldCheck,
  Package,
  HeartHandshake,
  Check,
} from "lucide-react";
import { DESIGNS, PRODUCT_TYPES } from "@/lib/catalog";
import { toast } from "sonner";

export function AIProductAssistant() {
  const [selectedDesign, setSelectedDesign] = useState(DESIGNS[0]);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_TYPES[0]);
  const [activeTab, setActiveTab] = useState<"desc" | "seo" | "tags" | "care" | "highlights">(
    "desc",
  );

  const [tone, setTone] = useState("European Minimalist");
  const [targetAudience, setTargetAudience] = useState(
    "Contemporary Art Enthusiasts & Minimalists",
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic state for generated output
  const [generatedData, setGeneratedData] = useState({
    desc: `Imbued with the restrained aesthetic of the '${selectedDesign.name}' motif, this ${selectedProduct.name} embodies contemporary European minimalism. Tailored from 240gsm combed organic ring-spun cotton, each garment is made to order to eliminate textile overproduction. High-density water-based archival inks ensure razor-sharp graphic resolution while maintaining a supple, breathable handfeel that softens gracefully with wear.`,
    seoTitle: `${selectedDesign.name} ${selectedProduct.name} | Organic Heavyweight Atelier Edition | Studio Noir`,
    seoMeta: `Shop the made-to-order ${selectedDesign.name} ${selectedProduct.name}. Crafted from organic heavyweight textile in our London atelier with archival water-based inks. Worldwide carbon-neutral shipping.`,
    tags: [
      "sustainable-streetwear",
      "heavyweight-cotton",
      "archival-print",
      "zero-waste",
      "made-to-order",
      "minimalist-art",
      "unisex-fit",
    ],
    careInstructions: [
      "Machine wash inside out in cold water (30°C / 85°F) with mild eco-detergent.",
      "Hang dry naturally away from direct sunlight to preserve archival pigment depth.",
      "Do not tumble dry. If necessary, iron on reverse side on low heat.",
      "Avoid fabric softeners and bleaching agents.",
    ],
    highlights: [
      "Custom 100% GOTS-Certified Combed Organic Cotton (240gsm)",
      "High-Density Waterless Archival Direct-to-Garment Print",
      "Seamless Tubular Body Construction with Reinforced Double-Stitch Collar",
      "Individually Numbered Atelier Edition with NFC Authentication Tag",
    ],
  });

  const handleGenerate = (tabKey: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      if (tabKey === "desc") {
        setGeneratedData((prev) => ({
          ...prev,
          desc: `Crafted as a tactile tribute to ${selectedDesign.name}, this ${selectedProduct.name} merges architectural proportions with everyday comfort. Engineered in bespoke ${selectedProduct.description}, the piece balances a boxy silhouette with refined drop-shoulder drape. Printed on-demand across our zero-waste European studio network.`,
        }));
      } else if (tabKey === "seo") {
        setGeneratedData((prev) => ({
          ...prev,
          seoTitle: `${selectedDesign.name} Luxury ${selectedProduct.name} - Studio Noir Editorial`,
          seoMeta: `Discover the ${selectedDesign.name} ${selectedProduct.name}. Sustainable print-on-demand streetwear with certified organic yarn. Free EU & UK returns.`,
        }));
      } else if (tabKey === "tags") {
        setGeneratedData((prev) => ({
          ...prev,
          tags: [
            "atelier-exclusive",
            "bauhaus-aesthetic",
            "gots-certified",
            "dtg-art-print",
            "limited-capsule",
            "darkroom-edition",
          ],
        }));
      }
      toast.success("AI Studio Synthesized New Content", {
        description: `Generated for ${selectedDesign.name} in ${tone} tone.`,
      });
    }, 700);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI Product Assistant
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Synthesize editorial product narratives, high-intent SEO metadata, tags, and garment
            care instructions calibrated to your artwork and blanks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gold border border-gold/30 bg-gold/10 px-3 py-1.5">
            Model: Gemini 1.5 Pro
          </span>
        </div>
      </div>

      {/* 3-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1: LEFT - PRODUCT & GENERATION PARAMETERS (3 Cols) */}
        <div className="lg:col-span-3 p-5 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Target Entity
            </h3>
            <Package className="size-4 text-gold" />
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1.5">
              Select Artwork Design
            </label>
            <select
              value={selectedDesign.slug}
              onChange={(e) => {
                const d = DESIGNS.find((item) => item.slug === e.target.value);
                if (d) setSelectedDesign(d);
              }}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            >
              {DESIGNS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} ({d.style})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1.5">
              Select Blank Silhouette
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const p = PRODUCT_TYPES.find((item) => item.id === e.target.value);
                if (p) setSelectedProduct(p);
              }}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            >
              {PRODUCT_TYPES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-border space-y-3">
            <h4 className="text-[11px] font-mono uppercase text-gold">Generation Calibration</h4>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                Editorial Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="European Minimalist">
                  European Minimalist (Clean, Understated)
                </option>
                <option value="Haute Couture">Haute Couture (Poetic, Exclusive)</option>
                <option value="Brutalist Technical">
                  Brutalist Technical (Specs, GSM, Fibers)
                </option>
                <option value="Modern Urban">Modern Urban (Punchy, Direct)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                Target Persona
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="p-3 bg-surface-2 border border-border text-[11px] font-mono text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>GSM / Fabric:</span>
              <span className="text-foreground">240-400 gsm</span>
            </div>
            <div className="flex justify-between">
              <span>Print Tech:</span>
              <span className="text-foreground">Kornit HD DTG</span>
            </div>
            <div className="flex justify-between">
              <span>Color Profile:</span>
              <span className="text-foreground">sRGB v4</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: CENTER - AI GENERATION WORKSPACE (5 Cols) */}
        <div className="lg:col-span-5 p-5 bg-surface border border-border space-y-4">
          {/* Action Tabs */}
          <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-1">
            {[
              { id: "desc", label: "Description", icon: Wand2 },
              { id: "seo", label: "SEO Metadata", icon: Search },
              { id: "tags", label: "Tags", icon: Tag },
              { id: "care", label: "Care Guide", icon: HeartHandshake },
              { id: "highlights", label: "Highlights", icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id as "desc" | "seo" | "tags" | "care" | "highlights")
                  }
                  className={`px-3 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-gold text-gold font-bold bg-surface-2"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[280px] p-4 bg-surface-2 border border-border text-xs text-foreground font-sans relative">
            {isGenerating && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 z-20">
                <RefreshCw className="size-5 text-gold animate-spin" />
                <span className="text-xs font-mono text-gold uppercase tracking-widest">
                  Synthesizing with Gemini Pro...
                </span>
              </div>
            )}

            {activeTab === "desc" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>EDITORIAL NARRATIVE ({generatedData.desc.split(" ").length} words)</span>
                  <span className="text-gold">Tone: {tone}</span>
                </div>
                <textarea
                  rows={8}
                  value={generatedData.desc}
                  onChange={(e) => setGeneratedData({ ...generatedData, desc: e.target.value })}
                  className="w-full bg-transparent border-0 text-xs text-foreground focus:outline-none leading-relaxed resize-none"
                />
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-3 font-mono">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">
                    Meta Title (Optimal 50-60 chars)
                  </span>
                  <input
                    type="text"
                    value={generatedData.seoTitle}
                    onChange={(e) =>
                      setGeneratedData({ ...generatedData, seoTitle: e.target.value })
                    }
                    className="w-full p-2 bg-background border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">
                    Meta Description (Optimal 150-160 chars)
                  </span>
                  <textarea
                    rows={4}
                    value={generatedData.seoMeta}
                    onChange={(e) =>
                      setGeneratedData({ ...generatedData, seoMeta: e.target.value })
                    }
                    className="w-full p-2 bg-background border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            )}

            {activeTab === "tags" && (
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                  Generated Catalog Semantic Tags ({generatedData.tags.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {generatedData.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-background border border-border text-xs font-mono text-gold flex items-center gap-1"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                  Garment Longevity & Wash Protocol
                </span>
                <ul className="space-y-2 list-disc pl-4 text-xs text-muted-foreground">
                  {generatedData.careInstructions.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "highlights" && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                  Curated Bullet Highlights
                </span>
                <ul className="space-y-2">
                  {generatedData.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="size-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-2 border-t border-border flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleGenerate(activeTab)}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gold text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                <Sparkles className="size-3.5" />
                {isGenerating ? "Synthesizing..." : "Regenerate"}
              </button>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    activeTab === "desc"
                      ? generatedData.desc
                      : activeTab === "seo"
                        ? `${generatedData.seoTitle}\n${generatedData.seoMeta}`
                        : generatedData.tags.join(", "),
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-2 border border-border text-xs font-mono uppercase text-foreground hover:border-gold transition-colors"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                Copy
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toast.success("Draft saved to Staging database")}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-2 border border-border text-xs font-mono uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <Save className="size-3.5" />
                Save Draft
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.success("Approved and synced to Live Storefront catalog!", {
                    description: `Updated ${selectedDesign.name} ${selectedProduct.name}`,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
              >
                <CheckCircle2 className="size-3.5" />
                Approve & Sync
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT - GENERATED RESULT PREVIEW & LIVE STOREFRONT MOCKUP (4 Cols) */}
        <div className="lg:col-span-4 p-5 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Storefront Preview
            </h3>
            <Eye className="size-4 text-gold" />
          </div>

          {/* Visual Artwork on Blank Mockup Box */}
          <div className="aspect-square w-full bg-black border border-border flex items-center justify-center p-6 relative overflow-hidden group">
            <div className="relative size-44 sm:size-52 bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
              <img
                src={selectedDesign.art}
                alt={selectedDesign.name}
                className="size-32 object-contain filter drop-shadow-md"
              />
              <span className="absolute bottom-2 text-[10px] uppercase font-mono text-zinc-400">
                {selectedProduct.name}
              </span>
            </div>
            <div className="absolute top-2 left-2 text-[10px] font-mono text-gold bg-black/80 px-2 py-0.5 border border-gold/30">
              MOCKUP: 300 DPI
            </div>
          </div>

          {/* Storefront Mini-Card representation */}
          <div className="p-3 bg-surface-2 border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground font-display uppercase">
                {selectedDesign.name}
              </span>
              <span className="text-xs font-mono text-gold font-bold">$98.00</span>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-3 leading-relaxed">
              {generatedData.desc}
            </p>
            <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Category: {selectedProduct.name}</span>
              <span className="text-emerald-400">100% GOTS Cotton</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
