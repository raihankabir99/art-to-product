import {
  ArticleItem,
  ArticleAuthor,
  ArticleCategoryItem,
  ArticleTagItem,
  ContentCalendarEvent,
} from "./blog-types";

export const INITIAL_AUTHORS: ArticleAuthor[] = [
  {
    id: "auth_1",
    name: "Creative Studio",
    role: "Editorial Direction & Styling",
    bio: "Studio Noir collective curating seasonal aesthetics, print methodology, and sustainable luxury discourse.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    articleCount: 32,
    status: "Active",
  },
  {
    id: "auth_2",
    name: "Elena Rostova",
    role: "Textile & Materials Researcher",
    bio: "Specialist in 240–400gsm organic cottons, zero-waste garment dyestuffs, and archival print permanence.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    articleCount: 14,
    status: "Active",
  },
  {
    id: "auth_3",
    name: "Marcus Vance",
    role: "Senior Design Critic & Curator",
    bio: "Writing on brutalist typography, contemporary European streetwear, and generative silk-screen aesthetics.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    articleCount: 19,
    status: "Active",
  },
  {
    id: "auth_4",
    name: "Julian Croft",
    role: "Sustainability & POD Lead",
    bio: "Leading decentralized on-demand fulfillment research in Berlin, London, and Tokyo hubs.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    articleCount: 9,
    status: "Active",
  },
  {
    id: "auth_5",
    name: "Sophia Laurent",
    role: "Guest Cultural Essayist",
    bio: "Paris-based fashion theorist contributing essays on quiet luxury and graphic iconography.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    articleCount: 6,
    status: "Guest",
  },
];

export const INITIAL_CATEGORIES: ArticleCategoryItem[] = [
  {
    id: "cat_1",
    name: "Design",
    slug: "design",
    description:
      "Deep explorations into graphic architecture, typography systems, and vector craft.",
    articleCount: 18,
    status: "Active",
    seoStatus: "Optimized",
  },
  {
    id: "cat_2",
    name: "Fashion",
    slug: "fashion",
    description:
      "Styling essays, silhouette breakdowns, and European minimalist wardrobe curation.",
    articleCount: 22,
    status: "Active",
    seoStatus: "Optimized",
  },
  {
    id: "cat_3",
    name: "Product Guides",
    slug: "product-guides",
    description:
      "Technical comparisons between garment weights, blank cuts, and museum paper grades.",
    articleCount: 12,
    status: "Active",
    seoStatus: "Optimized",
  },
  {
    id: "cat_4",
    name: "Care Guides",
    slug: "care-guides",
    description: "Archival preservation methods, cold-wash chemistry, and longevity practices.",
    articleCount: 8,
    status: "Active",
    seoStatus: "Optimized",
  },
  {
    id: "cat_5",
    name: "Brand Stories",
    slug: "brand-stories",
    description: "The philosophy of zero-inventory creation, artisan ateliers, and design origins.",
    articleCount: 9,
    status: "Active",
    seoStatus: "Optimized",
  },
  {
    id: "cat_6",
    name: "Culture",
    slug: "culture",
    description:
      "City notes from Berlin, Paris, and London exploring art galleries and subcultures.",
    articleCount: 11,
    status: "Active",
    seoStatus: "Needs Review",
  },
  {
    id: "cat_7",
    name: "Gift Guides",
    slug: "gift-guides",
    description: "Curated selections of limited edition wearable art and framed museum prints.",
    articleCount: 5,
    status: "Active",
    seoStatus: "Needs Review",
  },
  {
    id: "cat_8",
    name: "Lifestyle",
    slug: "lifestyle",
    description:
      "Living with art: interior styling, coffee table curation, and architectural spaces.",
    articleCount: 7,
    status: "Active",
    seoStatus: "Optimized",
  },
];

