import {
  X,
  BarChart2,
  TrendingUp,
  Users,
  Clock,
  MousePointer,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import type { PageItem } from "../pages-types";

interface PageAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageItem;
}

export function PageAnalyticsModal({ isOpen, onClose, page }: PageAnalyticsModalProps) {
  if (!isOpen) return null;

  const analytics = page.analytics || {
    totalViews: 18420,
    uniqueVisitors: 12150,
    avgTimeOnPage: "2m 45s",
    bounceRate: "28.4%",
    ctaClicks: 3240,
    conversionRate: "4.8%",
    viewsHistory: [
      { date: "Aug 20", views: 1200 },
      { date: "Aug 21", views: 1850 },
      { date: "Aug 22", views: 2100 },
      { date: "Aug 23", views: 2400 },
      { date: "Aug 24", views: 3100 },
      { date: "Aug 25", views: 3800 },
      { date: "Aug 26", views: 3970 },
    ],
  };

  const maxViews = Math.max(...analytics.viewsHistory.map((h) => h.views), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-3xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2.5">
            <div className="size-8 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
              <BarChart2 className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
                Page Analytics — {page.name}
              </h3>
              <p className="text-xs font-mono text-gold">{page.slug}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-surface-2 border border-border space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-between">
                Total Views <TrendingUp className="size-3 text-emerald-400" />
              </span>
              <p className="text-xl font-display font-medium text-foreground">
                {analytics.totalViews.toLocaleString()}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 block">
                +14.2% vs last week
              </span>
            </div>

            <div className="p-3.5 bg-surface-2 border border-border space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-between">
                Unique Visitors <Users className="size-3 text-gold" />
              </span>
              <p className="text-xl font-display font-medium text-gold">
                {analytics.uniqueVisitors.toLocaleString()}
              </p>
              <span className="text-[10px] font-mono text-muted-foreground block">
                66% return patrons
              </span>
            </div>

            <div className="p-3.5 bg-surface-2 border border-border space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-between">
                Avg. Time on Page <Clock className="size-3 text-sky-400" />
              </span>
              <p className="text-xl font-display font-medium text-foreground">
                {analytics.avgTimeOnPage}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 block">High engagement</span>
            </div>

            <div className="p-3.5 bg-surface-2 border border-border space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-between">
                CTA Conversion <MousePointer className="size-3 text-amber-400" />
              </span>
              <p className="text-xl font-display font-medium text-amber-400">
                {analytics.conversionRate}
              </p>
              <span className="text-[10px] font-mono text-muted-foreground block">
                {analytics.ctaClicks} Total Clicks
              </span>
            </div>
          </div>

          {/* SVG Traffic Trend Chart */}
          <div className="p-5 bg-surface-2/40 border border-border space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Daily Page Views Trend (Past 7 Days)
              </h4>
              <span className="text-[10px] font-mono text-gold">Live Telemetry</span>
            </div>

            {/* SVG Histogram Bar Chart */}
            <div className="h-40 flex items-end gap-3 pt-6 pb-2 border-b border-border/60">
              {analytics.viewsHistory.map((point) => {
                const heightPercent = Math.round((point.views / maxViews) * 100);
                return (
                  <div
                    key={point.date}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
                  >
                    <span className="text-[9px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.views}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gold/30 group-hover:bg-gold border-t border-gold transition-all duration-300"
                    />
                    <span className="text-[9px] font-mono text-muted-foreground">{point.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-2/40 border border-border space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase text-foreground">
                Device Breakdown
              </h5>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Mobile Devices</span>
                    <span className="text-foreground">58%</span>
                  </div>
                  <div className="w-full bg-surface-2 h-1.5 border border-border overflow-hidden">
                    <div className="bg-gold h-full w-[58%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Desktop Workstations</span>
                    <span className="text-foreground">36%</span>
                  </div>
                  <div className="w-full bg-surface-2 h-1.5 border border-border overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[36%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Tablet Devices</span>
                    <span className="text-foreground">6%</span>
                  </div>
                  <div className="w-full bg-surface-2 h-1.5 border border-border overflow-hidden">
                    <div className="bg-sky-400 h-full w-[6%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-2/40 border border-border space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase text-foreground">
                Top Clicked CTAs
              </h5>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 bg-surface border border-border">
                  <span className="text-foreground truncate">Explore Production Standards</span>
                  <span className="text-gold font-bold">1,820 clicks</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface border border-border">
                  <span className="text-foreground truncate">Shop Heavyweight Drop</span>
                  <span className="text-gold font-bold">940 clicks</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface border border-border">
                  <span className="text-foreground truncate">Join Nocturne Dispatch</span>
                  <span className="text-gold font-bold">480 clicks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
          >
            Close Analytics
          </button>
          <a
            href={page.slug}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-gold hover:underline inline-flex items-center gap-1"
          >
            Open Live Page <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
