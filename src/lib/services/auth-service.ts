import { getSupabase, isSupabaseConfigured } from "../supabase/client";
import type { Profile } from "../supabase/types";

const LOCAL_USER_KEY = "an_authenticated_user";
const LOCAL_PROFILE_KEY = "an_user_profile";

export interface UserSession {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const authService = {
  async getSession(): Promise<UserSession | null> {
    const supabase = getSupabase();
    if (supabase) {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session?.user) return null;
      const user = session.user;
      return {
        id: user.id,
        email: user.email || "",
        firstName: user.user_metadata?.first_name,
        lastName: user.user_metadata?.last_name,
      };
    }

    // Local fallback
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (!error && data) return data as Profile;
    }

    try {
      const saved = localStorage.getItem(LOCAL_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }

    return {
      id: userId,
      email: "ada@atelier-noir.com",
      first_name: "Ada",
      last_name: "Lindqvist",
      display_name: "Ada Lindqvist",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();
      if (!error && data) return data as Profile;
    }

    const current = await this.getProfile(userId);
    const updated: Profile = {
      ...(current || {
        id: userId,
        email: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
      ...updates,
      updated_at: new Date().toISOString(),
    };
    try {
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  },

  async signIn(
    email: string,
    password?: string,
  ): Promise<{ user: UserSession | null; error?: string }> {
    const supabase = getSupabase();
    if (supabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { user: null, error: error.message };
      if (data.user) {
        const session: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          firstName: data.user.user_metadata?.first_name,
          lastName: data.user.user_metadata?.last_name,
        };
        return { user: session };
      }
    }

    // Offline / Demo authentication
    const demoUser: UserSession = {
      id: "usr_ada_lindqvist_01",
      email: email || "ada@atelier-noir.com",
      firstName: "Ada",
      lastName: "Lindqvist",
    };
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
    } catch {
      // ignore
    }
    return { user: demoUser };
  },

  async signUp(
    email: string,
    password?: string,
    firstName?: string,
    lastName?: string,
  ): Promise<{ user: UserSession | null; error?: string }> {
    const supabase = getSupabase();
    if (supabase && password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      if (error) return { user: null, error: error.message };
      if (data.user) {
        // Create profile record
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          first_name: firstName,
          last_name: lastName,
          display_name: [firstName, lastName].filter(Boolean).join(" ") || undefined,
        });

        const session: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          firstName,
          lastName,
        };
        return { user: session };
      }
    }

    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      email,
      firstName: firstName || "Customer",
      lastName: lastName || "",
    };
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(
        LOCAL_PROFILE_KEY,
        JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          first_name: firstName,
          last_name: lastName,
          display_name: [firstName, lastName].filter(Boolean).join(" "),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      );
    } catch {
      // ignore
    }
    return { user: newUser };
  },

  async signOut(): Promise<void> {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    try {
      localStorage.removeItem(LOCAL_USER_KEY);
      localStorage.removeItem(LOCAL_PROFILE_KEY);
    } catch {
      // ignore
    }
  },

  onAuthStateChange(callback: (user: UserSession | null) => void): () => void {
    const supabase = getSupabase();
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          callback({
            id: session.user.id,
            email: session.user.email || "",
            firstName: session.user.user_metadata?.first_name,
            lastName: session.user.user_metadata?.last_name,
          });
        } else {
          callback(null);
        }
      });
      return () => subscription.unsubscribe();
    }

    // Return no-op cleanup
    return () => {};
  },
};
