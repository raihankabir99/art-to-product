import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
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
import { DESIGNS, productType, type Design, type ProductTypeId } from "@/lib/catalog";

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
      <p className="text-label text-muted-foreground">Choose your product</p>
      <div
        role="tablist"
        aria-label="Choose product format"
        className="-mx-1 mt-4 flex snap-x gap-2 overflow-x-auto px-1 pb-2 md:flex-wrap md:overflow-visible"
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
                "text-label flex min-h-11 shrink-0 snap-start items-center gap-2 border px-3 transition-colors duration-200",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground",
              )}
            >
              {t.name}
              <span className={active ? "opacity-70" : "text-muted-foreground"}>{format(t.price)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Same design — one artwork, many formats ---------------- */

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
    <section aria-labelledby="same-design" className="container-page py-16 md:py-24">
      <SectionHeading eyebrow="One design" title="One design. Many ways to make it yours." />
      <h2 id="same-design" className="sr-only">
        {design.name} across the collection
      </h2>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
        {design.products.map((id) => {
          const t = productType(id);
          const active = id === productId;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-pressed={active}
              className={cn(
                "group w-40 shrink-0 snap-start border text-left transition-colors lg:w-auto",
                active ? "border-gold" : "border-border hover:border-foreground",
              )}
            >
              <Mockup design={design} productId={id} />
              <div className="p-3">
                <p className="text-label truncate">{t.name}</p>
                <p className="text-meta mt-1">{format(t.price)}</p>
                {active ? <p className="text-meta mt-1 text-gold">Selected</p> : null}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Design story ---------------- */

export function DesignStory({ design }: { design: Design }) {
  return (
    <section aria-labelledby="design-story" className="border-y border-border bg-surface">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="border border-border">
          <Mockup design={design} productId={design.products[0]!} view="detail" />
        </div>
        <div className="min-w-0">
          <p className="text-label text-gold">The design</p>
          <h2 id="design-story" className="text-h2 mt-3">
            {design.name}
          </h2>
          <p className="text-body-lg mt-6 text-muted-foreground">{design.story}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Studio", design.studio],
              ["Collection", design.collection],
              ["Released", design.year],
            ].map(([k, v]) => (
              <div key={k} className="border border-border p-4">
                <dt className="text-meta">{k}</dt>
                <dd className="text-body-sm mt-2">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-meta mt-6">
            Designer note: the artwork is drawn once, then placed per format so the proportions stay
            true on a tee, a poster or a mug.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */

export function ReviewSection({ design }: { design: Design }) {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="container-page py-16 md:py-24">
      <SectionHeading eyebrow="Demo data" title="Reviews" />
      <h2 id="reviews-title" className="sr-only">
        Customer reviews
      </h2>
      <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="border border-border p-6">
          <p className="text-h1 tabular-nums">{design.rating.toFixed(1)}</p>
          <span className="mt-2 flex items-center gap-1" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "size-4",
                  s <= Math.round(design.rating) ? "text-gold" : "text-muted-foreground",
                )}
                fill={s <= Math.round(design.rating) ? "currentColor" : "none"}
              />
            ))}
          </span>
          <p className="text-meta mt-3">Based on {design.reviews} demo reviews</p>
          <ul className="mt-6 space-y-2">
            {RATING_BREAKDOWN.map((r) => (
              <li key={r.stars} className="grid grid-cols-[2rem_minmax(0,1fr)_2.5rem] items-center gap-3">
                <span className="text-meta tabular-nums">{r.stars}★</span>
                <span aria-hidden="true" className="h-1 bg-border">
                  <span className="block h-1 bg-gold" style={{ width: `${r.share * 100}%` }} />
                </span>
                <span className="text-meta text-right tabular-nums">{Math.round(r.share * 100)}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-4 gap-2" aria-label="Customer image placeholders">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="aspect-square border border-border bg-surface-2" aria-hidden="true" />
            ))}
          </div>
          <p className="text-meta mt-3">Customer photo placeholders</p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {DEMO_REVIEWS.map((r) => (
            <li key={r.name} className="border border-border p-5">
              <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn("size-3.5", s <= r.rating ? "text-gold" : "text-muted-foreground")}
                    fill={s <= r.rating ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-h4 mt-3">{r.title}</p>
              <p className="text-body-sm mt-2 text-muted-foreground">{r.body}</p>
              <p className="text-meta mt-4">
                {r.name} · {r.place} · Demo review
              </p>
            </li>
          ))}
        </ul>
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
      className="group block border border-border transition-colors hover:border-foreground"
    >
      <Mockup design={design} productId={productId} />
      <div className="p-4">
        <p className="text-h4 truncate">{design.name}</p>
        <p className="text-meta mt-1 truncate">{productTitle(t)}</p>
        <p className="text-body-sm mt-2">{format(t.price)}</p>
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
    <section aria-labelledby="related" className="border-t border-border">
      <div className="container-page py-16 md:py-24">
        <SectionHeading eyebrow="Different designs" title="You may also like" />
        <h2 id="related" className="sr-only">
          You may also like
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 ease-[var(--ease-brand)] lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
        <div className="min-w-0">
          <p className="text-label truncate">{label}</p>
          <p className="text-body-sm tabular-nums">{format(price)}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          tabIndex={visible ? 0 : -1}
          className="text-label min-h-12 shrink-0 bg-foreground px-6 text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
