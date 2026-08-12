import { createFileRoute } from "@tanstack/react-router";
import { DesignCard } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { DESIGNS } from "@/lib/catalog";

export const Route = createFileRoute("/new")({
  head: () => ({
    meta: [
      { title: "New Drops | Atelier Noir" },
      { name: "description", content: "The newest designs in the archive, released this season." },
      { property: "og:title", content: "New Drops | Atelier Noir" },
      { property: "og:description", content: "The newest designs in the archive, released this season." },
    ],
  }),
  component: Page,
});

function Page() {
  const designs = DESIGNS.filter((d) => d.badges.includes("New"));
  return (
    <>
      <PageHero eyebrow="Just landed" title="New Drops" intro="The newest designs in the archive, released this season." trail={[{ label: "New Drops" }]} />
      <section className="section container-page">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d) => (<DesignCard key={d.slug} design={d} />))}
        </div>
      </section>
    </>
  );
}
