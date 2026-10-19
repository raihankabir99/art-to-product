export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CollectionRecord {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  curator?: string;
  season?: string;
  created_at: string;
}

export interface DesignRecord {
  id: string;
  slug: string;
  name: string;
  studio: string;
  style: string;
  collection_slug?: string;
  story: string;
  palette: string[];
  badge?: string;
  featured: boolean;
  asset_path?: string;
  created_at: string;
}

export interface ProductRecord {
  id: string;
  type_id: string;
  name: string;
  category: string;
  base_price_eur: number;
  compare_at_eur?: number;
  material: string;
  fit?: string;
  care?: string;
  specs: string[];
  available_views: string[];
  available_sizes: string[];
}

export interface ProductVariantRecord {
  id: string;
  product_type_id: string;
  color_name: string;
  color_hex: string;
  color_tone: "dark" | "light";
  size?: string;
  sku?: string;
  in_stock: boolean;
  stock_quantity: number;
  price_override_eur?: number;
}

export interface AddressRecord {
  id: string;
  user_id: string;
  label: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2?: string;
  city: string;
  postal_code: string;
  state_province?: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartRecord {
  id: string;
  user_id?: string;
  session_id?: string;
  status: "active" | "merged" | "abandoned" | "converted";
  coupon_code?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItemRecord {
  id: string;
  cart_id: string;
  design_slug: string;
  product_type_id: string;
  color_name: string;
  color_value: string;
  size?: string;
  quantity: number;
  unit_price_eur: number;
  is_saved_for_later: boolean;
  created_at: string;
}

export interface OrderRecord {
  id: string;
  order_number: string;
  user_id?: string;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  status: "placed" | "printing" | "inspection" | "dispatched" | "delivered" | "cancelled";
  step_index: number;
  currency: string;
  exchange_rate: number;
  subtotal_eur: number;
  discount_eur: number;
  shipping_eur: number;
  total_eur: number;
  coupon_code?: string;
  shipping_method: string;
  shipping_carrier: string;
  tracking_number?: string;
  tracking_url?: string;
  estimated_delivery: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    lines: string[];
    city: string;
    postal_code: string;
    country: string;
  };
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_method?: string;
  pod_provider: string;
  pod_external_id?: string;
  pod_status: string;
  created_at: string;
  updated_at: string;
  items?: OrderItemRecord[];
  status_history?: OrderStatusHistoryRecord[];
}

export interface OrderItemRecord {
  id: string;
  order_id: string;
  design_slug: string;
  design_name: string;
  product_type_id: string;
  product_name: string;
  color_name: string;
  color_value: string;
  size?: string;
  quantity: number;
  unit_price_eur: number;
  total_price_eur: number;
}

export interface OrderStatusHistoryRecord {
  id: string;
  order_id: string;
  status: string;
  step_index: number;
  title: string;
  description?: string;
  timestamp: string;
}

export interface ReturnRecord {
  id: string;
  rma_number: string;
  order_id: string;
  order_number: string;
  user_id?: string;
  customer_email: string;
  reason: "wrong_size" | "defective" | "style_preference" | "changed_mind";
  notes?: string;
  status: "requested" | "approved" | "item_received" | "refunded" | "rejected";
  refund_amount_eur: number;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriptionRecord {
  id: string;
  email: string;
  source: string;
  subscribed_at: string;
  is_active: boolean;
}
