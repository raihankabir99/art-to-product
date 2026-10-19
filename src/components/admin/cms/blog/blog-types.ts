export type ArticleStatus = "draft" | "in_review" | "scheduled" | "published" | "archived";

export type ArticleCategory =
  | "Fashion"
  | "Design"
  | "Lifestyle"
  | "Gift Guides"
  | "Product Guides"
  | "Brand Stories"
  | "Care Guides"
  | "Culture";

export type ArticleBlockType =
  | "paragraph"
  | "heading"
  | "subheading"
  | "image"
  | "gallery"
  | "quote"
  | "divider"
  | "bullet_list"
  | "numbered_list"
  | "product"
  | "collection"
  | "cta"
  | "video"
  | "embed";

export interface ArticleBlock {
  id: string;
  type: ArticleBlockType;
  content?: string;
  settings?: {
    level?: 2 | 3 | 4;
    quoteAuthor?: string;
    quoteRole?: string;
    imageUrl?: string;
    imageCaption?: string;
    imageAlt?: string;
    aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9";
    galleryImages?: { url: string; caption?: string }[];
    galleryColumns?: 2 | 3;
    listItems?: string[];
    // POD Product Embedding
    productId?: string;
    productTitle?: string;
    productCategory?: string;
    productPrice?: string;
    productImage?: string;
    productDesign?: string;
    productBadge?: string;
    // Collection Embedding
    collectionSlug?: string;
    collectionTitle?: string;
    collectionSubtitle?: string;
    collectionImage?: string;
    // CTA Block
    ctaTitle?: string;
    ctaSubtitle?: string;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
    ctaStyle?: "minimal" | "gold" | "newsletter";
    // Video / Embed
    videoUrl?: string;
    videoProvider?: "youtube" | "vimeo" | "custom";
    embedCode?: string;
    embedTitle?: string;
    [key: string]: unknown;
  };
}

export interface ArticleSEO {
  seoTitle: string;
  metaDescription: string;
  urlSlug: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string[];
  robotsIndex: boolean;
  robotsFollow: boolean;
}

export interface ArticleAnalytics {
  views: number;
  uniqueVisitors: number;
  avgReadTime: string;
  scrollDepth: number; // percentage
  engagementRate: number; // percentage
  productClicks: number;
  conversions: number;
  viewsHistory: { date: string; views: number; unique: number; productClicks: number }[];
  trafficSources: { source: string; percentage: number; visitors: number }[];
}

export interface ArticleAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  articleCount: number;
  status: "Active" | "Guest" | "Inactive";
}

export interface ArticleCategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  status: "Active" | "Archived";
  seoStatus: "Optimized" | "Needs Review" | "Missing Meta";
}

export interface ArticleTagItem {
  id: string;
  name: string;
  slug: string;
  usageCount: number;
}

export interface ArticleVersionHistoryItem {
  id: string;
  versionNumber: number;
  timestamp: string;
  author: string;
  changeSummary: string;
  wordCount: number;
  snapshotTitle: string;
}

export interface ContentCalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: "blog" | "collection" | "promotion" | "campaign";
  status: "scheduled" | "draft" | "published";
  author?: string;
  category?: string;
  notes?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt?: string;
  category: ArticleCategory | string;
  tags: string[];
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  status: ArticleStatus;
  publishedAt?: string;
  scheduledAt?: string;
  scheduledTime?: string;
  scheduledTimezone?: string;
  lastUpdated: string;
  readTime: string;
  seo: ArticleSEO;
  blocks: ArticleBlock[];
  analytics: ArticleAnalytics;
  versions: ArticleVersionHistoryItem[];
  language: string;
  isFeatured?: boolean;
}

export interface AIArticleGenConfig {
  topic: string;
  audience: string;
  tone:
    | "Premium / Editorial"
    | "Architectural / Minimal"
    | "Warm & Informative"
    | "Underground Luxury"
    | "Technical Fabric";
  length: "Short (~500 words)" | "Medium (~1,000 words)" | "Long-Form (~1,800 words)";
  language: "English" | "Deutsch" | "Français" | "العربية (Arabic)" | "Español" | "Italiano";
  includeProductEmbeds: boolean;
  category: string;
}
