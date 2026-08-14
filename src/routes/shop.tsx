import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, EmptyState, SkeletonCard } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { Chip, Overlay, Segmented } from "@/components/store/ui";
import { DESIGNS, PRODUCT_TYPES, productType, type ProductTypeId } from "@/lib/catalog";

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

const SORTS = ["Newest", "Price: low to high", "Price: high to low", "Best selling"] as const;
type Sort = (typeof SORTS)[number];

const CATEGORIES = ["All", "Apparel", "Accessories", "Home", "Kids", "Print"] as const;
type Category = (typeof CATEGORIES)[number];

const PAGE = 12;

function Shop() {
  const { type } = Route.useSearch();
  const navigate = useNavigate();
  const [sort, setSort] = useState<Sort>("Newest");
  const [category, setCategory] = useState<Category>("All");
  const [collection, setCollection] = useState<string>("All");
  const [drawer, setDrawer] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const [loading, setLoading] = useState(false);

  const rows = useMemo(() => {
    const list = DESIGNS.filter((d) => collection === "All" || d.collection === collection).flatMap((d) =>
      d.products
        .filter((p) => (type ? p === type : true))
        .filter((p) => category === "All" || productType(p).category === category)
        .map((p) => ({ design: d, productId: p, price: productType(p).price, reviews: d.reviews })),
    );
    const sorted = [...list];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Best selling") sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [type, category, collection, sort]);

  const visible = rows.slice(0, shown);
  const collections = ["All", ...Array.from(new Set(DESIGNS.map((d) => d.collection)))];
  const activeCount = (type ? 1 : 0) + (category === "All" ? 0 : 1) + (collection === "All" ? 0 : 1);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShown((n) => n + PAGE);
      setLoading(false);
    }, 450);
  };

  const clearAll = () => {
    setCategory("All");
    setCollection("All");
    void navigate({ to: "/shop", search: {} });
  };

  const filters = (
    <div className="space-y-10">
      <div>
        <p className="text-label text-muted-foreground">Category</p>
        <div className="mt-4">
          <Segmented
            ariaLabel="Filter by category"
            value={category}
            onChange={(v) => setCategory(v as Category)}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
        </div>
      </div>
      <div>
        <p className="text-label text-muted-foreground">Collection</p>
        <div className="mt-4">
          <Segmented
            ariaLabel="Filter by collection"
            value={collection}
            onChange={setCollection}
            options={collections.map((c) => ({ value: c, label: c }))}
          />
        </div>
      </div>
      <div>
        <p className="text-label text-muted-foreground">Product type</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/shop" search={{}} className={`text-label flex min-h-11 items-center border px-4 ${!type ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
            All
          </Link>
          {PRODUCT_TYPES.map((p) => (
            <Link
              key={p.id}
              to="/shop"
              search={{ type: p.id }}
              className={`text-label flex min-h-11 items-center border px-4 ${type === p.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

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
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="text-label flex min-h-11 items-center gap-2 border border-border px-4 hover:border-foreground"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
          <span className="text-meta hidden sm:block" aria-live="polite">{rows.length} products</span>
          <div>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="text-label h-11 cursor-pointer appearance-none border border-border bg-transparent px-4"
            >
              {SORTS.map((s) => (<option key={s} className="bg-background">{s}</option>))}
            </select>
          </div>
        </div>

        {activeCount ? (
          <div className="container-page flex flex-wrap items-center gap-2 border-t border-border py-3">
            {type ? <Chip label={productType(type).name} onRemove={() => void navigate({ to: "/shop", search: {} })} /> : null}
            {category !== "All" ? <Chip label={category} onRemove={() => setCategory("All")} /> : null}
            {collection !== "All" ? <Chip label={collection} onRemove={() => setCollection("All")} /> : null}
            <button type="button" onClick={clearAll} className="text-label link-underline ml-2 min-h-11">Clear all</button>
          </div>
        ) : null}
      </div>

      <section className="section container-page grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-40">{filters}</div>
        </aside>

        <div>
          {rows.length === 0 ? (
            <EmptyState
              title="Nothing matches those filters"
              body="Try removing a filter, or start from a design and choose the object afterwards."
              action={<Button variant="secondary" onClick={clearAll}>Clear filters</Button>}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
                {visible.map((r) => (<ProductCard key={r.design.slug + r.productId} design={r.design} productId={r.productId} />))}
                {loading ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`s${i}`} />) : null}
              </div>
              {shown < rows.length ? (
                <div className="mt-16 flex flex-col items-center gap-4">
                  <p className="text-meta">Showing {visible.length} of {rows.length}</p>
                  <Button variant="secondary" onClick={loadMore} disabled={loading}>
                    {loading ? "Loading…" : "Load more"}
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <Overlay open={drawer} onClose={() => setDrawer(false)} title="Filters" side="bottom" footer={
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={clearAll}>Clear</Button>
          <Button className="flex-1" onClick={() => setDrawer(false)}>Show {rows.length} products</Button>
        </div>
      }>
        {filters}
      </Overlay>
    </>
  );
}
