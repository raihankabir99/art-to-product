import type {
  PageItem,
  NavItem,
  HeaderElement,
  AnnouncementBarConfig,
  FooterColumn,
  SocialLink,
  FooterNewsletterConfig,
  FooterSettings,
  GlobalSettings,
  CTAPreset,
} from "./pages-types";

export const INITIAL_PAGES: PageItem[] = [
  {
    id: "page_home",
    name: "Home",
    slug: "/",
    type: "SYSTEM",
    status: "Published",
    lastUpdated: "2026-08-26 14:30",
    author: "Elena Vance (Lead CMS)",
    publishDate: "2026-01-01",
    visibility: "Public",
    description:
      "Primary storefront index featuring hero art showcase, product drops, and brand manifesto.",
    template: "Landing Page",
    analytics: {
      totalViews: 48920,
      uniqueVisitors: 31200,
      avgTimeOnPage: "3m 12s",
      bounceRate: "24.1%",
      ctaClicks: 9480,
      conversionRate: "6.2%",
      viewsHistory: [
        { date: "Aug 20", views: 5400 },
        { date: "Aug 21", views: 6100 },
        { date: "Aug 22", views: 6800 },
        { date: "Aug 23", views: 7200 },
        { date: "Aug 24", views: 7900 },
        { date: "Aug 25", views: 8200 },
        { date: "Aug 26", views: 8920 },
      ],
    },
    seo: {
      seoTitle: "Studio Noir | Museum-Grade POD Apparel & Curated Artwork",
      metaDescription:
        "Discover heavyweight organic cotton apparel with museum-grade artwork prints. Sustainable print-on-demand crafted in Berlin & London.",
      canonicalUrl: "https://studionoir.fashion/",
      ogTitle: "Studio Noir | Fine Art Print-On-Demand Apparel",
      ogDescription: "Heavyweight organic garments paired with exclusive contemporary fine art.",
      ogImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 96,
    },
    blocks: [
      {
        id: "blk_hero_1",
        type: "heading",
        label: "Hero Statement",
        settings: {
          heading: "Art You Can Wear. Quality That Endures.",
          body: "Design-led print-on-demand fashion. Made to order with organic 400gsm fabrics and museum-grade pigment inks.",
          alignment: "center",
          width: "contained",
          typography: "display",
          buttonText: "Explore New Drops",
          buttonStyle: "gold",
        },
      },
      {
        id: "blk_pgrid_1",
        type: "productGrid",
        label: "Featured Drops Grid",
        settings: {
          heading: "Curated Autumn Releases",
          itemsCount: 4,
          columns: 4,
        },
      },
      {
        id: "blk_split_1",
        type: "editorialSplit",
        label: "Atelier Production Narrative",
        settings: {
          heading: "Zero-Waste Print-On-Demand Ethos",
          body: "We produce zero excess inventory. Every piece is printed on demand using GOTS-certified organic cotton and eco-friendly inks in London & Berlin.",
          imageUrl:
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
          buttonText: "Read Our Manifesto",
          buttonStyle: "gold",
        },
      },
      {
        id: "blk_news_1",
        type: "newsletter",
        label: "Nocturne Dispatch Signup",
        settings: {
          heading: "Join The Nocturne Dispatch",
          body: "Receive priority access to limited artwork drops, private lookbooks, and studio notes.",
          buttonText: "SUBSCRIBE",
        },
      },
    ],
    versions: [
      {
        id: "v_home_2",
        version: "v2.4",
        updatedAt: "2026-08-26 14:30",
        author: "Elena Vance",
        summary: "Updated Autumn drop imagery and high-contrast typography",
        blocksSnapshot: [],
      },
    ],
  },
  {
    id: "page_about",
    name: "About & Brand Story",
    slug: "/about",
    type: "CONTENT",
    status: "Published",
    lastUpdated: "2026-08-25 09:12",
    author: "Elena Vance",
    publishDate: "2026-02-14",
    visibility: "Public",
    description:
      "Our atelier narrative, organic fabric sourcing standards, and zero-waste POD ethos.",
    template: "Editorial",
    analytics: {
      totalViews: 18420,
      uniqueVisitors: 12150,
      avgTimeOnPage: "2m 45s",
      bounceRate: "28.4%",
      ctaClicks: 3240,
      conversionRate: "4.8%",
      viewsHistory: [
        { date: "Aug 20", views: 2100 },
        { date: "Aug 21", views: 2400 },
        { date: "Aug 22", views: 2600 },
        { date: "Aug 23", views: 2800 },
        { date: "Aug 24", views: 3100 },
        { date: "Aug 25", views: 3400 },
        { date: "Aug 26", views: 3720 },
      ],
    },
    seo: {
      seoTitle: "About Studio Noir | Our Sustainable Print Atelier Ethos",
      metaDescription:
        "Learn about Studio Noir's commitment to zero-waste print-on-demand production, 400gsm organic cotton, and museum-grade pigment inks.",
      canonicalUrl: "https://studionoir.fashion/about",
      ogTitle: "Inside Studio Noir | Atelier & Craftsmanship",
      ogDescription: "Sustainable luxury print-on-demand fashion designed for longevity.",
      ogImage:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 94,
    },
    blocks: [
      {
        id: "blk_ab_1",
        type: "heading",
        label: "Story Title",
        settings: {
          heading: "The Intersection of Fine Art & Heavyweight Textiles",
          body: "Founded in 2024, Studio Noir was built as an antidote to fast-fashion waste. We produce zero inventory until your order is placed.",
          alignment: "left",
          width: "contained",
          typography: "display",
        },
      },
      {
        id: "blk_ab_timeline",
        type: "timeline",
        label: "Atelier Milestones",
        settings: {
          heading: "Our Journey",
        },
      },
      {
        id: "blk_ab_2",
        type: "editorialSplit",
        label: "Atelier Split Section",
        settings: {
          heading: "Museum Inks & Organic Cotton",
          body: "Every piece uses 100% GOTS-certified combed cotton printed with non-toxic, water-based pigment inks engineered for 100+ washes without fading.",
          imageUrl:
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
          buttonText: "Explore Production Standards",
          buttonStyle: "gold",
        },
      },
      {
        id: "blk_ab_quote",
        type: "quote",
        label: "Manifesto Statement",
        settings: {
          heading:
            '"We do not make disposable clothing. We print archival art on heavy cotton designed to endure."',
          quoteAuthor: "Marcus Thorne",
          quoteRole: "Head of Textile Research",
        },
      },
    ],
    versions: [
      {
        id: "v_ab_3",
        version: "v3.1",
        updatedAt: "2026-08-25 09:12",
        author: "Elena Vance",
        summary: "Refined GOTS certification details and Berlin print facility photography",
        blocksSnapshot: [],
      },
    ],
  },
  {
    id: "page_faq",
    name: "FAQ & Support Center",
    slug: "/faq",
    type: "INFORMATION",
    status: "Published",
    lastUpdated: "2026-08-20 16:40",
    author: "Support Desk",
    publishDate: "2026-01-15",
    visibility: "Public",
    description:
      "Frequently asked questions regarding print production times, sizing, and international shipping.",
    template: "FAQ",
    analytics: {
      totalViews: 14200,
      uniqueVisitors: 9800,
      avgTimeOnPage: "3m 40s",
      bounceRate: "19.2%",
      ctaClicks: 2150,
      conversionRate: "5.1%",
      viewsHistory: [
        { date: "Aug 20", views: 1800 },
        { date: "Aug 21", views: 1950 },
        { date: "Aug 22", views: 2100 },
        { date: "Aug 23", views: 2300 },
        { date: "Aug 24", views: 2400 },
        { date: "Aug 25", views: 2500 },
        { date: "Aug 26", views: 2650 },
      ],
    },
    seo: {
      seoTitle: "Frequently Asked Questions & Customer Support | Studio Noir",
      metaDescription:
        "Find quick answers about our print-on-demand fulfillment times, sizing recommendations, wash care, and express global shipping.",
      canonicalUrl: "https://studionoir.fashion/faq",
      ogTitle: "Studio Noir FAQ | Order & Shipping Inquiries",
      ogDescription: "Comprehensive guide to sizing, print care, and order tracking.",
      ogImage:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 92,
    },
    blocks: [
      {
        id: "blk_faq_1",
        type: "heading",
        label: "FAQ Intro",
        settings: {
          heading: "Frequently Asked Questions",
          body: "Everything you need to know about our made-to-order production, fabric specs, and global delivery.",
          alignment: "center",
          width: "contained",
          typography: "sans",
        },
      },
      {
        id: "blk_faq_2",
        type: "faq",
        label: "FAQ Accordion Module",
        settings: {
          heading: "Fulfillment & Care Inquiries",
        },
      },
      {
        id: "blk_faq_cta",
        type: "cta",
        label: "Still Have Questions CTA",
        settings: {
          heading: "Need Further Concierge Assistance?",
          body: "Our client support team is available Monday through Friday 09:00–18:00 CET.",
          buttonText: "Contact Client Concierge",
          buttonStyle: "gold",
        },
      },
    ],
    versions: [
      {
        id: "v_faq_2",
        version: "v2.0",
        updatedAt: "2026-08-20 16:40",
        author: "Support Desk",
        summary: "Added expedited delivery region timeframes for Nordic countries",
        blocksSnapshot: [],
      },
    ],
  },
  {
    id: "page_shipping",
    name: "Shipping & Fulfillment",
    slug: "/shipping",
    type: "INFORMATION",
    status: "Published",
    lastUpdated: "2026-08-18 10:20",
    author: "Operations Team",
    publishDate: "2026-01-10",
    visibility: "Public",
    description:
      "Express shipping rates, regional fulfillment centers (UK, EU, US), and customs guidance.",
    template: "Information",
    analytics: {
      totalViews: 9800,
      uniqueVisitors: 7200,
      avgTimeOnPage: "2m 10s",
      bounceRate: "22.0%",
      ctaClicks: 1400,
      conversionRate: "4.2%",
      viewsHistory: [
        { date: "Aug 20", views: 1100 },
        { date: "Aug 21", views: 1300 },
        { date: "Aug 22", views: 1400 },
        { date: "Aug 23", views: 1450 },
        { date: "Aug 24", views: 1500 },
        { date: "Aug 25", views: 1520 },
        { date: "Aug 26", views: 1530 },
      ],
    },
    seo: {
      seoTitle: "Worldwide Express Shipping & Delivery Times | Studio Noir",
      metaDescription:
        "Complimentary express shipping on orders over €150. Printed locally in EU and UK to minimize carbon footprints.",
      canonicalUrl: "https://studionoir.fashion/shipping",
      ogTitle: "Studio Noir Shipping Rates & Global Production",
      ogDescription: "Localized fulfillment for zero customs delays and minimal carbon impact.",
      ogImage:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 90,
    },
    blocks: [
      {
        id: "blk_shp_1",
        type: "heading",
        label: "Shipping Header",
        settings: {
          heading: "Worldwide Express Delivery & Fulfillment",
          body: "Complimentary express courier shipping on all orders over €150. Printed locally to minimize transit times.",
          alignment: "left",
        },
      },
      {
        id: "blk_shp_timeline",
        type: "shippingTimeline",
        label: "Fulfillment Timeline",
        settings: {
          heading: "Order-to-Door Process",
        },
      },
    ],
    versions: [],
  },
  {
    id: "page_returns",
    name: "Returns & Guarantee",
    slug: "/returns",
    type: "INFORMATION",
    status: "Published",
    lastUpdated: "2026-08-15 11:00",
    author: "Operations Team",
    publishDate: "2026-01-10",
    visibility: "Public",
    description:
      "30-day hassle-free return policy, print quality guarantee, and return portal instructions.",
    template: "Information",
    seo: {
      seoTitle: "30-Day Returns & Quality Guarantee | Studio Noir",
      metaDescription:
        "We guarantee 100% satisfaction on all print-on-demand garments. Return or exchange within 30 days of delivery.",
      canonicalUrl: "https://studionoir.fashion/returns",
      ogTitle: "Studio Noir 30-Day Guarantee & Returns Portal",
      ogDescription: "Flawless print quality guarantee and simple eco-friendly returns.",
      ogImage:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 91,
    },
    blocks: [
      {
        id: "blk_ret_1",
        type: "heading",
        label: "Returns Intro",
        settings: {
          heading: "30-Day Guarantee & Easy Returns",
          body: "We stand behind the archival print quality and fabric durability of every piece.",
          alignment: "left",
        },
      },
    ],
    versions: [],
  },
  {
    id: "page_contact",
    name: "Contact & Concierge",
    slug: "/contact",
    type: "UTILITY",
    status: "Published",
    lastUpdated: "2026-08-12 15:30",
    author: "Support Desk",
    publishDate: "2026-01-05",
    visibility: "Public",
    description:
      "Connect with our client concierge for sizing advice, bespoke commission inquiries, or press packages.",
    template: "Contact",
    seo: {
      seoTitle: "Contact Studio Noir Concierge & Artist Submissions",
      metaDescription:
        "Get in touch with Studio Noir's client care team in Berlin. Artist portfolio submissions and press contact info.",
      canonicalUrl: "https://studionoir.fashion/contact",
      ogTitle: "Contact Studio Noir Concierge",
      ogDescription: "Dedicated support for orders, custom commissions, and artwork licensing.",
      ogImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 95,
    },
    blocks: [
      {
        id: "blk_cnt_1",
        type: "heading",
        label: "Contact Header",
        settings: {
          heading: "Client Concierge & Studio Inquiry",
          body: "Have questions about sizing, bespoke commissions, or an active order? Reach our dedicated Berlin concierge.",
          alignment: "center",
        },
      },
      {
        id: "blk_cnt_form",
        type: "contactForm",
        label: "Support Form Module",
        settings: {
          heading: "Send Us A Message",
        },
      },
    ],
    versions: [],
  },
  {
    id: "page_size_guide",
    name: "Size & Fit Guide",
    slug: "/size-guide",
    type: "INFORMATION",
    status: "Draft",
    lastUpdated: "2026-08-26 10:00",
    author: "Garment Tech",
    publishDate: "2026-09-01",
    visibility: "Public",
    description:
      "Detailed garment measurement tables, model dimensions, and boxy/oversized fit breakdowns.",
    template: "Size Guide",
    seo: {
      seoTitle: "Garment Fit & Sizing Tables | Heavyweight Cotton & Hoodies",
      metaDescription:
        "Comprehensive size chart for 240gsm tees and 400gsm double-lined hoodies. Includes chest width and shoulder drop metrics.",
      canonicalUrl: "https://studionoir.fashion/size-guide",
      ogTitle: "Studio Noir Precision Size & Fit Guide",
      ogDescription: "Find your perfect silhouette across tees, hoodies, and posters.",
      ogImage:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 89,
    },
    blocks: [
      {
        id: "blk_sg_1",
        type: "heading",
        label: "Size Intro",
        settings: {
          heading: "Precision Sizing & Garment Dimensions",
          body: "Our garments feature custom boxy silhouettes cut from heavy 240gsm cotton and 400gsm fleece.",
          alignment: "center",
        },
      },
      {
        id: "blk_sg_table",
        type: "sizeGuide",
        label: "Interactive Size Chart",
        settings: {
          heading: "Garment Size Specs",
        },
      },
    ],
    versions: [],
  },
  {
    id: "page_privacy",
    name: "Privacy Policy",
    slug: "/privacy",
    type: "LEGAL",
    status: "Published",
    lastUpdated: "2026-05-20 09:00",
    author: "Legal Counsel",
    publishDate: "2026-01-01",
    visibility: "Public",
    description:
      "GDPR, CCPA, and cookie compliance disclosure regarding customer order processing.",
    template: "Information",
    requiresLegalReview: true,
    reviewStatus: "Reviewed & Approved",
    seo: {
      seoTitle: "Privacy Policy & Data Security | Studio Noir",
      metaDescription:
        "Read Studio Noir's commitment to protecting your personal data, payment security, and GDPR compliance.",
      canonicalUrl: "https://studionoir.fashion/privacy",
      ogTitle: "Studio Noir Privacy Policy",
      ogDescription: "Transparent data protection and privacy standards.",
      ogImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 98,
    },
    blocks: [
      {
        id: "blk_prv_toc",
        type: "tableOfContents",
        label: "Legal Table of Contents",
        settings: {
          heading: "Privacy Policy Index",
        },
      },
      {
        id: "blk_prv_1",
        type: "text",
        label: "Legal Policy Copy",
        settings: {
          heading: "1. Data Collection & Usage",
          body: "Studio Noir collects essential transaction information solely to fulfill custom print-on-demand orders and route package tracking disclosures.",
        },
      },
    ],
    versions: [],
  },
  {
    id: "page_terms",
    name: "Terms & Conditions",
    slug: "/terms",
    type: "LEGAL",
    status: "Published",
    lastUpdated: "2026-05-20 09:15",
    author: "Legal Counsel",
    publishDate: "2026-01-01",
    visibility: "Public",
    description:
      "Storefront terms of service, intellectual property rights, and POD sale conditions.",
    template: "Information",
    requiresLegalReview: true,
    reviewStatus: "Reviewed & Approved",
    seo: {
      seoTitle: "Terms of Service & Sales Agreement | Studio Noir",
      metaDescription:
        "Official terms and conditions governing purchases, artwork copyright, and website usage at Studio Noir.",
      canonicalUrl: "https://studionoir.fashion/terms",
      ogTitle: "Studio Noir Terms & Conditions",
      ogDescription: "Terms of service and print-on-demand purchasing conditions.",
      ogImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 97,
    },
    blocks: [],
    versions: [],
  },
  {
    id: "page_autumn_drop",
    name: "Autumn Nocturne Campaign",
    slug: "/campaigns/autumn-nocturne",
    type: "CAMPAIGN",
    status: "Scheduled",
    scheduledPublishDate: "2026-09-01 00:00",
    lastUpdated: "2026-08-26 12:00",
    author: "Marcus Thorne",
    publishDate: "2026-09-01",
    visibility: "Public",
    description:
      "Limited campaign landing page highlighting 4 dark botanical artworks on heavyweight fleece.",
    template: "Campaign",
    seo: {
      seoTitle: "Autumn Nocturne Collection Launch | Studio Noir",
      metaDescription:
        "Exclusive preview of Autumn Nocturne fine art apparel drops. Limited 400gsm fleece run.",
      canonicalUrl: "https://studionoir.fashion/campaigns/autumn-nocturne",
      ogTitle: "Autumn Nocturne Campaign | Studio Noir",
      ogDescription: "Dark botanical art on 400gsm fleece.",
      ogImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      robotsIndex: true,
      robotsFollow: true,
      seoScore: 93,
    },
    blocks: [
      {
        id: "blk_anc_1",
        type: "heading",
        label: "Campaign Hero",
        settings: {
          heading: "Autumn Nocturne Collection Launch",
          body: "Four limited dark botanical artworks printed on 400gsm double-lined fleece.",
          alignment: "center",
          buttonText: "Join Priority Access List",
          buttonStyle: "gold",
        },
      },
      {
        id: "blk_anc_2",
        type: "productGrid",
        label: "Campaign Garment Showcase",
        settings: {
          heading: "Autumn Fleece Silhouettes",
          columns: 4,
          itemsCount: 4,
        },
      },
    ],
    versions: [],
  },
];

