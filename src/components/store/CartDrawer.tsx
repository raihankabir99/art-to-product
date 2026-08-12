import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "./store";
import { designBySlug } from "@/lib/catalog";
import { Mockup } from "./Mockup";

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
        className="grid size-11 place-items-center hover:text-gold disabled:opacity-40"
        disabled={qty <= 1}
      >
        <Minus className="size-3.5" />
      </button>
      <span
        className="text-price grid min-w-8 place-items-center"
        aria-live="polite"
        aria-label={`Quantity ${qty}`}
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className={`grid size-11 place-items-center hover:text-gold ${compact ? "" : ""}`}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeLine, cartTotal, format, region } = useStore();
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        type="button"
        aria-label="Close bag"
        onClick={() => setCartOpen(false)}
        className="fade-in-soft absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md translate-x-0 flex-col border-l border-border bg-surface shadow-2xl duration-400 animate-in slide-in-from-right">
        <header className="flex h-16 items-center justify-between border-b border-border px-5">
          <h2 className="text-label">Your bag ({cart.length})</h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close bag"
            className="grid size-11 place-items-center hover:text-gold"
          >
            <X className="size-5" />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <p className="text-h3">Your bag is empty</p>
            <p className="text-body text-muted-foreground">
              Every piece is made after you order it. Start with a design.
            </p>
            <Button asChild variant="secondary" onClick={() => setCartOpen(false)}>
              <Link to="/designs">Explore designs</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {cart.map((line) => {
                const design = designBySlug(line.designSlug);
                return (
                  <li key={line.id} className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 py-5">
                    <div className="border border-border">
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
                          <p className="text-h4 truncate">{line.productName}</p>
                          <p className="text-meta truncate">{line.designName}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.id)}
                          aria-label={`Remove ${line.designName} ${line.productName}`}
                          className="grid size-8 place-items-center text-muted-foreground hover:text-foreground"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <p className="text-meta mt-2">
                        {line.color}
                        {line.size ? ` · ${line.size}` : ""}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <QuantitySelector qty={line.qty} onChange={(n) => setQty(line.id, n)} />
                        <span className="text-price">{format(line.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-border px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-label">Subtotal</span>
                <span className="text-price text-base">{format(cartTotal)}</span>
              </div>
              <p className="text-meta mt-2">
                {region.taxNote} · Shipping to {region.country} in {region.delivery}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild size="block" onClick={() => setCartOpen(false)}>
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <Button asChild variant="secondary" size="block" onClick={() => setCartOpen(false)}>
                  <Link to="/cart">View bag</Link>
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
