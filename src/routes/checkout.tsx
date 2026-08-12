import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import { REGIONS } from "@/lib/catalog";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Atelier Noir" },
      { name: "description", content: "Secure checkout with international delivery, duties and VAT shown before you pay." },
      { property: "og:title", content: "Checkout | Atelier Noir" },
      { property: "og:description", content: "Secure checkout with international delivery, duties and VAT shown before you pay." },
    ],
  }),
  component: Checkout,
});

const FIELDS = [
  ["Email", "email", "you@example.com"],
  ["First name", "text", "Ada"],
  ["Last name", "text", "Lindqvist"],
  ["Address", "text", "Street and number"],
  ["Postal code", "text", "1011"],
  ["City", "text", "Amsterdam"],
] as const;

function Checkout() {
  const { cartTotal, format, region, setRegion } = useStore();
  const shipping = cartTotal > 80 ? 0 : 6.9;
  return (
    <>
      <PageHero title="Checkout" intro="Payment is disabled in this preview — this is the visual architecture only." trail={[{ label: "Checkout" }]} />
      <section className="section container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="text-label text-muted-foreground">Delivery region</legend>
            <select value={region.code} onChange={(e) => setRegion(e.target.value)} aria-label="Delivery region" className="text-body-sm mt-4 h-12 w-full border border-border bg-transparent px-4">
              {REGIONS.map((r) => (<option key={r.code} value={r.code} className="bg-background">{r.country} · {r.currency}</option>))}
            </select>
            <p className="text-meta mt-3">{region.taxNote} · Estimated delivery {region.delivery}</p>
          </fieldset>
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Contact and address</legend>
            {FIELDS.map(([label, type, placeholder]) => (
              <div key={label} className={label === "Address" || label === "Email" ? "sm:col-span-2" : ""}>
                <label htmlFor={label} className="text-label text-muted-foreground">{label}</label>
                <input id={label} type={type} placeholder={placeholder} className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4 placeholder:text-muted-foreground focus-visible:border-foreground" />
              </div>
            ))}
          </fieldset>
          <Button size="block" disabled>Payment disabled in preview</Button>
        </form>
        <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
          <h2 className="text-label">Order summary</h2>
          <dl className="mt-6 space-y-3">
            <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Subtotal</dt><dd className="text-price">{format(cartTotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Shipping</dt><dd className="text-price">{shipping === 0 ? "Free" : format(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Duties / VAT</dt><dd className="text-meta">{region.taxNote}</dd></div>
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="text-label">Total</span>
            <span className="text-price text-lg">{format(cartTotal + shipping)}</span>
          </div>
        </aside>
      </section>
    </>
  );
}
