/**
 * Checkout helpers — query-string parsing, billing form state and validation.
 * Amounts never come from here: the server quotes and charges from plan / package rows.
 */
import type { TFunction } from "i18next";
import type { CashfreeCheckoutType } from "@/lib/cashfree";
import { GSTIN_REGEX, stateNameForCode } from "@/lib/indian-states";

export interface CheckoutItem {
  type: CashfreeCheckoutType;
  planId?: string;
  billingPeriod?: "monthly" | "yearly";
  packageId?: string;
  phoneNumber?: string;
  country?: string;
  numberType?: string;
}

/** Parses /app/checkout?type=… into a checkout item; null when the query is incomplete. */
export function parseCheckoutParams(search: string): CheckoutItem | null {
  const params = new URLSearchParams(search);
  const type = params.get("type");
  if (type === "plan") {
    const planId = params.get("planId");
    if (!planId) return null;
    const period = params.get("period") === "yearly" ? "yearly" : "monthly";
    return { type, planId, billingPeriod: period };
  }
  if (type === "credits") {
    const packageId = params.get("packageId");
    return packageId ? { type, packageId } : null;
  }
  if (type === "phone_number") {
    const phoneNumber = params.get("phoneNumber");
    const country = params.get("country");
    if (!phoneNumber || !country) return null;
    return { type, phoneNumber, country: country.toUpperCase(), numberType: params.get("numberType") || undefined };
  }
  return null;
}

/** Where "Change" / "Back" leads for each item type */
export function backPathFor(item: CheckoutItem | null): string {
  if (!item) return "/app/billing";
  if (item.type === "plan") return "/app/billing?tab=plans";
  if (item.type === "credits") return "/app/billing?tab=packs";
  return "/app/phone-numbers";
}

export interface CheckoutUser {
  name?: string | null;
  email?: string | null;
  company?: string | null;
  billingName?: string | null;
  billingAddressLine1?: string | null;
  billingAddressLine2?: string | null;
  billingCity?: string | null;
  billingState?: string | null;
  billingStateCode?: string | null;
  billingPostalCode?: string | null;
  billingPhone?: string | null;
  gstin?: string | null;
}

export interface BillingForm {
  billingName: string;
  company: string;
  gstin: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingStateCode: string;
  billingPostalCode: string;
  billingPhone: string;
}

export type BillingFormErrors = Partial<Record<keyof BillingForm, string>>;

export const EMPTY_BILLING_FORM: BillingForm = {
  billingName: "",
  company: "",
  gstin: "",
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingCity: "",
  billingStateCode: "",
  billingPostalCode: "",
  billingPhone: "",
};

export function billingFormFromUser(user: CheckoutUser): BillingForm {
  const gstin = (user.gstin || "").toUpperCase();
  const gstinState = gstinStateCode(gstin);
  return {
    billingName: user.billingName || user.name || "",
    company: user.company || "",
    gstin,
    billingAddressLine1: user.billingAddressLine1 || "",
    billingAddressLine2: user.billingAddressLine2 || "",
    billingCity: user.billingCity || "",
    billingStateCode: gstinState || user.billingStateCode || "",
    billingPostalCode: user.billingPostalCode || "",
    billingPhone: user.billingPhone || "",
  };
}

/** First two digits of a GSTIN when they are a known GST state code */
export function gstinStateCode(gstin: string): string | undefined {
  const code = gstin.trim().slice(0, 2);
  return code.length === 2 && stateNameForCode(code) ? code : undefined;
}

const INDIAN_MOBILE = /^[6-9][0-9]{9}$/;
const INTERNATIONAL = /^\+[1-9][0-9]{6,14}$/;

export function normalizePhone(value: string): string {
  const compact = value.replace(/[\s()-]/g, "");
  if (/^(\+91|0091)[6-9][0-9]{9}$/.test(compact)) return compact.slice(-10);
  if (/^0[6-9][0-9]{9}$/.test(compact)) return compact.slice(1);
  return compact;
}

export function isValidBillingPhone(value: string): boolean {
  const phone = normalizePhone(value);
  return INDIAN_MOBILE.test(phone) || INTERNATIONAL.test(phone);
}

export function validateBillingForm(form: BillingForm, t: TFunction): BillingFormErrors {
  const errors: BillingFormErrors = {};
  const required = t("billing.checkout.required", "Required");
  if (!form.billingName.trim()) errors.billingName = required;
  if (!form.billingAddressLine1.trim()) errors.billingAddressLine1 = required;
  if (!form.billingCity.trim()) errors.billingCity = required;
  if (!form.billingStateCode) errors.billingStateCode = required;
  if (!form.billingPostalCode.trim()) errors.billingPostalCode = required;
  else if (!/^[1-9][0-9]{5}$/.test(form.billingPostalCode.trim())) {
    errors.billingPostalCode = t("billing.checkout.pinInvalid", "Enter a valid 6-digit PIN code.");
  }
  if (!form.billingPhone.trim()) errors.billingPhone = required;
  else if (!isValidBillingPhone(form.billingPhone)) {
    errors.billingPhone = t("billing.checkout.phoneInvalid", "Enter a 10-digit Indian mobile number or an international number with country code.");
  }
  const gstin = form.gstin.trim().toUpperCase();
  if (gstin && !GSTIN_REGEX.test(gstin)) {
    errors.gstin = t("settings.billingDetails.gstinInvalid", "Enter a valid 15-character GSTIN (e.g. 09ABCDE1234F1Z5).");
  } else if (gstin && form.billingStateCode && gstin.slice(0, 2) !== form.billingStateCode) {
    errors.gstin = t("settings.billingDetails.gstinStateMismatch", "The GSTIN state code ({{code}}) does not match the selected state.", { code: gstin.slice(0, 2) });
  }
  return errors;
}

/** Body for PATCH /api/auth/me — same fields as the Settings → Billing details section */
export function billingPayload(form: BillingForm): Record<string, string | null> {
  const gstin = form.gstin.trim().toUpperCase();
  return {
    billingName: form.billingName.trim() || null,
    company: form.company.trim() || null,
    billingAddressLine1: form.billingAddressLine1.trim() || null,
    billingAddressLine2: form.billingAddressLine2.trim() || null,
    billingCity: form.billingCity.trim() || null,
    billingState: stateNameForCode(form.billingStateCode) || null,
    billingStateCode: form.billingStateCode || null,
    billingPostalCode: form.billingPostalCode.trim() || null,
    billingCountry: "India",
    billingPhone: normalizePhone(form.billingPhone) || null,
    gstin: gstin || null,
  };
}
