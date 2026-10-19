import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertTriangle,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Heart,
  Truck,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { Field } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { authService } from "@/lib/services/auth-service";
import { AccountLayout, type AccountTab } from "@/components/store/account/AccountLayout";
import { cn } from "@/lib/utils";

export interface AccountSearch {
  tab?: AccountTab;
  orderId?: string;
}

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>): AccountSearch => {
    return {
      tab: typeof search.tab === "string" ? (search.tab as AccountTab) : undefined,
      orderId: typeof search.orderId === "string" ? search.orderId : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Customer Account | Atelier Noir" },
      {
        name: "description",
        content:
          "Manage your bespoke orders, curated wishlist, delivery addresses, and studio preferences.",
      },
      { property: "og:title", content: "Customer Account | Atelier Noir" },
      {
        property: "og:description",
        content:
          "Manage your bespoke orders, curated wishlist, delivery addresses, and studio preferences.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, refreshUser } = useStore();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("alex.rivera@example.com");
  const [password, setPassword] = useState("Password123!");
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Rivera");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (user) {
    return <AccountLayout initialTab={search.tab || "Overview"} initialOrderId={search.orderId} />;
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setAuthLoading(true);

    try {
      if (authMode === "signin") {
        const { user: session, error } = await authService.signIn(email, password);
        if (error || !session) {
          setErrorMsg("Please check your email and password.");
          toast.error("Sign in failed. Check your credentials.");
        } else {
          toast.success("Welcome back to your studio account.");
          await refreshUser();
        }
      } else {
        if (!agreeTerms) {
          setErrorMsg("Please accept the Terms & Conditions.");
          setAuthLoading(false);
          return;
        }

        const { user: session, error } = await authService.signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
        });

        if (error || !session) {
          setErrorMsg(error?.message || "Registration failed.");
          toast.error("Account creation failed.");
        } else {
          toast.success("Account created successfully. Welcome to Atelier Noir.");
          await refreshUser();
        }
      }
    } finally {
      setAuthLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Customer Account"
        title="Studio Account"
        intro="Sign in to follow orders, manage delivery addresses, and curate your wishlist."
        trail={[{ label: "Account" }]}
      />

      <section className="section container-narrow">
        <div className="border border-border bg-surface p-6 sm:p-10 space-y-8">
          {/* Auth Tab Switcher */}
          <div className="flex border-b border-border pb-4 gap-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                setErrorMsg(null);
              }}
              className={cn(
                "text-label text-xs uppercase tracking-widest pb-2 transition-all",
                authMode === "signin"
                  ? "border-b-2 border-gold text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setErrorMsg(null);
              }}
              className={cn(
                "text-label text-xs uppercase tracking-widest pb-2 transition-all",
                authMode === "signup"
                  ? "border-b-2 border-gold text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Create Account
            </button>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-3 border border-destructive/50 bg-destructive/10 p-4 text-destructive text-body-sm animate-in fade-in">
              <AlertTriangle className="size-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleAuth}>
            {authMode === "signup" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ada"
                  required
                />
                <Field
                  label="Last Name *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Lindqvist"
                  required
                />
              </div>
            ) : null}

            <Field
              label="Email Address *"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-label text-muted-foreground">Password *</label>
                {authMode === "signin" && (
                  <Link
                    to="/forgot-password"
                    className="text-label text-xs uppercase tracking-wider text-gold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-body-sm h-12 w-full border border-border bg-transparent px-4 transition-colors placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none"
              />
            </div>

            {authMode === "signup" && (
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="account-agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 size-4 accent-gold border-border"
                  required
                />
                <label
                  htmlFor="account-agree-terms"
                  className="text-body-sm text-muted-foreground leading-snug cursor-pointer"
                >
                  I agree to the Terms & Conditions and Privacy Policy.
                </label>
              </div>
            )}

            <Button
              size="block"
              type="submit"
              loading={authLoading}
              className="uppercase tracking-wider text-xs h-12 mt-4"
            >
              {authMode === "signin" ? "Sign In to Account" : "Create Account"}
            </Button>
          </form>

          {/* Quick shortcuts */}
          <div className="mt-8 border-t border-border pt-6 flex flex-wrap items-center justify-between gap-3 text-meta text-muted-foreground">
            <div className="flex items-center gap-4">
              <Link
                to="/orders"
                className="hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <Truck className="size-3.5" /> Track Order
              </Link>
              <Link
                to="/wishlist"
                className="hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <Heart className="size-3.5" /> Wishlist
              </Link>
            </div>
            <Link to="/contact" className="hover:text-foreground link-underline">
              Need assistance?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
