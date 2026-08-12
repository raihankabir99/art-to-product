import { createFileRoute } from "@tanstack/react-router";
import { DesignCard } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { DESIGNS } from "@/lib/catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers | Atelier Noir" },
      { name: "description", content: "The designs and objects our customers reorder most." },
      { property: "og:title", content: "Best Sellers | Atelier Noir" },
      { property: "og:description", content: "The designs and objects our customers reorder most." },
    ],
  }),
  component: Page,
});

function Page() {
  const designs = DESIGNS.filter((d) => d.badges.includes("Bestseller"));
  return (
    <>
      <PageHero eyebrow="Most ordered" title="Best Sellers" intro="The designs and objects our customers reorder most." trail={[{ label: "Best Sellers" }]} />
      <section className="section container-page">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d) => (<DesignCard key={d.slug} design={d} />))}
        </div>
      </section>
    </>
  );
}
