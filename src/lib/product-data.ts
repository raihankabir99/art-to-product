import {
  DESIGNS,
  PRODUCT_TYPES,
  designBySlug,
  productType,
  type Design,
  type ProductType,
  type ProductTypeId,
} from "@/lib/catalog";

/* ------------------------------------------------------------------ *
 * Mock data + helpers for the /products/$slug experience.
 * DESIGN -> PRODUCT -> VARIANT, all frontend state.
 * ------------------------------------------------------------------ */

/** URL fragment used for each product type inside a product slug. */
export const PRODUCT_SLUGS: Record<ProductTypeId, string> = {
  tshirt: "tshirt",
  hoodie: "hoodie",
  sweatshirt: "sweatshirt",
  tote: "tote",
  mug: "mug",
  phonecase: "phone-case",
  cap: "cap",
  poster: "poster",
  sticker: "sticker",
  notebook: "notebook",
  cushion: "cushion",
  "kids-tee": "kids-tee",
  onesie: "onesie",
};

export const productSlug = (designSlug: string, productId: ProductTypeId) =>
  `${designSlug}-${PRODUCT_SLUGS[productId]}`;

/** Resolves "midnight-lion-phone-case" into its design + product type. */
export function parseProductSlug(
  slug: string,
): { design: Design; productId: ProductTypeId } | null {
  const entries = Object.entries(PRODUCT_SLUGS) as [ProductTypeId, string][];
  // longest suffix first so "kids-tee" wins over "tee"-like collisions
  const sorted = [...entries].sort((a, b) => b[1].length - a[1].length);
  for (const [id, frag] of sorted) {
    const suffix = `-${frag}`;
    if (!slug.endsWith(suffix)) continue;
    const design = designBySlug(slug.slice(0, -suffix.length));
    if (design && design.products.includes(id)) return { design, productId: id };
  }
  return null;
}

/** Editorial sub-title shown under the design name. */
export function productTitle(type: ProductType) {
  const map: Partial<Record<ProductTypeId, string>> = {
    tshirt: "Graphic T-Shirt",
    hoodie: "Heavyweight Hoodie",
    sweatshirt: "Loopback Sweatshirt",
    tote: "Canvas Tote Bag",
    mug: "Stoneware Mug",
    phonecase: "Printed Phone Case",
    cap: "Six-Panel Cap",
    poster: "Giclée Poster",
    sticker: "Die-Cut Sticker",
    notebook: "Hardcover Notebook",
    cushion: "Woven Cushion Cover",
    "kids-tee": "Kids Graphic T-Shirt",
    onesie: "Organic Baby Onesie",
  };
  return map[type.id] ?? type.name;
}

/** Which option controls a product type actually needs. */
export type OptionKind = "color" | "size" | "device" | "poster-size" | "format";

export function optionsFor(type: ProductType): OptionKind[] {
  if (type.id === "phonecase") return ["color", "device"];
  if (type.id === "poster") return ["poster-size"];
  if (type.id === "sticker") return ["format"];
  if (type.id === "notebook") return ["color", "format"];
  const kinds: OptionKind[] = [];
  if (type.colors.length > 1) kinds.push("color");
  if (type.sizes?.length) kinds.push("size");
  if (!kinds.length) kinds.push("color");
  return kinds;
}

/** Mock device catalogue for phone cases. */
export const DEVICE_GROUPS: { brand: string; models: string[] }[] = [
  {
    brand: "iPhone",
    models: [
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16",
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15",
      "iPhone 14 Pro",
      "iPhone 14",
      "iPhone 13",
    ],
  },
  {
    brand: "Samsung",
    models: ["Galaxy S25 Ultra", "Galaxy S25", "Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23"],
  },
  { brand: "Google Pixel", models: ["Pixel 9 Pro", "Pixel 9", "Pixel 8 Pro", "Pixel 8"] },
  { brand: "Other", models: ["OnePlus 12", "Xiaomi 14", "Nothing Phone (2a)"] },
];

/** Poster formats with a relative visual reference (mock). */
export const POSTER_FORMATS = [
  { id: "A4", label: "A4", note: "21 × 29.7cm", scale: 0.42 },
  { id: "A3", label: "A3", note: "29.7 × 42cm", scale: 0.58 },
  { id: "A2", label: "A2", note: "42 × 59.4cm", scale: 0.78 },
  { id: "A1", label: "A1", note: "59.4 × 84.1cm", scale: 1 },
];

