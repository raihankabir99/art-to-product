import type { BrandStorySectionData } from "../homepage-types";
import { Sparkles, Layout } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

interface BrandStoryEditorProps {
  section: BrandStorySectionData;
  onChange: (updated: Partial<BrandStorySectionData>) => void;
}

export function BrandStoryEditor({ section, onChange }: BrandStoryEditorProps) {
  return (
    <div className="space-y-6">
      {/* Brand Story Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Brand Philosophy & Heritage
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
            Studio Heading
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
            Philosophy Statement
          </label>
          <textarea
            rows={4}
            value={section.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Visual Alignment & Height */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Layout & Orientation
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Image Placement
            </label>
            <select
              value={section.imagePosition}
              onChange={(e) =>
                onChange({
                  imagePosition: e.target.value as BrandStorySectionData["imagePosition"],
                })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="right">Image Right / Text Left</option>
              <option value="left">Image Left / Text Right</option>
              <option value="center-stacked">Centered Stacked View</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Section Height
            </label>
            <select
              value={section.height}
              onChange={(e) =>
                onChange({ height: e.target.value as BrandStorySectionData["height"] })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="compact">Compact (360px)</option>
              <option value="medium">Medium Balance (480px)</option>
              <option value="cinematic">Cinematic Large (640px)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Container Styling
          </label>
          <select
            value={section.style}
            onChange={(e) => onChange({ style: e.target.value as BrandStorySectionData["style"] })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="minimal">Minimal Flat Canvas</option>
            <option value="framed">Fine Studio Border Frame</option>
            <option value="luxury-card">Elevated Darkroom Card</option>
          </select>
        </div>
      </div>

      {/* Action CTA */}
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
