import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  RotateCcw,
  AlertTriangle,
  FileCheck2,
  Package,
  Sparkles,
  Camera,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Field } from "@/components/store/ui";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrustCenter } from "@/components/store/TrustCenter";
import { returnService } from "@/lib/services/return-service";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds Policy | Atelier Noir" },
      {
        name: "description",
        content:
          "Clear 30-day return eligibility, damaged item replacement protocols, RMA portal, and refund timelines.",
      },
      { property: "og:title", content: "Returns & Refunds | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Submit an RMA return, request an exchange, or claim a replacement for damaged deliveries.",
      },
    ],
  }),
  component: ReturnsPage,
});

const DAMAGED_FLOW_STEPS = [
  {
    step: "01",
    icon: AlertTriangle,
    title: "Product Arrives Damaged",
    desc: "A garment, canvas, or packaging item arrives with a visible printing error, misprint, or transit tear.",
  },
  {
    step: "02",
    icon: RotateCcw,
    title: "Contact Support",
    desc: "Open our RMA portal below or email studio@ateliernoir.com with your order reference number.",
  },
  {
    step: "03",
    icon: Camera,
    title: "Provide Photos",
    desc: "Attach 1–2 well-lit photos showing the defect and the barcode label on the garment tag.",
  },
  {
    step: "04",
    icon: FileCheck2,
    title: "Studio Case Review",
    desc: "Our quality inspection team verifies the defect within 24 business hours. No complicated return shipping required.",
  },
  {
    step: "05",
    icon: Sparkles,
    title: "Free Reprint or Refund",
    desc: "We dispatch a priority replacement reprint or issue an immediate 100% refund to your original payment method.",
  },
];

