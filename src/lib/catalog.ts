import artLion from "@/assets/art-midnight-lion.png";
import artSolstice from "@/assets/art-solstice.png";
import artNordic from "@/assets/art-nordic-silence.png";
import artOlive from "@/assets/art-olive.png";
import artDune from "@/assets/art-dune.png";
import artCrane from "@/assets/art-crane.png";

/**
 * Mock catalog for the design-led POD architecture:
 * DESIGN -> PRODUCT OPTIONS -> VARIANT -> MOCKUP -> CART
 */

export type ProductTypeId =
  | "tshirt"
  | "hoodie"
  | "sweatshirt"
  | "tote"
  | "mug"
  | "phonecase"
  | "cap"
  | "poster"
  | "sticker"
  | "notebook"
  | "cushion"
  | "kids-tee"
  | "onesie";

export type Surface = "apparel" | "hard" | "paper";

export interface ProductType {
  id: ProductTypeId;
  name: string;
  category: "Apparel" | "Accessories" | "Home" | "Kids" | "Print";
  price: number;
  compareAt?: number;
  surface: Surface;
  /** aspect of the mockup frame */
  ratio: "portrait" | "square";
  /** how large the artwork sits on the blank, in % of frame width */
  artScale: number;
  /** vertical placement of the artwork, % from top */
  artTop: number;
  colors: { name: string; value: string; tone: "light" | "dark" }[];
  sizes?: string[];
  fulfilment: string;
  description: string;
}

