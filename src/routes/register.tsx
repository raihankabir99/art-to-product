import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Check, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { PageHero } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import { authService } from "@/lib/services/auth-service";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { user, refreshUser } = useStore();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (user) {
    navigate({ to: "/account" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName || !lastName || !email || !password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const { user: newUser, error } = await authService.signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
      });

      if (error || !newUser) {
        setErrorMessage(error?.message || "Registration failed. Please check your information.");
        return;
      }

      await refreshUser();
      toast.success("Account created successfully. Welcome to Atelier Noir.");
      navigate({ to: "/account" });
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Customer Account"
        title="Create Your Account"
        intro="Join the atelier to curate your personal wishlist, save delivery addresses, and track bespoke orders."
        trail={[{ label: "Account", to: "/account" }, { label: "Create Account" }]}
      />

      <section className="section container-narrow">
        <div className="border border-border bg-surface p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-border pb-6">
            <div className="inline-flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-widest text-foreground">
                ATELIER NOIR
              </span>
              <span className="text-gold text-xs">✦</span>
            </div>
            <p className="text-meta text-muted-foreground text-xs uppercase tracking-wider">
              Studio Membership Registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="flex items-center gap-3 border border-destructive/50 bg-destructive/10 p-4 text-destructive text-body-sm animate-in fade-in">
                <AlertTriangle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="First Name *"
                placeholder="Ada"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
              />
              <Field
                label="Last Name *"
                placeholder="Lindqvist"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="family-name"
              />
            </div>

            <Field
              label="Email Address *"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Password *"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Field
                label="Confirm Password *"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            {/* Password helper */}
            <div className="bg-surface-2 p-3 text-xs text-muted-foreground border border-border">
              <p className="font-medium text-foreground">Password requirements:</p>
              <p className="mt-1">Must be at least 8 characters with letters and numbers.</p>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 size-4 accent-gold border-border"
                required
              />
              <label
                htmlFor="agree-terms"
                className="text-body-sm text-muted-foreground leading-snug cursor-pointer"
              >
                I agree to the{" "}
                <Link to="/about" className="text-foreground underline hover:text-gold">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/about" className="text-foreground underline hover:text-gold">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <Button
              size="block"
              type="submit"
              loading={loading}
              className="uppercase tracking-wider text-xs h-12"
            >
              Create Account
            </Button>
          </form>

          {/* Already have account */}
          <div className="border-t border-border pt-6 text-center space-y-3">
            <p className="text-body-sm text-muted-foreground">Already have an account?</p>
            <Button
              asChild
              variant="secondary"
              size="block"
              className="uppercase tracking-wider text-xs h-12"
            >
              <Link to="/login">Sign In to Existing Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
