import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { ProductCard } from "@/components/store/cards";
import { useStore } from "@/components/store/store";
import { orderService } from "@/lib/services/order-service";
import type { OrderRecord } from "@/lib/supabase/types";
import { DESIGNS, designBySlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface OrderConfirmationSearch {
  orderId?: string;
}

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>): OrderConfirmationSearch => {
    return {
      orderId: (search.orderId as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Order Confirmed | Atelier Noir" },
      {
        name: "description",
        content: "Thank you for your order. Your custom piece is queued for studio production.",
      },
    ],
  }),
  component: OrderConfirmationPage,
});

const ORDER_STEPS = [
  { label: "Order confirmed", desc: "Received & queued" },
  { label: "Processing", desc: "Digital prep & QC" },
  { label: "In production", desc: "Made-to-order craft" },
  { label: "Shipped", desc: "Handed to courier" },
  { label: "Delivered", desc: "At your door" },
];

function OrderConfirmationPage() {
  const { orderId } = Route.useSearch();
  const { format, user } = useStore();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        if (orderId) {
          const found = await orderService.getOrderByIdOrNumber(orderId);
          if (found) {
            setOrder(found);
            return;
          }
        }
        // Fallback to most recent order or sample
        const initial = orderService.getInitialOrders();
        if (initial.length > 0) {
          setOrder(initial[0]!);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const orderNumber = order?.order_number || orderId || "AN-2026-00184";
  const customerEmail = order?.customer_email || user?.email || "customer@example.com";
  const recommendations = DESIGNS.slice(0, 4);

  // Default active step: 1 (Processing)
  const currentStep = order?.step_index !== undefined ? Math.min(order.step_index, 4) : 1;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 lg:py-20">
      <div className="container-page max-w-4xl">
        {/* Success Header */}
        <div className="text-center">
          <div className="inline-grid size-16 place-items-center rounded-none border border-gold bg-gold/10 text-gold mb-6">
            <CheckCircle2 className="size-8" />
          </div>
          <p className="text-label tracking-[0.24em] text-gold uppercase">Order Confirmed</p>
          <h1 className="text-h1 mt-2">Thank you for your order.</h1>
          <p className="text-body mt-3 text-muted-foreground max-w-md mx-auto">
            We have received your order and queued it for our studio artisans.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 border border-border bg-surface/30 px-6 py-3 text-body-sm">
            <span>
              Order <strong className="text-foreground font-mono">{orderNumber}</strong>
            </span>
            <span className="text-muted-foreground select-none">·</span>
            <span className="text-muted-foreground">
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-meta text-muted-foreground">
            <Mail className="size-4 text-gold shrink-0" />
            <span>
              A confirmation message will be sent to:{" "}
              <strong className="text-foreground">{customerEmail}</strong>
            </span>
          </div>
        </div>

        {/* Visual Order Progress Component */}
        <div className="mt-14 border border-border bg-surface/20 p-6 sm:p-8">
          <h2 className="text-label tracking-[0.16em] uppercase mb-6 text-muted-foreground">
            Order status preview
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {ORDER_STEPS.map((s, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div
                  key={s.label}
                  className="relative flex flex-col items-start sm:items-center text-left sm:text-center"
                >
                  <div
                    className={cn(
                      "grid size-8 place-items-center border text-xs font-semibold mb-2 transition-colors",
                      isCurrent
                        ? "border-gold bg-gold text-gold-foreground"
                        : isPast
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground bg-surface",
                    )}
                  >
                    {isPast ? <CheckCircle2 className="size-4" /> : idx + 1}
                  </div>
                  <p
                    className={cn(
                      "text-body-sm font-medium",
                      isCurrent ? "text-gold" : "text-foreground",
                    )}
                  >
                    {s.label}
                  </p>
                  <p className="text-meta text-muted-foreground text-[11px] mt-0.5">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Summary Snapshot */}
        <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          {/* Items Purchased */}
          <div className="border border-border p-6 bg-surface/30">
            <h3 className="text-label tracking-[0.16em] uppercase mb-4">Purchased pieces</h3>

            {order?.items && order.items.length > 0 ? (
              <ul className="divide-y divide-border border-y border-border">
                {order.items.map((item) => {
                  const design = designBySlug(item.design_slug);
                  return (
                    <li
                      key={item.id}
                      className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 py-4"
                    >
                      <div className="aspect-square border border-border bg-surface">
                        {design && (
                          <Mockup
                            design={design}
                            productId={item.product_type_id}
                            colorValue={item.color_value}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-body-sm font-medium truncate">{item.product_name}</p>
                        <p className="text-meta text-gold truncate text-[11px] uppercase tracking-wider">
                          {item.design_name}
                        </p>
                        <p className="text-meta text-muted-foreground mt-0.5">
                          {item.color_name}
                          {item.size ? ` · ${item.size}` : ""} · ×{item.quantity}
                        </p>
                      </div>
                      <span className="text-price text-body-sm font-medium">
                        {format(item.total_price_eur)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-meta text-muted-foreground">
                Order details loaded from studio registry.
              </p>
            )}

            {/* Financial Breakdown */}
            <dl className="mt-6 space-y-2.5 text-body-sm border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-price">{format(order?.subtotal_eur || 69.98)}</span>
              </div>
              {order?.discount_eur && order.discount_eur > 0 ? (
                <div className="flex justify-between text-gold">
                  <span>Discount</span>
                  <span className="text-price">−{format(order.discount_eur)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping ({order?.shipping_carrier || "DHL Express"})</span>
                <span className="text-price">
                  {order?.shipping_eur === 0 ? "Free" : format(order?.shipping_eur || 0)}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-3 border-t border-border/60">
                <span className="text-label uppercase">Total paid</span>
                <span className="text-price text-lg">{format(order?.total_eur || 69.98)}</span>
              </div>
            </dl>
          </div>

          {/* Delivery & Payment Info */}
          <div className="space-y-6">
            {/* Delivery address */}
            <div className="border border-border p-6 bg-surface/30">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-4 text-gold" />
                <h4 className="text-label uppercase tracking-wider">Shipping address</h4>
              </div>
              <p className="text-body-sm font-medium">
                {order?.shipping_address?.first_name || "Ada"}{" "}
                {order?.shipping_address?.last_name || "Lindqvist"}
              </p>
              <p className="text-meta text-muted-foreground mt-1">
                {order?.shipping_address?.lines?.join(", ") || "Keizersgracht 421"}
              </p>
              <p className="text-meta text-muted-foreground">
                {order?.shipping_address?.city || "Amsterdam"},{" "}
                {order?.shipping_address?.postal_code || "1016 HD"}
              </p>
              <p className="text-meta text-muted-foreground">
                {order?.shipping_address?.country || "Netherlands"}
              </p>
            </div>

            {/* Delivery Method */}
            <div className="border border-border p-6 bg-surface/30">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="size-4 text-gold" />
                <h4 className="text-label uppercase tracking-wider">Delivery method</h4>
              </div>
              <p className="text-body-sm font-medium">
                {order?.shipping_carrier || "DHL Express"} —{" "}
                {order?.shipping_method === "express" ? "Express Courier" : "Standard Delivery"}
              </p>
              <p className="text-meta text-muted-foreground mt-1">
                Estimated arrival: {order?.estimated_delivery || "3–5 business days"}
              </p>
              <p className="text-meta text-muted-foreground mt-0.5">
                Tracking:{" "}
                <span className="font-mono text-foreground">
                  {order?.tracking_number || "AN84918231"}
                </span>
              </p>
            </div>

            {/* Payment Summary */}
            <div className="border border-border p-6 bg-surface/30">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="size-4 text-gold" />
                <h4 className="text-label uppercase tracking-wider">Payment</h4>
              </div>
              <p className="text-body-sm font-medium">Encrypted Card Payment</p>
              <p className="text-meta text-muted-foreground mt-1">
                Status: <span className="text-gold font-medium uppercase">Confirmed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 border-t border-border pt-8">
          <Button asChild size="lg" className="px-8 font-semibold tracking-wider uppercase">
            <Link to="/orders">Track your order</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="px-8 font-semibold tracking-wider uppercase"
          >
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>

        {/* Recommendations After Purchase */}
        <div className="mt-20 border-t border-border pt-12">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-label tracking-[0.2em] text-gold uppercase">You may also like</p>
              <h3 className="text-h2 mt-1">Complete the look</h3>
            </div>
            <Link to="/shop" className="text-label link-underline hidden sm:inline-block">
              Explore collection <ArrowRight className="inline size-3 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {recommendations.map((d) => (
              <ProductCard key={d.slug} design={d} productId={d.products[0] ?? "tshirt"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
