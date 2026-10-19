import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { Mockup } from "@/components/store/Mockup";
import { Field, Notice, Timeline } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { ORDERS as INITIAL_SAMPLE_ORDERS, type Order } from "@/lib/account-data";
import { orderService } from "@/lib/services/order-service";
import { designBySlug } from "@/lib/catalog";
import { Truck, Check, MapPin, Package, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Order Tracking | Atelier Noir" },
      {
        name: "description",
        content: "Follow your made-to-order parcel from production to your door.",
      },
      { property: "og:title", content: "Order Tracking | Atelier Noir" },
      {
        property: "og:description",
        content: "Follow your made-to-order parcel from production to your door.",
      },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { format, user } = useStore();
  const [query, setQuery] = useState("ZOAL-2026-00124");
  const [orderList, setOrderList] = useState<Order[]>(INITIAL_SAMPLE_ORDERS);
  const [order, setOrder] = useState<Order>(INITIAL_SAMPLE_ORDERS[0]!);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const stepsList = [
    "Order Placed",
    "Payment Confirmed",
    "Sent to Production",
    "In Production",
    "Shipped",
    "Delivered",
  ];

  useEffect(() => {
    orderService.getOrdersForUser(user?.id || "", user?.email).then((records) => {
      if (records.length > 0) {
        const mapped = records.map(orderService.mapRecordToUIOrder);
        setOrderList(mapped);
        setOrder(mapped[0]!);
      }
    });
  }, [user]);

  const track = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const record = await orderService.getOrderByIdOrNumber(query.trim());
      if (!record) {
        setError(
          "We can't find that order number. Please verify your reference (e.g. ZOAL-2026-00124 or AN-2026-00184).",
        );
        return;
      }
      setError(null);
      const mapped = orderService.mapRecordToUIOrder(record);
      setOrder(mapped);
      setOrderList((prev) => (prev.some((o) => o.id === mapped.id) ? prev : [mapped, ...prev]));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Real-Time Tracking"
        title="Order Tracking"
        intro="Enter your order reference to follow production, printing, and delivery milestones."
        trail={[{ label: "Account", to: "/account" }, { label: "Orders" }]}
      />

      <section className="section container-page max-w-4xl space-y-10">
        {/* Tracking form */}
        <div className="border border-border bg-surface p-6 sm:p-8">
          <form className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={track}>
            <Field
              label="Order Reference Number"
              id="order-no"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ZOAL-2026-00124 or AN-2026-00184"
              error={error || undefined}
            />
            <Button
              className="h-12 self-end uppercase text-xs tracking-wider px-6"
              type="submit"
              loading={loading}
            >
              Track Order
            </Button>
          </form>

          <p className="text-meta text-xs text-muted-foreground mt-3">
            Demo quick numbers:{" "}
            <button
              type="button"
              onClick={() => setQuery("ZOAL-2026-00124")}
              className="text-gold underline"
            >
              ZOAL-2026-00124
            </button>{" "}
            ·{" "}
            <button
              type="button"
              onClick={() => setQuery("AN-2026-00184")}
              className="text-gold underline"
            >
              AN-2026-00184
            </button>{" "}
            ·{" "}
            <button
              type="button"
              onClick={() => setQuery("AN-2026-00151")}
              className="text-gold underline"
            >
              AN-2026-00151
            </button>
          </p>
        </div>

        {/* Active Tracked Order Display */}
        {order && (
          <div className="border border-border bg-surface p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-label text-gold text-xs uppercase tracking-wider font-semibold">
                    Order Reference
                  </span>
                  <span className="text-border">·</span>
                  <span className="text-meta text-muted-foreground">Placed {order.placed}</span>
                </div>
                <h2 className="text-h3 font-medium mt-1">#{order.id}</h2>
              </div>
              <div>
                <span className="text-label px-3.5 py-1.5 bg-surface-2 border border-gold text-gold font-medium text-xs">
                  {order.statusLabel || (order.step === 6 ? "Delivered" : "In Production")}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-label uppercase text-xs font-semibold text-muted-foreground mb-4">
                Production & Delivery Milestone Timeline
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 border border-border bg-surface-2/40 p-5">
                {stepsList.map((stepName, i) => {
                  const isCompleted = order.step > i;
                  const isCurrent = order.step === i;
                  const isUpcoming = order.step < i;

                  return (
                    <div key={stepName} className="flex flex-col items-center text-center">
                      <div
                        className={cn(
                          "grid size-8 place-items-center border text-xs font-medium transition-colors mb-2",
                          isCompleted && "border-gold bg-gold text-background",
                          isCurrent && "border-gold text-gold ring-2 ring-gold/20 animate-pulse",
                          isUpcoming && "border-border text-muted-foreground bg-surface",
                        )}
                      >
                        {isCompleted ? <Check className="size-4" /> : i + 1}
                      </div>
                      <p
                        className={cn(
                          "text-xs font-medium leading-tight",
                          isCompleted && "text-foreground",
                          isCurrent && "text-gold font-semibold",
                          isUpcoming && "text-muted-foreground",
                        )}
                      >
                        {stepName}
                      </p>
                      <span className="text-[10px] text-muted-foreground mt-1">
                        {isCompleted ? "Done" : isCurrent ? "Active" : "Upcoming"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div>
              <p className="text-label uppercase text-xs font-semibold text-muted-foreground mb-4">
                Articles in this shipment ({order.items.length})
              </p>
              <div className="divide-y divide-border border-y border-border">
                {order.items.map((item, idx) => {
                  const design = designBySlug(item.designSlug);
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-4 py-4"
                    >
                      <div className="aspect-square border border-border bg-surface-2">
                        {design && (
                          <Mockup
                            design={design}
                            productId={item.productId}
                            colorValue={item.colorValue}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-label text-[10px] uppercase tracking-wider text-gold truncate">
                          {item.designName}
                        </p>
                        <h4 className="text-body-sm font-medium truncate mt-0.5">
                          {item.productName}
                        </h4>
                        <p className="text-meta text-muted-foreground mt-0.5">
                          {item.color} {item.size ? `· Size ${item.size}` : ""} · Qty {item.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-price font-medium text-body-sm">
                          {format(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-border p-5">
                <p className="text-label uppercase tracking-wider text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                  <Truck className="size-3.5 text-gold" /> Carrier & Transit
                </p>
                <div className="space-y-1 text-body-sm">
                  <p>
                    <span className="text-muted-foreground">Carrier:</span>{" "}
                    <strong className="text-foreground">{order.carrier}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Tracking ID:</span>{" "}
                    <span className="font-mono text-gold">{order.tracking}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">ETA:</span> {order.eta}
                  </p>
                </div>
              </div>

              <div className="border border-border p-5">
                <p className="text-label uppercase tracking-wider text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                  <MapPin className="size-3.5 text-gold" /> Destination
                </p>
                <address className="text-body-sm not-italic space-y-0.5 text-muted-foreground">
                  {order.address.map((line, lIdx) => (
                    <div key={lIdx} className={lIdx === 0 ? "font-medium text-foreground" : ""}>
                      {line}
                    </div>
                  ))}
                </address>
              </div>
            </div>

            {/* Support Box */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border bg-surface-2/60 p-5">
              <div>
                <p className="text-label uppercase tracking-wider text-xs font-semibold">
                  Need help with this shipment?
                </p>
                <p className="text-meta text-muted-foreground mt-0.5">
                  Our concierge team can assist with delivery instructions or courier updates.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <Button asChild variant="secondary" size="sm">
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/faq">View FAQ</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
