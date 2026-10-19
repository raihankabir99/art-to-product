import {
  LayoutDashboard,
  Package,
  Sparkles,
  Layers,
  ShoppingBag,
  Users,
  Home,
  FileText,
  BookOpen,
  Menu as MenuIcon,
  PanelBottom,
  Image,
  Megaphone,
  MessageSquare,
  HelpCircle,
  Star,
  Percent,
  Tag,
  Mail,
  Flame,
  BrainCircuit,
  Workflow,
  TrendingUp,
  DollarSign,
  BarChart3,
  Palette,
  Eye,
  Target,
  Cpu,
  Settings,
  Store,
  Globe,
  Globe2,
  Search,
  ShieldCheck,
  Zap,
  ListOrdered,
  Activity,
  Radio,
  Wand2,
} from "lucide-react";

export interface NavSection {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
    icon: typeof Package;
    badge?: string;
  }[];
}

export const ADMIN_NAVIGATION: NavSection[] = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    items: [{ id: "overview", label: "Executive Overview", icon: LayoutDashboard }],
  },
  {
    id: "commerce",
    title: "COMMERCE",
    items: [
      { id: "products", label: "Products", icon: Package, badge: "128" },
      { id: "designs", label: "Designs", icon: Sparkles, badge: "14" },
      { id: "collections", label: "Collections", icon: Layers },
      { id: "orders", label: "Orders", icon: ShoppingBag, badge: "6 Active" },
      { id: "customers", label: "Customers", icon: Users },
    ],
  },
  {
    id: "cms",
    title: "CMS & EDITORIAL",
    items: [
      { id: "homepage", label: "Homepage", icon: Home },
      { id: "pages", label: "Pages", icon: FileText },
      { id: "blog", label: "Blog & Journal", icon: BookOpen, badge: "14" },
      { id: "navigation", label: "Navigation", icon: MenuIcon },
      { id: "footer", label: "Footer", icon: PanelBottom },
      { id: "media", label: "Media Library", icon: Image },
      { id: "banners", label: "Banners", icon: Megaphone },
      { id: "popups", label: "Popups & Drawers", icon: MessageSquare },
      { id: "faq", label: "FAQ", icon: HelpCircle },
      { id: "reviews", label: "Reviews", icon: Star, badge: "4.9★" },
    ],
  },
  {
    id: "marketing",
    title: "MARKETING",
    items: [
      { id: "promotions", label: "Promotions", icon: Percent },
      { id: "coupons", label: "Coupons", icon: Tag, badge: "2 Live" },
      { id: "newsletter", label: "Newsletter", icon: Mail },
      { id: "campaigns", label: "Campaigns", icon: Flame },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & AUTOMATION",
    items: [
      { id: "ai-center", label: "Command Center", icon: BrainCircuit, badge: "GenAI" },
      { id: "ai-features", label: "AI Features Grid", icon: Sparkles },
      { id: "product-assistant", label: "AI Product Studio", icon: Wand2 },
      { id: "blog-assistant", label: "AI Blog Assistant", icon: BookOpen },
      { id: "seo-workspace", label: "AI SEO Studio", icon: Search },
      { id: "support-assistant", label: "Customer Concierge", icon: MessageSquare },
      { id: "workflows", label: "Workflow Builder", icon: Workflow },
      { id: "templates", label: "Automation Recipes", icon: Zap },
      { id: "logs", label: "Execution Logs", icon: ListOrdered },
      { id: "approvals", label: "Approval Center", icon: ShieldCheck, badge: "6 New" },
      { id: "insights", label: "Business Insights", icon: TrendingUp },
      { id: "analytics", label: "AI Analytics", icon: BarChart3 },
      { id: "health", label: "System Health", icon: Activity },
    ],
  },
  {
    id: "analytics",
    title: "ANALYTICS & BI",
    items: [
      { id: "overview", label: "Executive Overview", icon: TrendingUp },
      { id: "sales", label: "Sales Performance", icon: DollarSign },
      { id: "products", label: "Product Performance", icon: BarChart3 },
      { id: "designs", label: "Design Matrix", icon: Palette },
      { id: "customers", label: "Customer Insights", icon: Users },
      { id: "geo", label: "Geo & Global Markets", icon: Globe2 },
      { id: "marketing", label: "Marketing Attribution", icon: Target },
      { id: "content-seo", label: "Editorial & SEO", icon: Eye },
      { id: "pod", label: "POD & Fulfillment", icon: Cpu, badge: "98.8%" },
      { id: "realtime", label: "Live Telemetry", icon: Radio, badge: "Live" },
      { id: "reports", label: "Report Builder", icon: FileText },
    ],
  },
  {
    id: "settings",
    title: "SETTINGS",
    items: [
      { id: "general", label: "General", icon: Settings },
      { id: "store", label: "Store & POD", icon: Store },
      { id: "localization", label: "Localization & RTL", icon: Globe },
      { id: "seo", label: "SEO & Social", icon: Search },
      { id: "users-roles", label: "Users & Roles", icon: ShieldCheck },
      { id: "integrations", label: "Integrations", icon: Zap },
      { id: "audit", label: "Audit Log", icon: ListOrdered },
    ],
  },
];
