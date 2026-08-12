import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-meta">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {trail.map((t) => (
          <li key={t.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {t.to ? (
              <Link to={t.to} className="hover:text-foreground">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {t.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  trail?: { label: string; to?: string }[];
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <div
        className={cn(
          "container-page py-12 md:py-20",
          align === "center" && "flex flex-col items-center text-center",
        )}
      >
        {trail ? <Breadcrumbs trail={trail} /> : null}
        {eyebrow ? <p className="text-label mt-8 text-gold">{eyebrow}</p> : null}
        <h1 className={cn("text-h1 mt-4 max-w-4xl", align === "center" && "mx-auto")}>{title}</h1>
        {intro ? <p className="text-body-lg mt-6 max-w-2xl">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 pb-10">
      <div className="min-w-0">
        {eyebrow ? <p className="text-label text-gold">{eyebrow}</p> : null}
        <h2 className="text-h2 mt-3">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="[&_h2]:text-h3 [&_p]:text-body space-y-6 [&_h2]:mt-12 [&_h2]:mb-3 [&_li]:text-body [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:text-muted-foreground">
      {children}
    </div>
  );
}