export const INITIAL_TAGS: ArticleTagItem[] = [
  { id: "tag_1", name: "Minimalism", slug: "minimalism", usageCount: 24 },
  { id: "tag_2", name: "Heavyweight Cotton", slug: "heavyweight-cotton", usageCount: 18 },
  { id: "tag_3", name: "Nocturne Capsule", slug: "nocturne-capsule", usageCount: 15 },
  { id: "tag_4", name: "Streetwear", slug: "streetwear", usageCount: 22 },
  { id: "tag_5", name: "Print On Demand", slug: "print-on-demand", usageCount: 19 },
  { id: "tag_6", name: "Sustainability", slug: "sustainability", usageCount: 14 },
  { id: "tag_7", name: "Typography", slug: "typography", usageCount: 11 },
  { id: "tag_8", name: "Styling Tips", slug: "styling-tips", usageCount: 16 },
  { id: "tag_9", name: "Archival Quality", slug: "archival-quality", usageCount: 10 },
  { id: "tag_10", name: "Berlin Ateliers", slug: "berlin-ateliers", usageCount: 8 },
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: "art_1",
    slug: "minimal-design-changing-streetwear",
    title: "How Minimal Design Is Changing Modern Streetwear",
    excerpt:
      "Discover how restrained palettes, brutalist typography, and museum-grade heavy cotton are redefining luxury streetwear.",
    featuredImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt:
      "Model wearing heavyweight minimal graphic streetwear in monochrome editorial setting",
    category: "Design",
    tags: ["Minimalism", "Streetwear", "Typography", "Nocturne Capsule"],
    author: "Creative Studio",
    authorRole: "Editorial Direction",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "published",
    publishedAt: "2026-08-20",
    lastUpdated: "2026-08-25 14:30",
    readTime: "6 min read",
    isFeatured: true,
    language: "English",
    seo: {
      seoTitle: "How Minimal Design Is Changing Modern Streetwear | Studio Noir",
      metaDescription:
        "Discover how minimal design is shaping modern streetwear through brutalist silhouettes, organic heavyweight cotton, and curated print-on-demand drops.",
      urlSlug: "minimal-design-changing-streetwear",
      canonicalUrl: "https://studionoir.fashion/journal/minimal-design-changing-streetwear",
      ogTitle: "How Minimal Design Is Changing Modern Streetwear",
      ogDescription:
        "An editorial deep dive into minimalist graphic garments and zero-waste craft.",
      ogImage:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
      keywords: [
        "minimal streetwear",
        "luxury print on demand",
        "heavyweight tee",
        "studio noir journal",
      ],
      robotsIndex: true,
      robotsFollow: true,
    },
    analytics: {
      views: 24800,
      uniqueVisitors: 19400,
      avgReadTime: "5m 42s",
      scrollDepth: 82,
      engagementRate: 74,
      productClicks: 1420,
      conversions: 184,
      viewsHistory: [
        { date: "Aug 20", views: 2100, unique: 1800, productClicks: 95 },
        { date: "Aug 21", views: 3400, unique: 2900, productClicks: 180 },
        { date: "Aug 22", views: 4800, unique: 4100, productClicks: 310 },
        { date: "Aug 23", views: 5600, unique: 4900, productClicks: 390 },
        { date: "Aug 24", views: 4900, unique: 3800, productClicks: 260 },
        { date: "Aug 25", views: 4000, unique: 1900, productClicks: 185 },
      ],
      trafficSources: [
        { source: "Organic Google Search", percentage: 44, visitors: 8536 },
        { source: "Instagram & Pinterest Editorial", percentage: 32, visitors: 6208 },
        { source: "Newsletter Dispatch", percentage: 16, visitors: 3104 },
        { source: "Direct / Referral", percentage: 8, visitors: 1552 },
      ],
    },
    versions: [
      {
        id: "v_3",
        versionNumber: 3,
        timestamp: "2026-08-25 14:30",
        author: "Creative Studio",
        changeSummary: "Updated POD product link and refined typography intro",
        wordCount: 1140,
        snapshotTitle: "How Minimal Design Is Changing Modern Streetwear (Published v3)",
      },
      {
        id: "v_2",
        versionNumber: 2,
        timestamp: "2026-08-20 09:15",
        author: "Marcus Vance",
        changeSummary: "Added gallery blocks and editorial pullquote",
        wordCount: 1080,
        snapshotTitle: "How Minimal Design Is Changing Modern Streetwear (v2)",
      },
      {
        id: "v_1",
        versionNumber: 1,
        timestamp: "2026-08-18 16:40",
        author: "Creative Studio",
        changeSummary: "Initial draft generated with AI Content Studio",
        wordCount: 890,
        snapshotTitle: "Initial Draft: Minimal Streetwear",
      },
    ],
    blocks: [
      {
        id: "blk_1",
        type: "paragraph",
        content:
          "For decades, streetwear was dominated by loud logos, maximalist embroidery, and frantic seasonal turnarounds. Yet across Berlin, London, and Tokyo, a quieter revolution has emerged: garments designed around disciplined geometry, stark negative space, and substantial physical presence.",
      },
      {
        id: "blk_2",
        type: "heading",
        content: "The Shift from Loud Graphics to Architectural Form",
        settings: { level: 2 },
      },
      {
        id: "blk_3",
        type: "paragraph",
        content:
          "When visual noise is stripped away, every choice becomes magnified. The drape of a 240gsm combed cotton jersey, the exact millimeter offset of a silk-screen motif, and the matte finish of water-based inks become the defining hallmarks of luxury.",
      },
      {
        id: "blk_4",
        type: "quote",
        content:
          "Simplicity is not the lack of clutter, that's simply a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and piece.",
        settings: {
          quoteAuthor: "Marcus Vance",
          quoteRole: "Senior Design Critic",
        },
      },
      {
        id: "blk_5",
        type: "image",
        content:
          "Close-up fabric texture showing 240gsm jersey weave and crisp line art vector print",
        settings: {
          imageUrl:
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
          imageCaption:
            "Studio Noir Nocturne Edition — Garment-dyed heavyweight cotton with micro-registration ink curing.",
          aspectRatio: "16/9",
        },
      },
      {
        id: "blk_6",
        type: "heading",
        content: "Featured Silhouette: The Midnight Lion Capsule",
        settings: { level: 3 },
      },
      {
        id: "blk_7",
        type: "product",
        content: "Midnight Lion Organic Heavyweight T-Shirt",
        settings: {
          productId: "tshirt",
          productTitle: "Midnight Lion Heavyweight T-Shirt",
          productCategory: "Apparel • 240gsm Organic Jersey",
          productPrice: "€49.00",
          productImage:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
          productDesign: "Midnight Lion",
          productBadge: "Bestseller",
        },
      },
      {
        id: "blk_8",
        type: "paragraph",
        content:
          "By producing exclusively on demand, each shirt is printed upon order verification in our Berlin atelier, entirely eliminating deadstock warehouses and synthetic overruns.",
      },
      {
        id: "blk_9",
        type: "collection",
        content: "Explore the Nocturne Collection",
        settings: {
          collectionSlug: "nocturne",
          collectionTitle: "The Nocturne Capsule",
          collectionSubtitle:
            "14 exclusive artworks translated across heavyweight apparel and museum giclée prints.",
          collectionImage:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        },
      },
      {
        id: "blk_10",
        type: "cta",
        content: "Join the Collector Dispatch",
        settings: {
          ctaTitle: "RECEIVE PRIORITY DROPS & EDITORIAL ESSAYS",
          ctaSubtitle: "Strictly limited print runs. Delivered directly to your inbox.",
          ctaButtonText: "SUBSCRIBE NOW",
          ctaButtonUrl: "#newsletter",
          ctaStyle: "gold",
        },
      },
    ],
  },
  {
    id: "art_2",
    slug: "architecture-of-heavyweight-cotton",
    title: "The Architecture of Heavyweight Cotton: 240gsm vs 400gsm",
    excerpt:
      "Why fabric weight and combed weave determine whether your garment drapes like architectural canvas or folds like fast fashion.",
    featuredImage:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Close up of folded organic heavyweight cotton textiles",
    category: "Product Guides",
    tags: ["Heavyweight Cotton", "Sustainability", "Archival Quality"],
    author: "Elena Rostova",
    authorRole: "Textile Researcher",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    status: "published",
    publishedAt: "2026-08-12",
    lastUpdated: "2026-08-22 10:15",
    readTime: "5 min read",
    isFeatured: false,
    language: "English",
    seo: {
      seoTitle: "The Architecture of Heavyweight Cotton: 240gsm vs 400gsm | Studio Noir",
      metaDescription:
        "Explore the textile science behind 240gsm jersey and 400gsm loopback fleece in luxury print-on-demand clothing.",
      urlSlug: "architecture-of-heavyweight-cotton",
      canonicalUrl: "https://studionoir.fashion/journal/architecture-of-heavyweight-cotton",
      ogTitle: "The Architecture of Heavyweight Cotton",
      ogDescription: "A material breakdown of organic loopback fleece and combed jersey.",
      ogImage:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
      keywords: ["400gsm hoodie", "240gsm tee", "organic cotton guide"],
      robotsIndex: true,
      robotsFollow: true,
    },
    analytics: {
      views: 32700,
      uniqueVisitors: 26100,
      avgReadTime: "4m 50s",
      scrollDepth: 88,
      engagementRate: 79,
      productClicks: 2190,
      conversions: 310,
      viewsHistory: [
        { date: "Aug 12", views: 3200, unique: 2800, productClicks: 140 },
        { date: "Aug 15", views: 6100, unique: 5200, productClicks: 420 },
        { date: "Aug 18", views: 7800, unique: 6300, productClicks: 610 },
        { date: "Aug 22", views: 8900, unique: 7100, productClicks: 590 },
      ],
      trafficSources: [
        { source: "Organic Google Search", percentage: 56, visitors: 14616 },
        { source: "Direct Bookmarks", percentage: 22, visitors: 5742 },
        { source: "Reddit & Fashion Forums", percentage: 14, visitors: 3654 },
        { source: "Newsletter", percentage: 8, visitors: 2088 },
      ],
    },
    versions: [
      {
        id: "v_2",
        versionNumber: 2,
        timestamp: "2026-08-22 10:15",
        author: "Elena Rostova",
        changeSummary: "Updated shrinkage test results for 30°C cold washes",
        wordCount: 980,
        snapshotTitle: "Heavyweight Cotton Guide v2",
      },
    ],
    blocks: [
      {
        id: "blk_201",
        type: "paragraph",
        content:
          "Garment weight is often misunderstood as simply feeling warm. In bespoke tailoring and contemporary streetwear, GSM (grams per square meter) is the structural skeleton of the silhouette.",
      },
      {
        id: "blk_202",
        type: "heading",
        content: "240 GSM: The Non-Transparent Master Silhouette",
        settings: { level: 2 },
      },
      {
        id: "blk_203",
        type: "paragraph",
        content:
          "A standard fast-fashion t-shirt clocks in at 140–160gsm. At 240gsm, cotton ceases to cling to the body and instead holds its own boxy, dropped-shoulder posture throughout the day.",
      },
      {
        id: "blk_204",
        type: "product",
        content: "Double-Lined 400gsm Heavyweight Hoodie",
        settings: {
          productId: "hoodie",
          productTitle: "Double-Lined 400gsm Hoodie",
          productCategory: "Apparel • 400gsm Loopback Organic Fleece",
          productPrice: "€95.00",
          productImage:
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
          productDesign: "Nordic Silence",
          productBadge: "Limited Edition",
        },
      },
    ],
  },
  {
    id: "art_3",
    slug: "print-on-demand-zero-waste-luxury",
    title: "Print On Demand, Without the Waste: The Zero-Inventory Manifesto",
    excerpt:
      "Why the future of European luxury lies in decentralised, made-to-order manufacturing hubs rather than speculative mass production.",
    featuredImage:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Abstract artistic print showing precise color fidelity",
    category: "Brand Stories",
    tags: ["Print On Demand", "Sustainability", "Berlin Ateliers"],
    author: "Julian Croft",
    authorRole: "POD & Sustainability Lead",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "published",
    publishedAt: "2026-07-28",
    lastUpdated: "2026-08-10 16:00",
    readTime: "4 min read",
    isFeatured: false,
    language: "English",
    seo: {
      seoTitle: "The Zero-Inventory Manifesto: Sustainable Print On Demand | Studio Noir",
      metaDescription:
        "Learn how Studio Noir crafts luxury apparel with zero landfill waste through intelligent print-on-demand production.",
      urlSlug: "print-on-demand-zero-waste-luxury",
      canonicalUrl: "https://studionoir.fashion/journal/print-on-demand-zero-waste-luxury",
      ogTitle: "Print On Demand Without Waste",
      ogDescription: "The sustainable mathematics of zero deadstock.",
      ogImage:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
      keywords: ["sustainable fashion", "zero inventory", "print on demand luxury"],
      robotsIndex: true,
      robotsFollow: true,
    },
    analytics: {
      views: 18900,
      uniqueVisitors: 14200,
      avgReadTime: "4m 15s",
      scrollDepth: 76,
      engagementRate: 68,
      productClicks: 980,
      conversions: 120,
      viewsHistory: [
        { date: "Jul 28", views: 2400, unique: 2000, productClicks: 90 },
        { date: "Aug 02", views: 4200, unique: 3500, productClicks: 210 },
        { date: "Aug 08", views: 5100, unique: 4100, productClicks: 280 },
      ],
      trafficSources: [
        { source: "Sustainability Portals", percentage: 41, visitors: 5822 },
        { source: "Organic Search", percentage: 35, visitors: 4970 },
        { source: "Social Media", percentage: 24, visitors: 3408 },
      ],
    },
    versions: [],
    blocks: [
      {
        id: "blk_301",
        type: "paragraph",
        content:
          "Over 85% of global textiles end up in landfills or incineration facilities annually. Studio Noir was founded on an uncompromising principle: not a single centimeter of cotton is touched until an individual orders it.",
      },
    ],
  },
  {
    id: "art_4",
    slug: "autumn-winter-curated-gift-guide",
    title: "Curated Art & Wearable Editions: The Autumn/Winter Gift Guide",
    excerpt:
      "An architectural selection of framed museum giclée prints, heavyweight fleece, and bespoke stoneware for the design purist.",
    featuredImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Curated collection of print artwork and apparel items on black table",
    category: "Gift Guides",
    tags: ["Nocturne Capsule", "Archival Quality", "Styling Tips"],
    author: "Creative Studio",
    authorRole: "Editorial Direction",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "scheduled",
    scheduledAt: "2026-09-01",
    scheduledTime: "09:00",
    scheduledTimezone: "CET (Berlin)",
    lastUpdated: "2026-08-27 18:20",
    readTime: "7 min read",
    isFeatured: false,
    language: "English",
    seo: {
      seoTitle: "Autumn/Winter Curated Gift Guide | Studio Noir",
      metaDescription:
        "Discover luxury gifts for the minimalist: museum posters, organic fleece hoodies, and ceramic editions.",
      urlSlug: "autumn-winter-curated-gift-guide",
      canonicalUrl: "https://studionoir.fashion/journal/autumn-winter-curated-gift-guide",
      ogTitle: "Autumn/Winter Curated Gift Guide",
      ogDescription: "Architectural editions for collectors.",
      ogImage:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
      keywords: ["luxury gift guide", "art print gifts", "hoodie gift"],
      robotsIndex: true,
      robotsFollow: true,
    },
    analytics: {
      views: 0,
      uniqueVisitors: 0,
      avgReadTime: "0m 00s",
      scrollDepth: 0,
      engagementRate: 0,
      productClicks: 0,
      conversions: 0,
      viewsHistory: [],
      trafficSources: [],
    },
    versions: [
      {
        id: "v_1",
        versionNumber: 1,
        timestamp: "2026-08-27 18:20",
        author: "Creative Studio",
        changeSummary: "Scheduled for release on Sept 1st Autumn Launch",
        wordCount: 1420,
        snapshotTitle: "AW26 Gift Guide Staged",
      },
    ],
    blocks: [
      {
        id: "blk_401",
        type: "paragraph",
        content:
          "Gifting objects of true durability requires moving past disposable novelties. Our seasonal guide focuses on pieces crafted with heirloom integrity.",
      },
    ],
  },
  {
    id: "art_5",
    slug: "fabric-care-preservation-guide",
    title: "Fabric Care & Longevity: The Archival Wash Principles",
    excerpt:
      "How to wash 240gsm garment-dyed cotton and 400gsm loopback fleece to guarantee color intensity and shape over 100+ wear cycles.",
    featuredImage:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Clean folded cotton garments stacked neatly on wooden bench",
    category: "Care Guides",
    tags: ["Heavyweight Cotton", "Archival Quality", "Sustainability"],
    author: "Elena Rostova",
    authorRole: "Textile Researcher",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    status: "in_review",
    lastUpdated: "2026-08-26 11:45",
    readTime: "4 min read",
    isFeatured: false,
    language: "English",
    seo: {
      seoTitle: "Fabric Care & Longevity: The Archival Wash Principles | Studio Noir",
      metaDescription:
        "Discover how to maintain your organic heavyweight t-shirts and hoodies in pristine condition for decades.",
      urlSlug: "fabric-care-preservation-guide",
      canonicalUrl: "https://studionoir.fashion/journal/fabric-care-preservation-guide",
      ogTitle: "Fabric Care & Longevity Guide",
      ogDescription: "Cold wash science for archival cotton.",
      ogImage:
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
      keywords: ["wash heavyweight cotton", "garment care guide", "t-shirt longevity"],
      robotsIndex: true,
      robotsFollow: true,
    },
    analytics: {
      views: 0,
      uniqueVisitors: 0,
      avgReadTime: "0m 00s",
      scrollDepth: 0,
      engagementRate: 0,
      productClicks: 0,
      conversions: 0,
      viewsHistory: [],
      trafficSources: [],
    },
    versions: [],
    blocks: [
      {
        id: "blk_501",
        type: "paragraph",
        content:
          "Heavyweight organic cotton gets better with age when treated properly. Always wash cold (30°C max), turn garments inside out to protect ink micro-layers, and air-dry flat.",
      },
    ],
  },
  {
    id: "art_6",
    slug: "berlin-typography-brutalist-streetwear",
    title: "Berlin Typography & Brutalism: Visual Anatomy of a Drop",
    excerpt:
      "Exploring the intersections between 20th-century Swiss grid systems, Berlin post-industrial signage, and high-density screen printing.",
    featuredImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Brutalist architectural concrete texture with sharp graphic shadows",
    category: "Culture",
    tags: ["Typography", "Minimalism", "Berlin Ateliers"],
    author: "Marcus Vance",
    authorRole: "Senior Design Critic",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "draft",
    lastUpdated: "2026-08-28 01:10",
    readTime: "8 min read",
    isFeatured: false,
    language: "English",
    seo: {
      seoTitle: "Berlin Typography & Brutalism | Studio Noir",
      metaDescription:
        "An exploration of brutalist signage in Berlin and its translation to streetwear typography.",
      urlSlug: "berlin-typography-brutalist-streetwear",
      canonicalUrl: "https://studionoir.fashion/journal/berlin-typography-brutalist-streetwear",
      ogTitle: "Berlin Typography & Brutalism",
      ogDescription: "Visual analysis of modern drop graphics.",
      ogImage:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
      keywords: ["brutalist design", "berlin typography", "streetwear graphics"],
      robotsIndex: true,
      robotsFollow: true,
    },
    analytics: {
      views: 0,
      uniqueVisitors: 0,
      avgReadTime: "0m 00s",
      scrollDepth: 0,
      engagementRate: 0,
      productClicks: 0,
      conversions: 0,
      viewsHistory: [],
      trafficSources: [],
    },
    versions: [],
    blocks: [
      {
        id: "blk_601",
        type: "paragraph",
        content:
          "Typography on fabric operates differently than typography on paper. It moves, stretches with the human frame, and catches oblique natural light.",
      },
    ],
  },
  {
    id: "art_7",
    slug: "solstice-symbols-sacred-geometry",
    title: "Solstice: Geometry & Solar Symbols in Modern Silk-Screen",
    excerpt:
      "Inside the sketchbook of our newest capsule: transforming ancient solar celestial alignments into minimal vector glyphs.",
    featuredImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "High fashion editorial lookbook showing geometry printed garment",
    category: "Design",
    tags: ["Nocturne Capsule", "Minimalism", "Typography"],
    author: "Creative Studio",
    authorRole: "Editorial Direction",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "archived",
    publishedAt: "2026-05-10",
    lastUpdated: "2026-06-01 12:00",
    readTime: "5 min read",
    isFeatured: false,
    language: "English",
    seo: {
      seoTitle: "Solstice: Geometry & Solar Symbols in Silk-Screen | Studio Noir",
      metaDescription: "Discover the design story behind the Solstice capsule artwork.",
      urlSlug: "solstice-symbols-sacred-geometry",
      canonicalUrl: "https://studionoir.fashion/journal/solstice-symbols-sacred-geometry",
      ogTitle: "Solstice Capsule Design Story",
      ogDescription: "Celestial geometry translated to silk-screen prints.",
      ogImage:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      keywords: ["solstice art", "silk screen design", "geometric graphics"],
      robotsIndex: false,
      robotsFollow: false,
    },
    analytics: {
      views: 14500,
      uniqueVisitors: 11200,
      avgReadTime: "3m 50s",
      scrollDepth: 71,
      engagementRate: 62,
      productClicks: 740,
      conversions: 88,
      viewsHistory: [],
      trafficSources: [],
    },
    versions: [],
    blocks: [],
  },
];

