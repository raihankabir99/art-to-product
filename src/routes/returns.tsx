import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/store/page";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns | Atelier Noir" },
      { name: "description", content: "Thirty-day returns on made-to-order pieces, with a simple exchange process." },
      { property: "og:title", content: "Returns | Atelier Noir" },
      { property: "og:description", content: "Thirty-day returns on made-to-order pieces, with a simple exchange process." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Returns" intro="Thirty-day returns on made-to-order pieces, with a simple exchange process." trail={[{ label: "Returns" }]} />
      <section className="section container-narrow">
        <Prose>
          <h2>Thirty days</h2>
          <p>Return unworn items within thirty days of delivery in their original packaging.</p>
          <h2>How it works</h2>
          <p>Contact the studio with your order number and we send a prepaid label for EU and UK orders.</p>
          <h2>Exchanges</h2>
          <p>Sizes can be exchanged once free of charge.</p>
        </Prose>
      </section>
    </>
  );
}
