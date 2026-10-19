import { useState } from "react";
import { Globe, Share2, Search as SearchIcon, Eye, CheckCircle2, ShieldAlert } from "lucide-react";
import type { PageSEO } from "../pages-types";

interface PageSEOPanelProps {
  seo: PageSEO;
  onChange: (updatedSeo: PageSEO) => void;
}

export function PageSEOPanel({ seo, onChange }: PageSEOPanelProps) {
  const [previewTab, setPreviewTab] = useState<"google" | "social">("google");

  const handleField = (key: keyof PageSEO, val: string | boolean) => {
    onChange({ ...seo, [key]: val });
  };

  const titleLength = seo.seoTitle.length;
  const descLength = seo.metaDescription.length;

  return (
    <div className="space-y-6 animate-fade-in-soft">
      <div className="p-4 bg-surface-2/40 border border-border flex items-center justify-between">
        <div>
          <h4 className="text-sm font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
            <Globe className="size-4 text-gold" /> Search Engine & OpenGraph Optimization
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure indexing, canonical routes, and social media rich previews.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              SEO Title Tag
            </label>
            <span
              className={`text-[10px] font-mono ${
                titleLength >= 50 && titleLength <= 60
                  ? "text-emerald-400"
                  : titleLength > 60
                    ? "text-amber-400"
                    : "text-muted-foreground"
              }`}
            >
              {titleLength} / 60 chars
            </span>
          </div>
          <input
            type="text"
            value={seo.seoTitle}
            onChange={(e) => handleField("seoTitle", e.target.value)}
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Meta Description
            </label>
            <span
              className={`text-[10px] font-mono ${
                descLength >= 120 && descLength <= 160
                  ? "text-emerald-400"
                  : descLength > 160
                    ? "text-amber-400"
                    : "text-muted-foreground"
              }`}
            >
              {descLength} / 160 chars
            </span>
          </div>
          <textarea
            value={seo.metaDescription}
            onChange={(e) => handleField("metaDescription", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
            Canonical URL
          </label>
          <input
            type="text"
            value={seo.canonicalUrl}
            onChange={(e) => handleField("canonicalUrl", e.target.value)}
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-gold focus:outline-none focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Social OG Title
            </label>
            <input
              type="text"
              value={seo.ogTitle}
              onChange={(e) => handleField("ogTitle", e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Social OG Image URL
            </label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => handleField("ogImage", e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
            Social OG Description
          </label>
          <input
            type="text"
            value={seo.ogDescription}
            onChange={(e) => handleField("ogDescription", e.target.value)}
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        {/* Robots Toggles */}
        <div className="p-4 bg-surface-2/40 border border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-foreground block">Indexing (Robots)</span>
              <span className="text-[11px] text-muted-foreground">
                Allow search engines to index this page
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleField("robotsIndex", !seo.robotsIndex)}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                seo.robotsIndex
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}
            >
              {seo.robotsIndex ? "INDEX" : "NOINDEX"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-foreground block">Link Following</span>
              <span className="text-[11px] text-muted-foreground">
                Follow links embedded in this page
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleField("robotsFollow", !seo.robotsFollow)}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                seo.robotsFollow
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}
            >
              {seo.robotsFollow ? "FOLLOW" : "NOFOLLOW"}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Search & Social Previews */}
      <div className="p-5 bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Eye className="size-4 text-gold" />
            <h5 className="text-xs font-mono uppercase tracking-wider text-foreground">
              Live SERP & Social Card Simulation
            </h5>
          </div>
          <div className="flex items-center gap-1 bg-surface-2 p-0.5 border border-border">
            <button
              type="button"
              onClick={() => setPreviewTab("google")}
              className={`px-2.5 py-1 text-[11px] font-mono transition-colors ${
                previewTab === "google"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Google Search
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab("social")}
              className={`px-2.5 py-1 text-[11px] font-mono transition-colors ${
                previewTab === "social"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Social Card
            </button>
          </div>
        </div>

        {previewTab === "google" && (
          <div className="p-4 bg-white text-black rounded font-sans space-y-1 shadow-inner">
            <div className="text-[12px] text-[#202124] flex items-center gap-1.5 font-normal">
              <span className="truncate">{seo.canonicalUrl || "https://studionoir.fashion"}</span>
            </div>
            <h3 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-normal leading-snug truncate">
              {seo.seoTitle || "Page Title | Studio Noir"}
            </h3>
            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
              {seo.metaDescription || "Enter meta description to preview snippet."}
            </p>
          </div>
        )}

        {previewTab === "social" && (
          <div className="max-w-md bg-black border border-border rounded overflow-hidden shadow-lg space-y-0">
            {seo.ogImage ? (
              <img src={seo.ogImage} alt="OG Preview" className="w-full h-44 object-cover" />
            ) : (
              <div className="w-full h-44 bg-surface-2 flex items-center justify-center text-xs text-muted-foreground font-mono">
                No OG Image Configured
              </div>
            )}
            <div className="p-3 bg-surface-2 border-t border-border space-y-1">
              <p className="text-[10px] uppercase font-mono text-muted-foreground">
                STUDIONOIR.FASHION
              </p>
              <p className="text-xs font-semibold text-foreground truncate">
                {seo.ogTitle || seo.seoTitle || "Studio Noir"}
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-2">
                {seo.ogDescription || seo.metaDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