export const PRODUCT_TYPES: ProductType[] = [
  {
    id: "tshirt",
    name: "T-Shirt",
    category: "Apparel",
    price: 39,
    surface: "apparel",
    ratio: "portrait",
    artScale: 42,
    artTop: 26,
    colors: [
      { name: "Black", value: "#0d0d0d", tone: "dark" },
      { name: "Bone", value: "#e8e4dc", tone: "light" },
      { name: "Slate", value: "#2f3336", tone: "dark" },
      { name: "Sand", value: "#c8b9a2", tone: "light" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fulfilment: "Heavyweight 240gsm organic cotton, garment-dyed.",
    description:
      "A boxy, structured tee cut from heavyweight organic cotton with a reinforced collar and dropped shoulder.",
  },
  {
    id: "hoodie",
    name: "Hoodie",
    category: "Apparel",
    price: 79,
    compareAt: 95,
    surface: "apparel",
    ratio: "portrait",
    artScale: 34,
    artTop: 30,
    colors: [
      { name: "Black", value: "#0d0d0d", tone: "dark" },
      { name: "Bone", value: "#e8e4dc", tone: "light" },
      { name: "Moss", value: "#3a4034", tone: "dark" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fulfilment: "Brushed-back 400gsm fleece, double-lined hood.",
    description:
      "An unhurried, heavyweight hoodie with a double-lined hood and a soft brushed interior.",
  },
  {
    id: "sweatshirt",
    name: "Sweatshirt",
    category: "Apparel",
    price: 69,
    surface: "apparel",
    ratio: "portrait",
    artScale: 36,
    artTop: 28,
    colors: [
      { name: "Black", value: "#0d0d0d", tone: "dark" },
      { name: "Bone", value: "#e8e4dc", tone: "light" },
      { name: "Ash", value: "#8d8d8a", tone: "dark" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fulfilment: "340gsm loopback cotton, ribbed cuffs.",
    description: "A clean crewneck in loopback cotton, cut slightly relaxed through the body.",
  },
  {
    id: "tote",
    name: "Tote Bag",
    category: "Accessories",
    price: 32,
    surface: "apparel",
    ratio: "portrait",
    artScale: 52,
    artTop: 30,
    colors: [
      { name: "Natural", value: "#ddd5c4", tone: "light" },
      { name: "Black", value: "#111111", tone: "dark" },
    ],
    fulfilment: "Heavy 340gsm canvas, reinforced handles.",
    description: "An everyday canvas tote with long handles and a wide, flat print area.",
  },
  {
    id: "mug",
    name: "Mug",
    category: "Home",
    price: 24,
    surface: "hard",
    ratio: "square",
    artScale: 40,
    artTop: 32,
    colors: [
      { name: "White", value: "#f2f0ec", tone: "light" },
      { name: "Matte Black", value: "#141414", tone: "dark" },
    ],
    fulfilment: "Glazed stoneware, 350ml, dishwasher safe.",
    description: "A weighty stoneware mug with a matte glaze and a comfortable handle.",
  },
  {
    id: "phonecase",
    name: "Phone Case",
    category: "Accessories",
    price: 29,
    surface: "hard",
    ratio: "portrait",
    artScale: 62,
    artTop: 22,
    colors: [
      { name: "Clear", value: "#dcdcd8", tone: "light" },
      { name: "Black", value: "#121212", tone: "dark" },
    ],
    sizes: ["iPhone 15", "iPhone 16", "Pixel 9", "Galaxy S25"],
    fulfilment: "Impact-resistant polycarbonate with soft TPU rim.",
    description: "A slim, shock-absorbing case with a scratch-resistant printed back.",
  },
  {
    id: "cap",
    name: "Cap",
    category: "Accessories",
    price: 34,
    surface: "apparel",
    ratio: "square",
    artScale: 26,
    artTop: 40,
    colors: [
      { name: "Black", value: "#111111", tone: "dark" },
      { name: "Stone", value: "#d6cfc2", tone: "light" },
    ],
    fulfilment: "Six-panel brushed twill, adjustable strap.",
    description: "A low-profile six-panel cap in brushed twill with an embroidered front mark.",
  },
  {
    id: "poster",
    name: "Poster",
    category: "Print",
    price: 45,
    surface: "paper",
    ratio: "portrait",
    artScale: 62,
    artTop: 18,
    colors: [
      { name: "Museum White", value: "#f6f4ef", tone: "light" },
      { name: "Ink", value: "#101010", tone: "dark" },
    ],
    sizes: ["30×40cm", "50×70cm", "70×100cm"],
    fulfilment: "200gsm uncoated museum paper, giclée print.",
    description: "A gallery-grade giclée print on uncoated museum paper with a generous margin.",
  },
  {
    id: "sticker",
    name: "Sticker",
    category: "Accessories",
    price: 6,
    surface: "paper",
    ratio: "square",
    artScale: 58,
    artTop: 21,
    colors: [{ name: "Matte White", value: "#f4f2ee", tone: "light" }],
    fulfilment: "Weatherproof vinyl, matte laminate.",
    description: "A die-cut weatherproof vinyl sticker with a matte laminate finish.",
  },
  {
    id: "notebook",
    name: "Notebook",
    category: "Home",
    price: 26,
    surface: "paper",
    ratio: "portrait",
    artScale: 48,
    artTop: 26,
    colors: [
      { name: "Ink", value: "#141414", tone: "dark" },
      { name: "Bone", value: "#e9e5dd", tone: "light" },
    ],
    fulfilment: "Hardcover, 120 pages, 100gsm dotted paper.",
    description: "A hardcover dotted notebook with lay-flat binding and a ribbon marker.",
  },
  {
    id: "cushion",
    name: "Cushion",
    category: "Home",
    price: 42,
    surface: "apparel",
    ratio: "square",
    artScale: 46,
    artTop: 27,
    colors: [
      { name: "Bone", value: "#e6e1d7", tone: "light" },
      { name: "Charcoal", value: "#1c1c1c", tone: "dark" },
    ],
    fulfilment: "Woven cotton cover with concealed zip, 45×45cm.",
    description: "A woven cotton cushion cover with a concealed zip and a soft feather insert.",
  },
  {
    id: "kids-tee",
    name: "Kids T-Shirt",
    category: "Kids",
    price: 29,
    surface: "apparel",
    ratio: "portrait",
    artScale: 38,
    artTop: 27,
    colors: [
      { name: "Bone", value: "#e8e4dc", tone: "light" },
      { name: "Black", value: "#101010", tone: "dark" },
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    fulfilment: "Soft-washed 180gsm organic cotton.",
    description: "A soft-washed organic cotton tee sized for everyday play.",
  },
  {
    id: "onesie",
    name: "Baby Onesie",
    category: "Kids",
    price: 27,
    surface: "apparel",
    ratio: "square",
    artScale: 36,
    artTop: 30,
    colors: [
      { name: "Bone", value: "#ece8e0", tone: "light" },
      { name: "Clay", value: "#c39c86", tone: "light" },
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    fulfilment: "GOTS-certified cotton, nickel-free snaps.",
    description: "A GOTS-certified cotton onesie with envelope shoulders and nickel-free snaps.",
  },
];

export const productType = (id: ProductTypeId) =>
  (PRODUCT_TYPES.find((p) => p.id === id) ?? PRODUCT_TYPES[0]) as ProductType;

/* ---------------- Shop category pages ---------------- */

export interface ShopCategory {
  /** url segment used by /shop/$category */
  slug: string;
  /** short label for the category tabs */
  label: string;
  /** editorial page title */
  title: string;
  intro: string;
  /** product types shown on that page */
  types: ProductTypeId[];
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "t-shirts",
    label: "T-Shirts",
    title: "T-Shirts",
    intro:
      "Designed for everyday expression. Graphic, minimal and artistic prints on heavyweight organic cotton tees.",
    types: ["tshirt"],
  },
  {
    slug: "hoodies",
    label: "Hoodies",
    title: "Hoodies",
    intro: "Brushed-back fleece, double-lined hoods, and artwork placed with restraint.",
    types: ["hoodie"],
  },
  {
    slug: "sweatshirts",
    label: "Sweatshirts",
    title: "Sweatshirts",
    intro: "Loopback cotton crewnecks cut slightly relaxed, printed one design at a time.",
    types: ["sweatshirt"],
  },
  {
    slug: "tote-bags",
    label: "Tote Bags",
    title: "Tote Bags",
    intro: "Heavy canvas totes with a wide, flat print area — the design carried, not worn.",
    types: ["tote"],
  },
  {
    slug: "mugs",
    label: "Mugs",
    title: "Mugs",
    intro: "Glazed stoneware with a matte finish. The quietest way to live with an artwork.",
    types: ["mug"],
  },
  {
    slug: "phone-cases",
    label: "Phone Cases",
    title: "Phone Cases",
    intro: "Slim, impact-resistant cases with a scratch-resistant printed back.",
    types: ["phonecase"],
  },
  {
    slug: "caps",
    label: "Caps",
    title: "Caps",
    intro: "Low-profile six-panel caps in brushed twill with a considered front mark.",
    types: ["cap"],
  },
  {
    slug: "posters",
    label: "Posters / Wall Art",
    title: "Posters & Wall Art",
    intro: "Gallery-grade giclée prints on uncoated museum paper, with a generous margin.",
    types: ["poster"],
  },
  {
    slug: "stickers",
    label: "Stickers",
    title: "Stickers",
    intro: "Die-cut weatherproof vinyl. The smallest edition we make.",
    types: ["sticker"],
  },
  {
    slug: "notebooks",
    label: "Notebooks",
    title: "Notebooks",
    intro: "Hardcover, lay-flat, dotted paper — the design on the outside, the idea on the inside.",
    types: ["notebook"],
  },
  {
    slug: "cushions",
    label: "Cushions",
    title: "Cushions",
    intro: "Woven cotton covers with a concealed zip. Artwork for the room, not the wall.",
    types: ["cushion"],
  },
  {
    slug: "kids",
    label: "Kids T-Shirts",
    title: "Kids T-Shirts",
    intro: "Soft-washed organic cotton, sized for everyday play and every kind of mess.",
    types: ["kids-tee"],
  },
  {
    slug: "baby",
    label: "Baby Onesies",
    title: "Baby Onesies",
    intro: "GOTS-certified cotton with envelope shoulders and nickel-free snaps.",
    types: ["onesie"],
  },
];

export const shopCategory = (slug: string) => SHOP_CATEGORIES.find((c) => c.slug === slug);

export const categorySlugForType = (id: ProductTypeId) =>
  SHOP_CATEGORIES.find((c) => c.types.includes(id))?.slug;

export type Badge = "New" | "Bestseller" | "Limited" | "Sale";

export type DesignStyle =
  "Minimal" | "Typography" | "Graphic" | "Illustration" | "Artistic" | "Lifestyle";

export const DESIGN_STYLES: DesignStyle[] = [
  "Minimal",
  "Typography",
  "Graphic",
  "Illustration",
  "Artistic",
  "Lifestyle",
];

/** Editorial edits used by the shop filters, independent of the collections. */
export const EDITS = [
  "New Drop",
  "Best Sellers",
  "Minimal",
  "Street",
  "Art",
  "Seasonal",
  "Gift",
] as const;
export type Edit = (typeof EDITS)[number];

export const PRICE_BANDS = [
  { id: "u20", label: "Under €20", min: 0, max: 20 },
  { id: "20-30", label: "€20 – €30", min: 20, max: 30 },
  { id: "30-50", label: "€30 – €50", min: 30, max: 50 },
  { id: "50p", label: "€50+", min: 50, max: Infinity },
];

export interface Design {
  slug: string;
  name: string;
  collection: string;
  studio: string;
  year: string;
  /** artwork tone: light artwork reads on dark blanks, and vice versa */
  artTone: "light" | "dark";
  art: string;
  story: string;
  badges: Badge[];
  products: ProductTypeId[];
  rating: number;
  reviews: number;
  style: DesignStyle;
  edits: Edit[];
}

const ALL: ProductTypeId[] = PRODUCT_TYPES.map((p) => p.id);

export const DESIGNS: Design[] = [
  {
    slug: "midnight-lion",
    name: "Midnight Lion",
    collection: "Nocturne",
    studio: "Atelier Noir Studio",
    year: "2026",
    artTone: "light",
    art: artLion,
    story:
      "Drawn in a single continuous line over three nights in Antwerp, Midnight Lion is a study in restraint — a crest without a coat of arms.",
    badges: ["Bestseller"],
    products: ALL,
    rating: 4.9,
    reviews: 412,
    style: "Graphic",
    edits: ["Best Sellers", "Street", "Gift"],
  },
  {
    slug: "solstice",
    name: "Solstice",
    collection: "Northern Light",
    studio: "Atelier Noir Studio",
    year: "2026",
    artTone: "light",
    art: artSolstice,
    story:
      "Three arcs and a horizon: the shortest daylight of the year, reduced to the fewest possible marks.",
    badges: ["New"],
    products: ["tshirt", "hoodie", "sweatshirt", "tote", "mug", "poster", "cushion", "sticker"],
    rating: 4.8,
    reviews: 187,
    style: "Minimal",
    edits: ["New Drop", "Minimal", "Seasonal"],
  },
  {
    slug: "nordic-silence",
    name: "Nordic Silence",
    collection: "Northern Light",
    studio: "Studio Halden",
    year: "2025",
    artTone: "dark",
    art: artNordic,
    story:
      "A typographic seal built from a single rotating word — quiet on the shelf, loud in person.",
    badges: ["Limited"],
    products: ["tshirt", "hoodie", "sweatshirt", "tote", "cap", "notebook", "sticker", "poster"],
    rating: 4.7,
    reviews: 96,
    style: "Typography",
    edits: ["Minimal", "Art"],
  },
  {
    slug: "olive-line",
    name: "Olive Line",
    collection: "Mediterraneo",
    studio: "Casa Lume",
    year: "2025",
    artTone: "dark",
    art: artOlive,
    story:
      "A single olive branch, drawn from life in Puglia. Printed small, placed high, never centred.",
    badges: ["Bestseller", "Sale"],
    products: ["tshirt", "sweatshirt", "tote", "mug", "cushion", "notebook", "kids-tee", "onesie"],
    rating: 4.9,
    reviews: 268,
    style: "Illustration",
    edits: ["Best Sellers", "Gift", "Seasonal"],
  },
  {
    slug: "dune-crescent",
    name: "Dune Crescent",
    collection: "Meridian",
    studio: "Atelier Noir Studio",
    year: "2026",
    artTone: "light",
    art: artDune,
    story: "The horizon line of an empty quarter at dusk, abstracted into two overlapping ridges.",
    badges: ["New"],
    products: ["tshirt", "hoodie", "tote", "mug", "phonecase", "poster", "cushion", "cap"],
    rating: 4.6,
    reviews: 74,
    style: "Artistic",
    edits: ["New Drop", "Art"],
  },
  {
    slug: "paper-crane",
    name: "Paper Crane",
    collection: "Nocturne",
    studio: "Studio Halden",
    year: "2026",
    artTone: "light",
    art: artCrane,
    story: "Folded, unfolded, then traced — a crane rendered only by its creases.",
    badges: [],
    products: ["tshirt", "hoodie", "sweatshirt", "tote", "poster", "sticker", "notebook", "mug"],
    rating: 4.8,
    reviews: 133,
    style: "Lifestyle",
    edits: ["Minimal", "Gift"],
  },
  {
    slug: "abstract-horizon",
    name: "Abstract Horizon",
    collection: "Meridian",
    studio: "Atelier Noir Studio",
    year: "2026",
    artTone: "light",
    art: artDune,
    story:
      "Layered monochromatic gradient planes depicting the serene transition from day to twilight.",
    badges: ["New"],
    products: ALL,
    rating: 4.9,
    reviews: 142,
    style: "Minimal",
    edits: ["New Drop", "Minimal", "Art"],
  },
  {
    slug: "urban-echo",
    name: "Urban Echo",
    collection: "Street Culture",
    studio: "Studio Halden",
    year: "2026",
    artTone: "light",
    art: artLion,
    story: "Architectural grid lines intersect with raw hand-drawn brutalist typography.",
    badges: ["Bestseller"],
    products: ALL,
    rating: 4.8,
    reviews: 215,
    style: "Graphic",
    edits: ["Street", "Best Sellers"],
  },
  {
    slug: "desert-geometry",
    name: "Desert Geometry",
    collection: "Meridian",
    studio: "Casa Lume",
    year: "2025",
    artTone: "dark",
    art: artSolstice,
    story: "Sharp geometric silhouettes inspired by ancient sun dials and arid sand formations.",
    badges: ["Limited"],
    products: ["tshirt", "hoodie", "tote", "poster", "mug", "cushion"],
    rating: 4.7,
    reviews: 89,
    style: "Artistic",
    edits: ["Art", "Minimal"],
  },
  {
    slug: "quiet-motion",
    name: "Quiet Motion",
    collection: "Minimal",
    studio: "Atelier Noir Studio",
    year: "2026",
    artTone: "light",
    art: artNordic,
    story: "A fluid single wave form expressing perpetual rhythm without noise.",
    badges: [],
    products: ALL,
    rating: 4.9,
    reviews: 112,
    style: "Minimal",
    edits: ["Minimal"],
  },
  {
    slug: "monochrome-bloom",
    name: "Monochrome Bloom",
    collection: "Mediterraneo",
    studio: "Casa Lume",
    year: "2026",
    artTone: "dark",
    art: artOlive,
    story: "Botanical charcoal line art capturing midnight blossoms on heavy texture.",
    badges: ["New"],
    products: ALL,
    rating: 4.8,
    reviews: 98,
    style: "Illustration",
    edits: ["New Drop", "Gift", "Seasonal"],
  },
  {
    slug: "after-dark",
    name: "After Dark",
    collection: "Nocturne",
    studio: "Atelier Noir Studio",
    year: "2025",
    artTone: "light",
    art: artLion,
    story: "High-contrast midnight graphic exploring shadow, light and negative space.",
    badges: ["Bestseller"],
    products: ALL,
    rating: 4.9,
    reviews: 310,
    style: "Graphic",
    edits: ["Best Sellers", "Street"],
  },
  {
    slug: "modern-heritage",
    name: "Modern Heritage",
    collection: "Typography",
    studio: "Studio Halden",
    year: "2025",
    artTone: "dark",
    art: artNordic,
    story: "Classic editorial serif lettering merged with clean contemporary geometric framing.",
    badges: [],
    products: ["tshirt", "hoodie", "sweatshirt", "tote", "notebook", "poster"],
    rating: 4.7,
    reviews: 154,
    style: "Typography",
    edits: ["Minimal", "Gift"],
  },
  {
    slug: "sunday-studio",
    name: "Sunday Studio",
    collection: "Lifestyle",
    studio: "Casa Lume",
    year: "2026",
    artTone: "light",
    art: artCrane,
    story: "Casual atelier pencil sketches created on relaxed weekend mornings.",
    badges: ["New"],
    products: ALL,
    rating: 4.8,
    reviews: 67,
    style: "Lifestyle",
    edits: ["New Drop", "Seasonal"],
  },
];

export const designBySlug = (slug: string) => DESIGNS.find((d) => d.slug === slug);

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  image?: string;
  designs: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "new-drops",
    name: "New Drops",
    tagline: "The latest artwork, fresh off the press.",
    image: "/images/collection-minimal.png",
    designs: ["solstice", "dune-crescent", "abstract-horizon", "monochrome-bloom", "sunday-studio"],
  },
  {
    slug: "minimal",
    name: "Minimal",
    tagline: "Quiet design. Strong identity.",
    image: "/images/collection-minimal.png",
    designs: ["solstice", "nordic-silence", "quiet-motion", "abstract-horizon", "paper-crane"],
  },
  {
    slug: "street-culture",
    name: "Street Culture",
    tagline: "Urban perspectives and continuous line graphics.",
    designs: ["midnight-lion", "urban-echo", "after-dark"],
  },
  {
    slug: "art-graphics",
    name: "Art & Graphics",
    tagline: "Expressive forms and gallery-grade prints.",
    designs: ["dune-crescent", "desert-geometry", "abstract-horizon", "midnight-lion"],
  },
  {
    slug: "typography",
    name: "Typography",
    tagline: "Wordmarks, seals and typographic studies.",
    designs: ["nordic-silence", "modern-heritage"],
  },
  {
    slug: "summer",
    name: "Summer Edit",
    tagline: "Light tones and coastal geometry.",
    designs: ["olive-line", "dune-crescent", "solstice"],
  },
  {
    slug: "winter",
    name: "Winter Edit",
    tagline: "Monochrome motifs built for cold months.",
    designs: ["midnight-lion", "after-dark", "nordic-silence"],
  },
  {
    slug: "gift-edits",
    name: "Gift Edits",
    tagline: "Curated pieces made to share.",
    designs: ["olive-line", "paper-crane", "monochrome-bloom", "modern-heritage"],
  },
  {
    slug: "best-sellers",
    name: "Best Sellers",
    tagline: "The signature designs carrying our brand worldwide.",
    designs: ["midnight-lion", "olive-line", "urban-echo", "after-dark"],
  },
  {
    slug: "limited-editions",
    name: "Limited Editions",
    tagline: "Small run prints and exclusive studio drops.",
    designs: ["nordic-silence", "desert-geometry"],
  },
  {
    slug: "nocturne",
    name: "Nocturne",
    tagline: "Line work made for low light.",
    image: "/images/collection-minimal.png",
    designs: ["midnight-lion", "paper-crane", "after-dark"],
  },
  {
    slug: "northern-light",
    name: "Northern Light",
    tagline: "Scandinavian restraint, Arctic palette.",
    designs: ["solstice", "nordic-silence"],
  },
  {
    slug: "mediterraneo",
    name: "Mediterraneo",
    tagline: "Sun-worn neutrals from the south.",
    designs: ["olive-line", "monochrome-bloom"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Horizons from every longitude.",
    designs: ["dune-crescent", "abstract-horizon", "desert-geometry"],
  },
];

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image?: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "the-art-of-wearing-what-you-believe",
    title: "The Art of Wearing What You Believe",
    category: "Design",
    readTime: "6 min read",
    date: "18 Aug 2026",
    excerpt:
      "Explore how visual design becomes part of personal identity and everyday expression in modern culture.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "the-story-behind-midnight-lion",
    title: "The Story Behind Midnight Lion",
    category: "Design",
    readTime: "5 min read",
    date: "12 Aug 2026",
    excerpt:
      "From a single continuous line to a house signature — the making of our most-loved design.",
    image: "/images/blog-design.png",
  },
  {
    slug: "how-to-build-a-minimal-everyday-wardrobe",
    title: "How to Build a Minimal Everyday Wardrobe",
    category: "Fashion",
    readTime: "5 min read",
    date: "10 Aug 2026",
    excerpt:
      "Curate a versatile, seasonless capsule of heavyweight tees, architectural hoodies, and clean accessories.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "5-ways-to-style-an-oversized-hoodie",
    title: "5 Ways to Style an Oversized Hoodie",
    category: "Fashion",
    readTime: "4 min read",
    date: "24 Jul 2026",
    excerpt:
      "How to balance volume, texture, and architectural silhouettes with our 400gsm double-lined fleece hoodie.",
    image: "/images/blog-style.png",
  },
  {
    slug: "choosing-the-right-t-shirt-fit",
    title: "Choosing the Right T-Shirt Fit",
    category: "Product Guide",
    readTime: "4 min read",
    date: "19 Jul 2026",
    excerpt:
      "Everything you need to know about dropped shoulders, rib collars, 240gsm organic jersey, and chest measurements.",
    image: "/images/blog-guide.png",
  },
  {
    slug: "how-to-care-for-printed-apparel",
    title: "How to Care for Printed Apparel",
    category: "Care Guide",
    readTime: "3 min read",
    date: "08 Jul 2026",
    excerpt:
      "Wash cold, inside out, and air dry flat. Maximize the lifespan of your organic cotton and archival screen prints.",
    image:
      "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "minimal-design-in-modern-fashion",
    title: "Minimal Design in Modern Fashion",
    category: "Culture",
    readTime: "6 min read",
    date: "28 Jun 2026",
    excerpt:
      "An exploration of negative space, brutalist geometry, and understated elegance in Berlin, Copenhagen, and Paris.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "the-story-behind-graphic-t-shirts",
    title: "The Story Behind Graphic T-Shirts",
    category: "Culture",
    readTime: "7 min read",
    date: "14 Jun 2026",
    excerpt:
      "Trace how the humble cotton undershirt transformed into the most powerful personal gallery in modern society.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "t-shirt-vs-sweatshirt-guide",
    title: "T-Shirt vs Sweatshirt: Which One Is Right For You?",
    category: "Product Guide",
    readTime: "4 min read",
    date: "02 Jun 2026",
    excerpt:
      "Compare 240gsm jersey against 340gsm loopback fleece to find your ideal balance of breathability and insulation.",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "choose-the-right-hoodie-fit",
    title: "How to Choose the Right Hoodie Fit",
    category: "Product Guide",
    readTime: "4 min read",
    date: "28 Jul 2026",
    excerpt:
      "Boxy, regular or relaxed — a short guide to finding the weight and drape that suits you.",
    image: "/images/blog-guide.png",
  },
  {
    slug: "style-minimal-graphic-tee",
    title: "How to Style a Minimal Graphic T-Shirt",
    category: "Fashion",
    readTime: "4 min read",
    date: "14 Jul 2026",
    excerpt:
      "Three quiet ways to build an outfit around a single considered graphic — without shouting.",
    image: "/images/blog-style.png",
  },
  {
    slug: "one-design-many-objects",
    title: "One design, many objects",
    category: "Brand Stories",
    readTime: "6 min read",
    date: "12 Aug 2026",
    excerpt:
      "Why we build around the drawing instead of the garment, and what that changes for the people who wear it.",
  },
  {
    slug: "print-on-demand-without-the-waste",
    title: "Print on demand, without the waste",
    category: "Care Guide",
    readTime: "4 min read",
    date: "28 Jul 2026",
    excerpt:
      "Nothing is made until it is ordered. A short account of what that means for inventory, water and returns.",
  },
  {
    slug: "the-case-for-heavyweight-cotton",
    title: "The case for heavyweight cotton",
    category: "Product Guide",
    readTime: "5 min read",
    date: "09 Jul 2026",
    excerpt: "240gsm, garment-dyed, and why a tee should hold its shape after fifty washes.",
  },
];

export interface Region {
  code: string;
  country: string;
  currency: string;
  symbol: string;
  rate: number;
  delivery: string;
  taxNote: string;
}

export const REGIONS: Region[] = [
  {
    code: "EU",
    country: "Europe (EU)",
    currency: "EUR",
    symbol: "€",
    rate: 1,
    delivery: "3–5 working days",
    taxNote: "VAT included",
  },
  {
    code: "GB",
    country: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    rate: 0.85,
    delivery: "4–6 working days",
    taxNote: "UK VAT included",
  },
  {
    code: "CH",
    country: "Switzerland",
    currency: "CHF",
    symbol: "CHF ",
    rate: 0.96,
    delivery: "5–7 working days",
    taxNote: "Duties calculated at checkout",
  },
  {
    code: "NO",
    country: "Norway",
    currency: "NOK",
    symbol: "kr ",
    rate: 11.6,
    delivery: "5–7 working days",
    taxNote: "Duties calculated at checkout",
  },
  {
    code: "US",
    country: "United States",
    currency: "USD",
    symbol: "$",
    rate: 1.09,
    delivery: "6–9 working days",
    taxNote: "Sales tax at checkout",
  },
  {
    code: "CA",
    country: "Canada",
    currency: "CAD",
    symbol: "C$",
    rate: 1.48,
    delivery: "7–10 working days",
    taxNote: "Duties calculated at checkout",
  },
  {
    code: "SA",
    country: "Saudi Arabia",
    currency: "SAR",
    symbol: "SR ",
    rate: 4.09,
    delivery: "7–10 working days",
    taxNote: "Duties calculated at checkout",
  },
  {
    code: "BD",
    country: "Bangladesh",
    currency: "BDT",
    symbol: "৳",
    rate: 128,
    delivery: "9–14 working days",
    taxNote: "Duties calculated at checkout",
  },
];

export const LANGUAGES = ["English", "Deutsch", "Français", "Español", "Italiano", "العربية"];

/* ---------------- Mock availability ---------------- */

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 9973;
  return h;
};

/** Deterministic mock stock state so every card state can be previewed. */
export const stockState = (designSlug: string, productId: ProductTypeId): "in" | "low" | "out" => {
  const h = hash(`${designSlug}:${productId}`);
  if (h % 17 === 0) return "out";
  if (h % 7 === 0) return "low";
  return "in";
};
