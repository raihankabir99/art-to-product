import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Check, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { PageHero } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import { authService } from "@/lib/services/auth-service";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { user, refreshUser } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, show quick dashboard access
  if (user) {
    return (
      <>
        <PageHero
          eyebrow="Authentication"
          title="Already Signed In"
          intro={`You are currently signed in as ${user.email}.`}
          trail={[{ label: "Account", to: "/account" }, { label: "Sign In" }]}
        />
        <section className="section container-narrow text-center space-y-6">
          <div className="border border-border bg-surface p-8 space-y-4">
            <div className="grid size-12 place-items-center border border-gold bg-gold/10 text-gold mx-auto font-mono font-semibold">
              {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-h3 font-medium">Welcome back, {user.firstName || user.email}</h2>
            <p className="text-body-sm text-muted-foreground">
              Your session is active. Access your orders, saved addresses, and studio preferences.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild className="uppercase tracking-wider text-xs">
                <Link to="/account">Go to Customer Account</Link>
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  await authService.signOut();
                  await refreshUser();
                  toast.info("Signed out.");
                }}
                className="uppercase tracking-wider text-xs"
              >
                Sign In With Another Account
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form validation
    if (!email || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please check your email format.");
      return;
    }

    setLoading(true);

    try {
      const { user: authedUser, error } = await authService.signIn(email, password);

      if (error || !authedUser) {
        setErrorMessage("Please check your email and password.");
        toast.error("Sign in failed. Please check credentials.");
        return;
      }

      await refreshUser();
      toast.success("Welcome back to Atelier Noir.");
      navigate({ to: "/account" });
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "Google" | "Apple") => {
    setLoading(true);
    setTimeout(async () => {
      // Mock social auth for demo
      await authService.signIn("alex.rivera@example.com", "Password123!");
      await refreshUser();
      setLoading(false);
      toast.success(`Signed in with ${provider}.`);
      navigate({ to: "/account" });
    }, 600);
  };

  return (
    <>
      <PageHero
        eyebrow="Customer Account"
        title="Sign In"
        intro="Welcome back to the studio. Sign in to track orders, manage delivery addresses, and access saved designs."
        trail={[{ label: "Account", to: "/account" }, { label: "Sign In" }]}
      />

      <section className="section container-narrow">
        <div className="border border-border bg-surface p-6 sm:p-10 space-y-8">
          {/* Brand Header */}
          <div className="text-center space-y-2 border-b border-border pb-6">
            <div className="inline-flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-widest text-foreground">
                ATELIER NOIR
              </span>
              <span className="text-gold text-xs">✦</span>
            </div>
            <p className="text-meta text-muted-foreground text-xs uppercase tracking-wider">
              Studio Portal Authentication
            </p>
          </div>

          {/* Social Auth Placeholders */}
          <div className="space-y-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialSignIn("Google")}
              className="flex h-12 w-full items-center justify-center gap-3 border border-border bg-surface-2/60 px-4 text-body-sm font-medium transition-all hover:border-foreground hover:bg-surface-2 disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialSignIn("Apple")}
              className="flex h-12 w-full items-center justify-center gap-3 border border-border bg-surface-2/60 px-4 text-body-sm font-medium transition-all hover:border-foreground hover:bg-surface-2 disabled:opacity-50"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.94 1.07.08 2.13-.56 2.79-1.28z" />
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="relative flex items-center justify-center border-t border-border">
            <span className="bg-surface px-4 text-meta uppercase tracking-widest text-[10px] text-muted-foreground">
              Or sign in with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="flex items-center gap-3 border border-destructive/50 bg-destructive/10 p-4 text-destructive text-body-sm animate-in fade-in">
                <AlertTriangle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Field
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-label text-muted-foreground">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-label text-xs uppercase tracking-wider text-gold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="text-body-sm h-12 w-full border border-border bg-transparent px-4 transition-colors placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none"
              />
            </div>

            <Button
              size="block"
              type="submit"
              loading={loading}
              className="uppercase tracking-wider text-xs h-12"
            >
              Sign In
            </Button>
          </form>

          {/* Create Account Link */}
          <div className="border-t border-border pt-6 text-center space-y-3">
            <p className="text-body-sm text-muted-foreground">Don&apos;t have an account yet?</p>
            <Button
              asChild
              variant="secondary"
              size="block"
              className="uppercase tracking-wider text-xs h-12"
            >
              <Link to="/register">Create New Account</Link>
            </Button>
          </div>

          {/* Quick Tracking Link */}
          <div className="pt-2 text-center">
            <Link
              to="/orders"
              className="text-meta text-xs text-muted-foreground hover:text-foreground link-underline"
            >
              Looking to track a package without signing in? → Track Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
