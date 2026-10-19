import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Atelier Noir" },
      {
        name: "description",
        content:
          "Terms and conditions for placing orders, website usage, and consumer rights with Atelier Noir.",
      },
    ],
  }),
  component: TermsRedirectPage,
});

function TermsRedirectPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs
            trail={[{ label: "Legal", to: "/legal" }, { label: "Terms & Conditions" }]}
          />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Customer Agreement
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Terms & Conditions.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            The legal terms governing on-demand purchases, customer satisfaction guarantees,
            statutory rights, and intellectual property.
          </p>

          <div className="mt-8">
            <Button asChild variant="gold" size="lg">
              <Link to="/legal/$doc" params={{ doc: "terms" }}>
                Read Full Terms Document <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section container-page max-w-4xl space-y-6">
        <div className="border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-h2 font-heading">Key Terms Highlights</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-label text-gold font-semibold">On-Demand Production</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Every piece is individually printed and proofed upon order submission.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">30-Day Returns</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Unworn items can be returned or exchanged within thirty days of delivery.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">Artwork Protection</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                All original drawings and graphics remain the exclusive intellectual property of the
                studio.
              </p>
            </div>
            <div>
              <p className="text-label text-gold font-semibold">EU / UK Consumer Law</p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Full statutory protections and transparent warranty coverage guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustCenter showCta={false} />
    </div>
  );
}
