import { useState } from "react";
import {
  Package,
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  BarChart3,
  Percent,
  DollarSign,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PRODUCT_PERFORMANCE_LIST, CATEGORY_ANALYTICS_LIST } from "./analytics-mock-data";
import type { ProductPerformanceItem } from "./types";

export function ProductAnalyticsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTab, setSelectedTab] = useState<"products" | "categories">("products");
  const [productFilter, setProductFilter] = useState<"all" | "top" | "converting" | "low">("all");

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCT_PERFORMANCE_LIST.map((p) => p.category))),
  ];

  const filteredProducts = PRODUCT_PERFORMANCE_LIST.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesFilter = productFilter === "all" || item.status === productFilter;
    return matchesSearch && matchesCategory && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Top Grossing Silhouette
          </span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            French Terry Hoodies
          </div>
          <div className="text-xs font-mono text-gold mt-1">€18,260.00 • 37.3% of GMV</div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Highest Conversion Rate
          </span>
          <div className="text-xl font-display font-semibold text-emerald-400 mt-2">
            Ceramic Mugs (4.28%)
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            Stickers close second (4.82%)
          </div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Highest Volume Unit
          </span>
          <div className="text-xl font-display font-semibold text-foreground mt-2">
            Heavyweight Organic Tee
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            374 units sold across catalog
          </div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Highest Average Order Value
          </span>
          <div className="text-xl font-display font-semibold text-gold mt-2">
            Hoodie Sets (€84.93)
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            +€19.01 above catalog baseline
          </div>
        </div>
      </div>

      {/* 2. SUB NAVIGATION: PRODUCTS vs CATEGORIES */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedTab("products")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
              selectedTab === "products"
                ? "bg-gold text-black font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            Product Catalog Performance
          </button>
          <button
            onClick={() => setSelectedTab("categories")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
              selectedTab === "categories"
                ? "bg-gold text-black font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            13 Silhouette Categories Matrix
          </button>
        </div>

        {selectedTab === "products" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setProductFilter("all")}
              className={`px-2.5 py-1 text-xs font-mono uppercase ${
                productFilter === "all"
                  ? "text-gold underline"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({PRODUCT_PERFORMANCE_LIST.length})
            </button>
            <button
              onClick={() => setProductFilter("top")}
              className={`px-2.5 py-1 text-xs font-mono uppercase ${
                productFilter === "top"
                  ? "text-gold underline"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Top Grossing
            </button>
            <button
              onClick={() => setProductFilter("converting")}
              className={`px-2.5 py-1 text-xs font-mono uppercase ${
                productFilter === "converting"
                  ? "text-gold underline"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              High Conversion
            </button>
            <button
              onClick={() => setProductFilter("low")}
              className={`px-2.5 py-1 text-xs font-mono uppercase ${
                productFilter === "low"
                  ? "text-gold underline"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Optimization Need
            </button>
          </div>
        )}
      </div>

      {/* 3. PRODUCTS TABLE VIEW */}
      {selectedTab === "products" && (
        <div className="space-y-4">
          {/* Controls: Search & Category */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter by product or design title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-surface border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
              <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
                <Filter className="size-3" /> Silhouette:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-mono uppercase whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-foreground text-background font-semibold"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Performance Table */}
          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Garment / Product</th>
                  <th className="py-3 px-4">Artwork Design</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Units Sold</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 px-4 text-right">Conversion</th>
                  <th className="py-3 px-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="size-10 object-cover rounded-none border border-border flex-shrink-0"
                        />
                        <div>
                          <div className="font-medium text-foreground text-xs">{item.name}</div>
                          <div className="text-[10px] text-muted-foreground">{item.collection}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gold font-medium">{item.designName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                    <td className="py-3 px-4 text-right text-foreground font-semibold">
                      {item.orders}
                    </td>
                    <td className="py-3 px-4 text-right text-foreground font-semibold">
                      €{item.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.conversionRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 ${
                          item.trend >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {item.trend >= 0 ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {item.trend >= 0 ? "+" : ""}
                        {item.trend}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. CATEGORIES BREAKDOWN VIEW */}
      {selectedTab === "categories" && (
        <div className="space-y-6">
          {/* Category Revenue Chart */}
          <div className="p-6 bg-surface border border-border">
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider mb-4">
              Gross Revenue Contribution by Garment Silhouette
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={CATEGORY_ANALYTICS_LIST}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
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
                    dataKey="category"
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
                            <p className="text-foreground">
                              Revenue: €{d.revenue.toLocaleString()}
                            </p>
                            <p className="text-muted-foreground">Orders: {d.orders}</p>
                            <p className="text-muted-foreground">Conversion: {d.conversion}%</p>
                            <p className="text-gold">AOV: €{d.aov}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="revenue" fill="oklch(0.79 0.1 85)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 13 Categories Matrix Table */}
          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Silhouette Category</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 px-4 text-right">Orders</th>
                  <th className="py-3 px-4 text-right">Catalog Views</th>
                  <th className="py-3 px-4 text-right">Conversion</th>
                  <th className="py-3 px-4 text-right">AOV</th>
                  <th className="py-3 px-4 text-right">Growth (MoM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CATEGORY_ANALYTICS_LIST.map((cat) => (
                  <tr key={cat.category} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground">{cat.category}</td>
                    <td className="py-3 px-4 text-right text-foreground font-semibold">
                      €{cat.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{cat.orders}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {cat.views.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {cat.conversion}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gold">€{cat.aov.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={cat.growth >= 0 ? "text-emerald-400" : "text-rose-400"}>
                        {cat.growth >= 0 ? "+" : ""}
                        {cat.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
