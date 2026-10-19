import { useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink, X, Eye } from "lucide-react";
import type { PageItem } from "../pages-types";

interface PagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageItem;
}

export function PagePreviewModal({ isOpen, onClose, page }: PagePreviewModalProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!isOpen) return null;

  const widthClass =
    viewport === "desktop" ? "w-full" : viewport === "tablet" ? "w-[768px]" : "w-[375px]";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md animate-fade-in-soft">
      {/* Top Header Controls Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-surface border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-7 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
            <Eye className="size-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              Draft Preview — {page.name}
            </h3>
            <p className="text-[10px] font-mono text-gold">{page.slug}</p>
          </div>
        </div>

        {/* Viewport controls */}
        <div className="flex items-center gap-1 bg-surface-2 p-1 border border-border">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`p-1.5 text-xs font-mono flex items-center gap-1 transition-colors ${
              viewport === "desktop"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Desktop View (1280px+)"
          >
            <Monitor className="size-3.5" /> <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("tablet")}
            className={`p-1.5 text-xs font-mono flex items-center gap-1 transition-colors ${
              viewport === "tablet"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="size-3.5" /> <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`p-1.5 text-xs font-mono flex items-center gap-1 transition-colors ${
              viewport === "mobile"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="size-3.5" /> <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href={page.slug}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors"
          >
            Open in New Tab <ExternalLink className="size-3" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-2 border border-border transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Preview Stage Container */}
      <div className="flex-1 overflow-y-auto bg-black/60 p-4 sm:p-8 flex justify-center items-start custom-scrollbar">
        <div
          className={`${widthClass} min-h-[800px] bg-background border border-border shadow-2xl transition-all duration-300 overflow-hidden text-foreground`}
        >
          {/* Simulated Storefront Header */}
          <div className="border-b border-border bg-surface/90 px-6 py-3 flex items-center justify-between text-xs uppercase tracking-wider font-mono text-muted-foreground">
            <span className="text-gold font-bold font-display tracking-widest text-sm">
              STUDIO NOIR
            </span>
            <div className="hidden md:flex items-center gap-6 text-[11px]">
              <span>Shop</span>
              <span>Designs</span>
              <span>Collections</span>
              <span>Journal</span>
              <span>About</span>
            </div>
            <span>Cart (0)</span>
          </div>

          {/* Page Main Content Area */}
          <div className="p-8 sm:p-12 space-y-8">
            <div className="border-b border-border pb-6 space-y-2">
              <span className="text-xs font-mono text-gold uppercase tracking-wider">
                {page.type} PAGE • TEMPLATE: {page.template}
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-medium text-foreground tracking-tight">
                {page.name}
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {page.description}
              </p>
            </div>

            {/* Rendered Block Stack */}
            {page.blocks && page.blocks.length > 0 ? (
              <div className="space-y-8">
                {page.blocks.map((blk) => (
                  <div key={blk.id} className="p-6 bg-surface border border-border/80 space-y-3">
                    <span className="text-[10px] font-mono uppercase text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 inline-block">
                      {blk.label} ({blk.type})
                    </span>
                    {blk.settings.heading && (
                      <h2 className="text-xl font-display text-foreground">
                        {blk.settings.heading}
                      </h2>
                    )}
                    {blk.settings.body && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {blk.settings.body}
                      </p>
                    )}
                    {blk.settings.buttonText && (
                      <button
                        type="button"
                        className="px-4 py-2 bg-gold text-background text-xs font-semibold uppercase tracking-wider"
                      >
                        {blk.settings.buttonText}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 bg-surface/50 border border-dashed border-border text-center space-y-3">
                <p className="text-sm font-display text-foreground uppercase tracking-wider">
                  Default {page.name} Preview Template
                </p>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  This page utilizes Studio Noir's standardized {page.template} layout with adaptive
                  darkroom design tokens and responsive typography.
                </p>
              </div>
            )}
          </div>

          {/* Simulated Storefront Footer */}
          <div className="border-t border-border bg-surface px-6 py-8 text-center text-xs font-mono text-muted-foreground space-y-2 mt-12">
            <p className="text-gold font-display font-medium text-sm tracking-widest uppercase">
              STUDIO NOIR
            </p>
            <p>© 2026 Studio Noir Inc. Fine Art Print-On-Demand Atelier.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
