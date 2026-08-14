import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { Field, Notice } from "@/components/store/ui";
import { Mockup } from "@/components/store/Mockup";
import { useStore } from "@/components/store/store";
import { REGIONS, designBySlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

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

const STEPS = ["Contact", "Delivery", "Payment"] as const;

const SHIPPING_METHODS = [
  { id: "standard", name: "Standard", note: "Tracked, carbon-offset", price: 6.9 },
  { id: "express", name: "Express", note: "Priority production and courier", price: 14.9 },
];

function Checkout() {
  const { cart, cartTotal, discount, coupon, format, region, setRegion } = useStore();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("standard");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const emailError = touched && !/^\S+@\S+\.\S+$/.test(email) ? "Enter an email we can send the order confirmation to." : undefined;
  const base = Math.max(0, cartTotal - discount);
  const chosen = SHIPPING_METHODS.find((m) => m.id === method) ?? SHIPPING_METHODS[0]!;
  const shipping = base > 80 && chosen.id === "standard" ? 0 : chosen.price;

  const next = () => {
    if (step === 0) {
      setTouched(true);
      if (!/^\S+@\S+\.\S+$/.test(email)) return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  return (
    <>
      <PageHero title="Checkout" intro="Payment is disabled in this preview — this is the visual architecture only." trail={[{ label: "Checkout" }]} />

      <section className="section container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <ol className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Checkout progress">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-label grid size-8 place-items-center border",
                    i < step && "border-gold bg-gold text-background",
                    i === step && "border-gold text-gold",
                    i > step && "border-border text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={cn("text-label", i > step && "text-muted-foreground")} aria-current={i === step ? "step" : undefined}>
                  {s}
                </span>
              </li>
            ))}
          </ol>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {step === 0 ? (
              <fieldset className="space-y-5">
                <legend className="text-h3 mb-5">Contact</legend>
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="you@example.com"
                  hint="Order confirmation and tracking are sent here."
                  {...(emailError ? { error: emailError } : {})}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First name" placeholder="Ada" />
                  <Field label="Last name" placeholder="Lindqvist" />
                </div>
              </fieldset>
            ) : null}

            {step === 1 ? (
              <fieldset className="space-y-5">
                <legend className="text-h3 mb-5">Delivery</legend>
                <div>
                  <label htmlFor="region" className="text-label text-muted-foreground">Delivery region</label>
                  <select
                    id="region"
                    value={region.code}
                    onChange={(e) => setRegion(e.target.value)}
                    className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4"
                  >
                    {REGIONS.map((r) => (<option key={r.code} value={r.code} className="bg-background">{r.country} · {r.currency}</option>))}
                  </select>
                  <p className="text-meta mt-3">{region.taxNote} · Estimated delivery {region.delivery}</p>
                </div>
                <Field label="Address" placeholder="Street and number" className="sm:col-span-2" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Postal code" placeholder="1011" />
                  <Field label="City" placeholder="Amsterdam" />
                </div>
                <div>
                  <p className="text-label text-muted-foreground">Shipping method</p>
                  <div className="mt-4 space-y-3">
                    {SHIPPING_METHODS.map((m) => (
                      <label
                        key={m.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-4 border p-4",
                          method === m.id ? "border-foreground" : "border-border hover:border-foreground",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={m.id}
                            checked={method === m.id}
                            onChange={() => setMethod(m.id)}
                            className="accent-[var(--gold)]"
                          />
                          <span>
                            <span className="text-h4 block">{m.name}</span>
                            <span className="text-meta">{m.note}</span>
                          </span>
                        </span>
                        <span className="text-price">{base > 80 && m.id === "standard" ? "Free" : format(m.price)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset className="space-y-5">
                <legend className="text-h3 mb-5">Payment</legend>
                <Notice
                  tone="info"
                  title="Payment is disabled in this preview"
                  body="Card fields are shown for layout only — nothing is submitted or stored."
                />
                <Field label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Expiry" placeholder="07 / 29" />
                  <Field label="Security code" placeholder="123" inputMode="numeric" />
                </div>
                <p className="text-meta flex items-center gap-2"><Lock className="size-3.5" aria-hidden="true" /> Encrypted end to end. {region.taxNote}.</p>
              </fieldset>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {step > 0 ? (
                <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>Back</Button>
              ) : (
                <Button asChild variant="secondary"><Link to="/cart">Back to bag</Link></Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next}>Continue to {STEPS[step + 1]}</Button>
              ) : (
                <Button disabled>Payment disabled in preview</Button>
              )}
            </div>
          </form>
        </div>

        <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
          <h2 className="text-label">Order summary</h2>
          {cart.length > 0 ? (
            <ul className="mt-6 space-y-4 border-b border-border pb-6">
              {cart.map((line) => {
                const design = designBySlug(line.designSlug);
                return (
                  <li key={line.id} className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-4">
                    <div className="border border-border">
                      {design ? <Mockup design={design} productId={line.productId} colorValue={line.colorValue} /> : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-body-sm truncate">{line.designName} — {line.productName}</p>
                      <p className="text-meta mt-1">{line.color}{line.size ? ` · ${line.size}` : ""} · ×{line.qty}</p>
                    </div>
                    <span className="text-price">{format(line.price * line.qty)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-meta mt-6">Your bag is empty — <Link to="/designs" className="link-underline">explore designs</Link>.</p>
          )}
          <dl className="mt-6 space-y-3">
            <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Subtotal</dt><dd className="text-price">{format(cartTotal)}</dd></div>
            {coupon ? (
              <div className="flex justify-between"><dt className="text-body-sm text-gold">{coupon.code}</dt><dd className="text-price text-gold">−{format(discount)}</dd></div>
            ) : null}
            <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Shipping</dt><dd className="text-price">{shipping === 0 ? "Free" : format(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-body-sm text-muted-foreground">Duties / VAT</dt><dd className="text-meta">{region.taxNote}</dd></div>
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="text-label">Total</span>
            <span className="text-price text-lg">{format(base + shipping)}</span>
          </div>
        </aside>
      </section>
    </>
  );
}
