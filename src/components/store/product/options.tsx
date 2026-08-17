import { useMemo, useState } from "react";
import { Check, Search, ShieldCheck, Star, Truck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useStore } from "@/components/store/store";
import {
  DELIVERY_COUNTRIES,
  DEVICE_GROUPS,
  POSTER_FORMATS,
  FORMAT_OPTIONS,
  variantAvailability,
} from "@/lib/product-data";
import type { ProductType } from "@/lib/catalog";

/* ---------------- Price + rating ---------------- */

export function ProductPrice({ value, compareAt }: { value: number; compareAt?: number }) {
  const { format } = useStore();
  return (
    <p className="text-price flex flex-wrap items-baseline gap-3">
      <span>{format(value)}</span>
      {compareAt ? (
        <>
          <span className="text-muted-foreground line-through opacity-70">{format(compareAt)}</span>
          <span className="sr-only">reduced from {format(compareAt)}</span>
        </>
      ) : null}
    </p>
  );
}

export function ProductRating({
  rating,
  reviews,
  onJump,
}: {
  rating: number;
  reviews: number;
  onJump?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={cn("size-4", s <= Math.round(rating) ? "text-gold" : "text-muted-foreground")}
            fill={s <= Math.round(rating) ? "currentColor" : "none"}
          />
        ))}
      </span>
      <span className="text-body-sm tabular-nums">
        {rating.toFixed(1)}
        <span className="sr-only"> out of 5</span>
      </span>
      {onJump ? (
        <button type="button" onClick={onJump} className="text-meta underline hover:text-foreground">
          {reviews} demo reviews
        </button>
      ) : (
        <span className="text-meta">{reviews} demo reviews</span>
      )}
    </div>
  );
}

/* ---------------- Option primitives ---------------- */

