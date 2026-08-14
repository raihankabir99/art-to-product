import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { BarChart, Field, KpiCard, Notice, Segmented } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { ACCOUNT_METRICS, ADDRESSES, NOTIFICATIONS, ORDERS, PAYMENT_METHODS } from "@/lib/account-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account | Atelier Noir" },
      { name: "description", content: "Your orders, addresses, payment methods and preferences in one calm dashboard." },
      { property: "og:title", content: "Your Account | Atelier Noir" },
      { property: "og:description", content: "Your orders, addresses, payment methods and preferences in one calm dashboard." },
    ],
  }),
  component: Account,
});

const TABS = ["Overview", "Orders", "Addresses", "Payment", "Alerts", "Settings"] as const;
type Tab = (typeof TABS)[number];

function Account() {
  const [signedIn, setSignedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("Overview");
  const { format, wishlist } = useStore();

  if (!signedIn) {
    return (
      <>
        <PageHero title="Account" intro="Sign in to follow orders and keep your addresses to hand." trail={[{ label: "Account" }]} />
        <section className="section container-narrow">
          <form
            className="space-y-5"
            onSubmit={(e) => { e.preventDefault(); setSignedIn(true); }}
          >
            <Field label="Email" type="email" placeholder="you@example.com" defaultValue="ada@atelier-noir.com" />
            <Field label="Password" type="password" placeholder="••••••••" defaultValue="preview" />
            <Button size="block" type="submit">Sign in to the preview account</Button>
            <p className="text-meta text-center">No real authentication runs here — this opens the demo dashboard.</p>
          </form>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="secondary"><Link to="/orders">Track an order</Link></Button>
            <Button asChild variant="secondary"><Link to="/wishlist">Wishlist</Link></Button>
          </div>
        </section>
      </>
    );
  }

  const unread = NOTIFICATIONS.filter((n) => n.unread).length;
  const spend = ACCOUNT_METRICS.spendSeries.reduce((a, b) => a + b, 0);

  return (
    <>
      <PageHero eyebrow="Ada Lindqvist" title="Your account" intro="Everything you have made with us, in one place." trail={[{ label: "Account" }]} />
      <section className="container-page border-b border-border pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Segmented
            ariaLabel="Account sections"
            value={tab}
            onChange={(v) => setTab(v as Tab)}
            options={TABS.map((t) => ({ value: t, ...(t === "Alerts" ? { count: unread } : {}), label: t }))}
          />
          <button type="button" onClick={() => setSignedIn(false)} className="text-label link-underline min-h-11">Sign out</button>
        </div>
      </section>

      <section className="section container-page">
        {tab === "Overview" ? (
          <div className="space-y-14">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard label="Orders placed" value={String(ORDERS.length)} delta="Since June 2026" />
              <KpiCard label="Total spend" value={format(spend)} delta="Last eight months" series={ACCOUNT_METRICS.spendSeries} />
              <KpiCard label="Saved designs" value={String(wishlist.length)} delta="In your wishlist" />
              <KpiCard label="In production" value={String(ORDERS.filter((o) => o.step < 6).length)} delta="Being made now" />
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="border border-border p-6">
                <h2 className="text-h3">What you buy</h2>
                <p className="text-meta mt-2">Items by category across all orders.</p>
                <div className="mt-6"><BarChart label="Purchases by category" data={ACCOUNT_METRICS.categorySplit} /></div>
              </div>
              <div className="border border-border p-6">
                <h2 className="text-h3">Latest order</h2>
                <p className="text-meta mt-2">{ORDERS[0]!.id} · placed {ORDERS[0]!.placed}</p>
                <p className="text-body mt-4 text-muted-foreground">{ORDERS[0]!.carrier} · arriving {ORDERS[0]!.eta}</p>
                <Button asChild className="mt-6"><Link to="/orders">Follow this order</Link></Button>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "Orders" ? (
          <ul className="divide-y divide-border border-y border-border">
            {ORDERS.map((o) => (
              <li key={o.id} className="grid gap-4 py-7 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-8">
                <div>
                  <p className="text-h4">{o.id}</p>
                  <p className="text-meta mt-1">Placed {o.placed}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-body-sm truncate">{o.items.map((i) => `${i.designName} ${i.productName}`).join(" · ")}</p>
                  <p className="text-meta mt-1">{o.step === 6 ? "Delivered" : "In progress"} · {o.carrier} · {o.eta}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-price">{format(o.total)}</span>
                  <Button asChild variant="secondary"><Link to="/orders">Track</Link></Button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {tab === "Addresses" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {ADDRESSES.map((a) => (
              <div key={a.id} className={cn("border p-6", a.isDefault ? "border-gold" : "border-border")}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-h4">{a.label}</h2>
                  {a.isDefault ? <span className="text-label text-gold">Default</span> : null}
                </div>
                <address className="text-body-sm mt-4 not-italic text-muted-foreground">
                  {a.name}<br />
                  {a.lines.map((l) => (<span key={l}>{l}<br /></span>))}
                  {a.country}
                </address>
                <div className="mt-6 flex gap-4">
                  <button type="button" className="text-label link-underline min-h-11">Edit</button>
                  {!a.isDefault ? <button type="button" className="text-label link-underline min-h-11 text-muted-foreground">Make default</button> : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Payment" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {PAYMENT_METHODS.map((p) => (
              <div key={p.id} className={cn("border p-6", p.isDefault ? "border-gold" : "border-border")}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-h4">{p.brand} ···· {p.last4}</h2>
                  {p.isDefault ? <span className="text-label text-gold">Default</span> : null}
                </div>
                <p className="text-meta mt-3">Expires {p.expiry}</p>
                <button type="button" className="text-label link-underline mt-6 min-h-11">Remove card</button>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Alerts" ? (
          <ul className="divide-y divide-border border-y border-border">
            {NOTIFICATIONS.map((n) => (
              <li key={n.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-6">
                <span aria-hidden="true" className={cn("mt-2 size-2 rounded-full", n.unread ? "bg-gold" : "bg-border")} />
                <div>
                  <p className="text-h4">{n.title}{n.unread ? <span className="sr-only"> (unread)</span> : null}</p>
                  <p className="text-body-sm mt-2 text-muted-foreground">{n.body}</p>
                  <p className="text-meta mt-2">{n.when}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {tab === "Settings" ? (
          <div className="container-narrow space-y-8 px-0">
            <Notice tone="info" title="Preview account" body="Changes here are not saved — the dashboard illustrates the finished experience." />
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <Field label="Name" defaultValue="Ada Lindqvist" />
              <Field label="Email" type="email" defaultValue="ada@atelier-noir.com" />
              <Field label="Password" type="password" defaultValue="preview" hint="At least ten characters." />
              <Button size="block" type="submit">Save changes</Button>
            </form>
          </div>
        ) : null}
      </section>
    </>
  );
}
