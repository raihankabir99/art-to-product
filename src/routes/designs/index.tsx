import { createFileRoute } from "@tanstack/react-router";
import { DesignCard } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { DESIGNS } from "@/lib/catalog";

export const Route = createFileRoute("/designs/")({
  head: () => ({
    meta: [
      { title: "Designs | Atelier Noir" },
      { name: "description", content: "Browse the archive. Each design lives across up to thirteen products — choose the drawing first, the object second." },
      { property: "og:title", content: "Designs | Atelier Noir" },
      { property: "og:description", content: "Browse the archive. Each design lives across up to thirteen products — choose the drawing first, the object second." },
    ],
  }),
  component: Designs,
});

function Designs() {
  return (
    <>
      <PageHero eyebrow="The archive" title="Designs" intro="A design is the starting point, not the product. Pick one and decide afterwards whether it becomes a tee, a poster or a mug." trail={[{ label: "Designs" }]} />
      <section className="section container-page">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {DESIGNS.map((d) => (<DesignCard key={d.slug} design={d} />))}
        </div>
      </section>
    </>
  );
}
