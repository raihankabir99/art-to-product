import { COLLECTIONS } from "@/lib/catalog";
import type { FeaturedCollectionSectionData } from "../homepage-types";
import { Sparkles, LayoutGrid, Columns, GalleryHorizontal } from "lucide-react";
import { toast } from "sonner";

interface FeaturedCollectionEditorProps {
  section: FeaturedCollectionSectionData;
  onChange: (updated: Partial<FeaturedCollectionSectionData>) => void;
}

export function FeaturedCollectionEditor({ section, onChange }: FeaturedCollectionEditorProps) {
  const currentCollection =
    COLLECTIONS.find((c) => c.slug === section.collectionSlug) || COLLECTIONS[0]!;

  return (
    <div className="space-y-6">
      {/* Active Collection Selection */}
      <div className="space-y-3">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Target Collection Drop
        </h4>
        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Collection
          </label>
          <select
            value={section.collectionSlug}
            onChange={(e) => {
              const selected = COLLECTIONS.find((c) => c.slug === e.target.value);
              onChange({
                collectionSlug: e.target.value,
                title: selected?.name || section.title,
                description: selected?.tagline || section.description,
                ctaLink: `/collections/${e.target.value}`,
              });
              toast.success(`Selected collection "${selected?.name}"`);
            }}
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          >
            {COLLECTIONS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.designs.length} designs) — {c.tagline}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Copy */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Editorial Text
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

      {/* Layout Presets */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Display Layout Preset
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "2-col", label: "2-Column Split", desc: "Large dual balance cards" },
            { id: "3-col", label: "3-Column Grid", desc: "Trio gallery arrangement" },
            { id: "4-col", label: "4-Column Matrix", desc: "Compact catalog overview" },
            { id: "editorial-split", label: "Editorial Split", desc: "60/40 hero card + story" },
            { id: "large-feature", label: "Large Showcase", desc: "Cinematic full feature" },
          ].map((layout) => (
            <button
              key={layout.id}
              type="button"
              onClick={() =>
                onChange({
                  layout: layout.id as FeaturedCollectionSectionData["layout"],
                })
              }
              className={`p-2.5 border text-left transition-colors ${
                section.layout === layout.id
                  ? "bg-gold/10 border-gold text-foreground"
                  : "bg-surface-2 border-border text-muted-foreground hover:border-zinc-700"
              }`}
            >
              <p className="text-xs font-medium">{layout.label}</p>
              <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{layout.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Card Count */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase font-mono text-muted-foreground">
            Number of Artworks Displayed
          </label>
          <span className="text-xs font-mono text-gold">{section.itemCount} items</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="1"
          value={section.itemCount}
          onChange={(e) => onChange({ itemCount: Number(e.target.value) })}
          className="w-full accent-gold cursor-pointer"
        />
      </div>
    </div>
  );
}
