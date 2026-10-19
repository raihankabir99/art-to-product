import { DESIGNS } from "@/lib/catalog";
import type { NewDesignsSectionData } from "../homepage-types";
import { Sparkles, Check, Filter } from "lucide-react";
import { toast } from "sonner";

interface NewDesignsEditorProps {
  section: NewDesignsSectionData;
  onChange: (updated: Partial<NewDesignsSectionData>) => void;
}

export function NewDesignsEditor({ section, onChange }: NewDesignsEditorProps) {
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
          Section Header
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
            Title
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
            Subheading
          </label>
          <textarea
            rows={2}
            value={section.subheading}
            onChange={(e) => onChange({ subheading: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Feed Query Controls */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Design Source & Querying
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Artwork Source
            </label>
            <select
              value={section.source}
              onChange={(e) =>
                onChange({ source: e.target.value as NewDesignsSectionData["source"] })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="newest">Latest Studio Releases</option>
              <option value="recent">Recently Added (30d)</option>
              <option value="trending">Trending & High Demand</option>
              <option value="manual">Manual Curated Selection</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Sorting Criteria
            </label>
            <select
              value={section.sorting}
              onChange={(e) =>
                onChange({ sorting: e.target.value as NewDesignsSectionData["sorting"] })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="newest">Release Date (Newest first)</option>
              <option value="popular">Collector Popularity</option>
              <option value="price-asc">Starting Price: Low to High</option>
              <option value="price-desc">Starting Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Number of Cards
            </label>
            <select
              value={section.itemCount}
              onChange={(e) => onChange({ itemCount: Number(e.target.value) })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value={4}>4 Products (Single Row)</option>
              <option value={8}>8 Products (Two Rows)</option>
              <option value={12}>12 Products (Three Rows)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Status Badges
            </label>
            <label className="flex items-center gap-2 mt-2 text-xs text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={section.showBadges}
                onChange={(e) => onChange({ showBadges: e.target.checked })}
                className="accent-gold size-3.5 rounded-none"
              />
              <span>Display "New Drop" pill</span>
            </label>
          </div>
        </div>
      </div>

      {/* Manual Selection Matrix */}
      {section.source === "manual" && (
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-[10px] uppercase font-mono text-muted-foreground block">
            Select Artworks to Pin ({section.selectedDesignSlugs.length} chosen)
          </label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
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
                    <p className="text-[9px] font-mono text-muted-foreground">{d.tagline}</p>
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
      )}
    </div>
  );
}
