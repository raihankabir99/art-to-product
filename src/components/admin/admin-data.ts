import { DESIGNS, PRODUCT_TYPES, COLLECTIONS, ARTICLES, REGIONS } from "@/lib/catalog";

export type DateRangeKey = "today" | "7d" | "30d" | "90d" | "year" | "custom";

export interface KPIData {
  revenue: number;
  revenueChange: number;
  orders: number;
  ordersChange: number;
  customers: number;
  customersChange: number;
  conversionRate: number;
  conversionRateChange: number;
  aov: number;
  aovChange: number;
  publishedProducts: number;
  publishedProductsChange: number;
  activeDesigns: number;
}

export const KPI_BY_RANGE: Record<DateRangeKey, KPIData> = {
  today: {
    revenue: 4860,
    revenueChange: 14.2,
    orders: 62,
    ordersChange: 9.8,
    customers: 48,
    customersChange: 18.5,
    conversionRate: 4.12,
    conversionRateChange: 0.32,
    aov: 78.4,
    aovChange: 3.9,
    publishedProducts: 128,
    publishedProductsChange: 2,
    activeDesigns: 14,
  },
  "7d": {
    revenue: 38420,
    revenueChange: 16.8,
    orders: 486,
    ordersChange: 11.4,
    customers: 342,
    customersChange: 21.0,
    conversionRate: 3.95,
    conversionRateChange: 0.41,
    aov: 79.05,
    aovChange: 4.8,
    publishedProducts: 128,
    publishedProductsChange: 4,
    activeDesigns: 14,
  },
  "30d": {
    revenue: 148920,
    revenueChange: 18.4,
    orders: 1842,
    ordersChange: 12.6,
    customers: 1410,
    customersChange: 24.1,
    conversionRate: 3.82,
    conversionRateChange: 0.45,
    aov: 80.85,
    aovChange: 5.2,
    publishedProducts: 128,
    publishedProductsChange: 8,
    activeDesigns: 14,
  },
  "90d": {
    revenue: 412800,
    revenueChange: 22.5,
    orders: 5120,
    ordersChange: 15.2,
    customers: 3890,
    customersChange: 28.3,
    conversionRate: 3.76,
    conversionRateChange: 0.38,
    aov: 80.62,
    aovChange: 6.1,
    publishedProducts: 128,
    publishedProductsChange: 12,
    activeDesigns: 14,
  },
  year: {
    revenue: 1684000,
    revenueChange: 31.4,
    orders: 21400,
    ordersChange: 24.8,
    customers: 16200,
    customersChange: 36.2,
    conversionRate: 3.88,
    conversionRateChange: 0.52,
    aov: 78.69,
    aovChange: 5.4,
    publishedProducts: 128,
    publishedProductsChange: 24,
    activeDesigns: 14,
  },
  custom: {
    revenue: 96400,
    revenueChange: 15.0,
    orders: 1195,
    ordersChange: 10.2,
    customers: 890,
    customersChange: 19.4,
    conversionRate: 3.8,
    conversionRateChange: 0.4,
    aov: 80.67,
    aovChange: 4.5,
    publishedProducts: 128,
    publishedProductsChange: 6,
    activeDesigns: 14,
  },
};

export interface ChartDataPoint {
  date: string;
  revenue: number;
  previousRevenue: number;
  netProfit: number;
  orders: number;
  newCustomers: number;
  returningCustomers: number;
}

