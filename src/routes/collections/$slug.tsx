import { createFileRoute, notFound } from "@tanstack/react-router";
import { DesignCard } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { COLLECTIONS, designBySlug } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = COLLECTIONS.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Collection unavailable | Atelier Noir" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.collection;
    return {
      meta: [
        { title: `${c.name} Collection | Atelier Noir` },
        { name: "description", content: c.tagline },
        { property: "og:title", content: `${c.name} Collection | Atelier Noir` },
        { property: "og:description", content: c.tagline },
      ],
    };
  },
  component: CollectionDetail,
});

function CollectionDetail() {
  const { collection } = Route.useLoaderData();
  const designs = collection.designs.map((s) => designBySlug(s)!).filter(Boolean);
  return (
    <>
      <PageHero eyebrow="Collection" title={collection.name} intro={collection.tagline} trail={[{ label: "Collections", to: "/collections" }, { label: collection.name }]} />
      <section className="section container-page">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d) => (<DesignCard key={d.slug} design={d} />))}
        </div>
      </section>
    </>
  );
}
