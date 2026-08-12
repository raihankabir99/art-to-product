import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account | Atelier Noir" },
      { name: "description", content: "Manage your details, addresses and orders." },
      { property: "og:title", content: "Account | Atelier Noir" },
      { property: "og:description", content: "Manage your details, addresses and orders." },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <>
      <PageHero title="Account" intro="Sign in to follow orders and keep your addresses to hand." trail={[{ label: "Account" }]} />
      <section className="section container-narrow">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="acc-email" className="text-label text-muted-foreground">Email</label>
            <input id="acc-email" type="email" placeholder="you@example.com" className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4" />
          </div>
          <div>
            <label htmlFor="acc-pass" className="text-label text-muted-foreground">Password</label>
            <input id="acc-pass" type="password" placeholder="••••••••" className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4" />
          </div>
          <Button size="block" disabled>Accounts arrive in the next phase</Button>
        </form>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="secondary"><Link to="/orders">Track an order</Link></Button>
          <Button asChild variant="secondary"><Link to="/wishlist">Wishlist</Link></Button>
        </div>
      </section>
    </>
  );
}
