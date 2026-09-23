'use strict';
/**
 * GST helpers for Indian tax invoices: seller settings, financial year,
 * state codes, tax-inclusive split (CGST/SGST vs IGST) and amount in words.
 * Pure functions — no DB access except getSellerInfo (reads globalSettings).
 */
import { storage } from '../../storage';

export const INVOICE_SETTING_DEFAULTS = {
  invoice_seller_name: 'Aiclex Solutions Pvt. Ltd.',
  invoice_seller_trade_name: 'AICLEX Technologies',
  invoice_seller_gstin: '09ABGCA0151N1ZL',
  invoice_seller_cin: 'U62099UW2026PTC254970',
  invoice_seller_dpiit: 'DIPP271379',
  invoice_seller_address: 'E58, Sector 3, Noida, UP – 201301',
  invoice_seller_state_code: '09',
  invoice_seller_email: '',
  invoice_seller_phone: '',
  invoice_prefix: 'AIC',
  invoice_gst_rate: 18,
  invoice_hsn_sac: '998314',
  invoice_footer_text: '',
  invoice_logo_url: '',
  /** 'true' → list prices already include GST (legacy); 'false' → GST is added on top at checkout */
  invoice_prices_include_gst: 'false',
} as const;

export type InvoiceSettingKey = keyof typeof INVOICE_SETTING_DEFAULTS;
export const INVOICE_SETTING_KEYS = Object.keys(INVOICE_SETTING_DEFAULTS) as InvoiceSettingKey[];

export const CREDIT_NOTE_PREFIX = 'CN';
export const INVOICE_TIMEZONE = 'Asia/Kolkata';

/** GST state codes (Indian states and union territories) */
export const GST_STATE_CODES: Record<string, string> = {
  '01': 'Jammu and Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh',
  '05': 'Uttarakhand', '06': 'Haryana', '07': 'Delhi', '08': 'Rajasthan', '09': 'Uttar Pradesh',
  '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh', '13': 'Nagaland', '14': 'Manipur',
  '15': 'Mizoram', '16': 'Tripura', '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal',
  '20': 'Jharkhand', '21': 'Odisha', '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat',
  '26': 'Dadra and Nagar Haveli and Daman and Diu', '27': 'Maharashtra', '29': 'Karnataka', '30': 'Goa',
  '31': 'Lakshadweep', '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry',
  '35': 'Andaman and Nicobar Islands', '36': 'Telangana', '37': 'Andhra Pradesh', '38': 'Ladakh',
  '97': 'Other Territory',
};

const STATE_ALIASES: Record<string, string> = {
  'orissa': '21', 'pondicherry': '34', 'uttaranchal': '05', 'new delhi': '07', 'nct of delhi': '07',
  'delhi (nct)': '07', 'jammu & kashmir': '01', 'dadra and nagar haveli': '26', 'daman and diu': '26',
  'andaman & nicobar islands': '35', 'up': '09', 'mp': '23', 'tn': '33', 'ap': '37', 'wb': '19',
  'hp': '02', 'j&k': '01', 'uk': '05', 'ka': '29', 'ts': '36', 'mh': '27', 'gj': '24', 'rj': '08',
  'dl': '07', 'hr': '06', 'pb': '03', 'br': '10', 'jh': '20', 'cg': '22', 'od': '21', 'kl': '32', 'ga': '30',
};

/** Resolve a GST state code from a stored code or a state name / abbreviation. */
export function resolveStateCode(codeOrName: string | null | undefined): string | null {
  if (!codeOrName) return null;
  const raw = String(codeOrName).trim();
  if (!raw) return null;
  const digits = raw.match(/^\d{1,2}$/);
  if (digits) {
    const padded = raw.padStart(2, '0');
    return GST_STATE_CODES[padded] ? padded : null;
  }
  const normalized = raw.toLowerCase().replace(/\s+/g, ' ');
  if (STATE_ALIASES[normalized]) return STATE_ALIASES[normalized];
  for (const [code, name] of Object.entries(GST_STATE_CODES)) {
    if (name.toLowerCase() === normalized) return code;
  }
  // "09 - Uttar Pradesh" style
  const prefixed = raw.match(/^(\d{2})\s*[-–]/);
  if (prefixed && GST_STATE_CODES[prefixed[1]]) return prefixed[1];
  return null;
}

export function stateNameForCode(code: string | null | undefined): string {
  if (!code) return '';
  return GST_STATE_CODES[code] || '';
}

