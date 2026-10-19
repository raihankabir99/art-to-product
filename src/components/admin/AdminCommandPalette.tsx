import { useEffect, useState, useMemo } from "react";
import {
  Search,
  X,
  Package,
  Sparkles,
  Layers,
  ShoppingBag,
  Users,
  FileText,
  Layout,
  Settings,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { DESIGNS, PRODUCT_TYPES, COLLECTIONS, ARTICLES } from "@/lib/catalog";
import { RECENT_ORDERS, RECENT_CUSTOMERS } from "./admin-data";

interface AdminCommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (section: string, sub?: string) => void;
}

export function AdminCommandPalette({ open, onClose, onNavigate }: AdminCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const items: {
      id: string;
      title: string;
      subtitle: string;
      category: "Commerce" | "Designs" | "Orders" | "Customers" | "CMS & Blog" | "Navigation";
      icon: typeof Package;
      action: () => void;
      badge?: string;
    }[] = [];

    // Products
    if (activeFilter === "all" || activeFilter === "products") {
      PRODUCT_TYPES.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      ).forEach((p) => {
        items.push({
          id: `prod_${p.id}`,
          title: p.name,
          subtitle: `€${p.price} • ${p.category} • ${p.fulfilment}`,
          category: "Commerce",
          icon: Package,
          action: () => {
            onNavigate("commerce", "products");
            onClose();
          },
          badge: "Product",
        });
      });
    }

    // Designs
    if (activeFilter === "all" || activeFilter === "designs") {
      DESIGNS.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.collection.toLowerCase().includes(q) ||
          d.style.toLowerCase().includes(q),
      ).forEach((d) => {
        items.push({
          id: `des_${d.slug}`,
          title: d.name,
          subtitle: `${d.collection} • ${d.studio} (${d.year})`,
          category: "Designs",
          icon: Sparkles,
          action: () => {
            onNavigate("commerce", "designs");
            onClose();
          },
          badge: d.style,
        });
      });
    }

    // Orders
    if (activeFilter === "all" || activeFilter === "orders") {
      RECENT_ORDERS.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.destination.toLowerCase().includes(q) ||
          o.trackingNumber.toLowerCase().includes(q),
      ).forEach((o) => {
        items.push({
          id: o.id,
          title: `${o.orderNumber} — ${o.customerName}`,
          subtitle: `${o.designName} (${o.productType}) • €${o.total} • ${o.destination}`,
          category: "Orders",
          icon: ShoppingBag,
          action: () => {
            onNavigate("commerce", "orders");
            onClose();
          },
          badge: o.status,
        });
      });
    }

    // Customers
    if (activeFilter === "all" || activeFilter === "customers") {
      RECENT_CUSTOMERS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q),
      ).forEach((c) => {
        items.push({
          id: c.id,
          title: c.name,
          subtitle: `${c.email} • ${c.totalOrders} orders (€${c.totalSpent})`,
          category: "Customers",
          icon: Users,
          action: () => {
            onNavigate("commerce", "customers");
            onClose();
          },
          badge: c.tier,
        });
      });
    }

    // CMS Articles & Pages
    if (activeFilter === "all" || activeFilter === "cms") {
      ARTICLES.filter(
        (a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q),
      ).forEach((a) => {
        items.push({
          id: `art_${a.slug}`,
          title: a.title,
          subtitle: `${a.category} • ${a.date} • ${a.readTime}`,
          category: "CMS & Blog",
          icon: FileText,
          action: () => {
            onNavigate("cms", "blog");
            onClose();
          },
          badge: "Article",
        });
      });
      COLLECTIONS.filter(
        (col) => col.name.toLowerCase().includes(q) || col.tagline.toLowerCase().includes(q),
      ).forEach((col) => {
        items.push({
          id: `col_${col.slug}`,
          title: col.name,
          subtitle: `${col.tagline} • ${col.designs.length} curated artworks`,
          category: "CMS & Blog",
          icon: Layers,
          action: () => {
            onNavigate("commerce", "collections");
            onClose();
          },
          badge: "Collection",
        });
      });
    }

    return items;
  }, [query, activeFilter, onNavigate, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in-soft"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface border border-border-strong shadow-2xl overflow-hidden animate-reveal-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border bg-background/50">
          <Search className="size-5 text-gold mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, designs, orders, customers, articles, or commands..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-sans focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground mr-2"
            >
              <X className="size-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 border border-border text-muted-foreground">
            ESC
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-surface-2 border-b border-border text-xs overflow-x-auto">
          {[
            { id: "all", label: "All Records" },
            { id: "products", label: "Products" },
            { id: "designs", label: "Designs" },
            { id: "orders", label: "Orders" },
            { id: "customers", label: "Customers" },
            { id: "cms", label: "CMS & Blog" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                activeFilter === tab.id
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-border/60">
          {query.trim() === "" ? (
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-gold mb-3 font-medium">
                Suggested Quick Navigation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    label: "Executive Analytics Overview",
                    sub: "Revenue & Orders",
                    icon: TrendingUp,
                    action: () => onNavigate("dashboard"),
                  },
                  {
                    label: "Product & Canvas Matrix",
                    sub: "Stock & Price Options",
                    icon: Package,
                    action: () => onNavigate("commerce", "products"),
                  },
                  {
                    label: "Design Catalog",
                    sub: "14 Atelier Artworks",
                    icon: Sparkles,
                    action: () => onNavigate("commerce", "designs"),
                  },
                  {
                    label: "POD Order Pipeline",
                    sub: "Live production flow",
                    icon: ShoppingBag,
                    action: () => onNavigate("commerce", "orders"),
                  },
                  {
                    label: "AI Center & Automation",
                    sub: "Mockups & Routing",
                    icon: Layers,
                    action: () => onNavigate("ai-automation", "ai-center"),
                  },
                  {
                    label: "Store Settings & Roles",
                    sub: "Multi-currency, RBAC",
                    icon: Settings,
                    action: () => onNavigate("settings", "general"),
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 text-left border border-border/80 bg-surface hover:border-gold/60 hover:bg-surface-2 transition-all group"
                    >
                      <Icon className="size-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                      </div>
                      <ArrowRight className="size-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">No records found matching "{query}"</p>
              <p className="text-xs mt-1 text-muted-foreground/80">
                Try searching by design name, SKU, order ID, or customer email.
              </p>
            </div>
          ) : (
            results.map((res) => {
              const Icon = res.icon;
              return (
                <button
                  key={res.id}
                  type="button"
                  onClick={res.action}
                  className="w-full flex items-center justify-between p-3.5 text-left hover:bg-surface-2 transition-colors group"
                >
                  <div className="flex items-start gap-3 min-w-0 pr-4">
                    <div className="p-2 border border-border bg-surface text-gold shrink-0 mt-0.5">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-gold transition-colors">
                          {res.title}
                        </p>
                        {res.badge && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 border border-gold/30 bg-gold/10 text-gold shrink-0">
                            {res.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 bg-background border-t border-border text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-gold font-mono">⌘K</span> Global Palette
          </div>
          <div>Atelier Noir Enterprise CMS v2.6</div>
        </div>
      </div>
    </div>
  );
}
