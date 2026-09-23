import { describe, it, expect } from "vitest";
import type { RetryRules } from "@shared/schema";
import {
  legacyRetryRules, resolveRetryRules, anyRetryEnabled, retryRuleFor, enabledRetryStatuses,
  parseRetryRulesInput, legacyColumnsFrom, RETRY_CONTACT_STATUS,
} from "../server/services/retry-rules";

const rule = (enabled: boolean, delayMinutes = 60, maxAttempts = 3) => ({ enabled, delayMinutes, maxAttempts });
const allOff: RetryRules = { no_answer: rule(false), busy: rule(false), failed: rule(false), voicemail: rule(false) };

describe("legacyRetryRules", () => {
  it("derives per-outcome rules from the legacy columns (no_answer on by default, busy/failed opt-in, voicemail off)", () => {
    const r = legacyRetryRules({ retryEnabled: true, retryIntervalMinutes: 30, retryMaxAttempts: 2 });
    expect(r).toEqual({
      no_answer: rule(true, 30, 2),
      busy: rule(false, 30, 2),
      failed: rule(false, 30, 2),
      voicemail: rule(false, 30, 2),
    });
  });

  it("everything is disabled when retryEnabled is falsy, even with per-outcome flags on", () => {
    const r = legacyRetryRules({ retryEnabled: null, retryOnNoAnswer: true, retryOnBusy: true, retryOnFailed: true });
    expect(Object.values(r).every(x => !x.enabled)).toBe(true);
    expect(anyRetryEnabled(r)).toBe(false);
  });

  it("respects explicit per-outcome flags", () => {
    const r = legacyRetryRules({ retryEnabled: true, retryOnNoAnswer: false, retryOnBusy: true, retryOnFailed: true });
    expect(r.no_answer.enabled).toBe(false);
    expect(r.busy.enabled).toBe(true);
    expect(r.failed.enabled).toBe(true);
    expect(r.voicemail.enabled).toBe(false);
  });

  it("falls back to 60 min / 3 attempts and clamps out-of-range values", () => {
    expect(legacyRetryRules({ retryEnabled: true }).no_answer).toEqual(rule(true, 60, 3));
    expect(legacyRetryRules({ retryEnabled: true, retryIntervalMinutes: 1, retryMaxAttempts: 99 }).no_answer).toEqual(rule(true, 5, 10));
    expect(legacyRetryRules({ retryEnabled: true, retryIntervalMinutes: 999999, retryMaxAttempts: -4 }).no_answer).toEqual(rule(true, 10080, 0));
    expect(legacyRetryRules({ retryEnabled: true, retryIntervalMinutes: 14.6, retryMaxAttempts: 2.4 }).no_answer).toEqual(rule(true, 15, 2));
    expect(legacyRetryRules({ retryEnabled: true, retryIntervalMinutes: NaN, retryMaxAttempts: Infinity }).no_answer).toEqual(rule(true, 60, 3));
  });
});

describe("resolveRetryRules", () => {
  const legacy = { retryEnabled: true, retryIntervalMinutes: 30, retryMaxAttempts: 2 };

  it("returns the legacy derivation when retryRules is null / not an object", () => {
    const base = legacyRetryRules(legacy);
    expect(resolveRetryRules({ ...legacy, retryRules: null })).toEqual(base);
    expect(resolveRetryRules({ ...legacy, retryRules: "x" })).toEqual(base);
    expect(resolveRetryRules({ ...legacy, retryRules: [] })).toEqual(base);
    expect(resolveRetryRules({ ...legacy, retryRules: 7 })).toEqual(base);
  });

  it("stored rules win, and gaps are filled from the legacy values per outcome", () => {
    const r = resolveRetryRules({ ...legacy, retryRules: { busy: { enabled: true, delayMinutes: 10 }, voicemail: { enabled: true, maxAttempts: 1 } } });
    expect(r.busy).toEqual(rule(true, 10, 2));        // maxAttempts from legacy
    expect(r.voicemail).toEqual(rule(true, 30, 1));   // delay from legacy
    expect(r.no_answer).toEqual(rule(true, 30, 2));   // untouched legacy derivation
    expect(r.failed).toEqual(rule(false, 30, 2));
  });

  it("a stored rule is only enabled by a literal true, and clamps its numbers", () => {
    const r = resolveRetryRules({
      ...legacy,
      retryRules: {
        no_answer: { enabled: "true", delayMinutes: 1, maxAttempts: 50 },
        busy: { enabled: 1 },
        failed: null,
        voicemail: "yes",
      },
    });
    expect(r.no_answer).toEqual(rule(false, 5, 10));
    expect(r.busy.enabled).toBe(false);
    expect(r.failed).toEqual(rule(false, 30, 2));
    expect(r.voicemail).toEqual(rule(false, 30, 2));
  });

  it("ignores unknown outcome keys in stored rules", () => {
    const r = resolveRetryRules({ ...legacy, retryRules: { bogus: { enabled: true } } });
    expect(Object.keys(r).sort()).toEqual(["busy", "failed", "no_answer", "voicemail"]);
  });
});

