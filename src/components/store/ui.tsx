import { useEffect, useId, type ReactNode } from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Shared interaction + data primitives for Atelier Noir.
 * Everything here uses existing tokens: no new colours, no new radii.
 * ------------------------------------------------------------------ */

/** Escape-to-close for overlays. */
function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, onClose]);
}

/** Bottom sheet on mobile, right-hand panel from md up. */
export function Overlay({
  open,
  onClose,
  title,
  children,
  footer,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "bottom" | "center";
}) {
  useEscape(open, onClose);
  if (!open) return null;

  const panel =
    side === "center"
      ? "left-1/2 top-1/2 max-h-[86vh] w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 border animate-in fade-in zoom-in-95"
      : side === "bottom"
        ? "inset-x-0 bottom-0 max-h-[86vh] border-t animate-in slide-in-from-bottom"
        : "right-0 top-0 h-full w-full max-w-md border-l animate-in slide-in-from-right";

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label={`Close ${title}`}
        onClick={onClose}
        className="fade-in-soft absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <div
        className={cn(
          "absolute flex flex-col border-border bg-surface shadow-2xl duration-400",
          panel,
        )}
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <h2 className="text-label">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="grid size-11 place-items-center hover:text-gold"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">{children}</div>
        {footer ? <div className="shrink-0 border-t border-border px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}

/** Labelled input with hint, error and success states. */
export function Field({
  label,
  hint,
  error,
  success,
  className,
  children,
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  className?: string;
  children?: ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-label text-muted-foreground">
        {label}
      </label>
      {children ?? (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint || success ? msgId : undefined}
          className={cn(
            "text-body-sm mt-3 h-12 w-full border bg-transparent px-4 transition-colors placeholder:text-muted-foreground focus-visible:border-foreground",
            error ? "border-destructive" : "border-border",
          )}
          {...props}
        />
      )}
      {error ? (
        <p id={msgId} className="text-meta mt-2 flex items-center gap-2 text-destructive">
          <AlertTriangle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : success ? (
        <p id={msgId} className="text-meta mt-2 flex items-center gap-2 text-gold">
          <Check className="size-3.5 shrink-0" aria-hidden="true" />
          {success}
        </p>
      ) : hint ? (
        <p id={msgId} className="text-meta mt-2">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Calm, non-technical inline message. */
export function Notice({
  tone = "info",
  title,
  body,
  action,
}: {
  tone?: "info" | "warn" | "error" | "success";
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  const Icon = tone === "success" ? Check : tone === "info" ? Info : AlertTriangle;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 border p-4",
        tone === "error" ? "border-destructive/60" : tone === "success" ? "border-gold/50" : "border-border",
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-4 shrink-0",
          tone === "error" ? "text-destructive" : tone === "success" ? "text-gold" : "text-muted-foreground",
        )}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-label">{title}</p>
        {body ? <p className="text-body-sm mt-2 text-muted-foreground">{body}</p> : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </div>
  );
}

/** Uppercase segmented control used for tabs and view switches. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "text-label flex min-h-11 items-center gap-2 border px-4 transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground",
            )}
          >
            {o.label}
            {typeof o.count === "number" ? (
              <span className={active ? "opacity-70" : "text-muted-foreground"}>{o.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** Removable active-filter chip. */
export function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="text-label inline-flex min-h-11 items-center gap-2 border border-border-strong px-3">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="grid size-6 place-items-center text-muted-foreground hover:text-foreground"
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </span>
  );
}

export type OrderStatus =
  | "Order confirmed"
  | "Payment confirmed"
  | "Sent to production"
  | "In production"
  | "Shipped"
  | "Out for delivery"
  | "Delivered";

export const ORDER_STEPS: OrderStatus[] = [
  "Order confirmed",
  "Payment confirmed",
  "Sent to production",
  "In production",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

/** Vertical production/delivery timeline. Never colour-only: state is written out. */
export function Timeline({
  steps,
  current,
  stamps,
}: {
  steps: string[];
  current: number;
  stamps?: (string | undefined)[];
}) {
  return (
    <ol className="relative">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 pb-8 last:pb-0">
            <div className="relative flex flex-col items-center">
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-8 shrink-0 place-items-center border",
                  done && "border-gold bg-gold text-background",
                  active && "border-gold text-gold",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : <span className="text-label">{i + 1}</span>}
              </span>
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn("mt-1 w-px flex-1", done ? "bg-gold/60" : "bg-border")}
                />
              ) : null}
            </div>
            <div className="pb-2">
              <p className={cn("text-h4", !done && !active && "text-muted-foreground")}>{s}</p>
              <p className="text-meta mt-1">
                {done ? "Completed" : active ? "In progress now" : "Pending"}
                {stamps?.[i] ? ` · ${stamps[i]}` : ""}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- Minimal data visualisation ---------------- */

export function KpiCard({
  label,
  value,
  delta,
  series,
}: {
  label: string;
  value: string;
  delta?: string;
  series?: number[];
}) {
  return (
    <div className="border border-border p-5">
      <p className="text-label text-muted-foreground">{label}</p>
      <p className="text-h2 mt-3 tabular-nums">{value}</p>
      {delta ? <p className="text-meta mt-2">{delta}</p> : null}
      {series ? <Sparkline data={series} className="mt-4" label={`${label} trend`} /> : null}
    </div>
  );
}

export function Sparkline({
  data,
  className,
  label,
}: {
  data: number[];
  className?: string;
  label: string;
}) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = max - min || 1;
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${28 - ((d - min) / span) * 26}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      role="img"
      aria-label={`${label}: ${data.join(", ")}`}
      className={cn("h-8 w-full", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function BarChart({
  data,
  label,
}: {
  data: { label: string; value: number }[];
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <figure>
      <figcaption className="sr-only">{label}</figcaption>
      <ul className="space-y-3">
        {data.map((d) => (
          <li key={d.label} className="grid grid-cols-[7rem_minmax(0,1fr)_3.5rem] items-center gap-3">
            <span className="text-meta truncate">{d.label}</span>
            <span className="h-2 w-full bg-surface-2" aria-hidden="true">
              <span
                className="block h-full bg-gold/70"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </span>
            <span className="text-meta text-right tabular-nums">{d.value}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
