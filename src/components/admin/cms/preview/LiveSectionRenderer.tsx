import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, Heart, Instagram, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { SectionHeading } from "@/components/store/page";
import {
  ARTICLES,
  COLLECTIONS,
  DESIGNS,
  PRODUCT_TYPES,
  designBySlug,
  productType,
} from "@/lib/catalog";
import type { HomepageSection, DeviceMode } from "../homepage-types";
import heroImg from "@/assets/hero.jpg";

interface LiveSectionRendererProps {
  section: HomepageSection;
  isPreview?: boolean;
  device?: DeviceMode;
}

export function LiveSectionRenderer({
  section,
  isPreview = false,
  device = "desktop",
}: LiveSectionRendererProps) {
  if (!section.visible) return null;

  // Background map
  const bgClasses: Record<string, string> = {
    default: "bg-background",
    surface: "bg-surface",
    "surface-2": "bg-surface-2",
    black: "bg-black",
    editorial: "bg-[#0c0c0e]",
    "subtle-gold": "bg-gold/5",
  };

  // Padding map
  const padTopClasses: Record<string, string> = {
    none: "pt-0",
    sm: "pt-6 md:pt-8",
    md: "pt-10 md:pt-12",
    lg: "pt-16 md:pt-20",
    xl: "pt-20 md:pt-28",
  };

  const padBottomClasses: Record<string, string> = {
    none: "pb-0",
    sm: "pb-6 md:pb-8",
    md: "pb-10 md:pb-12",
    lg: "pb-16 md:pb-20",
    xl: "pb-20 md:pb-28",
  };

  const containerWidthClass =
    section.containerWidth === "narrow"
      ? "max-w-4xl mx-auto px-4 sm:px-6"
      : section.containerWidth === "wide"
        ? "max-w-7xl mx-auto px-4 sm:px-6"
        : section.containerWidth === "full"
          ? "w-full"
          : "container-page";

  const wrapperClasses = `${bgClasses[section.background] || "bg-background"} ${
    padTopClasses[section.paddingTop] || "pt-12"
  } ${padBottomClasses[section.paddingBottom] || "pb-12"} ${
    section.borderTop ? "border-t border-border" : ""
  } ${section.borderBottom ? "border-b border-border" : ""}`;

  switch (section.type) {
    case "announcement": {
      return (
        <div className="w-full">
          {section.text && (
            <div className="bg-surface-2 border-b border-border py-2.5 px-4 text-center">
              <p className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                {section.text}{" "}
                {section.linkText && (
                  <span className="text-gold underline ml-2 cursor-pointer">
                    {section.linkText} →
                  </span>
                )}
              </p>
            </div>
          )}
          {section.showMarquee && (
            <div className="overflow-hidden border-b border-border py-3 bg-black">
              <div className="flex gap-8 whitespace-nowrap overflow-x-hidden animate-marquee">
                {[...section.items, ...section.items].map((m, i) => (
                  <span
                    key={i}
                    className="text-label text-muted-foreground flex items-center gap-6"
                  >
                    <span>{m}</span>
                    <span className="text-gold/50">✦</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    case "header": {
      return (
        <header className="border-b border-border bg-background/95 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-display text-base tracking-[0.2em] font-semibold text-foreground">
              ATELIER NOIR
            </span>
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-muted-foreground uppercase">
              <span>Designs</span>
              <span>Shop</span>
              <span>Collections</span>
              <span>Journal</span>
              <span>About</span>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            {section.showCurrencySelector && <span>EUR (€)</span>}
            <span>Account</span>
            <span>Bag (0)</span>
          </div>
        </header>
      );
    }

    case "hero": {
      const alignClass =
        section.textAlignment === "center"
          ? "text-center mx-auto items-center"
          : section.textAlignment === "right"
            ? "text-right ml-auto items-end"
            : "text-left items-start";

      const widthClass =
        section.contentWidth === "sm"
          ? "max-w-md"
          : section.contentWidth === "lg"
            ? "max-w-3xl"
            : section.contentWidth === "full"
              ? "w-full"
              : "max-w-2xl";

      const heightClass =
        section.height === "screen"
          ? "min-h-screen"
          : section.height === "compact"
            ? "min-h-[55vh] md:min-h-[65vh]"
            : section.height === "cinematic"
              ? "min-h-[60vh] md:min-h-[75vh]"
              : "min-h-[70vh] md:min-h-[85vh]";

      // Handle split preset
      if (section.preset === "split" || section.imagePosition === "split-right") {
        return (
          <section
            className={`relative isolate grid lg:grid-cols-2 bg-background border-b border-border ${heightClass}`}
          >
            <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-20 order-2 lg:order-1">
              {section.eyebrow && (
                <p className="text-label text-gold uppercase tracking-wider">{section.eyebrow}</p>
              )}
              <h1 className="text-display mt-4 font-display text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
                {section.headline}
              </h1>
              {section.subheadline && (
                <p className="text-body-lg mt-6 text-muted-foreground leading-relaxed">
                  {section.subheadline}
                </p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {section.primaryCtaText && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    {section.primaryCtaText} <ArrowRight className="size-3.5" />
                  </button>
                )}
                {section.secondaryCtaText && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-surface-2 border border-border text-foreground text-xs font-mono uppercase tracking-wider hover:bg-surface transition-colors"
                  >
                    {section.secondaryCtaText}
                  </button>
                )}
              </div>
              {section.deliveryNote && (
                <p className="text-meta mt-6 text-muted-foreground">{section.deliveryNote}</p>
              )}
            </div>
            <div className="relative min-h-[300px] lg:min-h-full bg-black border-l border-border overflow-hidden order-1 lg:order-2">
              <img
                src={section.desktopImage || heroImg}
                alt={section.altText}
                className="size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: (section.overlayStrength || 0) / 100 }}
              />
            </div>
          </section>
        );
      }

      // Handle editorial preset
      if (section.preset === "editorial" || section.imagePosition === "split-left") {
        return (
          <section
            className={`relative isolate grid lg:grid-cols-12 bg-background border-b border-border ${heightClass}`}
          >
            <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-black border-r border-border overflow-hidden">
              <img
                src={section.desktopImage || heroImg}
                alt={section.altText}
                className="size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: (section.overlayStrength || 10) / 100 }}
              />
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-14 lg:p-20 bg-surface">
              {section.eyebrow && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 border border-gold/30 w-fit">
                  {section.eyebrow}
                </span>
              )}
              <h1 className="text-display mt-6 font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
                {section.headline}
              </h1>
              {section.subheadline && (
                <p className="text-body-lg mt-6 text-muted-foreground leading-relaxed max-w-xl">
                  {section.subheadline}
                </p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {section.primaryCtaText && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    {section.primaryCtaText} <ArrowRight className="size-3.5" />
                  </button>
                )}
                {section.secondaryCtaText && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-surface-2 border border-border text-foreground text-xs font-mono uppercase tracking-wider hover:bg-surface transition-colors"
                  >
                    {section.secondaryCtaText}
                  </button>
                )}
              </div>
              {section.deliveryNote && (
                <p className="text-meta mt-6 text-muted-foreground">{section.deliveryNote}</p>
              )}
            </div>
          </section>
        );
      }

      // Default background hero (Centered, Left, Right, Cinematic)
      return (
        <section className={`relative isolate flex ${heightClass} items-end overflow-hidden`}>
          <img
            src={section.desktopImage || heroImg}
            alt={section.altText}
            className="absolute inset-0 -z-10 size-full object-cover object-center"
          />
          <div
            className="absolute inset-0 -z-10 bg-black pointer-events-none"
            style={{ opacity: section.overlayStrength / 100 }}
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.95),rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.7))]" />

          <div className={`container-page pb-14 pt-28 md:pb-20 flex flex-col ${alignClass}`}>
            {section.eyebrow && (
              <p className="text-label text-gold uppercase tracking-wider">{section.eyebrow}</p>
            )}
            <h1
              className={`text-display mt-4 font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight ${widthClass}`}
            >
              {section.headline}
            </h1>
            {section.subheadline && (
              <p className={`text-body-lg mt-6 text-foreground/80 ${widthClass}`}>
                {section.subheadline}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {section.primaryCtaText && (
                <button
                  type="button"
                  className="px-6 py-3 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  {section.primaryCtaText} <ArrowRight className="size-3.5" />
                </button>
              )}
              {section.secondaryCtaText && (
                <button
                  type="button"
                  className="px-6 py-3 bg-surface-2 border border-border text-foreground text-xs font-mono uppercase tracking-wider hover:bg-surface transition-colors"
                >
                  {section.secondaryCtaText}
                </button>
              )}
            </div>
            {section.deliveryNote && (
              <p className="text-meta mt-6 text-muted-foreground">{section.deliveryNote}</p>
            )}
          </div>
        </section>
      );
    }

    case "one-design-multiple": {
      const master = DESIGNS.find((d) => d.slug === section.masterDesignSlug) || DESIGNS[0]!;
      const selectedProducts = section.selectedProductTypes || [
        "tshirt",
        "hoodie",
        "tote",
        "poster",
      ];

      const gridCols =
        section.gridColumns === 2
          ? "sm:grid-cols-2"
          : section.gridColumns === 3
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : section.gridColumns === 5
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              : "sm:grid-cols-2 lg:grid-cols-4";

      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "How it works"}
              title={section.title || `${master.title}, thirteen ways`}
              action={
                <button type="button" className="text-xs font-mono text-gold hover:underline">
                  {section.ctaText || "Explore this design"} →
                </button>
              }
            />
            <div className={`grid gap-px border border-border bg-border mt-8 ${gridCols}`}>
              {selectedProducts.map((p) => {
                const pt = productType(p);
                return (
                  <div
                    key={p}
                    className="group bg-background p-4 transition-colors hover:bg-surface flex flex-col justify-between"
                  >
                    <Mockup design={master} productId={p} />
                    <div className="mt-4 flex items-baseline justify-between gap-3 pt-2 border-t border-border/50">
                      <div>
                        <span className="text-sm font-medium text-foreground block">{pt.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {pt.tagline}
                        </span>
                      </div>
                      <span className="text-meta text-gold">From €{pt.basePriceEur}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case "featured-designs": {
      const chosen = DESIGNS.filter((d) => section.selectedDesignSlugs?.includes(d.slug)).slice(
        0,
        section.itemCount || 6,
      );

      const colClass =
        section.columns === 2
          ? "sm:grid-cols-2"
          : section.columns === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3";

      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "Featured designs"}
              title={section.title || "Designs made to live beyond the screen"}
              action={
                <button
                  type="button"
                  className="text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                  {section.ctaText || "All designs"} →
                </button>
              }
            />
            <div className={`grid gap-x-6 gap-y-10 mt-8 ${colClass}`}>
              {(chosen.length ? chosen : DESIGNS.slice(0, 6)).map((d) => (
                <div
                  key={d.slug}
                  className="group border border-border bg-surface p-4 flex flex-col"
                >
                  <div className="aspect-square bg-black border border-border overflow-hidden p-6 flex items-center justify-center">
                    <img
                      src={d.artAsset}
                      alt={d.title}
                      className="size-full object-contain filter invert opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-display font-medium text-foreground">{d.title}</p>
                      <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                        {d.technique} · {d.year}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-gold/10 text-gold px-1.5 py-0.5 border border-gold/30">
                      {d.products.length} Products
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "new-designs": {
      const items = DESIGNS.slice(0, section.itemCount || 4);
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "New drops"}
              title={section.title || "Fresh designs, made when you order"}
              action={
                <button
                  type="button"
                  className="text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                  {section.ctaText || "See new drops"} →
                </button>
              }
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 mt-8">
              {items.map((d, i) => (
                <div
                  key={d.slug}
                  className="group border border-border bg-surface p-3 sm:p-4 relative"
                >
                  {section.showBadges && (
                    <span className="absolute top-2 left-2 z-10 text-[9px] font-mono bg-gold text-background px-1.5 py-0.5 font-bold uppercase tracking-wider">
                      NEW DROP
                    </span>
                  )}
                  <div className="aspect-square bg-black border border-border p-4 flex items-center justify-center">
                    <img
                      src={d.artAsset}
                      alt={d.title}
                      className="size-full object-contain filter invert opacity-90 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                      {d.title}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      13 Formats Available
                    </p>
                    <p className="text-xs font-mono text-gold mt-2">From €32</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "editorial": {
      return (
        <section className={wrapperClasses}>
          <div className={`${containerWidthClass} grid items-center gap-12 lg:grid-cols-2`}>
            <div
              className={`border border-border bg-black ${section.layout === "text-left" ? "order-2" : "order-1"}`}
            >
              <div className="aspect-[4/3] overflow-hidden p-6 flex items-center justify-center">
                <Mockup design={DESIGNS[3]!} productId="poster" />
              </div>
            </div>
            <div className={section.layout === "text-left" ? "order-1" : "order-2"}>
              <p className="text-label text-gold">{section.eyebrow || "Studio note"}</p>
              <h2 className="text-2xl sm:text-4xl font-display font-medium mt-4 text-foreground leading-tight">
                {section.heading || "Nothing exists until you ask for it"}
              </h2>
              <p className="text-body-lg mt-6 text-muted-foreground leading-relaxed">
                {section.description}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
                {section.metrics.map((m, i) => (
                  <div key={i}>
                    <p className="text-2xl sm:text-3xl font-display font-medium text-foreground">
                      {m.value}
                    </p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-1 uppercase">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-8 px-6 py-2.5 bg-surface-2 border border-border text-xs font-mono uppercase tracking-wider text-foreground hover:border-gold transition-colors"
              >
                {section.ctaText || "Read our approach"} →
              </button>
            </div>
          </div>
        </section>
      );
    }

    case "best-sellers": {
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "Best sellers"}
              title={section.title || "Most ordered this season"}
              action={
                <button
                  type="button"
                  className="text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                  {section.ctaText || "See all best sellers"} →
                </button>
              }
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 mt-8">
              {[
                { design: DESIGNS[0]!, product: "tshirt", price: 48 },
                { design: DESIGNS[5]!, product: "tote", price: 34 },
                { design: DESIGNS[4]!, product: "hoodie", price: 95 },
                { design: DESIGNS[3]!, product: "poster", price: 42 },
              ].map(({ design, product, price }) => (
                <div
                  key={design.slug + product}
                  className="border border-border bg-surface p-4 group"
                >
                  <Mockup design={design} productId={product} />
                  <div className="mt-3">
                    <p className="text-xs font-medium text-foreground">{design.title}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {productType(product).name}
                    </p>
                    <p className="text-xs font-mono text-gold mt-2">€{price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "featured-collection": {
      const coll = COLLECTIONS.find((c) => c.slug === section.collectionSlug) || COLLECTIONS[0]!;
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "Curated Collection"}
              title={section.title || coll.name}
            />
            <div className="grid gap-6 md:grid-cols-2 mt-8">
              {COLLECTIONS.slice(0, 2).map((c) => (
                <div
                  key={c.slug}
                  className="border border-border bg-surface p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gold">Capsule</span>
                    <h3 className="text-xl font-display font-medium text-foreground mt-2">
                      {c.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">{c.tagline}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs font-mono text-muted-foreground">
                      {c.designs.length} Artwork Studies
                    </span>
                    <span className="text-xs font-mono text-gold">Explore Series →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "shop-by-product": {
      const visibleCats = section.categories.filter((c) => c.visible);
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <p className="text-label text-muted-foreground">{section.title || "Shop by product"}</p>
            {section.layout === "pills" ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {visibleCats.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-label flex min-h-10 items-center border border-border px-4 transition-colors hover:border-gold cursor-pointer bg-surface"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
                {visibleCats.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 border border-border bg-surface hover:border-gold transition-colors"
                  >
                    <p className="text-xs font-medium text-foreground">{cat.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }

    case "promotional-banner": {
      return (
        <section className={wrapperClasses}>
          <div
            className={`${containerWidthClass} p-8 sm:p-12 border border-gold/40 bg-gradient-to-br from-black via-zinc-950 to-black text-center relative overflow-hidden`}
          >
            {section.badge && (
              <span className="inline-block px-3 py-1 bg-gold/10 text-gold border border-gold/30 text-[10px] font-mono uppercase tracking-widest font-semibold mb-4">
                {section.badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground max-w-2xl mx-auto">
              {section.headline}
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-4">
              {section.subheadline}
            </p>
            <button
              type="button"
              className="mt-8 px-6 py-3 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors"
            >
              {section.ctaText} →
            </button>
          </div>
        </section>
      );
    }

    case "reviews": {
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "Community"}
              title={section.title || "Loved by patrons worldwide"}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              {section.reviews.slice(0, 4).map((r) => (
                <figure
                  key={r.id}
                  className="border border-border bg-surface p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-gold text-xs">★★★★★</div>
                    <blockquote className="text-xs text-zinc-300 mt-4 leading-relaxed">
                      “{r.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="text-[11px] font-mono text-muted-foreground mt-6 pt-3 border-t border-border">
                    {r.author} · {r.location}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "brand-story": {
      return (
        <section className={wrapperClasses}>
          <div
            className={`${containerWidthClass} p-8 sm:p-12 border border-border bg-surface grid lg:grid-cols-2 gap-8 items-center`}
          >
            <div>
              <p className="text-label text-gold">{section.eyebrow || "Our Heritage"}</p>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground mt-3">
                {section.heading}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4 leading-relaxed">
                {section.description}
              </p>
              <button
                type="button"
                className="mt-6 text-xs font-mono text-gold hover:underline block"
              >
                {section.ctaText} →
              </button>
            </div>
            <div className="aspect-[4/3] bg-black border border-border overflow-hidden">
              <img
                src={heroImg}
                alt="Studio heritage"
                className="size-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>
      );
    }

    case "blog": {
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "From the journal"}
              title={section.title || "Notes on design, architecture, and making"}
              action={
                <button
                  type="button"
                  className="text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                  {section.ctaText || "View all articles"} →
                </button>
              }
            />
            <div className="grid gap-6 md:grid-cols-3 mt-8">
              {ARTICLES.slice(0, section.postCount || 3).map((a) => (
                <div
                  key={a.slug}
                  className="border border-border bg-surface p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video bg-black border border-border overflow-hidden mb-4">
                      <img src={a.coverImage} alt={a.title} className="size-full object-cover" />
                    </div>
                    {section.showCategory && (
                      <span className="text-[10px] font-mono text-gold uppercase">
                        {a.category}
                      </span>
                    )}
                    <h4 className="text-sm font-display font-medium text-foreground mt-1">
                      {a.title}
                    </h4>
                    {section.showExcerpt && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {a.standfirst}
                      </p>
                    )}
                  </div>
                  {section.showDate && (
                    <p className="text-[10px] font-mono text-muted-foreground mt-4 pt-2 border-t border-border">
                      {a.date} · {a.readTime}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "newsletter": {
      return (
        <section className={wrapperClasses}>
          <div className={`${containerWidthClass} text-center`}>
            <p className="text-label text-gold">{section.eyebrow || "Dispatch"}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground mt-3">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              {section.description}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={section.inputPlaceholder || "your.email@atelier.com"}
                className="flex-1 bg-surface border border-border px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-gold"
                readOnly
              />
              <button
                type="button"
                className="px-6 py-2.5 bg-gold text-background text-xs font-mono uppercase font-semibold hover:bg-white transition-colors"
              >
                {section.ctaText || "Subscribe"}
              </button>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-4">
              {section.privacyMessage}
            </p>
          </div>
        </section>
      );
    }

    case "social-showcase": {
      const visibleItems = section.items.filter((i) => i.visible);
      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <SectionHeading
              eyebrow={section.eyebrow || "@ateliernoir.studio"}
              title={section.title || "Patron styling & living gallery"}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-border bg-surface group relative overflow-hidden"
                >
                  <div className="aspect-square bg-black overflow-hidden">
                    <img
                      src={heroImg}
                      alt={item.caption}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span className="text-gold">{item.handle}</span>
                      <span>{item.likes} ♡</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-1 line-clamp-2">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "video": {
      const aspectClass =
        section.videoAspect === "21:9"
          ? "aspect-[21/9]"
          : section.videoAspect === "4:3"
            ? "aspect-[4/3]"
            : section.videoAspect === "full-bleed"
              ? "min-h-[70vh]"
              : "aspect-video";

      return (
        <section className={wrapperClasses}>
          <div className={containerWidthClass}>
            <div
              className={`relative w-full ${aspectClass} bg-black border border-border overflow-hidden group flex items-center justify-center`}
            >
              <img
                src={
                  section.posterImage ||
                  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Video poster"
                className="absolute inset-0 size-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: (section.overlayOpacity ?? 45) / 100 }}
              />

              {/* Text & Play Trigger Overlay */}
              <div className="relative z-10 text-center max-w-xl px-6 py-8 flex flex-col items-center">
                {section.eyebrow && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold mb-3 bg-black/60 px-3 py-1 border border-gold/30">
                    {section.eyebrow}
                  </span>
                )}
                <h3 className="text-2xl sm:text-4xl font-display font-medium text-white leading-tight">
                  {section.heading}
                </h3>
                {section.subheading && (
                  <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed max-w-md">
                    {section.subheading}
                  </p>
                )}

                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="button"
                    className="size-14 rounded-full bg-gold text-background flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="size-6 ml-1" />
                  </button>
                  {section.ctaText && (
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-black/80 border border-border text-xs font-mono uppercase tracking-wider text-foreground hover:border-gold hover:text-gold transition-colors"
                    >
                      {section.ctaText} →
                    </button>
                  )}
                </div>
              </div>

              {/* Status Tags */}
              <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
                {section.autoplay && (
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 uppercase">
                    AUTOPLAY
                  </span>
                )}
                {section.mute && (
                  <span className="text-[9px] font-mono bg-black/80 text-zinc-400 border border-border px-2 py-0.5 uppercase">
                    MUTED
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "footer": {
      return (
        <footer className="border-t border-border bg-surface py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="font-display text-sm tracking-[0.2em] font-semibold text-foreground">
                ATELIER NOIR
              </span>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Design-led studio for apparel and objects. Made to order, shipped worldwide.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-foreground font-semibold">
                Silhouettes
              </p>
              <div className="text-xs text-muted-foreground space-y-1.5 mt-3">
                <p>Heavyweight T-Shirts</p>
                <p>Double-Lined Hoodies</p>
                <p>Canvas Totes</p>
                <p>Fine Art Posters</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-foreground font-semibold">Studio</p>
              <div className="text-xs text-muted-foreground space-y-1.5 mt-3">
                <p>Our Approach</p>
                <p>Journal & Notes</p>
                <p>Sustainability</p>
                <p>Fulfillment Nodes</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-foreground font-semibold">
                Legal & Guarantee
              </p>
              <div className="text-xs text-muted-foreground space-y-1.5 mt-3">
                <p>30-Day Returns</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Contact Concierge</p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-muted-foreground gap-4">
            <p>{section.copyrightText}</p>
            <p>EU / UK / US Routing Active</p>
          </div>
        </footer>
      );
    }

    default:
      return null;
  }
}
