import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Mail,
  Package,
  Truck,
  HelpCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Support & Studio Concierge | Atelier Noir" },
      {
        name: "description",
        content:
          "Reach our Amsterdam studio support desk. We respond to all order, sizing, shipping, and design questions within one working day.",
      },
      { property: "og:title", content: "Contact Studio Support | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Get in touch with our studio team for order assistance, sizing help, or custom requests.",
      },
    ],
  }),
  component: ContactPage,
});

type SubjectOption =
  | "order_status"
  | "sizing_advice"
  | "shipping_inquiry"
  | "return_exchange"
  | "design_collab"
  | "general_question";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [subject, setSubject] = useState<SubjectOption>("order_status");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [quickOrderNum, setQuickOrderNum] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Message dispatched to studio concierge. We'll reply within 24 hours.");
    }, 600);
  };

  const handleCardTopicSelect = (newSubject: SubjectOption) => {
    setSubject(newSubject);
    const formElement = document.getElementById("contact-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs trail={[{ label: "Help", to: "/faq" }, { label: "Contact" }]} />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Customer Care
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            We're here to help.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Questions about an order, product sizing, or international shipping? Our studio
            concierge replies within one working day, Monday through Friday.
          </p>
        </div>
      </section>

      {/* 2. CONTACT OPTION CARDS */}
      <section className="section container-page border-b border-border">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Email Support */}
          <div
            onClick={() => handleCardTopicSelect("general_question")}
            className="cursor-pointer border border-border bg-surface p-6 transition-all hover:border-gold hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex size-10 items-center justify-center border border-border bg-surface-2 text-gold">
                <Mail className="size-5" />
              </div>
              <h3 className="text-h4 mt-4 font-heading text-foreground">Email Support</h3>
              <p className="text-body-sm text-muted-foreground mt-2">
                Direct studio mailbox for general queries, collaborations, and press inquiries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-label text-gold font-mono text-xs">studio@ateliernoir.com</span>
            </div>
          </div>

          {/* Card 2: Order Support */}
          <div
            onClick={() => handleCardTopicSelect("order_status")}
            className="cursor-pointer border border-border bg-surface p-6 transition-all hover:border-gold hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex size-10 items-center justify-center border border-border bg-surface-2 text-gold">
                <Package className="size-5" />
              </div>
              <h3 className="text-h4 mt-4 font-heading text-foreground">Order Support</h3>
              <p className="text-body-sm text-muted-foreground mt-2">
                Assistance with production progress, address changes, or design specifications.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-label text-gold inline-flex items-center gap-1">
                Select Topic <ArrowRight className="size-3" />
              </span>
            </div>
          </div>

          {/* Card 3: Shipping Support */}
          <div
            onClick={() => handleCardTopicSelect("shipping_inquiry")}
            className="cursor-pointer border border-border bg-surface p-6 transition-all hover:border-gold hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex size-10 items-center justify-center border border-border bg-surface-2 text-gold">
                <Truck className="size-5" />
              </div>
              <h3 className="text-h4 mt-4 font-heading text-foreground">Shipping Support</h3>
              <p className="text-body-sm text-muted-foreground mt-2">
                Tracking code lookups, courier delays, customs advice, and regional transit
                questions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-label text-gold inline-flex items-center gap-1">
                Select Topic <ArrowRight className="size-3" />
              </span>
            </div>
          </div>

          {/* Card 4: General Inquiries */}
          <div
            onClick={() => handleCardTopicSelect("sizing_advice")}
            className="cursor-pointer border border-border bg-surface p-6 transition-all hover:border-gold hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex size-10 items-center justify-center border border-border bg-surface-2 text-gold">
                <HelpCircle className="size-5" />
              </div>
              <h3 className="text-h4 mt-4 font-heading text-foreground">Sizing & Care</h3>
              <p className="text-body-sm text-muted-foreground mt-2">
                Measurements guidance, fabric weight advice, and garment washing instructions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-label text-gold inline-flex items-center gap-1">
                Select Topic <ArrowRight className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED "NEED HELP WITH AN ORDER?" BLOCK */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="max-w-3xl mx-auto border border-gold/40 bg-surface p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-label text-gold font-bold uppercase tracking-wider">
                Immediate Order Lookup
              </span>
              <h2 className="text-h3 font-heading text-foreground">
                Need help with an active order?
              </h2>
              <p className="text-body-sm text-muted-foreground">
                Enter your order number to track delivery status or submit an instant exchange
                request.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
              <input
                type="text"
                placeholder="e.g. AN-2026-00184"
                value={quickOrderNum}
                onChange={(e) => setQuickOrderNum(e.target.value)}
                className="h-11 border border-border bg-background px-3 text-body-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
              <Button asChild variant="gold" size="sm" className="h-11">
                <Link to="/track-order">Track Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CONTACT FORM */}
      <section
        id="contact-form-section"
        className="section container-page max-w-3xl border-b border-border"
      >
        <div className="text-center mb-10">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            Send a Dispatch
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            Contact the Studio Concierge.
          </h2>
          <p className="text-body mt-2 text-muted-foreground">
            Please fill out the form below with as much detail as possible.
          </p>
        </div>

        <div className="border border-border bg-surface p-6 sm:p-10 shadow-lg">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="text-h2 font-heading text-foreground">Message Received</h3>
              <p className="text-body text-muted-foreground max-w-md mx-auto">
                Thank you, {name}. Your message regarding{" "}
                <strong className="text-foreground">{subject.replace("_", " ")}</strong> has been
                logged. A studio team member will respond to{" "}
                <strong className="text-foreground">{email}</strong> within 24 hours.
              </p>
              <div className="pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                    setOrderNumber("");
                  }}
                >
                  Send Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="flex items-center gap-3 border border-destructive/50 bg-destructive/10 p-4 text-destructive text-body-sm">
                  <AlertTriangle className="size-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-label text-muted-foreground">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-label text-muted-foreground">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="alex.rivera@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-subject" className="text-label text-muted-foreground">
                    Subject / Topic *
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as SubjectOption)}
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground focus:border-gold focus:outline-none"
                  >
                    <option value="order_status">Order Status & Tracking</option>
                    <option value="sizing_advice">Sizing & Garment Fit Advice</option>
                    <option value="shipping_inquiry">Shipping & Delivery Inquiries</option>
                    <option value="return_exchange">Return or Exchange Request</option>
                    <option value="design_collab">Design Proposal & Collabs</option>
                    <option value="general_question">General Questions & Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-order-num" className="text-label text-muted-foreground">
                    Order Reference (Optional)
                  </label>
                  <input
                    id="contact-order-num"
                    type="text"
                    placeholder="e.g. AN-2026-00184"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-label text-muted-foreground">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  placeholder="Please describe your question or order request in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full border border-border bg-background p-4 text-body-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-meta text-muted-foreground">
                  <Clock className="size-4 text-gold" />
                  <span>Average response time: &lt; 24 hours</span>
                </div>
                <Button
                  type="submit"
                  loading={submitting}
                  variant="gold"
                  className="w-full sm:w-auto px-8"
                >
                  <Send className="size-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. STUDIO OPERATING HOURS & LOCATION */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3 text-center sm:text-left">
          <div className="border border-border bg-surface p-6">
            <Clock className="size-5 text-gold mb-3 mx-auto sm:mx-0" />
            <h3 className="text-h4 font-heading text-foreground">Operating Hours</h3>
            <p className="text-body-sm text-muted-foreground mt-1">
              Monday – Friday
              <br />
              09:00 – 18:00 CET
            </p>
          </div>

          <div className="border border-border bg-surface p-6">
            <Mail className="size-5 text-gold mb-3 mx-auto sm:mx-0" />
            <h3 className="text-h4 font-heading text-foreground">Direct Desk</h3>
            <p className="text-body-sm text-muted-foreground mt-1">
              studio@ateliernoir.com
              <br />
              press@ateliernoir.com
            </p>
          </div>

          <div className="border border-border bg-surface p-6">
            <ShieldCheck className="size-5 text-gold mb-3 mx-auto sm:mx-0" />
            <h3 className="text-h4 font-heading text-foreground">Regional Hubs</h3>
            <p className="text-body-sm text-muted-foreground mt-1">
              Amsterdam, NL
              <br />
              London, UK & Charlotte, US
            </p>
          </div>
        </div>
      </section>

      {/* 6. TRUST CENTER SECTION */}
      <TrustCenter showCta={false} />
    </div>
  );
}
