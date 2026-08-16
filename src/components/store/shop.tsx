import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Minus, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mockup } from "./Mockup";
import { Price, WishlistButton, EmptyState, SkeletonCard } from "./cards";
import { Overlay, Segmented } from "./ui";
import { useStore } from "./store";
import {
  DESIGNS,
  DESIGN_STYLES,
  EDITS,
  PRICE_BANDS,
  PRODUCT_TYPES,
  SHOP_CATEGORIES,
  categorySlugForType,
  productType,
  stockState,
  type Design,
  type ProductTypeId,
} from "@/lib/catalog";

/* ------------------------------------------------------------------ *
 * Shop component system. Every category page reuses these pieces —
 * only the title, intro and preset filters change.
 * ------------------------------------------------------------------ */

export const SORTS = [
  "Featured",
  "Newest",
  "Best Selling",
  "Price: Low to High",
  "Price: High to Low",
] as const;
export type Sort = (typeof SORTS)[number];

export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const COLOR_FAMILIES: { name: string; swatch: string; matches: string[] }[] = [
  { name: "Black", swatch: "#0d0d0d", matches: ["black", "matte black", "ink", "charcoal"] },
  { name: "White", swatch: "#f4f2ee", matches: ["white", "matte white", "museum white", "clear"] },
  { name: "Cream", swatch: "#e2dbcb", matches: ["bone", "natural", "sand", "stone", "clay"] },
  { name: "Grey", swatch: "#8d8d8a", matches: ["slate", "ash"] },
  { name: "Green", swatch: "#3a4034", matches: ["moss"] },
];

const familyOf = (colorName: string) =>
  COLOR_FAMILIES.find((f) => f.matches.includes(colorName.toLowerCase()))?.name;

export interface ShopFilters {
  types: ProductTypeId[];
  sizes: string[];
  colors: string[];
  bands: string[];
  edits: string[];
  styles: string[];
}

export const emptyFilters: ShopFilters = {
  types: [],
  sizes: [],
  colors: [],
  bands: [],
  edits: [],
  styles: [],
};

export const filterCount = (f: ShopFilters) =>
  f.types.length + f.sizes.length + f.colors.length + f.bands.length + f.edits.length + f.styles.length;

export interface Row {
  design: Design;
  productId: ProductTypeId;
}

export function buildRows(filters: ShopFilters, sort: Sort, allowed?: ProductTypeId[]): Row[] {
  const rows: Row[] = [];
  DESIGNS.forEach((design) => {
    design.products.forEach((productId) => {
      if (allowed && !allowed.includes(productId)) return;
      const type = productType(productId);
      if (filters.types.length && !filters.types.includes(productId)) return;
      if (filters.sizes.length && !filters.sizes.some((s) => type.sizes?.includes(s))) return;
      if (
        filters.colors.length &&
        !type.colors.some((c) => filters.colors.includes(familyOf(c.name) ?? ""))
      )
        return;
      if (
        filters.bands.length &&
        !PRICE_BANDS.some(
          (b) => filters.bands.includes(b.id) && type.price >= b.min && type.price < b.max,
        )
      )
        return;
      if (filters.edits.length && !design.edits.some((e) => filters.edits.includes(e))) return;
      if (filters.styles.length && !filters.styles.includes(design.style)) return;
      rows.push({ design, productId });
    });
  });

  const price = (r: Row) => productType(r.productId).price;
  const sorted = [...rows];
  if (sort === "Price: Low to High") sorted.sort((a, b) => price(a) - price(b));
  if (sort === "Price: High to Low") sorted.sort((a, b) => price(b) - price(a));
  if (sort === "Best Selling") sorted.sort((a, b) => b.design.reviews - a.design.reviews);
  if (sort === "Newest")
    sorted.sort((a, b) => Number(b.design.year) - Number(a.design.year) || a.design.name.localeCompare(b.design.name));
  return sorted;
}

/* ---------------- Category navigation ---------------- */

