import { getSupabase } from "../supabase/client";
import { DESIGNS, PRODUCT_TYPES, type ProductTypeId } from "../catalog";
import type { CartLine } from "@/components/store/store";

const GUEST_CART_KEY = "an_guest_cart";
const GUEST_SAVED_KEY = "an_guest_saved";

export const cartService = {
  getGuestCart(): { cart: CartLine[]; saved: CartLine[] } {
    try {
      const cartRaw = localStorage.getItem(GUEST_CART_KEY);
      const savedRaw = localStorage.getItem(GUEST_SAVED_KEY);
      return {
        cart: cartRaw ? JSON.parse(cartRaw) : [],
        saved: savedRaw ? JSON.parse(savedRaw) : [],
      };
    } catch {
      return { cart: [], saved: [] };
    }
  },

  saveGuestCart(cart: CartLine[], saved: CartLine[]) {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
      localStorage.setItem(GUEST_SAVED_KEY, JSON.stringify(saved));
    } catch {
      // ignore
    }
  },

  /**
   * Server-side authoritative validation: Resolves real prices from catalog
   * and protects against client-tampered prices, negative quantities, or invalid blanks.
   */
  validateLine(line: Omit<CartLine, "id"> | CartLine): CartLine | null {
    if (!line || line.qty <= 0) return null;

    const productType = PRODUCT_TYPES.find((p) => p.id === line.productId);
    const design = DESIGNS.find((d) => d.slug === line.designSlug);

    if (!productType || !design) return null;

    const authoritativePrice = productType.price;
    const safeQty = Math.max(1, Math.min(99, Math.floor(line.qty)));
    const id = `${line.designSlug}-${line.productId}-${line.color}-${line.size ?? "one"}`;

    return {
      id,
      designSlug: design.slug,
      designName: design.name,
      productId: productType.id as ProductTypeId,
      productName: productType.name,
      color: line.color,
      colorValue: line.colorValue,
      size: line.size,
      price: authoritativePrice,
      qty: safeQty,
    };
  },

  async loadUserCart(userId: string): Promise<{ cart: CartLine[]; saved: CartLine[] }> {
    const supabase = getSupabase();
    if (supabase) {
      const { data: cartRecord } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .eq("status", "active")
        .single();

      if (cartRecord) {
        const { data: items } = await supabase
          .from("cart_items")
          .select("*")
          .eq("cart_id", cartRecord.id);

        if (items) {
          const cart: CartLine[] = [];
          const saved: CartLine[] = [];

          for (const item of items) {
            const validated = this.validateLine({
              designSlug: item.design_slug,
              designName: item.design_slug,
              productId: item.product_type_id as ProductTypeId,
              productName: item.product_type_id,
              color: item.color_name,
              colorValue: item.color_value,
              size: item.size || undefined,
              price: Number(item.unit_price_eur),
              qty: item.quantity,
            });

            if (validated) {
              if (item.is_saved_for_later) {
                saved.push(validated);
              } else {
                cart.push(validated);
              }
            }
          }

          return { cart, saved };
        }
      }
    }

    return this.getGuestCart();
  },

  async saveUserCart(userId: string, cart: CartLine[], saved: CartLine[]): Promise<void> {
    const supabase = getSupabase();
    if (supabase) {
      let { data: cartRecord } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .eq("status", "active")
        .single();

      if (!cartRecord) {
        const { data: newCart } = await supabase
          .from("carts")
          .insert({ user_id: userId, status: "active" })
          .select("id")
          .single();
        cartRecord = newCart;
      }

      if (cartRecord) {
        // Clear and rewrite items
        await supabase.from("cart_items").delete().eq("cart_id", cartRecord.id);

        const allItems = [
          ...cart.map((c) => ({
            cart_id: cartRecord.id,
            design_slug: c.designSlug,
            product_type_id: c.productId,
            color_name: c.color,
            color_value: c.colorValue,
            size: c.size || null,
            quantity: c.qty,
            unit_price_eur: c.price,
            is_saved_for_later: false,
          })),
          ...saved.map((s) => ({
            cart_id: cartRecord.id,
            design_slug: s.designSlug,
            product_type_id: s.productId,
            color_name: s.color,
            color_value: s.colorValue,
            size: s.size || null,
            quantity: s.qty,
            unit_price_eur: s.price,
            is_saved_for_later: true,
          })),
        ];

        if (allItems.length > 0) {
          await supabase.from("cart_items").insert(allItems);
        }
      }
    }

    // Always mirror to local
    this.saveGuestCart(cart, saved);
  },

  mergeCarts(guestCart: CartLine[], userCart: CartLine[]): CartLine[] {
    const map = new Map<string, CartLine>();
    for (const item of userCart) {
      map.set(item.id, { ...item });
    }
    for (const item of guestCart) {
      if (map.has(item.id)) {
        const existing = map.get(item.id)!;
        existing.qty = Math.min(99, existing.qty + item.qty);
      } else {
        map.set(item.id, { ...item });
      }
    }
    return Array.from(map.values());
  },
};