export const INITIAL_HEADER_NAV: NavItem[] = [
  {
    id: "nav_shop",
    label: "SHOP",
    url: "/shop",
    visible: true,
    isMegaMenu: true,
    megaMenu: {
      columns: [
        {
          id: "col_products",
          title: "SILHOUETTES",
          links: [
            {
              id: "m_tshirts",
              label: "Heavyweight T-Shirts (240gsm)",
              url: "/shop?category=t-shirts",
            },
            {
              id: "m_hoodies",
              label: "Double-Lined Hoodies (400gsm)",
              url: "/shop?category=hoodies",
            },
            {
              id: "m_sweatshirts",
              label: "Boxy Fit Sweatshirts",
              url: "/shop?category=sweatshirts",
            },
            { id: "m_totebags", label: "Organic Canvas Totes", url: "/shop?category=tote-bags" },
            { id: "m_mugs", label: "Ceramic Studio Mugs", url: "/shop?category=mugs" },
          ],
        },
        {
          id: "col_art",
          title: "FINE ART PRINTS",
          links: [
            { id: "m_posters", label: "Museum Giclée Posters", url: "/shop?category=posters" },
            { id: "m_framed", label: "Framed Archival Art", url: "/shop?category=framed-prints" },
            { id: "m_canvas", label: "Stretch Canvas Works", url: "/shop?category=canvas" },
          ],
        },
        {
          id: "col_featured",
          title: "CURATED DROPS",
          links: [
            { id: "m_newdrops", label: "⚡ New Drops", url: "/shop?filter=new", badge: "HOT" },
            { id: "m_bestsellers", label: "★ Best Sellers", url: "/shop?filter=popular" },
            { id: "m_collections", label: "Lookbook Collections", url: "/collections" },
          ],
        },
      ],
      featuredImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      featuredTitle: "Autumn Nocturne Drop",
      featuredSubtitle: "14 exclusive artworks on 400gsm heavyweight fleece",
      featuredCtaLabel: "Explore Drop",
      featuredCtaUrl: "/campaigns/autumn-nocturne",
    },
  },
  {
    id: "nav_designs",
    label: "DESIGNS",
    url: "/designs",
    visible: true,
  },
  {
    id: "nav_collections",
    label: "COLLECTIONS",
    url: "/collections",
    visible: true,
  },
  {
    id: "nav_new",
    label: "NEW DROPS",
    url: "/shop?filter=new",
    visible: true,
    badge: "NEW",
  },
  {
    id: "nav_bestsellers",
    label: "BEST SELLERS",
    url: "/shop?filter=popular",
    visible: true,
  },
  {
    id: "nav_journal",
    label: "JOURNAL",
    url: "/journal",
    visible: true,
  },
  {
    id: "nav_about",
    label: "ABOUT",
    url: "/about",
    visible: true,
  },
];

