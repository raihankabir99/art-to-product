import React, { useState } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Zap,
  Globe,
  Sliders,
  Code2,
  FileCheck,
} from "lucide-react";
import { SEO_CHECK_ITEMS } from "./ai-mock-data";
import { toast } from "sonner";

export function AISEOWorkspace() {
  const [selectedTarget, setSelectedTarget] = useState("Product: Midnight Lion Hoodie (#PD-8821)");
  const [seoScore, setSeoScore] = useState(92);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isApplyingFix, setIsApplyingFix] = useState(false);

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setSeoScore(94);
      toast.success("AI SEO Deep Audit Completed", {
        description: "Vector crawler analyzed structured data & keyword distribution.",
      });
    }, 800);
  };

  const handleApplyFix = (fixTitle: string) => {
    setIsApplyingFix(true);
    setTimeout(() => {
      setIsApplyingFix(false);
      setSeoScore((prev) => Math.min(100, prev + 3));
      toast.success(`AI Applied Optimization: ${fixTitle}`);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Search className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI SEO & Structured Data Studio
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Continuous crawler emulation, keyword density optimization, and automated Schema.org
            JSON-LD generation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          >
            <option value="Product: Midnight Lion Hoodie (#PD-8821)">
              Product: Midnight Lion Hoodie (#PD-8821)
            </option>
            <option value="Page: Trust Center & Sustainability">
              Page: Trust Center & Sustainability
            </option>
            <option value="Blog: Geometry of Negative Space">
              Blog: Geometry of Negative Space
            </option>
            <option value="Collection: Minimalist Bauhaus Capsule">
              Collection: Minimalist Bauhaus Capsule
            </option>
          </select>

          <button
            type="button"
            onClick={handleAudit}
            disabled={isAuditing}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-gold text-background hover:bg-foreground hover:text-background font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            <RefreshCw className={`size-3.5 ${isAuditing ? "animate-spin" : ""}`} />
            {isAuditing ? "Auditing..." : "Re-Audit"}
          </button>
        </div>
      </div>

      {/* Main Scoreboard & Radial Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CINEMATIC RADIAL SCORE CARD (4 Cols) */}
        <div className="lg:col-span-4 p-6 bg-surface border border-border flex flex-col items-center justify-center text-center relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            ORGANIC SEARCH HEALTH SCORE
          </span>

          {/* Radial Visualization */}
          <div className="relative size-44 flex items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="6"
                className="text-surface-2"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - seoScore / 100)}
                strokeLinecap="square"
                className="text-gold transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-medium text-foreground tracking-tight">
                {seoScore}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">/ 100</span>
              <span className="text-[10px] font-mono text-emerald-400 mt-1 uppercase font-bold">
                EXCELLENT
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed px-4">
            Indexability status is primed for top Google & Bing organic real estate across UK & EU
            locales.
          </p>

          <div className="w-full pt-4 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>Crawl Rate: 100%</span>
            <span className="text-emerald-400">0 Critical Errors</span>
          </div>
        </div>

        {/* DETAILED FACTOR BREAKDOWN & METRICS (8 Cols) */}
        <div className="lg:col-span-8 p-6 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Algorithmic Quality Factors
            </h3>
            <span className="text-[10px] font-mono text-gold uppercase">
              Target Locale: Global (en-GB, en-US, de-DE)
            </span>
          </div>

          <div className="space-y-3">
            {SEO_CHECK_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-surface-2 border border-border hover:border-gold/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {item.status === "pass" ? (
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="size-4 text-amber-400 shrink-0" />
                    )}
                    <h4 className="text-xs font-semibold text-foreground tracking-wider font-display uppercase">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">{item.detail}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto pl-6 sm:pl-0">
                  <span className="text-xs font-mono font-bold text-foreground">{item.score}%</span>
                  {item.status === "warning" && (
                    <button
                      type="button"
                      onClick={() => handleApplyFix(item.name)}
                      disabled={isApplyingFix}
                      className="px-2.5 py-1 bg-gold text-background text-[10px] font-mono uppercase font-bold hover:bg-foreground hover:text-background transition-colors"
                    >
                      Auto-Fix
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Improvements & Structured Data Schema Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Improvements */}
        <div className="p-6 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-gold" />
              AI Recommended Improvements
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">3 Action Items</span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Expand Meta Description Call-to-Action",
                impact: "+8% Projected CTR",
                desc: "Current snippet lacks explicit on-demand sustainability statement. Inject 'Crafted in London on-demand'.",
              },
              {
                title: "Add Internal Product Cross-Link",
                impact: "PageRank Flow",
                desc: "Link anchor text 'Archival Duck Canvas' directly to the Canvas Tote bag product page.",
              },
              {
                title: "Inject Localized BreadcrumbList Schema",
                impact: "Rich Snippets",
                desc: "Ensure category navigation path `Shop > Hoodies > Midnight Lion` is serialized in JSON-LD.",
              },
            ].map((rec, idx) => (
              <div key={idx} className="p-3.5 bg-surface-2 border border-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground font-display uppercase">
                    {rec.title}
                  </span>
                  <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
                    {rec.impact}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Schema.org JSON-LD Code Box */}
        <div className="p-6 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground flex items-center gap-2">
              <Code2 className="size-4 text-gold" />
              Live JSON-LD Structured Data Schema
            </h3>
            <button
              type="button"
              onClick={() => toast.success("JSON-LD payload copied to clipboard")}
              className="text-xs font-mono text-gold hover:underline"
            >
              Copy Schema
            </button>
          </div>

          <div className="p-4 bg-background border border-border text-[11px] font-mono text-muted-foreground overflow-x-auto max-h-[220px] leading-relaxed">
            <pre className="text-zinc-300">
              {`{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Midnight Lion Heavyweight Hoodie",
  "image": [
    "https://studio-noir.art/assets/mockups/midnight-lion-hoodie.jpg"
  ],
  "description": "400gsm combed organic cotton atelier streetwear hoodie with archival water-based print.",
  "sku": "SN-HD-001",
  "brand": {
    "@type": "Brand",
    "name": "Studio Noir Atelier"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://studio-noir.art/product/midnight-lion-hoodie",
    "priceCurrency": "USD",
    "price": "98.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "142"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
