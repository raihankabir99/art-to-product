export type PageType =
  "SYSTEM" | "CONTENT" | "INFORMATION" | "EDITORIAL" | "LANDING" | "CAMPAIGN" | "LEGAL" | "UTILITY";

export type PageStatus =
  "Draft" | "Published" | "Scheduled" | "Archived" | "In Review" | "Unpublished";

export type PageTemplate =
  | "Blank"
  | "Editorial"
  | "Luxury Story"
  | "Minimal"
  | "Split Image"
  | "Full Width"
  | "FAQ"
  | "Contact"
  | "Information"
  | "Campaign"
  | "Size Guide"
  | "Landing Page";

export interface PageSEO {
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  seoScore?: number;
}

export type BlockType =
  | "text"
  | "heading"
  | "image"
  | "imageText"
  | "video"
  | "button"
  | "divider"
  | "quote"
  | "gallery"
  | "productGrid"
  | "designGrid"
  | "collectionGrid"
  | "blogGrid"
  | "testimonial"
  | "faq"
  | "newsletter"
  | "banner"
  | "spacer"
  | "twoColumn"
  | "threeColumn"
  | "editorialSplit"
  | "contactForm"
  | "sizeGuide"
  | "shippingTimeline"
  | "tableOfContents"
  | "timeline"
  | "cta";

export interface PageBlock {
  id: string;
  type: BlockType;
  label: string;
  category?: string;
  isReusable?: boolean;
  reusableName?: string;
  settings: {
    heading?: string;
    subheading?: string;
    body?: string;
    alignment?: "left" | "center" | "right";
    width?: "full" | "contained" | "narrow";
    typography?: "sans" | "serif" | "mono" | "display";
    spacingTop?: "none" | "sm" | "md" | "lg";
    spacingBottom?: "none" | "sm" | "md" | "lg";
    visibility?: "all" | "desktop" | "mobile";
    imageUrl?: string;
    altText?: string;
    linkUrl?: string;
    objectFit?: "cover" | "contain" | "fill";
    focalPoint?: "center" | "top" | "bottom";
    aspectRatio?: "auto" | "1/1" | "16/9" | "4/3" | "3/4";
    buttonText?: string;
    buttonStyle?: "gold" | "outline" | "dark" | "link";
    buttonSize?: "sm" | "md" | "lg";
    openInNewTab?: boolean;
    quoteAuthor?: string;
    quoteRole?: string;
    videoUrl?: string;
    itemsCount?: number;
    categoryFilter?: string;
    columns?: number;
    backgroundTreatment?: "default" | "surface" | "gold-subtle" | "darkroom";
    customCssClass?: string;
    [key: string]: string | number | boolean | undefined | string[] | unknown;
  };
}

export interface ReusableSection {
  id: string;
  name: string;
  category: string;
  block: PageBlock;
  createdAt: string;
  author: string;
}

export interface PageAnalytics {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: string;
  bounceRate: string;
  ctaClicks: number;
  conversionRate: string;
  viewsHistory: { date: string; views: number }[];
}

export interface PageVersion {
  id: string;
  version: string;
  updatedAt: string;
  author: string;
  summary: string;
  blocksSnapshot: PageBlock[];
}

export interface PageItem {
  id: string;
  name: string;
  slug: string;
  type: PageType;
  status: PageStatus;
  lastUpdated: string;
  author: string;
  publishDate?: string;
  scheduledPublishDate?: string;
  scheduledUnpublishDate?: string;
  timezone?: string;
  visibility: "Public" | "Hidden" | "Password Protected";
  description: string;
  template: PageTemplate;
  seo: PageSEO;
  blocks: PageBlock[];
  versions: PageVersion[];
  analytics?: PageAnalytics;
  requiresLegalReview?: boolean;
  reviewStatus?: "Pending Review" | "Reviewed & Approved" | "Needs Changes";
}

export interface NavItem {
  id: string;
  label: string;
  url: string;
  visible: boolean;
  badge?: string;
  isDropdown?: boolean;
  isMegaMenu?: boolean;
  children?: { id: string; label: string; url: string; visible: boolean }[];
  megaMenu?: MegaMenuConfig;
}

export interface MegaMenuColumn {
  id: string;
  title: string;
  links: { id: string; label: string; url: string; badge?: string }[];
}

export interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  featuredImage?: string;
  featuredTitle?: string;
  featuredSubtitle?: string;
  featuredCtaLabel?: string;
  featuredCtaUrl?: string;
}

export interface HeaderElement {
  id: string;
  type: "logo" | "nav" | "search" | "wishlist" | "cart" | "account" | "cta" | "announcement";
  label: string;
  visible: boolean;
  order: number;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  text: string;
  link: string;
  startDate?: string;
  endDate?: string;
  backgroundColor: string;
  textColor: string;
}

export interface FooterLink {
  id: string;
  label: string;
  url: string;
  visible: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  visible: boolean;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  platform: "Instagram" | "TikTok" | "Pinterest" | "Facebook" | "YouTube" | "X";
  url: string;
  visible: boolean;
  order: number;
  handle: string;
}

export interface FooterNewsletterConfig {
  heading: string;
  description: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  privacyNotice: string;
}

export interface FooterSettings {
  brandTagline: string;
  copyrightText: string;
  newsletterHeading: string;
  newsletterSubtitle: string;
  paymentBadges: string[];
}

export interface GlobalSettings {
  brandName: string;
  tagline: string;
  supportEmail: string;
  contactEmail: string;
  supportText: string;
  copyrightText: string;
  defaultCurrency: string;
  defaultLanguage: string;
  timezone: string;
}

export interface CTAPreset {
  id: string;
  name: string;
  text: string;
  url: string;
  style: "gold" | "outline" | "dark" | "ghost";
  archived?: boolean;
}
