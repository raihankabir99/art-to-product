export type AnalyticsDateRange = "today" | "7d" | "30d" | "90d" | "12m" | "custom";
export type ComparisonType = "previous_period" | "previous_year";

export interface KPICardData {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  change: number; // e.g. +18.4
  changeType: "increase" | "decrease" | "neutral";
  previousPeriodValue: string;
  sparkline: number[];
  unit?: string;
}

export interface RevenueTimelinePoint {
  date: string;
  revenue: number;
  orders: number;
  aov: number;
  conversion: number;
}

export interface ProductPerformanceItem {
  id: string;
  name: string;
  image: string;
  designName: string;
  category: string;
  collection: string;
  orders: number;
  revenue: number;
  views: number;
  conversionRate: number;
  trend: number; // percentage change
  status: "top" | "converting" | "low" | "standard";
}

export interface DesignSilhouettePerformance {
  silhouette: string;
  unitsSold: number;
  revenue: number;
  conversionRate: number;
  sharePercentage: number;
  icon?: string;
}

export interface DesignBreakdownItem {
  id: string;
  designName: string;
  image: string;
  artist: string;
  totalRevenue: number;
  totalOrders: number;
  totalViews: number;
  conversionRate: number;
  topSilhouette: string;
  silhouettes: DesignSilhouettePerformance[];
}

export interface CategoryAnalyticsItem {
  category: string;
  revenue: number;
  orders: number;
  views: number;
  conversion: number;
  aov: number;
  growth: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  repeatPurchaseRate: number;
  customerLTV: number;
  avgCustomerSpend: number;
  newVsReturningTimeline: {
    period: string;
    newCustomers: number;
    returningCustomers: number;
  }[];
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  conversionFromPrev: number;
  conversionFromTotal: number;
  dropoffRate: number;
}

export interface GeoMarketItem {
  countryCode: string;
  countryName: string;
  region: string;
  flag: string;
  orders: number;
  revenue: number;
  customers: number;
  aov: number;
  growth: number;
  conversionRate: number;
}

export interface MarketingChannelItem {
  channel: string;
  traffic: number;
  conversions: number;
  revenue: number;
  roi: string;
  cpa: number;
  share: number;
  color: string;
}

export interface ContentArticleAnalytics {
  id: string;
  title: string;
  category: string;
  views: number;
  engagementScore: number;
  avgReadTime: string;
  productClicks: number;
  revenueAssisted: number;
  status: "top" | "trending" | "low";
}

export interface SEOKeywordAnalytics {
  keyword: string;
  position: number;
  change: number;
  impressions: number;
  clicks: number;
  ctr: number;
  intent: "Commercial" | "Informational" | "Transactional";
}

export interface PODFulfillmentMetrics {
  ordersSent: number;
  productionSuccess: number;
  productionFailures: number;
  avgProductionHours: number;
  avgShippingDays: number;
  deliverySuccessRate: number;
  delayedOrders: number;
  funnel: {
    stage: string;
    count: number;
    percentage: number;
  }[];
}

export interface ShippingCarrierItem {
  carrier: string;
  country: string;
  method: string;
  avgDays: number;
  onTimeRate: number;
  status: "optimal" | "delay_warning" | "standard";
  volume: number;
}

export interface ReturnReasonItem {
  reason: string;
  count: number;
  percentage: number;
  value: number;
}

export interface ProductHealthStatus {
  activeProducts: number;
  unavailableProducts: number;
  podAvailabilityIssues: number;
  variantSyncIssues: number;
  overallHealth: "Healthy" | "Warning" | "Critical";
}

export interface RealtimeEvent {
  id: string;
  timestamp: string;
  timeAgo: string;
  event:
    | "New Order"
    | "New Customer"
    | "Payment Completed"
    | "Product Viewed"
    | "Cart Created"
    | "POD Submitted"
    | "Order Shipped"
    | "Review Added";
  source: string;
  status: "success" | "pending" | "info" | "processing";
  amount?: number;
  details: string;
}

export interface SavedReportItem {
  id: string;
  name: string;
  category: string;
  createdBy: string;
  lastUpdated: string;
  schedule: string;
  format: "PDF" | "CSV" | "XLSX";
  fileSize: string;
}

export interface ScheduledReportItem {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  recipients: string[];
  reportType: string;
  status: "Active" | "Paused";
  nextDelivery: string;
}

export interface AIInsightItem {
  id: string;
  keyFinding: string;
  whyItMatters: string;
  recommendedAction: string;
  confidence: number;
  impact: "High" | "Medium" | "Critical";
  status: "pending" | "accepted" | "dismissed";
}
