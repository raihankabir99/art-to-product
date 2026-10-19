import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDown, Layers, Sparkles, ArrowRight } from "lucide-react";
import { DesignCard, CollectionCard } from "@/components/store/cards";
import { Breadcrumbs } from "@/components/store/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COLLECTIONS, designBySlug, type Collection } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = COLLECTIONS.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Collection unavailable | Atelier Mono" },
          { name: "robots", content: "noindex" },
        ],
      };
    const c = loaderData.collection;
    return {
      meta: [
        { title: `${c.name} Collection | Atelier Mono` },
        { name: "description", content: c.tagline },
        { property: "og:title", content: `${c.name} Collection | Atelier Mono` },
        { property: "og:description", content: c.tagline },
      ],
    };
  },
  component: CollectionDetail,
});

function CollectionDetail() {
  const { collection } = Route.useLoaderData();
  const designs = collection.designs.map((s) => designBySlug(s)).filter(Boolean);

  const relatedCollections = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(0, 3);

  const scrollToDesigns = () => {
    const el = document.getElementById("collection-designs-grid");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative border-b border-border bg-background py-10 md:py-16">
        <div className="container-page space-y-6">
          <Breadcrumbs
            trail={[{ label: "Collections", to: "/collections" }, { label: collection.name }]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <p className="text-label text-gold uppercase tracking-widest">Curated Collection</p>
                <Badge variant="gold" className="gap-1">
                  <Sparkles className="size-3" /> {designs.length}{" "}
                  {designs.length === 1 ? "Design" : "Designs"}
                </Badge>
              </div>
              <h1 className="text-display font-medium tracking-tight text-foreground sm:text-5xl">
                {collection.name}
              </h1>
              <p className="text-body-lg text-muted-foreground">{collection.tagline}</p>
            </div>

            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              <Button size="lg" onClick={scrollToDesigns} className="gap-2">
                Explore Collection <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Image Banner */}
      {collection.image ? (
        <div className="container-page pt-8 pb-4">
          <div className="relative overflow-hidden border border-border bg-surface">
            <img
              src={collection.image}
              alt={`${collection.name} Collection editorial banner`}
              width={1400}
              height={600}
              className="aspect-[21/9] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-background/90 backdrop-blur text-gold border-gold/40"
              >
                <Layers className="size-3 mr-1" /> Every design available on 13 product formats
              </Badge>
            </div>
          </div>
        </div>
      ) : null}

      {/* Featured Designs in Collection */}
      <section id="collection-designs-grid" className="section container-page scroll-mt-24">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-label text-gold">Featured Designs</p>
            <h2 className="text-h2 mt-1">Artwork in {collection.name}</h2>
          </div>
          <span className="text-meta text-muted-foreground">
            {designs.length} {designs.length === 1 ? "Artwork" : "Artworks"}
          </span>
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d) => (
            <DesignCard key={d!.slug} design={d!} />
          ))}
        </div>
      </section>

      {/* Related Collections Section */}
      <section className="section container-page border-t border-border pt-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-8">
          <div>
            <p className="text-label text-gold">Explore Further</p>
            <h2 className="text-h2 mt-1">Related Collections</h2>
          </div>
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/collections">
              View All Collections <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {relatedCollections.map((rc) => {
            const firstDesign = designBySlug(rc.designs[0] ?? "midnight-lion")!;
            return (
              <CollectionCard
                key={rc.slug}
                slug={rc.slug}
                name={rc.name}
                tagline={rc.tagline}
                count={rc.designs.length}
                image={rc.image}
                design={firstDesign}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
