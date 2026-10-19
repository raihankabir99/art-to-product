import type { PromoBannerSectionData } from "../homepage-types";
import { Sparkles, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface PromoBannerEditorProps {
  section: PromoBannerSectionData;
  onChange: (updated: Partial<PromoBannerSectionData>) => void;
}

export function PromoBannerEditor({ section, onChange }: PromoBannerEditorProps) {
  return (
    <div className="space-y-6">
      {/* Banner Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Promotional / Capsule Drop Announcement
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Status Pill Badge
          </label>
          <input
            type="text"
            value={section.badge}
            onChange={(e) => onChange({ badge: e.target.value })}
            placeholder="e.g. PRIVATE DROP or LIMITED EDITION"
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-gold font-mono uppercase focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Headline
          </label>
          <input
            type="text"
            value={section.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Subheadline
          </label>
          <textarea
            rows={2}
            value={section.subheadline}
            onChange={(e) => onChange({ subheadline: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Visual Treatment */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Background Treatment
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "gold-accent", label: "Gold Accent Glow", desc: "Subtle metallic halo border" },
            { id: "gradient-noir", label: "Gradient Noir", desc: "Deep darkroom vignette" },
            {
              id: "editorial-photo",
              label: "Editorial Photo Overlay",
              desc: "Muted background texture",
            },
            {
              id: "monochrome-border",
              label: "Monochrome Frame",
              desc: "Crisp studio line border",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChange({
                  backgroundTreatment: item.id as PromoBannerSectionData["backgroundTreatment"],
                })
              }
              className={`p-2.5 border text-left transition-colors ${
                section.backgroundTreatment === item.id
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

      {/* Drop Scheduling Window */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="size-3.5 text-gold" /> Campaign Scheduling Window
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={section.startDate || "2026-08-25"}
              onChange={(e) => onChange({ startDate: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              End Date
            </label>
            <input
              type="date"
              value={section.endDate || "2026-09-10"}
              onChange={(e) => onChange({ endDate: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground font-mono focus:outline-none"
            />
          </div>
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
