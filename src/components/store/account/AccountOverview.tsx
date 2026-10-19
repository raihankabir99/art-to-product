import { Link } from "@tanstack/react-router";
import { Package, Heart, MapPin, ArrowRight, Clock, Truck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { KpiCard, BarChart } from "@/components/store/ui";
import { designBySlug } from "@/lib/catalog";
import type { Order } from "@/lib/account-data";
import { ACCOUNT_METRICS } from "@/lib/account-data";
import type { UserProfile } from "@/lib/services/auth-service";

export function AccountOverview({
  user,
  orders,
  wishlistCount,
  addressCount,
  format,
  onSelectTab,
  onViewOrder,
}: {
  user: UserProfile;
  orders: Order[];
  wishlistCount: number;
  addressCount: number;
  format: (n: number) => string;
  onSelectTab: (tab: string) => void;
  onViewOrder: (order: Order) => void;
}) {
  const recentOrder = orders[0] || null;
  const inProductionCount = orders.filter((o) => o.step >= 0 && o.step < 6).length;
  const recentItem = recentOrder?.items[0] || null;
  const recentDesign = recentItem ? designBySlug(recentItem.designSlug) : null;
  const totalSpend = orders.reduce((sum, o) => sum + (o.step >= 0 ? o.total : 0), 0);

  return (
    <div className="space-y-10">
      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectTab("Orders")}
          onKeyDown={(e) => e.key === "Enter" && onSelectTab("Orders")}
          className="cursor-pointer border border-border bg-surface p-5 transition-all hover:border-gold/60 text-left"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-label uppercase tracking-widest text-xs">Orders Placed</span>
            <Package className="size-4 text-gold" />
          </div>
          <p className="text-h2 mt-3 font-semibold tabular-nums">{orders.length}</p>
          <p className="text-meta mt-1 text-muted-foreground">
            {inProductionCount > 0 ? `${inProductionCount} in production` : "All orders fulfilled"}
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectTab("Wishlist")}
          onKeyDown={(e) => e.key === "Enter" && onSelectTab("Wishlist")}
          className="cursor-pointer border border-border bg-surface p-5 transition-all hover:border-gold/60 text-left"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-label uppercase tracking-widest text-xs">Saved Designs</span>
            <Heart className="size-4 text-gold" />
          </div>
          <p className="text-h2 mt-3 font-semibold tabular-nums">{wishlistCount}</p>
          <p className="text-meta mt-1 text-muted-foreground">In your curated wishlist</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectTab("Addresses")}
          onKeyDown={(e) => e.key === "Enter" && onSelectTab("Addresses")}
          className="cursor-pointer border border-border bg-surface p-5 transition-all hover:border-gold/60 text-left"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-label uppercase tracking-widest text-xs">Saved Addresses</span>
            <MapPin className="size-4 text-gold" />
          </div>
          <p className="text-h2 mt-3 font-semibold tabular-nums">{addressCount}</p>
          <p className="text-meta mt-1 text-muted-foreground">Ready for 1-click checkout</p>
        </div>

        <div className="border border-border bg-surface p-5 text-left">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-label uppercase tracking-widest text-xs">Total Spend</span>
            <span className="text-gold font-mono text-xs">EUR</span>
          </div>
          <p className="text-h2 mt-3 font-semibold tabular-nums">{format(totalSpend)}</p>
          <p className="text-meta mt-1 text-muted-foreground">Across studio commissions</p>
        </div>
      </div>

      {/* Recent Order Featured Banner */}
      {recentOrder && recentItem ? (
        <div className="border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-label uppercase tracking-widest text-gold text-[10px]">
                  Recent Order
                </span>
                <span className="text-border">·</span>
                <span className="text-meta text-muted-foreground">Placed {recentOrder.placed}</span>
              </div>
              <h2 className="text-h3 font-medium mt-1">#{recentOrder.id}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-label px-3 py-1 bg-surface-2 border border-border text-gold font-medium text-xs">
                {recentOrder.statusLabel ||
                  (recentOrder.step === 6 ? "Delivered" : "In Production")}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-center">
            {/* Mockup */}
            <div className="aspect-square w-28 sm:w-36 border border-border bg-surface-2">
              {recentDesign ? (
                <Mockup
                  design={recentDesign}
                  productId={recentItem.productId}
                  colorValue={recentItem.colorValue}
                />
              ) : null}
            </div>

            {/* Item details */}
            <div className="space-y-1.5">
              <p className="text-label uppercase text-[11px] tracking-wider text-gold">
                {recentItem.designName}
              </p>
              <h3 className="text-h4 font-medium">{recentItem.productName}</h3>
              <p className="text-body-sm text-muted-foreground">
                {recentItem.color} {recentItem.size ? `· Size ${recentItem.size}` : ""} · Qty{" "}
                {recentItem.qty}
              </p>
              {recentOrder.items.length > 1 && (
                <p className="text-meta text-muted-foreground pt-1">
                  + {recentOrder.items.length - 1} other item
                  {recentOrder.items.length > 2 ? "s" : ""} in package
                </p>
              )}
              <p className="text-meta text-muted-foreground pt-1">
                Carrier: {recentOrder.carrier} · {recentOrder.eta}
              </p>
            </div>

            {/* Pricing & CTA buttons */}
            <div className="flex flex-col md:items-end gap-3 justify-center">
              <span className="text-price font-medium text-lg">{format(recentOrder.total)}</span>
              <div className="flex flex-wrap gap-2.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => onViewOrder(recentOrder)}
                  className="gap-1.5"
                >
                  <Eye className="size-3.5" /> View Order
                </Button>
                <Button asChild size="sm" className="gap-1.5">
                  <Link to="/orders">
                    <Truck className="size-3.5" /> Track Order
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border bg-surface p-8 text-center">
          <p className="text-h4 font-medium">No orders placed yet</p>
          <p className="text-body-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Discover our collection of curated print-on-demand designs crafted for premium apparel
            and wall art.
          </p>
          <Button asChild className="mt-6">
            <Link to="/shop">Explore Collection</Link>
          </Button>
        </div>
      )}

      {/* Visual Analytics & Breakdown */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border border-border bg-surface p-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="text-h4 font-medium">What You Buy</h3>
              <p className="text-meta text-muted-foreground mt-0.5">
                Purchases distributed across categories
              </p>
            </div>
          </div>
          <div className="mt-6">
            <BarChart label="Purchases by category" data={ACCOUNT_METRICS.categorySplit} />
          </div>
        </div>

        <div className="border border-border bg-surface p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-h4 font-medium">Studio Concierge & Support</h3>
                <p className="text-meta text-muted-foreground mt-0.5">
                  Direct assistance for your bespoke orders
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-body-sm text-muted-foreground">
              <p>
                Every piece is made to order in our European partner print facilities, using organic
                heavyweight cotton and archival pigment inks.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="border border-border bg-surface-2 p-3">
                  <p className="text-label text-[10px] uppercase text-gold">Production ETA</p>
                  <p className="text-body font-medium mt-1">2–4 business days</p>
                </div>
                <div className="border border-border bg-surface-2 p-3">
                  <p className="text-label text-[10px] uppercase text-gold">Express Shipping</p>
                  <p className="text-body font-medium mt-1">DHL / PostNL tracking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 pt-4 border-t border-border">
            <Button asChild variant="secondary" size="sm">
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/faq">Read Studio FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
