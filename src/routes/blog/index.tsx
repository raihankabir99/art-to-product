import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/store/page";
import { ARTICLES } from "@/lib/catalog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal | Atelier Noir" },
      { name: "description", content: "Notes from the studio on design, materials and printing on demand without waste." },
      { property: "og:title", content: "Journal | Atelier Noir" },
      { property: "og:description", content: "Notes from the studio on design, materials and printing on demand without waste." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero eyebrow="Journal" title="Notes from the studio" intro="On drawing, materials and making things only after they are wanted." trail={[{ label: "Journal" }]} />
      <section className="section container-page">
        <ul className="divide-y divide-border border-y border-border">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link to="/blog/$slug" params={{ slug: a.slug }} className="group grid gap-3 py-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                <span className="text-label text-gold md:w-40">{a.category}</span>
                <div className="min-w-0">
                  <h2 className="text-h3 group-hover:text-gold">{a.title}</h2>
                  <p className="text-body mt-2 max-w-2xl text-muted-foreground">{a.excerpt}</p>
                </div>
                <span className="text-meta">{a.date} · {a.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
