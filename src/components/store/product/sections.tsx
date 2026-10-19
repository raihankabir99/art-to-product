import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, Check, Sparkles, ShieldCheck, ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Mockup } from "@/components/store/Mockup";
import { SectionHeading } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import {
  DEMO_REVIEWS,
  RATING_BREAKDOWN,
  productSlug,
  productTitle,
  relatedProducts,
} from "@/lib/product-data";
import {
  DESIGNS,
  PRODUCT_TYPES,
  productType,
  type Design,
  type ProductTypeId,
} from "@/lib/catalog";

/* ---------------- Product type switcher (compact, scrollable) ---------------- */

export function ProductTypeSwitcher({
  design,
  productId,
  onSelect,
}: {
  design: Design;
  productId: ProductTypeId;
  onSelect: (id: ProductTypeId) => void;
}) {
  const { format } = useStore();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-label text-muted-foreground">Select Object</p>
        <span className="text-meta text-gold font-mono">
          {design.products.length} formats available
        </span>
      </div>
      <div
        role="tablist"
        aria-label="Choose product format"
        className="-mx-1 mt-3 flex snap-x gap-2 overflow-x-auto px-1 pb-2 md:flex-wrap md:overflow-visible no-scrollbar"
      >
        {design.products.map((id) => {
          const t = productType(id);
          const active = id === productId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(id)}
              className={cn(
                "text-label flex min-h-11 shrink-0 snap-start items-center gap-2 border px-3.5 transition-all duration-200",
                active
                  ? "border-gold bg-gold/15 text-gold shadow-sm ring-1 ring-gold"
                  : "border-border bg-surface/40 text-foreground hover:border-foreground",
              )}
            >
              <span>{t.name}</span>
              <span
                className={cn(
                  "text-xs font-mono tabular-nums",
                  active ? "text-gold font-medium" : "text-muted-foreground",
                )}
              >
                {format(t.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Same design — ONE DESIGN. EVERY PRODUCT. ---------------- */

export function SameDesignProducts({
  design,
  productId,
  onSelect,
}: {
  design: Design;
  productId: ProductTypeId;
  onSelect: (id: ProductTypeId) => void;
}) {
  const { format } = useStore();

  return (
    <section
      id="one-design-every-product"
      aria-labelledby="same-design-heading"
      className="border-t border-border bg-surface/30 py-16 md:py-24"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="text-label text-gold uppercase tracking-[0.22em] flex items-center gap-2">
              <Sparkles className="size-3.5 text-gold" /> One Design · Every Product
            </p>
            <h2 id="same-design-heading" className="text-h2 mt-2">
              Love the design? Explore it across the collection.
            </h2>
            <p className="text-body-sm text-muted-foreground mt-3 max-w-2xl">
              One original artwork, individually scaled, formatted, and color-matched for each
              object. Select any piece to preview or switch your configuration.
            </p>
          </div>
          <p className="text-meta text-muted-foreground shrink-0 font-mono">
            {design.products.length} AVAILABLE FORMATS
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {design.products.map((id) => {
            const t = productType(id);
            const active = id === productId;
            return (
              <div
                key={id}
                className={cn(
                  "group relative flex flex-col justify-between border bg-card transition-all duration-300",
                  active
                    ? "border-gold ring-1 ring-gold shadow-md bg-gold/5"
                    : "border-border hover:border-foreground/60 hover:shadow-sm",
                )}
              >
                <div className="relative aspect-square overflow-hidden bg-surface-2 p-2">
                  <Mockup design={design} productId={id} view="front" />
                  {active && (
                    <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background shadow">
                      <Check className="size-3" /> Selected
                    </span>
                  )}
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-h4 text-sm truncate font-medium">{t.name}</p>
                    <p className="text-meta text-muted-foreground mt-0.5">{productTitle(t)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-body-sm font-mono font-medium text-foreground">
                        {format(t.price)}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {t.colors.length} {t.colors.length === 1 ? "color" : "colors"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60">
                    {active ? (
                      <button
                        type="button"
                        disabled
                        className="w-full text-center text-xs font-semibold uppercase tracking-wider py-2 bg-gold/20 text-gold border border-gold/40 cursor-default"
                      >
                        Currently Editing
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onSelect(id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wider py-2 bg-surface hover:bg-foreground hover:text-background border border-border transition-colors duration-200"
                      >
                        <span>Switch Product</span>
                        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Design story ---------------- */

export function DesignStory({ design }: { design: Design }) {
  return (
    <section aria-labelledby="design-story" className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="border border-border bg-surface-2 p-6 md:p-10 relative overflow-hidden group">
          <Mockup design={design} productId={design.products[0]!} view="detail" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-4 flex justify-between items-end">
            <span className="text-meta text-gold uppercase tracking-wider">
              Detail Crop · High-Res Proof
            </span>
            <span className="text-meta text-muted-foreground font-mono">{design.slug}</span>
          </div>
        </div>
        <div className="min-w-0 space-y-6">
          <div>
            <p className="text-label text-gold uppercase tracking-[0.22em]">Editorial Story</p>
            <h2 id="design-story" className="text-h2 mt-3">
              The Genesis of "{design.name}"
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground leading-relaxed">{design.story}</p>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-b border-border py-6">
            {[
              ["Studio", design.studio],
              ["Collection", design.collection],
              ["Inception", design.year],
              ["Aesthetic", design.style],
              ["Technique", "Direct-to-Garment + Giclée"],
              ["Proof Status", "Color Verified"],
            ].map(([k, v]) => (
              <div key={k} className="border border-border/80 bg-card p-3.5">
                <dt className="text-meta text-muted-foreground">{k}</dt>
                <dd className="text-body-sm mt-1 font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="border-l-2 border-gold pl-4 py-1 text-muted-foreground text-sm italic">
            "We treat every design as a primary architectural element. Whether draped on loopback
            cotton, glazed on stoneware, or rendered as archival fine art, the integrity of line and
            contrast remains uncompromised."
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */

export function ReviewSection({ design }: { design: Design }) {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const reviews = filterRating
    ? DEMO_REVIEWS.filter((r) => r.rating === filterRating)
    : DEMO_REVIEWS;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="container-page py-16 md:py-24 border-t border-border"
    >
      <SectionHeading eyebrow="Customer Proof" title="Reviews & Testimonials" />
      <h2 id="reviews-title" className="sr-only">
        Customer reviews
      </h2>
      <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] mt-8">
        <div className="border border-border bg-card p-6 self-start space-y-6">
          <div>
            <p className="text-h1 tabular-nums font-bold tracking-tight">
              {design.rating.toFixed(1)}
            </p>
            <div className="mt-2 flex items-center gap-1" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    "size-5",
                    s <= Math.round(design.rating)
                      ? "text-gold fill-gold"
                      : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <p className="text-meta mt-2 text-muted-foreground">
              Based on {design.reviews} verified reviews across products
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-label text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Rating Breakdown
            </p>
            <ul className="space-y-2.5">
              {RATING_BREAKDOWN.map((r) => (
                <li
                  key={r.stars}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)_3rem] items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setFilterRating(filterRating === r.stars ? null : r.stars)}
                >
                  <span className="text-meta tabular-nums font-medium">{r.stars} ★</span>
                  <span aria-hidden="true" className="h-1.5 bg-border rounded-none overflow-hidden">
                    <span className="block h-1.5 bg-gold" style={{ width: `${r.share * 100}%` }} />
                  </span>
                  <span className="text-meta text-right tabular-nums text-muted-foreground">
                    {Math.round(r.share * 100)}%
                  </span>
                </li>
              ))}
            </ul>
            {filterRating && (
              <button
                type="button"
                onClick={() => setFilterRating(null)}
                className="mt-3 text-xs text-gold underline hover:text-foreground"
              >
                Clear filter (showing {filterRating}★ only)
              </button>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-label text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Customer Showcase
            </p>
            <div className="grid grid-cols-4 gap-2" aria-label="Customer image previews">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square border border-border bg-surface-2 flex items-center justify-center hover:border-gold transition-colors relative group"
                >
                  <Eye className="size-4 text-muted-foreground group-hover:text-gold" />
                </div>
              ))}
            </div>
            <p className="text-meta mt-2 text-muted-foreground">Verified buyer upload gallery</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-label text-muted-foreground">
              Showing {reviews.length} reviews
            </span>
            <span className="text-meta text-gold flex items-center gap-1.5">
              <ShieldCheck className="size-4" /> 100% Verified Purchases
            </span>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r, idx) => (
              <li
                key={idx}
                className="border border-border bg-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${r.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={cn(
                            "size-3.5",
                            s <= r.rating ? "text-gold fill-gold" : "text-muted-foreground",
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gold bg-gold/10 px-2 py-0.5 border border-gold/20 uppercase font-mono">
                      Verified
                    </span>
                  </div>
                  <p className="text-h4 mt-3 font-semibold">{r.title}</p>
                  <p className="text-body-sm mt-2 text-muted-foreground leading-relaxed">
                    {r.body}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-meta text-muted-foreground">
                  <span>
                    {r.name} · {r.place}
                  </span>
                  <span>Verified Buyer</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Related + recently viewed ---------------- */

function MiniCard({ design, productId }: { design: Design; productId: ProductTypeId }) {
  const { format } = useStore();
  const t = productType(productId);
  return (
    <Link
      to="/products/$slug"
      params={{ slug: productSlug(design.slug, productId) }}
      className="group block border border-border bg-card transition-all duration-200 hover:border-foreground hover:shadow-sm"
    >
      <div className="aspect-square bg-surface-2 p-2 relative overflow-hidden">
        <Mockup design={design} productId={productId} />
      </div>
      <div className="p-4 border-t border-border/80">
        <p className="text-h4 truncate group-hover:text-gold transition-colors font-medium">
          {design.name}
        </p>
        <p className="text-meta mt-1 truncate text-muted-foreground">{productTitle(t)}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-body-sm font-mono font-medium">{format(t.price)}</p>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function RelatedProducts({
  design,
  productId,
}: {
  design: Design;
  productId: ProductTypeId;
}) {
  const items = relatedProducts(design, productId);
  return (
    <section aria-labelledby="related" className="border-t border-border bg-surface/20">
      <div className="container-page py-16 md:py-24">
        <SectionHeading eyebrow="Different designs" title="You may also like" />
        <h2 id="related" className="sr-only">
          You may also like
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-8">
          {items.map((i) => (
            <MiniCard key={i.design.slug} design={i.design} productId={i.productId} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentlyViewed({ excludeSlug }: { excludeSlug: string }) {
  const { recentlyViewed } = useStore();
  const items = recentlyViewed
    .filter((s) => s !== excludeSlug)
    .map((s) => DESIGNS.find((d) => d.slug === s))
    .filter((d): d is Design => !!d)
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <section aria-labelledby="recent" className="border-t border-border">
      <div className="container-page py-16">
        <SectionHeading eyebrow="Your session" title="Recently viewed" />
        <h2 id="recent" className="sr-only">
          Recently viewed
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-8">
          {items.map((d) => (
            <MiniCard key={d.slug} design={d} productId={d.products[0]!} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sticky mobile purchase bar ---------------- */

export function MobileStickyCartBar({
  visible,
  price,
  label,
  onAdd,
  disabled,
}: {
  visible: boolean;
  price: number;
  label: string;
  onAdd: () => void;
  disabled?: boolean | undefined;
}) {
  const { format } = useStore();
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md transition-transform duration-300 ease-[var(--ease-brand)] lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 pb-safe">
        <div className="min-w-0">
          <p className="text-label truncate font-medium text-foreground">{label}</p>
          <p className="text-body-sm tabular-nums font-mono text-gold font-semibold">
            {format(price)}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          tabIndex={visible ? 0 : -1}
          className="text-label min-h-12 shrink-0 bg-foreground px-6 text-background transition-opacity hover:opacity-90 active:translate-y-px disabled:opacity-50 font-semibold uppercase tracking-wider"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}
