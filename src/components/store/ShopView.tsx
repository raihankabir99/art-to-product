import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "./page";
import { Chip } from "./ui";
import { EmptyState } from "./cards";
import { Newsletter } from "./Newsletter";
import {
  CategoryTabs,
  FilterDrawer,
  FilterPanel,
  ProductGrid,
  QuickViewModal,
  SortSelect,
  buildRows,
  emptyFilters,
  filterCount,
  type Row,
  type ShopFilters,
  type Sort,
} from "./shop";
import { PRICE_BANDS, productType, type ProductTypeId } from "@/lib/catalog";

const PAGE = 12;

/**
 * The single shop surface. `/shop` and every `/shop/:category` page render
 * this with a different title, intro and product-type restriction.
 */
export function ShopView({
  eyebrow = "Shop",
  title,
  intro,
  trail,
  categorySlug,
  allowedTypes,
  initialTypes,
}: {
  eyebrow?: string | undefined;
  title: string;
  intro: string;
  trail: { label: string; to?: string }[];
  categorySlug?: string | undefined;
  allowedTypes?: ProductTypeId[] | undefined;
  initialTypes?: ProductTypeId[] | undefined;
}) {
  const [filters, setFilters] = useState<ShopFilters>({
    ...emptyFilters,
    types: initialTypes ?? [],
  });
  const [sort, setSort] = useState<Sort>("Featured");
  const [shown, setShown] = useState(PAGE);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [quick, setQuick] = useState<Row | null>(null);

  const rows = useMemo(() => buildRows(filters, sort, allowedTypes), [filters, sort, allowedTypes]);
  const visible = rows.slice(0, shown);
  const active = filterCount(filters);
  const lockTypes = Boolean(allowedTypes);

  const clearAll = () => {
    setFilters({ ...emptyFilters, types: initialTypes ?? [] });
    setShown(PAGE);
  };

  const removeChip = (key: keyof ShopFilters, value: string) =>
    setFilters({ ...filters, [key]: (filters[key] as string[]).filter((v) => v !== value) });

  const chips: { key: keyof ShopFilters; value: string; label: string }[] = [
    ...(lockTypes ? [] : filters.types.map((t) => ({ key: "types" as const, value: t, label: productType(t).name }))),
    ...filters.sizes.map((s) => ({ key: "sizes" as const, value: s, label: `Size ${s}` })),
    ...filters.colors.map((c) => ({ key: "colors" as const, value: c, label: c })),
    ...filters.bands.map((b) => ({
      key: "bands" as const,
      value: b,
      label: PRICE_BANDS.find((p) => p.id === b)?.label ?? b,
    })),
    ...filters.edits.map((e) => ({ key: "edits" as const, value: e, label: e })),
    ...filters.styles.map((s) => ({ key: "styles" as const, value: s, label: s })),
  ];

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShown((n) => n + PAGE);
      setLoading(false);
    }, 420);
  };

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} trail={trail} />

      <CategoryTabs active={categorySlug} />

      <div className="sticky top-16 z-30 border-b border-border bg-background/92 backdrop-blur-xl lg:top-20">
        <div className="container-page flex items-center justify-between gap-3 py-3">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="text-label flex min-h-11 items-center gap-2 border border-border px-4 transition-colors hover:border-foreground lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters{chips.length ? ` (${chips.length})` : ""}
          </button>
          <p className="text-meta hidden lg:block" aria-live="polite">
            {rows.length} products
          </p>
          <p className="text-meta lg:hidden" aria-live="polite">
            {rows.length}
          </p>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {chips.length ? (
          <div className="container-page flex flex-wrap items-center gap-2 border-t border-border py-3">
            {chips.map((c) => (
              <Chip key={`${c.key}-${c.value}`} label={c.label} onRemove={() => removeChip(c.key, c.value)} />
            ))}
            <button type="button" onClick={clearAll} className="text-label link-underline ml-2 min-h-11">
              Clear all
            </button>
          </div>
        ) : null}
      </div>

      <section className="section container-page grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-40 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
            <h2 className="sr-only">Filters</h2>
            <FilterPanel filters={filters} setFilters={setFilters} lockTypes={lockTypes} />
            {chips.length ? (
              <Button variant="secondary" className="mt-10 w-full" onClick={clearAll}>
                Clear all
              </Button>
            ) : null}
          </div>
        </aside>

        <div className="min-w-0">
          {rows.length === 0 ? (
            <EmptyState
              title="No products found"
              body="We couldn't find anything matching your selection. Try removing a filter, or start from a design and choose the object afterwards."
              action={
                <Button variant="secondary" onClick={clearAll}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              <ProductGrid rows={visible} loading={loading} onQuickView={setQuick} />
              {shown < rows.length ? (
                <div className="mt-16 flex flex-col items-center gap-4">
                  <p className="text-meta">
                    Showing {visible.length} of {rows.length}
                  </p>
                  <Button variant="secondary" onClick={loadMore} disabled={loading}>
                    {loading ? "Loading…" : "Load more"}
                  </Button>
                </div>
              ) : (
                <p className="text-meta mt-16 text-center">
                  You've reached the end — {rows.length} products.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <Newsletter />

      <FilterDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        filters={filters}
        setFilters={setFilters}
        lockTypes={lockTypes}
        resultCount={rows.length}
        onClear={clearAll}
      />
      <QuickViewModal row={quick} onClose={() => setQuick(null)} />
    </>
  );
}
