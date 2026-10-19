import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "./ui";
import { cn } from "@/lib/utils";
import { newsletterService } from "@/lib/services/newsletter-service";

/**
 * Newsletter signup. `variant` only changes the framing, never the mechanics,
 * so footer, homepage and journal all share one component.
 */
export function Newsletter({
  variant = "inline",
  title = "The studio letter",
  body = "New designs, production notes and the occasional early access. One email a month, no more.",
  className,
}: {
  variant?: "inline" | "panel" | "editorial";
  title?: string;
  body?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string>();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address so we can reach you.");
      setState("error");
      return;
    }
    setError(undefined);
    setState("loading");

    const result = await newsletterService.subscribe(email, `store_${variant}`);
    if (result.success) {
      setState("done");
      if (result.isDuplicate) {
        toast.info(result.message);
      } else {
        toast.success(result.message);
      }
    } else {
      setState("error");
      setError(result.message);
      toast.error(result.message);
    }
  }

  return (
    <div
      className={cn(
        variant === "panel" && "border border-border p-6 md:p-10",
        variant === "editorial" && "editorial border-y border-border px-5 py-14 md:px-10",
        className,
      )}
    >
      <div className={cn(variant === "editorial" && "container-narrow px-0 text-center")}>
        <p className="text-label text-gold">Newsletter</p>
        <h2 className={cn("mt-3", variant === "inline" ? "text-h3" : "text-h2")}>{title}</h2>
        <p
          className={cn(
            "text-body mt-3 max-w-prose text-muted-foreground",
            variant === "editorial" && "mx-auto",
          )}
        >
          {body}
        </p>

        {state === "done" ? (
          <p className="text-body mt-6 border border-gold/50 p-4 text-gold" role="status">
            Subscribed — look for a confirmation in your inbox.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className={cn(
              "mt-6 grid gap-3",
              variant === "editorial"
                ? "sm:grid-cols-[minmax(0,1fr)_auto]"
                : "sm:grid-cols-[minmax(0,1fr)_auto]",
            )}
            noValidate
          >
            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="text-left"
              {...(error ? { error } : {})}
            />
            <Button type="submit" className="h-12 sm:mt-8" loading={state === "loading"}>
              Subscribe
            </Button>
          </form>
        )}
        <p className="text-meta mt-4">
          By subscribing you agree to receive updates from us. Unsubscribe in one click — we never
          share your address.
        </p>
      </div>
    </div>
  );
}
