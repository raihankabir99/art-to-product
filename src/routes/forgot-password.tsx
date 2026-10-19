import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, CheckCircle2, ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { PageHero } from "@/components/store/page";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset email sent.");
    }, 600);
  };

  return (
    <>
      <PageHero
        eyebrow="Account Security"
        title="Reset Password"
        intro="Enter your account email to receive a secure link to reset your password."
        trail={[
          { label: "Account", to: "/account" },
          { label: "Sign In", to: "/login" },
          { label: "Reset Password" },
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
              Password Recovery
            </p>
          </div>

          {isSubmitted ? (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <div className="grid size-14 place-items-center border border-gold bg-gold/10 text-gold mx-auto">
                <CheckCircle2 className="size-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-h3 font-medium">Check your inbox</h2>
                <p className="text-body-sm text-muted-foreground max-w-sm mx-auto">
                  We have dispatched a secure password reset link to{" "}
                  <strong className="text-foreground">{email}</strong>.
                </p>
              </div>
              <p className="text-meta text-muted-foreground text-xs">
                Did not receive the email? Check your spam folder or try again in a few moments.
              </p>
              <div className="pt-4 flex flex-col gap-3">
                <Button asChild className="uppercase tracking-wider text-xs h-12">
                  <Link to="/login">Return to Sign In</Link>
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="uppercase tracking-wider text-xs"
                >
                  Resend With Another Email
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

              <p className="text-body-sm text-muted-foreground">
                Enter the email address associated with your studio account. We will send you a
                verification link to configure a new password.
              </p>

              <Field
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <Button
                size="block"
                type="submit"
                loading={loading}
                className="uppercase tracking-wider text-xs h-12"
              >
                Send Reset Link
              </Button>

              <div className="pt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-label text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground link-underline"
                >
                  <ArrowLeft className="size-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
