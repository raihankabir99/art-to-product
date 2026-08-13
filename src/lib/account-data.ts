import type { ProductTypeId } from "./catalog";

/** Mock account data — illustrative only, no backend behind it. */

export interface OrderItem {
  designSlug: string;
  designName: string;
  productId: ProductTypeId;
  productName: string;
  color: string;
  colorValue: string;
  size?: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  placed: string;
  /** index into ORDER_STEPS */
  step: number;
  total: number;
  carrier: string;
  tracking: string;
  eta: string;
  address: string[];
  items: OrderItem[];
  stamps: (string | undefined)[];
}

export const ORDERS: Order[] = [
  {
    id: "AN-2026-00184",
    placed: "09 Aug 2026",
    step: 4,
    total: 118,
    carrier: "DHL Express",
    tracking: "JJD0099887766",
    eta: "14–16 Aug 2026",
    address: ["Ada Lindqvist", "Prinsengracht 214", "1016 HD Amsterdam", "Netherlands"],
    stamps: ["09 Aug, 14:02", "09 Aug, 14:03", "10 Aug, 08:15", "11 Aug, 09:40", "12 Aug, 17:20"],
    items: [
      {
        designSlug: "midnight-lion",
        designName: "Midnight Lion",
        productId: "hoodie",
        productName: "Hoodie",
        color: "Black",
        colorValue: "#0d0d0d",
        size: "M",
        qty: 1,
        price: 79,
      },
      {
        designSlug: "midnight-lion",
        designName: "Midnight Lion",
        productId: "mug",
        productName: "Mug",
        color: "Matte Black",
        colorValue: "#141414",
        qty: 1,
        price: 24,
      },
    ],
  },
  {
    id: "AN-2026-00151",
    placed: "21 Jul 2026",
    step: 6,
    total: 84,
    carrier: "PostNL",
    tracking: "3SABCD1234567",
    eta: "Delivered 27 Jul 2026",
    address: ["Ada Lindqvist", "Prinsengracht 214", "1016 HD Amsterdam", "Netherlands"],
    stamps: [
      "21 Jul, 10:11",
      "21 Jul, 10:12",
      "22 Jul, 07:00",
      "23 Jul, 12:30",
      "25 Jul, 16:05",
      "27 Jul, 08:40",
      "27 Jul, 13:22",
    ],
    items: [
      {
        designSlug: "solstice",
        designName: "Solstice",
        productId: "tshirt",
        productName: "T-Shirt",
        color: "Bone",
        colorValue: "#e8e4dc",
        size: "S",
        qty: 1,
        price: 39,
      },
      {
        designSlug: "solstice",
        designName: "Solstice",
        productId: "poster",
        productName: "Poster",
        color: "Museum White",
        colorValue: "#f6f4ef",
        size: "50×70cm",
        qty: 1,
        price: 45,
      },
    ],
  },
  {
    id: "AN-2026-00097",
    placed: "02 Jun 2026",
    step: 6,
    total: 32,
    carrier: "PostNL",
    tracking: "3SEFGH7654321",
    eta: "Delivered 07 Jun 2026",
    address: ["Ada Lindqvist", "Prinsengracht 214", "1016 HD Amsterdam", "Netherlands"],
    stamps: [
      "02 Jun, 19:44",
      "02 Jun, 19:45",
      "03 Jun, 08:00",
      "03 Jun, 15:10",
      "05 Jun, 09:30",
      "07 Jun, 07:55",
      "07 Jun, 11:08",
    ],
    items: [
      {
        designSlug: "nordic-silence",
        designName: "Nordic Silence",
        productId: "tote",
        productName: "Tote Bag",
        color: "Natural",
        colorValue: "#ddd5c4",
        qty: 1,
        price: 32,
      },
    ],
  },
];

export const orderById = (id: string) => ORDERS.find((o) => o.id === id);

export interface Address {
  id: string;
  label: string;
  name: string;
  lines: string[];
  country: string;
  isDefault: boolean;
}

export const ADDRESSES: Address[] = [
  {
    id: "home",
    label: "Home",
    name: "Ada Lindqvist",
    lines: ["Prinsengracht 214", "1016 HD Amsterdam"],
    country: "Netherlands",
    isDefault: true,
  },
  {
    id: "studio",
    label: "Studio",
    name: "Ada Lindqvist",
    lines: ["Rue Antoine Dansaert 88", "1000 Brussels"],
    country: "Belgium",
    isDefault: false,
  },
];

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "visa", brand: "Visa", last4: "4218", expiry: "07 / 29", isDefault: true },
  { id: "mc", brand: "Mastercard", last4: "9903", expiry: "02 / 28", isDefault: false },
];

export interface Notification {
  id: string;
  title: string;
  body: string;
  when: string;
  unread: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Order AN-2026-00184 has shipped",
    body: "DHL Express collected your parcel. Estimated arrival 14–16 August.",
    when: "2 days ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Nordic Silence is back on hoodies",
    body: "A saved design returned to production in three colourways.",
    when: "1 week ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Your review helped 12 people",
    body: "Thank you for writing about the heavyweight tee.",
    when: "3 weeks ago",
    unread: false,
  },
];

/** Small, honest account metrics used by the dashboard visualisations. */
export const ACCOUNT_METRICS = {
  spendSeries: [42, 39, 0, 84, 26, 61, 32, 118],
  monthLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  categorySplit: [
    { label: "Apparel", value: 6 },
    { label: "Print", value: 3 },
    { label: "Home", value: 2 },
    { label: "Accessories", value: 2 },
  ],
};
