import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  Globe,
  AlertCircle,
  Search,
} from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { TrustCenter } from "@/components/store/TrustCenter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Guide | Atelier Noir" },
      {
        name: "description",
        content:
          "Everything you need to know about made-to-order production times, regional courier delivery, tracked transit, and international customs.",
      },
      { property: "og:title", content: "Shipping & Delivery Guide | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Transparent production schedules, courier carriers, and international delivery zones.",
      },
    ],
  }),
  component: ShippingPage,
});

const TIMELINE_STEPS = [
  {
    step: "01",
    icon: Sparkles,
    title: "Order Placed",
    desc: "Your order details and high-resolution artwork vector files are verified and queued.",
  },
  {
    step: "02",
    icon: Layers,
    title: "Production",
    desc: "Pigment application, heat-curing, and surface alignment on your chosen blank canvas (2–4 days).",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Quality Check",
    desc: "Individual hand inspection to ensure stitch integrity, color accuracy, and zero printing artifacts.",
  },
  {
    step: "04",
    icon: Package,
    title: "Packing",
    desc: "Folded and secured in recyclable, plastic-free FSC kraft packaging with order manifesto.",
  },
  {
    step: "05",
    icon: Truck,
    title: "Shipping",
    desc: "Handed over to regional couriers (DHL, FedEx, Royal Mail) with active tracking code assigned.",
  },
  {
    step: "06",
    icon: CheckCircle2,
    title: "Delivery",
    desc: "Contactless delivery directly to your door or designated secure parcel collection point.",
  },
];

type RegionTab = "europe" | "uk" | "na" | "middle-east" | "asia" | "other";

interface RegionInfo {
  id: RegionTab;
  name: string;
  flag: string;
  productionEstimate: string;
  transitEstimate: string;
  couriers: string;
  standardCost: string;
  freeShippingThreshold: string;
  dutiesInfo: string;
  notes: string;
}

const REGION_DATA: Record<RegionTab, RegionInfo> = {
  europe: {
    id: "europe",
    name: "European Union",
    flag: "🇪🇺",
    productionEstimate: "2–4 working days",
    transitEstimate: "3–5 working days",
    couriers: "DHL Parcel, PostNL, DPD Europe",
    standardCost: "€5.90 (Standard Tracked)",
    freeShippingThreshold: "Free over €90",
    dutiesInfo: "VAT included at checkout. Zero customs duties within the EU single market.",
    notes:
      "Fulfilled directly from our Amsterdam hub for low transit distance and minimal emissions.",
  },
  uk: {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    productionEstimate: "2–4 working days",
    transitEstimate: "2–4 working days",
    couriers: "Royal Mail Tracked 24/48, DPD UK",
    standardCost: "£4.90 (Tracked 48)",
    freeShippingThreshold: "Free over £80",
    dutiesInfo: "UK VAT is included at checkout. No additional import fees for orders under £135.",
    notes:
      "Produced and routed directly from our Birmingham fulfillment partner to eliminate import delays.",
  },
  na: {
    id: "na",
    name: "North America (US & Canada)",
    flag: "🇺🇸 🇨🇦",
    productionEstimate: "2–4 working days",
    transitEstimate: "4–7 working days",
    couriers: "USPS Priority, FedEx Ground, Canada Post",
    standardCost: "$6.90 USD (Standard)",
    freeShippingThreshold: "Free over $100 USD",
    dutiesInfo: "US orders under $800 are exempt from customs duties. Canadian GST/PST applies.",
    notes: "US orders are fulfilled domestically from our partner facility in North Carolina.",
  },
  "middle-east": {
    id: "middle-east",
    name: "Middle East & Gulf (UAE, SA, QA)",
    flag: "🇦🇪 🇸🇦",
    productionEstimate: "2–4 working days",
    transitEstimate: "6–9 working days",
    couriers: "DHL Express International, Aramex",
    standardCost: "$14.00 USD (Express Courier)",
    freeShippingThreshold: "Free over $150 USD",
    dutiesInfo: "Local VAT and customs duties may be collected by the courier upon arrival.",
    notes:
      "Dispatched with express air priority for rapid delivery across Dubai, Riyadh, and Doha.",
  },
  asia: {
    id: "asia",
    name: "Asia-Pacific (Japan, KR, AU, SG)",
    flag: "🇯🇵 🇸🇬 🇦🇺",
    productionEstimate: "2–4 working days",
    transitEstimate: "7–10 working days",
    couriers: "DHL Express Worldwide, Japan Post",
    standardCost: "$15.00 USD (Standard Air Tracked)",
    freeShippingThreshold: "Free over $160 USD",
    dutiesInfo:
      "Import thresholds vary by destination country. Clear tracking provided throughout.",
    notes: "Signature required on delivery for insured peace of mind.",
  },
  other: {
    id: "other",
    name: "Rest of the World",
    flag: "🌐",
    productionEstimate: "2–4 working days",
    transitEstimate: "8–14 working days",
    couriers: "DHL Global Mail, Local National Postal Services",
    standardCost: "$16.00 USD (Registered Tracked)",
    freeShippingThreshold: "Free over $180 USD",
    dutiesInfo: "Recipient is responsible for local import duties and taxes as applicable.",
    notes: "If your destination does not calculate rates automatically, contact our concierge.",
  },
};

