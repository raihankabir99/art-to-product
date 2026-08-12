import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DesignCard, EmptyState } from "@/components/store/cards";
import { PageHero } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import { designBySlug } from "@/lib/catalog";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Atelier Noir" },
      { name: "description", content: "Designs you have saved for later, ready to be made into any object in the range." },
      { property: "og:title", content: "Wishlist | Atelier Noir" },
      { property: "og:description", content: "Designs you have saved for later, ready to be made into any object in the range." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const designs = wishlist.map((s) => designBySlug(s)).filter(Boolean);
  return (
    <>
      <PageHero title="Wishlist" intro="Saved designs, waiting for you to choose the object." trail={[{ label: "Wishlist" }]} />
      <section className="section container-page">
        {designs.length === 0 ? (
          <EmptyState title="Nothing saved yet" body="Tap the heart on any design to keep it here." action={<Button asChild><Link to="/designs">Explore designs</Link></Button>} />
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((d) => (<DesignCard key={d!.slug} design={d!} />))}
          </div>
        )}
      </section>
    </>
  );
}
