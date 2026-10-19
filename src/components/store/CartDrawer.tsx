import { Link } from "@tanstack/react-router";
import { Minus, Plus, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStore } from "./store";
import { designBySlug } from "@/lib/catalog";
import { Mockup } from "./Mockup";

const FREE_SHIPPING_THRESHOLD = 80;

export function QuantitySelector({
  qty,
  onChange,
  compact,
}: {
  qty: number;
  onChange: (n: number) => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center border border-border">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
        className="grid size-10 place-items-center hover:text-gold disabled:opacity-40 transition-colors"
        disabled={qty <= 1}
      >
        <Minus className="size-3.5" />
      </button>
      <span
        className="text-price grid min-w-8 place-items-center text-xs font-medium"
        aria-live="polite"
        aria-label={`Quantity ${qty}`}
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className="grid size-10 place-items-center hover:text-gold transition-colors"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeLine, undoRemove, cartTotal, format, region } =
    useStore();
  if (!cartOpen) return null;

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const freeProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleRemove = (id: string, name: string) => {
    removeLine(id);
    toast("Item removed", {
      action: {
        label: "UNDO",
        onClick: () => {
          undoRemove();
          toast.success("Item restored");
        },
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart drawer"
    >
      <button
        type="button"
        aria-label="Close cart drawer"
        onClick={() => setCartOpen(false)}
        className="fade-in-soft absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md translate-x-0 flex-col border-l border-border bg-surface shadow-2xl duration-300 animate-in slide-in-from-right">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2">
            <h2 className="text-label tracking-[0.14em] uppercase">Your bag</h2>
            <span className="text-meta text-muted-foreground">({cart.length})</span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart drawer"
            className="grid size-10 place-items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </header>

        {/* Free Shipping Alert Bar */}
        {cart.length > 0 && (
          <div className="border-b border-border bg-surface/50 px-5 py-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="size-3.5 text-gold shrink-0" />
              {remainingForFree > 0 ? (
                <span>
                  Add <strong className="text-foreground">{format(remainingForFree)}</strong> for
                  free delivery.
                </span>
              ) : (
                <span className="text-gold font-medium">Free delivery unlocked!</span>
              )}
            </div>
            <div className="mt-2 h-1 w-full bg-border">
              <div
                className="h-full bg-gold transition-[width] duration-300"
                style={{ width: `${freeProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart items list or empty state */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="size-16 border border-border bg-surface/60 grid place-items-center mb-1">
              <span className="text-gold font-[family-name:var(--font-display)] text-lg">AN</span>
            </div>
            <p className="text-h3 font-normal">Your bag is waiting.</p>
            <p className="text-body text-muted-foreground text-sm max-w-xs">
              Discover a design and make it yours. Every piece is crafted on demand.
            </p>
            <div className="mt-2 flex flex-col w-full gap-2.5">
              <Button asChild size="block" onClick={() => setCartOpen(false)}>
                <Link to="/designs">Explore designs</Link>
              </Button>
              <Button asChild variant="secondary" size="block" onClick={() => setCartOpen(false)}>
                <Link to="/shop">Shop best sellers</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {cart.map((line, idx) => {
                const design = designBySlug(line.designSlug);
                const sameDesignCount = cart.filter((c) => c.designSlug === line.designSlug).length;
                const isFirstOfDesign =
                  cart.findIndex((c) => c.designSlug === line.designSlug) === idx;

                return (
                  <li key={line.id} className="py-4">
                    {isFirstOfDesign && sameDesignCount > 1 && (
                      <div className="mb-2.5 flex items-center justify-between border-b border-border/60 pb-1.5">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-medium">
                          Design: {line.designName}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {sameDesignCount} pieces in bag
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-4">
                      <div className="aspect-square border border-border bg-surface">
                        {design ? (
                          <Mockup
                            design={design}
                            productId={line.productId}
                            colorValue={line.colorValue}
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                          <div className="min-w-0">
                            <p className="text-label tracking-[0.14em] text-gold uppercase text-[10px] truncate">
                              {line.designName}
                            </p>
                            <p className="text-body-sm font-medium truncate mt-0.5">
                              {line.productName}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(line.id, `${line.designName} ${line.productName}`)
                            }
                            aria-label={`Remove ${line.designName} ${line.productName}`}
                            className="grid size-8 place-items-center text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <p className="text-meta mt-1 text-muted-foreground">
                          {line.color}
                          {line.size ? ` · Size ${line.size}` : ""}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <QuantitySelector qty={line.qty} onChange={(n) => setQty(line.id, n)} />
                          <span className="text-price font-medium">
                            {format(line.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Footer */}
            <footer className="border-t border-border px-5 py-5 bg-surface/40">
              <div className="flex items-baseline justify-between">
                <span className="text-label uppercase tracking-wider">Subtotal</span>
                <span className="text-price text-base font-semibold">{format(cartTotal)}</span>
              </div>
              <p className="text-meta mt-1.5 text-muted-foreground">
                {region.taxNote} · Ships to {region.country} in {region.delivery}
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button
                  asChild
                  size="block"
                  className="h-12 text-xs font-semibold uppercase tracking-wider"
                  onClick={() => setCartOpen(false)}
                >
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="block"
                  className="h-12 text-xs font-semibold uppercase tracking-wider"
                  onClick={() => setCartOpen(false)}
                >
                  <Link to="/cart">View bag</Link>
                </Button>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="text-label link-underline mt-2 text-center text-xs text-muted-foreground hover:text-foreground"
                >
                  Continue shopping
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
