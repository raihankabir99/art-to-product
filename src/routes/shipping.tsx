import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/store/page";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping | Atelier Noir" },
      { name: "description", content: "Delivery times, carriers and duties for every region we ship to." },
      { property: "og:title", content: "Shipping | Atelier Noir" },
      { property: "og:description", content: "Delivery times, carriers and duties for every region we ship to." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Shipping" intro="Delivery times, carriers and duties for every region we ship to." trail={[{ label: "Shipping" }]} />
      <section className="section container-narrow">
        <Prose>
          <h2>Production</h2>
          <p>All pieces are made to order. Production takes two to four working days before dispatch.</p>
          <h2>Delivery estimates</h2>
          <p>EU 3–5 days, UK 4–6 days, Switzerland and Norway 5–7 days, US 6–9 days, Canada 7–10 days, Gulf 7–10 days, rest of world 9–14 days.</p>
          <h2>Duties and taxes</h2>
          <p>EU and UK prices include VAT. Orders to Switzerland, Norway and outside Europe may attract import duties collected by the carrier.</p>
        </Prose>
      </section>
    </>
  );
}
