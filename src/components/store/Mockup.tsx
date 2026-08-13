import { useState } from "react";
import { cn } from "@/lib/utils";
import { productType, type Design, type ProductTypeId } from "@/lib/catalog";

/**
 * Renders a design onto a blank product. The same artwork is reused across
 * every product type — only the blank, the placement and the scale change.
 *
 * `view` gives the gallery front / back / print-detail / lifestyle framings
 * without needing separate photography.
 */

export type MockupView = "front" | "back" | "detail" | "lifestyle";

const SILHOUETTES: Record<ProductTypeId, string> = {
  tshirt:
    "M30 16 L42 10 h16 l12 6 12 8 -8 14 -8 -5 v47 H34 V39 l-8 5 -8 -14z",
  hoodie:
    "M28 18 L42 11 q8 12 16 0 l14 7 12 9 -8 15 -8 -5 v45 H32 V45 l-8 5 -8 -15z",
  sweatshirt:
    "M30 17 L43 11 h14 l13 6 11 9 -8 14 -7 -4 v46 H33 V46 l-7 4 -8 -14z",
  tote: "M32 26 h36 v62 H32z M42 26 q8 -18 16 0",
  mug: "M28 34 h40 v40 a8 8 0 0 1 -8 8 H36 a8 8 0 0 1 -8 -8z M68 42 h8 a10 10 0 0 1 0 24 h-8",
  phonecase: "M34 8 h32 a6 6 0 0 1 6 6 v72 a6 6 0 0 1 -6 6 H34 a6 6 0 0 1 -6 -6 V14 a6 6 0 0 1 6 -6z",
  cap: "M22 62 q0 -30 28 -30 t28 30 z M78 62 h12 q0 8 -12 8z",
  poster: "M24 8 h52 v84 H24z",
  sticker: "M20 20 h60 v60 H20z",
  notebook: "M28 8 h44 v84 H28z M34 8 v84",
  cushion: "M20 20 q40 -6 60 0 q6 40 0 60 q-40 6 -60 0 q-6 -40 0 -60z",
  "kids-tee": "M32 20 L43 14 h14 l11 6 10 7 -7 12 -6 -4 v41 H35 V55 l-6 4 -7 -12z",
  onesie: "M34 20 L44 14 h12 l10 6 9 6 -6 11 -5 -3 v14 l-6 22 H41 l-6 -22 V54 l-5 3 -6 -11z",
};

interface Props {
  design: Design;
  productId: ProductTypeId;
  colorValue?: string | undefined;
  tone?: "light" | "dark" | undefined;
  className?: string | undefined;
  priority?: boolean | undefined;
  view?: MockupView | undefined;
  /** click-to-zoom on the print area */
  zoomable?: boolean | undefined;
}

export function Mockup({
  design,
  productId,
  colorValue,
  tone,
  className,
  priority,
  view = "front",
  zoomable,
}: Props) {
  const type = productType(productId);
  const [zoomed, setZoomed] = useState(false);
  const color = colorValue ?? type.colors[0]?.value ?? "#111111";
  const blankTone = tone ?? type.colors.find((c) => c.value === color)?.tone ?? "dark";
  const inkFilter =
    blankTone === "dark"
      ? "brightness(0) invert(1) opacity(0.92)"
      : "brightness(0) opacity(0.86)";

  const scale =
    view === "back"
      ? type.artScale * 0.34
      : view === "detail"
        ? type.artScale * 2.4
        : view === "lifestyle"
          ? 62
          : type.artScale;
  const top =
    view === "back"
      ? type.artTop * 0.7
      : view === "detail"
        ? type.artTop - type.artScale * 0.7
        : view === "lifestyle"
          ? 19
          : type.artTop;

  const zoom = zoomed ? 1.9 : 1;

  const frame = (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-surface",
        type.ratio === "square" ? "aspect-square" : "aspect-[4/5]",
        className,
      )}
    >
      {view !== "lifestyle" ? (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[var(--ease-brand)]"
          style={{ transform: `scale(${zoom})` }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`sheen-${productId}-${view}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <path d={SILHOUETTES[productId]} fill={color} />
          <path d={SILHOUETTES[productId]} fill={`url(#sheen-${productId}-${view})`} />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-surface-2"
          style={{ backgroundColor: color, opacity: 0.35 }}
        />
      )}

      <img
        src={design.art}
        alt={`${design.name} on ${type.name}${view === "front" ? "" : `, ${view} view`}`}
        width={1024}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className="absolute left-1/2 object-contain transition-[width,top,transform] duration-500 ease-[var(--ease-brand)]"
        style={{
          width: `${scale}%`,
          top: `${top}%`,
          transform: `translateX(-50%) scale(${zoom})`,
          filter: inkFilter,
        }}
      />
    </div>
  );

  if (!zoomable) return frame;

  return (
    <button
      type="button"
      onClick={() => setZoomed((z) => !z)}
      aria-pressed={zoomed}
      aria-label={zoomed ? "Zoom out of the print" : "Zoom into the print"}
      className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {frame}
    </button>
  );
}