export const INITIAL_HEADER_ELEMENTS: HeaderElement[] = [
  { id: "elem_anno", type: "announcement", label: "Top Announcement Bar", visible: true, order: 1 },
  { id: "elem_logo", type: "logo", label: "Studio Logo / Brand Monogram", visible: true, order: 2 },
  { id: "elem_nav", type: "nav", label: "Desktop Main Navigation", visible: true, order: 3 },
  { id: "elem_search", type: "search", label: "Universal Search Bar", visible: true, order: 4 },
  {
    id: "elem_wishlist",
    type: "wishlist",
    label: "Wishlist Drawer Trigger",
    visible: true,
    order: 5,
  },
  { id: "elem_cart", type: "cart", label: "Cart Drawer Counter", visible: true, order: 6 },
  { id: "elem_account", type: "account", label: "Account Concierge", visible: true, order: 7 },
  { id: "elem_cta", type: "cta", label: "Quick Drop CTA Button", visible: false, order: 8 },
];

export const INITIAL_ANNOUNCEMENT_BAR: AnnouncementBarConfig = {
  enabled: true,
  text: "COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ALL ORDERS OVER €150 • 100% ORGANIC HEAVYWEIGHT COTTON",
  link: "/shipping",
  backgroundColor: "#0d0d0d",
  textColor: "#d4af37",
};

