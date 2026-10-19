import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Truck, PackageOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { designBySlug } from "@/lib/catalog";
import type { Order } from "@/lib/account-data";
import { cn } from "@/lib/utils";

type FilterStatus = "All" | "Processing" | "In Production" | "Shipped" | "Delivered" | "Cancelled";

export function AccountOrders({
  orders,
  format,
  onViewOrder,
}: {
  orders: Order[];
  format: (n: number) => string;
  onViewOrder: (order: Order) => void;
}) {
  const [filter, setFilter] = useState<FilterStatus>("All");

  const filterOptions: FilterStatus[] = [
    "All",
    "Processing",
    "In Production",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((o) => {
    if (filter === "All") return true;
    if (filter === "Processing") return o.step === 0 || o.step === 1;
    if (filter === "In Production") return o.step === 2 || o.step === 3;
    if (filter === "Shipped") return o.step === 4 || o.step === 5;
    if (filter === "Delivered") return o.step === 6;
    if (filter === "Cancelled") return o.step === -1;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header & Status Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-h3 font-medium">My Orders</h2>
          <p className="text-meta text-muted-foreground mt-1">
            Track your handcrafted print-on-demand orders from placement to doorstep.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => {
            const count = orders.filter((o) => {
              if (opt === "All") return true;
              if (opt === "Processing") return o.step === 0 || o.step === 1;
              if (opt === "In Production") return o.step === 2 || o.step === 3;
              if (opt === "Shipped") return o.step === 4 || o.step === 5;
              if (opt === "Delivered") return o.step === 6;
              if (opt === "Cancelled") return o.step === -1;
              return true;
            }).length;

            const active = filter === opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => setFilter(opt)}
                className={cn(
                  "text-label text-xs uppercase tracking-wider px-3.5 py-2 border transition-all",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {opt}{" "}
                <span className={cn("ml-1", active ? "opacity-70" : "text-muted-foreground")}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List / Cards */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusText =
              order.statusLabel ||
              (order.step === 6
                ? "Delivered"
                : order.step === -1
                  ? "Cancelled"
                  : order.step >= 4
                    ? "Shipped"
                    : order.step >= 2
                      ? "In Production"
                      : "Processing");

            const isCancelled = order.step === -1;
            const isDelivered = order.step === 6;

            return (
              <div
                key={order.id}
                className="border border-border bg-surface p-6 transition-all hover:border-border-strong"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-h4 font-medium">#{order.id}</span>
                    <span className="text-border">·</span>
                    <span className="text-meta text-muted-foreground">Placed {order.placed}</span>
                    <span className="text-border">·</span>
                    <span className="text-meta text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "text-label text-xs uppercase px-3 py-1 border font-medium",
                        isCancelled
                          ? "border-destructive/40 text-destructive bg-destructive/5"
                          : isDelivered
                            ? "border-border text-muted-foreground bg-surface-2"
                            : "border-gold text-gold bg-gold/5",
                      )}
                    >
                      {statusText}
                    </span>
                    <span className="text-price font-medium text-base sm:ml-4">
                      {format(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="py-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-center">
                  <div className="flex flex-wrap gap-4 items-center">
                    {order.items.map((item, idx) => {
                      const design = designBySlug(item.designSlug);
                      return (
                        <div key={idx} className="flex items-center gap-3 pr-4">
                          <div className="size-16 shrink-0 border border-border bg-surface-2 overflow-hidden">
                            {design ? (
                              <Mockup
                                design={design}
                                productId={item.productId}
                                colorValue={item.colorValue}
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 max-w-[200px]">
                            <p className="text-label text-[10px] uppercase tracking-wider text-gold truncate">
                              {item.designName}
                            </p>
                            <p className="text-body-sm font-medium truncate mt-0.5">
                              {item.productName}
                            </p>
                            <p className="text-meta text-muted-foreground text-xs">
                              {item.color} {item.size ? `· ${item.size}` : ""} · Qty {item.qty}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2.5 sm:justify-end pt-2 md:pt-0">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => onViewOrder(order)}
                      className="gap-1.5"
                    >
                      <Eye className="size-3.5" /> View Order
                    </Button>
                    {!isCancelled && (
                      <Button asChild size="sm" className="gap-1.5">
                        <Link to="/orders">
                          <Truck className="size-3.5" /> Track Package
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Delivery Note */}
                <div className="border-t border-border pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-meta text-muted-foreground gap-2">
                  <p>
                    Carrier: <span className="text-foreground">{order.carrier}</span> · Tracking:{" "}
                    <span className="font-mono text-foreground">{order.tracking}</span>
                  </p>
                  <p className="sm:text-right">
                    {isDelivered ? `Delivered: ${order.eta}` : `Estimated Arrival: ${order.eta}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-border bg-surface p-12 text-center space-y-4">
          <PackageOpen className="size-10 mx-auto text-muted-foreground/60" />
          <h3 className="text-h3 font-medium">No orders found</h3>
          <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
            {filter === "All"
              ? "You have not placed any print-on-demand studio orders yet."
              : `You have no orders matching the "${filter}" filter.`}
          </p>
          {filter !== "All" ? (
            <Button variant="secondary" onClick={() => setFilter("All")}>
              View All Orders
            </Button>
          ) : (
            <Button asChild className="mt-2">
              <Link to="/shop">Explore Curated Designs</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
