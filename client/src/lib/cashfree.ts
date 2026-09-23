/**
 * Cashfree checkout helper (client side).
 *
 * Flow: POST /api/cashfree/orders → load Cashfree.js → cashfree.checkout()
 * Cashfree redirects the browser back to /app/payment-result?gateway=cashfree&order_id=…
 * where PaymentResult polls GET /api/cashfree/orders/:orderId/status.
 *
 * Auto-renew (plans only): the first period is always paid with a one-time order; afterwards
 * POST /api/cashfree/subscriptions → cashfree.subscriptionsCheckout() authorises a mandate and
 * Cashfree returns to /app/payment-result?gateway=cashfree&subscription_id=zvsub_… where
 * PaymentResult polls GET /api/cashfree/subscriptions/:id/status.
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
  /** Plans only: remember that the user wants to set up auto-renew after this payment */
  autoRenew?: boolean;
}

/** GST breakdown computed by the server (quotePrice) — amounts in INR */
export interface PriceQuote {
  listPrice: number;
  pricesIncludeGst: boolean;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  isInterState: boolean;
  total: number;
  buyerStateCode: string | null;
  sellerStateCode: string;
}

export interface CheckoutQuoteParams {
  type: CashfreeCheckoutType;
  planId?: string;
  billingPeriod?: "monthly" | "yearly";
  packageId?: string;
  country?: string;
  /** Phone number rental: echoed back on the quote so the order summary can show the picked number */
  phoneNumber?: string;
  /** Overrides the buyer state saved on the user (re-quote before the billing details are saved) */
  stateCode?: string;
}

export interface CheckoutQuoteResponse {
  type: CashfreeCheckoutType;
  description: string;
  planId: string | null;
  planName: string | null;
  billingPeriod: "monthly" | "yearly" | null;
  credits: number | null;
  phoneNumber: string | null;
  country: string | null;
  quote: PriceQuote;
  autoRenewAvailable: boolean;
  hsnSac: string;
  currency: string;
}

export interface CashfreeOrderResponse {
  orderId: string;
  paymentSessionId: string;
  environment: CashfreeEnvironment;
  amount?: number;
  baseAmount?: number;
  taxAmount?: number;
  quote?: PriceQuote;
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
  /** GST breakdown the order was charged with (stored on the transaction at order creation) */
  quote?: PriceQuote | null;
  /** Plans: the order was placed with the auto-renew toggle on (Step 2 offered after success) */
  autoRenewRequested?: boolean;
  /** Plans: a mandate is already active for this subscription */
  autoRenewActive?: boolean;
}

/** Cashfree subscription_status values (unknown values are passed through as-is) */
export type CashfreeMandateStatus =
  | "INITIALIZED"
  | "BANK_APPROVAL_PENDING"
  | "ACTIVE"
  | "ON_HOLD"
  | "PAUSED"
  | "CUSTOMER_PAUSED"
  | "CANCELLED"
  | "CUSTOMER_CANCELLED"
  | "COMPLETED"
  | "EXPIRED"
  | "LINK_EXPIRED";

export interface AutoRenewSetupResponse {
  subscriptionId: string;
  subscriptionSessionId: string;
  environment: CashfreeEnvironment;
  amount: number;
  billingPeriod: "monthly" | "yearly";
  nextChargeAt: string | null;
}

export interface AutoRenewStatusResponse {
  subscriptionId: string;
  cfSubscriptionId: string | null;
  status: CashfreeMandateStatus | string;
  authorizationStatus: string | null;
  mandateStatus: string | null;
  autoRenew: boolean;
  paymentMethod: string | null;
  nextChargeAt: string | null;
  planName: string | null;
  billingPeriod: "monthly" | "yearly" | null;
  amount: number | null;
  currentPeriodEnd: string | null;
}

