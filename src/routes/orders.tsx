import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Order Tracking | Atelier Noir" },
      { name: "description", content: "Follow your made-to-order parcel from production to your door." },
      { property: "og:title", content: "Order Tracking | Atelier Noir" },
      { property: "og:description", content: "Follow your made-to-order parcel from production to your door." },
    ],
  }),
  component: Orders,
});

const STEPS = ["Order received", "In production", "Quality check", "Dispatched", "Delivered"];

function Orders() {
  return (
    <>
      <PageHero title="Order tracking" intro="Enter your order number to follow production and delivery." trail={[{ label: "Orders" }]} />
      <section className="section container-narrow">
        <form className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="order-no" className="text-label text-muted-foreground">Order number</label>
            <input id="order-no" placeholder="AN-2026-00184" className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4" />
          </div>
          <Button className="h-12 self-end">Track</Button>
        </form>
        <ol className="mt-14 space-y-6">
          {STEPS.map((s, i) => (
            <li key={s} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
              <span className={`text-label grid size-8 shrink-0 place-items-center border ${i < 2 ? "border-gold text-gold" : "border-border text-muted-foreground"}`}>{i + 1}</span>
              <span className={`text-body ${i < 2 ? "" : "text-muted-foreground"}`}>{s}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
