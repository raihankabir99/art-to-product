import { createFileRoute } from "@tanstack/react-router";
import { CollectionCard } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { COLLECTIONS, designBySlug } from "@/lib/catalog";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections | Atelier Noir" },
      { name: "description", content: "Curated groupings of designs — Nocturne, Northern Light, Mediterraneo and Meridian." },
      { property: "og:title", content: "Collections | Atelier Noir" },
      { property: "og:description", content: "Curated groupings of designs — Nocturne, Northern Light, Mediterraneo and Meridian." },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <>
      <PageHero eyebrow="Curated" title="Collections" intro="Grouped by mood and light rather than by product category." trail={[{ label: "Collections" }]} />
      <section className="section container-page">
        <div className="grid gap-6 md:grid-cols-2">
          {COLLECTIONS.map((c) => (
            <CollectionCard key={c.slug} slug={c.slug} name={c.name} tagline={c.tagline} count={c.designs.length} design={designBySlug(c.designs[0]!)!} />
          ))}
        </div>
      </section>
    </>
  );
}
