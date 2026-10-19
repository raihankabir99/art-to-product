import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Calendar, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mockup } from "./Mockup";
import { designBySlug, productType, type ProductTypeId } from "@/lib/catalog";
import type { ArticleDetail, GiftGuideItem, ProductGuideItem } from "@/lib/blog-data";

/**
 * Editorial Hero Featured Article Card
 */
export function EditorialHeroCard({
  article,
  className,
}: {
  article: ArticleDetail;
  className?: string;
}) {
  return (
    <article
      id={`featured-article-${article.slug}`}
      className={cn(
        "group relative overflow-hidden border border-border bg-surface transition-all duration-500 hover:border-gold/50",
        className,
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Visual Cover (7 cols on desktop) */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background lg:col-span-7 lg:aspect-auto lg:min-h-[460px] lg:border-b-0 lg:border-r">
          <img
            src={article.heroImage}
            alt={article.title}
            loading="eager"
            width={1200}
            height={800}
            className="size-full object-cover object-center transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-gold/40 bg-black/80 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gold uppercase backdrop-blur-md">
              <Sparkles className="size-3" aria-hidden="true" />
              Featured Story
            </span>
            <Badge variant="secondary" className="bg-surface/90 text-foreground backdrop-blur-md">
              {article.category}
            </Badge>
          </div>

          {article.heroCaption ? (
            <p className="absolute bottom-3 left-4 right-4 truncate text-[11px] text-muted-foreground backdrop-blur-sm">
              {article.heroCaption}
            </p>
          ) : null}
        </div>

        {/* Content Body (5 cols on desktop) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-meta text-muted-foreground">
              <span className="text-label text-gold font-semibold tracking-wider uppercase">
                {article.category}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {article.readTime}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                {article.date}
              </span>
            </div>

            <h2 className="text-h2 mt-4 transition-colors duration-300 group-hover:text-gold">
              <Link to="/blog/$slug" params={{ slug: article.slug }}>
                {article.title}
              </Link>
            </h2>

            <p className="text-body-lg mt-4 text-muted-foreground line-clamp-3">
              {article.subtitle || article.excerpt}
            </p>

            {article.pullQuote ? (
              <blockquote className="mt-6 border-l-2 border-gold/60 pl-4 text-sm italic text-foreground/80">
                "{article.pullQuote.quote}"
              </blockquote>
            ) : null}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="size-8 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-bold text-gold">
                  AN
                </div>
              )}
              <div className="min-w-0">
                <p className="text-label truncate text-foreground">{article.author.name}</p>
                <p className="text-[11px] truncate text-muted-foreground">{article.author.role}</p>
              </div>
            </div>

            <Button asChild variant="gold" size="sm" className="group/btn">
              <Link to="/blog/$slug" params={{ slug: article.slug }}>
                Read Story
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Standard Article Card (Grid View)
 */
export function StandardArticleCard({
  article,
  className,
}: {
  article: ArticleDetail;
  className?: string;
}) {
  return (
    <article
      id={`article-card-${article.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-gold/40 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        className="block focus:outline-none"
        tabIndex={-1}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background">
          <img
            src={article.heroImage}
            alt={article.title}
            loading="lazy"
            width={600}
            height={400}
            className="size-full object-cover object-center transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
          <span className="absolute left-3 top-3 border border-border/80 bg-background/85 px-2 py-0.5 text-[11px] font-medium tracking-wide text-gold uppercase backdrop-blur-md">
            {article.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-meta text-muted-foreground">
            <span>{article.date}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-h3 mt-3 transition-colors duration-200 group-hover:text-gold line-clamp-2">
            <Link to="/blog/$slug" params={{ slug: article.slug }}>
              {article.title}
            </Link>
          </h3>

          <p className="text-body mt-2.5 text-muted-foreground line-clamp-2">{article.excerpt}</p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
          <span className="text-[12px] font-medium text-muted-foreground truncate">
            By {article.author.name}
          </span>
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="inline-flex items-center gap-1.5 text-label text-gold transition-transform duration-200 group-hover:translate-x-0.5"
            aria-label={`Read story: ${article.title}`}
          >
            <span>Read</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Large Editorial Card (Variant A)
 */
export function LargeEditorialCard({
  article,
  className,
}: {
  article: ArticleDetail;
  className?: string;
}) {
  return (
    <article
      id={`editorial-card-${article.slug}`}
      className={cn(
        "group relative overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-gold/40",
        className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border md:aspect-auto md:border-b-0 md:border-r">
          <img
            src={article.heroImage}
            alt={article.title}
            loading="lazy"
            width={800}
            height={600}
            className="size-full object-cover object-center transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 border border-gold/40 bg-background/90 px-2.5 py-1 text-label text-gold uppercase backdrop-blur-md">
            {article.category}
          </span>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-3 text-meta text-muted-foreground">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>

            <h3 className="text-h2 mt-3 transition-colors duration-200 group-hover:text-gold">
              <Link to="/blog/$slug" params={{ slug: article.slug }}>
                {article.title}
              </Link>
            </h3>

            <p className="text-body-lg mt-3 text-muted-foreground">{article.excerpt}</p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <span className="text-label text-muted-foreground">Studio Story</span>
            <Button asChild variant="outline" size="sm" className="group/btn">
              <Link to="/blog/$slug" params={{ slug: article.slug }}>
                Read Article
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Compact Article Card (Variant C)
 */
export function CompactArticleCard({
  article,
  className,
}: {
  article: ArticleDetail;
  className?: string;
}) {
  return (
    <article
      id={`compact-card-${article.slug}`}
      className={cn(
        "group flex items-start gap-4 border border-border bg-surface p-4 transition-all duration-200 hover:border-gold/50 hover:bg-surface/80",
        className,
      )}
    >
      <div className="relative size-20 shrink-0 overflow-hidden border border-border bg-background">
        <img
          src={article.heroImage}
          alt={article.title}
          loading="lazy"
          width={160}
          height={160}
          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-semibold text-gold uppercase">{article.category}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h4 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-gold line-clamp-2 mt-1">
          <Link to="/blog/$slug" params={{ slug: article.slug }}>
            {article.title}
          </Link>
        </h4>

        <p className="text-[12px] text-muted-foreground mt-1 line-clamp-1">{article.excerpt}</p>
      </div>

      <div className="shrink-0 self-center">
        <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-200 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}

/**
 * Horizontal Article Card (Variant D)
 */
export function HorizontalArticleCard({
  article,
  className,
}: {
  article: ArticleDetail;
  className?: string;
}) {
  return (
    <article
      id={`horizontal-card-${article.slug}`}
      className={cn(
        "group grid grid-cols-1 gap-4 border border-border bg-surface p-4 sm:grid-cols-[180px_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:p-5 transition-all duration-200 hover:border-gold/40",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border border-border sm:aspect-[4/3]">
        <img
          src={article.heroImage}
          alt={article.title}
          loading="lazy"
          width={360}
          height={270}
          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 border border-border bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-gold uppercase">
          {article.category}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 text-meta text-muted-foreground">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="text-h3 mt-1.5 transition-colors duration-200 group-hover:text-gold line-clamp-2">
          <Link to="/blog/$slug" params={{ slug: article.slug }}>
            {article.title}
          </Link>
        </h3>

        <p className="text-body mt-1.5 text-muted-foreground line-clamp-2">{article.excerpt}</p>
      </div>

      <div className="shrink-0 flex items-center justify-end">
        <Button asChild variant="outline" size="sm" className="group/btn max-sm:w-full">
          <Link to="/blog/$slug" params={{ slug: article.slug }}>
            Read
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

/**
 * Trending Story Row Item
 */
export function TrendingStoryItem({ rank, article }: { rank: number; article: ArticleDetail }) {
  const formattedRank = String(rank).padStart(2, "0");

  return (
    <div
      id={`trending-item-${article.slug}`}
      className="group relative flex items-center justify-between gap-4 border-b border-border py-4 transition-colors duration-200 hover:border-gold/40"
    >
      <div className="flex items-center gap-4 sm:gap-6 min-w-0">
        <span className="font-heading text-2xl font-bold tracking-tighter text-muted-foreground/50 transition-colors duration-200 group-hover:text-gold sm:text-3xl">
          {formattedRank}
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="text-label text-gold font-semibold uppercase">{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h4 className="text-body-lg font-medium text-foreground transition-colors duration-200 group-hover:text-gold line-clamp-1 mt-1">
            <Link to="/blog/$slug" params={{ slug: article.slug }}>
              {article.title}
            </Link>
          </h4>
        </div>
      </div>

      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        className="inline-flex size-9 shrink-0 items-center justify-center border border-border bg-surface text-muted-foreground transition-all duration-200 hover:border-gold hover:text-gold group-hover:translate-x-1"
        aria-label={`Read trending story: ${article.title}`}
      >
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

/**
 * Gift Guide Visual Card
 */
export function GiftGuideCard({ item }: { item: GiftGuideItem }) {
  return (
    <article
      id={`gift-card-${item.id}`}
      className="group relative flex flex-col justify-between overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-background">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          width={600}
          height={450}
          className="size-full object-cover object-center transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {item.badge ? (
          <span className="absolute left-3 top-3 border border-gold/40 bg-black/80 px-2 py-0.5 text-[11px] font-medium text-gold uppercase backdrop-blur-md">
            {item.badge}
          </span>
        ) : null}

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-[11px] tracking-wider text-gold uppercase">{item.category}</p>
          <h3 className="text-h3 font-heading font-bold text-white">{item.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <p className="text-label text-muted-foreground">{item.subtitle}</p>
          <p className="text-body mt-2 text-muted-foreground">{item.description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-meta text-muted-foreground">{item.itemsCount}</span>
          <Button asChild variant="gold" size="sm" className="group/btn">
            <Link to={item.targetLink}>
              Explore Gifts
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * Design Story Section Showcase Card
 */
export function DesignStoryCard({
  designSlug,
  title,
  subtitle,
  story,
  inspiration,
  image,
  productTypes = ["tshirt", "hoodie", "poster"],
}: {
  designSlug: string;
  title: string;
  subtitle: string;
  story: string;
  inspiration: string;
  image: string;
  productTypes?: string[];
}) {
  const design = designBySlug(designSlug);
  const [activeType, setActiveType] = useState<ProductTypeId>(
    (productTypes[0] as ProductTypeId) ?? "tshirt",
  );

  return (
    <section
      id={`design-story-${designSlug}`}
      className="overflow-hidden border border-border bg-surface p-6 sm:p-8 lg:p-12"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left: Design mockup preview & object switch */}
        <div className="flex flex-col items-center lg:col-span-6">
          <div className="relative w-full max-w-md overflow-hidden border border-border bg-background p-4 sm:p-6 shadow-inner">
            {design ? (
              <Mockup
                design={design}
                productId={activeType}
                className="w-full transition-all duration-500"
              />
            ) : (
              <img
                src={image}
                alt={title}
                className="aspect-square w-full object-cover object-center"
              />
            )}
            <span className="absolute left-3 top-3 border border-gold/40 bg-background/90 px-2 py-0.5 text-[11px] font-medium text-gold uppercase">
              Design Architecture
            </span>
          </div>

          {/* Interactive object selector */}
          {design ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {productTypes.map((pt) => {
                const typeObj = productType(pt as ProductTypeId);
                const isActive = activeType === pt;
                return (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => setActiveType(pt as ProductTypeId)}
                    className={cn(
                      "border px-3 py-1.5 text-label transition-all duration-200",
                      isActive
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border bg-surface text-muted-foreground hover:border-foreground hover:text-foreground",
                    )}
                  >
                    {typeObj.name}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Right: Editorial Lore & Design Philosophy */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-label text-gold uppercase tracking-wider font-semibold">
                Design Story · 2026
              </span>
              <span className="text-border">|</span>
              <span className="text-meta text-muted-foreground">{subtitle}</span>
            </div>

            <h3 className="text-h1 mt-3 font-heading font-bold text-foreground">
              The Story Behind {title}
            </h3>

            <p className="text-body-lg mt-4 text-muted-foreground leading-relaxed">{story}</p>

            <div className="mt-6 border-l-2 border-gold pl-4 py-1">
              <p className="text-label text-gold uppercase">Creative Inspiration</p>
              <p className="text-body mt-1 text-foreground/90 italic">{inspiration}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="gold" size="lg" className="group/btn">
              <Link
                to="/designs/$slug"
                params={{ slug: designSlug }}
                search={{ product: activeType }}
              >
                Explore The Design
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/blog/$slug" params={{ slug: `the-story-behind-${designSlug}` }}>
                Read In-Depth Essay
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Product Guide Card
 */
export function ProductGuideCard({ guide }: { guide: ProductGuideItem }) {
  return (
    <article
      id={`guide-card-${guide.slug}`}
      className="group flex flex-col justify-between overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-gold/40 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
        <img
          src={guide.image}
          alt={guide.title}
          loading="lazy"
          width={600}
          height={400}
          className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 border border-border bg-background/90 px-2 py-0.5 text-[11px] font-medium text-gold uppercase">
          {guide.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-meta text-muted-foreground">
            <Clock className="size-3.5" />
            <span>{guide.readTime}</span>
          </div>

          <h3 className="text-h3 mt-2 transition-colors duration-200 group-hover:text-gold line-clamp-2">
            <Link to="/blog/$slug" params={{ slug: guide.targetSlug }}>
              {guide.title}
            </Link>
          </h3>

          <p className="text-body mt-2.5 text-muted-foreground line-clamp-2">{guide.description}</p>

          {guide.comparisonHighlights ? (
            <div className="mt-4 divide-y divide-border/60 border-y border-border/60 py-2">
              {guide.comparisonHighlights.map((ch, idx) => (
                <div key={idx} className="flex justify-between py-1.5 text-[12px]">
                  <span className="text-muted-foreground">{ch.label}</span>
                  <span className="font-medium text-foreground">{ch.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[12px] text-muted-foreground italic truncate max-w-[200px]">
            {guide.keyTakeaway}
          </span>
          <Link
            to="/blog/$slug"
            params={{ slug: guide.targetSlug }}
            className="inline-flex items-center gap-1 text-label text-gold hover:underline"
          >
            <span>View Guide</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
