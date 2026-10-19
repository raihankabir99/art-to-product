import type { HeaderSectionData, FooterSectionData, HomepageSection } from "../homepage-types";

interface HeaderFooterEditorProps {
  section: HeaderSectionData | FooterSectionData;
  onChange: (updated: Partial<HomepageSection>) => void;
}

export function HeaderFooterEditor({ section, onChange }: HeaderFooterEditorProps) {
  if (section.type === "header") {
    return (
      <div className="space-y-6">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Storefront Header Configuration
        </h4>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.sticky}
              onChange={(e) => onChange({ sticky: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Sticky Header on Scroll</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.transparentOnHero}
              onChange={(e) => onChange({ transparentOnHero: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Transparent Header Overlay on Hero</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.showCurrencySelector}
              onChange={(e) => onChange({ showCurrencySelector: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Show Currency & Region Switcher (EUR/GBP/USD)</span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
        Storefront Footer & Legal Hub
      </h4>

      <div className="space-y-3">
        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Copyright & Studio Assurance
          </label>
          <textarea
            rows={2}
            value={section.copyrightText}
            onChange={(e) => onChange({ copyrightText: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={section.showTrustBadges}
            onChange={(e) => onChange({ showTrustBadges: e.target.checked })}
            className="accent-gold size-3.5 rounded-none"
          />
          <span>Show Trust & Organic Fabric Guarantee Badges</span>
        </label>

        <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={section.showCurrencySelector}
            onChange={(e) => onChange({ showCurrencySelector: e.target.checked })}
            className="accent-gold size-3.5 rounded-none"
          />
          <span>Show Currency & International Language Hub</span>
        </label>
      </div>
    </div>
  );
}
