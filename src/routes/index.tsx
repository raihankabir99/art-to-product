import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { DesignCard, ProductCard, CollectionCard } from "@/components/store/cards";
import { Mockup } from "@/components/store/Mockup";
import { SectionHeading } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import { COLLECTIONS, DESIGNS, PRODUCT_TYPES, designBySlug, productType } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Noir — One Design, Many Objects" },
      {
        name: "description",
        content:
          "A design-led studio for apparel and objects. Choose the drawing, then choose the object. Made to order and shipped worldwide.",
      },
      { property: "og:title", content: "Atelier Noir — One Design, Many Objects" },
      {
        property: "og:description",
        content: "Choose the drawing, then choose the object. Made to order, shipped worldwide.",
      },
    ],
  }),
  component: Home,
});

const MARQUEE = [
  "Made to order",
  "Shipped from the EU, UK and US",
  "Organic cotton",
  "No overproduction",
  "Carbon-neutral delivery",
  "Free returns within 30 days",
];

function Home() {
  const { region } = useStore();
  const hero = DESIGNS[0]!;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-16 flex min-h-[92svh] items-end overflow-hidden lg:-mt-20">
        <img
          src={heroImg}
          alt="Model wearing a heavyweight black tee from the Nocturne collection"
          width={1600}
          height={1200}
          className="absolute inset-0 -z-10 size-full object-cover object-center"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.92),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.6))]"
          aria-hidden="true"
        />
        <div className="container-page pb-14 pt-32 md:pb-20">
          <p className="text-label reveal-up text-gold">Nocturne · Spring 2026</p>
          <h1 className="text-display reveal-up mt-6 max-w-[15ch]">One design, many objects</h1>
          <p className="text-body-lg reveal-up mt-8 max-w-lg text-foreground/70">
            Start with the drawing. Choose the tee, the hoodie, the poster or the mug. Everything is
            printed after you order it — nothing is made in advance.
          </p>
          <div className="reveal-up mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/designs">
                Explore designs <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/shop">Shop all products</Link>
            </Button>
          </div>
          <p className="text-meta mt-8">
            Delivery to {region.country} in {region.delivery} · {region.taxNote}
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border py-4">
        <div className="marquee-track flex w-max gap-12">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="text-label text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ONE DESIGN → MANY PRODUCTS */}
      <section className="section container-page">
        <SectionHeading
          eyebrow="How it works"
          title="Midnight Lion, thirteen ways"
          action={
            <Button asChild variant="tertiary" size="inline">
              <Link to="/designs/$slug" params={{ slug: hero.slug }}>
                Explore this design →
              </Link>
            </Button>
          }
        />
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {hero.products.slice(0, 8).map((p) => (
            <Link
              key={p}
              to="/designs/$slug"
              params={{ slug: hero.slug }}
              search={{ product: p }}
              className="group bg-background p-4 transition-colors hover:bg-surface"
            >
              <Mockup design={hero} productId={p} />
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <span className="text-h4">{productType(p).name}</span>
                <span className="text-meta">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DESIGNS */}
      <section className="section border-t border-border">
        <div className="container-page">
          <SectionHeading
            eyebrow="The archive"
            title="Designs, not products"
            action={
              <Button asChild variant="secondary" size="sm">
                <Link to="/designs">All designs</Link>
              </Button>
            }
          />
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGNS.slice(0, 3).map((d) => (
              <DesignCard key={d.slug} design={d} />
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="editorial section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="border border-border">
            <Mockup design={DESIGNS[3]!} productId="poster" />
          </div>
          <div>
            <p className="text-label text-gold">Studio note</p>
            <h2 className="text-h1 mt-5 max-w-xl">
              Nothing exists until you ask for it
            </h2>
            <p className="text-body-lg mt-6 max-w-lg">
              We hold no stock and run no factory. Each piece is produced by a vetted print partner
              close to you — in the Netherlands, the UK, the United States or the Gulf — then sent
              directly to your door.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {[
                ["13", "Product types"],
                ["6", "Print partners"],
                ["0", "Units warehoused"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-h2">{n}</p>
                  <p className="text-meta mt-2">{l}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="secondary" className="mt-10">
              <Link to="/about">Read our approach</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section container-page">
        <SectionHeading
          eyebrow="Best sellers"
          title="Most ordered this season"
          action={
            <Button asChild variant="secondary" size="sm">
              <Link to="/best-sellers">See all</Link>
            </Button>
          }
        />
        <div className="grid gap-x-6 gap-y-12 grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["midnight-lion", "tshirt"],
              ["olive-line", "tote"],
              ["solstice", "hoodie"],
              ["paper-crane", "poster"],
            ] as const
          ).map(([slug, type]) => (
            <ProductCard key={slug + type} design={designBySlug(slug)!} productId={type} />
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="section border-t border-border">
        <div className="container-page">
          <SectionHeading eyebrow="Collections" title="Curated by mood, not category" />
          <div className="grid gap-6 md:grid-cols-2">
            {COLLECTIONS.slice(0, 4).map((c) => (
              <CollectionCard
                key={c.slug}
                slug={c.slug}
                name={c.name}
                tagline={c.tagline}
                count={c.designs.length}
                design={designBySlug(c.designs[0]!)!}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT TYPE INDEX */}
      <section className="section-tight border-t border-border">
        <div className="container-page">
          <h2 className="text-label text-muted-foreground">Shop by product</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {PRODUCT_TYPES.map((p) => (
              <Link
                key={p.id}
                to="/shop"
                search={{ type: p.id }}
                className="text-label flex min-h-11 items-center border border-border px-5 transition-colors hover:border-foreground"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
