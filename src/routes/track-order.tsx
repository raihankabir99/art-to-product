import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Check,
  AlertTriangle,
  Package,
  MapPin,
  Calendar,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { Mockup } from "@/components/store/Mockup";
import { Field } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { ORDERS, type Order } from "@/lib/account-data";
import { designBySlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Your Order | Atelier Noir" },
      {
        name: "description",
        content: "Track your print-on-demand bespoke apparel and prints in real-time.",
      },
    ],
  }),
  component: TrackOrderPage,
});

function TrackOrderPage() {
  const { format } = useStore();
  const [orderNumber, setOrderNumber] = useState("ZOAL-2026-00124");
  const [email, setEmail] = useState("alex.rivera@example.com");
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(ORDERS[0] || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stepsList = [
    "Order Placed",
    "Payment Confirmed",
    "Sent to Production",
    "In Production",
    "Shipped",
    "Delivered",
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanNumber = orderNumber.trim().toUpperCase();
    if (!cleanNumber) {
      setErrorMsg("Please provide an order number (e.g. ZOAL-2026-00124 or AN-2026-00184).");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = ORDERS.find(
        (o) =>
          o.id.toUpperCase() === cleanNumber ||
          o.id.toUpperCase().includes(cleanNumber) ||
          cleanNumber.includes(o.id.toUpperCase()),
      );

      if (found) {
        setTrackedOrder(found);
      } else {
        // Fallback to first order as realistic simulated match
        setTrackedOrder({
          ...ORDERS[0],
          id: cleanNumber.startsWith("#") ? cleanNumber.slice(1) : cleanNumber,
        });
      }
    }, 450);
  };

  return (
    <>
      <PageHero
        eyebrow="Order Tracking"
        title="Follow Your Creation"
        intro="Enter your order reference and email address to follow your custom artwork through production, archival printing, and courier delivery."
        trail={[{ label: "Account", to: "/account" }, { label: "Track Order" }]}
      />

      <section className="section container-page max-w-4xl space-y-12">
        {/* Tracking Search Card */}
        <div className="border border-border bg-surface p-6 sm:p-8">
          <form onSubmit={handleTrack} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Order Number *"
                placeholder="ZOAL-2026-00124"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
              <Field
                label="Account Email *"
                type="email"
                placeholder="alex.rivera@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-3 border border-destructive/50 bg-destructive/10 p-4 text-destructive text-body-sm">
                <AlertTriangle className="size-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-meta text-xs text-muted-foreground">
                Example demo orders: <strong className="text-foreground">ZOAL-2026-00124</strong> or{" "}
                <strong className="text-foreground">AN-2026-00184</strong>
              </p>
              <Button
                type="submit"
                loading={loading}
                className="uppercase tracking-wider text-xs px-8 h-12"
              >
                Track Order
              </Button>
            </div>
          </form>
        </div>

        {/* Tracked Order Result */}
        {trackedOrder && (
          <div className="border border-border bg-surface p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-label text-gold text-xs uppercase tracking-wider font-semibold">
                    Order Found
                  </span>
                  <span className="text-border">·</span>
                  <span className="text-meta text-muted-foreground">
                    Placed {trackedOrder.placed}
                  </span>
                </div>
                <h2 className="text-h3 font-medium mt-1">#{trackedOrder.id}</h2>
              </div>
              <div>
                <span className="text-label px-3.5 py-1.5 bg-surface-2 border border-gold text-gold font-medium text-xs">
                  {trackedOrder.statusLabel ||
                    (trackedOrder.step === 6 ? "Delivered" : "In Production")}
                </span>
              </div>
            </div>

            {/* Production Timeline */}
            <div>
              <p className="text-label uppercase text-xs font-semibold text-muted-foreground mb-4">
                Status Timeline
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 border border-border bg-surface-2/40 p-5">
                {stepsList.map((stepName, i) => {
                  const isCompleted = trackedOrder.step > i;
                  const isCurrent = trackedOrder.step === i;
                  const isUpcoming = trackedOrder.step < i;

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
                        {isCompleted ? "Completed" : isCurrent ? "Current Step" : "Upcoming"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Products in Package */}
            <div>
              <p className="text-label uppercase text-xs font-semibold text-muted-foreground mb-4">
                Package Contents ({trackedOrder.items.length})
              </p>
              <div className="divide-y divide-border border-y border-border">
                {trackedOrder.items.map((item, idx) => {
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

            {/* Courier & Destination Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-border p-5">
                <p className="text-label uppercase tracking-wider text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                  <Truck className="size-3.5 text-gold" /> Courier & Shipping
                </p>
                <div className="space-y-1.5 text-body-sm">
                  <p>
                    <span className="text-muted-foreground">Carrier:</span>{" "}
                    <strong className="font-medium text-foreground">{trackedOrder.carrier}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Tracking Number:</span>{" "}
                    <span className="font-mono text-gold">{trackedOrder.tracking}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Estimated Delivery:</span>{" "}
                    <span className="text-foreground">{trackedOrder.eta}</span>
                  </p>
                </div>
              </div>

              <div className="border border-border p-5">
                <p className="text-label uppercase tracking-wider text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                  <MapPin className="size-3.5 text-gold" /> Destination Address
                </p>
                <address className="text-body-sm not-italic space-y-0.5 text-muted-foreground">
                  {trackedOrder.address.map((line, lIdx) => (
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
                  Need assistance with delivery or custom requests?
                </p>
                <p className="text-meta text-muted-foreground mt-0.5">
                  Our Amsterdam studio concierge is on hand to answer questions or update delivery
                  instructions.
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
