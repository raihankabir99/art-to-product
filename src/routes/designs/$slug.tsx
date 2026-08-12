import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, Truck, RefreshCw, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mockup } from "@/components/store/Mockup";
import { Breadcrumbs } from "@/components/store/page";
import { DesignCard, Price, WishlistButton } from "@/components/store/cards";
import { QuantitySelector } from "@/components/store/CartDrawer";
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

function DesignDetail() {
  const { design } = Route.useLoaderData();
  const { product } = Route.useSearch();
  const { addToCart, format, region } = useStore();

  const [productId, setProductId] = useState<ProductTypeId>(
    product && design.products.includes(product) ? product : design.products[0]!,
  );
  const type = productType(productId);
  const [colorName, setColorName] = useState(type.colors[0]!.name);
  const [size, setSize] = useState(type.sizes?.[2] ?? type.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const color = useMemo(
    () => type.colors.find((c) => c.name === colorName) ?? type.colors[0]!,
    [type, colorName],
  );

  function switchProduct(next: ProductTypeId) {
    const nextType = productType(next);
    setProductId(next);
    setColorName(nextType.colors[0]!.name);
    setSize(nextType.sizes?.[2] ?? nextType.sizes?.[0]);
  }

  const related = DESIGNS.filter((d) => d.slug !== design.slug).slice(0, 3);

  return (
    <>
      <div className="container-page py-6">
        <Breadcrumbs
          trail={[{ label: "Designs", to: "/designs" }, { label: design.name }]}
        />
      </div>

      <section className="container-page grid gap-12 pb-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="relative border border-border">
            <Mockup
              key={productId + color.name}
              design={design}
              productId={productId}
              colorValue={color.value}
              tone={color.tone}
              priority
              className="fade-in-soft"
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {design.badges.map((b) => (
                <Badge key={b} variant={b === "Sale" ? "sale" : b === "Limited" ? "gold" : "default"}>
                  {b}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {type.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColorName(c.name)}
                aria-label={`View ${c.name}`}
                aria-pressed={c.name === color.name}
                className={`border ${c.name === color.name ? "border-foreground" : "border-border"}`}
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
            <span className="text-meta">
              ★ {design.rating} ({design.reviews})
            </span>
          </div>

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
                  className={`grid size-11 place-items-center border ${
                    c.name === color.name ? "border-foreground" : "border-border"
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
                <button type="button" className="text-meta link-underline">
                  Size guide
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {type.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={s === size}
                    className={`text-label flex h-11 min-w-14 items-center justify-center border px-3 ${
                      s === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* QTY + CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <QuantitySelector qty={qty} onChange={setQty} />
            <Button
              className="min-w-52 flex-1"
              size="lg"
              loading={adding}
              onClick={() => {
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
                }, 550);
              }}
            >
              Add to bag — {format(type.price * qty)}
            </Button>
            <WishlistButton slug={design.slug} className="h-14 px-5" label="Save" />
          </div>

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
            <AccordionItem value="print">
              <AccordionTrigger className="text-label">Print & care</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                Printed with water-based, OEKO-TEX certified inks. Wash cold inside out, hang dry,
                do not iron directly on the print.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-label">Shipping & duties</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                Production takes 2–4 days before dispatch. {region.taxNote}. Orders outside the EU
                may be subject to local import duties shown at checkout.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ALL PRODUCTS FOR THIS DESIGN */}
      <section className="editorial section">
        <div className="container-page">
          <div className="pb-10">
            <p className="text-label text-gold">The full range</p>
            <h2 className="text-h2 mt-3">{design.name} on everything</h2>
          </div>
          <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-5">
            {design.products.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  switchProduct(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group bg-background p-3 text-left transition-colors hover:bg-surface"
              >
                <Mockup design={design} productId={p} />
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-body-sm truncate">{productType(p).name}</span>
                  <span className="text-meta shrink-0">{format(productType(p).price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-page">
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
    </>
  );
}
