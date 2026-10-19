import type { NewsletterSectionData } from "../homepage-types";
import { Sparkles, Mail } from "lucide-react";

interface NewsletterSectionEditorProps {
  section: NewsletterSectionData;
  onChange: (updated: Partial<NewsletterSectionData>) => void;
}

export function NewsletterSectionEditor({ section, onChange }: NewsletterSectionEditorProps) {
  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Newsletter Dispatch Narrative
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

      {/* Form Fields & UX */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Form Input & Feedback Strings
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Input Placeholder
            </label>
            <input
              type="text"
              value={section.inputPlaceholder}
              onChange={(e) => onChange({ inputPlaceholder: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={section.ctaText}
              onChange={(e) => onChange({ ctaText: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Success Toast Message
          </label>
          <input
            type="text"
            value={section.successMessage}
            onChange={(e) => onChange({ successMessage: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Privacy Assurance Statement
          </label>
          <input
            type="text"
            value={section.privacyMessage}
            onChange={(e) => onChange({ privacyMessage: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Background Styling */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Background Mood Treatment
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "editorial", label: "Editorial Charcoal", desc: "Muted darkroom luxury tone" },
            { id: "dark-luxury", label: "Deep Velvet Black", desc: "Gold bordered high-contrast" },
            { id: "minimal", label: "Minimalist Bordered", desc: "Clean geometric outline" },
            { id: "image", label: "Studio Texture Wash", desc: "Subtle organic fabric grain" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChange({
                  backgroundStyle: item.id as NewsletterSectionData["backgroundStyle"],
                })
              }
              className={`p-2.5 border text-left transition-colors ${
                section.backgroundStyle === item.id
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
    </div>
  );
}
