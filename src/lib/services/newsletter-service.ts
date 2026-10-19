import { getSupabase } from "../supabase/client";

const LOCAL_NEWSLETTER_KEY = "an_newsletter_subscribers";

export const newsletterService = {
  async subscribe(
    email: string,
    source = "store_footer",
  ): Promise<{ success: boolean; message: string; isDuplicate?: boolean }> {
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const supabase = getSupabase();
    if (supabase) {
      const { data: existing } = await supabase
        .from("newsletter_subscriptions")
        .select("id")
        .eq("email", trimmed)
        .single();

      if (existing) {
        return {
          success: true,
          isDuplicate: true,
          message: "You are already subscribed to the studio letter.",
        };
      }

      const { error } = await supabase.from("newsletter_subscriptions").insert({
        email: trimmed,
        source,
      });

      if (error && error.code !== "23505") {
        // 23505 is unique violation in postgres
        return { success: false, message: error.message };
      }
    }

    // Local persistence mirror
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(LOCAL_NEWSLETTER_KEY) || "[]");
      if (stored.includes(trimmed)) {
        return {
          success: true,
          isDuplicate: true,
          message: "You are already subscribed to the studio letter.",
        };
      }
      stored.push(trimmed);
      localStorage.setItem(LOCAL_NEWSLETTER_KEY, JSON.stringify(stored));
    } catch {
      // ignore
    }

    return {
      success: true,
      message: "You're on the list. Welcome to the studio.",
    };
  },
};
