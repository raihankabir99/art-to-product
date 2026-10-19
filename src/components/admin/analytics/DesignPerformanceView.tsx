import { useState } from "react";
import {
  Palette,
  Eye,
  ShoppingCart,
  Percent,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DESIGN_PERFORMANCE_CATALOG } from "./analytics-mock-data";
import type { DesignBreakdownItem } from "./types";

export function DesignPerformanceView() {
  const [selectedDesignId, setSelectedDesignId] = useState<string>("des-midnight-lion");

  const currentDesign =
    DESIGN_PERFORMANCE_CATALOG.find((d) => d.id === selectedDesignId) ||
    DESIGN_PERFORMANCE_CATALOG[0];

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. DESIGN SELECTOR TABS & ARTWORK HEADER */}
      <div className="p-6 bg-surface border border-border space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-gold" />
              <h2 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                Cross-Silhouette Artwork Matrix
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Analyze how a single core artwork asset monetizes across all 13 print silhouettes and
              apparel canvases.
            </p>
          </div>

          {/* Design Switcher Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {DESIGN_PERFORMANCE_CATALOG.map((design) => (
              <button
                key={design.id}
                onClick={() => setSelectedDesignId(design.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
                  selectedDesignId === design.id
                    ? "bg-gold text-black font-semibold shadow-md"
                    : "bg-surface-2 border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{design.designName}</span>
                {selectedDesignId === design.id && <Check className="size-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Artwork Deep-Dive Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 flex items-center gap-4">
            <img
              src={currentDesign.image}
              alt={currentDesign.designName}
              referrerPolicy="no-referrer"
              className="size-24 object-cover border border-gold/40 shadow-xl flex-shrink-0"
            />
            <div>
              <span className="text-[10px] font-mono uppercase text-gold">Featured Artwork</span>
              <h3 className="text-lg font-display font-semibold text-foreground tracking-tight">
                {currentDesign.designName}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">By {currentDesign.artist}</p>
              <div className="mt-2 text-[11px] font-mono text-emerald-400">
                Top Silhouette: {currentDesign.topSilhouette}
              </div>
            </div>
          </div>

          <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">
                Combined Revenue
              </span>
              <div className="text-xl font-display font-semibold text-foreground mt-1">
                €{currentDesign.totalRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-emerald-400">+22.4% MoM</span>
            </div>

            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">
                Total Units Sold
              </span>
              <div className="text-xl font-display font-semibold text-foreground mt-1">
                {currentDesign.totalOrders}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">Across 13 items</span>
            </div>

            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">
                Catalog Impressions
              </span>
              <div className="text-xl font-display font-semibold text-foreground mt-1">
                {currentDesign.totalViews.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">Total views</span>
            </div>

            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">
                Avg Conversion
              </span>
              <div className="text-xl font-display font-semibold text-emerald-400 mt-1">
                {currentDesign.conversionRate}%
              </div>
              <span className="text-[10px] font-mono text-gold">+0.28% vs store avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 13 SILHOUETTE COMPARISON CHART & BREAKDOWN BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Horizontal Bar Chart for Silhouettes */}
        <div className="lg:col-span-7 p-6 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Revenue by Garment Canvas (€)
            </h3>
            <span className="text-xs font-mono text-muted-foreground">13 POD Products</span>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentDesign.silhouettes}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 65, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(1 0 0 / 6%)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="oklch(0.68 0.005 90 / 50%)"
                  fontSize={11}
                  tickFormatter={(v) => `€${v}`}
                />
                <YAxis
                  dataKey="silhouette"
                  type="category"
                  stroke="oklch(0.68 0.005 90 / 80%)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="p-3 bg-surface border border-gold/40 text-xs font-mono space-y-1">
                          <p className="text-gold font-bold">{label}</p>
                          <p className="text-foreground">Revenue: €{d.revenue.toLocaleString()}</p>
                          <p className="text-muted-foreground">Units Sold: {d.unitsSold}</p>
                          <p className="text-emerald-400">Conversion: {d.conversionRate}%</p>
                          <p className="text-gold">Share: {d.sharePercentage}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="revenue" fill="oklch(0.79 0.1 85)">
                  {currentDesign.silhouettes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "oklch(0.79 0.1 85)"
                          : index === 1
                            ? "oklch(0.70 0.08 85)"
                            : "oklch(0.55 0.05 85)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Bars & Share Distribution */}
        <div className="lg:col-span-5 p-6 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Silhouette Share Distribution
            </h3>
            <span className="text-xs font-mono text-gold">Top 6 Items</span>
          </div>

          <div className="space-y-4">
            {currentDesign.silhouettes.slice(0, 7).map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-bold">{idx + 1}.</span>
                    <span className="text-foreground font-medium">{item.silhouette}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{item.unitsSold} pcs</span>
                    <span className="text-gold font-semibold">€{item.revenue}</span>
                    <span className="text-muted-foreground w-10 text-right">
                      {item.sharePercentage}%
                    </span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-500"
                    style={{ width: `${Math.min(item.sharePercentage * 2.5, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>Apparel (Tees/Hoodies/Sweatshirts) generate 78.8% of GMV</span>
            <span className="text-gold">High Affinity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
