import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RegionSelector } from "./Header";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "T-Shirts", to: "/shop" },
      { label: "Hoodies", to: "/shop" },
      { label: "Sweatshirts", to: "/shop" },
      { label: "Tote Bags", to: "/shop" },
      { label: "Mugs", to: "/shop" },
      { label: "Phone Cases", to: "/shop" },
      { label: "Accessories", to: "/shop" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Designs", to: "/designs" },
      { label: "Collections", to: "/collections" },
      { label: "New Drops", to: "/new" },
      { label: "Best Sellers", to: "/best-sellers" },
      { label: "Journal", to: "/blog" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "Order Tracking", to: "/orders" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/legal/privacy" },
      { label: "Terms", to: "/legal/terms" },
      { label: "Cookie Policy", to: "/legal/cookies" },
      { label: "Refund Policy", to: "/legal/refunds" },
    ],
  },
];

const SOCIAL = ["Instagram", "TikTok", "Pinterest", "Facebook"];

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page section-tight">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="text-h2 max-w-sm">Join the community.</p>
            <p className="text-body mt-4 max-w-sm text-muted-foreground">
              New designs, early access to limited drops and the occasional letter from the studio.
            </p>
            <form
              className="mt-8 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                  setError("Enter a valid email address.");
                  return;
                }
                setError("");
                setEmail("");
                toast.success("You're on the list.");
              }}
              noValidate
            >
              <label htmlFor="newsletter-email" className="text-label text-muted-foreground">
                Email address
              </label>
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto]">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="text-body-sm h-12 min-w-0 border border-border bg-transparent px-4 placeholder:text-muted-foreground focus-visible:border-foreground"
                />
                <Button type="submit" size="sm" className="h-12">
                  Subscribe
                </Button>
              </div>
              {error ? (
                <p id="newsletter-error" className="text-body-sm mt-2 text-destructive">
                  {error}
                </p>
              ) : null}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-label text-muted-foreground">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-body-sm link-underline inline-block text-foreground/85 hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s}
                href="#"
                className="text-label link-underline text-muted-foreground hover:text-foreground"
              >
                {s}
              </a>
            ))}
          </div>
          <RegionSelector />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta">© 2026 Atelier Noir. Printed on demand in the EU, UK and US.</p>
          <p className="text-meta">Prices include VAT where applicable.</p>
        </div>
      </div>
    </footer>
  );
}
