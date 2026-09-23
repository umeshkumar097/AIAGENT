import { describe, it, expect, vi, beforeEach } from "vitest";

// invoice-gst imports `storage` (→ `db`, which throws without DATABASE_URL). Neither is needed
// for the pure math; quotePrice reads seller settings through storage.getGlobalSetting.
vi.mock("../server/db", () => ({ db: {} }));
vi.mock("../server/storage", () => ({ storage: { getGlobalSetting: vi.fn() } }));

import { storage } from "../server/storage";
import {
  computeGst,
  computeGstExclusive,
  computeGstForPrice,
  quotePrice,
  round2,
  resolveStateCode,
  amountInWordsINR,
  integerToIndianWords,
  getFinancialYear,
  settingBool,
  invoiceNumberToFilename,
  INVOICE_SETTING_DEFAULTS,
} from "../server/engines/payment/invoice-gst";

const getGlobalSetting = storage.getGlobalSetting as unknown as ReturnType<typeof vi.fn>;

/** Make storage.getGlobalSetting answer from a key→value map (missing keys → undefined). */
function useSettings(values: Record<string, unknown>) {
  getGlobalSetting.mockReset();
  getGlobalSetting.mockImplementation(async (key: string) =>
    key in values ? { key, value: values[key] } : undefined,
  );
}

describe("round2", () => {
  it("rounds half-up at two decimals and neutralises float noise", () => {
    expect(round2(1.005)).toBe(1.01);
    expect(round2(2.675)).toBe(2.68);
    expect(round2(0.1 + 0.2)).toBe(0.3);
    expect(round2(-1.005)).toBe(-1); // Math.round rounds -100.5 toward +inf
    expect(round2(0)).toBe(0);
  });
});

describe("computeGstExclusive (GST added on top of the list price)", () => {
  it("splits into CGST + SGST for intra-state", () => {
    const g = computeGstExclusive(1000, 18, false);
    expect(g).toEqual({
      total: 1180, taxableAmount: 1000, taxAmount: 180, cgst: 90, sgst: 90, igst: 0, taxRate: 18, isInterState: false,
    });
  });

  it("charges the whole tax as IGST for inter-state", () => {
    const g = computeGstExclusive(1000, 18, true);
    expect(g).toMatchObject({ total: 1180, taxableAmount: 1000, taxAmount: 180, cgst: 0, sgst: 0, igst: 180, isInterState: true });
  });

  it("keeps cgst + sgst === taxAmount even when the half is an odd paisa", () => {
    // 100.05 × 18% = 18.009 → 18.01; half = 9.005 → 9.01, so sgst must absorb the remainder (9.00)
    const g = computeGstExclusive(100.05, 18, false);
    expect(g.taxAmount).toBe(18.01);
    expect(g.cgst).toBe(9.01);
    expect(g.sgst).toBe(9);
    expect(round2(g.cgst + g.sgst)).toBe(g.taxAmount);
    expect(round2(g.taxableAmount + g.taxAmount)).toBe(g.total);
  });

  it("rounds the taxable base itself to paise", () => {
    const g = computeGstExclusive(999.999, 18, false);
    expect(g.taxableAmount).toBe(1000);
    expect(g.total).toBe(1180);
  });

  it("clamps negative amounts and rates to zero", () => {
    expect(computeGstExclusive(-500, 18, false)).toMatchObject({ total: 0, taxableAmount: 0, taxAmount: 0 });
    expect(computeGstExclusive(500, -18, false)).toMatchObject({ total: 500, taxableAmount: 500, taxAmount: 0, taxRate: 0 });
  });

  it("is a no-op split at a 0% rate", () => {
    expect(computeGstExclusive(250, 0, true)).toMatchObject({ total: 250, taxableAmount: 250, taxAmount: 0, igst: 0 });
  });
});