export interface CashfreePublicConfig {
  gateway?: string;
  cashfreeEnabled: boolean;
  cashfreeAppId?: string | null;
  cashfreeEnvironment?: CashfreeEnvironment;
  currency?: string;
  currencySymbol?: string;
  phoneNumberPriceInr?: number;
  /** GST rate in percent (default 18) */
  gstRate?: number;
  /** true = list prices already include GST (legacy); false = GST is added at checkout */
  pricesIncludeGst?: boolean;
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

/** Caption next to a list price: "+ 18% GST" when GST is added on top, "incl. GST" otherwise. */
export function gstLabel(rate: number | null | undefined, includes: boolean | null | undefined): string {
  if (includes) return "incl. GST";
  const pct = Number.isFinite(rate as number) && (rate as number) > 0 ? `${rate}%` : "";
  return pct ? `+ ${pct} GST` : "+ GST";
}

/** Human label for a Cashfree mandate payment group (upi | card | enach). */
export function mandateMethodLabel(method: string | null | undefined): string {
  switch ((method || "").toLowerCase()) {
    case "upi":
      return "UPI AutoPay";
    case "card":
      return "card";
    case "enach":
    case "nach":
      return "eNACH";
    default:
      return method || "your saved payment method";
  }
}

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) return error.message || fallback;
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}

async function loadCashfree(environment: CashfreeEnvironment | undefined) {
  const cashfree = await load({ mode: environment === "production" ? "production" : "sandbox" });
  if (!cashfree) {
    throw new Error("Cashfree checkout could not be loaded. Please disable ad blockers and try again.");
  }
  return cashfree;
}

/** Fetches the GST quote for a checkout item (amounts are computed on the server). */
export async function fetchCheckoutQuote(params: CheckoutQuoteParams): Promise<CheckoutQuoteResponse> {
  const query = new URLSearchParams({ type: params.type });
  if (params.type === "plan") {
    if (params.planId) query.set("planId", params.planId);
    query.set("billingPeriod", params.billingPeriod || "monthly");
  } else if (params.type === "credits") {
    if (params.packageId) query.set("packageId", params.packageId);
  } else if (params.country) {
    query.set("country", params.country);
    if (params.phoneNumber) query.set("phoneNumber", params.phoneNumber);
  }
  if (params.stateCode) query.set("stateCode", params.stateCode);
  const response = await apiRequest("GET", `/api/cashfree/quote?${query.toString()}`);
  return (await response.json()) as CheckoutQuoteResponse;
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
    body.autoRenew = !!input.autoRenew;
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

    const cashfree = await loadCashfree(order.environment);
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

/**
 * Step 2 after a paid plan: creates the Cashfree subscription (mandate) for the caller's active
 * plan and hands the browser to the authorisation page (₹1 verification, refunded).
 */
export async function startAutoRenewSetup(): Promise<AutoRenewSetupResponse> {
  try {
    const response = await apiRequest("POST", "/api/cashfree/subscriptions", {});
    const setup = (await response.json()) as AutoRenewSetupResponse;
    if (!setup?.subscriptionSessionId) {
      throw new Error("Cashfree did not return a subscription session");
    }
    const cashfree = await loadCashfree(setup.environment);
    const result = await cashfree.subscriptionsCheckout({ subsSessionId: setup.subscriptionSessionId, redirectTarget: "_self" });
    if (result && "error" in result && result.error) {
      throw new Error(result.error.message || "Cashfree mandate setup failed");
    }
    return setup;
  } catch (error) {
    toast({
      title: "Auto-renew could not be started",
      description: errorMessage(error, "Please try again in a moment."),
      variant: "destructive",
    });
    throw error;
  }
}

/** Polls the mandate status endpoint once (also syncs the row on the server). */
export async function fetchAutoRenewStatus(subscriptionId: string): Promise<AutoRenewStatusResponse> {
  const response = await apiRequest("GET", `/api/cashfree/subscriptions/${encodeURIComponent(subscriptionId)}/status`);
  return (await response.json()) as AutoRenewStatusResponse;
}

/** Cancels the mandate; the already-paid period stays active until currentPeriodEnd. */
export async function cancelAutoRenew(): Promise<{ success: boolean; currentPeriodEnd: string | null }> {
  const response = await apiRequest("POST", "/api/cashfree/subscriptions/cancel", {});
  return (await response.json()) as { success: boolean; currentPeriodEnd: string | null };
}

/** Polls the order status endpoint once. */
export async function fetchCashfreeOrderStatus(orderId: string): Promise<CashfreeOrderStatusResponse> {
  const response = await apiRequest("GET", `/api/cashfree/orders/${encodeURIComponent(orderId)}/status`);
  return (await response.json()) as CashfreeOrderStatusResponse;
}
