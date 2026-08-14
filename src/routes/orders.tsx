import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { Mockup } from "@/components/store/Mockup";
import { Notice, ORDER_STEPS, Timeline } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { ORDERS, orderById, type Order } from "@/lib/account-data";
import { designBySlug } from "@/lib/catalog";

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

function Orders() {
  const { format } = useStore();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order>(ORDERS[0]!);
  const [error, setError] = useState<string | null>(null);

  const track = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orderById(query.trim().toUpperCase());
    if (!found) {
      setError("We can't find that order number. Check the confirmation email — it looks like AN-2026-00184.");
      return;
    }
    setError(null);
    setOrder(found);
  };

  return (
    <>
      <PageHero title="Order tracking" intro="Enter your order number to follow production and delivery." trail={[{ label: "Orders" }]} />

      <section className="section container-page">
        <form className="grid max-w-xl gap-4 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={track}>
          <div>
            <label htmlFor="order-no" className="text-label text-muted-foreground">Order number</label>
            <input
              id="order-no"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="AN-2026-00184"
              aria-invalid={error ? true : undefined}
              className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4 placeholder:text-muted-foreground focus-visible:border-foreground"
            />
          </div>
          <Button className="h-12 self-end" type="submit">Track</Button>
        </form>

        {error ? <div className="mt-6 max-w-xl"><Notice tone="error" title="Order not found" body={error} /></div> : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {ORDERS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => { setOrder(o); setError(null); }}
              aria-pressed={order.id === o.id}
              className={`text-label flex min-h-11 items-center border px-4 ${order.id === o.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >
              {o.id}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-h2">{order.id}</h2>
            <p className="text-meta mt-2">Placed {order.placed} · {order.items.length} item{order.items.length > 1 ? "s" : ""} · {format(order.total)}</p>

            <ul className="mt-8 divide-y divide-border border-y border-border">
              {order.items.map((item) => {
                const design = designBySlug(item.designSlug);
                return (
                  <li key={item.designSlug + item.productId} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 py-5">
                    <div className="border border-border">
                      {design ? <Mockup design={design} productId={item.productId} colorValue={item.colorValue} /> : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-h4 truncate">{item.designName} — {item.productName}</p>
                      <p className="text-meta mt-1">{item.color}{item.size ? ` · ${item.size}` : ""} · ×{item.qty}</p>
                    </div>
                    <span className="text-price">{format(item.price * item.qty)}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-label text-muted-foreground">Delivering to</p>
                <address className="text-body-sm mt-3 not-italic">
                  {order.address.map((l) => (<span key={l}>{l}<br /></span>))}
                </address>
              </div>
              <div>
                <p className="text-label text-muted-foreground">Carrier</p>
                <p className="text-body-sm mt-3">{order.carrier}</p>
                <p className="text-meta mt-1">Tracking {order.tracking}</p>
                <p className="text-meta mt-1">{order.eta}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="secondary"><Link to="/returns">Start a return</Link></Button>
              <Button asChild variant="secondary"><Link to="/contact">Contact the studio</Link></Button>
            </div>
          </div>

          <div className="border border-border p-6 lg:p-8">
            <h2 className="text-h3">Production and delivery</h2>
            <p className="text-meta mt-2">Each piece is made after you order it, so the first steps take a little longer.</p>
            <div className="mt-8">
              <Timeline steps={ORDER_STEPS} current={order.step} stamps={order.stamps} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
