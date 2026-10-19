import { getSupabase } from "../supabase/client";
import type { OrderRecord } from "../supabase/types";
import { shippingService } from "./shipping-service";
import { podProvider } from "./pod-provider";
import type { CartLine } from "@/components/store/store";
import { ORDERS as INITIAL_SAMPLE_ORDERS, type Order as UIOrder } from "../account-data";
import type { ProductTypeId } from "../catalog";

const LOCAL_ORDERS_KEY = "an_orders_database";

export interface CreateOrderInput {
  userId?: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  items: CartLine[];
  couponCode?: string;
  discountEur?: number;
  shippingMethodId: string;
  shippingAddress: {
    first_name: string;
    last_name: string;
    lines: string[];
    city: string;
    postal_code: string;
    country: string;
  };
  currency?: string;
  exchangeRate?: number;
}

export const orderService = {
  getInitialOrders(): OrderRecord[] {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }

    // Map initial sample orders as initial records
    const mapped: OrderRecord[] = INITIAL_SAMPLE_ORDERS.map((o) => ({
      id: o.id,
      order_number: o.id,
      customer_email: "ada@atelier-noir.com",
      customer_first_name: "Ada",
      customer_last_name: "Lindqvist",
      status: o.step === 6 ? "delivered" : "printing",
      step_index: o.step,
      currency: "EUR",
      exchange_rate: 1.0,
      subtotal_eur: o.total,
      discount_eur: 0,
      shipping_eur: 0,
      total_eur: o.total,
      shipping_method: "standard",
      shipping_carrier: o.carrier,
      tracking_number: o.tracking,
      estimated_delivery: o.eta,
      shipping_address: {
        first_name: "Ada",
        last_name: "Lindqvist",
        lines: o.address.slice(1, -2),
        city: "Amsterdam",
        postal_code: "1016 HD",
        country: "Netherlands",
      },
      payment_status: "paid",
      pod_provider: "internal",
      pod_status: "completed",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: o.items.map((i, idx) => ({
        id: `item_${idx}_${o.id}`,
        order_id: o.id,
        design_slug: i.designSlug,
        design_name: i.designName,
        product_type_id: i.productId,
        product_name: i.productName,
        color_name: i.color,
        color_value: i.colorValue,
        size: i.size,
        quantity: i.qty,
        unit_price_eur: i.price,
        total_price_eur: i.price * i.qty,
      })),
      status_history: [
        {
          id: `sh_1_${o.id}`,
          order_id: o.id,
          status: "placed",
          step_index: 0,
          title: "Order placed",
          timestamp: o.stamps[0] || "Recently",
        },
        {
          id: `sh_2_${o.id}`,
          order_id: o.id,
          status: "printing",
          step_index: 2,
          title: "Printing artwork on demand",
          timestamp: o.stamps[2] || "Recently",
        },
      ],
    }));

    try {
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(mapped));
    } catch {
      // ignore
    }

    return mapped;
  },

  async createOrder(
    input: CreateOrderInput,
  ): Promise<{ order: OrderRecord | null; error?: string }> {
    if (!input.items || input.items.length === 0) {
      return { order: null, error: "Cannot create an order with an empty cart." };
    }

    const subtotalEur = input.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discountEur = input.discountEur || 0;
    const discountedBase = Math.max(0, subtotalEur - discountEur);

    const shippingCalc = shippingService.calculateRates(
      input.shippingAddress.country,
      discountedBase,
    );
    const chosenMethod =
      shippingCalc.options.find((o) => o.id === input.shippingMethodId) || shippingCalc.options[0]!;
    const shippingEur = chosenMethod.priceEur;
    const totalEur = Math.round((discountedBase + shippingEur) * 100) / 100;

    const orderNumber = `AN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderRecord: OrderRecord = {
      id: orderNumber,
      order_number: orderNumber,
      user_id: input.userId,
      customer_email: input.customerEmail,
      customer_first_name: input.customerFirstName,
      customer_last_name: input.customerLastName,
      status: "placed",
      step_index: 0,
      currency: input.currency || "EUR",
      exchange_rate: input.exchangeRate || 1.0,
      subtotal_eur: subtotalEur,
      discount_eur: discountEur,
      shipping_eur: shippingEur,
      total_eur: totalEur,
      coupon_code: input.couponCode,
      shipping_method: chosenMethod.id,
      shipping_carrier: chosenMethod.carrier,
      tracking_number: `AN${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimated_delivery: chosenMethod.estimatedTransitDays,
      shipping_address: input.shippingAddress,
      payment_status: "pending",
      pod_provider: "internal",
      pod_status: "queued",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: input.items.map((i, idx) => ({
        id: `item_${idx}_${orderNumber}`,
        order_id: orderNumber,
        design_slug: i.designSlug,
        design_name: i.designName,
        product_type_id: i.productId,
        product_name: i.productName,
        color_name: i.color,
        color_value: i.colorValue,
        size: i.size,
        quantity: i.qty,
        unit_price_eur: i.price,
        total_price_eur: i.price * i.qty,
      })),
      status_history: [
        {
          id: `sh_${Date.now()}`,
          order_id: orderNumber,
          status: "placed",
          step_index: 0,
          title: "Order placed",
          description: "Payment authorized & design files queued for print inspection.",
          timestamp: new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    // Forward to POD abstraction
    await podProvider.submitOrder({
      orderNumber,
      recipient: {
        name: `${input.customerFirstName} ${input.customerLastName}`,
        address1: input.shippingAddress.lines[0] || "",
        address2: input.shippingAddress.lines[1],
        city: input.shippingAddress.city,
        zip: input.shippingAddress.postal_code,
        countryCode: input.shippingAddress.country,
        email: input.customerEmail,
      },
      items: input.items.map((i) => ({
        externalProductId: i.productId,
        variantId: `${i.productId}-${i.color}-${i.size || "one"}`,
        quantity: i.qty,
        artworkUrl: `/src/assets/art-${i.designSlug}.png`,
        designSlug: i.designSlug,
        productTypeId: i.productId,
        colorName: i.color,
        size: i.size,
      })),
    });

    const supabase = getSupabase();
    if (supabase) {
      const { error: insertError } = await supabase.from("orders").insert({
        order_number: orderNumber,
        user_id: input.userId || null,
        customer_email: input.customerEmail,
        customer_first_name: input.customerFirstName,
        customer_last_name: input.customerLastName,
        status: orderRecord.status,
        step_index: orderRecord.step_index,
        currency: orderRecord.currency,
        exchange_rate: orderRecord.exchange_rate,
        subtotal_eur: orderRecord.subtotal_eur,
        discount_eur: orderRecord.discount_eur,
        shipping_eur: orderRecord.shipping_eur,
        total_eur: orderRecord.total_eur,
        coupon_code: orderRecord.coupon_code,
        shipping_method: orderRecord.shipping_method,
        shipping_carrier: orderRecord.shipping_carrier,
        tracking_number: orderRecord.tracking_number,
        estimated_delivery: orderRecord.estimated_delivery,
        shipping_address: orderRecord.shipping_address,
        payment_status: orderRecord.payment_status,
      });

      if (!insertError && orderRecord.items) {
        await supabase.from("order_items").insert(
          orderRecord.items.map((i) => ({
            order_id: orderNumber,
            design_slug: i.design_slug,
            design_name: i.design_name,
            product_type_id: i.product_type_id,
            product_name: i.product_name,
            color_name: i.color_name,
            color_value: i.color_value,
            size: i.size || null,
            quantity: i.quantity,
            unit_price_eur: i.unit_price_eur,
            total_price_eur: i.total_price_eur,
          })),
        );
      }
    }

    // Persist to local cache
    const existing = this.getInitialOrders();
    const updated = [orderRecord, ...existing.filter((o) => o.order_number !== orderNumber)];
    try {
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return { order: orderRecord };
  },

  async getOrderByIdOrNumber(idOrNumber: string): Promise<OrderRecord | null> {
    const term = idOrNumber.trim().toUpperCase();
    if (!term) return null;
    const supabase = getSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("orders")
        .select("*, items:order_items(*), status_history:order_status_history(*)")
        .or(`order_number.eq.${term},id.eq.${term}`)
        .single();
      if (data) return data as OrderRecord;
    }

    const all = this.getInitialOrders();
    return (
      all.find(
        (o) =>
          o.order_number.toUpperCase() === term ||
          o.id.toUpperCase() === term ||
          o.order_number.toUpperCase().includes(term) ||
          term.includes(o.order_number.toUpperCase()),
      ) ||
      all[0] ||
      null
    );
  },

  async getOrdersForUser(userId: string, email?: string): Promise<OrderRecord[]> {
    const supabase = getSupabase();
    if (supabase) {
      const query = supabase
        .from("orders")
        .select("*, items:order_items(*), status_history:order_status_history(*)")
        .order("created_at", { ascending: false });

      if (userId) {
        query.eq("user_id", userId);
      } else if (email) {
        query.eq("customer_email", email);
      }

      const { data } = await query;
      if (data && data.length > 0) return data as OrderRecord[];
    }

    const all = this.getInitialOrders();
    return all.filter(
      (o) =>
        (userId && o.user_id === userId) ||
        (email && o.customer_email.toLowerCase() === email.toLowerCase()) ||
        true,
    );
  },

  mapRecordToUIOrder(record: OrderRecord): UIOrder {
    const addressLines = [
      `${record.customer_first_name} ${record.customer_last_name}`,
      ...(record.shipping_address?.lines || []),
      `${record.shipping_address?.postal_code || ""} ${record.shipping_address?.city || ""}`,
      record.shipping_address?.country || "Netherlands",
    ].filter(Boolean);

    const stamps: (string | undefined)[] = [
      new Date(record.created_at).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      record.step_index >= 1 ? "Step 1 confirmed" : undefined,
      record.step_index >= 2 ? "In print inspection" : undefined,
      record.step_index >= 3 ? "Quality check complete" : undefined,
      record.step_index >= 4 ? "Dispatched with carrier" : undefined,
      record.step_index >= 5 ? "Out for delivery" : undefined,
      record.step_index >= 6 ? "Delivered" : undefined,
    ];

    return {
      id: record.order_number,
      placed: new Date(record.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      step: record.step_index,
      total: record.total_eur,
      carrier: record.shipping_carrier,
      tracking: record.tracking_number || "Pending allocation",
      eta: record.estimated_delivery,
      address: addressLines,
      stamps,
      items: (record.items || []).map((i) => ({
        designSlug: i.design_slug,
        designName: i.design_name,
        productId: i.product_type_id as ProductTypeId,
        productName: i.product_name,
        color: i.color_name,
        colorValue: i.color_value,
        size: i.size || undefined,
        qty: i.quantity,
        price: i.unit_price_eur,
      })),
    };
  },
};
