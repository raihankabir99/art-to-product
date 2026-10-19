export type SectionType =
  | "announcement"
  | "header"
  | "hero"
  | "featured-collection"
  | "new-designs"
  | "best-sellers"
  | "shop-by-product"
  | "one-design-multiple"
  | "featured-designs"
  | "editorial"
  | "video"
  | "promotional-banner"
  | "reviews"
  | "brand-story"
  | "blog"
  | "newsletter"
  | "social-showcase"
  | "footer";

export type SectionStatus = "published" | "draft" | "scheduled" | "hidden";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export type HeroPreset =
  "centered" | "left-aligned" | "right-aligned" | "split" | "cinematic" | "editorial";

export interface ResponsiveSetting<T> {
  desktop: T;
  tablet: T;
  mobile: T;
}

export interface ResponsiveOverrides {
  desktopColumns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  desktopPadding?: "none" | "sm" | "md" | "lg" | "xl";
  tabletPadding?: "none" | "sm" | "md" | "lg" | "xl";
  mobilePadding?: "none" | "sm" | "md" | "lg" | "xl";
}

export interface CommonSectionConfig {
  id: string;
  type: SectionType;
  name: string;
  visible: boolean;
  status: SectionStatus;
  scheduledDate?: string;
  paddingTop: "none" | "sm" | "md" | "lg" | "xl";
  paddingBottom: "none" | "sm" | "md" | "lg" | "xl";
  background: "default" | "surface" | "surface-2" | "black" | "subtle-gold" | "editorial";
  containerWidth: "default" | "narrow" | "wide" | "full";
  animation: "none" | "fade-up" | "subtle-zoom" | "slide-in";
  borderTop: boolean;
  borderBottom: boolean;
  responsiveOverrides?: ResponsiveOverrides;
  seoTag?: string;
}

export interface HeroSectionData extends CommonSectionConfig {
  type: "hero";
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  deliveryNote: string;
  desktopImage: string;
  mobileImage: string;
  altText: string;
  focalPoint: "center" | "top" | "bottom" | "left" | "right";
  textAlignment: "left" | "center" | "right";
  imagePosition: "background" | "split-left" | "split-right";
  contentWidth: "sm" | "md" | "lg" | "full";
  overlayStrength: number; // 0 to 100
  dimensions: string;
  fileSize: string;
  preset?: HeroPreset;
  height?: "screen" | "large" | "compact" | "cinematic";
}

export interface AnnouncementSectionData extends CommonSectionConfig {
  type: "announcement";
  text: string;
  linkText?: string;
  linkUrl?: string;
  showMarquee: boolean;
  marqueeSpeed: "slow" | "normal" | "fast";
  items: string[];
}

export interface HeaderSectionData extends CommonSectionConfig {
  type: "header";
  showLogoText: boolean;
  showCurrencySelector: boolean;
  sticky: boolean;
  transparentOnHero: boolean;
}

export interface FeaturedCollectionSectionData extends CommonSectionConfig {
  type: "featured-collection";
  collectionSlug: string;
  eyebrow: string;
  title: string;
  description: string;
  coverImage: string;
  ctaText: string;
  ctaLink: string;
  itemCount: number;
  layout: "2-col" | "3-col" | "4-col" | "editorial-split" | "large-feature";
}

export interface NewDesignsSectionData extends CommonSectionConfig {
  type: "new-designs";
  eyebrow: string;
  title: string;
  subheading: string;
  itemCount: number;
  source: "newest" | "recent" | "trending" | "manual";
  sorting: "newest" | "popular" | "price-asc" | "price-desc";
  ctaText: string;
  ctaLink: string;
  selectedDesignSlugs: string[];
  showBadges: boolean;
}

export interface BestSellersSectionData extends CommonSectionConfig {
  type: "best-sellers";
  eyebrow: string;
  title: string;
  subheading: string;
  source: "automatic" | "manual";
  timePeriod: "7d" | "30d" | "90d" | "all";
  itemCount: number;
  ctaText: string;
  ctaLink: string;
  selectedDesignSlugs: string[];
}

export interface ProductCategoryItem {
  id: string;
  name: string;
  subtitle: string;
  image?: string;
  link: string;
  order: number;
  visible: boolean;
}

export interface ShopByProductSectionData extends CommonSectionConfig {
  type: "shop-by-product";
  eyebrow: string;
  title: string;
  description: string;
  categories: ProductCategoryItem[];
  layout: "pills" | "grid-3" | "grid-4" | "editorial-cards";
}