export function CategoryTabs({ active }: { active?: string | undefined }) {
  return (
    <nav aria-label="Product categories" className="border-b border-border">
      <div className="container-page">
        <ul className="scrollbar-none -mx-1 flex snap-x gap-1 overflow-x-auto">
          <li className="snap-start">
            <Link
              to="/shop"
              className={cn(
                "text-label flex min-h-12 items-center whitespace-nowrap px-4 transition-colors",
                !active
                  ? "border-b-2 border-gold text-foreground"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-foreground",
              )}
              aria-current={!active ? "page" : undefined}
            >
              All
            </Link>
          </li>
          {SHOP_CATEGORIES.map((c) => (
            <li key={c.slug} className="snap-start">
              <Link
                to="/shop/$category"
                params={{ category: c.slug }}
                aria-current={active === c.slug ? "page" : undefined}
                className={cn(
                  "text-label flex min-h-12 items-center whitespace-nowrap px-4 transition-colors",
                  active === c.slug
                    ? "border-b-2 border-gold text-foreground"
                    : "border-b-2 border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ---------------- Sort ---------------- */

export function SortSelect({ value, onChange }: { value: Sort; onChange: (s: Sort) => void }) {
  return (
    <div>
      <label htmlFor="shop-sort" className="sr-only">
        Sort products by
      </label>
      <select
        id="shop-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as Sort)}
        className="text-label h-11 cursor-pointer appearance-none border border-border bg-transparent px-4 focus-visible:border-foreground"
      >
        {SORTS.map((s) => (
          <option key={s} className="bg-background">
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- Filters ---------------- */

function ToggleList({
  legend,
  options,
  selected,
  onToggle,
  swatches,
}: {
  legend: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
  swatches?: Record<string, string>;
}) {
  return (
    <fieldset>
      <legend className="text-label text-muted-foreground">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o.value);
          return (
            <label
              key={o.value}
              className={cn(
                "text-label inline-flex min-h-11 cursor-pointer items-center gap-2 border px-3 transition-colors",
                on ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
              )}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle(o.value)}
                className="sr-only"
              />
              {swatches?.[o.value] ? (
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full border border-border-strong"
                  style={{ backgroundColor: swatches[o.value] }}
                />
              ) : null}
              {o.label}
              {on ? <span aria-hidden="true">✓</span> : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FilterPanel({
  filters,
  setFilters,
  lockTypes,
}: {
  filters: ShopFilters;
  setFilters: (f: ShopFilters) => void;
  lockTypes?: boolean | undefined;
}) {
  const toggle = (key: keyof ShopFilters, value: string) => {
    const list = filters[key] as string[];
    const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
    setFilters({ ...filters, [key]: next });
  };

  return (
    <div className="space-y-10">
      {lockTypes ? null : (
        <ToggleList
          legend="Product type"
          options={PRODUCT_TYPES.map((p) => ({ value: p.id, label: p.name }))}
          selected={filters.types}
          onToggle={(v) => toggle("types", v)}
        />
      )}
      <ToggleList
        legend="Size"
        options={SIZE_OPTIONS.map((s) => ({ value: s, label: s }))}
        selected={filters.sizes}
        onToggle={(v) => toggle("sizes", v)}
      />
      <ToggleList
        legend="Colour"
        options={COLOR_FAMILIES.map((c) => ({ value: c.name, label: c.name }))}
        selected={filters.colors}
        onToggle={(v) => toggle("colors", v)}
        swatches={Object.fromEntries(COLOR_FAMILIES.map((c) => [c.name, c.swatch]))}
      />
      <ToggleList
        legend="Price"
        options={PRICE_BANDS.map((b) => ({ value: b.id, label: b.label }))}
        selected={filters.bands}
        onToggle={(v) => toggle("bands", v)}
      />
      <ToggleList
        legend="Collection"
        options={EDITS.map((e) => ({ value: e, label: e }))}
        selected={filters.edits}
        onToggle={(v) => toggle("edits", v)}
      />
      <ToggleList
        legend="Design style"
        options={DESIGN_STYLES.map((s) => ({ value: s, label: s }))}
        selected={filters.styles}
        onToggle={(v) => toggle("styles", v)}
      />
    </div>
  );
}

export function FilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  lockTypes,
  resultCount,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  filters: ShopFilters;
  setFilters: (f: ShopFilters) => void;
  lockTypes?: boolean | undefined;
  resultCount: number;
  onClear: () => void;
}) {
  return (
    <Overlay
      open={open}
      onClose={onClose}
      title="Filters"
      side="bottom"
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClear}>
            Clear all
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Show {resultCount} products
          </Button>
        </div>
      }
    >
      <FilterPanel filters={filters} setFilters={setFilters} lockTypes={lockTypes} />
    </Overlay>
  );
}

/* ---------------- Quick view ---------------- */

export function QuickViewModal({
  row,
  onClose,
}: {
  row: Row | null;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const type = row ? productType(row.productId) : null;
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setColor(0);
    setQty(1);
    setSize(row ? productType(row.productId).sizes?.[2] ?? productType(row.productId).sizes?.[0] : undefined);
  }, [row]);

  if (!row || !type) return null;
  const swatch = type.colors[color] ?? type.colors[0]!;
  const stock = stockState(row.design.slug, row.productId);

  return (
    <Overlay open onClose={onClose} title="Quick view" side="center">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="border border-border">
          <Mockup
            design={row.design}
            productId={row.productId}
            colorValue={swatch.value}
            tone={swatch.tone}
            priority
          />
        </div>

        <div className="min-w-0">
          <p className="text-label text-gold">{row.design.name}</p>
          <h3 className="text-h3 mt-2">{type.name}</h3>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5" fill={i < Math.round(row.design.rating) ? "currentColor" : "none"} />
              ))}
            </span>
            <span className="text-meta">
              {row.design.rating.toFixed(1)} · {row.design.reviews} reviews
            </span>
          </div>
          <Price value={type.price} compareAt={type.compareAt} className="mt-5" />

          <div className="mt-7">
            <p className="text-label text-muted-foreground">Colour — {swatch.name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {type.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(i)}
                  aria-pressed={i === color}
                  aria-label={`Colour ${c.name}`}
                  className={cn(
                    "grid size-11 place-items-center border transition-colors",
                    i === color ? "border-gold" : "border-border hover:border-foreground",
                  )}
                >
                  <span
                    className="size-5 rounded-full border border-border-strong"
                    style={{ backgroundColor: c.value }}
                  />
                </button>
              ))}
            </div>
          </div>

          {type.sizes ? (
            <div className="mt-7">
              <p className="text-label text-muted-foreground">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {type.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={s === size}
                    className={cn(
                      "text-label min-h-11 border px-4 transition-colors",
                      s === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-7 flex items-center gap-4">
            <p className="text-label text-muted-foreground">Quantity</p>
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid size-11 place-items-center hover:text-gold"
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <span className="text-body-sm w-8 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="grid size-11 place-items-center hover:text-gold"
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {stock !== "in" ? (
            <p className="text-meta mt-5">
              {stock === "out" ? "Currently unavailable in this combination." : "Low stock — made to order."}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3">
            <Button
              disabled={stock === "out"}
              onClick={() => {
                addToCart({
                  designSlug: row.design.slug,
                  designName: row.design.name,
                  productId: row.productId,
                  productName: type.name,
                  color: swatch.name,
                  colorValue: swatch.value,
                  ...(size ? { size } : {}),
                  price: type.price,
                  qty,
                });
                onClose();
              }}
            >
              {stock === "out" ? "Out of stock" : "Add to cart"}
            </Button>
            <Link
              to="/designs/$slug"
              params={{ slug: row.design.slug }}
              search={{ product: row.productId }}
              onClick={onClose}
              className="text-label link-underline self-start text-gold"
            >
              View full product
            </Link>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------------- Product card ---------------- */

export function ShopProductCard({
  row,
  onQuickView,
}: {
  row: Row;
  onQuickView: (r: Row) => void;
}) {
  const { design, productId } = row;
  const type = productType(productId);
  const [hover, setHover] = useState(false);
  const stock = stockState(design.slug, productId);
  const soldOut = stock === "out";
  const badge = design.badges[0];
  const categorySlug = categorySlugForType(productId);

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden border border-border">
        {soldOut ? (
          <div className="relative">
            <Mockup design={design} productId={productId} className="opacity-40" />
            <span className="text-label absolute inset-x-0 bottom-0 border-t border-border bg-background/90 py-3 text-center">
              Out of stock
            </span>
          </div>
        ) : (
          <Link
            to="/designs/$slug"
            params={{ slug: design.slug }}
            search={{ product: productId }}
            className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span className="sr-only">
              {design.name} on {type.name}
            </span>
            <Mockup
              design={design}
              productId={productId}
              view={hover ? "lifestyle" : "front"}
              className="transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02]"
            />
          </Link>
        )}

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          {badge ? (
            <Badge
              variant={badge === "Sale" ? "sale" : badge === "Limited" ? "gold" : "default"}
              className="pointer-events-auto"
            >
              {badge === "Bestseller" ? "Best seller" : badge}
            </Badge>
          ) : null}
          {stock === "low" ? (
            <Badge variant="gold" className="pointer-events-auto">
              Low stock
            </Badge>
          ) : null}
        </div>

        <div className="absolute right-3 top-3">
          <WishlistButton slug={design.slug} />
        </div>

        {soldOut ? null : (
          <button
            type="button"
            onClick={() => onQuickView(row)}
            className="text-label absolute inset-x-0 bottom-0 flex min-h-12 translate-y-full items-center justify-center gap-2 bg-background/92 backdrop-blur transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-y-0 group-focus-within:translate-y-0 focus-visible:translate-y-0 max-md:hidden"
          >
            <Eye className="size-4" aria-hidden="true" /> Quick view
          </button>
        )}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pt-4">
        <div className="min-w-0">
          <h3 className="text-h4 truncate">{design.name}</h3>
          <p className="text-meta mt-1 truncate">{type.name}</p>
        </div>
        <Price value={type.price} compareAt={type.compareAt} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <Link
          to="/designs/$slug"
          params={{ slug: design.slug }}
          className="text-label link-underline text-gold"
        >
          View design
        </Link>
        {categorySlug ? (
          <Link
            to="/shop/$category"
            params={{ category: categorySlug }}
            className="text-meta hover:text-foreground"
          >
            {type.category}
          </Link>
        ) : (
          <span className="text-meta">{type.category}</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onQuickView(row)}
        className="text-label mt-3 min-h-11 border border-border transition-colors hover:border-foreground md:hidden"
      >
        Quick view
      </button>
    </article>
  );
}

/* ---------------- Grid ---------------- */

export function ProductGrid({
  rows,
  loading,
  onQuickView,
}: {
  rows: Row[];
  loading?: boolean | undefined;
  onQuickView: (r: Row) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
      {rows.map((r) => (
        <ShopProductCard key={`${r.design.slug}-${r.productId}`} row={r} onQuickView={onQuickView} />
      ))}
      {loading ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />) : null}
    </div>
  );
}

export { EmptyState, Segmented };
