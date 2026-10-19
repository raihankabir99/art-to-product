export interface PaymentIntentRequest {
  orderId: string;
  orderNumber: string;
  amountCents: number;
  currency: string;
  customerEmail: string;
  customerName?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  configured: boolean;
  status: "PAYMENT NOT CONFIGURED" | "requires_payment_method" | "succeeded" | "failed";
  clientSecret?: string;
  paymentId?: string;
  provider: "stripe" | "unconfigured";
  message: string;
}

export interface PaymentVerificationResult {
  paid: boolean;
  paymentId?: string;
  status: string;
  amountReceivedCents?: number;
  message: string;
}

export interface PaymentProvider {
  createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse>;
  verifyPayment(paymentId: string): Promise<PaymentVerificationResult>;
}

export class StripePaymentProvider implements PaymentProvider {
  private apiKey: string | undefined;

  constructor() {
    // Keep server-side secret key check
    this.apiKey = typeof process !== "undefined" ? process.env.STRIPE_SECRET_KEY : undefined;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  async createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    if (!this.isConfigured()) {
      return {
        configured: false,
        status: "PAYMENT NOT CONFIGURED",
        provider: "unconfigured",
        message:
          "Stripe gateway is not configured. Set STRIPE_SECRET_KEY in server environment to enable live card payments.",
      };
    }

    // When Stripe is configured, create real PaymentIntent
    try {
      const response = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to create server payment intent");
      }

      const data = await response.json();
      return {
        configured: true,
        status: "requires_payment_method",
        clientSecret: data.clientSecret,
        paymentId: data.paymentId,
        provider: "stripe",
        message: "Payment intent created successfully.",
      };
    } catch {
      return {
        configured: false,
        status: "PAYMENT NOT CONFIGURED",
        provider: "stripe",
        message: "Payment processing server endpoint unavailable.",
      };
    }
  }

  async verifyPayment(paymentId: string): Promise<PaymentVerificationResult> {
    if (!this.isConfigured() || !paymentId) {
      return {
        paid: false,
        status: "PAYMENT NOT CONFIGURED",
        message: "Payment cannot be marked as paid without verified provider confirmation.",
      };
    }

    return {
      paid: false,
      status: "pending_confirmation",
      message: "Awaiting webhook verification from Stripe.",
    };
  }
}

export const paymentProvider = new StripePaymentProvider();
