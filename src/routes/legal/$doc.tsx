import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Lock,
  FileText,
  Cookie,
  RotateCcw,
  Scale,
  Truck,
  ArrowLeft,
  Check,
  ShieldCheck,
  Info,
} from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";
import { cn } from "@/lib/utils";

interface LegalDocData {
  id: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: { id: string; title: string; content: string[] }[];
}

const LEGAL_DOCS: Record<string, LegalDocData> = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how Atelier Noir collects, uses, protects, and discloses personal information when you visit our website, purchase custom on-demand products, or interact with our studio services.",
    lastUpdated: "12 August 2026",
    sections: [
      {
        id: "intro",
        title: "1. Introduction & Data Controller",
        content: [
          "Atelier Noir B.V. ('Atelier Noir', 'we', 'us', or 'our') is committed to protecting your privacy and personal data in full compliance with the General Data Protection Regulation (Regulation (EU) 2016/679 - GDPR) and the UK Data Protection Act 2018.",
          "For the purposes of applicable data protection law, Atelier Noir B.V., Keizersgracht 421, 1016 EK Amsterdam, The Netherlands, is the data controller responsible for the processing of your personal data.",
        ],
      },
      {
        id: "collection",
        title: "2. Information We Collect",
        content: [
          "We collect personal information directly from you when you interact with our website, create an account, place an on-demand order, or contact our customer support.",
          "Contact & Order Information: Name, billing address, shipping destination address, email address, phone number, and transaction history.",
          "Payment Information: Payment card tokens, transaction identifiers, and billing details. Please note that full credit/debit card numbers are processed directly by our PCI-DSS compliant payment gateways (Stripe, PayPal, Adyen) and are never stored on Atelier Noir servers.",
          "Device & Technical Data: IP address, browser type and version, time zone setting, operating system, and anonymized interaction paths gathered through essential session cookies.",
        ],
      },
      {
        id: "usage",
        title: "3. How Information Is Used",
        content: [
          "We process your personal information strictly for legitimate business and contractual purposes, including:",
          "Fulfillment & Delivery: Sending high-resolution print manifests to our regional production facilities in the EU, UK, and US, and providing shipping details to couriers (DHL, FedEx, Royal Mail) for doorstep delivery.",
          "Customer Service: Responding to RMA returns, exchanges, sizing questions, or cancellation requests.",
          "Legal & Financial Compliance: Issuing VAT-compliant fiscal invoices and maintaining tax accounting records as mandated by EU commercial law.",
          "Marketing & Newsletters: Where you have provided explicit opt-in consent, sending occasional studio lookbooks and print archive announcements. You may unsubscribe at any time.",
        ],
      },
      {
        id: "third-parties",
        title: "4. Third-Party Disclosures & International Transfers",
        content: [
          "We do not sell, rent, or trade your personal data to third parties.",
          "We share minimal necessary data with trusted service providers under strict Data Processing Agreements (DPAs):",
          "Regional Production Partners: Transmitting order contents, size, and destination address solely to execute the physical printing and packaging of your order.",
          "Couriers & Logistics: Providing address and email contact details to enable delivery tracking SMS and status emails.",
          "Cloud & Hosting Infrastructure: Secure European cloud servers operating under Standard Contractual Clauses (SCCs) and ISO 27001 certifications.",
        ],
      },
      {
        id: "retention",
        title: "5. Data Retention",
        content: [
          "We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, including statutory tax and accounting retention periods (typically 7 years for financial transaction records under Dutch and EU law).",
          "Account data is retained until you choose to delete your account. Marketing consent logs are preserved until you revoke consent.",
        ],
      },
      {
        id: "rights",
        title: "6. Your Legal Data Rights",
        content: [
          "Under the GDPR and UK Data Protection Act, you possess clear rights regarding your personal information:",
          "Right of Access: Request a copy of the personal data we hold about you.",
          "Right to Rectification: Correct inaccurate or incomplete personal records.",
          "Right to Erasure ('Right to be Forgotten'): Request deletion of your data where no overriding statutory retention obligation exists.",
          "Right to Restriction & Objection: Object to data processing for direct marketing or specific profiling purposes.",
          "Right to Data Portability: Receive your personal data in a structured, machine-readable format.",
          "To exercise any of these rights, please email our Data Protection Officer at privacy@ateliernoir.com.",
        ],
      },
      {
        id: "contact",
        title: "7. Contact & Regulatory Complaints",
        content: [
          "If you have questions about this Privacy Policy or wish to lodge a privacy inquiry, please contact: Atelier Noir Data Protection Desk, Keizersgracht 421, 1016 EK Amsterdam, The Netherlands, or via email at privacy@ateliernoir.com.",
          "You also retain the right to lodge a complaint with your national supervisory authority (e.g., the Autoriteit Persoonsgegevens in the Netherlands or the ICO in the UK).",
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    title: "Terms & Conditions",
    intro:
      "These Terms and Conditions govern your use of the Atelier Noir website and constitute the legal agreement between you and Atelier Noir regarding the purchase of all made-to-order garments, artwork prints, and accessories.",
    lastUpdated: "12 August 2026",
    sections: [
      {
        id: "general",
        title: "1. Scope & Acceptance",
        content: [
          "By accessing our website or placing an order for products, you agree to be legally bound by these Terms and Conditions and our associated Policies.",
          "These terms apply to all international orders regardless of your country of access. If you do not agree to these terms, please refrain from using the site or placing orders.",
        ],
      },
      {
        id: "pod-nature",
        title: "2. Made-to-Order & On-Demand Production",
        content: [
          "Atelier Noir operates on an on-demand manufacturing model. Products offered on our website are not pre-stocked in bulk warehouses; instead, each piece is individually proofed, printed, and inspected following confirmed checkout.",
          "Production timelines generally span 2 to 4 working days prior to carrier dispatch. While we strive to meet all stated timelines, production schedules may fluctuate during high-volume periods or material availability constraints.",
        ],
      },
      {
        id: "orders",
        title: "3. Orders & Contract Formation",
        content: [
          "An order confirmation email signifies receipt of your purchase request but does not constitute formal acceptance of the order. The contract is concluded when we dispatch the physical goods and transmit your courier tracking number.",
          "We reserve the right to cancel or decline any order in cases of pricing typographical errors, suspected fraudulent activity, or unserviceable delivery locations.",
        ],
      },
      {
        id: "prices-tax",
        title: "4. Pricing, Currency & Taxes",
        content: [
          "Prices displayed in Euros (€) and British Pounds (£) include applicable statutory Value Added Tax (VAT).",
          "For international orders shipped outside the European Union and the United Kingdom, customs duties, import tariffs, and local handling fees may be assessed by destination border authorities and are the sole responsibility of the recipient.",
        ],
      },
      {
        id: "cancellation",
        title: "5. Cancellation & Statutory Withdrawal",
        content: [
          "Because digital proofing begins promptly, orders may only be cancelled or amended within 2 hours of checkout submission.",
          "In accordance with EU Directive 2011/83/EU on Consumer Rights, consumer customers maintain statutory rights. For standard made-to-order designs, we provide a voluntary 30-day return window for unworn items in original packaging.",
        ],
      },
      {
        id: "ip",
        title: "6. Intellectual Property & Artwork",
        content: [
          "All artwork designs, illustrations, photography, typography, logos, and digital assets featured on this website are the exclusive intellectual property of Atelier Noir and its contributing visual artists.",
          "Purchasing a physical garment or art print conveys ownership of the physical object only; no copyright, reproduction, or commercial resale license is transferred.",
        ],
      },
      {
        id: "liability",
        title: "7. Limitation of Liability",
        content: [
          "To the maximum extent permitted by applicable law, Atelier Noir shall not be liable for indirect, incidental, or consequential damages resulting from website unavailability or courier delivery transit delays.",
          "Our total liability for any claim arising from a product purchase shall not exceed the purchase price paid for that specific item.",
        ],
      },
      {
        id: "governing-law",
        title: "8. Governing Law & Dispute Resolution",
        content: [
          "These Terms shall be governed by and construed in accordance with the laws of The Netherlands, without regard to conflict of law principles.",
          "EU consumers may also access the European Commission's Online Dispute Resolution (ODR) platform at ec.europa.eu/consumers/odr.",
        ],
      },
    ],
  },
  cookies: {
    id: "cookies",
    title: "Cookie Policy",
    intro:
      "This Cookie Policy explains how Atelier Noir uses cookies and similar browser storage technologies to ensure reliable checkout functions, preserve your design preferences, and analyze anonymized site performance.",
    lastUpdated: "12 August 2026",
    sections: [
      {
        id: "what-are-cookies",
        title: "1. What Are Cookies?",
        content: [
          "Cookies are small text files stored on your computer, tablet, or mobile device when you visit websites. They enable the site to recognize your browser, remember your shopping cart items across page reloads, and preserve your currency and language preferences.",
        ],
      },
      {
        id: "essential",
        title: "2. Strictly Necessary (Essential) Cookies",
        content: [
          "These cookies are technically required for the website to function securely and cannot be switched off in our systems. They include session tokens, cart item persistence, CSRF security tokens, and currency preferences.",
          "Examples: atelier_cart_v1 (preserves selected designs and sizes in bag), atelier_currency (stores selected currency preference), atelier_consent (records your cookie preferences).",
        ],
      },
      {
        id: "analytics",
        title: "3. Performance & Analytics Cookies",
        content: [
          "These cookies collect aggregated, anonymized metrics on how visitors navigate our site, which design categories are most popular, and whether checkout pages experience rendering latency.",
          "We use privacy-friendly aggregated analytics that do not track individual cross-site identities or sell user behavioral profiles.",
        ],
      },
      {
        id: "marketing",
        title: "4. Marketing & Preference Cookies",
        content: [
          "These cookies may be used to measure the effectiveness of our seasonal lookbook campaigns and ensure you do not see repetitive announcements. They operate strictly upon your explicit consent.",
        ],
      },
      {
        id: "management",
        title: "5. Managing Your Cookie Choices",
        content: [
          "You can adjust your cookie settings at any time using our interactive Cookie Preference panel below, or directly via your web browser settings. Disabling essential cookies may impair shopping cart and checkout features.",
        ],
      },
    ],
  },
  refunds: {
    id: "refunds",
    title: "Refund & Cancellation Policy",
    intro:
      "Our detailed terms regarding refund issuance, payment gateway reversal timelines, return authorisations (RMA), and defective merchandise replacements.",
    lastUpdated: "12 August 2026",
    sections: [
      {
        id: "eligibility",
        title: "1. Return & Refund Eligibility",
        content: [
          "We want you to be completely satisfied with your bespoke piece. If your item is unworn, unwashed, and retains all original tags and packaging, you may request a return within 30 calendar days from the date of confirmed courier delivery.",
        ],
      },
      {
        id: "processing",
        title: "2. Refund Processing Timeframe",
        content: [
          "Once your returned item or RMA claim is reviewed and approved by our studio team, your refund is processed immediately.",
          "Credit/Debit Cards: Funds typically appear on your statement within 3–5 business days.",
          "PayPal / Apple Pay: Processed instantly to your linked account or card.",
          "Klarna / Pay Later: Invoices are updated or credited within 2 business days.",
        ],
      },
      {
        id: "defective",
        title: "3. Damaged or Defective Items",
        content: [
          "If an item arrives damaged or defective, we provide a 100% free priority replacement or full refund. Please submit photos through our Returns portal within 14 days of delivery.",
        ],
      },
    ],
  },
  "terms-of-sale": {
    id: "terms-of-sale",
    title: "Terms of Sale",
    intro:
      "Specific commercial terms governing prices, order acceptance, title transfer, VAT calculations, and consumer cancellation rights.",
    lastUpdated: "12 August 2026",
    sections: [
      {
        id: "order-placement",
        title: "1. Commercial Agreement",
        content: [
          "When you place an order on Atelier Noir, you are offering to purchase a product subject to these Terms of Sale. All orders are subject to availability and confirmation of the order price.",
        ],
      },
      {
        id: "title-risk",
        title: "2. Title & Risk of Loss",
        content: [
          "Title and risk of loss in all goods purchased passes to you upon delivery of the items to the carrier, provided full payment has been received.",
        ],
      },
      {
        id: "pricing-errors",
        title: "3. Pricing Inaccuracies",
        content: [
          "While we endeavour to ensure all prices on our site are accurate, errors may occasionally occur. If we discover a pricing error, we will inform you as soon as possible and provide the option to reconfirm your order at the correct price or cancel it for a full refund.",
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    const docKey = params.doc.toLowerCase();
    const doc = LEGAL_DOCS[docKey];
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Document Unavailable | Atelier Noir" },
          { name: "robots", content: "noindex" },
        ],
      };
    const d = loaderData.doc;
    return {
      meta: [
        { title: `${d.title} | Legal Center | Atelier Noir` },
        { name: "description", content: d.intro },
        { property: "og:title", content: `${d.title} | Atelier Noir` },
        { property: "og:description", content: d.intro },
      ],
    };
  },
  component: LegalDocPage,
});

function CookiePreferencesManager() {
  const [essential] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(true);

  const handleSave = () => {
    toast.success("Cookie preferences saved successfully.");
  };

  return (
    <div className="mt-8 border border-gold/40 bg-surface p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-h3 font-heading text-foreground">Interactive Cookie Preferences</h3>
        <p className="text-body-sm text-muted-foreground mt-1">
          Customize which non-essential cookies and analytics signals you permit during your visit.
        </p>
      </div>

      <div className="space-y-4 divide-y divide-border">
        <div className="flex items-center justify-between pt-3">
          <div>
            <p className="text-label font-semibold text-foreground">Strictly Necessary Cookies</p>
            <p className="text-body-sm text-muted-foreground">
              Required for cart persistence, session security, and checkout execution.
            </p>
          </div>
          <span className="text-label text-gold font-mono text-xs px-3 py-1 bg-surface-2 border border-gold/40">
            ALWAYS ACTIVE
          </span>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-label font-semibold text-foreground">Analytics & Performance</p>
            <p className="text-body-sm text-muted-foreground">
              Helps us improve site speed, identify navigation bottlenecks, and evaluate page
              popularity.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAnalytics(!analytics)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              analytics ? "bg-gold" : "bg-border",
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block size-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out",
                analytics ? "translate-x-5" : "translate-x-0 bg-muted-foreground",
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-label font-semibold text-foreground">Functional Preferences</p>
            <p className="text-body-sm text-muted-foreground">
              Remembers your selected currency, sizing filter preferences, and local language.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFunctional(!functional)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              functional ? "bg-gold" : "bg-border",
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block size-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out",
                functional ? "translate-x-5" : "translate-x-0 bg-muted-foreground",
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-label font-semibold text-foreground">
              Marketing & Lookbook Campaigns
            </p>
            <p className="text-body-sm text-muted-foreground">
              Allows relevant design updates and prevents showing duplicate announcement banners.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMarketing(!marketing)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              marketing ? "bg-gold" : "bg-border",
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block size-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out",
                marketing ? "translate-x-5" : "translate-x-0 bg-muted-foreground",
              )}
            />
          </button>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={handleSave} variant="gold" size="sm">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

function LegalDocPage() {
  const { doc } = Route.useLoaderData();
  const [activeSection, setActiveSection] = useState<string>(doc.sections[0]?.id || "");

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs trail={[{ label: "Legal Center", to: "/legal" }, { label: doc.title }]} />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Official Legal Document
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            {doc.title}
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            {doc.intro}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-meta text-muted-foreground">
            <span>Last Updated: {doc.lastUpdated}</span>
            <span>·</span>
            <span>Version 2.4</span>
          </div>
        </div>
      </section>

      {/* 2. DOCUMENT CONTENT WITH TABLE OF CONTENTS */}
      <section className="section container-page max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sticky Sidebar Table of Contents */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 border border-border bg-surface p-6 space-y-4">
              <p className="text-label text-gold uppercase tracking-wider font-semibold text-xs">
                Table of Contents
              </p>
              <nav className="space-y-2 text-body-sm">
                {doc.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={cn(
                      "block py-1 text-xs transition-colors hover:text-gold",
                      activeSection === s.id ? "text-gold font-semibold" : "text-muted-foreground",
                    )}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-border/60">
                <Link
                  to="/legal"
                  className="text-label text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="size-3.5" /> Back to Legal Center
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Legal Notice */}
            <div className="border border-border bg-surface/50 p-4 text-meta text-muted-foreground flex items-start gap-3">
              <Info className="size-4 text-gold shrink-0 mt-0.5" />
              <p>
                <em>
                  [Notice: This document is formulated for production preview and international
                  compliance standards. Replace with qualified legal counsel copy prior to
                  deployment.]
                </em>
              </p>
            </div>

            {/* Document Sections */}
            <div className="space-y-10">
              {doc.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
                  <h2 className="text-h2 font-heading text-foreground border-b border-border pb-3">
                    {sec.title}
                  </h2>
                  <div className="space-y-4 text-body text-muted-foreground leading-relaxed">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-[16px] text-foreground/90">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* If this is the cookie policy, render the interactive cookie manager */}
            {doc.id === "cookies" && <CookiePreferencesManager />}

            {/* Questions Banner */}
            <div className="border border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-label text-gold uppercase font-semibold">
                  Questions regarding this policy?
                </p>
                <p className="text-body-sm text-muted-foreground mt-1">
                  Our studio legal compliance desk is available to assist.
                </p>
              </div>
              <Button asChild variant="gold" size="sm" className="shrink-0">
                <Link to="/contact">Contact Legal Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST CENTER */}
      <TrustCenter showCta={false} />
    </div>
  );
}