export const INITIAL_FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "foot_shop",
    title: "SHOP SILHOUETTES",
    visible: true,
    links: [
      { id: "fl_1", label: "Heavyweight T-Shirts", url: "/shop?category=t-shirts", visible: true },
      { id: "fl_2", label: "Double-Lined Hoodies", url: "/shop?category=hoodies", visible: true },
      { id: "fl_3", label: "Boxy Sweatshirts", url: "/shop?category=sweatshirts", visible: true },
      { id: "fl_4", label: "Museum Giclée Posters", url: "/shop?category=posters", visible: true },
      { id: "fl_5", label: "Organic Canvas Totes", url: "/shop?category=tote-bags", visible: true },
    ],
  },
  {
    id: "foot_explore",
    title: "EXPLORE STUDIO",
    visible: true,
    links: [
      { id: "fl_6", label: "Our Story & Atelier", url: "/about", visible: true },
      { id: "fl_7", label: "Artwork Catalog", url: "/designs", visible: true },
      { id: "fl_8", label: "Journal & Essays", url: "/journal", visible: true },
      { id: "fl_9", label: "Size & Fit Guide", url: "/size-guide", visible: true },
    ],
  },
  {
    id: "foot_help",
    title: "CLIENT CONCIERGE",
    visible: true,
    links: [
      { id: "fl_10", label: "Support & FAQ", url: "/faq", visible: true },
      { id: "fl_11", label: "Shipping & Fulfillment", url: "/shipping", visible: true },
      { id: "fl_12", label: "Returns & Exchanges", url: "/returns", visible: true },
      { id: "fl_13", label: "Contact Concierge", url: "/contact", visible: true },
    ],
  },
  {
    id: "foot_legal",
    title: "LEGAL & ASSURANCE",
    visible: true,
    links: [
      { id: "fl_14", label: "Privacy Policy", url: "/privacy", visible: true },
      { id: "fl_15", label: "Terms & Conditions", url: "/terms", visible: true },
      { id: "fl_16", label: "Cookie Settings", url: "/cookies", visible: true },
      { id: "fl_17", label: "30-Day Guarantee", url: "/returns", visible: true },
    ],
  },
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: "soc_ig",
    platform: "Instagram",
    url: "https://instagram.com/studionoir.official",
    handle: "@studionoir.official",
    visible: true,
    order: 1,
  },
  {
    id: "soc_tt",
    platform: "TikTok",
    url: "https://tiktok.com/@studionoir",
    handle: "@studionoir",
    visible: true,
    order: 2,
  },
  {
    id: "soc_pin",
    platform: "Pinterest",
    url: "https://pinterest.com/studionoir",
    handle: "studionoir",
    visible: true,
    order: 3,
  },
  {
    id: "soc_fb",
    platform: "Facebook",
    url: "https://facebook.com/studionoir.official",
    handle: "studionoir.official",
    visible: false,
    order: 4,
  },
  {
    id: "soc_yt",
    platform: "YouTube",
    url: "https://youtube.com/@studionoir",
    handle: "@studionoir",
    visible: true,
    order: 5,
  },
  {
    id: "soc_x",
    platform: "X",
    url: "https://x.com/studionoir",
    handle: "@studionoir",
    visible: false,
    order: 6,
  },
];

