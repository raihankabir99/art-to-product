import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  X,
  ArrowRight,
  HelpCircle,
  Package,
  Truck,
  RotateCcw,
  CreditCard,
  User,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions & Help | Atelier Noir" },
      {
        name: "description",
        content:
          "Answers on made-to-order production, sizing, international delivery, tracking, returns, and sustainable print-on-demand craftsmanship.",
      },
      { property: "og:title", content: "FAQ & Help | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Everything you need to know about our made-to-order apparel, shipping, and support.",
      },
    ],
  }),
  component: FaqPage,
});

type FaqCategory =
  | "All"
  | "Orders"
  | "Products"
  | "Shipping"
  | "Returns"
  | "Payments"
  | "Account"
  | "POD / Production";

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  relatedLink?: { label: string; to: string };
}

const FAQ_CATEGORIES: FaqCategory[] = [
  "All",
  "Orders",
  "Products",
  "Shipping",
  "Returns",
  "Payments",
  "Account",
  "POD / Production",
];

const FAQ_DATA: FaqItem[] = [
  {
    id: "pod-concept",
    category: "POD / Production",
    question: "What is Print-on-Demand?",
    answer:
      "Print-on-Demand (POD) is a conscious production model where items are crafted, printed, and inspected only after a customer places an order. Unlike traditional fashion brands that produce tens of thousands of speculative garments in advance, we hold zero unprinted inventory. This drastically minimizes excess textile waste while allowing us to offer each design across thirteen distinct surfaces.",
  },
  {
    id: "production-location",
    category: "POD / Production",
    question: "Where are products made?",
    answer:
      "We partner with specialized, vetted digital print facilities located in the Netherlands, the United Kingdom, and the United States. When your order is placed, our system automatically routes the artwork files to the fulfillment hub closest to your shipping address to reduce transit distance and delivery emissions.",
  },
  {
    id: "production-time",
    category: "POD / Production",
    question: "How long does production take?",
    answer:
      "Because every piece is custom-printed and individually cured, production typically takes 2 to 4 working days (Monday to Friday) before hand-off to the courier. During peak holiday seasons, production may take up to 5 working days.",
  },
  {
    id: "delivery-time",
    category: "Shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery transit times after production are: European Union: 3–5 working days; United Kingdom: 2–4 working days; North America: 4–7 working days; Middle East & Gulf: 6–9 working days; Rest of World: 7–12 working days. Express options are available at checkout for urgent orders.",
    relatedLink: { label: "View Shipping Timelines", to: "/shipping" },
  },
  {
    id: "shipping-countries",
    category: "Shipping",
    question: "Which countries do you ship to?",
    answer:
      "We ship to over 50 countries worldwide, including all 27 European Union member states, the UK, Norway, Switzerland, the United States, Canada, the UAE, Saudi Arabia, Japan, and Australia. If your destination is not listed during checkout, please contact our studio team for custom delivery arrangements.",
  },
  {
    id: "order-tracking",
    category: "Orders",
    question: "How can I track my order?",
    answer:
      "As soon as your package passes final inspection and is handed to the courier, you will receive an email with your official tracking number and carrier link (DHL Express, Royal Mail, FedEx, or DPD). You can also track your status anytime on our dedicated tracking page.",
    relatedLink: { label: "Track Your Order Now", to: "/track-order" },
  },
  {
    id: "change-address",
    category: "Orders",
    question: "Can I change my shipping address?",
    answer:
      "Because orders enter automated proofing quickly, we can only update shipping addresses within 2 hours of placement. If you noticed a mistake, please reach out to our studio concierge immediately via our contact page with your order reference number.",
    relatedLink: { label: "Contact Studio Support", to: "/contact" },
  },
  {
    id: "cancel-order",
    category: "Orders",
    question: "Can I cancel my order?",
    answer:
      "You can cancel your order within 2 hours of checkout before digital files are sent to the printing queue. Once the garment blank is loaded and pigment application begins, production cannot be stopped. However, you can still return or exchange unworn items after delivery.",
  },
  {
    id: "damaged-product",
    category: "Returns",
    question: "What happens if my product arrives damaged?",
    answer:
      "In the rare event that an item arrives with printing flaws or in-transit packaging damage, we will issue a free expedited reprint or full refund immediately. Simply visit our Returns page, input your order number, and attach clear photos of the issue. Our support team verifies claims within 24 hours.",
    relatedLink: { label: "Submit Damage / RMA Claim", to: "/returns" },
  },
  {
    id: "wrong-product",
    category: "Returns",
    question: "What happens if I receive the wrong product?",
    answer:
      "If you receive an incorrect design, size, or medium, please let us know via our Returns portal. We will dispatch the correct item without requiring you to go through complicated return hassles.",
  },
  {
    id: "size-selection",
    category: "Products",
    question: "How do I choose my size?",
    answer:
      "Our t-shirts feature a modern, relaxed boxy cut, while our hoodies feature an oversized architectural silhouette with dropped shoulders. We strongly recommend consulting our interactive Size Guide on any product page, which includes exact chest, length, and sleeve measurements in both centimetres and inches.",
  },
  {
    id: "product-care",
    category: "Products",
    question: "How should I care for my product?",
    answer:
      "To preserve the high-density archival print and 240gsm organic cotton fibers: wash cold (30°C or below) inside out with mild detergent, avoid fabric softeners, air dry flat or on a wooden hanger, and never iron directly over the printed graphic.",
  },
  {
    id: "payment-methods",
    category: "Payments",
    question: "What payment methods are available?",
    answer:
      "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, PayPal, and regional instant payment methods including iDEAL (Netherlands), Bancontact (Belgium), and Klarna Pay Later (available in eligible EU/UK regions). All transactions are encrypted via 256-bit SSL protocols.",
  },
  {
    id: "account-benefits",
    category: "Account",
    question: "Do I need an account to place an order?",
    answer:
      "No. Guest checkout is fully supported. However, creating a complimentary Atelier Noir account allows you to save multiple shipping addresses, track active orders in real time, view your purchase history, and curate a personal design wishlist.",
  },
  {
    id: "contact-support",
    category: "Orders",
    question: "How can I contact customer support?",
    answer:
      "You can reach our studio concierge team via our Contact Form or by emailing our direct desk at studio@ateliernoir.com. We answer all customer messages within one business day (Monday–Friday, 09:00–18:00 Central European Time).",
    relatedLink: { label: "Open Contact Form", to: "/contact" },
  },
];