export const INITIAL_CALENDAR_EVENTS: ContentCalendarEvent[] = [
  {
    id: "cal_1",
    title: "How Minimal Design Is Changing Modern Streetwear",
    date: "2026-08-20",
    time: "09:00 CET",
    type: "blog",
    status: "published",
    author: "Creative Studio",
    category: "Design",
    notes: "Main launch story for the mid-season drop.",
  },
  {
    id: "cal_2",
    title: "Autumn/Winter Curated Gift Guide",
    date: "2026-09-01",
    time: "09:00 CET",
    type: "blog",
    status: "scheduled",
    author: "Creative Studio",
    category: "Gift Guides",
    notes: "Staged to sync with the AW26 campaign blast.",
  },
  {
    id: "cal_3",
    title: "Capsule Drop: Obsidian Archival Hoodie (400gsm)",
    date: "2026-09-05",
    time: "14:00 CET",
    type: "collection",
    status: "scheduled",
    notes: "Limited run of 150 pieces with bespoke numbered hangtags.",
  },
  {
    id: "cal_4",
    title: "Fabric Care & Longevity: Archival Wash Principles",
    date: "2026-09-10",
    time: "11:00 CET",
    type: "blog",
    status: "draft",
    author: "Elena Rostova",
    category: "Care Guides",
    notes: "Customer education series following the August deliveries.",
  },
  {
    id: "cal_5",
    title: "VIP Early Access: Private Nocturne Giclée Drop",
    date: "2026-09-18",
    time: "18:00 CET",
    type: "promotion",
    status: "scheduled",
    notes: "Direct mail dispatched to top 500 tier collectors.",
  },
  {
    id: "cal_6",
    title: "Berlin Typography & Brutalism Deep-Dive",
    date: "2026-09-24",
    time: "10:00 CET",
    type: "blog",
    status: "draft",
    author: "Marcus Vance",
    category: "Culture",
    notes: "Cultural essay featuring interview with Kreuzberg typographers.",
  },
];
