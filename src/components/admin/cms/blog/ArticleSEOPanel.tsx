import { useState } from "react";
import {
  Search,
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Shield,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { ArticleSEO } from "./blog-types";

interface ArticleSEOPanelProps {
  seo: ArticleSEO;
  onChange: (updatedSeo: ArticleSEO) => void;
  articleTitle: string;
  articleExcerpt: string;
}

export function ArticleSEOPanel({
  seo,
  onChange,
  articleTitle,
  articleExcerpt,
}: ArticleSEOPanelProps) {
  const [tab, setTab] = useState<"google" | "social" | "robots">("google");

  const titleLength = seo.seoTitle.length;
  const descLength = seo.metaDescription.length;

  // Calculate realistic SEO score
  let score = 50;
  if (titleLength >= 30 && titleLength <= 65) score += 15;
  if (descLength >= 80 && descLength <= 165) score += 15;
  if (seo.urlSlug && seo.urlSlug.length > 3) score += 10;
  if (seo.ogImage) score += 10;

  const handleField = (key: keyof ArticleSEO, val: unknown) => {
    onChange({ ...seo, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* Top SEO Score Card */}
      <div className="p-4 bg-surface-2 border border-border space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block">
              SEO Readiness Score
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-display font-semibold text-foreground">{score}</span>
              <span className="text-xs font-mono text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                score >= 80
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : score >= 60
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}
            >
              {score >= 80 ? "EXCELLENT" : score >= 60 ? "GOOD" : "NEEDS WORK"}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-background border border-border overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Quality checklist */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            {titleLength >= 30 && titleLength <= 65 ? (
              <CheckCircle2 className="size-3 text-emerald-400" />
            ) : (
              <AlertTriangle className="size-3 text-amber-400" />
            )}
            Title Length (30-65)
          </span>
          <span className="flex items-center gap-1">
            {descLength >= 80 && descLength <= 165 ? (
              <CheckCircle2 className="size-3 text-emerald-400" />
            ) : (
              <AlertTriangle className="size-3 text-amber-400" />
            )}
            Meta Description
          </span>
          <span className="flex items-center gap-1">
            {seo.urlSlug ? (
              <CheckCircle2 className="size-3 text-emerald-400" />
            ) : (
              <AlertTriangle className="size-3 text-amber-400" />
            )}
            URL Slug Set
          </span>
          <span className="flex items-center gap-1">
            {seo.ogImage ? (
              <CheckCircle2 className="size-3 text-emerald-400" />
            ) : (
              <AlertTriangle className="size-3 text-amber-400" />
            )}
            OpenGraph Asset
          </span>
        </div>
      </div>

      {/* Preview Tab Buttons */}
      <div className="flex border-b border-border text-xs font-mono">
        <button
          type="button"
          onClick={() => setTab("google")}
          className={`px-3 py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
            tab === "google"
              ? "border-gold text-gold font-semibold bg-surface-2/40"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="size-3.5" /> Google SERP Preview
        </button>
        <button
          type="button"
          onClick={() => setTab("social")}
          className={`px-3 py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
            tab === "social"
              ? "border-gold text-gold font-semibold bg-surface-2/40"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Share2 className="size-3.5" /> Social Card (OG)
        </button>
        <button
          type="button"
          onClick={() => setTab("robots")}
          className={`px-3 py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
            tab === "robots"
              ? "border-gold text-gold font-semibold bg-surface-2/40"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Shield className="size-3.5" /> Indexing Directives
        </button>
      </div>

      {/* TAB 1: GOOGLE PREVIEW & CORE FIELDS */}
      {tab === "google" && (
        <div className="space-y-4 animate-fade-in-soft">
          {/* SERP Card Simulator */}
          <div className="p-3.5 bg-[#1f1f1f] border border-[#333] space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] text-[#9aa0a6] font-sans truncate">
              <span className="size-4 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[9px] font-bold">
                SN
              </span>
              <span>studionoir.fashion › journal › {seo.urlSlug || "article-slug"}</span>
            </div>
            <p className="text-sm font-medium text-[#8ab4f8] hover:underline cursor-pointer truncate font-sans">
              {seo.seoTitle || articleTitle || "Article Title | Studio Noir Journal"}
            </p>
            <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed font-sans">
              {seo.metaDescription ||
                articleExcerpt ||
                "Discover how minimal design is shaping modern streetwear through brutalist silhouettes, organic heavyweight cotton, and curated print-on-demand drops."}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-mono text-muted-foreground uppercase text-[10px]">
                  SEO Page Title
                </label>
                <span
                  className={`font-mono text-[10px] ${
                    titleLength > 65
                      ? "text-red-400"
                      : titleLength < 30
                        ? "text-amber-400"
                        : "text-emerald-400"
                  }`}
                >
                  {titleLength} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={seo.seoTitle}
                onChange={(e) => handleField("seoTitle", e.target.value)}
                placeholder={articleTitle}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-mono text-muted-foreground uppercase text-[10px]">
                  Meta Description
                </label>
                <span
                  className={`font-mono text-[10px] ${
                    descLength > 165
                      ? "text-red-400"
                      : descLength < 80
                        ? "text-amber-400"
                        : "text-emerald-400"
                  }`}
                >
                  {descLength} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescription}
                onChange={(e) => handleField("metaDescription", e.target.value)}
                placeholder={articleExcerpt}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold leading-relaxed resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={seo.urlSlug}
                  onChange={(e) => handleField("urlSlug", e.target.value)}
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={seo.canonicalUrl}
                  onChange={(e) => handleField("canonicalUrl", e.target.value)}
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOCIAL CARD (OPEN GRAPH) */}
      {tab === "social" && (
        <div className="space-y-4 animate-fade-in-soft">
          {/* Social Card Simulator */}
          <div className="border border-border bg-black/60 overflow-hidden">
            <div className="aspect-[1.91/1] w-full bg-surface-2 relative overflow-hidden flex items-center justify-center">
              {seo.ogImage ? (
                <img src={seo.ogImage} alt="OG Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="size-8 text-muted-foreground mx-auto mb-1" />
                  <p className="text-[10px] font-mono text-muted-foreground">
                    No OpenGraph image specified
                  </p>
                </div>
              )}
            </div>
            <div className="p-3 bg-surface space-y-1 border-t border-border">
              <p className="text-[10px] font-mono uppercase text-muted-foreground">
                STUDIONOIR.FASHION
              </p>
              <p className="text-xs font-semibold text-foreground truncate">
                {seo.ogTitle || seo.seoTitle || articleTitle}
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                {seo.ogDescription || seo.metaDescription || articleExcerpt}
              </p>
            </div>
          </div>

          {/* Social Inputs */}
          <div className="space-y-3">
            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                OpenGraph Share Title
              </label>
              <input
                type="text"
                value={seo.ogTitle}
                onChange={(e) => handleField("ogTitle", e.target.value)}
                placeholder={seo.seoTitle || articleTitle}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                OpenGraph Share Description
              </label>
              <textarea
                rows={2}
                value={seo.ogDescription}
                onChange={(e) => handleField("ogDescription", e.target.value)}
                placeholder={seo.metaDescription || articleExcerpt}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                OpenGraph Image URL (1200 × 630px recommended)
              </label>
              <input
                type="text"
                value={seo.ogImage}
                onChange={(e) => handleField("ogImage", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ROBOTS DIRECTIVES */}
      {tab === "robots" && (
        <div className="space-y-4 animate-fade-in-soft">
          <p className="text-xs text-muted-foreground">
            Configure search engine crawler directives for this specific article URL.
          </p>

          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 bg-surface-2 border border-border cursor-pointer hover:border-gold/50">
              <div>
                <p className="text-xs font-medium text-foreground">
                  Search Engine Indexing (`index` / `noindex`)
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Allow Googlebot and Bingbot to index this story in search results.
                </p>
              </div>
              <input
                type="checkbox"
                checked={seo.robotsIndex}
                onChange={(e) => handleField("robotsIndex", e.target.checked)}
                className="size-4 accent-gold"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-surface-2 border border-border cursor-pointer hover:border-gold/50">
              <div>
                <p className="text-xs font-medium text-foreground">
                  Link Following (`follow` / `nofollow`)
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Instruct web crawlers to follow outbound links embedded within article blocks.
                </p>
              </div>
              <input
                type="checkbox"
                checked={seo.robotsFollow}
                onChange={(e) => handleField("robotsFollow", e.target.checked)}
                className="size-4 accent-gold"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
