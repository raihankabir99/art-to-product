import { useState } from "react";
import {
  PanelBottom,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Save,
  Globe,
  CreditCard,
  Share2,
  Mail,
  Check,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import type { FooterColumn, FooterSettings } from "../pages-types";
import { INITIAL_FOOTER_COLUMNS, INITIAL_FOOTER_SETTINGS } from "../pages-initial-data";

export function FooterManager() {
  const [columns, setColumns] = useState<FooterColumn[]>(INITIAL_FOOTER_COLUMNS);
  const [settings, setSettings] = useState<FooterSettings>(INITIAL_FOOTER_SETTINGS);
  const [activeTab, setActiveTab] = useState<"columns" | "brand" | "newsletter" | "payments">(
    "columns",
  );

  const handleSave = () => {
    toast.success("Footer configuration published live", {
      description: "Storefront footer layout and legal links updated across global edge CDNs.",
    });
  };

  const handleAddColumn = () => {
    const newCol: FooterColumn = {
      id: `fcol_${Date.now()}`,
      title: "NEW COLUMN",
      links: [{ id: `flnk_${Date.now()}`, label: "Sample Link", url: "/" }],
    };
    setColumns((prev) => [...prev, newCol]);
    toast.success("Footer column added");
  };

  const handleAddLink = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              links: [...col.links, { id: `flnk_${Date.now()}`, label: "New Link", url: "/" }],
            }
          : col,
      ),
    );
  };

  const handleDeleteLink = (columnId: string, linkId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, links: col.links.filter((l) => l.id !== linkId) } : col,
      ),
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= HEADER CONTROL BAR ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <PanelBottom className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Footer & Global Disclosure Studio
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage footer multi-column links, brand mission copy, newsletter widgets, and payment
            badges.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors shrink-0"
        >
          <Save className="size-4" /> Publish Footer
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex items-center gap-1 bg-surface p-1 border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("columns")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "columns"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Column Links ({columns.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("brand")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "brand"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Brand & Legal Copy
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("newsletter")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "newsletter"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Newsletter Widget
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("payments")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "payments"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Payment Badges
        </button>
      </div>

      {/* ================= COLUMN LINKS TAB ================= */}
      {activeTab === "columns" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-surface border border-border">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Multi-Column Link Structures
            </span>
            <button
              type="button"
              onClick={handleAddColumn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors"
            >
              <Plus className="size-3.5" /> Add Column
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {columns.map((col) => (
              <div
                key={col.id}
                className="p-5 bg-surface border border-border space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <input
                      type="text"
                      value={col.title}
                      onChange={(e) =>
                        setColumns((prev) =>
                          prev.map((c) => (c.id === col.id ? { ...c, title: e.target.value } : c)),
                        )
                      }
                      className="px-2 py-1 bg-surface-2 border border-border text-xs font-bold text-foreground uppercase tracking-wider focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    {col.links.map((lnk) => (
                      <div
                        key={lnk.id}
                        className="p-2 bg-surface-2 border border-border space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={lnk.label}
                            onChange={(e) =>
                              setColumns((prev) =>
                                prev.map((c) =>
                                  c.id === col.id
                                    ? {
                                        ...c,
                                        links: c.links.map((l) =>
                                          l.id === lnk.id ? { ...l, label: e.target.value } : l,
                                        ),
                                      }
                                    : c,
                                ),
                              )
                            }
                            className="px-2 py-0.5 bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-gold w-full"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(col.id, lnk.id)}
                            className="text-muted-foreground hover:text-red-400 p-1"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={lnk.url}
                          onChange={(e) =>
                            setColumns((prev) =>
                              prev.map((c) =>
                                c.id === col.id
                                  ? {
                                      ...c,
                                      links: c.links.map((l) =>
                                        l.id === lnk.id ? { ...l, url: e.target.value } : l,
                                      ),
                                    }
                                  : c,
                              ),
                            )
                          }
                          className="px-2 py-0.5 bg-surface border border-border text-[10px] font-mono text-gold focus:outline-none w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddLink(col.id)}
                  className="w-full py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center gap-1 mt-2"
                >
                  <Plus className="size-3" /> Add Link
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BRAND & LEGAL TAB ================= */}
      {activeTab === "brand" && (
        <div className="p-6 bg-surface border border-border space-y-5 max-w-2xl">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Brand Mission / Atelier Tagline
            </label>
            <textarea
              value={settings.brandTagline}
              onChange={(e) => setSettings({ ...settings, brandTagline: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Copyright Disclosure Notice
            </label>
            <input
              type="text"
              value={settings.copyrightText}
              onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      )}

      {/* ================= NEWSLETTER TAB ================= */}
      {activeTab === "newsletter" && (
        <div className="p-6 bg-surface border border-border space-y-4 max-w-2xl">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Newsletter Heading
            </label>
            <input
              type="text"
              value={settings.newsletterHeading}
              onChange={(e) => setSettings({ ...settings, newsletterHeading: e.target.value })}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Subtitle Copy
            </label>
            <input
              type="text"
              value={settings.newsletterSubtitle}
              onChange={(e) => setSettings({ ...settings, newsletterSubtitle: e.target.value })}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      )}

      {/* ================= PAYMENT BADGES TAB ================= */}
      {activeTab === "payments" && (
        <div className="p-6 bg-surface border border-border space-y-4 max-w-2xl">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
            Enabled Storefront Payment Badges
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Visa",
              "Mastercard",
              "American Express",
              "Apple Pay",
              "Klarna",
              "PayPal",
              "Bitcoin",
            ].map((badge) => {
              const isEnabled = settings.paymentBadges.includes(badge);
              return (
                <button
                  key={badge}
                  type="button"
                  onClick={() => {
                    const updated = isEnabled
                      ? settings.paymentBadges.filter((b) => b !== badge)
                      : [...settings.paymentBadges, badge];
                    setSettings({ ...settings, paymentBadges: updated });
                  }}
                  className={`p-3 border text-xs font-mono flex items-center justify-between transition-colors ${
                    isEnabled
                      ? "bg-gold/10 border-gold text-gold font-bold"
                      : "bg-surface-2 border-border text-muted-foreground"
                  }`}
                >
                  <span>{badge}</span>
                  {isEnabled && <Check className="size-4 text-gold" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= LIVE FOOTER PREVIEW CARD ================= */}
      <div className="p-8 bg-surface border border-border space-y-6">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-gold font-bold flex items-center gap-2">
            <Eye className="size-4" /> Live Footer Preview
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            REAL-TIME STOREFRONT RENDER
          </span>
        </div>

        <div className="space-y-8 text-foreground font-sans">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-lg font-display font-bold text-gold tracking-widest uppercase">
                STUDIO NOIR
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {settings.brandTagline}
              </p>
            </div>

            {columns.map((c) => (
              <div key={c.id} className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  {c.title}
                </span>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {c.links.map((l) => (
                    <li key={l.id} className="hover:text-gold cursor-pointer transition-colors">
                      {l.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <p>{settings.copyrightText}</p>
            <div className="flex items-center gap-2">
              {settings.paymentBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-0.5 bg-surface-2 border border-border text-[10px]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
