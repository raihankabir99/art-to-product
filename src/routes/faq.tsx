import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/store/page";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Atelier Noir" },
      { name: "description", content: "Answers on production times, sizing, international delivery, duties and returns." },
      { property: "og:title", content: "FAQ | Atelier Noir" },
      { property: "og:description", content: "Answers on production times, sizing, international delivery, duties and returns." },
    ],
  }),
  component: Faq,
});

const QA: [string, string][] = [
  ["How long does production take?", "Every piece is made after you order it. Production takes two to four working days before dispatch."],
  ["Where do you ship from?", "Orders are routed to the partner closest to you — the Netherlands, the UK, the United States or the Gulf."],
  ["Do I pay customs or duties?", "Inside the EU, VAT is included and there are no duties. Outside the EU, duties are shown at checkout or charged on delivery."],
  ["Can I put one design on several products?", "Yes — that is the point. Open any design and switch between thirteen objects while keeping the same artwork."],
  ["What is your returns policy?", "Thirty days from delivery for unworn items. Because everything is made to order, please check the size guide first."],
];

function Faq() {
  return (
    <>
      <PageHero title="Frequently asked" intro="Production, delivery, duties and returns — the short answers." trail={[{ label: "FAQ" }]} />
      <section className="section container-narrow">
        <Accordion type="single" collapsible>
          {QA.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-h4 text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
