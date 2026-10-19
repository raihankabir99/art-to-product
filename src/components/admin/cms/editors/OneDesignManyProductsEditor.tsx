import { DESIGNS, PRODUCT_TYPES } from "@/lib/catalog";
import type { OneDesignMultipleSectionData } from "../homepage-types";
import { Sparkles, Grid3X3, Check } from "lucide-react";
import { toast } from "sonner";

interface OneDesignManyProductsEditorProps {
  section: OneDesignMultipleSectionData;
  onChange: (updated: Partial<OneDesignMultipleSectionData>) => void;
}

export function OneDesignManyProductsEditor({
  section,
  onChange,
}: OneDesignManyProductsEditorProps) {
  const handleToggleProduct = (productId: string) => {
    const exists = section.selectedProductTypes.includes(productId);
    const updated = exists
      ? section.selectedProductTypes.filter((p) => p !== productId)
      : [...section.selectedProductTypes, productId];

    if (updated.length === 0) {
      toast.error("At least one product type must be selected.");
      return;
    }
    onChange({ selectedProductTypes: updated });
  };

  const handleSelectAll = () => {
    onChange({ selectedProductTypes: PRODUCT_TYPES.map((p) => p.id) });
    toast.success("All 13 substrate physical silhouettes selected.");
  };

  const handleSelectDefaults = () => {
    onChange({
      selectedProductTypes: [
        "tshirt",
        "hoodie",
        "sweatshirt",
        "tote",
        "mug",
        "phonecase",
        "cap",
        "poster",
      ],
    });
    toast.info("Selected 8 core flagship apparel & lifestyle items.");
  };

  const currentMaster = DESIGNS.find((d) => d.slug === section.masterDesignSlug) || DESIGNS[0]!;

  return (
    <div className="space-y-6">
      {/* Concept Badge */}
      <div className="p-3 bg-surface-2 border border-gold/40 flex items-start gap-2.5">
        <div className="size-2 rounded-full bg-gold shrink-0 mt-1.5 animate-pulse" />
        <div>
          <span className="text-xs font-mono font-semibold text-gold uppercase tracking-wider block">
            Core POD Architecture
          </span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            This module showcases the 1-to-many relationship: One master artwork rendered
            simultaneously across 13 physical silhouettes.
          </p>
        </div>
      </div>

      {/* Master Design Selector */}
      <div className="space-y-3">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Master Artwork Anchor
        </h4>
        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Featured Design
          </label>
          <select
            value={section.masterDesignSlug}
            onChange={(e) => {
              const d = DESIGNS.find((item) => item.slug === e.target.value);
              onChange({
                masterDesignSlug: e.target.value,
                title: d ? `${d.title}, thirteen ways` : section.title,
                ctaLink: `/designs/${e.target.value}`,
              });
              toast.success(`Active master design set to "${d?.title}"`);
            }}
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          >
            {DESIGNS.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.title} ({d.products.length} products available) — {d.technique}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Design Preview Pill */}
        <div className="p-2.5 bg-black border border-border flex items-center gap-3">
          <div className="size-12 bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
            <span className="font-mono text-xs text-gold">ART</span>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">{currentMaster.title}</p>
            <p className="text-[10px] font-mono text-muted-foreground">{currentMaster.tagline}</p>
          </div>
        </div>
      </div>

      {/* Copy & Headings */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Section Narrative
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Eyebrow
          </label>
          <input
            type="text"
            value={section.eyebrow}
            onChange={(e) => onChange({ eyebrow: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Substrate Product Multi-Selector */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
            Active Substrates ({section.selectedProductTypes.length} of 13)
          </h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSelectDefaults}
              className="text-[10px] font-mono text-gold hover:underline"
            >
              Default (8)
            </button>
            <span className="text-muted-foreground text-xs">·</span>
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[10px] font-mono text-gold hover:underline"
            >
              Select All (13)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {PRODUCT_TYPES.map((pt) => {
            const isSelected = section.selectedProductTypes.includes(pt.id);
            return (
              <button
                key={pt.id}
                type="button"
                onClick={() => handleToggleProduct(pt.id)}
                className={`p-2 border text-left flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-gold/10 border-gold text-foreground"
                    : "bg-surface-2 border-border text-muted-foreground hover:border-zinc-600"
                }`}
              >
                <div className="truncate">
                  <p className="text-xs font-medium truncate">{pt.name}</p>
                  <p className="text-[9px] font-mono text-muted-foreground truncate">
                    {pt.tagline}
                  </p>
                </div>
                <div
                  className={`size-4 shrink-0 border flex items-center justify-center ${
                    isSelected ? "bg-gold border-gold text-background" : "border-border"
                  }`}
                >
                  {isSelected && <Check className="size-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Grid Columns */}
      <div className="space-y-3 pt-4 border-t border-border">
        <label className="text-[10px] uppercase font-mono text-muted-foreground block">
          Desktop Grid Columns
        </label>
        <div className="grid grid-cols-4 gap-2">
          {([2, 3, 4, 5] as const).map((cols) => (
            <button
              key={cols}
              type="button"
              onClick={() => onChange({ gridColumns: cols })}
              className={`py-1.5 text-xs font-mono border transition-colors ${
                section.gridColumns === cols
                  ? "bg-gold text-background border-gold font-semibold"
                  : "bg-surface-2 text-foreground border-border"
              }`}
            >
              {cols} Col
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