export interface OneDesignMultipleSectionData extends CommonSectionConfig {
  type: "one-design-multiple";
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  masterDesignSlug: string;
  selectedProductTypes: string[];
  ctaText: string;
  ctaLink: string;
  gridColumns: 2 | 3 | 4 | 5;
}

export interface FeaturedDesignsSectionData extends CommonSectionConfig {
  type: "featured-designs";
  eyebrow: string;
  title: string;
  description: string;
  selectedDesignSlugs: string[];
  itemCount: number;
  ctaText: string;
  ctaLink: string;
  columns: 2 | 3 | 4;
}

export interface EditorialSectionData extends CommonSectionConfig {
  type: "editorial";
  eyebrow: string;
  heading: string;
  description: string;
  primaryImage: string;
  secondaryImage?: string;
  ctaText: string;
  ctaLink: string;
  layout: "image-left" | "text-left" | "full-width" | "split-editorial" | "magazine-grid";
  metrics: { value: string; label: string }[];
}

export interface VideoSectionData extends CommonSectionConfig {
  type: "video";
  eyebrow?: string;
  heading: string;
  subheading?: string;
  videoUrl: string;
  posterImage: string;
  autoplay: boolean;
  mute: boolean;
  loop: boolean;
  overlayOpacity: number;
  ctaText?: string;
  ctaLink?: string;
  videoAspect: "16:9" | "21:9" | "4:3" | "full-bleed";
}

export interface PromoBannerSectionData extends CommonSectionConfig {
  type: "promotional-banner";
  headline: string;
  subheadline: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  desktopImage: string;
  mobileImage: string;
  backgroundTreatment: "gradient-noir" | "gold-accent" | "editorial-photo" | "monochrome-border";
  startDate?: string;
  endDate?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  productName: string;
  designName: string;
  quote: string;
  verified: boolean;
  featured: boolean;
}

export interface ReviewsSectionData extends CommonSectionConfig {
  type: "reviews";
  eyebrow: string;
  title: string;
  source: "featured" | "latest" | "manual";
  layout: "grid" | "carousel" | "large-testimonial" | "editorial-quote";
  reviews: ReviewItem[];
}

export interface BrandStorySectionData extends CommonSectionConfig {
  type: "brand-story";
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  imagePosition: "left" | "right" | "center-stacked";
  alignment: "left" | "center";
  height: "compact" | "medium" | "cinematic";
  style: "minimal" | "framed" | "luxury-card";
}

export interface BlogSectionData extends CommonSectionConfig {
  type: "blog";
  eyebrow: string;
  title: string;
  source: "latest" | "featured" | "manual" | "category";
  categoryFilter?: string;
  postCount: number;
  imageRatio: "16:9" | "4:3" | "1:1";
  showAuthor: boolean;
  showDate: boolean;
  showCategory: boolean;
  showExcerpt: boolean;
  layout: "2-col" | "3-col" | "4-col" | "editorial";
  ctaText: string;
  ctaLink: string;
}

export interface NewsletterSectionData extends CommonSectionConfig {
  type: "newsletter";
  eyebrow: string;
  heading: string;
  description: string;
  inputPlaceholder: string;
  ctaText: string;
  successMessage: string;
  privacyMessage: string;
  backgroundStyle: "minimal" | "editorial" | "image" | "dark-luxury";
}

export interface SocialCardItem {
  id: string;
  platform: "instagram" | "tiktok" | "pinterest" | "facebook";
  handle: string;
  image: string;
  caption: string;
  link: string;
  likes: string;
  visible: boolean;
}

export interface SocialShowcaseSectionData extends CommonSectionConfig {
  type: "social-showcase";
  eyebrow: string;
  title: string;
  handle: string;
  items: SocialCardItem[];
}

export interface FooterSectionData extends CommonSectionConfig {
  type: "footer";
  showTrustBadges: boolean;
  showNewsletter: boolean;
  showCurrencySelector: boolean;
  copyrightText: string;
}

export type HomepageSection =
  | AnnouncementSectionData
  | HeaderSectionData
  | HeroSectionData
  | FeaturedCollectionSectionData
  | NewDesignsSectionData
  | BestSellersSectionData
  | ShopByProductSectionData
  | OneDesignMultipleSectionData
  | FeaturedDesignsSectionData
  | EditorialSectionData
  | VideoSectionData
  | PromoBannerSectionData
  | ReviewsSectionData
  | BrandStorySectionData
  | BlogSectionData
  | NewsletterSectionData
  | SocialShowcaseSectionData
  | FooterSectionData;

export interface HomepageVersion {
  id: string;
  version: string;
  timestamp: string;
  author: string;
  note: string;
  status: "published" | "draft" | "archived";
  sectionsCount: number;
}