function ShippingPage() {
  const [activeRegion, setActiveRegion] = useState<RegionTab>("europe");
  const [trackOrderNum, setTrackOrderNum] = useState("");
  const [trackEmail, setTrackEmail] = useState("");
  const [isSimulatedTracking, setIsSimulatedTracking] = useState(false);

  const region = REGION_DATA[activeRegion];

  const handleSimulateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackOrderNum.trim()) {
      setIsSimulatedTracking(true);
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page max-w-4xl text-center">
          <Breadcrumbs
            trail={[{ label: "Help", to: "/contact" }, { label: "Shipping & Delivery" }]}
          />

          <span className="text-label text-gold uppercase tracking-widest font-semibold mt-8 inline-block">
            Worldwide Delivery
          </span>

          <h1 className="text-display mt-3 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Shipping & Delivery.
          </h1>

          <p className="text-body-lg mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Everything you need to know about our made-to-order production timelines, regional
            courier partners, transparent transit estimates, and customs handling.
          </p>
        </div>
      </section>

      {/* 2. PRODUCTION & SHIPPING TIMELINE */}
      <section className="section container-page border-b border-border">
        <div className="flex flex-col items-center text-center">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            The Journey
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            From Digital Drawing to Your Door.
          </h2>
          <p className="text-body-lg mt-3 max-w-2xl text-muted-foreground">
            Every garment and object moves through six distinct proofing and delivery stages.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {TIMELINE_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="flex flex-col justify-between border border-border bg-surface p-6 transition-colors hover:border-gold/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gold uppercase">
                      {s.step}
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
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. REGION SELECTOR UI */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Regional Estimates
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              Delivery Times & Rates by Region.
            </h2>
            <p className="text-body mt-2 text-muted-foreground">
              Select your territory to inspect verified fulfillment estimates, couriers, and customs
              guidelines.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="mt-10 no-scrollbar flex items-center justify-start sm:justify-center gap-2 overflow-x-auto border-b border-border pb-4">
            {(Object.keys(REGION_DATA) as RegionTab[]).map((key) => {
              const r = REGION_DATA[key];
              const isActive = activeRegion === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveRegion(key)}
                  className={cn(
                    "flex items-center gap-2 border px-4 py-2.5 text-label transition-all whitespace-nowrap",
                    isActive
                      ? "border-gold bg-gold text-black font-semibold shadow-sm"
                      : "border-border bg-surface text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  <span>{r.flag}</span>
                  <span>{r.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Region Card */}
          <div className="mt-8 border border-border bg-surface p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{region.flag}</span>
                <div>
                  <h3 className="text-h2 font-heading text-foreground">{region.name}</h3>
                  <p className="text-meta text-muted-foreground mt-0.5">{region.notes}</p>
                </div>
              </div>
              <span className="text-label px-3 py-1 bg-gold/10 border border-gold/40 text-gold font-semibold self-start sm:self-auto">
                {region.freeShippingThreshold}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-border/80 bg-background/50 p-4">
                <p className="text-label text-gold font-semibold uppercase">Production Time</p>
                <p className="text-h4 mt-1 font-heading text-foreground">
                  {region.productionEstimate}
                </p>
                <p className="text-meta text-muted-foreground mt-1">
                  Individual print & proofing cycle
                </p>
              </div>

              <div className="border border-border/80 bg-background/50 p-4">
                <p className="text-label text-gold font-semibold uppercase">Transit Schedule</p>
                <p className="text-h4 mt-1 font-heading text-foreground">
                  {region.transitEstimate}
                </p>
                <p className="text-meta text-muted-foreground mt-1">From carrier collection</p>
              </div>

              <div className="border border-border/80 bg-background/50 p-4">
                <p className="text-label text-gold font-semibold uppercase">Standard Rate</p>
                <p className="text-h4 mt-1 font-heading text-foreground">{region.standardCost}</p>
                <p className="text-meta text-muted-foreground mt-1">Full end-to-end tracking</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-body-sm text-muted-foreground border-t border-border pt-6">
              <p>
                <strong className="text-foreground font-medium">Couriers:</strong> {region.couriers}
              </p>
              <p>
                <strong className="text-foreground font-medium">Customs & VAT:</strong>{" "}
                {region.dutiesInfo}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-meta text-muted-foreground">
              <span>
                * Regional delivery estimates are indicative based on standard operating conditions.
              </span>
              <Link to="/faq" className="text-label text-gold hover:underline">
                Shipping FAQ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INFORMATION BLOCKS (Production, Delays, Tracking) */}
      <section className="section container-page border-b border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Essential Details
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              Shipping Guidelines & Policies.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-border bg-surface p-6">
              <Clock className="size-5 text-gold mb-3" />
              <h3 className="text-h3 font-heading text-foreground">Why On-Demand Takes 2–4 Days</h3>
              <p className="text-body-sm text-muted-foreground mt-2 leading-relaxed">
                Unlike fast-fashion warehouses with millions of pre-printed boxes sitting on dusty
                shelves, each Atelier Noir piece is created for a specific person. Our machines load
                virgin organic blanks, apply eco-certified pigments, and heat-cure the graphic so it
                never peels.
              </p>
            </div>

            <div className="border border-border bg-surface p-6">
              <Globe className="size-5 text-gold mb-3" />
              <h3 className="text-h3 font-heading text-foreground">
                International Customs & Taxes
              </h3>
              <p className="text-body-sm text-muted-foreground mt-2 leading-relaxed">
                EU and UK orders have applicable VAT collected at checkout so there are no surprise
                brokerage fees upon receipt. For deliveries to Switzerland, Norway, the Middle East,
                and non-EU zones, local import tariffs may be assessed by customs authorities.
              </p>
            </div>

            <div className="border border-border bg-surface p-6">
              <Truck className="size-5 text-gold mb-3" />
              <h3 className="text-h3 font-heading text-foreground">Discreet Tracked Packaging</h3>
              <p className="text-body-sm text-muted-foreground mt-2 leading-relaxed">
                Every shipment is assigned a distinct tracking number upon courier scan. All orders
                are shipped in durable, reinforced recycled kraft boxes without bulky branding to
                prevent package tampering during transit.
              </p>
            </div>

            <div className="border border-border bg-surface p-6">
              <AlertCircle className="size-5 text-gold mb-3" />
              <h3 className="text-h3 font-heading text-foreground">Potential Peak Season Delays</h3>
              <p className="text-body-sm text-muted-foreground mt-2 leading-relaxed">
                During high-volume seasonal releases (November through December) and severe winter
                weather events, production queues may require 1–2 extra working days. We notify
                customers promptly via email if unexpected delays arise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL ORDER TRACKING SECTION */}
      <section className="section container-page border-b border-border bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Live Visibility
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              Track Your Order.
            </h2>
            <p className="text-body mt-2 text-muted-foreground">
              Enter your order reference number and purchase email to inspect production progress
              and courier transit.
            </p>
          </div>

          <div className="mt-8 border border-border bg-surface p-6 sm:p-8">
            <form onSubmit={handleSimulateTrack} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ship-order" className="text-label text-muted-foreground">
                    Order Number *
                  </label>
                  <input
                    id="ship-order"
                    type="text"
                    required
                    placeholder="e.g. AN-2026-00184"
                    value={trackOrderNum}
                    onChange={(e) => setTrackOrderNum(e.target.value)}
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="ship-email" className="text-label text-muted-foreground">
                    Email Address *
                  </label>
                  <input
                    id="ship-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={trackEmail}
                    onChange={(e) => setTrackEmail(e.target.value)}
                    className="mt-2 h-12 w-full border border-border bg-background px-4 text-body-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-meta text-muted-foreground">
                  Need the full tracking interface?{" "}
                  <Link to="/track-order" className="text-gold underline">
                    Open Track Order Hub
                  </Link>
                </span>
                <Button type="submit" variant="gold" size="sm" className="w-full sm:w-auto px-6">
                  Track Order
                </Button>
              </div>
            </form>

            {/* Example Tracking Status Display */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-label text-muted-foreground uppercase tracking-wider text-xs mb-4">
                Example Live Tracking Stage
              </p>

              <div className="border border-border bg-surface-2/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-meta">
                  <span>
                    Status: <strong className="text-gold">In Transit (Out for Delivery)</strong>
                  </span>
                  <span>Carrier: DHL Express #NL-883921-AN</span>
                </div>

                {/* 5-step horizontal tracker */}
                <div className="mt-5 grid grid-cols-5 gap-1 text-center">
                  <div className="flex flex-col items-center">
                    <div className="size-6 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-[11px] font-medium text-foreground mt-1">Confirmed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="size-6 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-[11px] font-medium text-foreground mt-1">Production</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="size-6 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-[11px] font-medium text-foreground mt-1">Shipped</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="size-6 rounded-full border-2 border-gold bg-surface text-gold flex items-center justify-center text-[10px] font-bold ring-2 ring-gold/20">
                      4
                    </div>
                    <span className="text-[11px] font-semibold text-gold mt-1">In Transit</span>
                  </div>
                  <div className="flex flex-col items-center opacity-40">
                    <div className="size-6 rounded-full border border-border bg-surface text-muted-foreground flex items-center justify-center text-[10px]">
                      5
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-1">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST CENTER SECTION */}
      <TrustCenter showCta={true} />
    </div>
  );
}
