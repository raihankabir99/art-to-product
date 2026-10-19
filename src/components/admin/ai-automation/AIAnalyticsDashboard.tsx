import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  Zap,
  Clock,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

export function AIAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7D");

  // Sample data for charts
  const RUNS_BY_DAY = [
    { day: "Mon", runs: 6400, success: 6380, tokens: 420 },
    { day: "Tue", runs: 7100, success: 7080, tokens: 490 },
    { day: "Wed", runs: 7800, success: 7750, tokens: 530 },
    { day: "Thu", runs: 8200, success: 8180, tokens: 610 },
    { day: "Fri", runs: 9400, success: 9360, tokens: 720 },
    { day: "Sat", runs: 10200, success: 10150, tokens: 840 },
    { day: "Sun", runs: 8920, success: 8874, tokens: 690 },
  ];

  const TOP_FEATURES = [
    { name: "AI Product Description", share: 34, color: "bg-gold" },
    { name: "POD Geo-Routing Pipeline", share: 28, color: "bg-sky-400" },
    { name: "AI Customer Support Concierge", share: 18, color: "bg-emerald-400" },
    { name: "AI SEO Schema Synthesizer", share: 12, color: "bg-amber-400" },
    { name: "AI Blog Editorial Assistant", share: 8, color: "bg-purple-400" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI & Automation Analytics
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            High-precision telemetry measuring Gemini token utilization, automated POD pipeline
            throughput, and latency percentiles.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-2 border border-border p-1">
          {["24H", "7D", "30D", "90D"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                timeRange === r
                  ? "bg-gold text-background font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Metric summary boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Total Automations (7D)
          </span>
          <div className="text-2xl font-display font-medium text-foreground">58,020</div>
          <span className="text-[10px] font-mono text-emerald-400">+14.2% vs previous period</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Global Success Rate
          </span>
          <div className="text-2xl font-display font-medium text-emerald-400">99.54%</div>
          <span className="text-[10px] font-mono text-muted-foreground">0.06% retry recovery</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Total GenAI Tokens
          </span>
          <div className="text-2xl font-display font-medium text-foreground">4.3M Tokens</div>
          <span className="text-[10px] font-mono text-gold">Gemini 1.5 Pro & Flash</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Median P95 Latency
          </span>
          <div className="text-2xl font-display font-medium text-foreground">340ms</div>
          <span className="text-[10px] font-mono text-emerald-400">Optimal edge routing</span>
        </div>
      </div>

      {/* Cinematic Bar & Progress Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Automation Throughput Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Daily Automation Pipeline Runs & Success Volume
            </h3>
            <span className="text-[10px] font-mono text-gold">Weekly Peak: 10,200 Runs</span>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {RUNS_BY_DAY.map((item, idx) => {
              const heightPct = (item.runs / 11000) * 100;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                >
                  <div className="text-[10px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.runs.toLocaleString()}
                  </div>

                  <div className="w-full bg-surface-2 border border-border relative overflow-hidden h-full flex items-end">
                    {/* Background Bar */}
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-gold/30 to-gold border-t border-gold transition-all duration-700 group-hover:brightness-125"
                    />
                  </div>

                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-border">
            <span className="flex items-center gap-1.5">
              <span className="size-2 bg-gold inline-block" /> Total Pipeline Invocations
            </span>
            <span>Zero Data Loss Protocol Active</span>
          </div>
        </div>

        {/* Feature Usage Share Breakdown (4 Cols) */}
        <div className="lg:col-span-4 p-6 bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Feature Distribution
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">By Token Volume</span>
          </div>

          <div className="space-y-4">
            {TOP_FEATURES.map((feat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground font-display uppercase">
                    {feat.name}
                  </span>
                  <span className="font-mono text-gold">{feat.share}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-2 border border-border overflow-hidden">
                  <div
                    style={{ width: `${feat.share}%` }}
                    className={`h-full ${feat.color} transition-all duration-700`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-surface-2 border border-border text-[11px] font-mono text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Token Efficiency:</span>
              <span className="text-emerald-400">98.2% useful density</span>
            </div>
            <div className="flex justify-between">
              <span>Cache Hit Ratio:</span>
              <span className="text-foreground">72.4% edge cached</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
