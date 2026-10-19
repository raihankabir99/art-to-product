import { useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  DollarSign,
  ShoppingCart,
  Users,
  Percent,
  Package,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import type { AnalyticsDateRange, ComparisonType, AIInsightItem } from "./types";
import {
  ANALYTICS_KPIS,
  REVENUE_TIMELINE_SERIES,
  EXECUTIVE_BULLET_SUMMARY,
  AI_GENERATED_INSIGHTS,
} from "./analytics-mock-data";

interface AnalyticsExecutiveOverviewProps {
  currentRange: AnalyticsDateRange;
  onRangeChange: (range: AnalyticsDateRange) => void;
  comparison: ComparisonType;
  onComparisonChange: (comp: ComparisonType) => void;
  onNavigateToSub: (subId: string) => void;
  onOpenExport: () => void;
}

export function AnalyticsExecutiveOverview({
  currentRange,
  onRangeChange,
  comparison,
  onComparisonChange,
  onNavigateToSub,
  onOpenExport,
}: AnalyticsExecutiveOverviewProps) {
  const [timelineGranularity, setTimelineGranularity] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );
  const [activeMetric, setActiveMetric] = useState<"revenue" | "orders" | "aov">("revenue");
  const [insights, setInsights] = useState<AIInsightItem[]>(AI_GENERATED_INSIGHTS);
  const [insightFilter, setInsightFilter] = useState<"all" | "high" | "accepted">("all");

  const kpis = ANALYTICS_KPIS[currentRange] || ANALYTICS_KPIS["30d"];
  const timelineData = REVENUE_TIMELINE_SERIES[timelineGranularity];

  const handleInsightAction = (id: string, action: "accepted" | "dismissed") => {
    setInsights((prev) => prev.map((ins) => (ins.id === id ? { ...ins, status: action } : ins)));
  };

  const getKPIIcon = (id: string) => {
    switch (id) {
      case "revenue":
        return DollarSign;
      case "orders":
        return ShoppingCart;
      case "customers":
        return Users;
      case "conversion":
        return Percent;
      case "aov":
        return Layers;
      default:
        return Package;
    }
  };

  const filteredInsights = insights.filter((ins) => {
    if (insightFilter === "high") return ins.impact === "High";
    if (insightFilter === "accepted") return ins.status === "accepted";
    return ins.status !== "dismissed";
  });

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP EXECUTIVE BULLET INSIGHTS & AI SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Executive Summary */}
        <div className="lg:col-span-7 p-6 bg-surface border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="size-2 rounded-full bg-gold animate-pulse" />
                <span className="font-mono text-xs text-gold uppercase tracking-wider font-semibold">
                  Executive Briefing
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Updated Live • 30D Window
              </span>
            </div>

            <div className="space-y-3">
              {EXECUTIVE_BULLET_SUMMARY.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="font-mono text-gold font-bold text-xs mt-0.5">0{i + 1}</span>
                  <p className="text-foreground/90 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Synthesized across 8 fulfillment nodes & 13 silhouettes
            </span>
            <button
              onClick={() => onNavigateToSub("reports")}
              className="text-gold hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
            >
              Full Briefing <ArrowRight className="size-3" />
            </button>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="lg:col-span-5 p-6 bg-surface border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <h3 className="text-xs font-mono text-foreground uppercase tracking-wider font-semibold">
                  AI Actionable Opportunities
                </h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-gold/10 text-gold border border-gold/20">
                {filteredInsights.length} Available
              </span>
            </div>

            <div className="space-y-4">
              {filteredInsights.slice(0, 2).map((ins) => (
                <div
                  key={ins.id}
                  className={`p-4 border transition-all text-xs space-y-2.5 ${
                    ins.status === "accepted"
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : "bg-surface-2 border-border hover:border-gold/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-semibold">
                      {ins.impact} Priority • {ins.confidence}% Confidence
                    </span>
                    {ins.status === "accepted" && (
                      <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> Enacted
                      </span>
                    )}
                  </div>

                  <p className="font-medium text-foreground text-xs leading-snug">
                    {ins.keyFinding}
                  </p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {ins.recommendedAction}
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    {ins.status !== "accepted" ? (
                      <>
                        <button
                          onClick={() => handleInsightAction(ins.id, "accepted")}
                          className="px-2.5 py-1 bg-gold text-black hover:bg-gold/90 font-mono text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle2 className="size-3" /> Accept Action
                        </button>
                        <button
                          onClick={() => handleInsightAction(ins.id, "dismissed")}
                          className="px-2 py-1 border border-border text-muted-foreground hover:text-foreground text-[10px] font-mono uppercase"
                        >
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400">
                        Workflow queued in Automation Center
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground text-[11px]">
              Powered by Autonomous Studio Intelligence
            </span>
            <button
              onClick={() => onNavigateToSub("marketing")}
              className="text-gold hover:underline text-xs font-mono uppercase"
            >
              Explore Growth Map →
            </button>
          </div>
        </div>
      </div>

      {/* 2. 6 CINEMATIC EXECUTIVE KPI CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Core Enterprise Metrics
          </h3>
          <span className="text-xs font-mono text-muted-foreground">
            Comparing vs. {comparison === "previous_period" ? "Previous Period" : "Previous Year"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi) => {
            const Icon = getKPIIcon(kpi.id);
            return (
              <div
                key={kpi.id}
                className="p-5 bg-surface border border-border hover:border-gold/40 transition-all group relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                      {kpi.label}
                    </span>
                    <Icon className="size-3.5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-display font-semibold text-foreground tracking-tight">
                      {kpi.value}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className={`inline-flex items-center text-[11px] font-mono font-medium ${
                        kpi.change >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {kpi.change >= 0 ? "+" : ""}
                      {kpi.change}%
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      vs {kpi.previousPeriodValue}
                    </span>
                  </div>
                </div>

                {/* Sparkline visualization */}
                <div className="h-9 w-full mt-4 pt-2 border-t border-border/50">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpi.sparkline.map((val, idx) => ({ idx, val }))}>
                      <Line
                        type="monotone"
                        dataKey="val"
                        stroke="oklch(0.79 0.1 85)"
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CINEMATIC REVENUE & PERFORMANCE GRAPH */}
      <div className="p-6 bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-gold" />
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                Revenue & Velocity Trajectory
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Multi-metric trajectory plotting Gross Merchandise Value, volume throughput, and AOV
              expansion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Metric Switcher */}
            <div className="flex items-center bg-surface-2 p-0.5 border border-border">
              <button
                onClick={() => setActiveMetric("revenue")}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  activeMetric === "revenue"
                    ? "bg-gold text-black font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Revenue (€)
              </button>
              <button
                onClick={() => setActiveMetric("orders")}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  activeMetric === "orders"
                    ? "bg-gold text-black font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveMetric("aov")}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  activeMetric === "aov"
                    ? "bg-gold text-black font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                AOV (€)
              </button>
            </div>

            {/* Granularity Switcher */}
            <div className="flex items-center bg-surface-2 p-0.5 border border-border">
              <button
                onClick={() => setTimelineGranularity("daily")}
                className={`px-2.5 py-1 text-xs font-mono uppercase transition-colors ${
                  timelineGranularity === "daily"
                    ? "bg-foreground/10 text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimelineGranularity("weekly")}
                className={`px-2.5 py-1 text-xs font-mono uppercase transition-colors ${
                  timelineGranularity === "weekly"
                    ? "bg-foreground/10 text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimelineGranularity("monthly")}
                className={`px-2.5 py-1 text-xs font-mono uppercase transition-colors ${
                  timelineGranularity === "monthly"
                    ? "bg-foreground/10 text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* High-Contrast Cinematic Area Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.79 0.1 85)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="oklch(0.79 0.1 85)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="oklch(0.68 0.005 90 / 50%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.68 0.005 90 / 50%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) =>
                  activeMetric === "revenue" || activeMetric === "aov" ? `€${val}` : `${val}`
                }
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="p-3 bg-surface border border-gold/40 shadow-2xl text-xs font-mono space-y-1.5 backdrop-blur-md">
                        <p className="text-gold font-bold uppercase tracking-wider">{label}</p>
                        <div className="space-y-1 pt-1 border-t border-border">
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Revenue:</span>
                            <span className="text-foreground font-semibold">
                              €{d.revenue.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Orders:</span>
                            <span className="text-foreground font-semibold">{d.orders}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">AOV:</span>
                            <span className="text-gold font-semibold">€{d.aov}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Conversion:</span>
                            <span className="text-emerald-400 font-semibold">{d.conversion}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke="oklch(0.79 0.1 85)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#goldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Micro Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border text-xs font-mono">
          <div>
            <span className="text-muted-foreground block">Peak Single Day:</span>
            <span className="text-foreground font-semibold text-sm">€3,480.00 (Day 30)</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Average Daily Velocity:</span>
            <span className="text-foreground font-semibold text-sm">€1,630.66 / day</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Gross Margin Efficiency:</span>
            <span className="text-emerald-400 font-semibold text-sm">68.4% Net Contribution</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Forecast (End of Q4):</span>
            <span className="text-gold font-semibold text-sm">€164,000 (+26%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
