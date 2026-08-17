import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/store/page";
import { WishlistButton } from "@/components/store/cards";
import { QuantitySelector } from "@/components/store/CartDrawer";
import { SizeGuide } from "@/components/store/SizeGuide";
import { useStore } from "@/components/store/store";
import { buildMedia, ProductMediaGallery } from "@/components/store/product/gallery";
import {
  ColorSelector,
  DeviceSelector,
  FormatSelector,
  PosterSizeSelector,
  ProductAccordion,
  ProductAssurances,
  ProductPrice,
  ProductRating,
  ShippingEstimator,
  SizeSelector,
} from "@/components/store/product/options";
import {
  DesignStory,
  MobileStickyCartBar,
  ProductTypeSwitcher,
  RecentlyViewed,
  RelatedProducts,
  ReviewSection,
  SameDesignProducts,
} from "@/components/store/product/sections";
import {
  DEVICE_GROUPS,
  FORMAT_OPTIONS,
  POSTER_FORMATS,
  optionsFor,
  parseProductSlug,
  productSlug,
  productTitle,
  variantAvailability,
} from "@/lib/product-data";
import { categorySlugForType, productType, shopCategory, type ProductTypeId } from "@/lib/catalog";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const parsed = parseProductSlug(params.slug);
    if (!parsed) throw notFound();
    return parsed;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — Atelier Noir" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const type = productType(loaderData.productId);
    const title = `${loaderData.design.name} ${productTitle(type)} — Atelier Noir`;
    const description = `${loaderData.design.name} printed to order on a ${type.name.toLowerCase()}. ${type.description}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

/** Default option value for a given product format. */
function defaultOption(id: ProductTypeId): string | undefined {
  if (id === "phonecase") return DEVICE_GROUPS[0]!.models[0];
  if (id === "poster") return POSTER_FORMATS[1]!.id;
  const formats = FORMAT_OPTIONS[id];
  if (formats?.length) return formats[0]!.id;
  const sizes = productType(id).sizes;
  return sizes?.[2] ?? sizes?.[0];
}

function ProductPage() {
  const { design, productId: initialProduct } = Route.useLoaderData();
  const { addToCart, markViewed, region } = useStore();

  const [productId, setProductId] = useState<ProductTypeId>(initialProduct);
  const type = productType(productId);
  const [colorName, setColorName] = useState(type.colors[0]!.name);
  const [option, setOption] = useState<string | undefined>(() => defaultOption(initialProduct));
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [added, setAdded] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);

  useEffect(() => setProductId(initialProduct), [initialProduct]);
  useEffect(() => {
    markViewed(design.slug);
  }, [design.slug, markViewed]);

  /** switching format keeps the design, resets format-specific options */
  const switchProduct = (id: ProductTypeId) => {
    setProductId(id);
    setColorName(productType(id).colors[0]!.name);
    setOption(defaultOption(id));
    setQty(1);
  };

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBarVisible(!e?.isIntersecting), {
      rootMargin: "-96px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const color = type.colors.find((c) => c.name === colorName) ?? type.colors[0]!;
  const media = useMemo(
    () => buildMedia(type, color.value, color.tone),
    [type, color.value, color.tone],
  );
  const kinds = optionsFor(type);
  const soldOut = variantAvailability(productId, option) === "out";

  const categorySlug = categorySlugForType(productId);
  const category = categorySlug ? shopCategory(categorySlug) : undefined;

  const handleAdd = () => {
    if (soldOut) return;
    addToCart({
      designSlug: design.slug,
      designName: design.name,
      productId,
      productName: type.name,
      color: color.name,
      colorValue: color.value,
      ...(option ? { size: option } : {}),
      price: type.price,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
    toast.success(`${design.name} ${type.name} added to your bag`);
  };

  return (
    <>
      <div className="container-page pt-8">
        <Breadcrumbs
          trail={[
            { label: "Shop", to: "/shop" },
            ...(category && categorySlug
              ? [{ label: category.label, to: `/shop/${categorySlug}` }]
              : []),
            { label: design.name },
          ]}
        />
      </div>

      <section className="container-page grid gap-10 py-8 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-14 lg:py-12">
        <div className="min-w-0">
          <ProductMediaGallery design={design} type={type} media={media} />
        </div>

        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div ref={buyRef}>
            <div className="flex flex-wrap items-center gap-2">
              {design.badges.map((b) => (
                <Badge key={b} variant={b === "Sale" ? "sale" : b === "Limited" ? "gold" : "default"}>
                  {b}
                </Badge>
              ))}
              {soldOut ? <Badge variant="outline">Sold out</Badge> : null}
            </div>

            <h1 className="text-h1 mt-4">{design.name}</h1>
            <p className="text-body-lg mt-2 text-muted-foreground">{productTitle(type)}</p>

            <div className="mt-6">
              <ProductPrice value={type.price} compareAt={type.compareAt} />
              <p className="text-meta mt-2">
                {region.taxNote} · Delivery {region.delivery}
              </p>
            </div>

            <div className="mt-4">
              <ProductRating
                rating={design.rating}
                reviews={design.reviews}
                onJump={() =>
                  document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </div>

            <p className="text-body mt-6 text-muted-foreground">{type.description}</p>

            <div className="mt-8">
              <ProductTypeSwitcher design={design} productId={productId} onSelect={switchProduct} />
            </div>

            <div className="mt-8 space-y-8">
              {kinds.includes("color") ? (
                <ColorSelector type={type} value={color.name} onChange={setColorName} />
              ) : null}

              {kinds.includes("size") && type.sizes?.length ? (
                <SizeSelector
                  type={type}
                  sizes={type.sizes}
                  value={option}
                  onChange={setOption}
                  onGuide={() => setGuide(true)}
                />
              ) : null}

              {kinds.includes("device") ? (
                <DeviceSelector value={option} onChange={setOption} />
              ) : null}

              {kinds.includes("poster-size") ? (
                <PosterSizeSelector value={option} onChange={setOption} />
              ) : null}

              {kinds.includes("format") ? (
                <FormatSelector type={type} value={option} onChange={setOption} />
              ) : null}

              <div>
                <p className="text-label text-muted-foreground">Quantity</p>
                <div className="mt-4">
                  <QuantitySelector qty={qty} onChange={(n) => setQty(Math.max(1, n))} />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={handleAdd}
                disabled={soldOut}
                className="text-label flex min-h-14 w-full items-center justify-center gap-2 bg-foreground px-6 text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> Added to cart
                  </>
                ) : soldOut ? (
                  "Sold out"
                ) : (
                  "Add to cart"
                )}
              </button>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                <Link
                  to="/checkout"
                  className="text-label flex min-h-12 items-center justify-center border border-border-strong px-6 transition-colors hover:border-foreground"
                >
                  Buy now
                </Link>
                <WishlistButton slug={design.slug} label="Save" className="px-4" />
              </div>
              <p aria-live="polite" className="text-meta">
                {added ? "Added to your bag. Keep browsing — nothing is made until you order." : "\u00A0"}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <ShippingEstimator />
            <ProductAssurances />
          </div>

          <div className="mt-10">
            <ProductAccordion type={type} story={design.story} />
          </div>
        </div>
      </section>

      <SameDesignProducts design={design} productId={productId} onSelect={switchProduct} />
      <DesignStory design={design} />
      <ReviewSection design={design} />
      <RelatedProducts design={design} productId={productId} />
      <RecentlyViewed excludeSlug={design.slug} />

      <div className="h-20 lg:hidden" aria-hidden="true" />
      <MobileStickyCartBar
        visible={barVisible}
        price={type.price}
        label={`${design.name} · ${type.name}`}
        onAdd={handleAdd}
        disabled={soldOut}
      />

      <SizeGuide open={guide} onClose={() => setGuide(false)} type={type} />

      <p className="sr-only">
        Currently viewing {design.name} on a {type.name}. Product slug{" "}
        {productSlug(design.slug, productId)}.
      </p>
    </>
  );
}
