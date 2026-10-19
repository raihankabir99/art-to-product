import artLion from "@/assets/art-midnight-lion.png";
import artNordic from "@/assets/art-nordic-silence.png";
import artSolstice from "@/assets/art-solstice.png";
import artOlive from "@/assets/art-olive.png";
import artDune from "@/assets/art-dune.png";
import artCrane from "@/assets/art-crane.png";

export type BlogCategory =
  | "All"
  | "Fashion"
  | "Design"
  | "Lifestyle"
  | "Gift Guide"
  | "Product Guide"
  | "Culture"
  | "Care Guide"
  | "Brand Stories";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "All",
  "Fashion",
  "Design",
  "Lifestyle",
  "Gift Guide",
  "Product Guide",
  "Culture",
  "Care Guide",
  "Brand Stories",
];

export interface ArticleContentSection {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  callout?: {
    title: string;
    text: string;
  };
}

export interface ArticleDetail {
  slug: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  excerpt: string;
  heroImage: string;
  heroCaption?: string;
  pullQuote?: {
    quote: string;
    author: string;
    role?: string;
  };
  sections: ArticleContentSection[];
  relatedDesignSlug?: string;
  relatedProductTypes?: string[];
  tags: string[];
  isFeatured?: boolean;
  trendingRank?: number;
}

export interface GiftGuideItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  linkText: string;
  category: string;
  targetLink: string;
  badge?: string;
  itemsCount: string;
}

export interface ProductGuideItem {
  slug: string;
  title: string;
  category: "Product Guide" | "Care Guide";
  readTime: string;
  description: string;
  image: string;
  keyTakeaway: string;
  comparisonHighlights?: { label: string; value: string }[];
  targetSlug: string;
}

