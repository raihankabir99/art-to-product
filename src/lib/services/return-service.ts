import { getSupabase } from "../supabase/client";
import { orderService } from "./order-service";
import type { ReturnRecord } from "../supabase/types";

const LOCAL_RETURNS_KEY = "an_returns_database";

export interface ReturnRequestInput {
  orderNumber: string;
  customerEmail: string;
  reason: "wrong_size" | "defective" | "style_preference" | "changed_mind";
  notes?: string;
  itemProductTypeId?: string;
  itemQuantity?: number;
}

export interface ReturnValidationResult {
  eligible: boolean;
  message: string;
  order?: ReturnRecord;
  daysRemaining?: number;
}

export const returnService = {
  getStoredReturns(): ReturnRecord[] {
    try {
      const raw = localStorage.getItem(LOCAL_RETURNS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  async checkEligibility(orderNumber: string, email: string): Promise<ReturnValidationResult> {
    const order = await orderService.getOrderByIdOrNumber(orderNumber);
    if (!order) {
      return {
        eligible: false,
        message: "Order number was not found. Please verify the order number on your receipt.",
      };
    }

    if (email && order.customer_email.toLowerCase() !== email.trim().toLowerCase()) {
      return {
        eligible: false,
        message: "The email address provided does not match the customer on this order.",
      };
    }

    const orderDate = new Date(order.created_at || Date.now());
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      return {
        eligible: false,
        message: `This order is beyond the 30-day return window (${diffDays} days since placement).`,
        daysRemaining: 0,
      };
    }

    // Check duplicate return
    const existing = this.getStoredReturns();
    const duplicate = existing.find(
      (r) => r.order_number === order.order_number && r.status !== "rejected",
    );
    if (duplicate) {
      return {
        eligible: false,
        message: `A return request (${duplicate.rma_number}) has already been initiated for this order. Status: ${duplicate.status}.`,
      };
    }

    return {
      eligible: true,
      message: `Eligible for return (${30 - diffDays} days remaining in return period).`,
      daysRemaining: 30 - diffDays,
    };
  },

  async createReturn(
    input: ReturnRequestInput,
  ): Promise<{ returnRecord: ReturnRecord | null; error?: string }> {
    const eligibility = await this.checkEligibility(input.orderNumber, input.customerEmail);
    if (!eligibility.eligible) {
      return { returnRecord: null, error: eligibility.message };
    }

    const order = await orderService.getOrderByIdOrNumber(input.orderNumber);
    if (!order) {
      return { returnRecord: null, error: "Order not found." };
    }

    const rmaNumber = `RMA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const returnRecord: ReturnRecord = {
      id: rmaNumber,
      rma_number: rmaNumber,
      order_id: order.id,
      order_number: order.order_number,
      user_id: order.user_id,
      customer_email: input.customerEmail,
      reason: input.reason,
      notes: input.notes,
      status: "requested",
      refund_amount_eur: order.total_eur,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from("returns").insert({
        rma_number: rmaNumber,
        order_id: order.id,
        user_id: order.user_id,
        customer_email: input.customerEmail,
        reason: input.reason,
        notes: input.notes,
        status: "requested",
        refund_amount_eur: order.total_eur,
      });
    }

    const stored = this.getStoredReturns();
    try {
      localStorage.setItem(LOCAL_RETURNS_KEY, JSON.stringify([returnRecord, ...stored]));
    } catch {
      // ignore
    }

    return { returnRecord };
  },

  async getReturnByRMA(rmaNumber: string): Promise<ReturnRecord | null> {
    const term = rmaNumber.trim().toUpperCase();
    const supabase = getSupabase();
    if (supabase) {
      const { data } = await supabase.from("returns").select("*").eq("rma_number", term).single();
      if (data) return data as ReturnRecord;
    }

    const stored = this.getStoredReturns();
    return stored.find((r) => r.rma_number === term) || null;
  },
};
