import { createFileRoute } from "@tanstack/react-router";
import { ShopView } from "@/components/store/ShopView";
import { getRouteApi } from "@tanstack/react-router";

const api = getRouteApi("/shop");

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All Products | Atelier Noir" },
      {
        name: "description",
        content:
          "Every design across thirteen product types — apparel, accessories, home and print. Made to order, shipped worldwide.",
      },
      { property: "og:title", content: "Shop All Products | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Every design across thirteen product types — apparel, accessories, home and print. Made to order, shipped worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopIndex,
});

function ShopIndex() {
  const { type } = api.useSearch();
  return (
    <ShopView
      title="Wear the design. Make it yours."
      intro="Explore our latest apparel, accessories and lifestyle products. Nothing is produced until you order it."
      trail={[{ label: "Shop" }]}
      {...(type ? { initialTypes: [type] } : {})}
    />
  );
}
