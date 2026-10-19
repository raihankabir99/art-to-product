import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Atelier Noir" },
      {
        name: "description",
        content:
          "How Atelier Noir collects, uses, protects, and handles personal data under the GDPR and UK Data Protection Act.",
      },
    ],
  }),
  component: PrivacyRedirectPage,
});

function PrivacyRedirectPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs trail={[{ label: "Legal", to: "/legal" }, { label: "Privacy Policy" }]} />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Data Protection
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Privacy Policy.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Our comprehensive policy detailing our GDPR adherence, order fulfillment data routing,
            cookie usage, and customer data rights.
          </p>

          <div className="mt-8">
            <Button asChild variant="gold" size="lg">
              <Link to="/legal/$doc" params={{ doc: "privacy" }}>
                View Full Privacy Document <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section container-page max-w-4xl space-y-6">
        <div className="border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-h2 font-heading">Key Data Commitments</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-label text-gold font-semibold">Zero Data Selling</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                We never monetize, rent, or trade your personal information to third-party ad
                networks.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Encrypted Transactions</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Payment card tokens are processed via 256-bit PCI-DSS Level 1 certified gateways.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Fulfillment-Only Transits</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Address details are shared strictly with our regional printing hubs and couriers.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Full GDPR Rights</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Access, export, correct, or erase your account data at any time by contacting us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustCenter showCta={false} />
    </div>
  );
}
