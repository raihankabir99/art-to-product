import { DESIGNS } from "@/lib/catalog";
import type { FeaturedDesignsSectionData } from "../homepage-types";
import { Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

interface FeaturedDesignsEditorProps {
  section: FeaturedDesignsSectionData;
  onChange: (updated: Partial<FeaturedDesignsSectionData>) => void;
}

export function FeaturedDesignsEditor({ section, onChange }: FeaturedDesignsEditorProps) {
  const handleToggleDesign = (slug: string) => {
    const exists = section.selectedDesignSlugs.includes(slug);
    const updated = exists
      ? section.selectedDesignSlugs.filter((s) => s !== slug)
      : [...section.selectedDesignSlugs, slug];

    if (updated.length === 0) {
      toast.error("At least one design must be chosen.");
      return;
    }
    onChange({ selectedDesignSlugs: updated });
  };

  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Featured Artworks Narrative
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Eyebrow Tag
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
            Heading
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={section.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Grid Columns */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Grid Columns
        </h4>

        <div className="grid grid-cols-3 gap-2">
          {([2, 3, 4] as const).map((cols) => (
            <button
              key={cols}
              type="button"
              onClick={() => onChange({ columns: cols })}
              className={`py-2 text-xs font-mono border transition-colors ${
                section.columns === cols
                  ? "bg-gold text-background border-gold font-semibold"
                  : "bg-surface-2 text-foreground border-border"
              }`}
            >
              {cols} Columns
            </button>
          ))}
        </div>
      </div>

      {/* Design Pinning Matrix */}
      <div className="space-y-3 pt-4 border-t border-border">
        <label className="text-[10px] uppercase font-mono text-muted-foreground block">
          Curated Artwork Selection ({section.selectedDesignSlugs.length} chosen)
        </label>

        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {DESIGNS.map((d) => {
            const isSelected = section.selectedDesignSlugs.includes(d.slug);
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => handleToggleDesign(d.slug)}
                className={`w-full p-2 border text-left flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-gold/10 border-gold text-foreground"
                    : "bg-surface-2 border-border text-muted-foreground hover:border-zinc-700"
                }`}
              >
                <div>
                  <p className="text-xs font-medium">{d.title}</p>
                  <p className="text-[9px] font-mono text-muted-foreground">
                    {d.technique} · {d.year}
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
    </div>
  );
}
