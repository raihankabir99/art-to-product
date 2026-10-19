import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Check, Globe, HelpCircle, Tag, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { ProductCard } from "@/components/store/cards";
import { Mockup } from "@/components/store/Mockup";
import { QuantitySelector } from "@/components/store/CartDrawer";
import { useStore } from "@/components/store/store";
import { DESIGNS, designBySlug } from "@/lib/catalog";
import { COUNTRIES, findCountry } from "@/lib/countries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Atelier Noir" },
      {
        name: "description",
        content:
          "Review the pieces in your cart before checkout. Made to order and shipped worldwide.",
      },
      { property: "og:title", content: "Your Cart | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Review the pieces in your cart before checkout. Made to order and shipped worldwide.",
      },
    ],
  }),
  component: CartPage,
});

const FREE_SHIPPING_THRESHOLD = 80;

function CartPage() {
  const {
    cart,
    setQty,
    removeLine,
    undoRemove,
    cartTotal,
    format,
    region,
    saved,
    saveForLater,
    moveToBag,
    removeSaved,
    pendingLines,
    coupon,
    couponError,
    applyCoupon,
    clearCoupon,
    discount,
  } = useStore();

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  // Shipping estimator local state
  const [estimateCountry, setEstimateCountry] = useState(
    region.code === "GB" ? "GB" : region.code === "US" ? "US" : "DE",
  );
  const [estimatePostal, setEstimatePostal] = useState("");
  const [shippingEstimateResult, setShippingEstimateResult] = useState<{
    estimatedDays: string;
    rateEur: number;
    carrier: string;
  } | null>(null);

  const selectedEstimateCountry = findCountry(estimateCountry);

  const effectiveSubtotal = Math.max(0, cartTotal - discount);
  const qualifiesForFreeShipping = effectiveSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = cart.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : 4.99;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - effectiveSubtotal);
  const freeProgress = Math.min(100, (effectiveSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const finalTotal = cart.length === 0 ? 0 : effectiveSubtotal + shippingCost;
  const suggestions = DESIGNS.slice(0, 4);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const success = applyCoupon(promoCodeInput.trim());
    if (success) {
      setPromoError(null);
      setPromoCodeInput("");
      toast.success("Promo code applied successfully");
    } else {
      setPromoError("Invalid code. The code could not be applied.");
    }
  };

  const handleEstimateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    const isFree = qualifiesForFreeShipping;
    const days =
      estimateCountry === "DE" || estimateCountry === "NL" || estimateCountry === "FR"
        ? "2–4 business days"
        : estimateCountry === "GB"
          ? "3–5 business days"
          : estimateCountry === "US" || estimateCountry === "CA"
            ? "5–7 business days"
            : "6–9 business days";

    const carrier =
      estimateCountry === "GB"
        ? "Royal Mail Tracked"
        : estimateCountry === "US" || estimateCountry === "CA"
          ? "FedEx International"
          : "DHL Express";

    setShippingEstimateResult({
      estimatedDays: days,
      rateEur: isFree ? 0 : 4.99,
      carrier,
    });
    toast.success(`Shipping estimated for ${selectedEstimateCountry.name}`);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeLine(id);
    toast("Item removed", {
      action: {
        label: "UNDO",
        onClick: () => {
          undoRemove();
          toast.success("Item restored to cart");
        },
      },
    });
  };

  const handleSaveForLater = (id: string) => {
    saveForLater(id);
    toast.success("Saved for later");
  };

  return (
    <>
      <PageHero
        title="Your cart"
        intro={
          cart.length > 0
            ? `${cart.reduce((s, i) => s + i.qty, 0)} ${cart.reduce((s, i) => s + i.qty, 0) === 1 ? "item" : "items"}`
            : undefined
        }
        trail={[{ label: "Cart" }]}
      />

      <section className="section container-page">
        {cart.length === 0 && saved.length === 0 ? (
          <div className="mx-auto max-w-xl py-16 text-center">
            <div className="mx-auto size-20 border border-border bg-surface/60 grid place-items-center mb-6">
              <span className="text-gold font-[family-name:var(--font-display)] text-2xl">AN</span>
            </div>
            <p className="text-label tracking-[0.24em] text-gold uppercase">Studio Bag</p>
            <h2 className="text-h2 mt-3">Your bag is waiting.</h2>
            <p className="text-body mt-4 text-muted-foreground max-w-md mx-auto">
              Discover a design and make it yours. Every garment and artifact in our studio is
              individually crafted upon order.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="px-8 font-semibold tracking-wider uppercase">
                <Link to="/designs">Explore designs</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="px-8 font-semibold tracking-wider uppercase"
              >
                <Link to="/shop">Shop best sellers</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* Left Column: Cart Items & Saved Items */}
            <div>
              {/* Free Delivery Bar */}
              {cart.length > 0 && (
                <div className="mb-8 border border-border bg-surface/40 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-body-sm flex items-center gap-2">
                      <Truck className="size-4 text-gold" aria-hidden="true" />
                      {remainingForFree > 0 ? (
                        <span>
                          Add{" "}
                          <strong className="text-foreground">{format(remainingForFree)}</strong>{" "}
                          for free delivery to {region.country}.
                        </span>
                      ) : (
                        <span className="text-gold font-medium">
                          Free delivery unlocked to {region.country}.
                        </span>
                      )}
                    </p>
                    <span className="text-meta text-muted-foreground hidden sm:inline">
                      Threshold: {format(FREE_SHIPPING_THRESHOLD)}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 w-full bg-border" aria-hidden="true">
                    <div
                      className="h-full bg-gold transition-[width] duration-500"
                      style={{ width: `${freeProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart List */}
              {cart.length > 0 ? (
                <ul
                  className="divide-y divide-border border-y border-border"
                  aria-label="Cart items list"
                >
                  {cart.map((line, idx) => {
                    const design = designBySlug(line.designSlug);
                    const isPending = pendingLines.includes(line.id);
                    const sameDesignCount = cart.filter(
                      (c) => c.designSlug === line.designSlug,
                    ).length;
                    const isFirstOfDesign =
                      cart.findIndex((c) => c.designSlug === line.designSlug) === idx;

                    return (
                      <li
                        key={line.id}
                        className={cn("py-6", isPending && "opacity-60 transition-opacity")}
                        aria-busy={isPending}
                      >
                        {isFirstOfDesign && sameDesignCount > 1 && (
                          <div className="mb-4 flex items-center justify-between bg-surface/60 border border-border/80 px-4 py-2">
                            <span className="text-label tracking-[0.2em] text-gold uppercase text-xs font-semibold">
                              Design: {line.designName}
                            </span>
                            <span className="text-meta text-muted-foreground">
                              Same design · {sameDesignCount} pieces in bag
                            </span>
                          </div>
                        )}
                        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 sm:grid-cols-[128px_minmax(0,1fr)]">
                          {/* Thumbnail */}
                          <div className="relative aspect-square border border-border bg-surface/60">
                            {design ? (
                              <Mockup
                                design={design}
                                productId={line.productId}
                                colorValue={line.colorValue}
                              />
                            ) : (
                              <div className="grid h-full place-items-center text-muted-foreground">
                                No image
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-label tracking-[0.2em] text-gold uppercase">
                                    {line.designName}
                                  </p>
                                  <h3 className="text-h3 mt-1 font-normal">{line.productName}</h3>
                                  <p className="text-meta mt-1.5 text-muted-foreground">
                                    <span className="text-foreground">{line.color}</span>
                                    {line.size ? ` · Size ${line.size}` : ""}
                                  </p>
                                </div>

                                {/* Remove action */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveItem(
                                      line.id,
                                      `${line.designName} ${line.productName}`,
                                    )
                                  }
                                  aria-label={`Remove ${line.designName} ${line.productName} from cart`}
                                  className="grid size-11 place-items-center text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <X className="size-4" aria-hidden="true" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
                              <div className="flex items-center gap-4">
                                <QuantitySelector
                                  qty={line.qty}
                                  onChange={(n) => setQty(line.id, n)}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveForLater(line.id)}
                                  className="text-label link-underline inline-flex min-h-11 items-center gap-1.5 text-muted-foreground hover:text-foreground"
                                >
                                  <Bookmark className="size-3.5" aria-hidden="true" />
                                  Save for later
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="text-price text-base font-medium">
                                  {format(line.price * line.qty)}
                                </span>
                                {line.qty > 1 && (
                                  <p className="text-meta text-muted-foreground">
                                    {format(line.price)} each
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="border border-border p-8 text-center">
                  <p className="text-body text-muted-foreground">
                    All active items moved to saved list.
                  </p>
                </div>
              )}

              {/* Saved For Later Section */}
              {saved.length > 0 && (
                <div className="mt-14">
                  <div className="flex items-baseline justify-between border-b border-border pb-3">
                    <h2 className="text-h3">Saved for later</h2>
                    <span className="text-meta text-muted-foreground">
                      {saved.length} {saved.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <ul className="divide-y divide-border border-b border-border">
                    {saved.map((line) => {
                      const design = designBySlug(line.designSlug);
                      return (
                        <li
                          key={line.id}
                          className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-5 py-5 sm:grid-cols-[96px_minmax(0,1fr)]"
                        >
                          <div className="aspect-square border border-border bg-surface/50">
                            {design ? (
                              <Mockup
                                design={design}
                                productId={line.productId}
                                colorValue={line.colorValue}
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0">
                            <p className="text-label tracking-[0.16em] text-gold uppercase text-[10px]">
                              {line.designName}
                            </p>
                            <h4 className="text-body font-medium truncate">{line.productName}</h4>
                            <p className="text-meta mt-0.5 text-muted-foreground">
                              {line.color}
                              {line.size ? ` · Size ${line.size}` : ""} · {format(line.price)}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  moveToBag(line.id);
                                  toast.success("Moved back to cart");
                                }}
                                className="text-label link-underline min-h-11 text-foreground"
                              >
                                Move to bag
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  removeSaved(line.id);
                                  toast("Removed from saved list");
                                }}
                                className="text-label link-underline min-h-11 text-muted-foreground hover:text-foreground"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Continue Shopping Link */}
              <div className="mt-8">
                <Link
                  to="/shop"
                  className="text-label link-underline inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" /> Continue shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary, Promo Code & Shipping Estimator */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-28">
              {/* Order Summary Card */}
              <div className="border border-border bg-surface/20 p-6">
                <h2 className="text-label tracking-[0.16em] uppercase">Order summary</h2>

                <dl className="mt-6 space-y-3.5 text-body-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="text-price font-medium">{format(cartTotal)}</dd>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-gold">
                      <dt className="flex items-center gap-1.5">
                        <Tag className="size-3.5" aria-hidden="true" />
                        Discount ({coupon.code})
                      </dt>
                      <dd className="text-price font-medium">−{format(discount)}</dd>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="text-price">
                      {shippingCost === 0 ? (
                        <span className="text-gold font-medium">Free</span>
                      ) : (
                        format(shippingCost)
                      )}
                    </dd>
                  </div>

                  <div className="flex justify-between border-b border-border/60 pb-3.5">
                    <dt className="text-muted-foreground flex items-center gap-1">
                      Estimated tax / VAT
                      <span
                        title="VAT included for EU/UK orders; calculated at checkout for international"
                        className="cursor-help text-muted-foreground"
                      >
                        <HelpCircle className="size-3" />
                      </span>
                    </dt>
                    <dd className="text-meta text-muted-foreground">{region.taxNote}</dd>
                  </div>

                  <div className="flex items-baseline justify-between pt-2">
                    <dt className="text-label uppercase">Total</dt>
                    <dd className="text-price text-xl font-semibold">{format(finalTotal)}</dd>
                  </div>
                </dl>

                {/* Promo Code Input / Applied State */}
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-label mb-2 uppercase text-muted-foreground">Promo code</p>
                  {coupon ? (
                    <div className="flex items-center justify-between border border-border bg-surface p-3">
                      <div className="flex items-center gap-2">
                        <Check className="size-4 text-gold" aria-hidden="true" />
                        <div>
                          <span className="text-label text-gold font-bold">{coupon.code}</span>
                          <p className="text-meta text-muted-foreground">{coupon.label}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          clearCoupon();
                          toast("Promo code removed");
                        }}
                        className="text-label link-underline text-xs text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCodeInput}
                          onChange={(e) => {
                            setPromoCodeInput(e.target.value);
                            if (promoError) setPromoError(null);
                          }}
                          placeholder="ZOAL10"
                          aria-label="Enter promo code"
                          className="h-11 w-full border border-input bg-transparent px-3 text-body-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none"
                        />
                        <Button type="submit" variant="secondary" className="h-11 px-5">
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-meta text-destructive" role="alert">
                          {promoError}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Checkout CTA */}
                <div className="mt-6">
                  <Button
                    asChild
                    size="block"
                    className="h-13 text-sm font-medium tracking-[0.14em]"
                    disabled={cart.length === 0}
                  >
                    <Link to="/checkout">Proceed to checkout</Link>
                  </Button>
                </div>

                <p className="text-meta mt-4 text-center text-muted-foreground">
                  Encrypted checkout · Shipped carbon-neutral worldwide
                </p>
              </div>

              {/* Shipping Estimator Section */}
              <div className="border border-border p-6 bg-surface/10">
                <div className="flex items-center gap-2">
                  <Globe className="size-4 text-gold" aria-hidden="true" />
                  <h3 className="text-label tracking-[0.14em] uppercase">Estimate shipping</h3>
                </div>
                <p className="text-meta mt-1 text-muted-foreground">
                  Get delivery timeline & rate estimate for your country.
                </p>

                <form onSubmit={handleEstimateShipping} className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="est-country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="est-country"
                      value={estimateCountry}
                      onChange={(e) => {
                        setEstimateCountry(e.target.value);
                        setShippingEstimateResult(null);
                      }}
                      className="h-11 w-full border border-input bg-background px-3 text-body-sm focus-visible:border-gold focus-visible:outline-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={estimatePostal}
                      onChange={(e) => setEstimatePostal(e.target.value)}
                      placeholder={
                        selectedEstimateCountry.defaultPostalPlaceholder || "Postal code"
                      }
                      aria-label="Postal code"
                      className="h-11 w-full border border-input bg-transparent px-3 text-body-sm placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none"
                    />
                    <Button type="submit" variant="secondary" className="h-11 px-4 text-xs">
                      Estimate
                    </Button>
                  </div>
                </form>

                {shippingEstimateResult && (
                  <div className="mt-4 border border-border bg-surface/60 p-3.5 text-body-sm">
                    <p className="font-medium text-foreground">{shippingEstimateResult.carrier}</p>
                    <p className="text-meta text-muted-foreground mt-0.5">
                      Estimated delivery: {shippingEstimateResult.estimatedDays}
                    </p>
                    <p className="text-meta mt-1">
                      Shipping:{" "}
                      <strong className="text-foreground">
                        {shippingEstimateResult.rateEur === 0
                          ? "Free"
                          : format(shippingEstimateResult.rateEur)}
                      </strong>
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Recommended Products */}
      <section className="section container-page border-t border-border">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-label tracking-[0.2em] text-gold uppercase">Complete the look</p>
            <h2 className="text-h2 mt-2">You may also like</h2>
          </div>
          <Link to="/shop" className="text-label link-underline hidden sm:inline-block">
            View all products
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {suggestions.map((d) => (
            <ProductCard key={d.slug} design={d} productId={d.products[0] ?? "tshirt"} />
          ))}
        </div>
      </section>
    </>
  );
}
