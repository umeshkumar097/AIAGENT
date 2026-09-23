import { describe, it, expect } from "vitest";
import {
  str, normalizePhone, isValidTimeZone, zonedParts, tzOffsetMinutes, zonedToUtc, nowInZone,
  pad2, minutesOf, hhmmOf, weekdayOf, addDays, spokenDate, spokenTime, computeFreeSlots, busyMinutesOnDate,
  YMD_RE, HHMM_RE, EMAIL_RE,
} from "../server/services/call-actions/util";

const IST = "Asia/Kolkata";
const NY = "America/New_York";

describe("str", () => {
  it("trims strings, stringifies scalars and maps null/undefined to ''", () => {
    expect(str("  a ")).toBe("a");
    expect(str(42)).toBe("42");
    expect(str(null)).toBe("");
    expect(str(undefined)).toBe("");
    expect(str(false)).toBe("false");
  });
});

describe("normalizePhone", () => {
  it("returns +<digits> for 10+ digit numbers regardless of formatting", () => {
    expect(normalizePhone("+91 98765 43210")).toBe("+919876543210");
    expect(normalizePhone("(987) 654-3210")).toBe("+9876543210");
    expect(normalizePhone("9876543210")).toBe("+9876543210");
    expect(normalizePhone(" 0091-98765-43210 ")).toBe("+00919876543210");
  });

  it("strips channel prefixes", () => {
    expect(normalizePhone("whatsapp:+919876543210")).toBe("+919876543210");
    expect(normalizePhone("TEL:+919876543210")).toBe("+919876543210");
    expect(normalizePhone("phone:9876543210")).toBe("+9876543210");
  });

  it("keeps short (5–9 digit) numbers only with their original plus sign", () => {
    expect(normalizePhone("12345")).toBe("12345");
    expect(normalizePhone("+12345")).toBe("+12345");
    expect(normalizePhone("123-456")).toBe("123456");
  });

  it("rejects non-dialable input", () => {
    expect(normalizePhone("")).toBe("");
    expect(normalizePhone("1234")).toBe("");            // too short
    expect(normalizePhone("1".repeat(16))).toBe("");    // too long
    expect(normalizePhone("a@b.com")).toBe("");         // email
    expect(normalizePhone("client:agent-1")).toBe("");
    expect(normalizePhone("sip:1234567890@pbx")).toBe("");
    expect(normalizePhone("abc")).toBe("");
    expect(normalizePhone(null as unknown as string)).toBe("");
  });
});

describe("isValidTimeZone", () => {
  it("accepts IANA names and rejects junk", () => {
    expect(isValidTimeZone(IST)).toBe(true);
    expect(isValidTimeZone("UTC")).toBe(true);
    expect(isValidTimeZone("Mars/Olympus")).toBe(false);
    expect(isValidTimeZone("")).toBe(false);
  });
});

