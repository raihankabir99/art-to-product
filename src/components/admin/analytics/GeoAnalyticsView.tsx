import { useState } from "react";
import {
  Globe2,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Sparkles,
} from "lucide-react";
import { GEO_MARKET_LIST } from "./analytics-mock-data";
import type { GeoMarketItem } from "./types";

export function GeoAnalyticsView() {
  const [selectedCountry, setSelectedCountry] = useState<GeoMarketItem>(GEO_MARKET_LIST[0]);
  const [activeFilter, setActiveFilter] = useState<"revenue" | "growth" | "conversion">("revenue");

  const sortedList = [...GEO_MARKET_LIST].sort((a, b) => {
    if (activeFilter === "growth") return b.growth - a.growth;
    if (activeFilter === "conversion") return b.conversionRate - a.conversionRate;
    return b.revenue - a.revenue;
  });

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP GLOBAL STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">Primary Market</span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            Germany (DE) 🇩🇪
          </div>
          <div className="text-xs font-mono text-gold mt-1">€16,184.00 • 33.1% of global GMV</div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Fastest Growing Region
          </span>
          <div className="text-xl font-display font-semibold text-emerald-400 mt-2">
            Saudi Arabia (SA) 🇸🇦
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            +48.0% MoM • €89.00 AOV
          </div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Highest Conversion Market
          </span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            Netherlands (NL) 🇳🇱
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-1">
            4.10% Conversion • €70.00 AOV
          </div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Active Shipping Zones
          </span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            28 Countries
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            Global DDP & Tax Automated
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE GEO MAP & ACTIVE NODE HIGHLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* World Geo Nodes View */}
        <div className="lg:col-span-8 p-6 bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <Globe2 className="size-4 text-gold" />
                <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                  International Order Distribution
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time regional telemetry across European hubs and international direct
                corridors.
              </p>
            </div>
            <span className="text-xs font-mono text-gold">9 Major Ingress Markets</span>
          </div>

          {/* Stylized World Hub Grid Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GEO_MARKET_LIST.map((geo) => (
              <div
                key={geo.countryCode}
                onClick={() => setSelectedCountry(geo)}
                className={`p-4 border cursor-pointer transition-all text-xs font-mono ${
                  selectedCountry.countryCode === geo.countryCode
                    ? "bg-surface-2 border-gold shadow-lg"
                    : "bg-surface border-border hover:border-gold/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{geo.flag}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{geo.region}</span>
                </div>
                <div className="font-semibold text-foreground mt-2 text-xs">{geo.countryName}</div>
                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-border/50">
                  <span className="text-gold font-bold">€{geo.revenue.toLocaleString()}</span>
                  <span className="text-muted-foreground">{geo.orders} ord</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-[10px]">
                  <span className="text-emerald-400">+{geo.growth}%</span>
                  <span className="text-muted-foreground">{geo.conversionRate}% CVR</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Country Spotlight Details */}
        <div className="lg:col-span-4 p-6 bg-surface border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
              <span className="text-xs font-mono uppercase text-muted-foreground">
                Market Spotlight
              </span>
              <span className="text-xl">{selectedCountry.flag}</span>
            </div>

            <h3 className="text-lg font-display font-semibold text-foreground">
              {selectedCountry.countryName}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{selectedCountry.region}</p>

            <div className="mt-6 space-y-4 text-xs font-mono">
              <div className="p-3 bg-surface-2 border border-border flex justify-between">
                <span className="text-muted-foreground">Total Revenue:</span>
                <span className="text-gold font-bold">
                  €{selectedCountry.revenue.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-surface-2 border border-border flex justify-between">
                <span className="text-muted-foreground">Order Volume:</span>
                <span className="text-foreground font-semibold">
                  {selectedCountry.orders} shipments
                </span>
              </div>
              <div className="p-3 bg-surface-2 border border-border flex justify-between">
                <span className="text-muted-foreground">Average Order Value:</span>
                <span className="text-foreground font-semibold">
                  €{selectedCountry.aov.toFixed(2)}
                </span>
              </div>
              <div className="p-3 bg-surface-2 border border-border flex justify-between">
                <span className="text-muted-foreground">Conversion Rate:</span>
                <span className="text-emerald-400 font-semibold">
                  {selectedCountry.conversionRate}%
                </span>
              </div>
              <div className="p-3 bg-surface-2 border border-border flex justify-between">
                <span className="text-muted-foreground">MoM Growth Rate:</span>
                <span className="text-emerald-400 font-semibold">+{selectedCountry.growth}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border text-[11px] font-mono text-muted-foreground">
            Routed via closest EU POD Print Hub with automated localized customs declaration.
          </div>
        </div>
      </div>

      {/* 3. LEADERBOARD TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
            Global Market Leaderboard
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter("revenue")}
              className={`px-3 py-1 text-xs font-mono uppercase ${
                activeFilter === "revenue"
                  ? "bg-gold text-black font-semibold"
                  : "bg-surface-2 text-muted-foreground border border-border"
              }`}
            >
              By Revenue
            </button>
            <button
              onClick={() => setActiveFilter("growth")}
              className={`px-3 py-1 text-xs font-mono uppercase ${
                activeFilter === "growth"
                  ? "bg-gold text-black font-semibold"
                  : "bg-surface-2 text-muted-foreground border border-border"
              }`}
            >
              Fastest Growing
            </button>
            <button
              onClick={() => setActiveFilter("conversion")}
              className={`px-3 py-1 text-xs font-mono uppercase ${
                activeFilter === "conversion"
                  ? "bg-gold text-black font-semibold"
                  : "bg-surface-2 text-muted-foreground border border-border"
              }`}
            >
              Highest Conversion
            </button>
          </div>
        </div>

        <div className="bg-surface border border-border overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Market / Country</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4 text-right">Revenue</th>
                <th className="py-3 px-4 text-right">Orders</th>
                <th className="py-3 px-4 text-right">Customers</th>
                <th className="py-3 px-4 text-right">AOV</th>
                <th className="py-3 px-4 text-right">CVR</th>
                <th className="py-3 px-4 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedList.map((geo) => (
                <tr key={geo.countryCode} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2">
                    <span>{geo.flag}</span>
                    <span>{geo.countryName}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{geo.region}</td>
                  <td className="py-3 px-4 text-right text-foreground font-semibold">
                    €{geo.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{geo.orders}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{geo.customers}</td>
                  <td className="py-3 px-4 text-right text-gold">€{geo.aov.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {geo.conversionRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400">+{geo.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
