import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { PageHero } from "@/components/store/page";
import { Mockup } from "@/components/store/Mockup";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COLLECTIONS, designBySlug, type Collection } from "@/lib/catalog";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Curated Collections & Edits | Atelier Mono" },
      {
        name: "description",
        content:
          "Explore curated groupings of designs — from Minimal and Street Culture to Northern Light and New Drops. One artwork across 13 product formats.",
      },
      { property: "og:title", content: "Curated Collections | Atelier Mono" },
      {
        property: "og:description",
        content:
          "Explore curated groupings of designs — from Minimal and Street Culture to Northern Light and New Drops.",
      },
    ],
  }),
  component: CollectionsPage,
});

type FilterTab = "all" | "drops" | "edits" | "aesthetics";

export function CollectionsPage() {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filteredCollections = useMemo(() => {
    if (filter === "drops") {
      return COLLECTIONS.filter((c) =>
        ["new-drops", "limited-editions", "best-sellers"].includes(c.slug),
      );
    }
    if (filter === "edits") {
      return COLLECTIONS.filter((c) => ["gift-edits", "summer", "winter"].includes(c.slug));
    }
    if (filter === "aesthetics") {
      return COLLECTIONS.filter((c) =>
        [
          "minimal",
          "street-culture",
          "art-graphics",
          "typography",
          "nocturne",
          "northern-light",
          "mediterraneo",
          "meridian",
        ].includes(c.slug),
      );
    }
    return COLLECTIONS;
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow="Curated Edits"
        title="Collections & Themes"
        intro="Grouped by mood, artistic movement and season rather than by product category. Discover artwork designed to express across all 13 product formats."
        trail={[{ label: "Collections" }]}
      />

      <section className="container-page pb-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Collections" },
              { id: "drops", label: "Featured Drops" },
              { id: "edits", label: "Seasonal & Gift Edits" },
              { id: "aesthetics", label: "Art Movements & Aesthetics" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as FilterTab)}
                className={`text-label min-h-10 px-4 py-2 border transition-colors ${
                  filter === tab.id
                    ? "border-foreground bg-foreground text-background font-medium"
                    : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-meta text-muted-foreground">
            {filteredCollections.length} collections curated
          </span>
        </div>
      </section>

      <section className="section container-page pt-2">
        {/* Editorial Bento Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((col, index) => {
            const firstDesign =
              designBySlug(col.designs[0] ?? "midnight-lion") ?? designBySlug("midnight-lion")!;
            const isFeatured = index === 0;

            return (
              <article
                key={col.slug}
                className={`group relative flex flex-col overflow-hidden border border-border bg-surface transition-all hover:border-foreground/40 ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <Link
                  to="/collections/$slug"
                  params={{ slug: col.slug }}
                  className="relative block w-full overflow-hidden bg-surface-2"
                >
                  <div className={isFeatured ? "aspect-[16/9] w-full" : "aspect-[4/3] w-full"}>
                    {col.image ? (
                      <img
                        src={col.image}
                        alt={`${col.name} collection preview`}
                        className="size-full object-cover object-center transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
                      />
                    ) : (
                      <Mockup
                        design={firstDesign}
                        productId={firstDesign.products[0] ?? "tshirt"}
                        className="size-full transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="gold" className="gap-1">
                      <Sparkles className="size-3" />
                      {col.designs.length} {col.designs.length === 1 ? "Design" : "Designs"}
                    </Badge>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-h2 font-medium tracking-tight">
                        <Link
                          to="/collections/$slug"
                          params={{ slug: col.slug }}
                          className="hover:text-gold transition-colors"
                        >
                          {col.name}
                        </Link>
                      </h2>
                      <span className="text-label text-gold uppercase tracking-wider text-xs">
                        {col.slug.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-body mt-2.5 text-muted-foreground line-clamp-2">
                      {col.tagline}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-1.5 text-meta text-muted-foreground">
                      <Layers className="size-3.5 text-gold" />
                      <span>13 product formats</span>
                    </div>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="gap-2 group-hover:text-gold"
                    >
                      <Link to="/collections/$slug" params={{ slug: col.slug }}>
                        Explore Collection <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
