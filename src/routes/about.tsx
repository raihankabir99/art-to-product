import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Printer,
  PackageCheck,
  Truck,
  CheckCircle2,
  Compass,
  Palette,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { DESIGNS } from "@/lib/catalog";
import { TrustCenter } from "@/components/store/TrustCenter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Studio & Story | Atelier Noir" },
      {
        name: "description",
        content:
          "Thoughtful designs, made on demand and created for everyday expression. Explore our design philosophy, on-demand production model, and responsible craftsmanship.",
      },
      { property: "og:title", content: "About Our Studio & Story | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Thoughtful designs, made on demand and created for everyday expression. Discover the philosophy behind Atelier Noir.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    num: "01",
    title: "SIMPLICITY",
    desc: "Stripping away visual noise to focus on deliberate line weight, balanced negative space, and timeless geometric forms that outlive fast-trend cycles.",
  },
  {
    num: "02",
    title: "IDENTITY",
    desc: "Objects that reflect the wearer's personal worldview and quiet aesthetic discernment without relying on loud logos or commercial hype.",
  },
  {
    num: "03",
    title: "QUALITY",
    desc: "Heavyweight 240gsm combed organic cotton, double-stitched seams, and archival pigment inks engineered to preserve clarity and hand-feel over years of wear.",
  },
  {
    num: "04",
    title: "EXPRESSION",
    desc: "Transforming everyday staples into wearable gallery surfaces, allowing a single original artwork to live across garments, prints, and lifestyle objects.",
  },
];

const ON_DEMAND_STEPS = [
  {
    step: "01",
    icon: Sparkles,
    title: "Customer Places Order",
    desc: "You select an original design and choose your preferred canvas — from heavyweight tees to ceramic mugs.",
  },
  {
    step: "02",
    icon: Layers,
    title: "Product is Prepared",
    desc: "The blank garment or medium is retrieved and precision-aligned at the regional studio closest to your address.",
  },
  {
    step: "03",
    icon: Printer,
    title: "Design is Printed",
    desc: "Archival pigment inks are applied and heat-cured to bond with the natural fibres for deep, fade-resistant contrast.",
  },
  {
    step: "04",
    icon: PackageCheck,
    title: "Product is Packed",
    desc: "Each item passes an individual quality check before being packed in recyclable, plastic-free kraft packaging.",
  },
  {
    step: "05",
    icon: Truck,
    title: "Product is Shipped",
    desc: "Dispatched with tracked regional couriers directly to your door, arriving within 3 to 7 business days.",
  },
];

const BELIEFS = [
  {
    title: "Art Belonging to Everyday Life",
    text: "Graphic art should not be confined to museum walls or gallery rooms. When translated onto daily essentials, it becomes an active part of how we experience our cities and spaces.",
  },
  {
    title: "The Inversion of Fast Fashion",
    text: "Traditional apparel brands manufacture millions of pieces in advance and discount unsold excess to landfill. We make only what is requested, treating every garment as an individual creation.",
  },
  {
    title: "Material Dignity & Durability",
    text: "A tee should not lose its shape after three washes. We choose heavy 240gsm jersey, reinforced collar ribbing, and pre-shrunk organic weaves that drape naturally.",
  },
];

