import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShopView } from "@/components/store/ShopView";
import { EmptyState } from "@/components/store/cards";
import { shopCategory } from "@/lib/catalog";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = shopCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found | Atelier Noir" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.title} | Atelier Noir`;
    return {
      meta: [
        { title },
        { name: "description", content: category.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: category.intro },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <ShopView
      eyebrow="Shop"
      title={category.title}
      intro={category.intro}
      trail={[{ label: "Shop", to: "/shop" }, { label: category.label }]}
      categorySlug={category.slug}
      allowedTypes={category.types}
    />
  );
}

function CategoryNotFound() {
  return (
    <div className="section container-page">
      <EmptyState
        title="Category not found"
        body="That category doesn't exist. Browse everything in the shop instead."
      />
    </div>
  );
}