function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const isFiltering = searchQuery.trim() !== "" || activeCategory !== "All";

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs trail={[{ label: "Help", to: "/contact" }, { label: "FAQ" }]} />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Support Directory
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            How can we help?
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground">
            Clear, transparent answers on made-to-order production, international delivery, sizing,
            returns, and studio craftsmanship.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <label htmlFor="faq-search" className="sr-only">
              Search questions
            </label>
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-4 size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="faq-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, sizing, shipping times, returns..."
                className="h-14 w-full border border-border bg-background pl-12 pr-12 text-body text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILL NAVIGATION */}
      <nav
        aria-label="FAQ Categories"
        className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-md py-3"
      >
        <div className="container-page flex items-center justify-between gap-4">
          <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto py-1">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 rounded-none border px-4 py-2 text-label transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold whitespace-nowrap",
                    isActive
                      ? "border-gold bg-gold text-black font-semibold shadow-sm"
                      : "border-border bg-surface text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. FAQ ACCORDIONS & SEARCH RESULTS */}
      <section className="section container-page max-w-4xl py-12 md:py-16">
        {/* Results Counter / Filter state */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-label text-gold uppercase tracking-wider font-semibold">
              {activeCategory === "All" ? "All Topics" : activeCategory}
            </span>
            <p className="text-meta text-muted-foreground mt-0.5">
              Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"}
            </p>
          </div>

          {isFiltering && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="text-label text-gold hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredFaqs.length === 0 ? (
          <div className="border border-dashed border-border bg-surface/40 p-12 text-center my-8">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-surface text-gold">
              <Search className="size-6" />
            </div>
            <h2 className="text-h2 mt-4 font-heading uppercase">We couldn't find that.</h2>
            <p className="text-body mt-2 max-w-md mx-auto text-muted-foreground">
              Try searching with different keywords, select another topic, or contact our studio
              team directly for immediate help.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear Search
              </Button>
              <Button asChild variant="gold" size="sm">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border bg-surface px-6 py-2 transition-colors hover:border-gold/40 data-[state=open]:border-gold/60 data-[state=open]:bg-surface-2/60"
              >
                <AccordionTrigger className="text-left font-heading text-lg sm:text-xl text-foreground hover:no-underline py-4">
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-xs uppercase tracking-wider text-gold font-mono">
                      [{faq.category}]
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground pt-2 pb-6 leading-relaxed">
                  <p className="text-[16px] text-foreground/90">{faq.answer}</p>
                  {faq.relatedLink && (
                    <div className="mt-4 pt-3 border-t border-border/60">
                      <Link
                        to={faq.relatedLink.to}
                        className="inline-flex items-center gap-1.5 text-label text-gold hover:underline font-semibold"
                      >
                        {faq.relatedLink.label} <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Quick Help Action Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="border border-border bg-surface p-6 flex flex-col justify-between">
            <div>
              <Truck className="size-5 text-gold mb-3" />
              <h3 className="text-h4 font-heading text-foreground">Track Order</h3>
              <p className="text-body-sm text-muted-foreground mt-1">
                Check the real-time production and delivery progress of your pieces.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-6 w-full">
              <Link to="/track-order">Open Tracking</Link>
            </Button>
          </div>

          <div className="border border-border bg-surface p-6 flex flex-col justify-between">
            <div>
              <RotateCcw className="size-5 text-gold mb-3" />
              <h3 className="text-h4 font-heading text-foreground">Returns & RMA</h3>
              <p className="text-body-sm text-muted-foreground mt-1">
                Initiate a 30-day return, exchange request, or damaged item replacement.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-6 w-full">
              <Link to="/returns">Start Return</Link>
            </Button>
          </div>

          <div className="border border-border bg-surface p-6 flex flex-col justify-between">
            <div>
              <MessageSquare className="size-5 text-gold mb-3" />
              <h3 className="text-h4 font-heading text-foreground">Direct Concierge</h3>
              <p className="text-body-sm text-muted-foreground mt-1">
                Speak directly with our studio support team. Responses within 1 business day.
              </p>
            </div>
            <Button asChild variant="gold" size="sm" className="mt-6 w-full">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. TRUST CENTER SECTION */}
      <TrustCenter showCta={false} />
    </div>
  );
}
