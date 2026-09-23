/**
 * Cashfree checkout helper (client side).
 *
 * Flow: POST /api/cashfree/orders → load Cashfree.js → cashfree.checkout()
 * Cashfree redirects the browser back to /app/payment-result?gateway=cashfree&order_id=…
 * where PaymentResult polls GET /api/cashfree/orders/:orderId/status.
 */
import { load } from "@cashfreepayments/cashfree-js";
import { apiRequest, ApiError } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

export type CashfreeCheckoutType = "credits" | "plan" | "phone_number";
export type CashfreeEnvironment = "sandbox" | "production";

export interface StartCashfreeCheckoutInput {
  type: CashfreeCheckoutType;
  planId?: string;
  packageId?: string;
  billingPeriod?: "monthly" | "yearly";
  /** Phone number rental: number picked from the Plivo search result */
  phoneNumber?: string;
  country?: string;
  /** Plivo number type of the picked number (local | toll_free | national) — lets the server re-verify availability */
  numberType?: string;
  /** Legacy alias kept for callers that already hold a row id */
  phoneNumberId?: string;
}

export interface CashfreeOrderResponse {
  orderId: string;
  paymentSessionId: string;
  environment: CashfreeEnvironment;
  amount?: number;
  currency?: string;
  transactionId?: string;
  cfOrderId?: string;
}

export type CashfreeOrderStatus =
  | "PAID"
  | "ACTIVE"
  | "EXPIRED"
  | "TERMINATED"
  | "TERMINATION_REQUESTED"
  | "FAILED";

export interface CashfreeOrderStatusResponse {
  orderId: string;
  status: CashfreeOrderStatus | string;
  paymentStatus: "SUCCESS" | "FAILED" | "PENDING" | "USER_DROPPED" | "NOT_ATTEMPTED" | "CANCELLED" | "VOID" | null;
  transactionId: string | null;
  /** fulfilment_failed = paid, but provisioning gave up after retries (support resolves; never retry the checkout) */
  transactionStatus: "pending" | "completed" | "failed" | "refunded" | "partially_refunded" | "fulfilment_failed" | string;
  failureReason?: string | null;
  invoiceId: string | null;
  type: CashfreeCheckoutType | null;
  amount: number | null;
  currency: string | null;
  credits: number | null;
  planId: string | null;
  planName: string | null;
  billingPeriod: "monthly" | "yearly" | null;
  phoneNumber: string | null;
  paymentMethod: string | null;
  completedAt: string | null;
}

export interface CashfreePublicConfig {
  gateway?: string;
  cashfreeEnabled: boolean;
  cashfreeAppId?: string | null;
  cashfreeEnvironment?: CashfreeEnvironment;
  currency?: string;
  currencySymbol?: string;
  phoneNumberPriceInr?: number;
}

export const PAYMENT_GATEWAY_QUERY_KEY = ["/api/settings/payment-gateway"] as const;

/** Format an INR amount (string or number) as "₹1,234.00". */
export function formatInr(amount: string | number | null | undefined): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount ?? 0;
  const safe = Number.isFinite(value) ? (value as number) : 0;
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(safe);
  } catch {
    return `₹${safe.toFixed(2)}`;
  }
}

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) return error.message || fallback;
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}

/**
 * Creates a Cashfree order on the server and hands the browser to Cashfree checkout.
 * Resolves after the redirect has been requested; rejects (after showing a toast) on failure.
 */
export async function startCashfreeCheckout(input: StartCashfreeCheckoutInput): Promise<CashfreeOrderResponse> {
  const body: Record<string, unknown> = { type: input.type };
  if (input.type === "plan") {
    body.planId = input.planId;
    body.billingPeriod = input.billingPeriod || "monthly";
  } else if (input.type === "credits") {
    body.packageId = input.packageId;
  } else {
    if (input.phoneNumber) body.phoneNumber = input.phoneNumber;
    if (input.country) body.country = input.country;
    if (input.numberType) body.numberType = input.numberType;
    if (input.phoneNumberId) body.phoneNumberId = input.phoneNumberId;
  }

  try {
    const response = await apiRequest("POST", "/api/cashfree/orders", body);
    const order = (await response.json()) as CashfreeOrderResponse;
    if (!order?.paymentSessionId) {
      throw new Error("Cashfree did not return a payment session");
    }

    const cashfree = await load({ mode: order.environment === "production" ? "production" : "sandbox" });
    if (!cashfree) {
      throw new Error("Cashfree checkout could not be loaded. Please disable ad blockers and try again.");
    }

    const result = await cashfree.checkout({ paymentSessionId: order.paymentSessionId, redirectTarget: "_self" });
    if (result && "error" in result && result.error) {
      throw new Error(result.error.message || "Cashfree checkout failed");
    }
    return order;
  } catch (error) {
    toast({
      title: "Payment could not be started",
      description: errorMessage(error, "Please try again in a moment."),
      variant: "destructive",
    });
    throw error;
  }
}

/** Polls the order status endpoint once. */
export async function fetchCashfreeOrderStatus(orderId: string): Promise<CashfreeOrderStatusResponse> {
  const response = await apiRequest("GET", `/api/cashfree/orders/${encodeURIComponent(orderId)}/status`);
  return (await response.json()) as CashfreeOrderStatusResponse;
}