function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border bg-surface/30 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page">
          <Breadcrumbs trail={[{ label: "About" }]} />

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="text-label text-gold font-semibold uppercase tracking-widest">
                Our Foundation
              </span>

              <h1 className="text-display mt-4 font-heading font-bold uppercase tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.05]">
                Designed to be yours.
              </h1>

              <p className="text-body-lg mt-6 max-w-2xl text-muted-foreground leading-relaxed">
                Thoughtful designs, made on demand and created for everyday expression. We build
                around the drawing, proofing each original artwork for thirteen considered surfaces.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild variant="gold" size="lg" className="group">
                  <Link to="/designs">
                    Explore Designs
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/shop">Browse All Objects</Link>
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-border pt-8 text-meta text-muted-foreground">
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground">13</p>
                  <p className="text-xs uppercase tracking-wider mt-0.5">Curated Surfaces</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground">2–4 Days</p>
                  <p className="text-xs uppercase tracking-wider mt-0.5">Made on Demand</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground">EU / UK / US</p>
                  <p className="text-xs uppercase tracking-wider mt-0.5">Regional Routing</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden border border-border bg-surface shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                  alt="Atelier Noir Studio Drawing and Garment Prototype"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-label text-gold uppercase tracking-wider font-semibold">
                    Studio Archive No. 04
                  </p>
                  <p className="text-body-sm font-medium text-white mt-1">
                    Proofing minimal continuous line art on 240gsm organic cotton jersey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND STORY (Editorial Storytelling with Alternating Layout) */}
      <section className="section container-page border-b border-border">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="border border-border bg-surface p-4 sm:p-6">
              <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-background">
                <Mockup design={DESIGNS[1]!} productId="hoodie" />
              </div>
              <div className="mt-4 flex items-center justify-between text-meta text-muted-foreground">
                <span>Featured: Midnight Lion on Archival Hoodie</span>
                <span className="text-gold font-mono">400 GSM Organic Fleece</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Our Story
            </span>
            <h2 className="text-h1 font-heading tracking-tight text-foreground">
              We believe products can be more than objects.
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              They can express personality, creativity, and identity. In a world saturated with mass
              production and generic seasonal cycles, Atelier Noir was created to celebrate the
              deliberate power of graphic drawing.
            </p>
            <p className="text-body text-muted-foreground leading-relaxed">
              Our collections bring together contemporary visual design and everyday functional
              objects through an on-demand approach. We inverted the traditional retail workflow:
              instead of starting with a warehouse full of pre-made clothing looking for a buyer, we
              begin with the artwork.
            </p>
            <div className="border-l-2 border-gold pl-4 italic text-body text-foreground/90 my-6">
              "Choose the drawing you connect with first. Then decide how it should live in your
              everyday routine — as a heavyweight tee, a relaxed hoodie, or an archival art print."
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN PHILOSOPHY */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="flex flex-col items-center text-center">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            Core Aesthetics
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            Design with Intention.
          </h2>
          <p className="text-body-lg mt-3 max-w-2xl text-muted-foreground">
            Four guiding principles dictate every sketch, line weight, and color palette released
            from our studio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.num}
              className="flex flex-col justify-between border border-border bg-surface p-8 transition-all hover:border-gold/60 hover:shadow-lg"
            >
              <div>
                <span className="font-mono text-3xl font-bold text-gold/40">{p.num}</span>
                <h3 className="text-h3 mt-4 font-heading tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="text-body mt-4 leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-border/60">
                <span className="text-meta text-gold font-medium uppercase tracking-wider">
                  Studio Principle {p.num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHAT WE BELIEVE */}
      <section className="section container-page border-b border-border">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Our Manifesto
            </span>
            <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
              What We Believe.
            </h2>
            <p className="text-body-lg mt-4 text-muted-foreground leading-relaxed">
              We stand for thoughtful consumption, durable material weights, and creative autonomy.
            </p>
            <div className="mt-8 border border-border bg-surface p-6">
              <p className="text-label text-gold font-semibold uppercase">
                The Zero-Deadstock Rule
              </p>
              <p className="text-body-sm text-muted-foreground mt-2">
                We hold 0 metres of unprinted inventory and generate zero seasonal warehouse burn.
                Every piece exists because somebody chose it.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {BELIEFS.map((b, idx) => (
              <div
                key={b.title}
                className="border border-border bg-surface p-6 sm:p-8 transition-colors hover:border-gold/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-xs font-bold text-gold">
                    0{idx + 1}
                  </span>
                  <h3 className="text-h3 font-heading text-foreground">{b.title}</h3>
                </div>
                <p className="text-body mt-3 text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MADE ON DEMAND (Visual Timeline & Transparent Model) */}
      <section className="section container-page border-b border-border bg-surface/30">
        <div className="flex flex-col items-center text-center">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            Fulfillment Architecture
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            Made When You Order.
          </h2>
          <p className="text-body-lg mt-3 max-w-2xl text-muted-foreground">
            A transparent look at how each custom piece is proofed, printed, and routed through our
            vetted regional fulfillment partners.
          </p>
        </div>

        {/* Step-by-step Flow */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ON_DEMAND_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative flex flex-col justify-between border border-border bg-surface p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
                      Step {s.step}
                    </span>
                    <div className="flex size-9 items-center justify-center border border-border bg-surface-2 text-gold">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="text-h4 mt-5 font-heading text-foreground">{s.title}</h3>
                  <p className="text-body-sm mt-2 text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {idx < ON_DEMAND_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-border">
                    <ArrowRight className="size-5 text-gold/50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Transparency Box */}
        <div className="mt-10 border border-gold/30 bg-gold/5 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-label text-gold font-bold uppercase tracking-wider">
                Transparent Regional Fulfillment
              </p>
              <p className="text-body-sm text-foreground/90 max-w-3xl">
                We work directly with certified digital print houses in the Netherlands, United
                Kingdom, and United States. When you place an order, our system automatically routes
                the file to the production floor closest to your destination.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link to="/shipping">View Shipping Routes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT PHILOSOPHY (Surfaces & Standards) */}
      <section className="section container-page border-b border-border">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-label text-gold uppercase tracking-widest font-semibold">
              Surface Standards
            </span>
            <h2 className="text-h1 font-heading tracking-tight text-foreground">
              Heavyweight Fabrics. Archival Inks.
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Every garment blank is chosen for tactile weight and longevity. We test dozens of
              blends to find the precise balance of breathability, collar resilience, and ink
              absorption.
            </p>

            <div className="space-y-4 pt-2">
              <div className="border border-border bg-surface p-4">
                <p className="text-label font-semibold text-foreground">
                  240 GSM Organic Cotton Jersey (T-Shirts)
                </p>
                <p className="text-body-sm text-muted-foreground mt-1">
                  Substantial hand-feel with a relaxed boxy drape that holds its structure wash
                  after wash.
                </p>
              </div>

              <div className="border border-border bg-surface p-4">
                <p className="text-label font-semibold text-foreground">
                  400 GSM Heavyweight French Terry (Hoodies)
                </p>
                <p className="text-body-sm text-muted-foreground mt-1">
                  Double-layered hood construction with thick rib cuffs and zero synthetic fleece
                  pilling.
                </p>
              </div>

              <div className="border border-border bg-surface p-4">
                <p className="text-label font-semibold text-foreground">
                  310 GSM Museum-Grade Fine Art Paper (Prints)
                </p>
                <p className="text-body-sm text-muted-foreground mt-1">
                  Acid-free 100% cotton rag with pigmented inks guaranteed against UV fade for 75+
                  years.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden border border-border bg-surface shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                alt="High density textile fabric texture"
                className="aspect-[4/3] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESPONSIBLE PRODUCTION (Honest, Verified Language) */}
      <section className="section container-page border-b border-border bg-surface/20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            Conscious Practice
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            Responsible Production.
          </h2>
          <p className="text-body-lg mt-4 text-muted-foreground leading-relaxed">
            We avoid making exaggerated or unverified claims. Instead, we adhere to straightforward
            operational facts:
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-border bg-surface p-6 sm:p-8">
            <h3 className="text-h3 font-heading text-foreground">Reduced Inventory Waste</h3>
            <p className="text-body mt-3 text-muted-foreground leading-relaxed">
              On-demand production can help reduce unnecessary inventory by producing products after
              an order is placed, eliminating bulk overstock write-offs and end-of-season clearance
              landfill.
            </p>
          </div>

          <div className="border border-border bg-surface p-6 sm:p-8">
            <h3 className="text-h3 font-heading text-foreground">Localised Transit Routing</h3>
            <p className="text-body mt-3 text-muted-foreground leading-relaxed">
              By dispatching orders from European, British, and North American fulfillment hubs
              situated closer to the recipient, transit distances and unnecessary air freight legs
              are diminished.
            </p>
          </div>

          <div className="border border-border bg-surface p-6 sm:p-8">
            <h3 className="text-h3 font-heading text-foreground">Oeko-Tex Certified Pigments</h3>
            <p className="text-body mt-3 text-muted-foreground leading-relaxed">
              All direct-to-garment print processes employ water-based inks free from heavy metals,
              formaldehyde, and alkylphenol ethoxylates (APEOs).
            </p>
          </div>

          <div className="border border-border bg-surface p-6 sm:p-8">
            <h3 className="text-h3 font-heading text-foreground">Plastic-Free Kraft Packaging</h3>
            <p className="text-body mt-3 text-muted-foreground leading-relaxed">
              Orders are packaged in recyclable FSC-certified cardboard mailers and paper tape,
              reducing non-biodegradable single-use plastic wraps.
            </p>
          </div>
        </div>
      </section>

      {/* 8. VISUAL STORYTELLING GALLERY */}
      <section className="section container-page border-b border-border">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            The Studio in Context
          </span>
          <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
            From Drawing to Daily Wear.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden border border-border bg-surface group">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
              alt="Editorial fashion photography in minimal setting"
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4 border-t border-border bg-background">
              <p className="text-label font-semibold text-foreground">Architectural Silhouettes</p>
              <p className="text-meta text-muted-foreground mt-0.5">
                Berlin & Copenhagen street style
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-border bg-surface group">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
              alt="Graphic tee worn in urban context"
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4 border-t border-border bg-background">
              <p className="text-label font-semibold text-foreground">Graphic Precision</p>
              <p className="text-meta text-muted-foreground mt-0.5">
                High-contrast monochrome print
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-border bg-surface group sm:col-span-2 lg:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
              alt="Art print and apparel objects on studio table"
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4 border-t border-border bg-background">
              <p className="text-label font-semibold text-foreground">One Design, Many Objects</p>
              <p className="text-meta text-muted-foreground mt-0.5">Living with the artwork</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TRUST CENTER */}
      <TrustCenter showCta={false} />

      {/* 10. STUDIO CTA */}
      <section className="border-t border-border bg-surface/50 py-16 md:py-24">
        <div className="container-page text-center">
          <span className="text-label text-gold uppercase tracking-widest font-semibold">
            Begin Your Collection
          </span>
          <h2 className="text-display mt-4 font-heading font-bold text-foreground">
            Explore the Studio Archive.
          </h2>
          <p className="text-body-lg mt-4 max-w-xl mx-auto text-muted-foreground">
            Discover original drawings crafted with intention and made to order for your life.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="gold" size="lg" className="group">
              <Link to="/designs">
                Explore Designs
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">Browse Shop</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
