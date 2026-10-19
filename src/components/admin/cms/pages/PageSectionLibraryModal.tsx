import React, { useState } from "react";
import {
  X,
  Plus,
  Search,
  Heading as HeadingIcon,
  Type,
  Image as ImageIcon,
  Video,
  MousePointer,
  Minus,
  Quote,
  LayoutGrid,
  Sparkles,
  Layers,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Mail,
  Megaphone,
  Space,
  Columns,
  Split,
  MailCheck,
  Ruler,
  Truck,
  FileText,
  Clock,
} from "lucide-react";
import type { BlockType } from "../pages-types";

interface PageSectionLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlock: (blockType: BlockType, label: string) => void;
}

interface SectionLibraryItem {
  type: BlockType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "CONTENT" | "COMMERCE" | "EDITORIAL" | "MARKETING" | "LAYOUT" | "UTILITY";
}

const SECTION_LIBRARY: SectionLibraryItem[] = [
  // Content
  {
    type: "heading",
    label: "Hero Header Banner",
    description: "High-impact hero title, subtitle, and CTA button.",
    icon: HeadingIcon,
    category: "CONTENT",
  },
  {
    type: "text",
    label: "Rich Text Paragraph",
    description: "Structured body text with typography pairing.",
    icon: Type,
    category: "CONTENT",
  },
  {
    type: "image",
    label: "Full Width Media Image",
    description: "Museum-grade high-resolution artwork image asset.",
    icon: ImageIcon,
    category: "CONTENT",
  },
  {
    type: "video",
    label: "Video Production Feature",
    description: "Embedded video player with caption and play overlay.",
    icon: Video,
    category: "CONTENT",
  },
  {
    type: "quote",
    label: "Manifesto Pull Quote",
    description: "Large quote block with author title and role.",
    icon: Quote,
    category: "CONTENT",
  },
  {
    type: "gallery",
    label: "Artwork Photo Gallery",
    description: "Responsive 3 or 4-column visual gallery grid.",
    icon: LayoutGrid,
    category: "CONTENT",
  },

  // Commerce
  {
    type: "productGrid",
    label: "POD Product Showcase Grid",
    description: "Live product card grid (Tees, Hoodies, Posters).",
    icon: Sparkles,
    category: "COMMERCE",
  },
  {
    type: "collectionGrid",
    label: "Curated Collection Grid",
    description: "Showcase seasonal lookbooks and artwork drops.",
    icon: LayoutGrid,
    category: "COMMERCE",
  },
  {
    type: "designGrid",
    label: "Artist Design Showcase",
    description: "Display individual contemporary fine art vector designs.",
    icon: Layers,
    category: "COMMERCE",
  },
  {
    type: "sizeGuide",
    label: "Garment Fit & Size Table",
    description: "Interactive measurements table with CM/INCH unit toggle.",
    icon: Ruler,
    category: "COMMERCE",
  },

  // Editorial
  {
    type: "editorialSplit",
    label: "Luxury Editorial Split",
    description: "50/50 image and copy block with gold accent CTA.",
    icon: Split,
    category: "EDITORIAL",
  },
  {
    type: "blogGrid",
    label: "Journal Essays & News Grid",
    description: "Recent blog articles and studio notes.",
    icon: BookOpen,
    category: "EDITORIAL",
  },
  {
    type: "faq",
    label: "FAQ Accordion Module",
    description: "Collapsible questions and answers grouped by category.",
    icon: HelpCircle,
    category: "EDITORIAL",
  },
  {
    type: "testimonial",
    label: "Patron Reviews & Proof",
    description: "Verified patron reviews and rating star badges.",
    icon: MessageSquare,
    category: "EDITORIAL",
  },

  // Marketing
  {
    type: "cta",
    label: "High-Converting Call To Action",
    description: "Promotional banner driving checkout or campaign clicks.",
    icon: MousePointer,
    category: "MARKETING",
  },
  {
    type: "newsletter",
    label: "Nocturne Dispatch Signup",
    description: "Email subscription form with instant feedback state.",
    icon: Mail,
    category: "MARKETING",
  },
  {
    type: "banner",
    label: "Announcement Bar Alert",
    description: "High-contrast global shipping banner.",
    icon: Megaphone,
    category: "MARKETING",
  },

  // Layout
  {
    type: "twoColumn",
    label: "Two-Column Split Layout",
    description: "Dual container side-by-side content block.",
    icon: Columns,
    category: "LAYOUT",
  },
  {
    type: "threeColumn",
    label: "Three-Column Grid",
    description: "Triple column block for features and benefits.",
    icon: Columns,
    category: "LAYOUT",
  },
  {
    type: "divider",
    label: "Geometric Border Line",
    description: "Subtle gold or neutral border separator.",
    icon: Minus,
    category: "LAYOUT",
  },
  {
    type: "spacer",
    label: "Custom Vertical Spacer",
    description: "Adjustable whitespace padding between sections.",
    icon: Space,
    category: "LAYOUT",
  },

  // Utility
  {
    type: "contactForm",
    label: "Client Concierge Support Form",
    description: "Interactive contact form with order number and subject.",
    icon: MailCheck,
    category: "UTILITY",
  },
  {
    type: "shippingTimeline",
    label: "Order Fulfillment Timeline",
    description: "Visual timeline (Order -> Production -> Shipping -> Delivery).",
    icon: Truck,
    category: "UTILITY",
  },
  {
    type: "timeline",
    label: "Brand History Timeline",
    description: "Chronological milestone timeline (2024, 2025, 2026).",
    icon: Clock,
    category: "UTILITY",
  },
  {
    type: "tableOfContents",
    label: "Legal Document Index",
    description: "Table of contents with quick anchor links.",
    icon: FileText,
    category: "UTILITY",
  },
];

export function PageSectionLibraryModal({
  isOpen,
  onClose,
  onAddBlock,
}: PageSectionLibraryModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  if (!isOpen) return null;

  const categories = ["ALL", "CONTENT", "COMMERCE", "EDITORIAL", "MARKETING", "LAYOUT", "UTILITY"];

  const filteredItems = SECTION_LIBRARY.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch =
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-4xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2">
            <div className="size-8 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
              <Plus className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Section & Module Library
              </h3>
              <p className="text-xs text-muted-foreground">
                Select pre-built section blocks to insert into your visual canvas.
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

        {/* Search & Category Toolbar */}
        <div className="p-4 bg-surface-2/20 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? "bg-gold text-background font-bold"
                    : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[200px]">
            <Search className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search section modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Section Grid */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                onClick={() => {
                  onAddBlock(item.type, item.label);
                  onClose();
                }}
                className="p-4 bg-surface-2/60 border border-border hover:border-gold hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-8 border border-border group-hover:border-gold bg-surface text-foreground group-hover:text-gold flex items-center justify-center transition-colors">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-surface text-muted-foreground border border-border">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-gold uppercase tracking-wider transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-gold opacity-80 group-hover:opacity-100">
                  <span>Insert Block</span>
                  <Plus className="size-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">
            Showing {filteredItems.length} available section modules
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
