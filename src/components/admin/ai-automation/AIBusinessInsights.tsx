import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Layers,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { AI_INSIGHTS_DATA } from "./ai-mock-data";
import { AIInsight } from "./types";
import { toast } from "sonner";

export function AIBusinessInsights() {
  const [insights, setInsights] = useState<AIInsight[]>(AI_INSIGHTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = insights.filter(
    (i) => selectedCategory === "All" || i.category === selectedCategory,
  );

  const handleExecuteAction = (ins: AIInsight) => {
    toast.success("AI Recommendation Executed", {
      description: `Action: ${ins.recommendedAction}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI Business & Merchandising Insights
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Autonomous intelligence parsing real-time patron clickstreams, cart abandonment
            affinities, and POD node fulfillment velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast.success("AI Models Re-computed telemetry matrix")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors"
          >
            <RefreshCw className="size-3 text-gold" /> Re-scan Telemetry
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-surface border border-border p-2">
        {["All", "Conversion", "Merchandising", "Logistics", "Customer Retention"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
              selectedCategory === cat
                ? "bg-gold text-background font-bold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((ins) => (
          <div
            key={ins.id}
            className="p-6 bg-surface border border-border hover:border-gold/80 transition-all flex flex-col justify-between group space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 uppercase">
                  {ins.category} • {ins.impact} Impact
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {ins.confidence}% Confidence
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold font-display tracking-wider text-foreground uppercase group-hover:text-gold transition-colors">
                  {ins.headline}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-sans">
                  {ins.narrative}
                </p>
              </div>

              {/* Data source */}
              <div className="p-3 bg-surface-2 border border-border text-[11px] font-mono text-muted-foreground">
                <span className="text-foreground font-bold">Data Provenance: </span>
                {ins.dataSource}
              </div>
            </div>

            {/* Recommendation & Action */}
            <div className="pt-4 border-t border-border/80 space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gold block">
                  Recommended Autonomous Action:
                </span>
                <p className="text-xs font-semibold text-foreground">{ins.recommendedAction}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-muted-foreground">{ins.timestamp}</span>
                <button
                  type="button"
                  onClick={() => handleExecuteAction(ins)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-background hover:bg-foreground hover:text-background font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Zap className="size-3.5" /> Execute Action
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
