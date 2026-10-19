import { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Percent,
  Sparkles,
  Package,
  Layers,
  FileText,
  Image as ImageIcon,
  Megaphone,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  type DateRangeKey,
  KPI_BY_RANGE,
  REVENUE_TIMELINE,
  PRODUCT_SILHOUETTE_PERFORMANCE,
  TRAFFIC_SOURCES,
  ORDER_PIPELINE_STATUS,
  POD_NODES_DATA,
  RECENT_ORDERS,
  RECENT_CUSTOMERS,
  RECENT_AUDIT_LOGS,
} from "./admin-data";
import { AdminDateFilter } from "./AdminDateFilter";
import { DESIGNS, ARTICLES } from "@/lib/catalog";
import type { ModalType } from "./QuickActionModals";

interface DashboardOverviewProps {
  onNavigate: (section: string, sub?: string) => void;
  onOpenModal: (type: ModalType) => void;
}

export function DashboardOverview({ onNavigate, onOpenModal }: DashboardOverviewProps) {
  const [dateRange, setDateRange] = useState<DateRangeKey>("30d");
  const [activeActivityTab, setActiveActivityTab] = useState<
    "orders" | "cms" | "customers" | "blog" | "automation"
  >("orders");

  // Dynamic greeting based on current local time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const currentDateFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const kpis = KPI_BY_RANGE[dateRange] || KPI_BY_RANGE["30d"];
  const timelineData = REVENUE_TIMELINE[dateRange] || REVENUE_TIMELINE["30d"];

  // Top designs ranked
  const topDesigns = useMemo(() => {
    return DESIGNS.slice(0, 5).map((d, idx) => ({
      ...d,
      rank: idx + 1,
      unitsSold: [420, 310, 280, 240, 190][idx],
      revenueShare: [28.4, 21.2, 18.5, 14.2, 11.8][idx],
      trend: "+14.8%",
    }));
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP SECTION: GREETING & DATE CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-gold rounded-full animate-pulse" />
            <p className="text-[11px] uppercase font-mono tracking-widest text-gold">
              Production Gateway • Atelier Noir Enterprise
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-foreground tracking-tight mt-1">
            {greeting}, Director
          </h1>
          <p className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{currentDateFormatted}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="size-3.5" /> All 4 POD nodes operational (99.98% sync rate)
            </span>
          </p>
        </div>

        {/* Global Date Filter Controls */}
        <div className="shrink-0">
          <AdminDateFilter currentRange={dateRange} onChange={setDateRange} />
        </div>
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground shrink-0 pr-2">
          Quick Actions:
        </span>
        {[
          { label: "Add Product", icon: Plus, action: () => onOpenModal("add-product") },
          { label: "Create Design", icon: Sparkles, action: () => onOpenModal("create-design") },
          {
            label: "Curate Collection",
            icon: Layers,
            action: () => onOpenModal("create-collection"),
          },
          { label: "Write Blog", icon: FileText, action: () => onOpenModal("write-blog") },
          { label: "Upload Media", icon: ImageIcon, action: () => onOpenModal("upload-media") },
          {
            label: "Create Promotion",
            icon: Megaphone,
            action: () => onOpenModal("create-promotion"),
          },
        ].map((btn, i) => {
          const Icon = btn.icon;
          return (
            <button
              key={i}
              type="button"
              onClick={btn.action}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground bg-surface border border-border hover:border-gold hover:text-gold transition-all whitespace-nowrap group shrink-0"
            >
              <Icon className="size-3.5 text-gold group-hover:scale-110 transition-transform" />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SIX ENTERPRISE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Revenue */}
        <div className="p-4 bg-surface border border-border relative overflow-hidden group hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[11px] uppercase tracking-wider font-medium">Revenue</span>
            <DollarSign className="size-4 text-gold" />
          </div>
          <p className="text-2xl font-display font-medium text-foreground">
            €{kpis.revenue.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-mono text-[11px]">
              <TrendingUp className="size-3 mr-0.5" /> +{kpis.revenueChange}%
            </span>
            <span className="text-[11px] text-muted-foreground">vs prev period</span>
          </div>
          <div className="mt-3 h-1 bg-surface-2 overflow-hidden">
            <div className="h-full bg-gold w-3/4 transition-all duration-500" />
          </div>
        </div>

        {/* Orders */}
        <div className="p-4 bg-surface border border-border relative overflow-hidden group hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[11px] uppercase tracking-wider font-medium">Orders</span>
            <ShoppingBag className="size-4 text-gold" />
          </div>
          <p className="text-2xl font-display font-medium text-foreground">
            {kpis.orders.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-mono text-[11px]">
              <TrendingUp className="size-3 mr-0.5" /> +{kpis.ordersChange}%
            </span>
            <span className="text-[11px] text-muted-foreground">vs prev period</span>
          </div>
          <div className="mt-3 h-1 bg-surface-2 overflow-hidden">
            <div className="h-full bg-foreground w-2/3 transition-all duration-500" />
          </div>
        </div>

        {/* Customers */}
        <div className="p-4 bg-surface border border-border relative overflow-hidden group hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[11px] uppercase tracking-wider font-medium">Customers</span>
            <Users className="size-4 text-gold" />
          </div>
          <p className="text-2xl font-display font-medium text-foreground">
            {kpis.customers.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-mono text-[11px]">
              <TrendingUp className="size-3 mr-0.5" /> +{kpis.customersChange}%
            </span>
            <span className="text-[11px] text-muted-foreground">new collectors</span>
          </div>
          <div className="mt-3 h-1 bg-surface-2 overflow-hidden">
            <div className="h-full bg-gold w-4/5 transition-all duration-500" />
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-4 bg-surface border border-border relative overflow-hidden group hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[11px] uppercase tracking-wider font-medium">
              Conversion Rate
            </span>
            <Percent className="size-4 text-gold" />
          </div>
          <p className="text-2xl font-display font-medium text-foreground">
            {kpis.conversionRate}%
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-mono text-[11px]">
              <TrendingUp className="size-3 mr-0.5" /> +{kpis.conversionRateChange}%
            </span>
            <span className="text-[11px] text-muted-foreground">store checkout</span>
          </div>
          <div className="mt-3 h-1 bg-surface-2 overflow-hidden">
            <div className="h-full bg-foreground w-1/2 transition-all duration-500" />
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-4 bg-surface border border-border relative overflow-hidden group hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[11px] uppercase tracking-wider font-medium">
              Average Order Value
            </span>
            <DollarSign className="size-4 text-gold" />
          </div>
          <p className="text-2xl font-display font-medium text-foreground">
            €{kpis.aov.toFixed(2)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-mono text-[11px]">
              <TrendingUp className="size-3 mr-0.5" /> +{kpis.aovChange}%
            </span>
            <span className="text-[11px] text-muted-foreground">basket size</span>
          </div>
          <div className="mt-3 h-1 bg-surface-2 overflow-hidden">
            <div className="h-full bg-gold w-3/5 transition-all duration-500" />
          </div>
        </div>

        {/* Published Products & Catalog */}
        <div className="p-4 bg-surface border border-border relative overflow-hidden group hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[11px] uppercase tracking-wider font-medium">Active Catalog</span>
            <Package className="size-4 text-gold" />
          </div>
          <p className="text-2xl font-display font-medium text-foreground">
            {kpis.publishedProducts}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="inline-flex items-center text-gold font-mono text-[11px]">
              14 Designs
            </span>
            <span className="text-[11px] text-muted-foreground">across 13 blanks</span>
          </div>
          <div className="mt-3 h-1 bg-surface-2 overflow-hidden">
            <div className="h-full bg-foreground w-full transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* 4. CINEMATIC ANALYTICS: REVENUE & ORDER PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Performance Area Chart (2 cols) */}
        <div className="lg:col-span-2 p-6 bg-surface border border-border flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                  Revenue Performance & Net Margin
                </h3>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-gold/10 text-gold border border-gold/30">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Gross sales volume vs estimated net profit after POD fulfillment and material costs.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 bg-gold" />
                <span className="text-muted-foreground">Gross Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 bg-zinc-400" />
                <span className="text-muted-foreground">Net Margin</span>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.79 0.1 85)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.79 0.1 85)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.68 0.005 90)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.68 0.005 90)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="oklch(0.68 0.005 90 / 60%)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(0.68 0.005 90 / 60%)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `€${v >= 1000 ? `${v / 1000}k` : v}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 bg-surface border border-border shadow-xl text-xs font-sans">
                          <p className="font-mono text-[11px] text-gold uppercase tracking-wider mb-1">
                            {label}
                          </p>
                          <div className="space-y-1">
                            <p className="flex items-center justify-between gap-4 text-foreground">
                              <span className="text-muted-foreground">Gross Revenue:</span>
                              <span className="font-mono font-medium">
                                €{Number(payload[0]?.value).toLocaleString()}
                              </span>
                            </p>
                            <p className="flex items-center justify-between gap-4 text-foreground">
                              <span className="text-muted-foreground">Net Margin:</span>
                              <span className="font-mono text-emerald-400">
                                €{Number(payload[1]?.value).toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.79 0.1 85)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#goldGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="netProfit"
                  stroke="oklch(0.68 0.005 90)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#profitGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume & Direct Sales (1 col) */}
        <div className="p-6 bg-surface border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Order Velocity
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Order volume per interval</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("commerce", "orders")}
              className="text-xs text-gold hover:underline flex items-center gap-1"
            >
              All Orders <ArrowUpRight className="size-3" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="oklch(0.68 0.005 90 / 60%)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(0.68 0.005 90 / 60%)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2 bg-surface border border-border text-xs">
                          <p className="text-gold font-mono text-[10px]">{label}</p>
                          <p className="text-foreground font-medium">{payload[0]?.value} Orders</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="orders" fill="oklch(0.79 0.1 85)" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Fulfilled On-Demand</span>
            <span className="text-foreground font-mono font-medium">98.9% 24h SLA</span>
          </div>
        </div>
      </div>

      {/* 5. PRODUCT SILHOUETTE BREAKDOWN & TOP DESIGNS RANKED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Silhouette Breakdown */}
        <div className="p-6 bg-surface border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Product Silhouette Performance
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sales share by apparel and hard surfaces
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("commerce", "products")}
              className="text-xs text-gold hover:underline flex items-center gap-1"
            >
              Matrix <ArrowUpRight className="size-3" />
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {PRODUCT_SILHOUETTE_PERFORMANCE.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-muted-foreground">{item.units} units</span>
                    <span className="text-foreground font-medium">
                      €{item.revenue.toLocaleString()}
                    </span>
                    <span className="text-emerald-400 text-[11px]">{item.growth}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
                  <div
                    className={`h-full ${idx === 0 ? "bg-gold" : idx === 1 ? "bg-foreground" : "bg-zinc-500"}`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Designs Visual Leaderboard */}
        <div className="p-6 bg-surface border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Top Atelier Designs
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ranked by unit sales and print popularity
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("commerce", "designs")}
              className="text-xs text-gold hover:underline flex items-center gap-1"
            >
              All Designs <ArrowUpRight className="size-3" />
            </button>
          </div>

          <div className="divide-y divide-border/60">
            {topDesigns.map((design) => (
              <div
                key={design.slug}
                className="py-3 flex items-center justify-between gap-3 group hover:bg-surface-2/60 transition-colors px-2 -mx-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-display font-semibold text-xs text-gold w-4 text-center shrink-0">
                    #{design.rank}
                  </span>
                  <div className="size-10 border border-border bg-black overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={design.art}
                      alt={design.name}
                      referrerPolicy="no-referrer"
                      className="size-8 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate group-hover:text-gold transition-colors">
                      {design.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {design.collection} • {design.style}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-mono font-medium text-foreground">
                    {design.unitsSold} prints
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono">
                    {design.revenueShare}% share
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. TRAFFIC SOURCES, ORDER FULFILLMENT STATUS, POD NETWORK SLA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Traffic Sources Donut Chart */}
        <div className="p-6 bg-surface border border-border flex flex-col justify-between">
          <div>
            <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
              Traffic & Channels
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Collector acquisition sources</p>
          </div>

          <div className="h-44 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TRAFFIC_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {TRAFFIC_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-2 bg-surface border border-border text-xs">
                          <p className="font-medium text-foreground">{data.name}</p>
                          <p className="text-gold font-mono">
                            {data.value}% ({data.count.toLocaleString()} visits)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {TRAFFIC_SOURCES.slice(0, 3).map((s, idx) => (
              <div key={idx} className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="truncate">{s.name}</span>
                </div>
                <span className="font-mono text-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="p-6 bg-surface border border-border flex flex-col justify-between">
          <div>
            <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
              Fulfillment Pipeline
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live order states across facilities
            </p>
          </div>

          <div className="space-y-3 my-3">
            {ORDER_PIPELINE_STATUS.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.status}</span>
                  <span className="font-mono font-medium text-foreground">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Queue Status</span>
            <span className="text-emerald-400 font-mono">Normal Processing</span>
          </div>
        </div>

        {/* POD Fulfillment Nodes Network Health */}
        <div className="p-6 bg-surface border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                POD Nodes Health
              </h3>
              <span className="size-2 bg-emerald-400 rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Multi-region print routing SLA</p>
          </div>

          <div className="space-y-2.5 my-2">
            {POD_NODES_DATA.map((node, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-surface-2/60 border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-medium text-foreground leading-tight">{node.name}</p>
                  <p className="text-[10px] text-muted-foreground">{node.provider}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-emerald-400 font-medium">{node.sla} SLA</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{node.avgPrintTime}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Routing Protocol</span>
            <span className="text-gold font-mono">Geo-Latency Least-Cost</span>
          </div>
        </div>
      </div>

      {/* 7. RECENT ACTIVITY TIMELINE (MULTI-TAB) */}
      <div className="bg-surface border border-border overflow-hidden">
        {/* Activity Tabs */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background/30">
          <div>
            <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
              Live Activity Stream
            </h3>
            <p className="text-xs text-muted-foreground">
              Real-time audit log of commerce and content actions
            </p>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {(
              [
                { id: "orders", label: "Recent Orders" },
                { id: "cms", label: "CMS & Editorial" },
                { id: "customers", label: "Recent Customers" },
                { id: "blog", label: "Journal Activity" },
                { id: "automation", label: "POD Automations" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveActivityTab(tab.id)}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeActivityTab === tab.id
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6">
          {activeActivityTab === "orders" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Design / Canvas</th>
                    <th className="pb-3">Destination</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {RECENT_ORDERS.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-2 transition-colors">
                      <td className="py-3 font-mono font-medium text-gold">{ord.orderNumber}</td>
                      <td className="py-3 font-medium text-foreground">{ord.customerName}</td>
                      <td className="py-3 text-muted-foreground">
                        {ord.designName} • {ord.productType}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        <span className="mr-1">{ord.flag}</span> {ord.destination}
                      </td>
                      <td className="py-3 font-mono font-medium text-foreground">€{ord.total}</td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] uppercase font-mono px-2 py-0.5 border ${
                            ord.status === "in_production"
                              ? "bg-gold/10 text-gold border-gold/30"
                              : ord.status === "shipped"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : ord.status === "delivered"
                                  ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                                  : "bg-surface-2 text-muted-foreground border-border"
                          }`}
                        >
                          {ord.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono text-muted-foreground">
                        {ord.date} {ord.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeActivityTab === "cms" && (
            <div className="space-y-3">
              {RECENT_AUDIT_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-surface-2/40 border border-border flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-2 bg-gold rounded-full" />
                    <div>
                      <p className="font-medium text-foreground">
                        {log.action}: <span className="text-gold">{log.target}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">By {log.actor}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeActivityTab === "customers" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECENT_CUSTOMERS.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-surface-2/40 border border-border flex items-center gap-3"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="size-10 rounded-none border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
                      <span className="text-[9px] font-mono px-1 border border-gold/30 bg-gold/10 text-gold">
                        {c.tier}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{c.email}</p>
                    <p className="text-[10px] font-mono text-gold mt-1">
                      €{c.totalSpent} ({c.totalOrders} orders)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeActivityTab === "blog" && (
            <div className="divide-y divide-border/60">
              {ARTICLES.slice(0, 4).map((art) => (
                <div key={art.slug} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gold mr-2">
                      [{art.category}]
                    </span>
                    <span className="text-xs font-medium text-foreground">{art.title}</span>
                  </div>
                  <div className="text-right text-xs font-mono text-muted-foreground shrink-0">
                    {art.date} • {art.readTime}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeActivityTab === "automation" && (
            <div className="space-y-3">
              {[
                {
                  title: "Smart Routing to Berlin Hub",
                  desc: "18 Central European orders batched and confirmed.",
                  time: "12m ago",
                  status: "Success",
                },
                {
                  title: "Abandoned Bag Recovery Webhook",
                  desc: "Automated reminder dispatched with 10% perk for 4 patrons.",
                  time: "1h ago",
                  status: "Active",
                },
                {
                  title: "Blank Inventory Check",
                  desc: "Gelato and Prodigi stock API verified across 24 SKUs.",
                  time: "3h ago",
                  status: "Synced",
                },
              ].map((auto, i) => (
                <div
                  key={i}
                  className="p-3 bg-surface-2/40 border border-border flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-medium text-foreground">{auto.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{auto.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      {auto.status}
                    </span>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1">{auto.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
