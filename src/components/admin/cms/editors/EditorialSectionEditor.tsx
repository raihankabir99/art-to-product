import type { EditorialSectionData } from "../homepage-types";
import { Sparkles, Layout, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface EditorialSectionEditorProps {
  section: EditorialSectionData;
  onChange: (updated: Partial<EditorialSectionData>) => void;
}

export function EditorialSectionEditor({ section, onChange }: EditorialSectionEditorProps) {
  const handleUpdateMetric = (index: number, field: "value" | "label", value: string) => {
    const updated = [...section.metrics];
    updated[index] = { ...updated[index]!, [field]: value };
    onChange({ metrics: updated });
  };

  return (
    <div className="space-y-6">
      {/* Editorial Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Editorial Story & Headline
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
            value={section.heading}
            onChange={(e) => onChange({ heading: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Editorial Body Copy
          </label>
          <textarea
            rows={3}
            value={section.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Editorial Layout Presets */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Magazine & Editorial Layout
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "image-left", label: "Image Left / Text Right", desc: "Classic luxury balance" },
            { id: "text-left", label: "Text Left / Image Right", desc: "Typography-first focus" },
            { id: "full-width", label: "Full-Width Showcase", desc: "Cinematic horizontal banner" },
            { id: "split-editorial", label: "Split Editorial", desc: "60/40 visual weight" },
            {
              id: "magazine-grid",
              label: "Magazine Style Grid",
              desc: "Multi-element studio collage",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ layout: item.id as EditorialSectionData["layout"] })}
              className={`p-2.5 border text-left transition-colors ${
                section.layout === item.id
                  ? "bg-gold/10 border-gold text-foreground"
                  : "bg-surface-2 border-border text-muted-foreground hover:border-zinc-700"
              }`}
            >
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Supporting Key Metrics */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Supporting Key Metrics (3 Indicators)
        </h4>

        <div className="grid grid-cols-3 gap-2">
          {section.metrics.map((metric, i) => (
            <div key={i} className="p-2.5 bg-surface-2 border border-border space-y-1.5">
              <label className="text-[9px] font-mono uppercase text-gold block">
                Metric {i + 1}
              </label>
              <input
                type="text"
                value={metric.value}
                onChange={(e) => handleUpdateMetric(i, "value", e.target.value)}
                className="w-full bg-background border border-border text-xs font-mono font-bold text-foreground px-2 py-1 focus:outline-none focus:border-gold"
                placeholder="13"
              />
              <input
                type="text"
                value={metric.label}
                onChange={(e) => handleUpdateMetric(i, "label", e.target.value)}
                className="w-full bg-background border border-border text-[10px] text-muted-foreground px-2 py-1 focus:outline-none"
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            CTA Text
          </label>
          <input
            type="text"
            value={section.ctaText}
            onChange={(e) => onChange({ ctaText: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            CTA Link
          </label>
          <input
            type="text"
            value={section.ctaLink}
            onChange={(e) => onChange({ ctaLink: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