export const ARTICLES_DATA: ArticleDetail[] = [
  {
    slug: "the-art-of-wearing-what-you-believe",
    title: "The Art of Wearing What You Believe",
    subtitle:
      "How visual design becomes an intimate part of modern personal identity and conscious living.",
    category: "Design",
    readTime: "6 min read",
    date: "August 2026",
    publishedAt: "18 Aug 2026",
    author: {
      name: "Julian Mercier",
      role: "Studio Director & Curator",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    },
    excerpt:
      "Explore how minimalist visual design, tactile materials, and made-to-order discipline redefine fashion as personal expression.",
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
    heroCaption: "Atelier Noir Studio 2026 — Monochromatic garment drape and purposeful line art.",
    pullQuote: {
      quote:
        "What we choose to wear on our chests is not decoration; it is a quiet declaration of the aesthetic principles we inhabit.",
      author: "Julian Mercier",
      role: "Atelier Noir Design Philosophy",
    },
    isFeatured: true,
    trendingRank: 1,
    tags: ["Philosophy", "Graphic Arts", "Identity", "Minimalism"],
    relatedDesignSlug: "midnight-lion",
    relatedProductTypes: ["tshirt", "hoodie", "cap", "tote"],
    sections: [
      {
        heading: "The inversion of fast fashion",
        paragraphs: [
          "For decades, the commercial garment industry operated on an exhausting formula: produce tens of thousands of garments first, flood retail racks, and convince people they need an artificial wardrobe update every four weeks.",
          "At Atelier Noir, our thesis began with an inversion. What happens when the art comes first, and the object is only manifested the moment someone invites it into their life? The result is not just zero unsold inventory — it is an entirely different emotional relationship between the wearer and the object.",
        ],
        callout: {
          title: "Studio Principle",
          text: "Every graphic begins as a standalone piece of gallery art before it ever touches cotton, paper, or stoneware.",
        },
      },
      {
        heading: "The language of restrained lines",
        paragraphs: [
          "A graphic should never shout. In a hyper-stimulating visual culture, loud branding and oversized logos create cognitive noise. True luxury speaks in a whisper: single continuous vectors, balanced negative space, and tonal contrasts that only reveal themselves upon closer inspection.",
          "When you pull on a 240gsm organic cotton tee with a single considered ink stroke, you are not wearing an advertisement. You are wearing a visual poem.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
          alt: "Minimalist fashion shoot with monochrome tones and high contrast",
          caption:
            "Precision in proportion: Dropped shoulders paired with museum-grade screen prints.",
        },
      },
      {
        heading: "Tactility and longevity",
        paragraphs: [
          "Visual design fails if the tactile carrier degrades after three wash cycles. We spent eighteen months testing garment-dyed ring-spun cotton weaves in Portugal and Northern Italy to achieve a hand-feel that softens with age without losing its structural collar and boxy silhouette.",
        ],
        bulletPoints: [
          "Garment-dyed 240gsm combed organic cotton with zero microplastics.",
          "Water-based Japanese archival inks with breathable surface penetration.",
          "Single-unit batch proofing guaranteeing precise millimeter registration.",
        ],
      },
    ],
  },
  {
    slug: "the-story-behind-midnight-lion",
    title: "The Story Behind Midnight Lion",
    subtitle: "From a single unbroken ink line to our signature international motif.",
    category: "Brand Stories",
    readTime: "5 min read",
    date: "12 Aug 2026",
    publishedAt: "12 Aug 2026",
    author: {
      name: "Elena Vance",
      role: "Lead Illustrator",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    },
    excerpt:
      "How a late-night sketch inspired by Japanese woodcuts and brutalist architecture evolved into our most iconic signature design.",
    heroImage: "/images/blog-design.png",
    heroCaption: "Original vector sketch of Midnight Lion on matte Japanese drafting paper.",
    pullQuote: {
      quote:
        "Strength does not need aggression. The quietest posture in the room is often the most formidable.",
      author: "Elena Vance",
      role: "Lead Illustrator",
    },
    trendingRank: 2,
    tags: ["Design Story", "Illustration", "Nocturne", "Craft"],
    relatedDesignSlug: "midnight-lion",
    relatedProductTypes: ["tshirt", "hoodie", "poster", "cap"],
    sections: [
      {
        heading: "Origins in Tokyo",
        paragraphs: [
          "Midnight Lion was born on a rainy midnight in a small studio in Shibuya. The goal was deceptive in its simplicity: capture the supreme quiet dignity of an apex predator using only one unbroken geometric path.",
          "Over forty iterations were drafted and discarded. If the brush lifted even once, the tension of the form collapsed.",
        ],
      },
      {
        heading: "Adapting across three dimensions",
        paragraphs: [
          "Because Atelier Noir operates on an all-object architecture, the drawing had to read identically on a 400gsm brushed fleece hoodie, a 30×40cm giclée art print, and a 350ml glazed stoneware mug.",
        ],
        callout: {
          title: "Scale Optimization",
          text: "The vector stroke width dynamically adjusts for substrate absorption, ensuring lines stay crisp on loopback cotton and razor-sharp on museum paper.",
        },
      },
    ],
  },
  {
    slug: "how-to-build-a-minimal-everyday-wardrobe",
    title: "How to Build a Minimal Everyday Wardrobe",
    subtitle:
      "A practical editorial guide to high-density textiles, modular neutrals, and effortless daily dressing.",
    category: "Fashion",
    readTime: "5 min read",
    date: "August 2026",
    publishedAt: "10 Aug 2026",
    author: {
      name: "Soren Lindqvist",
      role: "Wardrobe Stylist & Editor",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    },
    excerpt:
      "Curate a versatile, seasonless capsule of heavyweight tees, architectural hoodies, and clean accessories built to outlive trends.",
    heroImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    heroCaption: "Tonal dressing: Bone, Slate, and Pitch Black layered with natural wool.",
    pullQuote: {
      quote:
        "Minimalism isn't about having less for the sake of deprivation. It's about having only pieces that hold undeniable integrity.",
      author: "Soren Lindqvist",
    },
    trendingRank: 3,
    tags: ["Wardrobe", "Capsule", "Apparel", "Styling"],
    relatedDesignSlug: "nordic-silence",
    relatedProductTypes: ["tshirt", "sweatshirt", "tote", "cushion"],
    sections: [
      {
        heading: "The 7-piece foundational matrix",
        paragraphs: [
          "Building a modular wardrobe starts with fabric weight rather than brand names. When your foundational tee weighs 240gsm, it doesn't cling or drape awkwardly — it holds an intentional silhouette that frames your shoulders.",
          "Pair two boxy tees in Bone and Pitch Black, a heavyweight loopback crewneck in Ash, a double-lined hoodie in Moss, and structured wide-leg trousers. Every combination works without morning decision fatigue.",
        ],
      },
    ],
  },
  {
    slug: "5-ways-to-style-an-oversized-hoodie",
    title: "5 Ways to Style an Oversized Hoodie",
    subtitle:
      "From tailored wool overcoats to elevated streetwear proportions: master the heavyweight fleece.",
    category: "Fashion",
    readTime: "4 min read",
    date: "July 2026",
    publishedAt: "24 Jul 2026",
    author: {
      name: "Marcus Vance",
      role: "Creative Director",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    },
    excerpt:
      "How to balance volume, texture, and architectural silhouettes with our 400gsm double-lined fleece hoodie.",
    heroImage: "/images/blog-style.png",
    heroCaption: "Oversized hoodie styled with structured Italian wool overcoat.",
    pullQuote: {
      quote:
        "The magic of an oversized hoodie is proportional tension: soft luxury fleece set against sharp tailored outerwear.",
      author: "Marcus Vance",
    },
    trendingRank: 4,
    tags: ["Streetwear", "Styling", "Hoodie", "Outerwear"],
    relatedDesignSlug: "solstice",
    relatedProductTypes: ["hoodie", "tshirt", "cap", "tote"],
    sections: [
      {
        heading: "1. The Tailored Contrast",
        paragraphs: [
          "Layer your 400gsm black hoodie under a structured camel or charcoal wool overcoat. Keep the hood sitting cleanly over the collar for a refined architectural profile.",
        ],
      },
      {
        heading: "2. The Monochrome Monolith",
        paragraphs: [
          "Pair a Pitch Black hoodie with relaxed black selvedge denim and matte leather boots. Add a graphic tote bag with gold-tone artwork to break the silhouette subtly.",
        ],
      },
    ],
  },
  {
    slug: "choosing-the-right-t-shirt-fit",
    title: "Choosing the Right T-Shirt Fit",
    subtitle:
      "Boxy, relaxed, or structured regular: a definitive guide to fabric weights, collars, and body drape.",
    category: "Product Guide",
    readTime: "4 min read",
    date: "July 2026",
    publishedAt: "19 Jul 2026",
    author: {
      name: "Studio Atelier Noir",
      role: "Garment Engineering Team",
    },
    excerpt:
      "Everything you need to know about dropped shoulders, rib collars, 240gsm organic jersey, and chest measurements.",
    heroImage: "/images/blog-guide.png",
    heroCaption: "Comparison of collar bindings and drape weights across sizes S to XXL.",
    pullQuote: {
      quote:
        "A t-shirt should never feel flimsy. A 240gsm jersey creates an architectural drape that flatters all body structures.",
      author: "Technical Design Team",
    },
    trendingRank: 5,
    tags: ["Fit Guide", "T-Shirt", "Sizing", "Cotton"],
    relatedDesignSlug: "olive-line",
    relatedProductTypes: ["tshirt", "sweatshirt", "poster"],
    sections: [
      {
        heading: "Understanding fabric weights (GSM)",
        paragraphs: [
          "GSM stands for Grams per Square Meter. Standard commercial tees range between 140–160gsm, which tends to drape sheer and warp in the dryer.",
          "Our 240gsm organic cotton jersey provides structure: it drops cleanly without clinging, maintains its neckband tension, and stands up to daily wear for years.",
        ],
      },
    ],
  },
  {
    slug: "how-to-care-for-printed-apparel",
    title: "How to Care for Printed Apparel",
    subtitle:
      "Protect your garment-dyed cotton and water-based ink artworks with simple museum-grade laundry habits.",
    category: "Care Guide",
    readTime: "3 min read",
    date: "July 2026",
    publishedAt: "08 Jul 2026",
    author: {
      name: "Klara Lind",
      role: "Sustainability & Textile Specialist",
    },
    excerpt:
      "Wash cold, inside out, and air dry flat. Maximize the lifespan of your organic cotton and archival screen prints.",
    heroImage:
      "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=1200&q=80",
    heroCaption:
      "Air drying on cedar racks preserves garment dye richness and organic fiber tensile strength.",
    pullQuote: {
      quote:
        "Caring for quality clothes is the most radical form of sustainability. A great shirt should last a decade, not a season.",
      author: "Klara Lind",
    },
    tags: ["Care Guide", "Longevity", "Eco", "Washing"],
    relatedDesignSlug: "dune-crescent",
    relatedProductTypes: ["tshirt", "hoodie", "tote"],
    sections: [
      {
        heading: "The Three Golden Rules of Textile Longevity",
        paragraphs: [
          "Printed apparel doesn't need complicated dry cleaning. In fact, gentle domestic laundering is far better for both natural cotton fibers and water-based inks.",
        ],
        bulletPoints: [
          "1. Always turn garments inside out before placing them in the machine.",
          "2. Wash in cold water (30°C / 86°F or below) with eco-friendly liquid detergent.",
          "3. Skip the tumble dryer — hang or lay flat to air dry naturally.",
          "4. Never iron directly over the graphic print; iron on reverse if desired.",
        ],
      },
    ],
  },
  {
    slug: "minimal-design-in-modern-fashion",
    title: "Minimal Design in Modern Fashion",
    subtitle:
      "Why European and Scandinavian aesthetics continue to dominate high-end contemporary culture.",
    category: "Culture",
    readTime: "6 min read",
    date: "June 2026",
    publishedAt: "28 Jun 2026",
    author: {
      name: "Julian Mercier",
      role: "Studio Director",
    },
    excerpt:
      "An exploration of negative space, brutalist geometry, and understated elegance in Berlin, Copenhagen, and Paris.",
    heroImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    heroCaption: "Architecture meets fashion: clean geometric lines in urban spaces.",
    pullQuote: {
      quote: "Minimalism is not the absence of energy; it is the absolute concentration of intent.",
      author: "Julian Mercier",
    },
    tags: ["Culture", "Europe", "Minimalism", "Aesthetics"],
    relatedDesignSlug: "nordic-silence",
    relatedProductTypes: ["tshirt", "hoodie", "poster", "notebook"],
    sections: [
      {
        heading: "The European reductionist movement",
        paragraphs: [
          "From the functionalism of the Bauhaus to modern Danish furniture design, the most enduring European movements remove everything extraneous until only the essential essence remains.",
          "When translated to modern streetwear and lifestyle items, this creates pieces that feel timeless rather than disposable.",
        ],
      },
    ],
  },
  {
    slug: "the-story-behind-graphic-t-shirts",
    title: "The Story Behind Graphic T-Shirts",
    subtitle: "From protest medium to fine art canvas: a cultural timeline of graphic apparel.",
    category: "Culture",
    readTime: "7 min read",
    date: "June 2026",
    publishedAt: "14 Jun 2026",
    author: {
      name: "Marcus Vance",
      role: "Creative Director",
    },
    excerpt:
      "Trace how the humble cotton undershirt transformed into the most powerful personal gallery in modern society.",
    heroImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    heroCaption: "The graphic tee as a billboard of human ideology and creative subcultures.",
    pullQuote: {
      quote:
        "No other garment has bridged counterculture, fine art, and daily life as seamlessly as the printed graphic t-shirt.",
      author: "Marcus Vance",
    },
    tags: ["History", "Culture", "Graphic Art", "T-Shirt"],
    relatedDesignSlug: "paper-crane",
    relatedProductTypes: ["tshirt", "poster", "sticker"],
    sections: [
      {
        heading: "From military undergarment to cultural statement",
        paragraphs: [
          "Originally issued to US Navy sailors as a lightweight moisture-wicking layer, the t-shirt became a symbol of rebellion in the 1950s with Marlon Brando and James Dean.",
          "By the 1970s and 80s, artists like Keith Haring and Vivienne Westwood realized the human torso was the most democratized gallery space on earth.",
        ],
      },
    ],
  },
  {
    slug: "t-shirt-vs-sweatshirt-guide",
    title: "T-Shirt vs Sweatshirt: Which One Is Right For You?",
    subtitle: "Layering dynamics, climate adaptation, and lifestyle pairings for year-round ease.",
    category: "Product Guide",
    readTime: "4 min read",
    date: "June 2026",
    publishedAt: "02 Jun 2026",
    author: {
      name: "Studio Atelier Noir",
      role: "Product Team",
    },
    excerpt:
      "Compare 240gsm jersey against 340gsm loopback fleece to find your ideal balance of breathability and insulation.",
    heroImage:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
    heroCaption: "Comparison of 240gsm cotton tee under 340gsm loopback crewneck.",
    tags: ["Comparison", "Guide", "T-Shirt", "Sweatshirt"],
    relatedDesignSlug: "solstice",
    relatedProductTypes: ["tshirt", "sweatshirt", "hoodie"],
    sections: [
      {
        heading: "Weight, Structure, and Layering",
        paragraphs: [
          "While both are wardrobe cornerstones, their functional roles differ significantly. Our T-Shirts are engineered with a boxy structured drape that stands alone in summer and sits flush under overshirts in autumn.",
          "Our 340gsm loopback crewneck sweatshirt brings warmth without synthetic fleece fuzz, creating a breathable thermal barrier suitable for air-conditioned studios and cool European evenings.",
        ],
      },
    ],
  },
];