describe("computeGst (list price already includes GST)", () => {
  it("backs the taxable value out of the inclusive total", () => {
    const g = computeGst(1180, 18, false);
    expect(g).toMatchObject({ total: 1180, taxableAmount: 1000, taxAmount: 180, cgst: 90, sgst: 90, igst: 0 });
  });

  it("uses the total as taxable when the rate is 0", () => {
    expect(computeGst(999, 0, false)).toMatchObject({ total: 999, taxableAmount: 999, taxAmount: 0 });
  });

  it("keeps taxable + tax === total after rounding", () => {
    const g = computeGst(999, 18, true);
    expect(g.taxableAmount).toBe(846.61);
    expect(g.taxAmount).toBe(152.39);
    expect(round2(g.taxableAmount + g.taxAmount)).toBe(999);
    expect(g.igst).toBe(152.39);
  });
});

describe("computeGstForPrice", () => {
  it("treats the list price as taxable when prices exclude GST", () => {
    const g = computeGstForPrice(500, 18, false, false);
    expect(g.taxableAmount).toBe(500);
    expect(g.total).toBe(590);
  });

  it("treats the list price as the total when prices include GST", () => {
    const g = computeGstForPrice(590, 18, false, true);
    expect(g.total).toBe(590);
    expect(g.taxableAmount).toBe(500);
  });

  it("gives the same tax either way for equivalent prices", () => {
    expect(computeGstForPrice(500, 18, true, false).taxAmount).toBe(computeGstForPrice(590, 18, true, true).taxAmount);
  });
});

describe("quotePrice (seller settings from globalSettings)", () => {
  beforeEach(() => useSettings({}));

  it("defaults: seller in UP (09), buyer in UP → CGST + SGST on top of the list price", async () => {
    const q = await quotePrice(1000, "09");
    expect(q).toMatchObject({
      listPrice: 1000, pricesIncludeGst: false, buyerStateCode: "09", sellerStateCode: "09",
      isInterState: false, taxableAmount: 1000, taxAmount: 180, cgst: 90, sgst: 90, igst: 0, total: 1180, taxRate: 18,
    });
  });

  it("buyer in another state → IGST", async () => {
    const q = await quotePrice(1000, "27");
    expect(q).toMatchObject({ buyerStateCode: "27", isInterState: true, igst: 180, cgst: 0, sgst: 0, total: 1180 });
  });

  it("resolves buyer state names and aliases, not only codes", async () => {
    expect((await quotePrice(100, "Maharashtra")).isInterState).toBe(true);
    expect((await quotePrice(100, "Uttar Pradesh")).isInterState).toBe(false);
    expect((await quotePrice(100, "up")).isInterState).toBe(false);
    expect((await quotePrice(100, "9")).buyerStateCode).toBe("09");
    expect((await quotePrice(100, "09 - Uttar Pradesh")).buyerStateCode).toBe("09");
  });

  it("unknown / missing buyer state is treated as intra-state", async () => {
    for (const buyer of [null, undefined, "", "Narnia", "99"]) {
      const q = await quotePrice(100, buyer);
      expect(q.buyerStateCode).toBeNull();
      expect(q.isInterState).toBe(false);
      expect(q.cgst + q.sgst).toBe(q.taxAmount);
    }
  });

  it("honours the seller state, rate and prices-include-GST settings", async () => {
    useSettings({
      invoice_seller_state_code: "Maharashtra",
      invoice_gst_rate: "12",
      invoice_prices_include_gst: "true",
    });
    const q = await quotePrice(1120, "27");
    expect(q.sellerStateCode).toBe("27");
    expect(q.isInterState).toBe(false);
    expect(q.pricesIncludeGst).toBe(true);
    expect(q.taxRate).toBe(12);
    expect(q.total).toBe(1120);
    expect(q.taxableAmount).toBe(1000);
    expect(q.taxAmount).toBe(120);
    expect(q.cgst).toBe(60);
    expect(q.sgst).toBe(60);

    // Same seller, buyer in UP → now inter-state
    expect((await quotePrice(1120, "09")).igst).toBe(120);
  });

  it("falls back to the default rate when the stored rate is out of range or garbage", async () => {
    useSettings({ invoice_gst_rate: "abc" });
    expect((await quotePrice(100, "09")).taxRate).toBe(INVOICE_SETTING_DEFAULTS.invoice_gst_rate);
    useSettings({ invoice_gst_rate: 150 });
    expect((await quotePrice(100, "09")).taxRate).toBe(INVOICE_SETTING_DEFAULTS.invoice_gst_rate);
    useSettings({ invoice_gst_rate: '"5"' }); // JSON-quoted string in the settings table
    expect((await quotePrice(100, "09")).taxRate).toBe(5);
  });

  it("rounds the list price it echoes back", async () => {
    const q = await quotePrice(99.999, "09");
    expect(q.listPrice).toBe(100);
    expect(q.taxableAmount).toBe(100);
  });
});

