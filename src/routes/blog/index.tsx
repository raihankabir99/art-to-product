import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TrendingUp, BookOpen, Gift, Compass } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/store/Newsletter";
import {
  ALL_ARTICLES,
  BLOG_CATEGORIES,
  type BlogCategory,
  GIFT_GUIDES,
  PRODUCT_GUIDES_DATA,
  DESIGN_STORIES_DATA,
  getFeaturedArticle,
  getTrendingArticles,
} from "@/lib/blog-data";
import {
  EditorialHeroCard,
  StandardArticleCard,
  TrendingStoryItem,
  GiftGuideCard,
  DesignStoryCard,
  ProductGuideCard,
  LargeEditorialCard,
} from "@/components/store/BlogCards";
import { BlogCategoryNav, BlogSearchHeader, BlogEmptyState } from "@/components/store/BlogSearch";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal & Stories | Atelier Noir" },
      {
        name: "description",
        content:
          "Stories, ideas and inspiration on minimal fashion, sustainable print-on-demand craftsmanship, design philosophy, and curated gift guides.",
      },
      { property: "og:title", content: "Journal & Stories | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Stories, ideas and inspiration on minimal fashion, design philosophy, and curated product guides.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogLandingPage,
});

function BlogLandingPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle = useMemo(() => getFeaturedArticle(), []);
  const trendingArticles = useMemo(() => getTrendingArticles(), []);

  // Filtered articles based on search & category
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      // Category check
      const matchesCategory =
        activeCategory === "All" || article.category.toLowerCase() === activeCategory.toLowerCase();

      // Query check
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle?.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.tags?.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const isFiltering = searchQuery.trim() !== "" || activeCategory !== "All";

  return (
    <>
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative border-b border-border bg-gradient-to-b from-surface/80 via-background to-background py-14 md:py-24">
        <div className="container-page">
          <div className="flex flex-col items-center text-center">
            <span className="text-label text-gold tracking-widest uppercase font-semibold">
              Atelier Noir Journal
            </span>

            <h1 className="text-display mt-4 max-w-4xl tracking-tight text-foreground font-heading">
              Stories, ideas and inspiration.
            </h1>

            <p className="text-body-lg mt-5 max-w-2xl text-muted-foreground">
              Essays from the studio on design theory, high-density textiles, conscious print on
              demand, and curated lifestyle aesthetics.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1 text-meta text-muted-foreground">
                <BookOpen className="size-3.5 text-gold" />
                Editorial Edition 2026
              </span>
              <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1 text-meta text-muted-foreground">
                <Compass className="size-3.5 text-gold" />
                International Culture & Style
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY NAVIGATION BAR */}
      <BlogCategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
        }}
      />

      {/* SEARCH RESULTS OR FULL EDITORIAL MAGAZINE FLOW */}
      {isFiltering ? (
        <div className="min-h-[500px]">
          <BlogSearchHeader
            query={searchQuery}
            onQueryChange={setSearchQuery}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            totalResults={filteredArticles.length}
          />

          {filteredArticles.length === 0 ? (
            <BlogEmptyState
              query={searchQuery}
              activeCategory={activeCategory}
              onReset={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            />
          ) : (
            <section className="section container-page">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <StandardArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <>
          {/* 3. FEATURED STORY (Large Hero Editorial Card) */}
          <section className="section container-page">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <span className="text-label text-gold font-semibold uppercase tracking-wider">
                  Lead Editorial
                </span>
              </div>
              <span className="text-meta text-muted-foreground">Cover Story · Issue No. 04</span>
            </div>

            <EditorialHeroCard article={featuredArticle} />
          </section>

          {/* 4. LATEST STORIES & TRENDING SECTION (Asymmetric Layout) */}
          <section className="section container-page border-t border-border">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left 8 Cols: Latest Stories Grid */}
              <div className="lg:col-span-8">
                <SectionHeading
                  eyebrow="Latest Stories"
                  title="Fresh from the Studio"
                  action={
                    <button
                      type="button"
                      onClick={() => setActiveCategory("Fashion")}
                      className="text-label text-gold hover:underline"
                    >
                      Browse Fashion →
                    </button>
                  }
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {ALL_ARTICLES.slice(1, 7).map((article) => (
                    <StandardArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>

              {/* Right 4 Cols: Trending Now Editorial Ranking */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 border border-border bg-surface p-6 sm:p-8">
                  <div className="flex items-center gap-2 border-b border-border pb-4">
                    <TrendingUp className="size-4 text-gold" />
                    <h3 className="text-h3 font-heading uppercase tracking-wider text-foreground">
                      Trending Now
                    </h3>
                  </div>

                  <p className="text-body mt-3 text-muted-foreground">
                    Most read perspectives by our international readers this month.
                  </p>

                  <div className="mt-6 divide-y divide-border">
                    {trendingArticles.map((article, idx) => (
                      <TrendingStoryItem key={article.slug} rank={idx + 1} article={article} />
                    ))}
                  </div>

                  <div className="mt-8 border-t border-border/80 pt-6">
                    <div className="border border-gold/30 bg-gold/5 p-4 text-center">
                      <p className="text-label text-gold font-semibold uppercase">
                        The Journal Dispatch
                      </p>
                      <p className="text-[12px] text-muted-foreground mt-1">
                        Read by 28,000+ designers and minimalists across Europe and the UK.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. DESIGN STORIES (Dedicated Editorial Section) */}
          <section className="section container-page border-t border-border">
            <SectionHeading
              eyebrow="Design Stories"
              title="The Philosophy Behind The Drawings"
              action={
                <Button asChild variant="outline" size="sm">
                  <Link to="/designs">
                    View All Designs <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              }
            />

            <div className="space-y-10">
              {DESIGN_STORIES_DATA.map((story) => (
                <DesignStoryCard
                  key={story.slug}
                  designSlug={story.designSlug}
                  title={story.title}
                  subtitle={story.subtitle}
                  story={story.story}
                  inspiration={story.inspiration}
                  image={story.image}
                  productTypes={story.productTypes}
                />
              ))}
            </div>
          </section>

          {/* 6. PRODUCT GUIDES & COMPARISONS */}
          <section className="section container-page border-t border-border">
            <SectionHeading
              eyebrow="Product & Material Guides"
              title="Make Confident Decisions"
              action={
                <button
                  type="button"
                  onClick={() => setActiveCategory("Product Guide")}
                  className="text-label text-gold hover:underline"
                >
                  View All Guides →
                </button>
              }
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_GUIDES_DATA.map((guide) => (
                <ProductGuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>

          {/* 7. GIFT GUIDE SECTION */}
          <section className="section container-page border-t border-border">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <Gift className="size-4 text-gold" />
                  <span className="text-label text-gold font-semibold uppercase tracking-wider">
                    Curated Gift Guides
                  </span>
                </div>
                <h2 className="text-h1 mt-3 font-heading">Considered Giving</h2>
                <p className="text-body-lg mt-2 max-w-2xl text-muted-foreground">
                  Find meaningful made-to-order garments, archival art prints, and ceramics crafted
                  for the people in your life.
                </p>
              </div>

              <Button asChild variant="outline" size="sm">
                <Link to="/shop">
                  Browse All Objects <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GIFT_GUIDES.map((item) => (
                <GiftGuideCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* 8. EDITORIAL SPOTLIGHT (Variant A Large Card) */}
          <section className="section container-page border-t border-border">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-label text-gold uppercase tracking-wider font-semibold">
                Culture & Community
              </span>
              <span className="text-meta text-muted-foreground">Studio Perspective</span>
            </div>

            {ALL_ARTICLES.find((a) => a.slug === "minimal-design-in-modern-fashion") ? (
              <LargeEditorialCard
                article={ALL_ARTICLES.find((a) => a.slug === "minimal-design-in-modern-fashion")!}
              />
            ) : null}
          </section>
        </>
      )}

      {/* 9. NEWSLETTER CTA SECTION */}
      <Newsletter />
    </>
  );
}
