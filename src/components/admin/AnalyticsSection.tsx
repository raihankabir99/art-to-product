import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Palette,
  Users,
  Globe2,
  Target,
  Eye,
  Cpu,
  Radio,
  FileText,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import type { AnalyticsDateRange, ComparisonType } from "./analytics/types";
import { AnalyticsExecutiveOverview } from "./analytics/AnalyticsExecutiveOverview";
import { SalesPerformanceView } from "./analytics/SalesPerformanceView";
import { ProductAnalyticsView } from "./analytics/ProductAnalyticsView";
import { DesignPerformanceView } from "./analytics/DesignPerformanceView";
import { CustomerInsightsView } from "./analytics/CustomerInsightsView";
import { GeoAnalyticsView } from "./analytics/GeoAnalyticsView";
import { MarketingAnalyticsView } from "./analytics/MarketingAnalyticsView";
import { ContentSEOAnalyticsView } from "./analytics/ContentSEOAnalyticsView";
import { PODFulfillmentAnalyticsView } from "./analytics/PODFulfillmentAnalyticsView";
import { RealtimeActivityStream } from "./analytics/RealtimeActivityStream";
import { ReportBuilderCenter } from "./analytics/ReportBuilderCenter";
import { ExportReportModal } from "./analytics/ExportReportModal";

interface AnalyticsSectionProps {
  subSection: string;
}

export function AnalyticsSection({ subSection }: AnalyticsSectionProps) {
  const [activeSub, setActiveSub] = useState<string>(subSection || "overview");
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>("30d");
  const [comparison, setComparison] = useState<ComparisonType>("previous_period");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Synchronize when parent passed subSection changes
  if (subSection && subSection !== activeSub && subSection !== "analytics") {
    // normalize aliases
    const normalized =
      subSection === "product-analytics"
        ? "products"
        : subSection === "design-analytics"
          ? "designs"
          : subSection === "content-analytics"
            ? "content-seo"
            : subSection === "marketing-analytics"
              ? "marketing"
              : subSection;

    if (normalized !== activeSub) {
      setActiveSub(normalized);
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const navTabs = [
    { id: "overview", label: "Executive Overview", icon: TrendingUp },
    { id: "sales", label: "Sales Performance", icon: DollarSign },
    { id: "products", label: "Products & Silhouettes", icon: BarChart3 },
    { id: "designs", label: "Design Matrix", icon: Palette },
    { id: "customers", label: "Customer Insights", icon: Users },
    { id: "geo", label: "Geo & Markets", icon: Globe2 },
    { id: "marketing", label: "Marketing Attribution", icon: Target },
    { id: "content-seo", label: "Editorial & SEO", icon: Eye },
    { id: "pod", label: "POD & Operations", icon: Cpu },
    { id: "realtime", label: "Live Telemetry", icon: Radio, badge: "Live" },
    { id: "reports", label: "Report Builder", icon: FileText },
  ];

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* 1. TOP HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-gold" />
            <h1 className="text-xl font-display font-semibold text-foreground tracking-wider uppercase">
              ANALYTICS & INSIGHTS
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Understand your store. Discover what drives growth.
          </p>
        </div>

        {/* Global Controls: Date Range, Comparison, Export */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center bg-surface-2 p-0.5 border border-border text-xs font-mono">
            {(
              [
                { id: "today", label: "Today" },
                { id: "7d", label: "7 Days" },
                { id: "30d", label: "30 Days" },
                { id: "90d", label: "90 Days" },
                { id: "12m", label: "12 Months" },
                { id: "custom", label: "Custom" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setDateRange(item.id)}
                className={`px-2.5 py-1 uppercase transition-colors ${
                  dateRange === item.id
                    ? "bg-gold text-black font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Comparison Toggle */}
          <div className="flex items-center bg-surface-2 p-0.5 border border-border text-xs font-mono">
            <button
              onClick={() => setComparison("previous_period")}
              className={`px-2.5 py-1 uppercase transition-colors ${
                comparison === "previous_period"
                  ? "bg-foreground/10 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Prev Period
            </button>
            <button
              onClick={() => setComparison("previous_year")}
              className={`px-2.5 py-1 uppercase transition-colors ${
                comparison === "previous_year"
                  ? "bg-foreground/10 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Prev Year
            </button>
          </div>

          {/* Refresh Action */}
          <button
            onClick={handleRefresh}
            className={`p-2 bg-surface-2 border border-border text-muted-foreground hover:text-foreground transition-colors ${
              isRefreshing ? "animate-spin text-gold" : ""
            }`}
            title="Sync telemetry"
          >
            <RefreshCw className="size-3.5" />
          </button>

          {/* Export Report Action */}
          <button
            onClick={() => setExportModalOpen(true)}
            className="px-4 py-2 bg-gold text-black hover:bg-gold/90 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="size-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION RIBBON */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border text-xs font-mono">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSub === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSub(tab.id)}
              className={`px-3.5 py-2 uppercase tracking-wider whitespace-nowrap flex items-center gap-2 border transition-all ${
                isActive
                  ? "bg-gold text-black font-semibold border-gold shadow-sm"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-gold/30"
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-none font-mono ${
                    isActive
                      ? "bg-black/20 text-black"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. DYNAMIC SUB-VIEW WORKSPACE */}
      <div className="min-h-[500px]">
        {activeSub === "overview" && (
          <AnalyticsExecutiveOverview
            currentRange={dateRange}
            onRangeChange={setDateRange}
            comparison={comparison}
            onComparisonChange={setComparison}
            onNavigateToSub={(sub) => setActiveSub(sub)}
            onOpenExport={() => setExportModalOpen(true)}
          />
        )}

        {activeSub === "sales" && <SalesPerformanceView />}

        {activeSub === "products" && <ProductAnalyticsView />}

        {activeSub === "designs" && <DesignPerformanceView />}

        {activeSub === "customers" && <CustomerInsightsView />}

        {activeSub === "geo" && <GeoAnalyticsView />}

        {activeSub === "marketing" && <MarketingAnalyticsView />}

        {activeSub === "content-seo" && <ContentSEOAnalyticsView />}

        {activeSub === "pod" && <PODFulfillmentAnalyticsView />}

        {activeSub === "realtime" && <RealtimeActivityStream />}

        {activeSub === "reports" && (
          <ReportBuilderCenter onOpenExportModal={() => setExportModalOpen(true)} />
        )}
      </div>

      {/* 4. GLOBAL EXPORT MODAL */}
      <ExportReportModal open={exportModalOpen} onClose={() => setExportModalOpen(false)} />
    </div>
  );
}
