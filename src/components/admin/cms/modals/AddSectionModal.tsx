import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Plus,
  X,
  Layers,
  Image as ImageIcon,
  Grid,
  FileText,
  Star,
  Mail,
  Instagram,
  ShoppingBag,
  Video,
  Search,
  LayoutTemplate,
} from "lucide-react";
import type { SectionType } from "../homepage-types";

interface AddSectionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (type: SectionType, index?: number | null) => void;
  insertIndex?: number | null;
}

export function AddSectionModal({
  open,
  onClose,
  onAdd,
  insertIndex = null,
}: AddSectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  if (!open) return null;

  const templates: {
    type: SectionType;
    title: string;
    description: string;
    icon: LucideIcon;
    tag: string;
    category: "MEDIA" | "COMMERCE" | "EDITORIAL" | "MARKETING" | "COMMUNITY";
  }[] = [
    {
      type: "hero",
      title: "Hero Banner",
      description: "Full-bleed editorial visual with typography and dual CTAs",
      icon: ImageIcon,
      tag: "FLAGSHIP",
      category: "MEDIA",
    },
    {
      type: "video",
      title: "Cinematic Video Section",
      description: "Atmospheric video stream with poster frame and overlay CTA",
      icon: Video,
      tag: "CINEMATIC",
      category: "MEDIA",
    },
    {
      type: "one-design-multiple",
      title: "One Design — Multiple Products",
      description: "Core POD concept: 1 artwork dynamically mapped across 13 substrates",
      icon: Layers,
      tag: "CORE BRAND",
      category: "COMMERCE",
    },
    {
      type: "featured-designs",
      title: "Featured Designs Matrix",
      description: "Architectural line drawings and original studio vector artworks",
      icon: Grid,
      tag: "COMMERCE",
      category: "COMMERCE",
    },
    {
      type: "new-designs",
      title: "New Drops & Releases",
      description: "Dynamic feed of recently published seasonal studio artworks",
      icon: Sparkles,
      tag: "COMMERCE",
      category: "COMMERCE",
    },
    {
      type: "best-sellers",
      title: "Best Sellers Ranking",
      description: "Automated lookback window ranking patron demand",
      icon: ShoppingBag,
      tag: "ANALYTICS",
      category: "COMMERCE",
    },
    {
      type: "shop-by-product",
      title: "Shop by Product Substrates",
      description: "Filter matrix for 13 physical silhouettes and garment weights",
      icon: Grid,
      tag: "NAVIGATION",
      category: "COMMERCE",
    },
    {
      type: "featured-collection",
      title: "Curated Capsule Collection",
      description: "Spotlight specific design capsule with artwork studies count",
      icon: LayoutTemplate,
      tag: "COLLECTION",
      category: "COMMERCE",
    },
    {
      type: "editorial",
      title: "Editorial / Lifestyle Split",
      description: "Magazine-style 60/40 narrative with live studio stats",
      icon: FileText,
      tag: "EDITORIAL",
      category: "EDITORIAL",
    },
    {
      type: "brand-story",
      title: "Brand Story & Studio Heritage",
      description: "Deep narrative block on zero-waste on-demand philosophy",
      icon: FileText,
      tag: "NARRATIVE",
      category: "EDITORIAL",
    },
    {
      type: "blog",
      title: "Journal & Articles Feed",
      description: "Editorial notes on design, architecture, and craftsmanship",
      icon: FileText,
      tag: "CONTENT",
      category: "EDITORIAL",
    },
    {
      type: "promotional-banner",
      title: "Promotional Banner / Drop",
      description: "Scheduled capsule teaser with countdown and private access",
      icon: Sparkles,
      tag: "MARKETING",
      category: "MARKETING",
    },
    {
      type: "reviews",
      title: "Customer Reviews & Community",
      description: "Verified patron testimonials with 5-star ratings",
      icon: Star,
      tag: "TRUST",
      category: "COMMUNITY",
    },
    {
      type: "newsletter",
      title: "Newsletter Dispatch Hub",
      description: "Monthly subscriber box with minimalist typography",
      icon: Mail,
      tag: "GROWTH",
      category: "MARKETING",
    },
    {
      type: "social-showcase",
      title: "Instagram & Social Showcase",
      description: "Live patron gallery featuring real-world apparel styling",
      icon: Instagram,
      tag: "COMMUNITY",
      category: "COMMUNITY",
    },
  ];

  const categories = ["ALL", "MEDIA", "COMMERCE", "EDITORIAL", "MARKETING", "COMMUNITY"];

  const filteredTemplates = templates.filter((tpl) => {
    const matchCategory = selectedCategory === "ALL" || tpl.category === selectedCategory;
    const matchSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-border w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-fade-in-soft">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-display font-medium text-foreground">
                Add Section to Homepage
              </h3>
              {insertIndex !== null && (
                <span className="text-[10px] font-mono bg-gold/10 text-gold border border-gold/30 px-2 py-0.5">
                  Inserting at Position #{insertIndex + 1}
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
              Choose an architectural section template to expand your storefront narrative.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3 border-b border-border bg-surface-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-gold text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground bg-surface border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="size-3.5 absolute left-2.5 top-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-1">
          {filteredTemplates.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <button
                key={tpl.type}
                type="button"
                onClick={() => {
                  onAdd(tpl.type, insertIndex);
                  onClose();
                }}
                className="p-3.5 bg-surface-2 border border-border hover:border-gold text-left flex flex-col justify-between gap-2 transition-all hover:bg-gold/5 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-black border border-border group-hover:border-gold/50 text-gold shrink-0">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 bg-black border border-zinc-700 text-zinc-400">
                      {tpl.tag}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-foreground group-hover:text-gold transition-colors block">
                    {tpl.title}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
                  <Plus className="size-3" /> Insert Block
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