export const REVENUE_TIMELINE: Record<DateRangeKey, ChartDataPoint[]> = {
  today: [
    {
      date: "00:00",
      revenue: 180,
      previousRevenue: 140,
      netProfit: 95,
      orders: 2,
      newCustomers: 2,
      returningCustomers: 0,
    },
    {
      date: "04:00",
      revenue: 90,
      previousRevenue: 80,
      netProfit: 45,
      orders: 1,
      newCustomers: 1,
      returningCustomers: 0,
    },
    {
      date: "08:00",
      revenue: 640,
      previousRevenue: 420,
      netProfit: 340,
      orders: 8,
      newCustomers: 6,
      returningCustomers: 2,
    },
    {
      date: "12:00",
      revenue: 1420,
      previousRevenue: 1100,
      netProfit: 780,
      orders: 18,
      newCustomers: 14,
      returningCustomers: 4,
    },
    {
      date: "16:00",
      revenue: 1680,
      previousRevenue: 1350,
      netProfit: 920,
      orders: 21,
      newCustomers: 16,
      returningCustomers: 5,
    },
    {
      date: "20:00",
      revenue: 850,
      previousRevenue: 750,
      netProfit: 460,
      orders: 12,
      newCustomers: 9,
      returningCustomers: 3,
    },
  ],
  "7d": [
    {
      date: "Mon",
      revenue: 4900,
      previousRevenue: 4100,
      netProfit: 2650,
      orders: 62,
      newCustomers: 44,
      returningCustomers: 18,
    },
    {
      date: "Tue",
      revenue: 5400,
      previousRevenue: 4600,
      netProfit: 2950,
      orders: 68,
      newCustomers: 49,
      returningCustomers: 19,
    },
    {
      date: "Wed",
      revenue: 5100,
      previousRevenue: 4800,
      netProfit: 2780,
      orders: 65,
      newCustomers: 46,
      returningCustomers: 19,
    },
    {
      date: "Thu",
      revenue: 6200,
      previousRevenue: 5100,
      netProfit: 3410,
      orders: 78,
      newCustomers: 56,
      returningCustomers: 22,
    },
    {
      date: "Fri",
      revenue: 7100,
      previousRevenue: 5900,
      netProfit: 3950,
      orders: 90,
      newCustomers: 64,
      returningCustomers: 26,
    },
    {
      date: "Sat",
      revenue: 5800,
      previousRevenue: 5200,
      netProfit: 3180,
      orders: 74,
      newCustomers: 52,
      returningCustomers: 22,
    },
    {
      date: "Sun",
      revenue: 3920,
      previousRevenue: 3400,
      netProfit: 2120,
      orders: 49,
      newCustomers: 31,
      returningCustomers: 18,
    },
  ],
  "30d": [
    {
      date: "Week 1",
      revenue: 32400,
      previousRevenue: 27800,
      netProfit: 17800,
      orders: 410,
      newCustomers: 310,
      returningCustomers: 100,
    },
    {
      date: "Week 2",
      revenue: 36800,
      previousRevenue: 30500,
      netProfit: 20200,
      orders: 455,
      newCustomers: 345,
      returningCustomers: 110,
    },
    {
      date: "Week 3",
      revenue: 41200,
      previousRevenue: 34200,
      netProfit: 22800,
      orders: 510,
      newCustomers: 390,
      returningCustomers: 120,
    },
    {
      date: "Week 4",
      revenue: 38520,
      previousRevenue: 33100,
      netProfit: 21100,
      orders: 467,
      newCustomers: 365,
      returningCustomers: 102,
    },
  ],
  "90d": [
    {
      date: "Month 1",
      revenue: 124000,
      previousRevenue: 102000,
      netProfit: 68000,
      orders: 1540,
      newCustomers: 1160,
      returningCustomers: 380,
    },
    {
      date: "Month 2",
      revenue: 142000,
      previousRevenue: 115000,
      netProfit: 78500,
      orders: 1760,
      newCustomers: 1340,
      returningCustomers: 420,
    },
    {
      date: "Month 3",
      revenue: 146800,
      previousRevenue: 119500,
      netProfit: 81200,
      orders: 1820,
      newCustomers: 1390,
      returningCustomers: 430,
    },
  ],
  year: [
    {
      date: "Q1",
      revenue: 340000,
      previousRevenue: 260000,
      netProfit: 188000,
      orders: 4300,
      newCustomers: 3250,
      returningCustomers: 1050,
    },
    {
      date: "Q2",
      revenue: 410000,
      previousRevenue: 310000,
      netProfit: 226000,
      orders: 5200,
      newCustomers: 3950,
      returningCustomers: 1250,
    },
    {
      date: "Q3",
      revenue: 445000,
      previousRevenue: 340000,
      netProfit: 247000,
      orders: 5650,
      newCustomers: 4300,
      returningCustomers: 1350,
    },
    {
      date: "Q4",
      revenue: 489000,
      previousRevenue: 370000,
      netProfit: 271000,
      orders: 6250,
      newCustomers: 4700,
      returningCustomers: 1550,
    },
  ],
  custom: [
    {
      date: "Day 1-5",
      revenue: 18200,
      previousRevenue: 15900,
      netProfit: 9900,
      orders: 225,
      newCustomers: 170,
      returningCustomers: 55,
    },
    {
      date: "Day 6-10",
      revenue: 24100,
      previousRevenue: 20800,
      netProfit: 13200,
      orders: 298,
      newCustomers: 220,
      returningCustomers: 78,
    },
    {
      date: "Day 11-15",
      revenue: 27800,
      previousRevenue: 24300,
      netProfit: 15400,
      orders: 344,
      newCustomers: 255,
      returningCustomers: 89,
    },
    {
      date: "Day 16-20",
      revenue: 26300,
      previousRevenue: 23100,
      netProfit: 14600,
      orders: 328,
      newCustomers: 245,
      returningCustomers: 83,
    },
  ],
};

