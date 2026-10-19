import { useState } from "react";
import { X, Sparkles, FileText, ArrowRight } from "lucide-react";
import type { PageItem, PageType, PageTemplate, PageStatus } from "../pages-types";

interface PageCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newPage: Partial<PageItem>) => void;
}

export function PageCreateModal({ isOpen, onClose, onCreate }: PageCreateModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<PageType>("CONTENT");
  const [template, setTemplate] = useState<PageTemplate>("Editorial");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<PageStatus>("Draft");

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    const autoSlug =
      "/" +
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    setSlug(autoSlug);
  };

  const handleSubmit = (chosenStatus: PageStatus) => {
    if (!name.trim()) return;
    onCreate({
      name: name.trim(),
      slug: slug.trim() || `/${name.toLowerCase().replace(/\s+/g, "-")}`,
      type,
      template,
      description,
      status: chosenStatus,
      visibility: "Public",
      lastUpdated: new Date().toISOString().replace("T", " ").substring(0, 16),
      author: "Admin Editor",
      seo: {
        seoTitle: `${name} | Studio Noir`,
        metaDescription: description || `${name} page at Studio Noir.`,
        canonicalUrl: `https://studionoir.fashion${slug}`,
        ogTitle: name,
        ogDescription: description || name,
        ogImage:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
        robotsIndex: true,
        robotsFollow: true,
      },
      blocks: [],
      versions: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2">
            <div className="size-8 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
              <FileText className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Create New Website Page
              </h3>
              <p className="text-xs text-muted-foreground">
                Configure meta structure, categorization, and page template.
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

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                Page Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Sustainability Manifesto"
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                URL / Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="/sustainability"
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-gold focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                Page Category / Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PageType)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              >
                <option value="CONTENT">CONTENT (About, Contact, Size Guide)</option>
                <option value="EDITORIAL">EDITORIAL (Campaigns, Lookbooks)</option>
                <option value="LEGAL">LEGAL (Privacy, Terms, Cookies)</option>
                <option value="SYSTEM">SYSTEM (Home, Shop, Cart, Account)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                Starting Template
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as PageTemplate)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              >
                <option value="Editorial">Editorial Canvas</option>
                <option value="Blank">Blank (Start from scratch)</option>
                <option value="Marketing">Marketing Showcase</option>
                <option value="Information">Information / Support Table</option>
                <option value="Campaign">Campaign Drop Landing</option>
                <option value="Landing Page">Full Landing Page</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
              Description / Internal Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of this page's business objective..."
              rows={3}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
            />
          </div>

          <div className="p-4 bg-surface-2/60 border border-border space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-gold" />
              <span className="text-xs font-semibold text-foreground">
                Template Preset Includes:
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Selecting <strong className="text-foreground">{template}</strong> will auto-populate
              pre-configured, accessible blocks including Hero Headers, Content Grids, and
              Responsive CTAs matching Studio Noir's darkroom design system.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border hover:border-foreground transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit("Draft")}
              className="px-4 py-2 bg-surface-2 text-foreground text-xs uppercase tracking-wider font-mono font-medium border border-border hover:border-gold transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("Published")}
              className="px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-1.5"
            >
              Publish Page <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
