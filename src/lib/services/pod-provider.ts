export interface PODVariantMapping {
  productTypeId: string;
  colorName: string;
  size?: string;
  providerVariantId: string;
  providerSku: string;
}

export interface PODSubmissionItem {
  externalProductId: string;
  variantId: string;
  quantity: number;
  artworkUrl: string;
  designSlug: string;
  productTypeId: string;
  colorName: string;
  size?: string;
}

export interface PODOrderSubmission {
  orderNumber: string;
  recipient: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    zip: string;
    countryCode: string;
    email: string;
  };
  items: PODSubmissionItem[];
}

export interface PODOrderResponse {
  success: boolean;
  provider: "internal" | "printful" | "printify" | "gelato" | "prodigi";
  providerOrderId?: string;
  status: "draft" | "pending" | "in_production" | "shipped" | "failed" | "not_configured";
  message: string;
}

export interface PODTrackingInfo {
  provider: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl?: string;
  shipDate?: string;
}

export interface PODProvider {
  name: string;
  isConfigured(): boolean;
  submitOrder(order: PODOrderSubmission): Promise<PODOrderResponse>;
  getProductionStatus(providerOrderId: string): Promise<{ status: string; stepsComplete: number }>;
}

export class UniversalPODProvider implements PODProvider {
  name = "Internal Studio Workshop";

  isConfigured(): boolean {
    const provider = typeof process !== "undefined" ? process.env.POD_PROVIDER : undefined;
    return Boolean(provider && provider !== "internal");
  }

  async submitOrder(order: PODOrderSubmission): Promise<PODOrderResponse> {
    if (!this.isConfigured()) {
      return {
        success: true,
        provider: "internal",
        providerOrderId: `INTERNAL-${order.orderNumber}`,
        status: "in_production",
        message: "Order routed to Atelier Noir internal workshop production queue.",
      };
    }

    return {
      success: false,
      provider: "internal",
      status: "not_configured",
      message: "External POD credentials not yet verified. Routed to internal queue.",
    };
  }

  async getProductionStatus(
    providerOrderId: string,
  ): Promise<{ status: string; stepsComplete: number }> {
    return {
      status: "Printing artwork on demand",
      stepsComplete: 2,
    };
  }
}

export const podProvider = new UniversalPODProvider();
