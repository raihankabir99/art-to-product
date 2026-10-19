import { DESIGNS } from "@/lib/catalog";
import type { BestSellersSectionData } from "../homepage-types";
import { Sparkles, TrendingUp, Calendar, Check } from "lucide-react";
import { toast } from "sonner";

interface BestSellersEditorProps {
  section: BestSellersSectionData;
  onChange: (updated: Partial<BestSellersSectionData>) => void;
}

export function BestSellersEditor({ section, onChange }: BestSellersEditorProps) {
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
          Best Sellers Narrative
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

      {/* Analytics Feed Configuration */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Telemetry & Ranking Window
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Data Engine Mode
            </label>
            <select
              value={section.source}
              onChange={(e) =>
                onChange({ source: e.target.value as BestSellersSectionData["source"] })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="automatic">⚡ Automated Analytics Engine</option>
              <option value="manual">✦ Hand-Curated Featured List</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Sales Window Lookback
            </label>
            <select
              value={section.timePeriod}
              onChange={(e) =>
                onChange({ timePeriod: e.target.value as BestSellersSectionData["timePeriod"] })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="7d">Last 7 Days (Hot Velocity)</option>
              <option value="30d">Last 30 Days (Season Standard)</option>
              <option value="90d">Last 90 Days (Quarter Baseline)</option>
              <option value="all">All Time Studio Hall of Fame</option>
            </select>
          </div>
        </div>

        {/* Telemetry Mock Insight */}
        <div className="p-3 bg-surface-2 border border-border space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-gold">
            <span className="flex items-center gap-1">
              <TrendingUp className="size-3" /> Live Analytics Stream
            </span>
            <span>Period: {section.timePeriod}</span>
          </div>
          <p className="text-[11px] text-zinc-300">
            Top sales volume: <strong>Midnight Lion (T-Shirt & Hoodie)</strong> leading with 342
            orders, followed by <strong>Olive Line (Tote)</strong> with 218 orders.
          </p>
        </div>
      </div>

      {/* Manual Selection Matrix */}
      {section.source === "manual" && (
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-[10px] uppercase font-mono text-muted-foreground block">
            Pin Specific Best Sellers ({section.selectedDesignSlugs.length} chosen)
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
