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

export type Badge = "New" | "Bestseller" | "Limited" | "Sale";

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
  },
  {
    slug: "dune-crescent",
    name: "Dune Crescent",
    collection: "Meridian",
    studio: "Atelier Noir Studio",
    year: "2026",
    artTone: "light",
    art: artDune,
    story:
      "The horizon line of an empty quarter at dusk, abstracted into two overlapping ridges.",
    badges: ["New"],
    products: ["tshirt", "hoodie", "tote", "mug", "phonecase", "poster", "cushion", "cap"],
    rating: 4.6,
    reviews: 74,
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
  },
];

export const designBySlug = (slug: string) => DESIGNS.find((d) => d.slug === slug);

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  designs: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "nocturne",
    name: "Nocturne",
    tagline: "Line work made for low light.",
    designs: ["midnight-lion", "paper-crane"],
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
    designs: ["olive-line"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Horizons from every longitude.",
    designs: ["dune-crescent"],
  },
];

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "one-design-many-objects",
    title: "One design, many objects",
    category: "Studio",
    readTime: "6 min",
    date: "12 Aug 2026",
    excerpt:
      "Why we build around the drawing instead of the garment, and what that changes for the people who wear it.",
  },
  {
    slug: "print-on-demand-without-the-waste",
    title: "Print on demand, without the waste",
    category: "Responsibility",
    readTime: "4 min",
    date: "28 Jul 2026",
    excerpt:
      "Nothing is made until it is ordered. A short account of what that means for inventory, water and returns.",
  },
  {
    slug: "the-case-for-heavyweight-cotton",
    title: "The case for heavyweight cotton",
    category: "Materials",
    readTime: "5 min",
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
  { code: "EU", country: "Europe (EU)", currency: "EUR", symbol: "€", rate: 1, delivery: "3–5 working days", taxNote: "VAT included" },
  { code: "GB", country: "United Kingdom", currency: "GBP", symbol: "£", rate: 0.85, delivery: "4–6 working days", taxNote: "UK VAT included" },
  { code: "CH", country: "Switzerland", currency: "CHF", symbol: "CHF ", rate: 0.96, delivery: "5–7 working days", taxNote: "Duties calculated at checkout" },
  { code: "NO", country: "Norway", currency: "NOK", symbol: "kr ", rate: 11.6, delivery: "5–7 working days", taxNote: "Duties calculated at checkout" },
  { code: "US", country: "United States", currency: "USD", symbol: "$", rate: 1.09, delivery: "6–9 working days", taxNote: "Sales tax at checkout" },
  { code: "CA", country: "Canada", currency: "CAD", symbol: "C$", rate: 1.48, delivery: "7–10 working days", taxNote: "Duties calculated at checkout" },
  { code: "SA", country: "Saudi Arabia", currency: "SAR", symbol: "SR ", rate: 4.09, delivery: "7–10 working days", taxNote: "Duties calculated at checkout" },
  { code: "BD", country: "Bangladesh", currency: "BDT", symbol: "৳", rate: 128, delivery: "9–14 working days", taxNote: "Duties calculated at checkout" },
];

export const LANGUAGES = ["English", "Deutsch", "Français", "Español", "Italiano", "العربية"];
