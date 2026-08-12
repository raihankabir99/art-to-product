import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/store/page";
import { ARTICLES } from "@/lib/catalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article unavailable | Atelier Noir" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} | Atelier Noir Journal` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: Article,
});

function Article() {
  const { article } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={`${article.category} · ${article.readTime}`} title={article.title} intro={article.excerpt} trail={[{ label: "Journal", to: "/blog" }, { label: article.title }]} />
      <article className="section container-narrow">
        <Prose>
          <p>We build the studio around the drawing. A design arrives as a single file, and from there it is placed, scaled and proofed for every object we make.</p>
          <h2>Why the object comes second</h2>
          <p>Most stores ask you to pick a garment and hope a graphic fits it. We invert that: choose the image you want to live with, then decide how it should exist in your day.</p>
          <ul>
            <li>Each placement is proofed by hand for the surface it prints on.</li>
            <li>Colourways are chosen for contrast, not novelty.</li>
            <li>Nothing is produced before it is ordered.</li>
          </ul>
          <h2>What that changes</h2>
          <p>No dead stock and no end-of-season landfill. The trade is patience: two to four days of production before dispatch.</p>
        </Prose>
      </article>
    </>
  );
}
