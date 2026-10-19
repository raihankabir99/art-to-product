import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X, ArrowDown, Sparkles } from "lucide-react";
import { DesignCard, EmptyState } from "@/components/store/cards";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DESIGNS,
  COLLECTIONS,
  PRODUCT_TYPES,
  type ProductTypeId,
  type Design,
} from "@/lib/catalog";
import artLion from "@/assets/art-midnight-lion.png";

export const Route = createFileRoute("/designs/")({
  head: () => ({
    meta: [
      { title: "Discover the Designs — One Design, Many Objects | Atelier Mono" },
      {
        name: "description",
        content:
          "Original artwork made to live beyond one product. Browse the archive — choose the drawing first, then explore every product carrying that design.",
      },
      { property: "og:title", content: "Discover the Designs | Atelier Mono" },
      {
        property: "og:description",
        content:
          "Original artwork made to live beyond one product. Browse the archive — choose the drawing first, then explore every product carrying that design.",
      },
    ],
  }),
  component: DesignsPage,
});

const TOOLBAR_PILLS = [
  { id: "all", label: "All Designs" },
  { id: "new", label: "New" },
  { id: "trending", label: "Trending" },
  { id: "bestsellers", label: "Best Sellers" },
  { id: "minimal", label: "Minimal" },
  { id: "graphic", label: "Graphic" },
  { id: "typography", label: "Typography" },
  { id: "art", label: "Art" },
  { id: "seasonal", label: "Seasonal" },
  { id: "lifestyle", label: "Lifestyle" },
] as const;

type PillId = (typeof TOOLBAR_PILLS)[number]["id"];
type SortOption = "featured" | "newest" | "bestselling" | "alphabetical";

