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

export interface Coupon {
  code: string;
  label: string;
  /** fraction off the subtotal, 0–1 */
  rate: number;
}

const COUPONS: Coupon[] = [
  { code: "ATELIER10", label: "10% off — welcome", rate: 0.1 },
  { code: "STUDIO20", label: "20% off — studio friends", rate: 0.2 },
];

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
  /** items parked for later — kept out of the totals */
  saved: CartLine[];
  saveForLater: (id: string) => void;
  moveToBag: (id: string) => void;
  removeSaved: (id: string) => void;
  /** line ids currently mutating, used for row-level loading states */
  pendingLines: string[];
  coupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  discount: number;
  recentlyViewed: string[];
  markViewed: (slug: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [regionCode, setRegionCode] = useState("EU");
  const [language, setLanguage] = useState("English");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<CartLine[]>([]);
  const [pendingLines, setPendingLines] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

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

  /** briefly flags a line so rows can show an updating state */
  const flag = useCallback((id: string) => {
    setPendingLines((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTimeout(() => setPendingLines((prev) => prev.filter((p) => p !== id)), 420);
  }, []);

  const cartTotal = cart.reduce((n, l) => n + l.qty * l.price, 0);
  const discount = coupon ? Math.round(cartTotal * coupon.rate * 100) / 100 : 0;

  const value = useMemo<StoreValue>(
    () => ({
      region,
      setRegion: setRegionCode,
      language,
      setLanguage,
      format,
      cart,
      addToCart,
      setQty: (id, qty) => {
        flag(id);
        setCart((prev) =>
          prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)),
        );
      },
      removeLine: (id) => setCart((prev) => prev.filter((l) => l.id !== id)),
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      wishlist,
      toggleWish: (slug) =>
        setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      saved,
      saveForLater: (id) =>
        setCart((prev) => {
          const line = prev.find((l) => l.id === id);
          if (line) setSaved((s) => (s.some((x) => x.id === id) ? s : [...s, line]));
          return prev.filter((l) => l.id !== id);
        }),
      moveToBag: (id) =>
        setSaved((prev) => {
          const line = prev.find((l) => l.id === id);
          if (line)
            setCart((c) =>
              c.some((x) => x.id === id)
                ? c.map((x) => (x.id === id ? { ...x, qty: x.qty + line.qty } : x))
                : [...c, line],
            );
          return prev.filter((l) => l.id !== id);
        }),
      removeSaved: (id) => setSaved((prev) => prev.filter((l) => l.id !== id)),
      pendingLines,
      coupon,
      couponError,
      applyCoupon: (code) => {
        const found = COUPONS.find((c) => c.code === code.trim().toUpperCase());
        if (!found) {
          setCoupon(null);
          setCouponError("That code isn't recognised. Check the spelling and try again.");
          return false;
        }
        setCoupon(found);
        setCouponError(null);
        return true;
      },
      clearCoupon: () => {
        setCoupon(null);
        setCouponError(null);
      },
      discount,
      recentlyViewed,
      markViewed: (slug) =>
        setRecentlyViewed((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 8)),
    }),
    [
      region,
      language,
      format,
      cart,
      cartTotal,
      addToCart,
      cartOpen,
      searchOpen,
      wishlist,
      saved,
      pendingLines,
      coupon,
      couponError,
      discount,
      recentlyViewed,
      flag,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
