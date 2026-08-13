import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Truck, RefreshCw, Globe, Star, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mockup, type MockupView } from "@/components/store/Mockup";
import { Breadcrumbs } from "@/components/store/page";
import { DesignCard, Price, WishlistButton } from "@/components/store/cards";
import { QuantitySelector } from "@/components/store/CartDrawer";
import { SizeGuide } from "@/components/store/SizeGuide";
import { Notice } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { DESIGNS, designBySlug, productType, type ProductTypeId } from "@/lib/catalog";

export const Route = createFileRoute("/designs/$slug")({
  validateSearch: (search: Record<string, unknown>): { product?: ProductTypeId } => {
    const p = search["product"];
    return typeof p === "string" ? { product: p as ProductTypeId } : {};
  },
  loader: ({ params }) => {
    const design = designBySlug(params.slug);
    if (!design) throw notFound();
    return { design };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Design unavailable — Atelier Noir" }, { name: "robots", content: "noindex" }],
      };
    }
    const d = loaderData.design;
    return {
      meta: [
        { title: `${d.name} — ${d.products.length} products | Atelier Noir` },
        { name: "description", content: d.story },
        { property: "og:title", content: `${d.name} — Atelier Noir` },
        { property: "og:description", content: d.story },
      ],
    };
  },
  component: DesignDetail,
});

const VIEWS: { id: MockupView; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "detail", label: "Print detail" },
  { id: "lifestyle", label: "In context" },
];

/** Deterministic mock availability so the UI can show real out-of-stock states. */
function availability(productId: ProductTypeId, size?: string) {
  if (!size) return "in" as const;
  if (productId === "tshirt" && size === "XXL") return "out" as const;
  if (productId === "hoodie" && size === "XS") return "low" as const;
  if (productId === "poster" && size === "70×100cm") return "out" as const;
  return "in" as const;
}

const REVIEWS = [
  {
    name: "Marte K.",
    place: "Oslo",
    rating: 5,
    title: "Heavier than expected, in a good way",
    body: "The print sits flat and the cotton has real weight. Three washes in and the edges are still crisp.",
  },
  {
    name: "Youssef A.",
    place: "Riyadh",
    rating: 5,
    title: "Arrived faster than the estimate",
    body: "Duties were shown up front, which I appreciated. The packaging was plain and recyclable.",
  },
  {
    name: "Laura B.",
    place: "Milan",
    rating: 4,
    title: "Sizing runs relaxed",
    body: "I sized down after reading the guide and it fits exactly as pictured.",
  },
];

