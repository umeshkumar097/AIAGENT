import { describe, it, expect } from "vitest";
import {
  zonedDateTimeToUtc, formatIsoWithOffset, isValidTimeZone, splitName, digitsOnly, str, asObject, DEFAULT_TIMEZONE,
} from "../server/integrations/normalize";

const IST = "Asia/Kolkata";
const NY = "America/New_York";

describe("zonedDateTimeToUtc", () => {
  it("converts a wall-clock date/time in a zone to the UTC instant", () => {
    expect(zonedDateTimeToUtc("2026-03-08", "12:30", IST)?.toISOString()).toBe("2026-03-08T07:00:00.000Z");
    expect(zonedDateTimeToUtc("2026-03-08", "12:30:45", IST)?.toISOString()).toBe("2026-03-08T07:00:45.000Z");
    expect(zonedDateTimeToUtc("2026-01-01", "00:00", "UTC")?.toISOString()).toBe("2026-01-01T00:00:00.000Z");
  });

  it("defaults missing minutes/seconds to zero", () => {
    expect(zonedDateTimeToUtc("2026-03-08", "12", IST)?.toISOString()).toBe("2026-03-08T06:30:00.000Z");
  });

  it("handles the DST transition day in New York", () => {
    expect(zonedDateTimeToUtc("2026-03-08", "01:00", NY)?.toISOString()).toBe("2026-03-08T06:00:00.000Z");
    expect(zonedDateTimeToUtc("2026-03-08", "03:00", NY)?.toISOString()).toBe("2026-03-08T07:00:00.000Z");
    expect(zonedDateTimeToUtc("2026-07-04", "09:00", NY)?.toISOString()).toBe("2026-07-04T13:00:00.000Z");
  });

  it("falls back to the default zone (IST) for an invalid zone name", () => {
    expect(DEFAULT_TIMEZONE).toBe(IST);
    expect(zonedDateTimeToUtc("2026-03-08", "12:30", "Nowhere/Land")?.toISOString()).toBe("2026-03-08T07:00:00.000Z");
    expect(zonedDateTimeToUtc("2026-03-08", "12:30", "")?.toISOString()).toBe("2026-03-08T07:00:00.000Z");
  });

  it("returns null for non-numeric date or time parts", () => {
    expect(zonedDateTimeToUtc("2026-03-xx", "12:30", IST)).toBeNull();
    expect(zonedDateTimeToUtc("2026-03-08", "noon", IST)).toBeNull();
    expect(zonedDateTimeToUtc("", "12:30", IST)).toBeNull();
  });

  it("rejects an empty or malformed time instead of parsing it as midnight", () => {
    expect(zonedDateTimeToUtc("2026-03-08", "", IST)).toBeNull();
    expect(zonedDateTimeToUtc("2026-03-08", "noon", IST)).toBeNull();
    expect(zonedDateTimeToUtc("08/03/2026", "12:00", IST)).toBeNull();
  });
});

describe("formatIsoWithOffset", () => {
  it("renders local wall time with the zone's numeric offset", () => {
    expect(formatIsoWithOffset(new Date("2026-03-08T07:00:00Z"), IST)).toBe("2026-03-08T12:30:00+05:30");
    expect(formatIsoWithOffset(new Date("2026-01-15T12:00:00Z"), NY)).toBe("2026-01-15T07:00:00-05:00");
    expect(formatIsoWithOffset(new Date("2026-07-15T12:00:00Z"), NY)).toBe("2026-07-15T08:00:00-04:00");
    expect(formatIsoWithOffset(new Date("2026-07-15T12:00:00Z"), "UTC")).toBe("2026-07-15T12:00:00+00:00");
  });

  it("handles quarter-hour and negative half-hour offsets", () => {
    expect(formatIsoWithOffset(new Date("2026-01-15T12:00:00Z"), "Asia/Kathmandu")).toBe("2026-01-15T17:45:00+05:45");
    expect(formatIsoWithOffset(new Date("2026-01-15T12:00:00Z"), "America/St_Johns")).toBe("2026-01-15T08:30:00-03:30");
  });

  it("crosses the date line correctly", () => {
    expect(formatIsoWithOffset(new Date("2026-09-23T20:00:00Z"), IST)).toBe("2026-09-24T01:30:00+05:30");
    expect(formatIsoWithOffset(new Date("2026-09-24T02:00:00Z"), "Pacific/Honolulu")).toBe("2026-09-23T16:00:00-10:00");
  });

  it("uses UTC for an invalid zone and drops sub-second precision", () => {
    expect(formatIsoWithOffset(new Date("2026-03-08T07:00:00.750Z"), "Bogus/Zone")).toBe("2026-03-08T07:00:00+00:00");
    expect(formatIsoWithOffset(new Date("2026-03-08T07:00:00.750Z"), IST)).toBe("2026-03-08T12:30:00+05:30");
  });

  it("round-trips with zonedDateTimeToUtc", () => {
    const d = zonedDateTimeToUtc("2026-11-01", "01:30", NY)!;
    expect(formatIsoWithOffset(d, NY)).toMatch(/^2026-11-01T01:30:00-0[45]:00$/);
  });
});

describe("small helpers", () => {
  it("isValidTimeZone", () => {
    expect(isValidTimeZone(IST)).toBe(true);
    expect(isValidTimeZone("Bogus/Zone")).toBe(false);
    expect(isValidTimeZone(null)).toBe(false);
    expect(isValidTimeZone(undefined)).toBe(false);
    expect(isValidTimeZone("")).toBe(false);
  });

  it("splitName keeps everything but the last token as the first name", () => {
    expect(splitName("Umesh Kumar")).toEqual({ firstName: "Umesh", lastName: "Kumar" });
    expect(splitName("  Jean  Claude   Van Damme ")).toEqual({ firstName: "Jean Claude Van", lastName: "Damme" });
    expect(splitName("Madonna")).toEqual({ firstName: "Madonna", lastName: null });
    expect(splitName("   ")).toEqual({ firstName: null, lastName: null });
    expect(splitName(null)).toEqual({ firstName: null, lastName: null });
  });

  it("digitsOnly / str / asObject", () => {
    expect(digitsOnly("+91 (98765) 43-210")).toBe("919876543210");
    expect(digitsOnly(null)).toBe("");
    expect(str("  x ")).toBe("x");
    expect(str("   ")).toBeNull();
    expect(str(0)).toBe("0");
    expect(str(null)).toBeNull();
    expect(asObject({ a: 1 })).toEqual({ a: 1 });
    expect(asObject([1])).toBeNull();
    expect(asObject("s")).toBeNull();
    expect(asObject(null)).toBeNull();
  });
});
