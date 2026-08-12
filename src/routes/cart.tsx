import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { EmptyState } from "@/components/store/cards";
import { Mockup } from "@/components/store/Mockup";
import { QuantitySelector } from "@/components/store/CartDrawer";
import { useStore } from "@/components/store/store";
import { designBySlug } from "@/lib/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | Atelier Noir" },
      { name: "description", content: "Review the pieces in your bag before checkout. Made to order and shipped worldwide." },
      { property: "og:title", content: "Your Bag | Atelier Noir" },
      { property: "og:description", content: "Review the pieces in your bag before checkout. Made to order and shipped worldwide." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, setQty, removeLine, cartTotal, format, region } = useStore();
  const shipping = cartTotal > 80 || cart.length === 0 ? 0 : 6.9;
  return (
    <>
      <PageHero title="Your bag" trail={[{ label: "Bag" }]} />
      <section className="section container-page">
        {cart.length === 0 ? (
          <EmptyState title="Your bag is empty" body="Nothing here yet. Start from a design and choose how you want it made." action={<Button asChild><Link to="/designs">Explore designs</Link></Button>} />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <ul className="divide-y divide-border border-y border-border">
              {cart.map((line) => {
                const design = designBySlug(line.designSlug);
                return (
                  <li key={line.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 py-6 sm:grid-cols-[120px_minmax(0,1fr)]">
                    <div className="border border-border">
                      {design ? <Mockup design={design} productId={line.productId} colorValue={line.colorValue} /> : null}
                    </div>
                    <div className="min-w-0">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                        <div className="min-w-0">
                          <h2 className="text-h4 truncate">{line.designName} — {line.productName}</h2>
                          <p className="text-meta mt-1">{line.color}{line.size ? ` · ${line.size}` : ""}</p>
                        </div>
                        <button type="button" onClick={() => removeLine(line.id)} aria-label="Remove item" className="grid size-11 place-items-center text-muted-foreground hover:text-foreground">
                          <X className="size-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <QuantitySelector qty={line.qty} onChange={(n) => setQty(line.id, n)} />
                        <span className="text-price">{format(line.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
              <h2 className="text-label">Summary</h2>
              <dl className="mt-6 space-y-3">
                <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Subtotal</dt><dd className="text-price">{format(cartTotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Shipping</dt><dd className="text-price">{shipping === 0 ? "Free" : format(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Tax</dt><dd className="text-meta">{region.taxNote}</dd></div>
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
                <span className="text-label">Total</span>
                <span className="text-price text-lg">{format(cartTotal + shipping)}</span>
              </div>
              <Button asChild size="block" className="mt-6"><Link to="/checkout">Checkout</Link></Button>
              <p className="text-meta mt-4">Delivery to {region.country} in {region.delivery}.</p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