function DesignDetail() {
  const { design } = Route.useLoaderData();
  const { product } = Route.useSearch();
  const { addToCart, format, region, markViewed } = useStore();

  const [productId, setProductId] = useState<ProductTypeId>(
    product && design.products.includes(product) ? product : design.products[0]!,
  );
  const type = productType(productId);
  const [colorName, setColorName] = useState(type.colors[0]!.name);
  const [size, setSize] = useState(type.sizes?.[2] ?? type.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [view, setView] = useState<MockupView>("front");
  const [guideOpen, setGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  useEffect(() => {
    markViewed(design.slug);
  }, [design.slug, markViewed]);

  const color = useMemo(
    () => type.colors.find((c) => c.name === colorName) ?? type.colors[0]!,
    [type, colorName],
  );

  const stock = availability(productId, size);
  const soldOut = design.badges.includes("Limited") && productId === "poster";

  function switchProduct(next: ProductTypeId) {
    const nextType = productType(next);
    setProductId(next);
    setColorName(nextType.colors[0]!.name);
    setSize(nextType.sizes?.[2] ?? nextType.sizes?.[0]);
    setView("front");
    setSizeError(null);
  }

  function commit(then?: () => void) {
    if (type.sizes && !size) {
      setSizeError("Choose a size before adding this to your bag.");
      return;
    }
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      addToCart({
        designSlug: design.slug,
        designName: design.name,
        productId,
        productName: type.name,
        color: color.name,
        colorValue: color.value,
        ...(size ? { size } : {}),
        price: type.price,
        qty,
      });
      toast.success(`${design.name} ${type.name} added to your bag`);
      then?.();
    }, 550);
  }

  const related = DESIGNS.filter((d) => d.slug !== design.slug).slice(0, 3);
  const disabled = stock === "out" || soldOut;

  return (
    <>
      <div className="container-page py-6">
        <Breadcrumbs trail={[{ label: "Designs", to: "/designs" }, { label: design.name }]} />
      </div>

      <section className="container-page grid gap-12 pb-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="relative border border-border">
            <Mockup
              key={productId + color.name + view}
              design={design}
              productId={productId}
              colorValue={color.value}
              tone={color.tone}
              view={view}
              priority
              zoomable
              className="fade-in-soft"
            />
            <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
              {design.badges.map((b) => (
                <Badge key={b} variant={b === "Sale" ? "sale" : b === "Limited" ? "gold" : "default"}>
                  {b}
                </Badge>
              ))}
              {soldOut ? <Badge variant="outline">Sold out</Badge> : null}
            </div>
            <span className="text-meta pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 bg-background/80 px-3 py-2 backdrop-blur">
              <ZoomIn className="size-3.5" aria-hidden="true" /> Tap to zoom
            </span>
          </div>

          {/* VIEW SWITCH */}
          <div className="mt-3 flex flex-wrap gap-2">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
                className={`text-label flex min-h-11 items-center border px-4 transition-colors ${
                  view === v.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* THUMBNAILS — colourways */}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {type.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  setColorName(c.name);
                  setView("front");
                }}
                aria-label={`View ${c.name}`}
                aria-pressed={c.name === color.name}
                className={`border transition-colors ${
                  c.name === color.name ? "border-foreground" : "border-border hover:border-border-strong"
                }`}
              >
                <Mockup design={design} productId={productId} colorValue={c.value} tone={c.tone} />
              </button>
            ))}
          </div>
        </div>

        {/* BUY PANEL */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-label text-gold">{design.collection}</p>
          <h1 className="text-h1 mt-4">{design.name}</h1>
          <p className="text-body mt-4 max-w-prose text-muted-foreground">{design.story}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Price value={type.price} compareAt={type.compareAt} className="text-lg" />
            <span className="text-meta">{region.taxNote}</span>
            <a href="#reviews" className="text-meta link-underline inline-flex items-center gap-1.5">
              <Star className="size-3.5 text-gold" fill="currentColor" aria-hidden="true" />
              {design.rating} · {design.reviews} reviews
            </a>
          </div>

          <p
            className={`text-label mt-4 inline-flex items-center gap-2 ${
              disabled ? "text-muted-foreground" : "text-gold"
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${disabled ? "bg-muted-foreground" : "bg-gold"}`}
            />
            {soldOut
              ? "Sold out — this run has finished"
              : stock === "out"
                ? `Out of stock in ${size}`
                : stock === "low"
                  ? `Low availability in ${size}`
                  : "Made to order — production starts when you order"}
          </p>

          {/* PRODUCT SWITCHER */}
          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-label">Choose the object</h2>
              <span className="text-meta">{design.products.length} available</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {design.products.map((p) => {
                const t = productType(p);
                const active = p === productId;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => switchProduct(p)}
                    aria-pressed={active}
                    className={`text-label flex min-h-11 items-center gap-2 border px-4 transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {active ? <Check className="size-3" aria-hidden="true" /> : null}
                    {t.name}
                    <span className={active ? "opacity-70" : "text-muted-foreground"}>
                      {format(t.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLOR */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <h2 className="text-label">Colour</h2>
              <span className="text-meta">{color.name}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {type.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorName(c.name)}
                  aria-pressed={c.name === color.name}
                  aria-label={c.name}
                  className={`grid size-11 place-items-center border transition-colors ${
                    c.name === color.name ? "border-foreground" : "border-border hover:border-border-strong"
                  }`}
                >
                  <span
                    className="size-6 rounded-full border border-border-strong"
                    style={{ backgroundColor: c.value }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          {type.sizes ? (
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <h2 className="text-label">{type.id === "phonecase" ? "Device" : "Size"}</h2>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  className="text-meta link-underline min-h-11"
                >
                  Size guide
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {type.sizes.map((s) => {
                  const st = availability(productId, s);
                  const selected = s === size;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSize(s);
                        setSizeError(null);
                      }}
                      aria-pressed={selected}
                      aria-disabled={st === "out"}
                      title={st === "out" ? `${s} — out of stock` : undefined}
                      className={`text-label relative flex h-11 min-w-14 items-center justify-center border px-3 transition-colors ${
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      } ${st === "out" ? "text-muted-foreground line-through opacity-60" : ""}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {sizeError ? (
                <p role="alert" className="text-meta mt-3 text-destructive">
                  {sizeError}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* QTY + CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <QuantitySelector qty={qty} onChange={setQty} />
            <Button
              className="min-w-52 flex-1"
              size="lg"
              loading={adding}
              disabled={disabled}
              onClick={() => commit()}
            >
              {disabled ? "Unavailable" : `Add to bag — ${format(type.price * qty)}`}
            </Button>
            <WishlistButton slug={design.slug} className="h-14 px-5" label="Save" />
          </div>
          <Button
            variant="secondary"
            size="block"
            className="mt-3"
            disabled={disabled}
            onClick={() => commit(() => toast("Continue in your bag to check out"))}
          >
            Buy now
          </Button>

          {disabled ? (
            <div className="mt-4">
              <Notice
                tone="warn"
                title="This option isn't available"
                body="Choose another size or colourway, or save the design and we'll keep it in your wishlist."
              />
            </div>
          ) : null}

          <ul className="mt-8 space-y-3 border-t border-border pt-6">
            {[
              [Truck, `Delivery to ${region.country} in ${region.delivery}`],
              [RefreshCw, "Free returns within 30 days"],
              [Globe, "Printed by the partner closest to you"],
            ].map(([Icon, text]) => {
              const I = Icon as typeof Truck;
              return (
                <li key={text as string} className="text-body-sm flex items-center gap-3">
                  <I className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-muted-foreground">{text as string}</span>
                </li>
              );
            })}
          </ul>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="details">
              <AccordionTrigger className="text-label">Product details</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                {type.description} {type.fulfilment}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="materials">
              <AccordionTrigger className="text-label">Materials</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                {type.fulfilment} Printed with water-based, OEKO-TEX certified inks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-label">Care instructions</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                Wash cold inside out, hang dry, do not tumble dry, do not iron directly on the print.
                Hard goods are wiped clean; stoneware is dishwasher safe.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-label">Shipping & duties</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                Production takes 2–4 days before dispatch. {region.taxNote}. Delivery to{" "}
                {region.country} takes {region.delivery} after dispatch.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger className="text-label">Returns</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                Thirty days from delivery for unworn items in original packaging. Prepaid labels for
                the EU and UK; elsewhere we refund the return postage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ONE DESIGN. MANY EXPRESSIONS. */}
      <section className="editorial section">
        <div className="container-page">
          <div className="grid gap-6 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="text-label text-gold">One design. Many expressions.</p>
              <h2 className="text-h2 mt-3">{design.name}, on {design.products.length} objects</h2>
              <p className="text-body mt-4 max-w-xl text-muted-foreground">
                The same artwork, proofed for every surface. Choose an object to load it into the
                configurator above — the price, colourways and sizes update with it.
              </p>
            </div>
            <p className="text-label text-muted-foreground">
              Currently configuring · {type.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-5">
            {design.products.map((p) => {
              const t = productType(p);
              const active = p === productId;
              return (
                <button
                  key={p}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    switchProduct(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`group relative p-3 text-left transition-colors ${
                    active ? "bg-surface-2" : "bg-background hover:bg-surface"
                  }`}
                >
                  {active ? (
                    <span className="text-label absolute right-3 top-3 z-10 inline-flex items-center gap-1 bg-foreground px-2 py-1 text-background">
                      <Check className="size-3" aria-hidden="true" /> Selected
                    </span>
                  ) : null}
                  <Mockup design={design} productId={p} />
                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <span className="text-body-sm truncate">{t.name}</span>
                    <span className="text-meta shrink-0">{format(t.price)}</span>
                  </div>
                  <span className="text-meta mt-1 block">
                    {t.colors.length} colours{t.sizes ? ` · ${t.sizes.length} sizes` : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section container-page">
        <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <div>
            <p className="text-label text-gold">Reviews</p>
            <h2 className="text-h2 mt-3">{design.rating} out of 5</h2>
            <p className="text-meta mt-3">Based on {design.reviews} verified purchases</p>
            <ul className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((s, i) => {
                const pct = [78, 15, 4, 2, 1][i]!;
                return (
                  <li key={s} className="grid grid-cols-[2rem_minmax(0,1fr)_2.5rem] items-center gap-3">
                    <span className="text-meta">{s}★</span>
                    <span className="h-1.5 w-full bg-surface-2" aria-hidden="true">
                      <span className="block h-full bg-gold/70" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-meta text-right">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {REVIEWS.map((r) => (
              <li key={r.name} className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-h4">{r.title}</h3>
                  <span className="text-meta">
                    {r.name} · {r.place}
                  </span>
                </div>
                <p className="text-meta mt-2 text-gold" aria-label={`${r.rating} out of 5 stars`}>
                  {"★".repeat(r.rating)}
                  <span className="text-muted-foreground">{"★".repeat(5 - r.rating)}</span>
                </p>
                <p className="text-body mt-3 text-muted-foreground">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container-page pt-0">
        <div className="pb-10">
          <p className="text-label text-gold">Also from the archive</p>
          <h2 className="text-h2 mt-3">More designs</h2>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((d) => (
            <DesignCard key={d.slug} design={d} />
          ))}
        </div>
        <div className="mt-12">
          <Button asChild variant="secondary">
            <Link to="/designs">All designs</Link>
          </Button>
        </div>
      </section>

      {/* STICKY MOBILE BUY BAR */}
      <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-body-sm truncate">
              {design.name} · {type.name}
            </p>
            <p className="text-meta truncate">
              {color.name}
              {size ? ` · ${size}` : ""}
            </p>
          </div>
          <Button loading={adding} disabled={disabled} onClick={() => commit()} className="shrink-0">
            {disabled ? "Unavailable" : `Add · ${format(type.price * qty)}`}
          </Button>
        </div>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} type={type} />
    </>
  );
}
