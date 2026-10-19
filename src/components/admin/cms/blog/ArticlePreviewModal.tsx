import { useState } from "react";
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ArticleItem } from "./blog-types";
import { toast } from "sonner";

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ArticleItem;
}

export function ArticlePreviewModal({ isOpen, onClose, article }: ArticlePreviewModalProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-md animate-fade-in-soft"
    >
      {/* Top Simulator Control Bar */}
      <div className="h-14 px-4 bg-surface border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Live Preview Simulator:
          </span>
          <span className="text-xs font-medium text-foreground truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/30">
            {article.status.toUpperCase()}
          </span>
        </div>

        {/* Viewport switcher */}
        <div className="flex items-center gap-1 bg-surface-2 p-1 border border-border">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === "desktop"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="size-3.5" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("tablet")}
            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === "tablet"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Tablet className="size-3.5" /> Tablet (768px)
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === "mobile"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="size-3.5" /> Mobile (390px)
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:border-gold"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Main Preview Frame Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-zinc-950/80">
        <div
          className={`transition-all duration-300 bg-background border border-border shadow-2xl overflow-y-auto ${
            device === "desktop"
              ? "w-full max-w-5xl"
              : device === "tablet"
                ? "w-[768px] min-h-[900px]"
                : "w-[390px] min-h-[844px] rounded-2xl border-4 border-zinc-700"
          }`}
        >
          {/* Simulated Storefront Header */}
          <div className="px-6 py-4 border-b border-border/80 flex items-center justify-between text-xs bg-surface/80 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-widest text-foreground text-sm">
                STUDIO NOIR
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">/ JOURNAL</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer">COLLECTIONS</span>
              <span className="hover:text-foreground cursor-pointer">STORE</span>
              <span className="text-gold font-semibold">EDITORIAL</span>
            </div>
          </div>

          {/* Editorial Article Body */}
          <article className="p-6 md:p-12 space-y-8 max-w-3xl mx-auto">
            {/* Breadcrumb & Meta info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-0.5 bg-surface-2 text-gold border border-gold/30 font-semibold uppercase">
                  {article.category}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> {article.readTime}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" />{" "}
                  {article.publishedAt || article.scheduledAt || "Today"}
                </span>
              </div>

              {/* Title & Excerpt */}
              <h1 className="text-2xl md:text-4xl font-display font-medium text-foreground tracking-tight leading-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans border-l-2 border-gold/60 pl-4 py-1 italic">
                  {article.excerpt}
                </p>
              )}

              {/* Author byline */}
              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  {article.authorAvatar ? (
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="size-9 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="size-9 rounded-full bg-surface-2 border border-border flex items-center justify-center">
                      <User className="size-4 text-gold" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-foreground">{article.author}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {article.authorRole || "Editorial Staff"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toast.success("Story bookmarked")}
                    className="p-2 text-muted-foreground hover:text-foreground border border-border hover:border-gold"
                  >
                    <Bookmark className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.success("Share link copied to clipboard")}
                    className="p-2 text-muted-foreground hover:text-foreground border border-border hover:border-gold"
                  >
                    <Share2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <figure className="space-y-2">
                <div className="aspect-[16/9] w-full bg-surface-2 border border-border overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.featuredImageAlt || article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {article.featuredImageAlt && (
                  <figcaption className="text-[11px] font-mono text-muted-foreground italic text-center">
                    {article.featuredImageAlt}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Render Blocks */}
            <div className="space-y-6 text-sm text-foreground/90 leading-relaxed font-sans pt-2">
              {article.blocks && article.blocks.length > 0 ? (
                article.blocks.map((block) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={block.id}
                        className="text-sm md:text-base leading-relaxed text-foreground/90 font-normal"
                      >
                        {block.content}
                      </p>
                    );
                  }
                  if (block.type === "heading") {
                    const level = block.settings?.level || 2;
                    return level === 2 ? (
                      <h2
                        key={block.id}
                        className="text-xl md:text-2xl font-display font-medium text-foreground tracking-tight pt-4"
                      >
                        {block.content}
                      </h2>
                    ) : (
                      <h3
                        key={block.id}
                        className="text-lg md:text-xl font-display font-medium text-foreground tracking-tight pt-2"
                      >
                        {block.content}
                      </h3>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <blockquote
                        key={block.id}
                        className="my-6 p-6 bg-surface-2/70 border-l-4 border-gold space-y-2"
                      >
                        <p className="text-base md:text-lg font-display italic text-foreground leading-relaxed">
                          "{block.content}"
                        </p>
                        {block.settings?.quoteAuthor && (
                          <footer className="text-xs font-mono text-gold uppercase tracking-wider">
                            — {block.settings.quoteAuthor}{" "}
                            {block.settings.quoteRole && (
                              <span className="text-muted-foreground">
                                ({block.settings.quoteRole})
                              </span>
                            )}
                          </footer>
                        )}
                      </blockquote>
                    );
                  }
                  if (block.type === "image") {
                    return (
                      <figure key={block.id} className="my-6 space-y-2">
                        <div className="aspect-video w-full bg-surface-2 border border-border overflow-hidden">
                          <img
                            src={
                              block.settings?.imageUrl ||
                              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
                            }
                            alt={block.content || "Editorial photo"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {block.settings?.imageCaption && (
                          <figcaption className="text-xs font-mono text-muted-foreground text-center">
                            {block.settings.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  if (block.type === "product") {
                    return (
                      <div
                        key={block.id}
                        className="my-8 p-5 bg-surface border border-gold/40 shadow-xl flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden group"
                      >
                        <div className="size-28 shrink-0 bg-surface-2 border border-border overflow-hidden relative">
                          <img
                            src={
                              block.settings?.productImage ||
                              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                            }
                            alt={block.settings?.productTitle || "Product"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {block.settings?.productBadge && (
                            <span className="absolute top-1 left-1 text-[8px] font-mono uppercase px-1.5 py-0.5 bg-black/90 text-gold border border-gold/30">
                              {block.settings.productBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 space-y-1.5 text-center sm:text-left">
                          <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">
                            FEATURED PRINT-ON-DEMAND EDITION
                          </span>
                          <h4 className="text-sm md:text-base font-display font-semibold text-foreground">
                            {block.settings?.productTitle || "Midnight Lion Heavyweight T-Shirt"}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {block.settings?.productCategory ||
                              "240gsm Organic Combed Cotton • Hand Printed in Berlin"}
                          </p>
                          <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                            <span className="text-sm font-mono font-bold text-foreground">
                              {block.settings?.productPrice || "€49.00"}
                            </span>
                            <button
                              type="button"
                              onClick={() => toast.success("Redirecting to product store checkout")}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold text-background text-xs uppercase font-mono font-bold hover:bg-foreground hover:text-background transition-colors"
                            >
                              <ShoppingBag className="size-3.5" /> View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === "collection") {
                    return (
                      <div
                        key={block.id}
                        className="my-8 p-6 bg-surface-2 border border-border relative overflow-hidden group"
                      >
                        <div className="relative z-10 space-y-2 max-w-lg">
                          <span className="text-[10px] font-mono uppercase text-gold tracking-wider">
                            CURATED CAPSULE
                          </span>
                          <h3 className="text-xl font-display font-semibold text-foreground">
                            {block.settings?.collectionTitle || "The Nocturne Capsule"}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {block.settings?.collectionSubtitle ||
                              "Explore 14 exclusive artworks translated across heavyweight apparel and museum giclée prints."}
                          </p>
                          <button
                            type="button"
                            onClick={() => toast.success("Opening collection gallery")}
                            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-gold hover:text-background transition-colors"
                          >
                            Explore Collection <ArrowRight className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === "cta") {
                    return (
                      <div
                        key={block.id}
                        className="my-8 p-6 bg-surface border border-gold/50 text-center space-y-3"
                      >
                        <Sparkles className="size-5 text-gold mx-auto" />
                        <h4 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                          {block.settings?.ctaTitle || "RECEIVE PRIORITY DROPS & EDITORIAL ESSAYS"}
                        </h4>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          {block.settings?.ctaSubtitle ||
                            "Strictly limited print runs. Delivered directly to your inbox."}
                        </p>
                        <div className="flex max-w-md mx-auto gap-2 pt-2">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => toast.success("Subscribed to the Nocturne Dispatch")}
                            className="px-4 py-2 bg-gold text-background text-xs uppercase font-mono font-bold hover:bg-foreground hover:text-background transition-colors whitespace-nowrap"
                          >
                            {block.settings?.ctaButtonText || "SUBSCRIBE"}
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-muted-foreground italic">No content blocks created yet.</p>
              )}
            </div>

            {/* Tags Cloud */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-8 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-muted-foreground mr-1">TOPICS:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 bg-surface-2 border border-border text-muted-foreground hover:text-gold hover:border-gold transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Simulated Footer */}
          <div className="p-8 border-t border-border bg-surface text-center space-y-2 text-xs font-mono text-muted-foreground">
            <p className="text-foreground font-display tracking-widest uppercase">
              STUDIO NOIR INC.
            </p>
            <p className="text-[10px]">
              Fine Art Print-On-Demand Apparel & Archival Goods. Crafted in Berlin & London.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