export const GIFT_GUIDES: GiftGuideItem[] = [
  {
    id: "for-him",
    title: "For Him",
    subtitle: "Understated, structured essentials",
    description:
      "Heavyweight hoodies, boxy graphic tees, and low-profile brushed twill caps designed for effortless everyday wear.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore Gifts For Him",
    category: "Apparel & Accessories",
    targetLink: "/shop/hoodies",
    badge: "Top Pick",
    itemsCount: "18 Curated Items",
  },
  {
    id: "for-her",
    title: "For Her",
    subtitle: "Sculptural silhouettes & art objects",
    description:
      "Relaxed dropped-shoulder tees, stoneware mugs, organic cotton totes, and gallery-grade art prints for refined spaces.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore Gifts For Her",
    category: "Fashion & Home",
    targetLink: "/shop/t-shirts",
    itemsCount: "22 Curated Items",
  },
  {
    id: "for-friends",
    title: "For Friends",
    subtitle: "Thoughtful, versatile treasures",
    description:
      "Stoneware coffee mugs, hardcover notebooks, weatherproof vinyl stickers, and everyday canvas bags made to last.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore Gifts For Friends",
    category: "Accessories & Lifestyle",
    targetLink: "/shop/mugs",
    badge: "Gift Friendly",
    itemsCount: "14 Curated Items",
  },
  {
    id: "for-design-lovers",
    title: "For Design Lovers",
    subtitle: "Archival giclée & typography",
    description:
      "Museum-grade 200gsm uncoated art posters and collector edition objects showcasing single-line vector mastery.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore Design Gifts",
    category: "Print & Decor",
    targetLink: "/shop/posters",
    badge: "Curator's Choice",
    itemsCount: "16 Curated Items",
  },
  {
    id: "for-minimalists",
    title: "For Minimalists",
    subtitle: "Zero clutter, pure materiality",
    description:
      "Clean monochrome colorways, bone and matte black palettes, and restrained visual marks without excess.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore Minimalist Gifts",
    category: "Capsule Edits",
    targetLink: "/collections/minimal-monochrome",
    itemsCount: "12 Curated Items",
  },
  {
    id: "for-creatives",
    title: "For Creatives",
    subtitle: "Tools for daily ideation",
    description:
      "Lay-flat dotted notebooks, shock-absorbing device cases, and inspirational statement pieces for the studio.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore Creative Gifts",
    category: "Studio & Stationery",
    targetLink: "/shop/notebooks",
    itemsCount: "15 Curated Items",
  },
];

