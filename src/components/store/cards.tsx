import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Mockup } from "./Mockup";
import { useStore } from "./store";
import { productType, type Design, type ProductTypeId } from "@/lib/catalog";

export function WishlistButton({
  slug,
  className,
  label,
}: {
  slug: string;
  className?: string | undefined;
  label?: string | undefined;
}) {
  const { wishlist, toggleWish } = useStore();
  const active = wishlist.includes(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleWish(slug);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${slug} from wishlist` : `Save ${slug} to wishlist`}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:border-foreground",
        active && "border-gold text-gold",
        className,
      )}
    >
      <Heart className="size-4" fill={active ? "currentColor" : "none"} aria-hidden="true" />
      {label ? <span className="text-label pr-1">{active ? "Saved" : label}</span> : null}
    </button>
  );
}

export function Price({
  value,
  compareAt,
  className,
}: {
  value: number;
  compareAt?: number | undefined;
  className?: string | undefined;
}) {
  const { format } = useStore();
  return (
    <span className={cn("text-price inline-flex items-baseline gap-2", className)}>
      {format(value)}
      {compareAt ? (
        <>
          <span className="text-muted-foreground line-through opacity-70">{format(compareAt)}</span>
          <span className="sr-only">reduced from {format(compareAt)}</span>
        </>
      ) : null}
    </span>
  );
}

export function ProductCard({
  design,
  productId,
  className,
}: {
  design: Design;
  productId: ProductTypeId;
  className?: string | undefined;
}) {
  const type = productType(productId);
  const [hover, setHover] = useState(false);
  const alt = type.colors[1] ?? type.colors[0];
  const shown = hover && type.colors.length > 1 ? alt : type.colors[0];
  const badge = design.badges[0];

  return (
    <article
      className={cn("group relative flex flex-col", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden border border-border">
        <Link
          to="/designs/$slug"
          params={{ slug: design.slug }}
          search={{ product: productId }}
          className="block"
        >
          <span className="sr-only">
            {design.name} {type.name}
          </span>
          <Mockup
            design={design}
            productId={productId}
            colorValue={shown?.value}
            tone={shown?.tone}
            className="transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02]"
          />
        </Link>

        {badge ? (
          <Badge
            variant={badge === "Sale" ? "sale" : badge === "Limited" ? "gold" : "default"}
            className="absolute left-3 top-3"
          >
            {badge}
          </Badge>
        ) : null}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <WishlistButton slug={design.slug} />
        </div>

        <Link
          to="/designs/$slug"
          params={{ slug: design.slug }}
          search={{ product: productId }}
          className="absolute inset-x-0 bottom-0 flex min-h-12 translate-y-full items-center justify-center gap-2 bg-background/90 text-label backdrop-blur transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-y-0 group-focus-within:translate-y-0 max-md:hidden"
        >
          <Plus className="size-4" aria-hidden="true" /> Quick view
        </Link>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pt-4">
        <div className="min-w-0">
          <h3 className="text-h4 truncate">{type.name}</h3>
          <Link
            to="/designs/$slug"
            params={{ slug: design.slug }}
            className="text-meta link-underline mt-1 inline-block"
          >
            {design.name}
          </Link>
        </div>
        <Price value={type.price} compareAt={type.compareAt} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        {type.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="size-3 rounded-full border border-border-strong"
            style={{ backgroundColor: c.value }}
          />
        ))}
        <span className="sr-only">
          Available in {type.colors.map((c) => c.name).join(", ")}
        </span>
        <span className="text-meta ml-auto">{type.category}</span>
      </div>
    </article>
  );
}

export function DesignCard({ design, className }: { design: Design; className?: string | undefined }) {
  const names = design.products.slice(0, 4).map((p) => productType(p).name);
  const rest = design.products.length - names.length;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        to="/designs/$slug"
        params={{ slug: design.slug }}
        className="relative block overflow-hidden border border-border bg-surface"
      >
        <div className="aspect-[4/5] w-full">
          <Mockup design={design} productId={design.products[0] ?? "tshirt"} />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-background/85 px-4 py-3 backdrop-blur">
          <span className="text-label">{design.products.length} products</span>
          <span className="text-label text-gold">Explore design →</span>
        </div>
      </Link>

      <div className="pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
          <h3 className="text-h3 truncate">{design.name}</h3>
          <span className="text-meta shrink-0">{design.collection}</span>
        </div>
        <p className="text-meta mt-2">
          Available on {names.join(" · ")}
          {rest > 0 ? ` · +${rest} more` : ""}
        </p>
      </div>
    </article>
  );
}

export function CollectionCard({
  name,
  tagline,
  count,
  slug,
  design,
}: {
  name: string;
  tagline: string;
  count: number;
  slug: string;
  design: Design;
}) {
  return (
    <Link
      to="/collections/$slug"
      params={{ slug }}
      className="group relative block overflow-hidden border border-border"
    >
      <div className="aspect-[3/2] w-full overflow-hidden">
        <Mockup
          design={design}
          productId={design.products[0] ?? "tshirt"}
          className="h-full transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
        />
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-border p-5">
        <div className="min-w-0">
          <h3 className="text-h3">{name}</h3>
          <p className="text-meta mt-1 truncate">{tagline}</p>
        </div>
        <span className="text-label shrink-0 text-muted-foreground">{count} designs</span>
      </div>
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="shimmer aspect-[4/5] w-full" />
      <div className="shimmer h-4 w-2/3" />
      <div className="shimmer h-3 w-1/3" />
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center border border-dashed border-border px-6 py-20 text-center">
      <h3 className="text-h3">{title}</h3>
      <p className="text-body mt-3 max-w-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}