function OptionHeader({ label, value, action }: { label: string; value?: string; action?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
      <p className="text-label min-w-0 text-muted-foreground">
        {label}
        {value ? <span className="ml-2 text-foreground">{value}</span> : null}
      </p>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function ColorSelector({
  type,
  value,
  onChange,
}: {
  type: ProductType;
  value: string;
  onChange: (name: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose colour</legend>
      <OptionHeader label="Colour" value={value} />
      <div className="mt-4 flex flex-wrap gap-3">
        {type.colors.map((c) => {
          const active = c.name === value;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(c.name)}
              aria-pressed={active}
              title={c.name}
              className={cn(
                "text-label inline-flex min-h-11 items-center gap-2 border px-3 transition-colors",
                active ? "border-gold text-gold" : "border-border hover:border-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className="size-4 border border-border-strong"
                style={{ backgroundColor: c.value }}
              />
              {c.name}
              {active ? <Check className="size-3.5" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function SizeSelector({
  type,
  sizes,
  value,
  onChange,
  onGuide,
  label = "Size",
}: {
  type: ProductType;
  sizes: string[];
  value?: string;
  onChange: (s: string) => void;
  onGuide?: () => void;
  label?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose {label.toLowerCase()}</legend>
      <OptionHeader
        label={label}
        value={value}
        action={
          onGuide ? (
            <button type="button" onClick={onGuide} className="text-meta underline hover:text-foreground">
              Size guide
            </button>
          ) : undefined
        }
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {sizes.map((s) => {
          const state = variantAvailability(type.id, s);
          const out = state === "out";
          const active = s === value;
          return (
            <button
              key={s}
              type="button"
              disabled={out}
              onClick={() => onChange(s)}
              aria-pressed={active}
              className={cn(
                "text-label relative min-h-11 min-w-[3.25rem] border px-3 transition-colors",
                active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                out && "cursor-not-allowed text-muted-foreground line-through opacity-50 hover:border-border",
              )}
            >
              {s}
              {out ? <span className="sr-only"> — sold out</span> : null}
              {state === "low" ? <span className="sr-only"> — low stock</span> : null}
            </button>
          );
        })}
      </div>
      {value && variantAvailability(type.id, value) === "low" ? (
        <p className="text-meta mt-3 text-gold">Low stock — made to order in small batches.</p>
      ) : null}
    </fieldset>
  );
}

export function DeviceSelector({
  value,
  onChange,
}: {
  value?: string;
  onChange: (m: string) => void;
}) {
  const [brand, setBrand] = useState(
    DEVICE_GROUPS.find((g) => g.models.includes(value ?? ""))?.brand ?? DEVICE_GROUPS[0]!.brand,
  );
  const [query, setQuery] = useState("");

  const models = useMemo(() => {
    const group = DEVICE_GROUPS.find((g) => g.brand === brand);
    const list = group?.models ?? [];
    const q = query.trim().toLowerCase();
    return q ? list.filter((m) => m.toLowerCase().includes(q)) : list;
  }, [brand, query]);

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="sr-only">Select device brand</legend>
        <OptionHeader label="Select device" value={brand} />
        <div className="mt-4 flex flex-wrap gap-2">
          {DEVICE_GROUPS.map((g) => (
            <button
              key={g.brand}
              type="button"
              onClick={() => setBrand(g.brand)}
              aria-pressed={g.brand === brand}
              className={cn(
                "text-label min-h-11 border px-3 transition-colors",
                g.brand === brand
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground",
              )}
            >
              {g.brand}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Select model</legend>
        <OptionHeader label="Select model" value={value} />
        <label className="mt-4 flex h-12 items-center gap-3 border border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Search models</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models"
            className="text-body-sm w-full bg-transparent placeholder:text-muted-foreground focus:outline-none"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {models.map((m) => {
            const out = variantAvailability("phonecase", m) === "out";
            return (
              <button
                key={m}
                type="button"
                disabled={out}
                onClick={() => onChange(m)}
                aria-pressed={m === value}
                className={cn(
                  "text-label min-h-11 border px-3 transition-colors",
                  m === value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground",
                  out && "cursor-not-allowed text-muted-foreground line-through opacity-50",
                )}
              >
                {m}
                {out ? <span className="sr-only"> — sold out</span> : null}
              </button>
            );
          })}
          {!models.length ? <p className="text-meta">No models match that search.</p> : null}
        </div>
      </fieldset>
    </div>
  );
}

export function PosterSizeSelector({
  value,
  onChange,
}: {
  value?: string;
  onChange: (s: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Select poster size</legend>
      <OptionHeader label="Select size" value={value} />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {POSTER_FORMATS.map((f) => {
          const active = f.id === value;
          const low = variantAvailability("poster", f.id) === "low";
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.id)}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 flex-col items-center gap-2 border p-3 transition-colors",
                active ? "border-foreground" : "border-border hover:border-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("block border", active ? "border-gold bg-gold/10" : "border-border-strong")}
                style={{ width: `${f.scale * 2.6}rem`, height: `${f.scale * 3.7}rem` }}
              />
              <span className="text-label">{f.label}</span>
              <span className="text-meta">{f.note}</span>
              {low ? <span className="text-meta text-gold">Low stock</span> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FormatSelector({
  type,
  value,
  onChange,
}: {
  type: ProductType;
  value?: string;
  onChange: (v: string) => void;
}) {
  const options = FORMAT_OPTIONS[type.id] ?? [];
  return (
    <fieldset>
      <legend className="sr-only">Select format</legend>
      <OptionHeader label="Format" value={value} />
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={o.id === value}
            className={cn(
              "flex min-h-11 flex-col items-start gap-1 border p-3 text-left transition-colors",
              o.id === value ? "border-foreground" : "border-border hover:border-foreground",
            )}
          >
            <span className="text-label">{o.id}</span>
            <span className="text-meta">{o.note}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------------- Delivery estimator ---------------- */

export function ShippingEstimator() {
  const [code, setCode] = useState("DE");
  const country = DELIVERY_COUNTRIES.find((c) => c.code === code)!;
  return (
    <div className="border border-border p-5">
      <label htmlFor="deliver-to" className="text-label text-muted-foreground">
        Deliver to
      </label>
      <select
        id="deliver-to"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-3 focus-visible:border-foreground"
      >
        {DELIVERY_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code} className="bg-background">
            {c.name}
          </option>
        ))}
      </select>
      <p className="text-body-sm mt-4 flex items-start gap-3 text-muted-foreground">
        <Truck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          Estimated delivery to {country.name}: <span className="text-foreground">{country.estimate}</span>
          <br />
          {country.note}. Demo estimate — final times are confirmed at checkout.
        </span>
      </p>
    </div>
  );
}

/* ---------------- Assurances + accordion ---------------- */

export function ProductAssurances() {
  const items = [
    { icon: Truck, title: "Shipping", body: "Made on demand, then dispatched. Tracked worldwide delivery." },
    { icon: RefreshCw, title: "Returns", body: "30-day returns on unworn items. Placeholder policy copy." },
    { icon: ShieldCheck, title: "Secure checkout", body: "Encrypted payment placeholder for this prototype." },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((i) => (
        <li key={i.title} className="border border-border p-4">
          <p className="text-label flex items-center gap-2">
            <i.icon className="size-4 shrink-0 text-gold" aria-hidden="true" />
            {i.title}
          </p>
          <p className="text-meta mt-2">{i.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function ProductAccordion({ type, story }: { type: ProductType; story: string }) {
  const apparel = type.surface === "apparel";
  const sections: { id: string; title: string; body: string }[] = [
    { id: "details", title: "Details", body: type.description },
    { id: "materials", title: "Materials", body: type.fulfilment },
    {
      id: "fit",
      title: apparel ? "Fit & size" : "Format & size",
      body: apparel
        ? "Cut relaxed through the body with a dropped shoulder. Size down for a closer fit."
        : "Dimensions are listed with each option. Printed to order at the selected format.",
    },
    {
      id: "care",
      title: "Care",
      body: apparel
        ? "Wash cool inside out, line dry, iron on the reverse. Do not tumble dry the print."
        : "Wipe clean with a soft cloth. Avoid abrasive cleaners and prolonged direct sunlight.",
    },
    {
      id: "shipping",
      title: "Shipping",
      body: "Production takes 2–4 days, then tracked delivery. Demo policy copy for this prototype.",
    },
    {
      id: "returns",
      title: "Returns",
      body: "30 days to return unworn items in original packaging. Demo policy copy for this prototype.",
    },
    { id: "design", title: "About the design", body: story },
  ];

  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {sections.map((s) => (
        <AccordionItem key={s.id} value={s.id} className="border-b border-border">
          <AccordionTrigger className="text-label py-5 hover:no-underline">{s.title}</AccordionTrigger>
          <AccordionContent className="text-body-sm pb-6 text-muted-foreground">{s.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
