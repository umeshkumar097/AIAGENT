declare module "@cashfreepayments/cashfree-js" {
  export type CashfreeMode = "sandbox" | "production";

  export interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | string;
    returnUrl?: string;
  }

  export interface CashfreeCheckoutResult {
    error?: { message?: string; code?: string };
    redirect?: boolean;
    paymentDetails?: { paymentMessage?: string };
  }

  export interface CashfreeSubscriptionsCheckoutOptions {
    subsSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | string;
  }

  export interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult | void>;
    /** Cashfree Subscriptions: hands the browser to the mandate authorisation page */
    subscriptionsCheckout(options: CashfreeSubscriptionsCheckoutOptions): Promise<CashfreeCheckoutResult | void>;
  }

  export function load(options: { mode: CashfreeMode }): Promise<CashfreeInstance | null>;
}
