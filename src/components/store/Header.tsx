import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, Heart, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "./store";
import { REGIONS, LANGUAGES, PRODUCT_TYPES, COLLECTIONS } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Shop", to: "/shop" as const },
  { label: "Designs", to: "/designs" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "New Drops", to: "/new" as const },
  { label: "Best Sellers", to: "/best-sellers" as const },
  { label: "Journal", to: "/blog" as const },
];

export function RegionSelector({ compact }: { compact?: boolean }) {
  const { region, setRegion, language, setLanguage } = useStore();
  return (
    <div className={cn("flex items-center gap-3", compact && "text-label")}>
      <label className="sr-only" htmlFor="region-select">
        Country and currency
      </label>
      <div className="relative">
        <select
          id="region-select"
          value={region.code}
          onChange={(e) => setRegion(e.target.value)}
          className="text-label h-11 min-w-11 cursor-pointer appearance-none border border-transparent bg-transparent pr-5 text-muted-foreground transition-colors hover:text-foreground focus-visible:border-ring"
        >
          {REGIONS.map((r) => (
            <option key={r.code} value={r.code} className="bg-background text-foreground">
              {r.country} · {r.currency}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-0 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <span className="h-3 w-px bg-border" aria-hidden="true" />
      <label className="sr-only" htmlFor="lang-select">
        Language
      </label>
      <div className="relative">
        <select
          id="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-label h-11 cursor-pointer appearance-none border border-transparent bg-transparent pr-5 text-muted-foreground transition-colors hover:text-foreground focus-visible:border-ring"
        >
          {LANGUAGES.map((l) => (
            <option key={l} className="bg-background text-foreground">
              {l}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-0 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

const MEGA = ["Shop", "Designs", "Collections"] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const { cartCount, setCartOpen, setSearchOpen, wishlist } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || !overHero || menuOpen || !!mega;

  return (
    <>
      <AnnouncementBar />
      <div className="hidden border-b border-border bg-background lg:block">
        <div className="container-page flex h-10 items-center justify-between">
          <p className="text-label text-muted-foreground">
            Made to order worldwide · Carbon-neutral delivery
          </p>
          <RegionSelector compact />
        </div>
      </div>

      <div onMouseLeave={() => setMega(null)} className="sticky top-0 z-50">
        <header
          className={cn(
            "w-full transition-colors duration-500 ease-[var(--ease-brand)]",
            solid ? "border-b border-border bg-background/92 backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div className="container-page grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-20">
            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="inline-flex size-11 items-center justify-center"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {NAV.map((item) => {
                const hasMega = (MEGA as readonly string[]).includes(item.label);
                return (
                  <div
                    key={item.to}
                    onMouseEnter={() => setMega(hasMega ? item.label : null)}
                    onFocus={() => setMega(hasMega ? item.label : null)}
                  >
                    <Link
                      to={item.to}
                      aria-expanded={hasMega ? mega === item.label : undefined}
                      className="text-label link-underline text-foreground/80 transition-colors hover:text-foreground"
                      activeProps={{ "data-active": "true", className: "text-foreground" }}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </nav>


          <Link
            to="/"
            className="justify-self-center text-center"
            aria-label="Atelier Noir — home"
          >
            <span className="font-[family-name:var(--font-display)] text-[0.95rem] font-medium uppercase tracking-[0.42em] lg:text-base">
              Atelier
            </span>
            <span className="block text-[0.5rem] uppercase tracking-[0.55em] text-gold">Noir</span>
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="inline-flex size-11 items-center justify-center transition-colors hover:text-gold"
            >
              <Search className="size-[18px]" />
            </button>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} saved`}
              className="relative hidden size-11 items-center justify-center transition-colors hover:text-gold sm:inline-flex"
            >
              <Heart className="size-[18px]" />
              {wishlist.length > 0 ? (
                <span className="absolute right-1.5 top-2 size-1.5 rounded-full bg-gold" />
              ) : null}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden size-11 items-center justify-center transition-colors hover:text-gold lg:inline-flex"
            >
              <User className="size-[18px]" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart, ${cartCount} items`}
              className="relative inline-flex size-11 items-center justify-center transition-colors hover:text-gold"
            >
              <ShoppingBag className="size-[18px]" />
              {cartCount > 0 ? (
                <span className="text-[10px] absolute -right-0.5 top-1.5 grid size-4 place-items-center rounded-full bg-gold font-medium text-background">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fade-in-soft fixed inset-0 top-16 z-40 overflow-y-auto bg-background lg:hidden">
          <nav className="container-page pb-16 pt-6" aria-label="Mobile">
            <ul className="divide-y divide-border border-y border-border">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-h2 flex min-h-16 items-center justify-between py-4"
                  >
                    {item.label}
                    <X className="size-4 -rotate-45 text-muted-foreground" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-label mt-10 text-muted-foreground">Shop by product</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {PRODUCT_TYPES.slice(0, 8).map((p) => (
                <Link
                  key={p.id}
                  to="/shop"
                  search={{ type: p.id }}
                  className="text-body-sm flex min-h-12 items-center border border-border px-4"
                >
                  {p.name}
                </Link>
              ))}
            </div>

            <p className="text-label mt-10 text-muted-foreground">Collections</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="text-label flex min-h-11 items-center border border-border px-4"
                >
                  {c.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <Button asChild variant="secondary" size="block">
                <Link to="/account">Account</Link>
              </Button>
              <Button asChild variant="secondary" size="block">
                <Link to="/wishlist">Wishlist</Link>
              </Button>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <RegionSelector />
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
