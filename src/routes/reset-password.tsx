import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CheckCircle2, Lock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { PageHero } from "@/components/store/page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      toast.success("Password has been reset successfully.");
    }, 600);
  };

  return (
    <>
      <PageHero
        eyebrow="Account Security"
        title="Set New Password"
        intro="Choose a strong, unique password to protect your Atelier Noir account."
        trail={[
          { label: "Account", to: "/account" },
          { label: "Sign In", to: "/login" },
          { label: "New Password" },
        ]}
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
              Create New Passphrase
            </p>
          </div>

          {isSuccess ? (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <div className="grid size-14 place-items-center border border-gold bg-gold/10 text-gold mx-auto">
                <CheckCircle2 className="size-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-h3 font-medium">Password Updated</h2>
                <p className="text-body-sm text-muted-foreground max-w-sm mx-auto">
                  Your new password is now active. You can sign in immediately with your updated
                  credentials.
                </p>
              </div>
              <div className="pt-4">
                <Button asChild className="uppercase tracking-wider text-xs h-12 w-full">
                  <Link to="/login">Proceed to Sign In</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 border border-destructive/50 bg-destructive/10 p-4 text-destructive text-body-sm">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Field
                label="New Password *"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />

              <Field
                label="Confirm New Password *"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />

              {/* Password criteria */}
              <div className="bg-surface-2 p-3 text-xs text-muted-foreground space-y-1 border border-border">
                <p className="font-medium text-foreground">Password requirements:</p>
                <p
                  className={cn(
                    "flex items-center gap-1.5",
                    password.length >= 8 ? "text-gold" : "",
                  )}
                >
                  <Check className="size-3" /> At least 8 characters
                </p>
                <p
                  className={cn(
                    "flex items-center gap-1.5",
                    /[0-9]/.test(password) ? "text-gold" : "",
                  )}
                >
                  <Check className="size-3" /> Includes at least one number
                </p>
              </div>

              <Button
                size="block"
                type="submit"
                loading={loading}
                className="uppercase tracking-wider text-xs h-12"
              >
                Save New Password
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