describe("zone maths", () => {
  it("zonedParts gives the wall clock in the zone (24 → 0 hour normalised)", () => {
    expect(zonedParts(new Date("2026-09-23T18:30:00Z"), IST)).toEqual({ year: 2026, month: 9, day: 24, hour: 0, minute: 0, second: 0 });
    expect(zonedParts(new Date("2026-09-23T18:29:59Z"), IST)).toEqual({ year: 2026, month: 9, day: 23, hour: 23, minute: 59, second: 59 });
  });

  it("tzOffsetMinutes: IST fixed +330, New York switches with DST", () => {
    expect(tzOffsetMinutes(new Date("2026-01-15T12:00:00Z"), IST)).toBe(330);
    expect(tzOffsetMinutes(new Date("2026-07-15T12:00:00Z"), IST)).toBe(330);
    expect(tzOffsetMinutes(new Date("2026-01-15T12:00:00Z"), NY)).toBe(-300);
    expect(tzOffsetMinutes(new Date("2026-07-15T12:00:00Z"), NY)).toBe(-240);
    expect(tzOffsetMinutes(new Date("2026-07-15T12:00:00Z"), "UTC")).toBe(0);
  });

  it("zonedToUtc converts a wall-clock time to the right instant", () => {
    expect(zonedToUtc("2026-03-08", "12:30", IST).toISOString()).toBe("2026-03-08T07:00:00.000Z");
    expect(zonedToUtc("2026-01-01", "00:00", "UTC").toISOString()).toBe("2026-01-01T00:00:00.000Z");
  });

  it("zonedToUtc is DST-safe on the spring-forward day (NY, 8 Mar 2026)", () => {
    expect(zonedToUtc("2026-03-08", "01:00", NY).toISOString()).toBe("2026-03-08T06:00:00.000Z"); // still EST
    expect(zonedToUtc("2026-03-08", "03:00", NY).toISOString()).toBe("2026-03-08T07:00:00.000Z"); // now EDT
    expect(zonedToUtc("2026-11-01", "03:00", NY).toISOString()).toBe("2026-11-01T08:00:00.000Z"); // after fall-back
  });

  it("zonedToUtc and zonedParts round-trip", () => {
    const d = zonedToUtc("2026-12-31", "23:45", IST);
    expect(zonedParts(d, IST)).toMatchObject({ year: 2026, month: 12, day: 31, hour: 23, minute: 45 });
  });

  it("nowInZone reports the zone's date, time, weekday and minutes-since-midnight", () => {
    // 18:45Z on Wed 23 Sep = 00:15 IST on Thu 24 Sep
    expect(nowInZone(IST, new Date("2026-09-23T18:45:00Z"))).toEqual({ date: "2026-09-24", time: "00:15", weekday: 4, minutes: 15 });
    expect(nowInZone(NY, new Date("2026-09-23T18:45:00Z"))).toEqual({ date: "2026-09-23", time: "14:45", weekday: 3, minutes: 885 });
  });
});

describe("date / time formatting helpers", () => {
  it("pad2 / minutesOf / hhmmOf", () => {
    expect(pad2(5)).toBe("05");
    expect(pad2(12)).toBe("12");
    expect(minutesOf("09:30")).toBe(570);
    expect(minutesOf("00:00")).toBe(0);
    expect(hhmmOf(570)).toBe("09:30");
    expect(hhmmOf(1439)).toBe("23:59");
    expect(hhmmOf(1440)).toBe("00:00"); // wraps past midnight
    expect(hhmmOf(minutesOf("17:05"))).toBe("17:05");
  });

  it("weekdayOf is calendar-only (no zone drift)", () => {
    expect(weekdayOf("2026-09-24")).toBe(4); // Thursday
    expect(weekdayOf("2026-09-27")).toBe(0); // Sunday
    expect(weekdayOf("2024-02-29")).toBe(4);
  });

  it("addDays crosses month/year boundaries and leap days", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2024-03-01", -1)).toBe("2024-02-29");
    expect(addDays("2026-01-31", 30)).toBe("2026-03-02");
    expect(addDays("2026-09-24", 0)).toBe("2026-09-24");
  });

  it("spokenDate / spokenTime produce short speakable strings", () => {
    expect(spokenDate("2026-09-24")).toBe("Thursday 24 September");
    expect(spokenDate("2026-01-05")).toBe("Monday 5 January");
    expect(spokenTime("00:05")).toBe("12:05 AM");
    expect(spokenTime("12:00")).toBe("12:00 PM");
    expect(spokenTime("13:30")).toBe("1:30 PM");
    expect(spokenTime("09:00")).toBe("9:00 AM");
    expect(spokenTime("23:59")).toBe("11:59 PM");
  });

  it("validation regexes", () => {
    expect(YMD_RE.test("2026-09-24")).toBe(true);
    expect(YMD_RE.test("24-09-2026")).toBe(false);
    expect(HHMM_RE.test("23:59")).toBe(true);
    expect(HHMM_RE.test("24:00")).toBe(false);
    expect(HHMM_RE.test("9:30")).toBe(false);
    expect(EMAIL_RE.test("a@b.co")).toBe(true);
    expect(EMAIL_RE.test("a b@c.com")).toBe(false);
    expect(EMAIL_RE.test("a@b")).toBe(false);
  });
});

