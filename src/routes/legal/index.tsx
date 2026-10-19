import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileText,
  Cookie,
  Truck,
  RotateCcw,
  Scale,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { TrustCenter } from "@/components/store/TrustCenter";

export const Route = createFileRoute("/legal/")({
  head: () => ({
    meta: [
      { title: "Legal Center & Policies | Atelier Noir" },
      {
        name: "description",
        content:
          "Explore our international privacy policy, terms of service, cookie practices, and transparent customer rights under GDPR and UK consumer law.",
      },
      { property: "og:title", content: "Legal Center & Policies | Atelier Noir" },
    ],
  }),
  component: LegalHubPage,
});

const LEGAL_DOCUMENTS = [
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: Lock,
    href: "/legal/privacy",
    desc: "How we collect, store, and process your personal information and orders under the EU GDPR and UK Data Protection Act.",
    updated: "Updated August 2026",
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    icon: FileText,
    href: "/legal/terms",
    desc: "The binding legal agreement governing website usage, on-demand purchases, digital rights, and warranties.",
    updated: "Updated August 2026",
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    icon: Cookie,
    href: "/legal/cookies",
    desc: "Detailed breakdown of essential session tokens, analytics measurements, and user consent management controls.",
    updated: "Updated August 2026",
  },
  {
    id: "shipping-policy",
    title: "Shipping & Delivery Policy",
    icon: Truck,
    href: "/shipping",
    desc: "Timelines, regional fulfillment partners, carrier transit estimates, and international customs tariffs.",
    updated: "Updated August 2026",
  },
  {
    id: "returns-policy",
    title: "Returns & Refund Policy",
    icon: RotateCcw,
    href: "/returns",
    desc: "Our 30-day return window, damaged delivery replacement protocols, and RMA verification workflows.",
    updated: "Updated August 2026",
  },
  {
    id: "terms-of-sale",
    title: "Terms of Sale",
    icon: Scale,
    href: "/legal/terms-of-sale",
    desc: "Specific commercial contractual terms regarding pricing, VAT calculation, title transfer, and consumer cancellation rights.",
    updated: "Updated August 2026",
  },
];

function LegalHubPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs trail={[{ label: "Legal Center" }]} />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Compliance & Transparency
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Legal & Policies.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Our commitments to data protection, consumer rights, intellectual property, and clear
            terms of service across all international markets.
          </p>
        </div>
      </section>

      {/* 2. LEGAL DOCUMENTS GRID */}
      <section className="section container-page max-w-5xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEGAL_DOCUMENTS.map((doc) => {
            const Icon = doc.icon;
            return (
              <Link
                key={doc.id}
                to={doc.href}
                className="group flex flex-col justify-between border border-border bg-surface p-6 sm:p-8 transition-all hover:border-gold hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center border border-border bg-surface-2 text-gold group-hover:border-gold/50">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {doc.updated}
                    </span>
                  </div>

                  <h3 className="text-h3 mt-5 font-heading text-foreground group-hover:text-gold transition-colors">
                    {doc.title}
                  </h3>

                  <p className="text-body-sm mt-2.5 text-muted-foreground leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-label text-gold font-semibold text-xs inline-flex items-center gap-1.5">
                    Read Document{" "}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 border border-border bg-surface/50 p-6 text-center text-meta text-muted-foreground">
          <p>
            <em>
              [Notice: These policy documents are provided for interface demonstration purposes and
              must be reviewed by qualified legal counsel in your jurisdiction prior to production
              launch.]
            </em>
          </p>
        </div>
      </section>

      {/* 3. TRUST CENTER */}
      <TrustCenter showCta={false} />
    </div>
  );
}