describe("anyRetryEnabled / retryRuleFor / enabledRetryStatuses", () => {
  it("anyRetryEnabled needs an enabled rule with more than one attempt", () => {
    expect(anyRetryEnabled(allOff)).toBe(false);
    expect(anyRetryEnabled({ ...allOff, busy: rule(true, 60, 1) })).toBe(false);
    expect(anyRetryEnabled({ ...allOff, busy: rule(true, 60, 2) })).toBe(true);
  });

  it("retryRuleFor maps Plivo statuses and lets a voicemail outcome win", () => {
    const rules: RetryRules = { no_answer: rule(true), busy: rule(true), failed: rule(false), voicemail: rule(true, 120, 1) };
    expect(retryRuleFor(rules, "no-answer")).toEqual({ key: "no_answer", rule: rules.no_answer });
    expect(retryRuleFor(rules, "no_answer")).toEqual({ key: "no_answer", rule: rules.no_answer });
    expect(retryRuleFor(rules, "busy", null)).toEqual({ key: "busy", rule: rules.busy });
    expect(retryRuleFor(rules, "completed", "voicemail")).toEqual({ key: "voicemail", rule: rules.voicemail });
    expect(retryRuleFor(rules, "failed")).toBeNull();          // disabled
    expect(retryRuleFor(rules, "completed")).toBeNull();       // not a retry status
    expect(retryRuleFor(rules, "busy", "human")).toEqual({ key: "busy", rule: rules.busy });
  });

  it("enabledRetryStatuses lists enabled outcomes with their contact status", () => {
    const rules: RetryRules = { ...allOff, failed: rule(true), voicemail: rule(true) };
    expect(enabledRetryStatuses(rules)).toEqual([
      { key: "failed", status: "failed", rule: rules.failed },
      { key: "voicemail", status: "voicemail", rule: rules.voicemail },
    ]);
    expect(enabledRetryStatuses(allOff)).toEqual([]);
    expect(RETRY_CONTACT_STATUS.no_answer).toBe("no-answer");
  });
});

describe("parseRetryRulesInput", () => {
  const valid: RetryRules = { no_answer: rule(true, 30, 3), busy: rule(false, 5, 0), failed: rule(true, 10080, 10), voicemail: rule(false) };

  it("accepts a complete, in-range rule set", () => {
    expect(parseRetryRulesInput(valid)).toEqual({ rules: valid });
  });

  it("rejects missing outcomes, extra keys, out-of-range and non-integer values with a located message", () => {
    const { voicemail: _v, ...missing } = valid;
    expect(parseRetryRulesInput(missing)).toMatchObject({ error: expect.stringMatching(/^Invalid retryRules at voicemail/) });
    expect(parseRetryRulesInput({ ...valid, extra: rule(true) })).toMatchObject({ error: expect.stringMatching(/^Invalid retryRules/) });
    expect(parseRetryRulesInput({ ...valid, busy: rule(true, 4, 1) })).toMatchObject({ error: expect.stringMatching(/^Invalid retryRules at busy\.delayMinutes/) });
    expect(parseRetryRulesInput({ ...valid, busy: rule(true, 60, 11) })).toMatchObject({ error: expect.stringMatching(/^Invalid retryRules at busy\.maxAttempts/) });
    expect(parseRetryRulesInput({ ...valid, busy: rule(true, 7.5, 1) })).toMatchObject({ error: expect.stringMatching(/busy\.delayMinutes/) });
    expect(parseRetryRulesInput({ ...valid, busy: { ...rule(true), enabled: "yes" } })).toMatchObject({ error: expect.stringMatching(/busy\.enabled/) });
    expect(parseRetryRulesInput(null)).toMatchObject({ error: expect.stringMatching(/^Invalid retryRules/) });
    expect(parseRetryRulesInput("nope")).toMatchObject({ error: expect.any(String) });
  });
});

describe("legacyColumnsFrom", () => {
  it("mirrors the rule set into the legacy columns", () => {
    const rules: RetryRules = { no_answer: rule(true, 45, 2), busy: rule(true, 15, 4), failed: rule(false, 60, 3), voicemail: rule(false) };
    expect(legacyColumnsFrom(rules)).toEqual({
      retryEnabled: true, retryOnNoAnswer: true, retryOnBusy: true, retryOnFailed: false,
      retryIntervalMinutes: 45, // no_answer's delay wins when it is enabled
      retryMaxAttempts: 4,      // the largest enabled maxAttempts
    });
  });

  it("uses the first enabled rule's delay when no_answer is off, and no_answer's when nothing is on", () => {
    const rules: RetryRules = { ...allOff, failed: rule(true, 90, 1) };
    expect(legacyColumnsFrom(rules)).toMatchObject({ retryEnabled: true, retryOnNoAnswer: false, retryOnFailed: true, retryIntervalMinutes: 90, retryMaxAttempts: 1 });
    expect(legacyColumnsFrom({ ...allOff, no_answer: rule(false, 25, 0) })).toEqual({
      retryEnabled: false, retryOnNoAnswer: false, retryOnBusy: false, retryOnFailed: false, retryIntervalMinutes: 25, retryMaxAttempts: 1,
    });
  });

  it("round-trips through legacyRetryRules for the legacy-representable cases", () => {
    const rules: RetryRules = { no_answer: rule(true, 20, 5), busy: rule(true, 20, 5), failed: rule(true, 20, 5), voicemail: rule(false, 20, 5) };
    expect(legacyRetryRules(legacyColumnsFrom(rules))).toEqual(rules);
  });
});
