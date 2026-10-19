import { getSupabase } from "../supabase/client";

const GUEST_WISHLIST_KEY = "an_guest_wishlist";

export const wishlistService = {
  getGuestWishlist(): string[] {
    try {
      const raw = localStorage.getItem(GUEST_WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveGuestWishlist(slugs: string[]) {
    try {
      localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(slugs));
    } catch {
      // ignore
    }
  },

  async loadUserWishlist(userId: string): Promise<string[]> {
    const supabase = getSupabase();
    if (supabase) {
      const { data: wishlistRecord } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (wishlistRecord) {
        const { data: items } = await supabase
          .from("wishlist_items")
          .select("design_slug")
          .eq("wishlist_id", wishlistRecord.id);

        if (items) {
          return items.map((i) => i.design_slug);
        }
      }
    }

    return this.getGuestWishlist();
  },

  async saveUserWishlist(userId: string, slugs: string[]): Promise<void> {
    const supabase = getSupabase();
    if (supabase) {
      let { data: wishlistRecord } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!wishlistRecord) {
        const { data: newWishlist } = await supabase
          .from("wishlists")
          .insert({ user_id: userId })
          .select("id")
          .single();
        wishlistRecord = newWishlist;
      }

      if (wishlistRecord) {
        await supabase.from("wishlist_items").delete().eq("wishlist_id", wishlistRecord.id);

        const items = slugs.map((slug) => ({
          wishlist_id: wishlistRecord.id,
          design_slug: slug,
        }));

        if (items.length > 0) {
          await supabase.from("wishlist_items").insert(items);
        }
      }
    }

    this.saveGuestWishlist(slugs);
  },

  mergeWishlists(guestWishlist: string[], userWishlist: string[]): string[] {
    return Array.from(new Set([...userWishlist, ...guestWishlist]));
  },
};