/** Formats used by stickers and notebooks. */
export const FORMAT_OPTIONS: Partial<Record<ProductTypeId, { id: string; note: string }[]>> = {
  sticker: [
    { id: "Single 8cm", note: "One die-cut sticker" },
    { id: "Pack of 3", note: "Mixed sizes, 5–10cm" },
    { id: "Pack of 6", note: "Mixed sizes, 4–10cm" },
  ],
  notebook: [
    { id: "A5 dotted", note: "120 pages, 100gsm" },
    { id: "A5 ruled", note: "120 pages, 100gsm" },
    { id: "A4 dotted", note: "160 pages, 100gsm" },
  ],
};

/** Mock delivery estimates for the estimator UI. */
export const DELIVERY_COUNTRIES: { code: string; name: string; estimate: string; note: string }[] = [
  { code: "DE", name: "Germany", estimate: "3–5 working days", note: "VAT included" },
  { code: "FR", name: "France", estimate: "3–5 working days", note: "VAT included" },
  { code: "IT", name: "Italy", estimate: "4–6 working days", note: "VAT included" },
  { code: "ES", name: "Spain", estimate: "4–6 working days", note: "VAT included" },
  { code: "NL", name: "Netherlands", estimate: "3–4 working days", note: "VAT included" },
  { code: "BE", name: "Belgium", estimate: "3–4 working days", note: "VAT included" },
  { code: "SE", name: "Sweden", estimate: "4–6 working days", note: "VAT included" },
  { code: "DK", name: "Denmark", estimate: "4–6 working days", note: "VAT included" },
  { code: "GB", name: "United Kingdom", estimate: "4–6 working days", note: "UK VAT included" },
  { code: "CH", name: "Switzerland", estimate: "5–7 working days", note: "Duties at checkout" },
  { code: "NO", name: "Norway", estimate: "5–7 working days", note: "Duties at checkout" },
  { code: "SA", name: "Saudi Arabia", estimate: "7–10 working days", note: "Duties at checkout" },
  { code: "AE", name: "United Arab Emirates", estimate: "7–10 working days", note: "Duties at checkout" },
  { code: "US", name: "United States", estimate: "6–9 working days", note: "Sales tax at checkout" },
  { code: "CA", name: "Canada", estimate: "7–10 working days", note: "Duties at checkout" },
];

/** Deterministic mock availability so disabled states can be previewed. */
export function variantAvailability(productId: ProductTypeId, option?: string) {
  if (!option) return "in" as const;
  if (productId === "tshirt" && option === "XXL") return "out" as const;
  if (productId === "hoodie" && option === "XS") return "low" as const;
  if (productId === "sweatshirt" && option === "XXL") return "low" as const;
  if (productId === "kids-tee" && option === "10Y") return "out" as const;
  if (productId === "phonecase" && option === "iPhone 13") return "out" as const;
  if (productId === "poster" && option === "A1") return "low" as const;
  return "in" as const;
}

/** Clearly-marked demo review data. */
export const DEMO_REVIEWS = [
  {
    name: "Marte K.",
    place: "Oslo",
    rating: 5,
    title: "Heavier than expected, in a good way",
    body: "The print sits flat and the cotton has real weight. Three washes in and the edges are still crisp.",
  },
  {
    name: "Youssef A.",
    place: "Riyadh",
    rating: 5,
    title: "Arrived ahead of the estimate",
    body: "Duties were shown up front, which I appreciated. Packaging was plain and recyclable.",
  },
  {
    name: "Laura B.",
    place: "Milan",
    rating: 4,
    title: "Sizing runs relaxed",
    body: "I sized down after reading the guide and it fits exactly as pictured.",
  },
  {
    name: "Tom V.",
    place: "Rotterdam",
    rating: 5,
    title: "The artwork is the point",
    body: "Bought the same design on a poster afterwards. Both feel like one object, not two products.",
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, share: 0.78 },
  { stars: 4, share: 0.14 },
  { stars: 3, share: 0.05 },
  { stars: 2, share: 0.02 },
  { stars: 1, share: 0.01 },
];

/** Related products: different designs, same or nearby product format. */
export function relatedProducts(design: Design, productId: ProductTypeId) {
  const style = design.style;
  const others = DESIGNS.filter((d) => d.slug !== design.slug);
  const ranked = [...others].sort((a, b) => {
    const sa = a.style === style ? 0 : 1;
    const sb = b.style === style ? 0 : 1;
    return sa - sb;
  });
  return ranked.slice(0, 4).map((d) => ({
    design: d,
    productId: d.products.includes(productId) ? productId : d.products[0]!,
  }));
}

export const allProductTypes = () => PRODUCT_TYPES;
export const typeOf = (id: ProductTypeId) => productType(id);
