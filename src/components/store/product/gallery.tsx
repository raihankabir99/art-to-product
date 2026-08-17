import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Mockup, type MockupView } from "@/components/store/Mockup";
import type { Design, ProductType } from "@/lib/catalog";

export interface MediaShot {
  id: string;
  label: string;
  view: MockupView;
  colorValue: string;
  tone: "light" | "dark";
}

/** Five consistent framings generated from one artwork + one blank. */
export function buildMedia(type: ProductType, colorValue: string, tone: "light" | "dark"): MediaShot[] {
  const alt = type.colors.find((c) => c.value !== colorValue) ?? type.colors[0]!;
  return [
    { id: "front", label: "Front", view: "front", colorValue, tone },
    { id: "back", label: "Back", view: "back", colorValue, tone },
    { id: "lifestyle", label: "In context", view: "lifestyle", colorValue, tone },
    { id: "detail", label: "Print detail", view: "detail", colorValue, tone },
    { id: "closeup", label: "Colourway", view: "front", colorValue: alt.value, tone: alt.tone },
  ];
}

/* ------------------------------------------------------------------ *
 * ProductImageViewer — fullscreen, keyboard accessible
 * ------------------------------------------------------------------ */
export function ProductImageViewer({
  open,
  media,
  index,
  design,
  type,
  onIndex,
  onClose,
}: {
  open: boolean;
  media: MediaShot[];
  index: number;
  design: Design;
  type: ProductType;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % media.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + media.length) % media.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, media.length, onIndex, onClose]);

  if (!open) return null;
  const shot = media[index]!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${design.name} ${type.name} images`}
      className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-4 py-3 sm:px-6">
          <p className="text-label min-w-0 truncate">
            {design.name} · {type.name} · {shot.label}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="grid size-11 shrink-0 place-items-center border border-border hover:border-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-6 sm:px-16">
          <div className="w-full max-w-2xl">
            <Mockup
              key={shot.id}
              design={design}
              productId={type.id}
              view={shot.view}
              colorValue={shot.colorValue}
              tone={shot.tone}
              priority
              className="fade-in-soft"
            />
          </div>
        </div>

        <footer className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t border-border px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => onIndex((index - 1 + media.length) % media.length)}
            aria-label="Previous image"
            className="grid size-11 place-items-center border border-border hover:border-foreground"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <p className="text-meta text-center tabular-nums" aria-live="polite">
            {index + 1} / {media.length}
          </p>
          <button
            type="button"
            onClick={() => onIndex((index + 1) % media.length)}
            aria-label="Next image"
            className="grid size-11 place-items-center border border-border hover:border-foreground"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ProductMediaGallery
 * ------------------------------------------------------------------ */
export function ProductMediaGallery({
  design,
  type,
  media,
}: {
  design: Design;
  type: ProductType;
  media: MediaShot[];
}) {
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(0);
  }, [type.id, media[0]?.colorValue]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
    setIndex((prev) => (prev === i ? prev : Math.min(media.length - 1, Math.max(0, i))));
  }, [media.length]);

  const shot = media[index]!;

  return (
    <div>
      {/* Mobile: swipeable carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          aria-label={`${design.name} ${type.name} images`}
        >
          {media.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setIndex(i);
                setViewer(true);
              }}
              aria-label={`Open ${m.label} image, ${i + 1} of ${media.length}`}
              className="w-full shrink-0 snap-center border border-border"
            >
              <Mockup
                design={design}
                productId={type.id}
                view={m.view}
                colorValue={m.colorValue}
                tone={m.tone}
                priority={i === 0}
              />
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 gap-1.5" aria-hidden="true">
            {media.map((m, i) => (
              <span
                key={m.id}
                className={cn("h-px flex-1 transition-colors", i === index ? "bg-gold" : "bg-border")}
              />
            ))}
          </div>
          <p className="text-meta shrink-0 tabular-nums" aria-live="polite">
            {index + 1}/{media.length} · {shot.label}
          </p>
        </div>
      </div>

      {/* Desktop: thumbnail rail + large main image */}
      <div className="hidden gap-4 md:grid md:grid-cols-[5.5rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-3" role="tablist" aria-label="Product images">
          {media.map((m, i) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "border transition-colors",
                i === index ? "border-foreground" : "border-border hover:border-border-strong",
              )}
            >
              <span className="sr-only">{m.label}</span>
              <Mockup
                design={design}
                productId={type.id}
                view={m.view}
                colorValue={m.colorValue}
                tone={m.tone}
              />
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setViewer(true)}
            className="block w-full cursor-zoom-in border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label={`Open ${shot.label} image full screen`}
          >
            <Mockup
              key={`${shot.id}-${shot.colorValue}`}
              design={design}
              productId={type.id}
              view={shot.view}
              colorValue={shot.colorValue}
              tone={shot.tone}
              priority
              className="fade-in-soft"
            />
          </button>
          <span className="text-meta pointer-events-none absolute bottom-3 left-3 border border-border bg-background/80 px-2 py-1 tabular-nums backdrop-blur">
            {index + 1} / {media.length}
          </span>
          <span className="text-meta pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-2 border border-border bg-background/80 px-2 py-1 backdrop-blur">
            <Maximize2 className="size-3.5" aria-hidden="true" /> Click to zoom
          </span>
        </div>
      </div>

      <ProductImageViewer
        open={viewer}
        media={media}
        index={index}
        design={design}
        type={type}
        onIndex={setIndex}
        onClose={() => setViewer(false)}
      />
    </div>
  );
}
