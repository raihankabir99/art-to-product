import { useState } from "react";
import {
  Home,
  FileText,
  BookOpen,
  Menu,
  PanelBottom,
  Image as ImageIcon,
  Megaphone,
  MessageSquare,
  HelpCircle,
  Star,
  Plus,
  Edit2,
  Trash2,
  Check,
  ExternalLink,
  Eye,
  Upload,
  Save,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ARTICLES, DESIGNS } from "@/lib/catalog";
import { toast } from "sonner";
import type { ModalType } from "./QuickActionModals";
import { HomepageCMSBuilder } from "./cms/HomepageCMSBuilder";
import { PagesList } from "./cms/pages/PagesList";
import { VisualPageEditor } from "./cms/pages/VisualPageEditor";
import { NavigationManager } from "./cms/navigation/NavigationManager";
import { FooterManager } from "./cms/footer/FooterManager";
import { GlobalContentManager } from "./cms/global/GlobalContentManager";
import { BlogStudio } from "./cms/blog/BlogStudio";
import { INITIAL_PAGES } from "./cms/pages-initial-data";
import type { PageItem } from "./cms/pages-types";

interface CMSSectionProps {
  subSection: string;
  onOpenModal: (type: ModalType) => void;
}

export function CMSSection({ subSection, onOpenModal }: CMSSectionProps) {
  // Pages state
  const [pages, setPages] = useState<PageItem[]>(INITIAL_PAGES);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);

  // Homepage customizer state
  const [heroHeadline, setHeroHeadline] = useState("Art You Can Wear. Quality That Endures.");
  const [heroSubline, setHeroSubline] = useState(
    "Design-led print-on-demand fashion. Every piece is made to order with organic heavyweight fabrics and museum-grade printing.",
  );
  const [marqueeText, setMarqueeText] = useState(
    "COMPLIMENTARY WORLDWIDE EXPRESS OVER €150 • SUSTAINABLE ORGANIC COTTON • PRINTED IN BERLIN & LONDON • 14 EXCLUSIVE ARTWORKS",
  );

  // Announcement banner
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState(
    "COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ALL ORDERS OVER €150 • 100% ORGANIC HEAVYWEIGHT COTTON",
  );

  // Reviews list state
  const [reviews, setReviews] = useState([
    {
      id: "rev_1",
      author: "Charlotte M.",
      rating: 5,
      title: "Exceptional garment weight and print clarity",
      comment:
        "The 400gsm hoodie in Moss with Midnight Lion art exceeded expectations. Incredible texture.",
      product: "Double-Lined Hoodie",
      design: "Midnight Lion",
      date: "Yesterday",
      verified: true,
      published: true,
    },
    {
      id: "rev_2",
      author: "Henrik S.",
      rating: 5,
      title: "Museum-grade giclée quality",
      comment:
        "Framed the 70x100cm poster in our Copenhagen loft. Paper has substantial archival heft.",
      product: "Museum Giclée Poster",
      design: "Nordic Silence",
      date: "23 Aug 2026",
      verified: true,
      published: true,
    },
    {
      id: "rev_3",
      author: "Marcus W.",
      rating: 4,
      title: "Substantial t-shirt collar and drape",
      comment: "The 240gsm cotton feels indestructible yet soft. Minimal boxy fit is spot on.",
      product: "Heavyweight T-Shirt",
      design: "Solstice",
      date: "21 Aug 2026",
      verified: true,
      published: true,
    },
  ]);

  // Media Library state
  const mediaAssets = [
    {
      id: "med_1",
      name: "midnight-lion-master-art.png",
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      tag: "Master Artwork",
      size: "4.2 MB",
      dimensions: "4500 × 5400 px",
    },
    {
      id: "med_2",
      name: "lookbook-nocturne-editorial-01.jpg",
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
      tag: "Lookbook",
      size: "2.8 MB",
      dimensions: "3840 × 2160 px",
    },
    {
      id: "med_3",
      name: "fabric-heavyweight-cotton-detail.jpg",
      url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
      tag: "Texture",
      size: "3.1 MB",
      dimensions: "3000 × 2000 px",
    },
    {
      id: "med_4",
      name: "solstice-artwork-vector.png",
      url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
      tag: "Master Artwork",
      size: "1.9 MB",
      dimensions: "4000 × 4000 px",
    },
  ];

  const handleCreatePage = (newPage: Partial<PageItem>) => {
    const created: PageItem = {
      id: `pg_${Date.now()}`,
      name: newPage.name || "Untitled Page",
      slug: newPage.slug || `/page-${Date.now()}`,
      type: newPage.type || "CONTENT",
      template: newPage.template || "Editorial",
      status: newPage.status || "Draft",
      visibility: newPage.visibility || "Public",
      lastUpdated: new Date().toISOString().replace("T", " ").substring(0, 16),
      author: newPage.author || "Admin Editor",
      description: newPage.description || "",
      seo: newPage.seo || {
        seoTitle: `${newPage.name} | Studio Noir`,
        metaDescription: `Studio Noir ${newPage.name}`,
        canonicalUrl: `https://studionoir.fashion${newPage.slug}`,
        ogTitle: newPage.name || "",
        ogDescription: "",
        ogImage: "",
        robotsIndex: true,
        robotsFollow: true,
      },
      blocks: [],
      versions: [],
    };

    setPages((prev) => [created, ...prev]);
    toast.success(`Page "${created.name}" created!`);
  };

  const handleUpdatePage = (updatedPage: PageItem) => {
    setPages((prev) => prev.map((p) => (p.id === updatedPage.id ? updatedPage : p)));
    setEditingPage(null);
  };

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    toast.info("Page deleted");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= HOMEPAGE VISUAL CMS & PAGE BUILDER ================= */}
      {subSection === "homepage" && <HomepageCMSBuilder />}

      {/* ================= PAGES MANAGEMENT SUBSECTION ================= */}
      {subSection === "pages" &&
        (editingPage ? (
          <VisualPageEditor
            page={editingPage}
            onBack={() => setEditingPage(null)}
            onSave={handleUpdatePage}
          />
        ) : (
          <PagesList
            pages={pages}
            onEditPage={(page) => setEditingPage(page)}
            onCreatePage={handleCreatePage}
            onDeletePage={handleDeletePage}
          />
        ))}

      {/* ================= NAVIGATION & MEGA MENU SUBSECTION ================= */}
      {subSection === "navigation" && <NavigationManager />}

      {/* ================= FOOTER MANAGEMENT SUBSECTION ================= */}
      {subSection === "footer" && <FooterManager />}

      {/* ================= GLOBAL CONTENT SUBSECTION ================= */}
      {(subSection === "banners" || subSection === "popups" || subSection === "global") && (
        <GlobalContentManager />
      )}

      {/* ================= BLOG & JOURNAL SUBSECTION ================= */}
      {subSection === "blog" && <BlogStudio />}

      {/* ================= MEDIA LIBRARY SUBSECTION ================= */}
      {subSection === "media" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Media Library & CDN Assets
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                High-resolution design vectors, lookbook assets, packaging renders, and editorial
                photos.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("upload-media")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-background transition-colors"
            >
              <Upload className="size-4" /> Upload Asset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-3 bg-surface border border-border space-y-3 group hover:border-gold/50 transition-colors"
              >
                <div className="aspect-video w-full bg-black/60 border border-border overflow-hidden relative">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 text-[9px] uppercase font-mono px-1.5 py-0.5 bg-black/80 text-gold border border-gold/30">
                    {asset.tag}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-mono font-medium text-foreground truncate">
                    {asset.name}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1 font-mono">
                    <span>{asset.dimensions}</span>
                    <span>{asset.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BANNERS & ANNOUNCEMENTS ================= */}
      {subSection === "banners" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Megaphone className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Announcement Bars & Site Banners
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Top global shipping header, seasonal campaign alerts, and localized currency
                banners.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Announcement banner updated")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              <Save className="size-4" /> Save Banner
            </button>
          </div>

          <div className="p-6 bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Top Announcement Bar</p>
                <p className="text-xs text-muted-foreground">
                  Fixed header announcement across all storefront pages
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={bannerActive}
                  onChange={(e) => setBannerActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none border border-border peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-gold" />
              </label>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                Banner Copy (Global)
              </label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= REVIEWS SUBSECTION ================= */}
      {subSection === "reviews" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Star className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Patron Reviews & Moderation
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Verified customer ratings, garment fit feedback, and testimonial curation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gold border border-gold/30 bg-gold/10 px-3 py-1.5">
                ★ 4.93 / 5.0 Average (480 Reviews)
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold text-xs">{"★".repeat(rev.rating)}</div>
                    <span className="font-semibold text-xs text-foreground">{rev.title}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-mono px-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Verified Patron
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">"{rev.comment}"</p>
                  <p className="text-[11px] text-muted-foreground/80">
                    By <span className="text-foreground">{rev.author}</span> on {rev.product} (
                    {rev.design}) • {rev.date}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setReviews((prev) =>
                        prev.map((r) => (r.id === rev.id ? { ...r, published: !r.published } : r)),
                      );
                      toast.info(`Review status toggled`);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono border ${
                      rev.published
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-surface-2 text-muted-foreground border-border"
                    }`}
                  >
                    {rev.published ? "Live On Store" : "Hidden"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= FAQ & CUSTOM SUBSECTION FALLBACK ================= */}
      {![
        "homepage",
        "pages",
        "navigation",
        "footer",
        "banners",
        "popups",
        "global",
        "blog",
        "media",
        "reviews",
      ].includes(subSection) && (
        <div className="p-8 bg-surface border border-border text-center space-y-3">
          <div className="size-12 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center mx-auto">
            <Sparkles className="size-6" />
          </div>
          <h3 className="text-lg font-display font-medium text-foreground uppercase tracking-wider">
            {subSection.toUpperCase()} Management Studio
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Configure {subSection} structure, editorial hierarchies, and automated localization
            mappings.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                toast.success(`${subSection.toUpperCase()} configuration synchronized`)
              }
              className="px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-background transition-colors"
            >
              Sync Structure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
