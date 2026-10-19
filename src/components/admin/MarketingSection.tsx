import { useState } from "react";
import {
  Percent,
  Tag,
  Mail,
  Flame,
  Plus,
  Copy,
  Check,
  Trash2,
  Edit2,
  Megaphone,
} from "lucide-react";
import { toast } from "sonner";
import type { ModalType } from "./QuickActionModals";

interface MarketingSectionProps {
  subSection: string;
  onOpenModal: (type: ModalType) => void;
}

export function MarketingSection({ subSection, onOpenModal }: MarketingSectionProps) {
  const [coupons, setCoupons] = useState([
    {
      code: "ATELIER10",
      discount: "10% OFF",
      type: "Percentage",
      usageCount: 342,
      limit: "Unlimited",
      status: "Active",
      expires: "Dec 31, 2026",
    },
    {
      code: "FIRSTDROP",
      discount: "15% OFF",
      type: "First-Order Patron",
      usageCount: 819,
      limit: "1 per customer",
      status: "Active",
      expires: "Ongoing",
    },
    {
      code: "VIPCONCIERGE",
      discount: "€30 OFF",
      type: "Fixed Amount (>€150)",
      usageCount: 64,
      limit: "VIP Tier Only",
      status: "Active",
      expires: "Nov 15, 2026",
    },
  ]);

  const [subscribers, setSubscribers] = useState([
    { email: "art.collector@zurich.ch", tier: "VIP", date: "Today", source: "Homepage Newsletter" },
    { email: "editorial@monocle.com", tier: "Press", date: "Yesterday", source: "Journal Article" },
    { email: "laura.b@studio-milan.it", tier: "Patron", date: "23 Aug", source: "Checkout Opt-in" },
    { email: "s.nakamura@tokyo-arch.jp", tier: "VIP", date: "22 Aug", source: "Lookbook Drop" },
    { email: "g.vance@oslo-nord.no", tier: "Patron", date: "20 Aug", source: "Footer Form" },
  ]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied code "${code}" to clipboard`);
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= COUPONS & PROMOTIONS ================= */}
      {(subSection === "coupons" || subSection === "promotions" || subSection === "overview") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Discount Codes & Campaign Rules
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Configure percentage discounts, minimum basket tiers, free shipping codes, and
                private VIP vouchers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("create-promotion")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors self-start sm:self-auto"
            >
              <Plus className="size-4" /> Create Coupon
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-5 bg-surface border border-border space-y-4 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-gold">{c.code}</span>
                    <button
                      type="button"
                      onClick={() => copyCode(c.code)}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy code"
                    >
                      <Copy className="size-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {c.status}
                  </span>
                </div>

                <div>
                  <p className="text-xl font-display font-semibold text-foreground">{c.discount}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.type}</p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{c.usageCount} Redemptions</span>
                  <span>{c.expires}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= NEWSLETTER SUBSCRIBERS ================= */}
      {subSection === "newsletter" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Patron Newsletter & Editorial Dispatch
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                4,850 subscribers subscribed to weekly editorial drop announcements and lookbook
                releases.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Exporting subscriber CSV list")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-background transition-colors"
            >
              Export CSV
            </button>
          </div>

          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono bg-surface-2/40">
                  <th className="p-3.5">Subscriber Email</th>
                  <th className="p-3.5">Audience Segment</th>
                  <th className="p-3.5">Capture Source</th>
                  <th className="p-3.5">Subscribed Date</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {subscribers.map((sub, i) => (
                  <tr key={i} className="hover:bg-surface-2/70 transition-colors">
                    <td className="p-3.5 font-medium text-foreground font-mono">{sub.email}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-gold/10 text-gold border border-gold/30">
                        {sub.tier}
                      </span>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{sub.source}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{sub.date}</td>
                    <td className="p-3.5 text-right">
                      <span className="text-[10px] uppercase font-mono text-emerald-400">
                        Subscribed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= CAMPAIGNS SUBSECTION ================= */}
      {subSection === "campaigns" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Seasonal Drops & Campaign Schedules
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Schedule synchronized drop timers, email blasts, and homepage takeover takeovers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("create-promotion")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              <Plus className="size-4" /> Schedule Drop
            </button>
          </div>

          <div className="p-6 bg-surface border border-border flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-gold">UPCOMING DROP</span>
              <h3 className="text-lg font-display font-medium text-foreground">
                Equinox 2026: Heavyweight Archival Collection
              </h3>
              <p className="text-xs text-muted-foreground">
                Releasing 4 new physical silhouettes in 400gsm brushed cotton fleece.
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xl font-semibold text-gold">14d : 08h : 22m</span>
              <p className="text-[11px] text-muted-foreground mt-1">September 8, 2026</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
