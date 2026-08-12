import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProductCard, EmptyState } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { DESIGNS, PRODUCT_TYPES, type ProductTypeId } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { type?: ProductTypeId } => {
    const t = search["type"];
    return typeof t === "string" ? { type: t as ProductTypeId } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop All Products | Atelier Noir" },
      { name: "description", content: "Every design across thirteen product types — apparel, accessories, home and print. Made to order, shipped worldwide." },
      { property: "og:title", content: "Shop All Products | Atelier Noir" },
      { property: "og:description", content: "Every design across thirteen product types — apparel, accessories, home and print. Made to order, shipped worldwide." },
    ],
  }),
  component: Shop,
});

const SORTS = ["Newest", "Price: low to high", "Price: high to low", "Best selling"];

function Shop() {
  const { type } = Route.useSearch();
  const [sort, setSort] = useState(SORTS[0]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const types = type ? PRODUCT_TYPES.filter((p) => p.id === type) : PRODUCT_TYPES;
  const rows = DESIGNS.flatMap((d) =>
    d.products.filter((p) => types.some((t) => t.id === p)).map((p) => ({ design: d, productId: p })),
  ).slice(0, 24);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title={type ? (PRODUCT_TYPES.find((p) => p.id === type)?.name ?? "All products") : "All products"}
        intro="Every design, on every object we make. Nothing is produced until you order it."
        trail={[{ label: "Shop" }]}
      />
      <div className="sticky top-16 z-30 border-b border-border bg-background/92 backdrop-blur-xl lg:top-20">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <button type="button" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} className="text-label flex min-h-11 items-center gap-2 border border-border px-4">
            Filters
          </button>
          <span className="text-meta hidden sm:block">{rows.length} products</span>
          <div>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="text-label h-11 cursor-pointer appearance-none border border-border bg-transparent px-4">
              {SORTS.map((s) => (<option key={s} className="bg-background">{s}</option>))}
            </select>
          </div>
        </div>
        {filtersOpen ? (
          <div className="container-page fade-in-soft border-t border-border py-6">
            <p className="text-label text-muted-foreground">Product type</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/shop" className={`text-label flex min-h-11 items-center border px-4 ${!type ? "border-foreground bg-foreground text-background" : "border-border"}`}>All</Link>
              {PRODUCT_TYPES.map((p) => (
                <Link key={p.id} to="/shop" search={{ type: p.id }} className={`text-label flex min-h-11 items-center border px-4 ${type === p.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <section className="section container-page">
        {rows.length === 0 ? (
          <EmptyState title="Nothing here yet" body="This product type has no designs applied to it right now." action={<Button asChild variant="secondary"><Link to="/designs">Explore designs</Link></Button>} />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {rows.map((r) => (<ProductCard key={r.design.slug + r.productId} design={r.design} productId={r.productId} />))}
          </div>
        )}
      </section>
    </>
  );
}