export const INITIAL_FOOTER_NEWSLETTER: FooterNewsletterConfig = {
  heading: "JOIN THE NOCTURNE DISPATCH",
  description:
    "Receive priority access to limited artwork drops, private lookbooks, and atelier studio notes.",
  placeholder: "Enter your email address...",
  buttonText: "SUBSCRIBE",
  successMessage: "Welcome to the Dispatch. A confirmation has been routed to your inbox.",
  privacyNotice: "We respect your inbox privacy. Unsubscribe anytime in one click.",
};

export const INITIAL_FOOTER_SETTINGS: FooterSettings = {
  brandTagline: "Fine Art Print-On-Demand Apparel & Archival Goods. Crafted in Berlin & London.",
  copyrightText: "© 2026 Studio Noir Inc. All Rights Reserved.",
  newsletterHeading: "JOIN THE NOCTURNE DISPATCH",
  newsletterSubtitle: "Receive priority access to limited artwork drops.",
  paymentBadges: ["Visa", "Mastercard", "American Express", "Apple Pay", "Klarna", "PayPal"],
};

export const INITIAL_GLOBAL_SETTINGS: GlobalSettings = {
  brandName: "Studio Noir",
  tagline: "Fine Art Print-On-Demand Apparel & Archival Goods",
  supportEmail: "concierge@studionoir.fashion",
  contactEmail: "press@studionoir.fashion",
  supportText: "Client Concierge available Monday–Friday 09:00–18:00 CET",
  copyrightText:
    "© 2026 Studio Noir Inc. All Rights Reserved. Crafted with museum-grade care in Berlin & London.",
  defaultCurrency: "EUR (€)",
  defaultLanguage: "English (US)",
  timezone: "UTC+01:00 (Europe/Berlin)",
};

export const INITIAL_CTA_PRESETS: CTAPreset[] = [
  { id: "cta_1", name: "Primary Shop CTA", text: "Shop Collection", url: "/shop", style: "gold" },
  {
    id: "cta_2",
    name: "Explore Artwork CTA",
    text: "Explore Designs",
    url: "/designs",
    style: "outline",
  },
  {
    id: "cta_3",
    name: "New Drops CTA",
    text: "Discover New Drops",
    url: "/shop?filter=new",
    style: "gold",
  },
  {
    id: "cta_4",
    name: "Journal CTA",
    text: "Read Story in Journal",
    url: "/journal",
    style: "ghost",
  },
  {
    id: "cta_5",
    name: "Contact Support CTA",
    text: "Contact Client Concierge",
    url: "/contact",
    style: "dark",
  },
  {
    id: "cta_6",
    name: "Size Guide CTA",
    text: "View Size & Fit Guide",
    url: "/size-guide",
    style: "outline",
  },
];
