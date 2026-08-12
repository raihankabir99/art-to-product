import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { REGIONS, type ProductTypeId, type Region } from "@/lib/catalog";

export interface CartLine {
  id: string;
  designSlug: string;
  designName: string;
  productId: ProductTypeId;
  productName: string;
  color: string;
  colorValue: string;
  size?: string;
  price: number;
  qty: number;
}

interface StoreValue {
  region: Region;
  setRegion: (code: string) => void;
  language: string;
  setLanguage: (l: string) => void;
  format: (eur: number) => string;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, "id">) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [regionCode, setRegionCode] = useState("EU");
  const [language, setLanguage] = useState("English");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const region = (REGIONS.find((r) => r.code === regionCode) ?? REGIONS[0]) as Region;

  const format = useCallback(
    (eur: number) => {
      const v = eur * region.rate;
      const rounded = region.rate > 5 ? Math.round(v) : Math.round(v * 100) / 100;
      return `${region.symbol}${rounded.toLocaleString("en-GB", {
        minimumFractionDigits: region.rate > 5 ? 0 : 2,
        maximumFractionDigits: region.rate > 5 ? 0 : 2,
      })}`;
    },
    [region],
  );

  const addToCart = useCallback((line: Omit<CartLine, "id">) => {
    const id = `${line.designSlug}-${line.productId}-${line.color}-${line.size ?? "one"}`;
    setCart((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + line.qty } : l));
      return [...prev, { ...line, id }];
    });
    setCartOpen(true);
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      region,
      setRegion: setRegionCode,
      language,
      setLanguage,
      format,
      cart,
      addToCart,
      setQty: (id, qty) =>
        setCart((prev) =>
          prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)),
        ),
      removeLine: (id) => setCart((prev) => prev.filter((l) => l.id !== id)),
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal: cart.reduce((n, l) => n + l.qty * l.price, 0),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      wishlist,
      toggleWish: (slug) =>
        setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    }),
    [region, language, format, cart, addToCart, cartOpen, searchOpen, wishlist],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
