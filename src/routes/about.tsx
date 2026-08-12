import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/store/page";
import { Mockup } from "@/components/store/Mockup";
import { DESIGNS } from "@/lib/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Studio | Atelier Noir" },
      { name: "description", content: "A design-led studio making apparel and objects on demand, with no warehouse and no overproduction." },
      { property: "og:title", content: "About the Studio | Atelier Noir" },
      { property: "og:description", content: "A design-led studio making apparel and objects on demand, with no warehouse and no overproduction." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="Studio" title="We make drawings, then we make objects" intro="Atelier Noir is a small design studio working with vetted print partners across Europe, the UK, North America and the Gulf." trail={[{ label: "About" }]} />
      <section className="section container-page grid gap-12 lg:grid-cols-2">
        <div className="border border-border"><Mockup design={DESIGNS[1]!} productId="hoodie" /></div>
        <Prose>
          <h2>No factory, no warehouse</h2>
          <p>We own no machinery and hold no stock. Each order is routed to the print partner closest to you, produced within two to four days and shipped directly.</p>
          <h2>One design, many objects</h2>
          <p>Every drawing in the archive is proofed for thirteen surfaces, from heavyweight cotton to glazed stoneware and uncoated museum paper.</p>
          <h2>Made for everywhere</h2>
          <p>Prices, duties and delivery estimates adapt to where you are — the EU, the UK, Switzerland, Norway, North America, the Gulf and beyond.</p>
        </Prose>
      </section>
    </>
  );
}