function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<
    "wrong_size" | "defective" | "style_preference" | "changed_mind"
  >("wrong_size");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultRma, setResultRma] = useState<string | null>(null);

  async function handleSubmitReturn(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      toast.error("Please enter both your order number and email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await returnService.createReturn({
        orderNumber: orderNumber.trim(),
        customerEmail: email.trim(),
        reason,
        notes,
      });

      if (result.error || !result.returnRecord) {
        toast.error(result.error || "Unable to process return request.");
      } else {
        setResultRma(result.returnRecord.rma_number);
        toast.success(`Return request registered with RMA ${result.returnRecord.rma_number}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs
            trail={[{ label: "Help", to: "/contact" }, { label: "Returns & Refunds" }]}
          />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Satisfaction Guarantee
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Returns & Refunds.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            A clear and simple guide to resolving order issues, initiating exchanges, and reporting
            damaged deliveries with complete transparency.
          </p>
        </div>
      </section>

      {/* 2. VISUAL DAMAGED PRODUCT FLOW */}
      <section className="section container-page border-b border-border">
        <div className="flex flex-col items-center text-center">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            Resolution Workflow
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            What Happens If Something Goes Wrong?
          </h2>
          <p className="text-body-lg mt-3 max-w-2xl text-muted-foreground">
            We hold ourselves to strict printing and craftsmanship standards. If your delivery is
            flawed, our 5-step guarantee ensures prompt resolution.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DAMAGED_FLOW_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative flex flex-col justify-between border border-border bg-surface p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gold uppercase">
                      Step {s.step}
                    </span>
                    <div className="flex size-8 items-center justify-center border border-border bg-surface-2 text-gold">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="text-h4 mt-4 font-heading text-foreground">{s.title}</h3>
                  <p className="text-body-sm mt-2 text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {idx < DAMAGED_FLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-border">
                    <ArrowRight className="size-4 text-gold/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. RETURN POLICY SECTIONS */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Policy Standards
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              Return Terms & Eligibility.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-gold mb-3">
                <Clock className="size-5" />
                <h3 className="text-h3 font-heading text-foreground">30-Day Return Window</h3>
              </div>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                Unworn, unwashed items in their original packaging may be returned within 30 days of
                confirmed delivery. Custom-printed items are eligible for exchange or store credit
                if unworn.
              </p>
              <div className="mt-4 p-3 bg-surface-2 border border-border text-meta text-muted-foreground">
                <em>[Insert verified return period and applicable consumer-law terms here.]</em>
              </div>
            </div>

            <div className="border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-gold mb-3">
                <AlertTriangle className="size-5" />
                <h3 className="text-h3 font-heading text-foreground">Damaged or Defective Items</h3>
              </div>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                If your item arrives with manufacturing flaws, torn seams, or print discrepancies,
                we replace it immediately at zero additional shipping expense. Provide photo
                evidence via our RMA portal.
              </p>
            </div>

            <div className="border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-gold mb-3">
                <RefreshCw className="size-5" />
                <h3 className="text-h3 font-heading text-foreground">Size Exchanges</h3>
              </div>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                First-time apparel orders qualify for a complimentary size exchange on identical
                artwork prints. Submit your exchange request within 14 days of delivery.
              </p>
            </div>

            <div className="border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-gold mb-3">
                <ShieldCheck className="size-5" />
                <h3 className="text-h3 font-heading text-foreground">Refund Processing Timeline</h3>
              </div>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                Approved refunds are initiated back to the original payment method (Credit Card,
                PayPal, Apple Pay, iDEAL) within 3–5 business days following inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE RMA REQUEST PORTAL */}
      <section className="section container-page border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Self-Service Portal
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              Start a Return or Exchange (RMA).
            </h2>
            <p className="text-body mt-2 text-muted-foreground">
              Enter your order number and purchase email to verify eligibility and generate an
              official RMA authorization code.
            </p>
          </div>

          <div className="mt-8 border border-border bg-surface p-6 sm:p-10 shadow-lg">
            {resultRma ? (
              <div className="border border-gold/50 bg-gold/5 p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-gold bg-gold/20 text-gold">
                  <CheckCircle2 className="size-6" />
                </div>
                <span className="text-label text-gold uppercase tracking-wider font-semibold">
                  Return Authorized
                </span>
                <p className="text-display font-mono font-bold text-foreground">{resultRma}</p>
                <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
                  Your RMA claim has been logged with our studio inspection team. Please include
                  this reference code on your parcel or in communications with our support team.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResultRma(null);
                      setOrderNumber("");
                      setNotes("");
                    }}
                  >
                    Start Another Request
                  </Button>
                  <Button asChild variant="gold" size="sm">
                    <Link to="/contact">Contact Concierge</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReturn} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Order Reference *"
                    placeholder="AN-2026-00184"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                  <Field
                    label="Account Email *"
                    type="email"
                    placeholder="alex.rivera@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="return-reason-select"
                    className="text-label text-muted-foreground"
                  >
                    Reason for Return / Claim *
                  </label>
                  <select
                    id="return-reason-select"
                    value={reason}
                    onChange={(e) =>
                      setReason(
                        e.target.value as
                          "wrong_size" | "defective" | "style_preference" | "changed_mind",
                      )
                    }
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground focus:border-gold focus:outline-none"
                  >
                    <option value="wrong_size">Wrong Size / Exchange Request</option>
                    <option value="defective">Print Flaw / Garment Damage</option>
                    <option value="style_preference">Color / Placement Preference</option>
                    <option value="changed_mind">Order Cancellation / Return</option>
                  </select>
                </div>

                <Field
                  label="Description & Photo Details (Optional)"
                  placeholder="Please describe the sizing discrepancy, defect location, or exchange size needed."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                  <span className="text-meta text-muted-foreground">
                    Claims are reviewed within 24 business hours.
                  </span>
                  <Button
                    type="submit"
                    loading={loading}
                    variant="gold"
                    className="w-full sm:w-auto px-8"
                  >
                    Submit RMA Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. RETURNS FAQ ACCORDION */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Quick Answers
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              Frequently Asked Return Questions.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border bg-surface px-6 py-2">
              <AccordionTrigger className="font-heading text-lg text-foreground hover:no-underline">
                Do I have to pay for return shipping on defective items?
              </AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground pt-2 pb-4">
                No. If an item arrives damaged or with printing flaws, we cover 100% of the
                replacement cost and dispatch a new item with priority courier service. You do not
                need to mail back the defective garment in most cases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border bg-surface px-6 py-2">
              <AccordionTrigger className="font-heading text-lg text-foreground hover:no-underline">
                How long do refunds take to appear on my bank statement?
              </AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground pt-2 pb-4">
                Once our studio authorizes the refund, the transaction is processed immediately.
                Depending on your financial institution (Visa, Mastercard, PayPal, Klarna), the
                funds will credit to your statement within 3 to 5 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border bg-surface px-6 py-2">
              <AccordionTrigger className="font-heading text-lg text-foreground hover:no-underline">
                Can I exchange an item for a different design?
              </AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground pt-2 pb-4">
                Yes. If you wish to switch artwork designs, we will issue a direct studio credit or
                gift code for the full purchase amount so you can select any piece in our archive.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 6. TRUST CENTER SECTION */}
      <TrustCenter showCta={true} />
    </div>
  );
}