export const PRODUCT_GUIDES_DATA: ProductGuideItem[] = [
  {
    slug: "t-shirt-vs-sweatshirt-guide",
    title: "T-Shirt vs Sweatshirt: Which One Is Right For You?",
    category: "Product Guide",
    readTime: "4 min read",
    description:
      "A side-by-side material comparison between 240gsm jersey and 340gsm loopback cotton for trans-seasonal layering.",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    keyTakeaway:
      "Choose T-Shirts for warm/indoor versatility; pick Sweatshirts for crisp outdoor breathability.",
    comparisonHighlights: [
      { label: "Fabric Density", value: "240gsm vs 340gsm" },
      { label: "Collar Type", value: "Ribbed Crewneck vs V-Insert" },
      { label: "Best Climate", value: "18°C+ vs 8°C–18°C" },
    ],
    targetSlug: "t-shirt-vs-sweatshirt-guide",
  },
  {
    slug: "choose-the-right-hoodie-fit",
    title: "How To Choose Your Hoodie Size & Drape",
    category: "Product Guide",
    readTime: "4 min read",
    description:
      "True-to-size for tailored clean lines, or size-up for a dropped-shoulder streetwear aesthetic with 400gsm fleece.",
    image: "/images/blog-guide.png",
    keyTakeaway:
      "Our hoodies feature a boxy cut. Size up 1 size only if you desire an oversized hip drape.",
    comparisonHighlights: [
      { label: "Hood Construction", value: "Double-Lined (No drawstrings)" },
      { label: "Fleece Weight", value: "400gsm Heavyweight Brushed" },
      { label: "Shrinkage Rate", value: "Pre-shrunk (<1.5% post wash)" },
    ],
    targetSlug: "choose-the-right-hoodie-fit",
  },
  {
    slug: "choosing-the-right-t-shirt-fit",
    title: "Understanding T-Shirt Fits: Boxy vs Regular",
    category: "Product Guide",
    readTime: "4 min read",
    description:
      "Explore the structural differences in armhole depth, sleeve length, and torso drape across our standard silhouettes.",
    image: "/images/blog-style.png",
    keyTakeaway: "Garment-dyed cotton retains its boxy form without clinging to the body.",
    comparisonHighlights: [
      { label: "Neckband", value: "High-density 1x1 ribbed collar" },
      { label: "Shoulder Seam", value: "Reinforced 2cm dropped seam" },
      { label: "Certification", value: "GOTS & OEKO-TEX Standard 100" },
    ],
    targetSlug: "choosing-the-right-t-shirt-fit",
  },
  {
    slug: "how-to-care-for-printed-apparel",
    title: "How To Care For Your Printed Products",
    category: "Care Guide",
    readTime: "3 min read",
    description:
      "Simple, sustainable washing tips to preserve screen ink richness and prevent fabric pilling over dozens of cycles.",
    image:
      "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=800&q=80",
    keyTakeaway: "Wash inside-out with cold water at 30°C. Never tumble dry.",
    comparisonHighlights: [
      { label: "Water Temp", value: "30°C / Cold" },
      { label: "Drying Method", value: "Air Dry Flat / Line" },
      { label: "Ironing", value: "Reverse side only" },
    ],
    targetSlug: "how-to-care-for-printed-apparel",
  },
];