function DesignsPage() {
  const [activePill, setActivePill] = useState<PillId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [selectedProductType, setSelectedProductType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const collections = useMemo(() => ["all", ...COLLECTIONS.map((c) => c.slug)], []);

  // Filter & Sort logic
  const filteredList = useMemo(() => {
    let result = [...DESIGNS];

    // Search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.story.toLowerCase().includes(q) ||
          d.collection.toLowerCase().includes(q) ||
          d.studio.toLowerCase().includes(q),
      );
    }

    // Active pill filter
    if (activePill === "new") {
      result = result.filter((d) => d.badges.includes("New") || d.edits.includes("New Drop"));
    } else if (activePill === "trending" || activePill === "bestsellers") {
      result = result.filter(
        (d) => d.badges.includes("Bestseller") || d.edits.includes("Best Sellers"),
      );
    } else if (activePill === "minimal") {
      result = result.filter((d) => d.style === "Minimal" || d.edits.includes("Minimal"));
    } else if (activePill === "graphic") {
      result = result.filter((d) => d.style === "Graphic" || d.style === "Artistic");
    } else if (activePill === "typography") {
      result = result.filter((d) => d.style === "Typography");
    } else if (activePill === "art") {
      result = result.filter((d) => d.style === "Artistic" || d.edits.includes("Art"));
    } else if (activePill === "seasonal") {
      result = result.filter((d) => d.edits.includes("Seasonal"));
    } else if (activePill === "lifestyle") {
      result = result.filter((d) => d.style === "Lifestyle" || d.edits.includes("Gift"));
    }

    // Collection filter
    if (selectedCollection !== "all") {
      const col = COLLECTIONS.find((c) => c.slug === selectedCollection);
      if (col) {
        result = result.filter((d) => col.designs.includes(d.slug));
      } else {
        result = result.filter(
          (d) => d.collection.toLowerCase().replace(/\s+/g, "-") === selectedCollection,
        );
      }
    }

    // Product availability filter
    if (selectedProductType !== "all") {
      result = result.filter((d) => d.products.includes(selectedProductType as ProductTypeId));
    }

    // Sorting
    if (sortBy === "newest") {
      result.sort(
        (a, b) => (b.badges.includes("New") ? 1 : 0) - (a.badges.includes("New") ? 1 : 0),
      );
    } else if (sortBy === "bestselling") {
      result.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, activePill, selectedCollection, selectedProductType, sortBy]);

  const activeFilterCount =
    (activePill !== "all" ? 1 : 0) +
    (selectedCollection !== "all" ? 1 : 0) +
    (selectedProductType !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const clearAllFilters = () => {
    setActivePill("all");
    setSearchQuery("");
    setSelectedCollection("all");
    setSelectedProductType("all");
    setSortBy("featured");
  };

  const scrollToGrid = () => {
    const el = document.getElementById("designs-discovery-anchor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border bg-background py-12 md:py-20 lg:py-24">
        {/* Subtle background art ambient shadow */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="container-page relative z-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <Breadcrumbs trail={[{ label: "Designs Archive" }]} />
            <div className="space-y-3">
              <p className="text-label inline-flex items-center gap-2 text-gold">
                <Sparkles className="size-3.5" aria-hidden="true" />
                One Design · Many Objects
              </p>
              <h1 className="text-display font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Discover the Designs
              </h1>
            </div>
            <p className="text-body-lg max-w-xl text-muted-foreground">
              Original designs, made to live beyond one product. Choose the artwork first, then
              explore how it expresses across heavyweight tees, brushed fleece hoodies, glazed
              stoneware, canvas totes, and gallery prints.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" onClick={scrollToGrid} className="gap-2">
                Explore Designs <ArrowDown className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  setActivePill("bestsellers");
                  scrollToGrid();
                }}
              >
                Shop Best Sellers
              </Button>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface p-6 shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-transparent to-gold/10 pointer-events-none z-10" />
              <img
                src={artLion}
                alt="Editorial Artwork - Midnight Lion"
                className="size-full object-contain filter invert opacity-90 transition-transform duration-1000 ease-[var(--ease-brand)] hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-background/90 px-3 py-1.5 backdrop-blur border border-border">
                <p className="text-label text-gold">Archival Crest No. 01</p>
                <p className="text-meta text-foreground">Midnight Lion — Continuous Line</p>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <Badge variant="gold">13 Product Formats</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DISCOVERY TOOLBAR & FILTERS */}
      <div
        id="designs-discovery-anchor"
        className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="container-page py-4 space-y-4">
          {/* Horizontal Pills / Tabs */}
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
            {TOOLBAR_PILLS.map((pill) => {
              const active = activePill === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActivePill(pill.id)}
                  className={`text-label whitespace-nowrap min-h-10 rounded-none border px-4 py-2 transition-all ${
                    active
                      ? "border-foreground bg-foreground text-background font-medium"
                      : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          {/* Search Input + Desktop Controls + Mobile Filter Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search designs by name, concept or studio..."
                className="text-body-sm h-11 w-full border border-border bg-transparent pl-10 pr-9 text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              ) : null}
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-3">
              {/* Collection Selector */}
              <div className="flex items-center gap-2">
                <span className="text-meta text-muted-foreground">Collection:</span>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="text-label h-11 cursor-pointer appearance-none border border-border bg-background px-3 pr-8 focus-visible:border-foreground"
                >
                  <option value="all">All Collections</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Format Availability */}
              <div className="flex items-center gap-2">
                <span className="text-meta text-muted-foreground">Available On:</span>
                <select
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  className="text-label h-11 cursor-pointer appearance-none border border-border bg-background px-3 pr-8 focus-visible:border-foreground"
                >
                  <option value="all">All 13 Products</option>
                  {PRODUCT_TYPES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-meta text-muted-foreground">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-label h-11 cursor-pointer appearance-none border border-border bg-background px-3 pr-8 focus-visible:border-foreground"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="alphabetical">A–Z</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex md:hidden items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 min-h-11 justify-between gap-2 border-border"
                onClick={() => setMobileFilterOpen(true)}
              >
                <span className="inline-flex items-center gap-2">
                  <SlidersHorizontal className="size-4" /> Filter & Sort
                </span>
                {activeFilterCount > 0 ? (
                  <span className="grid size-5 place-items-center bg-gold text-gold-foreground text-label-sm font-semibold">
                    {activeFilterCount}
                  </span>
                ) : null}
              </Button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilterCount > 0 ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-meta text-muted-foreground">Active filters:</span>
              {activePill !== "all" ? (
                <Badge variant="outline" className="gap-1.5 py-1">
                  Pill: {TOOLBAR_PILLS.find((p) => p.id === activePill)?.label}
                  <X className="size-3 cursor-pointer" onClick={() => setActivePill("all")} />
                </Badge>
              ) : null}
              {selectedCollection !== "all" ? (
                <Badge variant="outline" className="gap-1.5 py-1">
                  Collection:{" "}
                  {COLLECTIONS.find((c) => c.slug === selectedCollection)?.name ||
                    selectedCollection}
                  <X
                    className="size-3 cursor-pointer"
                    onClick={() => setSelectedCollection("all")}
                  />
                </Badge>
              ) : null}
              {selectedProductType !== "all" ? (
                <Badge variant="outline" className="gap-1.5 py-1">
                  Product: {PRODUCT_TYPES.find((p) => p.id === selectedProductType)?.name}
                  <X
                    className="size-3 cursor-pointer"
                    onClick={() => setSelectedProductType("all")}
                  />
                </Badge>
              ) : null}
              {searchQuery ? (
                <Badge variant="outline" className="gap-1.5 py-1">
                  Query: "{searchQuery}"
                  <X className="size-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              ) : null}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-meta link-underline ml-2 text-gold"
              >
                Clear all
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* 3. DESIGNS GRID & RESULTS */}
      <section className="section container-page">
        <div className="flex items-center justify-between pb-6 border-b border-border/50">
          <p className="text-label text-gold">
            Showing {filteredList.length} {filteredList.length === 1 ? "design" : "designs"}
          </p>
          <span className="text-meta text-muted-foreground">
            Each artwork available on up to 13 product types
          </span>
        </div>

        {filteredList.length === 0 ? (
          <EmptyState
            title="No designs found"
            body="Try adjusting your search criteria or clear your active filters to browse the entire archive."
            action={
              <Button variant="secondary" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            }
          />
        ) : (
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredList.map((design) => (
              <DesignCard key={design.slug} design={design} />
            ))}
          </div>
        )}
      </section>

      {/* 4. MOBILE BOTTOM SHEET FILTER DRAWER */}
      {mobileFilterOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-background/80 backdrop-blur-sm transition-opacity">
          <div className="relative max-h-[85vh] w-full overflow-y-auto border-t border-border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-h3 font-medium">Filter & Sort Designs</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
                <span className="sr-only">Close filters</span>
              </button>
            </div>

            <div className="space-y-6 py-6">
              {/* Collection */}
              <div>
                <label className="text-label mb-2 block">Collection</label>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="text-body-sm h-12 w-full border border-border bg-background px-3"
                >
                  <option value="all">All Collections</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Availability */}
              <div>
                <label className="text-label mb-2 block">Available On Product</label>
                <select
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  className="text-body-sm h-12 w-full border border-border bg-background px-3"
                >
                  <option value="all">All 13 Product Formats</option>
                  {PRODUCT_TYPES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-label mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-body-sm h-12 w-full border border-border bg-background px-3"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="alphabetical">A–Z</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
              >
                Reset
              </Button>
              <Button className="flex-1" onClick={() => setMobileFilterOpen(false)}>
                Show {filteredList.length} Designs
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
