import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useStore } from "./store";
import { Mockup } from "./Mockup";
import { ARTICLES, COLLECTIONS, DESIGNS, PRODUCT_TYPES, productType } from "@/lib/catalog";

const RECENT_KEY = "an-recent-searches";
const RECENT_FALLBACK = ["Midnight Lion", "Hoodie", "Poster"];
const POPULAR = ["New drops", "Tote bag", "Nocturne", "Kids", "Limited"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, format } = useStore();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>(RECENT_FALLBACK);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  const remember = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setRecent((prev) => {
      const next = [v, ...prev.filter((r) => r.toLowerCase() !== v.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    return;
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const term = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return null;
    return {
      designs: DESIGNS.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.collection.toLowerCase().includes(term) ||
          d.story.toLowerCase().includes(term),
      ),
      products: PRODUCT_TYPES.filter(
        (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
      ),
      collections: COLLECTIONS.filter((c) => c.name.toLowerCase().includes(term)),
      articles: ARTICLES.filter((a) => a.title.toLowerCase().includes(term)),
    };
  }, [term]);

  if (!searchOpen) return null;
  const empty =
    results &&
    !results.designs.length &&
    !results.products.length &&
    !results.collections.length &&
    !results.articles.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fade-in-soft fixed inset-0 z-[60] flex flex-col bg-background/97 backdrop-blur-xl"
    >
      <div className="container-page flex h-16 items-center justify-between border-b border-border lg:h-20">
        <span className="text-label text-muted-foreground">Search</span>
        <button
          type="button"
          onClick={() => setSearchOpen(false)}
          className="inline-flex size-11 items-center justify-center hover:text-gold"
          aria-label="Close search"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="container-page border-b border-border py-6">
        <div className="flex items-center gap-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="global-search" className="sr-only">
            Search designs, products, collections and journal
          </label>
          <input
            id="global-search"
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") remember(q);
            }}
            placeholder="Search designs, products, collections…"
            className="text-h2 w-full border-0 bg-transparent outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="container-page flex-1 overflow-y-auto py-10">
        {!term ? (
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div className="space-y-10">
              <div>
                <h2 className="text-label text-muted-foreground">Recent</h2>
                <ul className="mt-4 space-y-2">
                  {recent.map((r) => (
                    <li key={r}>
                      <button
                        type="button"
                        onClick={() => setQ(r)}
                        className="text-body flex min-h-11 items-center gap-2 hover:text-gold"
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-label text-muted-foreground">Popular</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setQ(p)}
                      className="text-label flex min-h-11 items-center border border-border px-4 hover:border-foreground"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-label text-muted-foreground">Suggested designs</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {DESIGNS.slice(0, 4).map((d) => (
                  <Link
                    key={d.slug}
                    to="/designs/$slug"
                    params={{ slug: d.slug }}
                    onClick={() => setSearchOpen(false)}
                    className="group border border-border"
                  >
                    <Mockup design={d} productId="tshirt" />
                    <p className="text-body-sm truncate px-3 py-3">{d.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : empty ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <h2 className="text-h2">No results for “{q}”</h2>
            <p className="text-body mt-4 text-muted-foreground">
              Try a design name, a product type, or browse everything in the shop.
            </p>
            <Link
              to="/shop"
              onClick={() => setSearchOpen(false)}
              className="text-label link-underline mt-8 inline-block text-gold"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-label text-muted-foreground">
                Designs ({results!.designs.length})
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {results!.designs.map((d) => (
                  <Link
                    key={d.slug}
                    to="/designs/$slug"
                    params={{ slug: d.slug }}
                    onClick={() => setSearchOpen(false)}
                    className="border border-border"
                  >
                    <Mockup design={d} productId="tshirt" />
                    <div className="px-3 py-3">
                      <p className="text-body-sm truncate">{d.name}</p>
                      <p className="text-meta">{d.products.length} products</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="text-label text-muted-foreground">Products</h2>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {results!.products.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/shop"
                        search={{ type: p.id }}
                        onClick={() => setSearchOpen(false)}
                        className="flex min-h-14 items-center justify-between gap-4"
                      >
                        <span className="text-body-sm">{p.name}</span>
                        <span className="text-meta">from {format(productType(p.id).price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-label text-muted-foreground">Collections & journal</h2>
                <ul className="mt-4 space-y-3">
                  {results!.collections.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/collections/$slug"
                        params={{ slug: c.slug }}
                        onClick={() => setSearchOpen(false)}
                        className="text-body-sm inline-flex items-center gap-1 hover:text-gold"
                      >
                        {c.name} <ArrowUpRight className="size-3" />
                      </Link>
                    </li>
                  ))}
                  {results!.articles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: a.slug }}
                        onClick={() => setSearchOpen(false)}
                        className="text-body-sm inline-flex items-center gap-1 hover:text-gold"
                      >
                        {a.title} <ArrowUpRight className="size-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
