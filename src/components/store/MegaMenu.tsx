import { Link } from "@tanstack/react-router";
import { COLLECTIONS, DESIGNS, PRODUCT_TYPES, designBySlug, productType } from "@/lib/catalog";
import type { ProductTypeId } from "@/lib/catalog";
import { Mockup } from "./Mockup";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-label text-muted-foreground">{children}</h3>;
}

function MenuLink({
  children,
  ...rest
}: { children: React.ReactNode } & Record<string, unknown>) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link
      {...(rest as any)}
      className="text-body-sm link-underline inline-block py-1 text-foreground/85 hover:text-foreground"
    >
      {children}
    </Link>
  );
}

const GROUPS: { title: string; ids: ProductTypeId[] }[] = [
  { title: "Apparel", ids: ["tshirt", "hoodie", "sweatshirt", "kids-tee", "onesie"] },
  { title: "Accessories", ids: ["tote", "cap", "phonecase"] },
  { title: "Home & Lifestyle", ids: ["mug", "poster", "cushion", "notebook", "sticker"] },
];

export function ShopMenu() {
  const featured = DESIGNS[1] ?? DESIGNS[0]!;
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]">
      {GROUPS.map((g) => (
        <div key={g.title}>
          <ColumnHeading>{g.title}</ColumnHeading>
          <ul className="mt-4 space-y-1.5">
            {g.ids.map((id) => (
              <li key={id}>
                <MenuLink to="/shop" search={{ type: id }}>
                  {productType(id).name}
                </MenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="lg:border-l lg:border-border lg:pl-10">
        <ColumnHeading>Featured</ColumnHeading>
        <ul className="mt-4 space-y-1.5">
          <li>
            <MenuLink to="/new">New Drops</MenuLink>
          </li>
          <li>
            <MenuLink to="/best-sellers">Best Sellers</MenuLink>
          </li>
          <li>
            <MenuLink to="/designs">Trending</MenuLink>
          </li>
        </ul>
        <Link
          to="/designs/$slug"
          params={{ slug: featured.slug }}
          className="mt-6 block border border-border bg-surface transition-colors hover:border-border-strong"
        >
          <div className="aspect-[4/3]">
            <Mockup design={featured} productId={featured.products[0] ?? "tshirt"} />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 px-4 py-3">
            <span className="text-body-sm truncate">{featured.name}</span>
            <span className="text-meta shrink-0 text-gold">View →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function DesignsMenu() {
  const spotlight = designBySlug("midnight-lion") ?? DESIGNS[0]!;
  const names = spotlight.products.slice(0, 5).map((p) => productType(p).name);
  const rest = PRODUCT_TYPES.length - names.length;

  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[240px_1fr]">
      <div>
        <ColumnHeading>Designs</ColumnHeading>
        <ul className="mt-4 space-y-1.5">
          <li>
            <MenuLink to="/designs">All Designs</MenuLink>
          </li>
          <li>
            <MenuLink to="/new">New Designs</MenuLink>
          </li>
          <li>
            <MenuLink to="/best-sellers">Trending Designs</MenuLink>
          </li>
          <li>
            <MenuLink to="/best-sellers">Best Sellers</MenuLink>
          </li>
          <li>
            <MenuLink to="/collections">Featured Collections</MenuLink>
          </li>
        </ul>
      </div>

      <div className="grid gap-8 border-border lg:grid-cols-[320px_1fr] lg:border-l lg:pl-10">
        <Link
          to="/designs/$slug"
          params={{ slug: spotlight.slug }}
          className="block border border-border bg-surface"
        >
          <div className="aspect-[4/3]">
            <Mockup design={spotlight} productId="tshirt" />
          </div>
        </Link>
        <div>
          <p className="text-label text-gold">One design, many products</p>
          <h3 className="text-h3 mt-3">{spotlight.name}</h3>
          <p className="text-body-sm mt-3 text-muted-foreground">Available on</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {names.map((n) => (
              <li key={n} className="text-label border border-border px-3 py-1.5">
                {n}
              </li>
            ))}
            {rest > 0 ? (
              <li className="text-label border border-border px-3 py-1.5 text-muted-foreground">
                +{rest} more
              </li>
            ) : null}
          </ul>
          <Link
            to="/designs/$slug"
            params={{ slug: spotlight.slug }}
            className="text-label mt-6 inline-flex h-11 items-center border border-primary bg-primary px-6 text-primary-foreground"
          >
            Explore design
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CollectionsMenu() {
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[240px_1fr]">
      <div>
        <ColumnHeading>Collections</ColumnHeading>
        <ul className="mt-4 space-y-1.5">
          <li>
            <MenuLink to="/collections">All Collections</MenuLink>
          </li>
          <li>
            <MenuLink to="/new">New Collection</MenuLink>
          </li>
        </ul>
      </div>
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {COLLECTIONS.map((c) => {
          const d = designBySlug(c.designs[0]!) ?? DESIGNS[0]!;
          return (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="bg-background p-4 transition-colors hover:bg-surface"
            >
              <div className="aspect-[4/3] border border-border">
                <Mockup design={d} productId="poster" />
              </div>
              <p className="text-h4 mt-3">{c.name}</p>
              <p className="text-meta mt-1">{c.tagline}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
