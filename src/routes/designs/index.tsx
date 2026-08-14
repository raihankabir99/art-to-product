import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DesignCard, EmptyState } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { Segmented } from "@/components/store/ui";
import { Button } from "@/components/ui/button";
import { DESIGNS } from "@/lib/catalog";

export const Route = createFileRoute("/designs/")({
  head: () => ({
    meta: [
      { title: "Designs | Atelier Noir" },
      { name: "description", content: "Browse the archive. Each design lives across up to thirteen products — choose the drawing first, the object second." },
      { property: "og:title", content: "Designs | Atelier Noir" },
      { property: "og:description", content: "Browse the archive. Each design lives across up to thirteen products — choose the drawing first, the object second." },
    ],
  }),
  component: Designs,
});

const TABS = ["All", "New", "Bestseller", "Limited", "Sale"] as const;
type Tab = (typeof TABS)[number];

function Designs() {
  const [tab, setTab] = useState<Tab>("All");
  const [studio, setStudio] = useState("All");
  const [query, setQuery] = useState("");

  const studios = ["All", ...Array.from(new Set(DESIGNS.map((d) => d.studio)))];

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESIGNS.filter((d) => tab === "All" || d.badges.includes(tab as never))
      .filter((d) => studio === "All" || d.studio === studio)
      .filter((d) => !q || `${d.name} ${d.collection} ${d.studio}`.toLowerCase().includes(q));
  }, [tab, studio, query]);

  return (
    <>
      <PageHero
        eyebrow="The archive"
        title="Designs"
        intro="A design is the starting point, not the product. Pick one and decide afterwards whether it becomes a tee, a poster or a mug."
        trail={[{ label: "Designs" }]}
      />

      <section className="container-page space-y-6 border-b border-border pb-8">
        <Segmented
          ariaLabel="Filter designs"
          value={tab}
          onChange={(v) => setTab(v as Tab)}
          options={TABS.map((t) => ({
            value: t,
            label: t === "All" ? "All designs" : t,
            count: t === "All" ? DESIGNS.length : DESIGNS.filter((d) => d.badges.includes(t as never)).length,
          }))}
        />
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-56 flex-1">
            <label htmlFor="design-search" className="sr-only">Search designs</label>
            <input
              id="design-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, collection or studio"
              className="text-body-sm h-12 w-full border border-border bg-transparent px-4 placeholder:text-muted-foreground focus-visible:border-foreground"
            />
          </div>
          <div>
            <label htmlFor="studio" className="sr-only">Filter by studio</label>
            <select
              id="studio"
              value={studio}
              onChange={(e) => setStudio(e.target.value)}
              className="text-label h-12 cursor-pointer appearance-none border border-border bg-transparent px-4"
            >
              {studios.map((s) => (<option key={s} className="bg-background">{s}</option>))}
            </select>
          </div>
          <p className="text-meta" aria-live="polite">{list.length} designs</p>
        </div>
      </section>

      <section className="section container-page">
        {list.length === 0 ? (
          <EmptyState
            title="No designs match that"
            body="Try a different word, or clear the filters to see the whole archive."
            action={<Button variant="secondary" onClick={() => { setTab("All"); setStudio("All"); setQuery(""); }}>Clear filters</Button>}
          />
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => (<DesignCard key={d.slug} design={d} />))}
          </div>
        )}
      </section>
    </>
  );
}
