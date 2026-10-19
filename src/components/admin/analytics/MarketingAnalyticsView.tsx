import { useState } from "react";
import {
  Target,
  Mail,
  Instagram,
  Share2,
  Search,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Layers,
  Percent,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MARKETING_CHANNELS_LIST } from "./analytics-mock-data";

export function MarketingAnalyticsView() {
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "traffic" | "conversions">(
    "revenue",
  );
  const channels = MARKETING_CHANNELS_LIST;

  const totalMarketingRevenue = channels.reduce((acc, c) => acc + c.revenue, 0);

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP MARKETING STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            VIP Email Broadcasts
          </span>
          <div className="text-xl font-display font-semibold text-gold mt-2">
            €17,112.00 (35.0%)
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-1">840% ROI • €4.20 CPA</div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Paid Social (Instagram + TikTok)
          </span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            €14,720.00 (30.1%)
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">230 Conversions</div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Organic Search & Direct
          </span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            €15,840.00 (32.4%)
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-1">€0 Acquisition Cost</div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Blended Marketing CPA
          </span>
          <div className="text-xl font-display font-semibold text-emerald-400 mt-2">
            €8.40 / acquisition
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">7.8x LTV to CAC Ratio</div>
        </div>
      </div>

      {/* 2. REVENUE ATTRIBUTION BAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <Target className="size-4 text-gold" />
                <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                  Channel Attribution Breakdown
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Multi-touch revenue attribution across email sequences, social shopping, and organic
                discovery.
              </p>
            </div>

            <div className="flex items-center bg-surface-2 p-0.5 border border-border">
              <button
                onClick={() => setSelectedMetric("revenue")}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  selectedMetric === "revenue"
                    ? "bg-gold text-black font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Revenue (€)
              </button>
              <button
                onClick={() => setSelectedMetric("traffic")}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  selectedMetric === "traffic"
                    ? "bg-gold text-black font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sessions
              </button>
              <button
                onClick={() => setSelectedMetric("conversions")}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  selectedMetric === "conversions"
                    ? "bg-gold text-black font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Orders
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
                <XAxis
                  dataKey="channel"
                  stroke="oklch(0.68 0.005 90 / 50%)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(0.68 0.005 90 / 50%)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => (selectedMetric === "revenue" ? `€${v}` : `${v}`)}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="p-3 bg-surface border border-gold/40 text-xs font-mono space-y-1">
                          <p className="text-gold font-bold">{d.channel}</p>
                          <p className="text-foreground">Revenue: €{d.revenue.toLocaleString()}</p>
                          <p className="text-muted-foreground">
                            Traffic: {d.traffic.toLocaleString()} sessions
                          </p>
                          <p className="text-muted-foreground">
                            Conversions: {d.conversions} orders
                          </p>
                          <p className="text-emerald-400">ROI: {d.roi}</p>
                          <p className="text-muted-foreground">Share: {d.share}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey={selectedMetric} fill="oklch(0.79 0.1 85)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Share Distribution List */}
        <div className="lg:col-span-4 p-6 bg-surface border border-border space-y-4">
          <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
            Revenue Share Allocation
          </h3>

          <div className="space-y-3">
            {channels.map((ch, idx) => (
              <div key={idx} className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-foreground truncate w-40">{ch.channel}</span>
                  <span className="text-gold font-bold">{ch.share}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${ch.share * 2.8}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border text-[11px] font-mono text-muted-foreground">
            Direct & Email campaigns yield highest margin with zero ad exchange fee.
          </div>
        </div>
      </div>

      {/* 3. MARKETING CHANNEL TABLE */}
      <div className="bg-surface border border-border overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Channel / Source</th>
              <th className="py-3 px-4 text-right">Traffic Sessions</th>
              <th className="py-3 px-4 text-right">Conversions</th>
              <th className="py-3 px-4 text-right">Attributed Revenue</th>
              <th className="py-3 px-4 text-right">Return on Ad Spend (ROAS)</th>
              <th className="py-3 px-4 text-right">CPA</th>
              <th className="py-3 px-4 text-right">Revenue Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {channels.map((ch, i) => (
              <tr key={i} className="hover:bg-surface-2/60 transition-colors">
                <td className="py-3 px-4 font-semibold text-foreground">{ch.channel}</td>
                <td className="py-3 px-4 text-right text-muted-foreground">
                  {ch.traffic.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-foreground font-semibold">
                  {ch.conversions}
                </td>
                <td className="py-3 px-4 text-right text-foreground font-semibold">
                  €{ch.revenue.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-emerald-400 font-semibold">{ch.roi}</td>
                <td className="py-3 px-4 text-right text-muted-foreground">
                  {ch.cpa > 0 ? `€${ch.cpa.toFixed(2)}` : "€0.00 (Org)"}
                </td>
                <td className="py-3 px-4 text-right text-gold font-semibold">{ch.share}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
