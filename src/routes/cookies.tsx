import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Cookie } from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy & Preferences | Atelier Noir" },
      {
        name: "description",
        content:
          "Understand how Atelier Noir uses essential session tokens and analytics cookies, and manage your cookie preferences.",
      },
    ],
  }),
  component: CookiesRedirectPage,
});

function CookiesRedirectPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs trail={[{ label: "Legal", to: "/legal" }, { label: "Cookie Policy" }]} />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Transparency & Consent
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Cookie Policy.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            How we use cookies to ensure reliable shopping cart operation and anonymized site speed
            performance, and how to configure your settings.
          </p>

          <div className="mt-8">
            <Button asChild variant="gold" size="lg">
              <Link to="/legal/$doc" params={{ doc: "cookies" }}>
                Manage Cookie Preferences <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section container-page max-w-4xl space-y-6">
        <div className="border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-h2 font-heading">Cookie Categories Summary</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-label text-gold font-semibold">Strictly Necessary</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Preserves items in your bag, maintains currency choice, and secures checkout.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Performance & Analytics</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Aggregated, anonymized insights to help us optimize navigation and site speed.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Functional</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Saves your design grid preferences, size filter state, and language settings.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Marketing</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Allows measurement of lookbook campaigns with your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustCenter showCta={false} />
    </div>
  );
}
