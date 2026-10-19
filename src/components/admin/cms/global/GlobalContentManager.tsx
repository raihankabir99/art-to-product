import { useState } from "react";
import {
  Globe,
  Megaphone,
  Sparkles,
  ShieldCheck,
  Save,
  Check,
  Plus,
  Trash2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import type { GlobalSettings } from "../pages-types";
import { INITIAL_GLOBAL_SETTINGS } from "../pages-initial-data";

export function GlobalContentManager() {
  const [settings, setSettings] = useState<GlobalSettings>(INITIAL_GLOBAL_SETTINGS);
  const [activeTab, setActiveTab] = useState<"announcement" | "ctas" | "trust" | "cookie">(
    "announcement",
  );

  const handleSave = () => {
    toast.success("Global website content published live", {
      description:
        "Announcement bar, CTA presets, and Cookie notices updated across all storefront views.",
    });
  };

  const handleAddCta = () => {
    const newCta = {
      id: `cta_${Date.now()}`,
      name: "New CTA Preset",
      label: "EXPLORE COLLECTION",
      url: "/shop",
      style: "gold",
    };
    setSettings((prev) => ({ ...prev, ctaPresets: [...prev.ctaPresets, newCta] }));
    toast.success("CTA Preset created");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= HEADER CONTROL BAR ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Global Content & Banner Manager
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure site-wide top announcement banners, global CTA presets, trust badges, and GDPR
            privacy consent.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors shrink-0"
        >
          <Save className="size-4" /> Publish Global Content
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex items-center gap-1 bg-surface p-1 border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("announcement")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "announcement"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Megaphone className="size-4" /> Announcement Bar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ctas")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "ctas"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="size-4" /> CTA Presets
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("trust")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "trust"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck className="size-4" /> Trust Badges
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cookie")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "cookie"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Lock className="size-4" /> Cookie Consent
        </button>
      </div>

      {/* ================= ANNOUNCEMENT BAR TAB ================= */}
      {activeTab === "announcement" && (
        <div className="p-6 bg-surface border border-border space-y-5 max-w-2xl">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="text-xs font-semibold text-foreground block">
                Announcement Bar Banner
              </span>
              <span className="text-[11px] text-muted-foreground">
                Sticky header banner at the top of every page
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  announcementBar: {
                    ...settings.announcementBar,
                    enabled: !settings.announcementBar.enabled,
                  },
                })
              }
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                settings.announcementBar.enabled
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-surface-2 text-muted-foreground border-border"
              }`}
            >
              {settings.announcementBar.enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Banner Message
            </label>
            <input
              type="text"
              value={settings.announcementBar.text}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, text: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Link Target URL
            </label>
            <input
              type="text"
              value={settings.announcementBar.linkUrl}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, linkUrl: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-gold focus:outline-none focus:border-gold"
            />
          </div>

          {/* Live Preview Bar */}
          <div className="p-3 bg-gold text-background text-xs font-mono text-center font-bold tracking-widest uppercase shadow">
            PREVIEW: {settings.announcementBar.text}
          </div>
        </div>
      )}

      {/* ================= CTA PRESETS TAB ================= */}
      {activeTab === "ctas" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface border border-border">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Reusable Call-To-Action Button Presets
            </span>
            <button
              type="button"
              onClick={handleAddCta}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors"
            >
              <Plus className="size-3.5" /> Add Preset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settings.ctaPresets.map((cta) => (
              <div key={cta.id} className="p-4 bg-surface border border-border space-y-3">
                <input
                  type="text"
                  value={cta.name}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      ctaPresets: prev.ctaPresets.map((c) =>
                        c.id === cta.id ? { ...c, name: e.target.value } : c,
                      ),
                    }))
                  }
                  className="px-2 py-1 bg-surface-2 border border-border text-xs font-bold text-foreground focus:outline-none"
                />

                <input
                  type="text"
                  value={cta.label}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      ctaPresets: prev.ctaPresets.map((c) =>
                        c.id === cta.id ? { ...c, label: e.target.value } : c,
                      ),
                    }))
                  }
                  className="px-2 py-1 bg-surface-2 border border-border text-xs uppercase font-mono text-gold focus:outline-none w-full"
                />

                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full py-2 bg-gold text-background font-semibold text-xs uppercase tracking-wider"
                  >
                    {cta.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TRUST BADGES TAB ================= */}
      {activeTab === "trust" && (
        <div className="p-6 bg-surface border border-border space-y-4 max-w-2xl">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
            Storefront Trust & Authenticity Badges
          </label>
          <div className="space-y-3">
            {settings.trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-3 bg-surface-2 border border-border flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-foreground">{badge.title}</p>
                  <p className="text-[11px] text-muted-foreground">{badge.subtitle}</p>
                </div>
                <ShieldCheck className="size-5 text-gold shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= COOKIE CONSENT TAB ================= */}
      {activeTab === "cookie" && (
        <div className="p-6 bg-surface border border-border space-y-4 max-w-2xl">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              GDPR Cookie Banner Heading
            </label>
            <input
              type="text"
              value={settings.cookieConsent.heading}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cookieConsent: { ...settings.cookieConsent, heading: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Privacy Disclaimer Copy
            </label>
            <textarea
              value={settings.cookieConsent.body}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cookieConsent: { ...settings.cookieConsent, body: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
