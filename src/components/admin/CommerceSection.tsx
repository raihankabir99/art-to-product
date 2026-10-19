import { useState } from "react";
import {
  Package,
  Sparkles,
  Layers,
  ShoppingBag,
  Users,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  Check,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { PRODUCT_TYPES, DESIGNS, COLLECTIONS, type ProductType, type Design } from "@/lib/catalog";
import { RECENT_ORDERS, RECENT_CUSTOMERS, type AdminOrder, type AdminCustomer } from "./admin-data";
import { toast } from "sonner";
import type { ModalType } from "./QuickActionModals";

interface CommerceSectionProps {
  subSection: string;
  onOpenModal: (type: ModalType) => void;
}

export function CommerceSection({ subSection, onOpenModal }: CommerceSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [orderList, setOrderList] = useState<AdminOrder[]>(RECENT_ORDERS);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrderList((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    toast.success(`Order status updated to ${newStatus.replace("_", " ")}`);
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= PRODUCTS SUBSECTION ================= */}
      {subSection === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Package className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Product Silhouettes & Canvases
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Manage physical blanks, fabric grammage, POD supplier matrix, and default pricing
                tiers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("add-product")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-background transition-colors self-start sm:self-auto"
            >
              <Plus className="size-4" /> Add Product Blank
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="size-4 text-muted-foreground absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search products by title, fabric, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {["all", "apparel", "accessories", "home", "print"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors whitespace-nowrap ${
                    categoryFilter === cat
                      ? "bg-foreground text-background font-medium"
                      : "bg-surface text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid / Table */}
          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono bg-surface-2/40">
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price (€)</th>
                  <th className="p-3.5">Specs & Fit</th>
                  <th className="p-3.5">Fulfilment Partner</th>
                  <th className="p-3.5">Colorways</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {PRODUCT_TYPES.filter((p) => {
                  const matchesSearch =
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
                  return matchesSearch && matchesCat;
                }).map((prod) => (
                  <tr key={prod.id} className="hover:bg-surface-2/70 transition-colors">
                    <td className="p-3.5 font-medium text-foreground">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 border border-border bg-black/40 flex items-center justify-center font-mono text-[10px] text-gold">
                          {prod.id.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{prod.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">
                            ID: {prod.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 uppercase font-mono text-[11px] text-muted-foreground">
                      {prod.category}
                    </td>
                    <td className="p-3.5 font-mono font-medium text-foreground">€{prod.price}</td>
                    <td className="p-3.5 text-muted-foreground">
                      <span className="truncate block max-w-xs">{prod.description}</span>
                    </td>
                    <td className="p-3.5 font-mono text-gold text-[11px]">{prod.fulfilment}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        {prod.colors.map((c) => (
                          <span
                            key={c.name}
                            className="size-3.5 rounded-full border border-border"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toast.info(`Editing ${prod.name} blank template`)}
                          className="p-1.5 text-muted-foreground hover:text-gold border border-border hover:border-gold/50"
                        >
                          <Edit2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= DESIGNS SUBSECTION ================= */}
      {subSection === "designs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Design Catalog & Master Artworks
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                14 High-resolution master designs seamlessly rendered across all physical blanks and
                lookbooks.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("create-design")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors self-start sm:self-auto"
            >
              <Plus className="size-4" /> Register New Design
            </button>
          </div>

          {/* Design Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DESIGNS.map((d) => (
              <div
                key={d.slug}
                className="bg-surface border border-border group hover:border-gold/60 transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square w-full bg-black border border-border/80 flex items-center justify-center p-6 mb-3 relative overflow-hidden">
                    <img
                      src={d.art}
                      alt={d.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 text-[9px] uppercase font-mono px-1.5 py-0.5 bg-black/80 text-gold border border-gold/30">
                      {d.style}
                    </span>
                  </div>

                  <h3 className="font-display font-medium text-sm text-foreground group-hover:text-gold transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {d.collection} Capsule • {d.studio} ({d.year})
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-2 line-clamp-2 leading-relaxed">
                    {d.story}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-gold">13 Blanks Active</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`/design/${d.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground border border-border"
                      title="View live artwork page"
                    >
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= COLLECTIONS SUBSECTION ================= */}
      {subSection === "collections" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Curated Capsule Collections
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Seasonal stories, thematic lookbooks, and drop schedules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("create-collection")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-background transition-colors"
            >
              <Plus className="size-4" /> Create New Capsule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COLLECTIONS.map((col) => (
              <div key={col.slug} className="bg-surface border border-border overflow-hidden group">
                <div className="h-48 w-full relative overflow-hidden bg-zinc-900">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase font-mono text-gold tracking-widest block mb-1">
                      {col.tagline}
                    </span>
                    <h3 className="text-xl font-display font-medium text-foreground">{col.name}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">{col.description}</p>
                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="font-mono text-gold">
                      {col.designs.length} Curated Artworks
                    </span>
                    <a
                      href={`/collection/${col.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground hover:text-gold flex items-center gap-1"
                    >
                      View Live Capsule <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ORDERS SUBSECTION ================= */}
      {subSection === "orders" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  POD Order Fulfillment Pipeline
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time tracking of orders routed to Berlin, London, Philadelphia, and Tokyo
                printing hubs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-950/20 px-3 py-1.5">
                ● 100% SLA Maintained
              </span>
            </div>
          </div>

          {/* Orders Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["all", "processing", "in_production", "shipped", "delivered"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-foreground text-background font-medium"
                    : "bg-surface text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono bg-surface-2/40">
                  <th className="p-3.5">Order Number</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Artwork & Garment</th>
                  <th className="p-3.5">Destination</th>
                  <th className="p-3.5">POD Node</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Pipeline Status</th>
                  <th className="p-3.5 text-right">Fulfillment Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orderList
                  .filter((o) => statusFilter === "all" || o.status === statusFilter)
                  .map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-2/70 transition-colors">
                      <td className="p-3.5 font-mono font-medium text-gold">
                        <div>
                          <p>{ord.orderNumber}</p>
                          <p className="text-[10px] text-muted-foreground">{ord.trackingNumber}</p>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <p className="font-medium text-foreground">{ord.customerName}</p>
                        <p className="text-[11px] text-muted-foreground">{ord.customerEmail}</p>
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        <p className="text-foreground font-medium">{ord.designName}</p>
                        <p className="text-[11px]">{ord.productType}</p>
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        <span>{ord.flag}</span> {ord.destination}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-zinc-300">{ord.podNode}</td>
                      <td className="p-3.5 font-mono font-medium text-foreground">€{ord.total}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] uppercase font-mono px-2 py-0.5 border ${
                            ord.status === "in_production"
                              ? "bg-gold/10 text-gold border-gold/30"
                              : ord.status === "shipped"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : ord.status === "delivered"
                                  ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                                  : "bg-surface-2 text-muted-foreground border-border"
                          }`}
                        >
                          {ord.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(ord.id, e.target.value as AdminOrder["status"])
                          }
                          className="bg-surface-2 border border-border text-foreground text-xs p-1 focus:outline-none cursor-pointer"
                        >
                          <option value="processing">Processing</option>
                          <option value="in_production">In Production</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= CUSTOMERS SUBSECTION ================= */}
      {subSection === "customers" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Patrons & Collectors Directory
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Customer lifetime value, order frequency, loyalty tier categorization, and VIP
                concierge notes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gold border border-gold/30 bg-gold/10 px-3 py-1.5">
                1,410 Registered Patrons
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENT_CUSTOMERS.map((cust) => (
              <div
                key={cust.id}
                className="p-5 bg-surface border border-border space-y-4 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={cust.avatar}
                    alt={cust.name}
                    className="size-12 rounded-none border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {cust.name}
                      </h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 bg-gold/10 text-gold border border-gold/30">
                        {cust.tier}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{cust.email}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{cust.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center">
                  <div className="p-2 bg-surface-2/40 border border-border/40">
                    <p className="text-[10px] uppercase font-mono text-muted-foreground">Orders</p>
                    <p className="text-xs font-mono font-medium text-foreground mt-0.5">
                      {cust.totalOrders}
                    </p>
                  </div>
                  <div className="p-2 bg-surface-2/40 border border-border/40">
                    <p className="text-[10px] uppercase font-mono text-muted-foreground">LTV</p>
                    <p className="text-xs font-mono font-medium text-gold mt-0.5">
                      €{cust.totalSpent}
                    </p>
                  </div>
                  <div className="p-2 bg-surface-2/40 border border-border/40">
                    <p className="text-[10px] uppercase font-mono text-muted-foreground">Joined</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {cust.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
