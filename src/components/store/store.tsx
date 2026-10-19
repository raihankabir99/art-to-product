import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { REGIONS, type ProductTypeId, type Region } from "@/lib/catalog";
import { cartService } from "@/lib/services/cart-service";
import { wishlistService } from "@/lib/services/wishlist-service";
import { authService, type UserSession } from "@/lib/services/auth-service";

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
  rate?: number;
  fixedEur?: number;
}

const COUPONS: Coupon[] = [
  { code: "SUMMER10", label: "10% off — Summer Atelier", rate: 0.1 },
  { code: "ZOAL10", label: "10% off — ZOAL Welcome", rate: 0.1 },
  { code: "ATELIER10", label: "10% off — welcome", rate: 0.1 },
  { code: "STUDIO20", label: "20% off — studio friends", rate: 0.2 },
  { code: "WELCOME10", label: "€10 off — first order", fixedEur: 10 },
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
  undoRemove: () => void;
  clearCart: () => void;
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
  user: UserSession | null;
  refreshUser: () => Promise<void>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [regionCode, setRegionCode] = useState("EU");
  const [language, setLanguage] = useState("English");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<CartLine[]>([]);
  const [lastRemoved, setLastRemoved] = useState<CartLine | null>(null);
  const [pendingLines, setPendingLines] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [user, setUser] = useState<UserSession | null>(null);

  const isHydratedRef = useRef(false);
  const region = (REGIONS.find((r) => r.code === regionCode) ?? REGIONS[0]) as Region;

  // Initialize auth session and persistent data on client mount
  useEffect(() => {
    const guestCartData = cartService.getGuestCart();
    const guestWishlistData = wishlistService.getGuestWishlist();

    authService.getSession().then((session) => {
      setUser(session);
      if (session) {
        // Load and merge user cart and wishlist
        cartService.loadUserCart(session.id).then(({ cart: userCart, saved: userSaved }) => {
          const mergedCart = cartService.mergeCarts(guestCartData.cart, userCart);
          const mergedSaved = [
            ...guestCartData.saved,
            ...userSaved.filter((u) => !guestCartData.saved.some((g) => g.id === u.id)),
          ];
          setCart(mergedCart);
          setSaved(mergedSaved);
          isHydratedRef.current = true;
          cartService.saveUserCart(session.id, mergedCart, mergedSaved);
        });
        wishlistService.loadUserWishlist(session.id).then((userWishlist) => {
          const mergedWishlist = wishlistService.mergeWishlists(guestWishlistData, userWishlist);
          setWishlist(mergedWishlist);
          wishlistService.saveUserWishlist(session.id, mergedWishlist);
        });
      } else {
        setCart(guestCartData.cart);
        setSaved(guestCartData.saved);
        setWishlist(guestWishlistData);
        isHydratedRef.current = true;
      }
    });

    const unsubscribe = authService.onAuthStateChange((newUser) => {
      setUser(newUser);
      if (newUser) {
        cartService.loadUserCart(newUser.id).then(({ cart: userCart, saved: userSaved }) => {
          setCart((curr) => cartService.mergeCarts(curr, userCart));
          setSaved(userSaved);
        });
        wishlistService.loadUserWishlist(newUser.id).then((userWishlist) => {
          setWishlist((curr) => wishlistService.mergeWishlists(curr, userWishlist));
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Save cart changes once hydrated
  useEffect(() => {
    if (!isHydratedRef.current) return;
    if (user) {
      cartService.saveUserCart(user.id, cart, saved);
    } else {
      cartService.saveGuestCart(cart, saved);
    }
  }, [cart, saved, user]);

  // Save wishlist changes once hydrated
  useEffect(() => {
    if (!isHydratedRef.current) return;
    if (user) {
      wishlistService.saveUserWishlist(user.id, wishlist);
    } else {
      wishlistService.saveGuestWishlist(wishlist);
    }
  }, [wishlist, user]);

  const refreshUser = useCallback(async () => {
    const session = await authService.getSession();
    setUser(session);
  }, []);

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
    const validated = cartService.validateLine(line);
    if (!validated) return;

    setCart((prev) => {
      const existing = prev.find((l) => l.id === validated.id);
      if (existing) {
        return prev.map((l) =>
          l.id === validated.id ? { ...l, qty: Math.min(99, l.qty + validated.qty) } : l,
        );
      }
      return [...prev, validated];
    });
    setCartOpen(true);
  }, []);

  /** briefly flags a line so rows can show an updating state */
  const flag = useCallback((id: string) => {
    setPendingLines((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTimeout(() => setPendingLines((prev) => prev.filter((p) => p !== id)), 420);
  }, []);

  const setQty = useCallback(
    (id: string, qty: number) => {
      flag(id);
      setCart((prev) =>
        prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)),
      );
    },
    [flag],
  );

  const removeLine = useCallback((id: string) => {
    setCart((prev) => {
      const item = prev.find((l) => l.id === id);
      if (item) setLastRemoved(item);
      return prev.filter((l) => l.id !== id);
    });
  }, []);

  const undoRemove = useCallback(() => {
    if (!lastRemoved) return;
    setCart((prev) => (prev.some((l) => l.id === lastRemoved.id) ? prev : [...prev, lastRemoved]));
    setLastRemoved(null);
  }, [lastRemoved]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWish = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const saveForLater = useCallback((id: string) => {
    setCart((prev) => {
      const line = prev.find((l) => l.id === id);
      if (line) setSaved((s) => (s.some((x) => x.id === id) ? s : [...s, line]));
      return prev.filter((l) => l.id !== id);
    });
  }, []);

  const moveToBag = useCallback((id: string) => {
    setSaved((prev) => {
      const line = prev.find((l) => l.id === id);
      if (line)
        setCart((c) =>
          c.some((x) => x.id === id)
            ? c.map((x) => (x.id === id ? { ...x, qty: x.qty + line.qty } : x))
            : [...c, line],
        );
      return prev.filter((l) => l.id !== id);
    });
  }, []);

  const removeSaved = useCallback((id: string) => {
    setSaved((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const found = COUPONS.find((c) => c.code === code.trim().toUpperCase());
    if (!found) {
      setCoupon(null);
      setCouponError("That code isn't recognised. Check the spelling and try again.");
      return false;
    }
    setCoupon(found);
    setCouponError(null);
    return true;
  }, []);

  const clearCoupon = useCallback(() => {
    setCoupon(null);
    setCouponError(null);
  }, []);

  const markViewed = useCallback((slug: string) => {
    setRecentlyViewed((prev) => {
      if (prev[0] === slug) return prev;
      return [slug, ...prev.filter((s) => s !== slug)].slice(0, 8);
    });
  }, []);

  const cartTotal = cart.reduce((n, l) => n + l.qty * l.price, 0);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const discount = coupon
    ? coupon.fixedEur
      ? Math.min(cartTotal, coupon.fixedEur)
      : Math.round(cartTotal * (coupon.rate ?? 0) * 100) / 100
    : 0;

  const value = useMemo<StoreValue>(
    () => ({
      region,
      setRegion: setRegionCode,
      language,
      setLanguage,
      format,
      cart,
      addToCart,
      setQty,
      removeLine,
      undoRemove,
      clearCart,
      cartCount,
      cartTotal,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      wishlist,
      toggleWish,
      saved,
      saveForLater,
      moveToBag,
      removeSaved,
      pendingLines,
      coupon,
      couponError,
      applyCoupon,
      clearCoupon,
      discount,
      recentlyViewed,
      markViewed,
      user,
      refreshUser,
    }),
    [
      region,
      language,
      format,
      cart,
      cartTotal,
      cartCount,
      addToCart,
      setQty,
      removeLine,
      undoRemove,
      clearCart,
      cartOpen,
      searchOpen,
      wishlist,
      toggleWish,
      saved,
      saveForLater,
      moveToBag,
      removeSaved,
      pendingLines,
      coupon,
      couponError,
      applyCoupon,
      clearCoupon,
      discount,
      recentlyViewed,
      markViewed,
      user,
      refreshUser,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