/** Financial year label (Apr–Mar) in IST, e.g. '25-26' for 2025-04-01..2026-03-31 */
export function getFinancialYear(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: INVOICE_TIMEZONE, year: 'numeric', month: 'numeric',
  }).formatToParts(date);
  const year = Number(parts.find(p => p.type === 'year')?.value);
  const month = Number(parts.find(p => p.type === 'month')?.value);
  const startYear = month >= 4 ? year : year - 1;
  const yy = (n: number) => String(n % 100).padStart(2, '0');
  return `${yy(startYear)}-${yy(startYear + 1)}`;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export interface GstBreakdown {
  total: number;
  taxableAmount: number;
  taxAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  taxRate: number;
  isInterState: boolean;
}

function splitTax(total: number, taxableAmount: number, taxAmount: number, rate: number, isInterState: boolean): GstBreakdown {
  if (isInterState) {
    return { total, taxableAmount, taxAmount, cgst: 0, sgst: 0, igst: taxAmount, taxRate: rate, isInterState };
  }
  const cgst = round2(taxAmount / 2);
  const sgst = round2(taxAmount - cgst);
  return { total, taxableAmount, taxAmount, cgst, sgst, igst: 0, taxRate: rate, isInterState };
}

/**
 * GST-exclusive pricing: the list price is the taxable value and GST is added on top
 * (total = base + base × rate). Intra-state → CGST + SGST, otherwise IGST.
 */
export function computeGstExclusive(baseAmount: number, ratePercent: number, isInterState: boolean): GstBreakdown {
  const taxableAmount = round2(Math.max(0, baseAmount));
  const rate = Math.max(0, ratePercent);
  const taxAmount = round2(taxableAmount * rate / 100);
  const total = round2(taxableAmount + taxAmount);
  return splitTax(total, taxableAmount, taxAmount, rate, isInterState);
}

/** Picks inclusive or exclusive math for a list price depending on the seller setting. */
export function computeGstForPrice(listPrice: number, ratePercent: number, isInterState: boolean, pricesIncludeGst: boolean): GstBreakdown {
  return pricesIncludeGst ? computeGst(listPrice, ratePercent, isInterState) : computeGstExclusive(listPrice, ratePercent, isInterState);
}

/**
 * A checkout quote for one line item, stored on the transaction (metadata.gst) at order time so the
 * invoice reproduces exactly what the customer saw and paid.
 */
export interface PriceQuote extends GstBreakdown {
  /** The list price shown on the plan / pack (excl. GST unless pricesIncludeGst) */
  listPrice: number;
  pricesIncludeGst: boolean;
  /** Buyer GST state code used for the intra/inter-state decision (null → treated as intra-state) */
  buyerStateCode: string | null;
  sellerStateCode: string;
}

/** Quotes a list price for a buyer using the current seller settings (rate, state, inclusive flag). */
export async function quotePrice(listPrice: number, buyerStateCode: string | null | undefined): Promise<PriceQuote> {
  const seller = await getSellerInfo();
  const buyer = resolveStateCode(buyerStateCode) || null;
  // Unknown buyer state → intra-state (CGST+SGST), same rule as the invoice
  const isInterState = !!buyer && buyer !== seller.stateCode;
  const gst = computeGstForPrice(listPrice, seller.gstRate, isInterState, seller.pricesIncludeGst);
  return { ...gst, listPrice: round2(listPrice), pricesIncludeGst: seller.pricesIncludeGst, buyerStateCode: buyer, sellerStateCode: seller.stateCode };
}

/**
 * Prices are GST-inclusive: taxable = total / (1 + rate). Intra-state (buyer state == seller state)
 * splits the tax into CGST + SGST, otherwise the whole tax is IGST.
 */
export function computeGst(totalInclusive: number, ratePercent: number, isInterState: boolean): GstBreakdown {
  const total = round2(Math.max(0, totalInclusive));
  const rate = Math.max(0, ratePercent);
  const taxableAmount = rate > 0 ? round2(total / (1 + rate / 100)) : total;
  const taxAmount = round2(total - taxableAmount);
  return splitTax(total, taxableAmount, taxAmount, rate, isInterState);
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o ? `${TENS[t]} ${ONES[o]}` : TENS[t];
}

function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (h) parts.push(`${ONES[h]} Hundred`);
  if (rest) parts.push(twoDigits(rest));
  return parts.join(' ');
}