export const PRODUCT_SILHOUETTE_PERFORMANCE = [
  {
    name: "Heavyweight T-Shirt (240gsm)",
    units: 742,
    revenue: 28938,
    share: 38.5,
    growth: "+21.4%",
  },
  {
    name: "Double-Lined Hoodie (400gsm)",
    units: 385,
    revenue: 30415,
    share: 26.2,
    growth: "+14.8%",
  },
  {
    name: "Loopback Sweatshirt (340gsm)",
    units: 218,
    revenue: 15042,
    share: 14.8,
    growth: "+9.2%",
  },
  { name: "Glazed Stoneware Mug", units: 310, revenue: 7440, share: 9.5, growth: "+32.0%" },
  { name: "Museum Giclée Poster", units: 145, revenue: 6525, share: 6.8, growth: "+18.1%" },
  { name: "Heavyweight Canvas Tote", units: 180, revenue: 5760, share: 4.2, growth: "+6.5%" },
];

export const TRAFFIC_SOURCES = [
  { name: "Direct Editorial Traffic", value: 38, count: 18450, color: "oklch(0.79 0.1 85)" }, // Gold
  { name: "Organic Search & Archive", value: 27, count: 13100, color: "oklch(0.68 0.005 90)" }, // Light Neutral
  { name: "Instagram / Lookbook", value: 20, count: 9700, color: "oklch(0.48 0.005 90)" }, // Mid Neutral
  { name: "Fashion Press & Mentions", value: 10, count: 4850, color: "oklch(0.35 0 0)" }, // Dark Neutral
  { name: "Private Concierge / VIP", value: 5, count: 2420, color: "oklch(0.86 0.06 88)" }, // Soft Gold
];

export const ORDER_PIPELINE_STATUS = [
  {
    status: "Payment Confirmed",
    count: 42,
    percentage: 8,
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    status: "In Print Production",
    count: 184,
    percentage: 35,
    color: "bg-gold/20 text-gold border-gold/30",
  },
  {
    status: "Quality Inspected",
    count: 96,
    percentage: 18,
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    status: "Dispatched / In Transit",
    count: 168,
    percentage: 32,
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    status: "Delivered & Verified",
    count: 1352,
    percentage: 100,
    color: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
];

export const POD_NODES_DATA = [
  {
    name: "Berlin Hub (EU Central)",
    location: "Germany",
    provider: "Prodigi EU & Gelato",
    sla: "99.8%",
    avgPrintTime: "18.4 hrs",
    currentQueue: 48,
    status: "optimal",
    capacity: 82,
  },
  {
    name: "London Atelier Hub (UK & IE)",
    location: "United Kingdom",
    provider: "Printify UK Studio",
    sla: "99.4%",
    avgPrintTime: "21.2 hrs",
    currentQueue: 32,
    status: "optimal",
    capacity: 68,
  },
  {
    name: "Philadelphia Node (North America)",
    location: "United States",
    provider: "Gelato US Prime",
    sla: "99.1%",
    avgPrintTime: "22.8 hrs",
    currentQueue: 74,
    status: "optimal",
    capacity: 79,
  },
  {
    name: "Tokyo Studio Node (Asia Pacific)",
    location: "Japan",
    provider: "Prodigi APAC",
    sla: "99.9%",
    avgPrintTime: "16.1 hrs",
    currentQueue: 19,
    status: "optimal",
    capacity: 45,
  },
];

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  designName: string;
  designSlug: string;
  productType: string;
  itemsCount: number;
  total: number;
  currency: string;
  status: "processing" | "in_production" | "shipped" | "delivered" | "cancelled";
  destination: string;
  flag: string;
  date: string;
  time: string;
  podNode: string;
  trackingNumber: string;
}