export const DESIGN_STORIES_DATA = [
  {
    slug: "the-story-behind-midnight-lion",
    designSlug: "midnight-lion",
    title: "Midnight Lion",
    subtitle: "The Signature Continuous Vector",
    category: "Design Story",
    readTime: "5 min read",
    story:
      "Inspired by Edo-period calligraphy and Bauhaus geometric restraint, Midnight Lion balances predatory strength with absolute serene quietness.",
    inspiration:
      "Single continuous brushstroke, nocturnal feline stillness, and brutalist architecture.",
    image: "/images/blog-design.png",
    art: artLion,
    productTypes: ["tshirt", "hoodie", "cap", "poster"],
  },
  {
    slug: "minimal-design-in-modern-fashion",
    designSlug: "nordic-silence",
    title: "Nordic Silence",
    subtitle: "The Poetics of Arctic Negative Space",
    category: "Design Story",
    readTime: "6 min read",
    story:
      "Capturing the serene, unbroken white horizons of northern Scandinavia through subtle balance and restrained typographic coordinates.",
    inspiration: "Scandinavian winter light, architectural minimalism, and arctic fjords.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    art: artNordic,
    productTypes: ["tshirt", "sweatshirt", "notebook", "cushion"],
  },
];

// Additional legacy articles for backwards compatibility
export const SUPPLEMENTARY_ARTICLES: ArticleDetail[] = [
  {
    slug: "one-design-many-objects",
    title: "One Design, Many Objects",
    subtitle:
      "Why we build around the drawing instead of the garment, and what that changes for the people who wear it.",
    category: "Brand Stories",
    readTime: "6 min read",
    date: "August 2026",
    publishedAt: "12 Aug 2026",
    author: {
      name: "Julian Mercier",
      role: "Studio Director",
    },
    excerpt:
      "Why we build around the artwork instead of the blank, and what that changes for modern intentional wardrobe curations.",
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    heroCaption: "Artwork proofing across heavy cotton, stoneware and fine art paper.",
    pullQuote: {
      quote:
        "Most stores ask you to pick a garment and hope a graphic fits it. We invert that: choose the image you want to live with.",
      author: "Julian Mercier",
    },
    tags: ["Philosophy", "Architecture", "Design"],
    relatedDesignSlug: "midnight-lion",
    relatedProductTypes: ["tshirt", "hoodie", "poster", "mug"],
    sections: [
      {
        heading: "Why the object comes second",
        paragraphs: [
          "Most stores ask you to pick a garment and hope a graphic fits it. We invert that: choose the image you want to live with, then decide how it should exist in your day.",
          "Each placement is proofed by hand for the surface it prints on. Colourways are chosen for contrast, not novelty. Nothing is produced before it is ordered.",
        ],
        bulletPoints: [
          "Each placement is proofed by hand for the surface it prints on.",
          "Colourways are chosen for contrast, not novelty.",
          "Nothing is produced before it is ordered.",
        ],
      },
      {
        heading: "What that changes",
        paragraphs: [
          "No dead stock and no end-of-season landfill. The trade is patience: two to four days of meticulous production before dispatch.",
        ],
      },
    ],
  },
  {
    slug: "print-on-demand-without-the-waste",
    title: "Print on Demand, Without the Waste",
    subtitle:
      "Nothing is made until it is ordered. A short account of what that means for inventory, water and returns.",
    category: "Care Guide",
    readTime: "4 min read",
    date: "July 2026",
    publishedAt: "28 Jul 2026",
    author: {
      name: "Klara Lind",
      role: "Sustainability & Textile Specialist",
    },
    excerpt:
      "Nothing is made until it is ordered. A short account of what that means for inventory, water and returns.",
    heroImage:
      "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=1200&q=80",
    heroCaption: "On-demand direct printing uses 95% less water than traditional bulk vat dyeing.",
    pullQuote: {
      quote:
        "The cleanest garment is the one that was never overproduced to sit in an outlet warehouse.",
      author: "Klara Lind",
    },
    tags: ["Sustainability", "Eco", "Zero-Waste"],
    relatedDesignSlug: "olive-line",
    relatedProductTypes: ["tshirt", "tote", "notebook"],
    sections: [
      {
        heading: "Zero Deadstock Reality",
        paragraphs: [
          "Traditional apparel brands forecast sales 9 months in advance, routinely discarding or incinerating up to 30% of unsold stock. Print-on-demand eliminates deadstock entirely by producing exactly one piece when requested.",
        ],
      },
    ],
  },
  {
    slug: "the-case-for-heavyweight-cotton",
    title: "The Case for Heavyweight Cotton",
    subtitle: "240gsm, garment-dyed, and why a tee should hold its shape after fifty washes.",
    category: "Product Guide",
    readTime: "5 min read",
    date: "July 2026",
    publishedAt: "09 Jul 2026",
    author: {
      name: "Studio Atelier Noir",
      role: "Garment Engineering",
    },
    excerpt: "240gsm, garment-dyed, and why a tee should hold its shape after fifty washes.",
    heroImage: "/images/blog-guide.png",
    pullQuote: {
      quote:
        "Heavyweight jersey isn't about stiffness — it's about structural composure and longevity.",
      author: "Materials Team",
    },
    tags: ["Materials", "Cotton", "Quality"],
    relatedDesignSlug: "solstice",
    relatedProductTypes: ["tshirt", "sweatshirt"],
    sections: [
      {
        heading: "Why density matters",
        paragraphs: [
          "Lightweight cottons warp along the side seams after few domestic dryer cycles. Heavyweight 240gsm ring-spun cotton uses long-staple organic fibers that resist torque, maintaining a structured, dropped shoulder fit.",
        ],
      },
    ],
  },
  {
    slug: "style-minimal-graphic-tee",
    title: "How to Style a Minimal Graphic T-Shirt",
    subtitle:
      "Three quiet ways to build an outfit around a single considered graphic — without shouting.",
    category: "Fashion",
    readTime: "4 min read",
    date: "July 2026",
    publishedAt: "14 Jul 2026",
    author: {
      name: "Soren Lindqvist",
      role: "Wardrobe Stylist",
    },
    excerpt:
      "Three quiet ways to build an outfit around a single considered graphic — without shouting.",
    heroImage: "/images/blog-style.png",
    tags: ["Styling", "Fashion", "T-Shirt"],
    relatedDesignSlug: "midnight-lion",
    relatedProductTypes: ["tshirt", "cap", "tote"],
    sections: [
      {
        heading: "The Quiet Statement",
        paragraphs: [
          "A graphic tee shouldn't compete with the rest of your clothing. Pair it with structured pleated trousers, an unlined blazer, and minimal leather trainers for an effortless studio look.",
        ],
      },
    ],
  },
];

export const ALL_ARTICLES: ArticleDetail[] = [...ARTICLES_DATA, ...SUPPLEMENTARY_ARTICLES];

export function getArticleBySlug(slug: string): ArticleDetail | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug) ?? ALL_ARTICLES[0];
}

export function getFeaturedArticle(): ArticleDetail {
  return ALL_ARTICLES.find((a) => a.isFeatured) ?? ALL_ARTICLES[0]!;
}

export function getTrendingArticles(): ArticleDetail[] {
  return ALL_ARTICLES.filter((a) => a.trendingRank !== undefined)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
    .slice(0, 5);
}

export function getRelatedArticles(currentSlug: string, count = 3): ArticleDetail[] {
  return ALL_ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, count);
}

export function getArticlesByCategory(category: BlogCategory): ArticleDetail[] {
  if (category === "All") return ALL_ARTICLES;
  return ALL_ARTICLES.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}