/** Integer to words using the Indian numbering system (crore / lakh / thousand). */
export function integerToIndianWords(value: number): string {
  let n = Math.floor(Math.abs(value));
  if (n === 0) return 'Zero';
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  if (crore) parts.push(`${integerToIndianWords(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (n) parts.push(threeDigits(n));
  return parts.join(' ');
}

/** "Rupees One Thousand Two Hundred and Fifty Paise Only" */
export function amountInWordsINR(amount: number): string {
  const abs = Math.abs(amount);
  const rupees = Math.floor(abs);
  const paise = Math.round((abs - rupees) * 100);
  let words = `Rupees ${integerToIndianWords(rupees)}`;
  if (paise > 0) words += ` and ${twoDigits(paise)} Paise`;
  return `${words} Only`;
}

export interface SellerInfo {
  name: string;
  tradeName: string;
  gstin: string;
  cin: string;
  dpiit: string;
  address: string;
  stateCode: string;
  email: string;
  phone: string;
  prefix: string;
  gstRate: number;
  hsnSac: string;
  footerText: string;
  logoUrl: string | null;
  /** false (default) → GST is added on top of list prices at checkout */
  pricesIncludeGst: boolean;
}

export function settingBool(value: unknown, fallback: boolean): boolean {
  if (value === true || value === false) return value;
  const str = settingString(value, '').toLowerCase();
  if (str === 'true' || str === '1' || str === 'yes') return true;
  if (str === 'false' || str === '0' || str === 'no') return false;
  return fallback;
}

function settingString(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback;
  let str = typeof value === 'string' ? value : String(value);
  while (str.length > 1 && str.startsWith('"') && str.endsWith('"')) str = str.slice(1, -1);
  const trimmed = str.trim();
  return trimmed || fallback;
}

/** Reads every invoice_* key from globalSettings with the Aiclex defaults. */
export async function getInvoiceSettings(): Promise<Record<InvoiceSettingKey, string | number>> {
  const result: Record<string, string | number> = { ...INVOICE_SETTING_DEFAULTS };
  for (const key of INVOICE_SETTING_KEYS) {
    const setting = await storage.getGlobalSetting(key);
    if (!setting || setting.value === null || setting.value === undefined) continue;
    if (key === 'invoice_gst_rate') {
      const rate = Number(settingString(setting.value, String(INVOICE_SETTING_DEFAULTS.invoice_gst_rate)));
      result[key] = Number.isFinite(rate) && rate >= 0 && rate <= 100 ? rate : INVOICE_SETTING_DEFAULTS.invoice_gst_rate;
    } else {
      result[key] = settingString(setting.value, INVOICE_SETTING_DEFAULTS[key] as string);
    }
  }
  return result as Record<InvoiceSettingKey, string | number>;
}

export async function getSellerInfo(): Promise<SellerInfo> {
  const s = await getInvoiceSettings();
  let logoUrl = String(s.invoice_logo_url || '');
  if (!logoUrl) {
    const branding = (await storage.getGlobalSetting('logo_url')) || (await storage.getGlobalSetting('logo_url_light'));
    logoUrl = settingString(branding?.value, '');
  }
  const prefix = String(s.invoice_prefix).replace(/[^A-Za-z0-9]/g, '').substring(0, 10) || INVOICE_SETTING_DEFAULTS.invoice_prefix;
  return {
    name: String(s.invoice_seller_name),
    tradeName: String(s.invoice_seller_trade_name),
    gstin: String(s.invoice_seller_gstin),
    cin: String(s.invoice_seller_cin),
    dpiit: String(s.invoice_seller_dpiit),
    address: String(s.invoice_seller_address),
    stateCode: resolveStateCode(String(s.invoice_seller_state_code)) || INVOICE_SETTING_DEFAULTS.invoice_seller_state_code,
    email: String(s.invoice_seller_email),
    phone: String(s.invoice_seller_phone),
    prefix,
    gstRate: Number(s.invoice_gst_rate),
    hsnSac: String(s.invoice_hsn_sac),
    footerText: String(s.invoice_footer_text),
    logoUrl: logoUrl || null,
    pricesIncludeGst: settingBool(s.invoice_prices_include_gst, false),
  };
}

/** Invoice numbers contain '/', which is not a valid filename character. */
export function invoiceNumberToFilename(invoiceNumber: string): string {
  return invoiceNumber.replace(/[^A-Za-z0-9_-]+/g, '-');
}