export const RECENT_ORDERS: AdminOrder[] = [
  {
    id: "ord_9821",
    orderNumber: "AN-2026-9821",
    customerName: "Elena Rostova",
    customerEmail: "elena.r@zurich-design.ch",
    designName: "Midnight Lion",
    designSlug: "midnight-lion",
    productType: "Heavyweight Hoodie (Moss / L)",
    itemsCount: 2,
    total: 158,
    currency: "EUR",
    status: "in_production",
    destination: "Zurich, Switzerland",
    flag: "🇨🇭",
    date: "Today",
    time: "14:32",
    podNode: "Berlin Hub",
    trackingNumber: "CH-POST-881920",
  },
  {
    id: "ord_9820",
    orderNumber: "AN-2026-9820",
    customerName: "Julian Vance",
    customerEmail: "j.vance@studio-nord.no",
    designName: "Solstice",
    designSlug: "solstice",
    productType: "Organic T-Shirt (Bone / XL)",
    itemsCount: 3,
    total: 117,
    currency: "EUR",
    status: "shipped",
    destination: "Oslo, Norway",
    flag: "🇳🇴",
    date: "Today",
    time: "13:15",
    podNode: "Berlin Hub",
    trackingNumber: "NO-POST-391002",
  },
  {
    id: "ord_9819",
    orderNumber: "AN-2026-9819",
    customerName: "Camille Dupont",
    customerEmail: "camille.dupont@atelier.fr",
    designName: "Olive Line",
    designSlug: "olive-line",
    productType: "Glazed Stoneware Mug (White)",
    itemsCount: 4,
    total: 96,
    currency: "EUR",
    status: "delivered",
    destination: "Paris, France",
    flag: "🇫🇷",
    date: "Today",
    time: "11:40",
    podNode: "Berlin Hub",
    trackingNumber: "COLISSIMO-849201",
  },
  {
    id: "ord_9818",
    orderNumber: "AN-2026-9818",
    customerName: "Alexander Hayes",
    customerEmail: "a.hayes@oxford-press.co.uk",
    designName: "Nordic Silence",
    designSlug: "nordic-silence",
    productType: "Museum Giclée Poster (70×100cm)",
    itemsCount: 1,
    total: 45,
    currency: "GBP",
    status: "in_production",
    destination: "London, United Kingdom",
    flag: "🇬🇧",
    date: "Yesterday",
    time: "19:22",
    podNode: "London Atelier Hub",
    trackingNumber: "RM-SPECIAL-772911",
  },
  {
    id: "ord_9817",
    orderNumber: "AN-2026-9817",
    customerName: "Marcus Sterling",
    customerEmail: "marcus@sterling-group.us",
    designName: "Dune Crescent",
    designSlug: "dune-crescent",
    productType: "Loopback Sweatshirt (Ash / M)",
    itemsCount: 2,
    total: 138,
    currency: "USD",
    status: "processing",
    destination: "New York, United States",
    flag: "🇺🇸",
    date: "Yesterday",
    time: "16:48",
    podNode: "Philadelphia Node",
    trackingNumber: "UPS-GROUND-994012",
  },
  {
    id: "ord_9816",
    orderNumber: "AN-2026-9816",
    customerName: "Yuki Tanaka",
    customerEmail: "yuki.t@ginza-arts.jp",
    designName: "Paper Crane",
    designSlug: "paper-crane",
    productType: "Canvas Tote Bag (Natural)",
    itemsCount: 1,
    total: 32,
    currency: "EUR",
    status: "delivered",
    destination: "Tokyo, Japan",
    flag: "🇯🇵",
    date: "24 Aug",
    time: "09:12",
    podNode: "Tokyo Studio Node",
    trackingNumber: "JP-EXPRESS-110293",
  },
];

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  tier: "Collector VIP" | "Patron" | "First-Time";
  joinDate: string;
  lastActive: string;
  avatar: string;
}

