import { describe, it, expect, vi } from "vitest";

// dnd-service imports the DB for the list operations; only normalizePhone (pure) is under test.
vi.mock("../server/db", () => ({ db: {} }));

import { normalizePhone, DND_REASONS } from "../server/services/dnd-service";

describe("dnd-service normalizePhone", () => {
  it("assumes India for bare 10-digit and 0-prefixed 11-digit numbers", () => {
    expect(normalizePhone("9876543210")).toBe("+919876543210");
    expect(normalizePhone("98765 43210")).toBe("+919876543210");
    expect(normalizePhone("09876543210")).toBe("+919876543210");
    expect(normalizePhone("(987) 654-3210")).toBe("+919876543210");
  });

  it("strips a 00 international prefix, then applies the +91 rule to 10-digit numbers", () => {
    expect(normalizePhone("009876543210")).toBe("+919876543210");
    expect(normalizePhone("00919876543210")).toBe("+919876543210");
    expect(normalizePhone("0044 2079460000")).toBe("+442079460000");
  });

  it("keeps an explicit + number as-is (no country guessing)", () => {
    expect(normalizePhone("+919876543210")).toBe("+919876543210");
    expect(normalizePhone("+1 (415) 555-0100")).toBe("+14155550100");
    expect(normalizePhone("+9876543210")).toBe("+9876543210"); // 10 digits with a plus are not prefixed with 91
    expect(normalizePhone("+09876543210")).toBe("+09876543210");
  });

  it("passes other lengths through unchanged when dialable", () => {
    expect(normalizePhone("12345678")).toBe("+12345678");      // 8 digits, minimum
    expect(normalizePhone("919876543210")).toBe("+919876543210"); // already has country code
    expect(normalizePhone("123456789012345")).toBe("+123456789012345"); // 15 digits, maximum
  });

  it("strips channel prefixes and whitespace, and accepts non-string input", () => {
    expect(normalizePhone("whatsapp:+919876543210")).toBe("+919876543210");
    expect(normalizePhone("TEL:9876543210")).toBe("+919876543210");
    expect(normalizePhone("  phone:09876543210  ")).toBe("+919876543210");
    expect(normalizePhone(9876543210)).toBe("+919876543210");
  });

  it("returns '' for non-dialable input", () => {
    expect(normalizePhone("")).toBe("");
    expect(normalizePhone(null)).toBe("");
    expect(normalizePhone(undefined)).toBe("");
    expect(normalizePhone("a@b.com")).toBe("");
    expect(normalizePhone("abc")).toBe("");
    expect(normalizePhone("+")).toBe("");
    expect(normalizePhone("1234567")).toBe("");            // 7 digits, too short
    expect(normalizePhone("1234567890123456")).toBe("");   // 16 digits, too long
    expect(normalizePhone("+1234567")).toBe("");
  });

  it("is idempotent", () => {
    for (const raw of ["9876543210", "09876543210", "+14155550100", "00919876543210"]) {
      const once = normalizePhone(raw);
      expect(normalizePhone(once)).toBe(once);
    }
  });

  it("exposes the DND reason list", () => {
    expect(DND_REASONS).toEqual(["caller_request", "manual", "import", "complaint"]);
  });
});
