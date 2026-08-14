import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { EmptyState, ProductCard } from "@/components/store/cards";
import { Mockup } from "@/components/store/Mockup";
import { QuantitySelector } from "@/components/store/CartDrawer";
import { Field, Notice } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { DESIGNS, designBySlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

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

const FREE_SHIPPING = 80;

function Cart() {
  const {
    cart, setQty, removeLine, cartTotal, format, region,
    saved, saveForLater, moveToBag, removeSaved,
    pendingLines, coupon, couponError, applyCoupon, clearCoupon, discount,
  } = useStore();
  const [code, setCode] = useState("");

  const shipping = cartTotal - discount > FREE_SHIPPING || cart.length === 0 ? 0 : 6.9;
  const remaining = Math.max(0, FREE_SHIPPING - (cartTotal - discount));
  const progress = Math.min(100, ((cartTotal - discount) / FREE_SHIPPING) * 100);
  const suggestions = DESIGNS.slice(0, 4);

  return (
    <>
      <PageHero title="Your bag" trail={[{ label: "Bag" }]} />
      <section className="section container-page">
        {cart.length === 0 && saved.length === 0 ? (
          <EmptyState
            title="Your bag is empty"
            body="Nothing here yet. Start from a design and choose how you want it made."
            action={<Button asChild><Link to="/designs">Explore designs</Link></Button>}
          />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              {cart.length > 0 ? (
                <div className="mb-8 border border-border p-5">
                  <p className="text-body-sm flex items-center gap-2">
                    <Truck className="size-4 text-gold" aria-hidden="true" />
                    {remaining > 0 ? <>Add {format(remaining)} for free delivery to {region.country}.</> : <>Free delivery to {region.country} unlocked.</>}
                  </p>
                  <span className="mt-4 block h-1 w-full bg-surface-2" aria-hidden="true">
                    <span className="block h-full bg-gold transition-[width] duration-500" style={{ width: `${progress}%` }} />
                  </span>
                </div>
              ) : null}

              <ul className="divide-y divide-border border-y border-border">
                {cart.map((line) => {
                  const design = designBySlug(line.designSlug);
                  const pending = pendingLines.includes(line.id);
                  return (
                    <li
                      key={line.id}
                      className={cn(
                        "grid grid-cols-[88px_minmax(0,1fr)] gap-5 py-6 transition-opacity sm:grid-cols-[120px_minmax(0,1fr)]",
                        pending && "opacity-60",
                      )}
                      aria-busy={pending}
                    >
                      <div className="border border-border">
                        {design ? <Mockup design={design} productId={line.productId} colorValue={line.colorValue} /> : null}
                      </div>
                      <div className="min-w-0">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                          <div className="min-w-0">
                            <h2 className="text-h4 truncate">{line.designName} — {line.productName}</h2>
                            <p className="text-meta mt-1">{line.color}{line.size ? ` · ${line.size}` : ""}</p>
                            <p className="text-meta mt-1">Made to order · ships in {region.delivery}</p>
                          </div>
                          <button type="button" onClick={() => removeLine(line.id)} aria-label={`Remove ${line.designName} ${line.productName}`} className="grid size-11 place-items-center text-muted-foreground hover:text-foreground">
                            <X className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <QuantitySelector qty={line.qty} onChange={(n) => setQty(line.id, n)} />
                          <span className="text-price">{format(line.price * line.qty)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => saveForLater(line.id)}
                          className="text-label link-underline mt-4 inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <Bookmark className="size-3.5" aria-hidden="true" /> Save for later
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {saved.length > 0 ? (
                <div className="mt-14">
                  <h2 className="text-h3">Saved for later</h2>
                  <ul className="mt-6 divide-y divide-border border-y border-border">
                    {saved.map((line) => {
                      const design = designBySlug(line.designSlug);
                      return (
                        <li key={line.id} className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-5 py-5">
                          <div className="border border-border">
                            {design ? <Mockup design={design} productId={line.productId} colorValue={line.colorValue} /> : null}
                          </div>
                          <div className="min-w-0">
                            <p className="text-h4 truncate">{line.designName} — {line.productName}</p>
                            <p className="text-meta mt-1">{line.color}{line.size ? ` · ${line.size}` : ""} · {format(line.price)}</p>
                            <div className="mt-3 flex flex-wrap gap-4">
                              <button type="button" onClick={() => moveToBag(line.id)} className="text-label link-underline min-h-11">Move to bag</button>
                              <button type="button" onClick={() => removeSaved(line.id)} className="text-label link-underline min-h-11 text-muted-foreground">Remove</button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>

            <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
              <h2 className="text-label">Summary</h2>
              <dl className="mt-6 space-y-3">
                <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Subtotal</dt><dd className="text-price">{format(cartTotal)}</dd></div>
                {coupon ? (
                  <div className="flex justify-between"><dt className="text-body-sm text-gold">{coupon.code}</dt><dd className="text-price text-gold">−{format(discount)}</dd></div>
                ) : null}
                <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Shipping</dt><dd className="text-price">{shipping === 0 ? "Free" : format(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Tax</dt><dd className="text-meta">{region.taxNote}</dd></div>
              </dl>

              <form
                className="mt-6 border-t border-border pt-6"
                onSubmit={(e) => { e.preventDefault(); if (applyCoupon(code)) setCode(""); }}
              >
                {coupon ? (
                  <Notice
                    tone="success"
                    title={coupon.label}
                    body={`Code ${coupon.code} applied to your order.`}
                    action={<button type="button" onClick={clearCoupon} className="text-label link-underline">Remove code</button>}
                  />
                ) : (
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
                    <Field
                      label="Discount code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="ATELIER10"
                      {...(couponError ? { error: couponError } : {})}
                    />
                    <Button type="submit" variant="secondary" className="h-12">Apply</Button>
                  </div>
                )}
              </form>

              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
                <span className="text-label">Total</span>
                <span className="text-price text-lg">{format(Math.max(0, cartTotal - discount) + shipping)}</span>
              </div>
              <Button asChild size="block" className="mt-6" disabled={cart.length === 0}>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <p className="text-meta mt-4">Delivery to {region.country} in {region.delivery}. Returns within 30 days.</p>
            </aside>
          </div>
        )}
      </section>

      <section className="section container-page border-t border-border">
        <h2 className="text-h2">You may also like</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {suggestions.map((d) => (
            <ProductCard key={d.slug} design={d} productId={d.products[0] ?? "tshirt"} />
          ))}
        </div>
      </section>
    </>
  );
}
