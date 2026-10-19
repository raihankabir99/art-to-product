import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  ShoppingBag,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs, SectionHeading } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newsletter } from "@/components/store/Newsletter";
import { ProductCard } from "@/components/store/cards";
import { StandardArticleCard } from "@/components/store/BlogCards";
import {
  getArticleBySlug,
  getRelatedArticles,
  ALL_ARTICLES,
  type ArticleDetail,
} from "@/lib/blog-data";
import { designBySlug, DESIGNS, type ProductTypeId } from "@/lib/catalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Article unavailable | Atelier Noir" },
          { name: "robots", content: "noindex" },
        ],
      };
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} | Atelier Noir Journal` },
        { name: "description", content: a.subtitle || a.excerpt },
        { property: "og:title", content: `${a.title} | Atelier Noir` },
        { property: "og:description", content: a.subtitle || a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.heroImage },
      ],
    };
  },
  component: ArticleDetailView,
});

function ArticleDetailView() {
  const { article } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const relatedArticles = getRelatedArticles(article.slug, 3);

  // Resolve connected design and products
  const connectedDesign = article.relatedDesignSlug
    ? designBySlug(article.relatedDesignSlug)
    : DESIGNS[0]!;

  const productTypesToShow: ProductTypeId[] = (article.relatedProductTypes as ProductTypeId[]) ?? [
    "tshirt",
    "hoodie",
    "cap",
    "tote",
  ];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Story link copied to clipboard");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast.success("Article saved to reading list");
    } else {
      toast.info("Article removed from reading list");
    }
  };

  return (
    <>
      {/* 1. EDITORIAL ARTICLE HEADER & BREADCRUMBS */}
      <header className="border-b border-border bg-surface/30 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container-page max-w-5xl">
          <Breadcrumbs
            trail={[
              { label: "Journal", to: "/blog" },
              { label: article.category, to: "/blog" },
              { label: article.title },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-label text-gold font-semibold tracking-wider uppercase">
              {article.category}
            </span>
            <span className="text-border">·</span>
            <span className="text-meta text-muted-foreground">{article.readTime}</span>
            <span className="text-border">·</span>
            <span className="text-meta text-muted-foreground">{article.date}</span>
          </div>

          <h1 className="text-display mt-4 font-heading font-bold text-foreground max-w-4xl tracking-tight leading-[1.1]">
            {article.title}
          </h1>

          {article.subtitle ? (
            <p className="text-body-lg mt-6 max-w-3xl text-muted-foreground font-normal leading-relaxed">
              {article.subtitle}
            </p>
          ) : null}

          {/* Author & Editorial Metadata Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border/80 pt-6">
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="size-11 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-xs font-bold text-gold">
                  AN
                </div>
              )}
              <div>
                <p className="text-label font-semibold text-foreground">{article.author.name}</p>
                <p className="text-meta text-muted-foreground">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                aria-label="Save story"
                className="inline-flex h-10 items-center gap-2 border border-border bg-surface px-3.5 text-label text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} />
                <span className="hidden sm:inline">{saved ? "Saved" : "Save Story"}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share story"
                className="inline-flex h-10 items-center gap-2 border border-border bg-surface px-3.5 text-label text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                {copied ? <Check className="size-4 text-gold" /> : <Share2 className="size-4" />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO IMAGE CONTAINER */}
      <div className="container-page max-w-5xl py-8 md:py-12">
        <div className="overflow-hidden border border-border bg-surface shadow-2xl">
          <img
            src={article.heroImage}
            alt={article.title}
            width={1400}
            height={900}
            loading="eager"
            className="aspect-[16/10] w-full object-cover object-center md:aspect-[21/10]"
          />
        </div>
        {article.heroCaption ? (
          <p className="mt-3 text-center text-meta text-muted-foreground italic">
            {article.heroCaption}
          </p>
        ) : null}
      </div>

      {/* 3. EDITORIAL ARTICLE READING BODY */}
      <article className="container-page max-w-3xl pb-16 pt-4">
        {/* Pull Quote Highlight */}
        {article.pullQuote ? (
          <div className="my-10 border-y border-border py-8 text-center sm:my-14 sm:py-10">
            <span className="font-heading text-4xl text-gold/60 select-none">“</span>
            <blockquote className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl leading-snug">
              {article.pullQuote.quote}
            </blockquote>
            <p className="text-label text-gold mt-4 uppercase tracking-wider font-semibold">
              — {article.pullQuote.author}
              {article.pullQuote.role ? ` · ${article.pullQuote.role}` : ""}
            </p>
          </div>
        ) : null}

        {/* Structured Sections */}
        <div className="space-y-12 text-foreground/90 font-sans leading-relaxed text-base sm:text-lg">
          {article.sections && article.sections.length > 0 ? (
            article.sections.map((sec, idx) => (
              <section key={idx} className="space-y-6">
                {sec.heading ? (
                  <h2 className="text-h2 font-heading font-bold text-foreground tracking-tight pt-4">
                    {sec.heading}
                  </h2>
                ) : null}

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-muted-foreground leading-relaxed text-[17px]">
                    {p}
                  </p>
                ))}

                {sec.callout ? (
                  <div className="border border-gold/30 bg-gold/5 p-6 my-6">
                    <p className="text-label text-gold font-bold uppercase tracking-wider">
                      {sec.callout.title}
                    </p>
                    <p className="text-body mt-2 text-foreground/90 font-medium">
                      {sec.callout.text}
                    </p>
                  </div>
                ) : null}

                {sec.bulletPoints && sec.bulletPoints.length > 0 ? (
                  <ul className="space-y-3 pl-2 my-6">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                        <span className="text-[16px] leading-relaxed">{bp}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {sec.image ? (
                  <div className="my-8 overflow-hidden border border-border bg-surface">
                    <img
                      src={sec.image.src}
                      alt={sec.image.alt}
                      loading="lazy"
                      width={1000}
                      height={650}
                      className="w-full object-cover object-center aspect-[16/10]"
                    />
                    {sec.image.caption ? (
                      <p className="p-3 text-center text-meta text-muted-foreground border-t border-border bg-background">
                        {sec.image.caption}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </section>
            ))
          ) : (
            <div className="space-y-6 text-muted-foreground text-[17px]">
              <p>
                We build the studio around the drawing. A design arrives as a single file, and from
                there it is placed, scaled and proofed for every object we make.
              </p>
              <h2 className="text-h2 font-heading font-bold text-foreground pt-4">
                Why the object comes second
              </h2>
              <p>
                Most stores ask you to pick a garment and hope a graphic fits it. We invert that:
                choose the image you want to live with, then decide how it should exist in your day.
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>Each placement is proofed by hand for the surface it prints on.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>Colourways are chosen for contrast, not novelty.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>Nothing is produced before it is ordered.</span>
                </li>
              </ul>
              <h2 className="text-h2 font-heading font-bold text-foreground pt-4">
                What that changes
              </h2>
              <p>
                No dead stock and no end-of-season landfill. The trade is patience: two to four days
                of production before dispatch.
              </p>
            </div>
          )}
        </div>

        {/* Tags / Article Footer */}
        {article.tags && article.tags.length > 0 ? (
          <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-border pt-8">
            <span className="text-label text-muted-foreground mr-2">Filed under:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border bg-surface px-3 py-1 text-meta text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>

      {/* 4. SHOP THE STORY (Connected Products from the Article) */}
      {connectedDesign && (
        <section className="section container-page border-t border-border bg-surface/30">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-4 text-gold" />
                <span className="text-label text-gold font-semibold uppercase tracking-wider">
                  Shop The Story
                </span>
              </div>
              <h2 className="text-h1 mt-3 font-heading">
                Objects Featured in "{connectedDesign.name}"
              </h2>
              <p className="text-body-lg mt-2 text-muted-foreground">
                One drawing made to order across organic cotton apparel, glazed ceramics, and art
                prints.
              </p>
            </div>

            <Button asChild variant="gold" size="sm" className="group/btn">
              <Link to="/designs/$slug" params={{ slug: connectedDesign.slug }}>
                Explore The Design
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productTypesToShow.slice(0, 4).map((ptId) => (
              <ProductCard
                key={ptId}
                design={connectedDesign}
                productId={ptId}
                className="h-full"
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. YOU MAY ALSO LIKE (Related Articles) */}
      <section className="section container-page border-t border-border">
        <SectionHeading
          eyebrow="You May Also Like"
          title="More from the Journal"
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/blog">
                All Stories <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((rel) => (
            <StandardArticleCard key={rel.slug} article={rel} />
          ))}
        </div>
      </section>

      {/* 6. NEWSLETTER CTA */}
      <Newsletter />
    </>
  );
}