export const RECENT_CUSTOMERS: AdminCustomer[] = [
  {
    id: "cust_101",
    name: "Elena Rostova",
    email: "elena.r@zurich-design.ch",
    location: "Zurich, Switzerland 🇨🇭",
    totalOrders: 14,
    totalSpent: 1240,
    tier: "Collector VIP",
    joinDate: "Jan 2025",
    lastActive: "15 mins ago",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cust_102",
    name: "Julian Vance",
    email: "j.vance@studio-nord.no",
    location: "Oslo, Norway 🇳🇴",
    totalOrders: 8,
    totalSpent: 690,
    tier: "Patron",
    joinDate: "Mar 2025",
    lastActive: "1 hour ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cust_103",
    name: "Camille Dupont",
    email: "camille.dupont@atelier.fr",
    location: "Paris, France 🇫🇷",
    totalOrders: 19,
    totalSpent: 1890,
    tier: "Collector VIP",
    joinDate: "Nov 2024",
    lastActive: "3 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cust_104",
    name: "Alexander Hayes",
    email: "a.hayes@oxford-press.co.uk",
    location: "London, UK 🇬🇧",
    totalOrders: 4,
    totalSpent: 310,
    tier: "Patron",
    joinDate: "May 2026",
    lastActive: "Yesterday",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cust_105",
    name: "Marcus Sterling",
    email: "marcus@sterling-group.us",
    location: "New York, USA 🇺🇸",
    totalOrders: 1,
    totalSpent: 138,
    tier: "First-Time",
    joinDate: "Aug 2026",
    lastActive: "Yesterday",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
  },
];

export interface AuditEvent {
  id: string;
  action: string;
  target: string;
  category: "CMS" | "Commerce" | "Security" | "Automation" | "Marketing";
  actor: string;
  timestamp: string;
  status: "success" | "warning" | "info";
}

export const RECENT_AUDIT_LOGS: AuditEvent[] = [
  {
    id: "log_01",
    action: "Published Editorial Article",
    target: "The Art of Wearing What You Believe",
    category: "CMS",
    actor: "Elena Brand (Lead Editor)",
    timestamp: "18 mins ago",
    status: "success",
  },
  {
    id: "log_02",
    action: "Fulfillment Sync Batch",
    target: "18 Orders auto-routed to Berlin Hub",
    category: "Automation",
    actor: "POD Gateway Daemon",
    timestamp: "42 mins ago",
    status: "success",
  },
  {
    id: "log_03",
    action: "Updated Stock Matrix & Pricing",
    target: "Heavyweight Hoodie (400gsm)",
    category: "Commerce",
    actor: "Laurent Noir (Director)",
    timestamp: "2 hours ago",
    status: "info",
  },
  {
    id: "log_04",
    action: "Created Campaign Code",
    target: "SUMMER-ARCHIVE-15 (-15%)",
    category: "Marketing",
    actor: "Sarah Chen (Marketing)",
    timestamp: "4 hours ago",
    status: "success",
  },
  {
    id: "log_05",
    action: "Security / Session Renewed",
    target: "Staff Role Audit Passed",
    category: "Security",
    actor: "System Auth Monitor",
    timestamp: "5 hours ago",
    status: "info",
  },
  {
    id: "log_06",
    action: "Hero Spotlight Curation Changed",
    target: "Midnight Lion x Nocturne Capsule",
    category: "CMS",
    actor: "Laurent Noir (Director)",
    timestamp: "7 hours ago",
    status: "success",
  },
];

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "order" | "pod" | "stock" | "system";
  unread: boolean;
  time: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    title: "High-value order received (€340)",
    message: "Order #AN-2026-9825 from Zurich flagged for priority white-glove packaging.",
    type: "order",
    unread: true,
    time: "5m ago",
  },
  {
    id: "notif_2",
    title: "Berlin Hub SLA Alert: 100% On-Time",
    message: "All 184 daily print batches dispatched within standard 24h SLA target.",
    type: "pod",
    unread: true,
    time: "32m ago",
  },
  {
    id: "notif_3",
    title: "Low Blank Inventory: Moss Hoodie (L)",
    message: "Blank stock below threshold (8 units left) in Berlin staging depot.",
    type: "stock",
    unread: false,
    time: "2h ago",
  },
  {
    id: "notif_4",
    title: "Automatic Supabase Backup Succeeded",
    message: "Full database snapshots and asset checksums verified across European mirrors.",
    type: "system",
    unread: false,
    time: "6h ago",
  },
];
