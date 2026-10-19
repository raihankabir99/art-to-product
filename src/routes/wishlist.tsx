import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Sparkles, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { Mockup } from "@/components/store/Mockup";
import { Price } from "@/components/store/cards";
import { useStore } from "@/components/store/store";
import { DESIGNS, productType, type Design, type ProductTypeId } from "@/lib/catalog";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Curated Wishlist | Atelier Noir" },
      {
        name: "description",
        content: "Designs you have saved for later, ready to be made into any object in the range.",
      },
      { property: "og:title", content: "Curated Wishlist | Atelier Noir" },
      {
        property: "og:description",
        content: "Designs you have saved for later, ready to be made into any object in the range.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWish, addToBag } = useStore();

  const savedDesigns = DESIGNS.filter((d) => wishlist.includes(d.slug));

  const handleAddToCart = (design: Design, productId: ProductTypeId) => {
    const type = productType(productId);
    const defaultColor = type.colors[0];
    const defaultSize = type.sizes[0];

    addToBag({
      designSlug: design.slug,
      productId,
      color: defaultColor.name,
      colorValue: defaultColor.value,
      size: defaultSize,
      qty: 1,
    });
    toast.success(`Added ${design.name} ${type.name} to bag`);
  };

  return (
    <>
      <PageHero
        eyebrow="Curated Selection"
        title="Your Wishlist"
        intro="Designs saved to your studio portfolio. Each artwork can be realized across our entire range of heavyweight apparel, ceramic mugs, and archival prints."
        trail={[{ label: "Account", to: "/account" }, { label: "Wishlist" }]}
      />

      <section className="section container-page">
        {savedDesigns.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="text-label uppercase tracking-wider text-xs text-muted-foreground">
                Showing {savedDesigns.length} saved{" "}
                {savedDesigns.length === 1 ? "design" : "designs"}
              </p>
              <Button asChild variant="secondary" size="sm">
                <Link to="/shop">Explore More Designs</Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedDesigns.map((design) => {
                const primaryProduct = design.products[0] || "tshirt";
                const type = productType(primaryProduct);

                return (
                  <div
                    key={design.slug}
                    className="group relative flex flex-col border border-border bg-surface transition-all hover:border-border-strong"
                  >
                    {/* Mockup Canvas */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                      <Link to="/designs/$slug" params={{ slug: design.slug }}>
                        <Mockup
                          design={design}
                          productId={primaryProduct}
                          className="size-full transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
                        />
                      </Link>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleWish(design.slug);
                          toast.info(`Removed ${design.name} from wishlist`);
                        }}
                        aria-label={`Remove ${design.name} from wishlist`}
                        className="absolute right-3 top-3 z-10 grid size-9 place-items-center border border-border bg-background/80 text-gold backdrop-blur transition-all hover:border-destructive hover:text-destructive"
                      >
                        <Heart className="size-4 fill-current" />
                      </button>

                      {/* One Design -> Many Products indicator */}
                      <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/90 px-4 py-2.5 backdrop-blur">
                        <p className="text-label text-[11px] text-gold uppercase tracking-wider flex items-center justify-between">
                          <span>Available on {design.products.length} canvases</span>
                          <Sparkles className="size-3 text-gold" />
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-h4 font-medium truncate">
                            <Link
                              to="/designs/$slug"
                              params={{ slug: design.slug }}
                              className="hover:text-gold transition-colors"
                            >
                              {design.name}
                            </Link>
                          </h3>
                          <Price value={type.price} />
                        </div>

                        <p className="text-meta text-muted-foreground mt-1 line-clamp-2">
                          {design.story}
                        </p>

                        <p className="text-meta text-muted-foreground text-xs mt-2">
                          Featured on {type.name} ·{" "}
                          <span className="text-foreground">Made to order</span>
                        </p>
                      </div>

                      {/* Action CTAs */}
                      <div className="space-y-2 pt-2 border-t border-border">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleAddToCart(design, primaryProduct)}
                          className="w-full gap-2 text-xs uppercase tracking-wider"
                        >
                          <ShoppingBag className="size-3.5" /> Add to Bag ({type.name})
                        </Button>

                        {/* Discover on all products */}
                        <Button
                          asChild
                          variant="secondary"
                          size="sm"
                          className="w-full gap-1.5 text-xs uppercase tracking-wider"
                        >
                          <Link to="/designs/$slug" params={{ slug: design.slug }}>
                            Explore This Design <ArrowUpRight className="size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="border border-border bg-surface p-12 sm:p-16 text-center space-y-4 max-w-2xl mx-auto">
            <div className="grid size-14 place-items-center border border-border bg-surface-2 mx-auto text-gold">
              <Heart className="size-6" />
            </div>
            <h3 className="text-h3 font-medium">Save what inspires you.</h3>
            <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
              Keep your favorite designs here and come back whenever you&apos;re ready. Each saved
              artwork can be printed on tees, hoodies, prints, and ceramics.
            </p>
            <div className="pt-4">
              <Button asChild className="uppercase tracking-wider text-xs px-8">
                <Link to="/shop">Explore Designs</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