describe("resolveStateCode", () => {
  it("accepts codes, padded codes, names, aliases and prefixed labels", () => {
    expect(resolveStateCode("09")).toBe("09");
    expect(resolveStateCode("9")).toBe("09");
    expect(resolveStateCode(" Uttar   Pradesh ")).toBe("09");
    expect(resolveStateCode("ORISSA")).toBe("21");
    expect(resolveStateCode("27 – Maharashtra")).toBe("27");
    expect(resolveStateCode("New Delhi")).toBe("07");
  });

  it("rejects unknown codes, unknown names and empty input", () => {
    expect(resolveStateCode("25")).toBeNull(); // no state 25 in the table
    expect(resolveStateCode("00")).toBeNull();
    expect(resolveStateCode("Atlantis")).toBeNull();
    expect(resolveStateCode("")).toBeNull();
    expect(resolveStateCode(null)).toBeNull();
    expect(resolveStateCode(undefined)).toBeNull();
    expect(resolveStateCode("123")).toBeNull();
  });
});

describe("amount in words (Indian numbering)", () => {
  it("uses crore / lakh / thousand groupings", () => {
    expect(integerToIndianWords(0)).toBe("Zero");
    expect(integerToIndianWords(19)).toBe("Nineteen");
    expect(integerToIndianWords(21)).toBe("Twenty One");
    expect(integerToIndianWords(100)).toBe("One Hundred");
    expect(integerToIndianWords(1250)).toBe("One Thousand Two Hundred Fifty");
    expect(integerToIndianWords(100000)).toBe("One Lakh");
    expect(integerToIndianWords(12345678)).toBe("One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight");
    expect(integerToIndianWords(1000000000)).toBe("One Hundred Crore");
  });

  it("adds paise only when present and handles float paise", () => {
    expect(amountInWordsINR(1250)).toBe("Rupees One Thousand Two Hundred Fifty Only");
    expect(amountInWordsINR(1250.5)).toBe("Rupees One Thousand Two Hundred Fifty and Fifty Paise Only");
    expect(amountInWordsINR(0.07)).toBe("Rupees Zero and Seven Paise Only");
    expect(amountInWordsINR(-10.25)).toBe("Rupees Ten and Twenty Five Paise Only");
  });
});

describe("getFinancialYear (April–March, IST)", () => {
  it("rolls over on 1 April IST, not UTC", () => {
    expect(getFinancialYear(new Date("2026-03-31T18:29:00Z"))).toBe("25-26"); // 23:59 IST 31 Mar
    expect(getFinancialYear(new Date("2026-03-31T18:30:00Z"))).toBe("26-27"); // 00:00 IST 1 Apr
    expect(getFinancialYear(new Date("2026-09-23T00:00:00Z"))).toBe("26-27");
    expect(getFinancialYear(new Date("2027-01-15T00:00:00Z"))).toBe("26-27");
  });
});

describe("settingBool", () => {
  it("parses common truthy/falsy spellings and falls back otherwise", () => {
    expect(settingBool(true, false)).toBe(true);
    expect(settingBool("TRUE", false)).toBe(true);
    expect(settingBool('"1"', false)).toBe(true);
    expect(settingBool("no", true)).toBe(false);
    expect(settingBool(0, true)).toBe(false);
    expect(settingBool("maybe", true)).toBe(true);
    expect(settingBool(null, false)).toBe(false);
  });
});

describe("invoiceNumberToFilename", () => {
  it("replaces every run of non-filename characters with a single dash", () => {
    expect(invoiceNumberToFilename("AIC/25-26/0001")).toBe("AIC-25-26-0001");
    expect(invoiceNumberToFilename("CN / 25 ")).toBe("CN-25-");
  });
});