describe("computeFreeSlots", () => {
  it("lists slots that fit the working window and skips busy overlaps", () => {
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "11:00", durationMinutes: 30, busy: [{ start: 600, end: 630 }] }))
      .toEqual(["09:00", "09:30", "10:30"]);
  });

  it("drops a trailing slot that would overrun the end of the day", () => {
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "10:00", durationMinutes: 45, busy: [] })).toEqual(["09:00"]);
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "09:30", durationMinutes: 45, busy: [] })).toEqual([]);
  });

  it("treats intervals as half-open: a busy block ending exactly at a slot start is not a clash", () => {
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "10:00", durationMinutes: 30, busy: [{ start: 540, end: 570 }] })).toEqual(["09:30"]);
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "10:00", durationMinutes: 30, busy: [{ start: 569, end: 571 }] })).toEqual([]);
  });

  it("respects notBeforeMinutes and the limit", () => {
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "12:00", durationMinutes: 30, busy: [], notBeforeMinutes: 590 }))
      .toEqual(["10:00", "10:30", "11:00", "11:30"]);
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "18:00", durationMinutes: 15, busy: [] })).toHaveLength(8);
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "18:00", durationMinutes: 15, busy: [], limit: 2 })).toEqual(["09:00", "09:15"]);
  });

  it("clamps absurdly small durations to 5 minutes (no infinite loop on 0)", () => {
    expect(computeFreeSlots({ workingStart: "09:00", workingEnd: "09:10", durationMinutes: 0, busy: [] })).toEqual(["09:00", "09:05"]);
  });

  it("returns nothing when the window is inverted", () => {
    expect(computeFreeSlots({ workingStart: "18:00", workingEnd: "09:00", durationMinutes: 30, busy: [] })).toEqual([]);
  });
});

describe("busyMinutesOnDate", () => {
  it("maps a UTC interval to minutes-of-day in the zone", () => {
    const start = new Date("2026-09-24T04:30:00Z"); // 10:00 IST
    const end = new Date("2026-09-24T05:30:00Z");   // 11:00 IST
    expect(busyMinutesOnDate(start, end, "2026-09-24", IST)).toEqual({ start: 600, end: 660 });
  });

  it("clips an interval that spans midnight to each day", () => {
    const start = new Date("2026-09-24T17:30:00Z"); // 23:00 IST 24th
    const end = new Date("2026-09-24T19:30:00Z");   // 01:00 IST 25th
    expect(busyMinutesOnDate(start, end, "2026-09-24", IST)).toEqual({ start: 1380, end: 1440 });
    expect(busyMinutesOnDate(start, end, "2026-09-25", IST)).toEqual({ start: 0, end: 60 });
  });

  it("returns null when the interval misses the day or is empty", () => {
    const start = new Date("2026-09-24T04:30:00Z");
    const end = new Date("2026-09-24T05:30:00Z");
    expect(busyMinutesOnDate(start, end, "2026-09-25", IST)).toBeNull();
    expect(busyMinutesOnDate(end, start, "2026-09-24", IST)).toBeNull();
    expect(busyMinutesOnDate(start, start, "2026-09-24", IST)).toBeNull();
  });

  it("rounds partial minutes outward (floor start, ceil end)", () => {
    const start = new Date("2026-09-24T04:30:30Z"); // 10:00:30 IST
    const end = new Date("2026-09-24T04:40:10Z");   // 10:10:10 IST
    expect(busyMinutesOnDate(start, end, "2026-09-24", IST)).toEqual({ start: 600, end: 611 });
  });
});
