import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import { createHmac } from "crypto";

const ORIGINAL_SECRET = process.env.JWT_SECRET;
beforeAll(() => { process.env.JWT_SECRET = "unit-test-secret"; });
afterAll(() => {
  if (ORIGINAL_SECRET === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = ORIGINAL_SECRET;
});
afterEach(() => vi.useRealTimers());

// The secret is read on every sign/verify call, so a static import is fine.
import { signState, verifyState } from "../server/integrations/oauth-state";

type Provider = Parameters<typeof signState>[1];
const provider = "zoho" as Provider;

function tamper(state: string, mutate: (payload: Record<string, unknown>) => void): string {
  const [encoded, sig] = state.split(".");
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
  mutate(payload);
  return `${Buffer.from(JSON.stringify(payload)).toString("base64url")}.${sig}`;
}

describe("signState / verifyState", () => {
  it("round-trips userId and provider", () => {
    const state = signState("user-1", provider);
    expect(state).toMatch(/^[A-Za-z0-9_-]+\.[0-9a-f]{64}$/);
    expect(verifyState(state)).toEqual({ userId: "user-1", provider });
  });

  it("includes a fresh nonce so two states for the same user differ", () => {
    expect(signState("user-1", provider)).not.toBe(signState("user-1", provider));
  });

  it("rejects a payload edited after signing", () => {
    const state = signState("user-1", provider);
    expect(verifyState(tamper(state, (p) => { p.userId = "user-2"; }))).toBeNull();
    expect(verifyState(tamper(state, (p) => { p.provider = "salesforce"; }))).toBeNull();
    expect(verifyState(tamper(state, (p) => { p.exp = Date.now() + 1e9; }))).toBeNull();
  });

  it("rejects a tampered, truncated, malformed or missing signature", () => {
    const state = signState("user-1", provider);
    const [encoded, sig] = state.split(".");
    const flipped = (sig[0] === "0" ? "1" : "0") + sig.slice(1);
    expect(verifyState(`${encoded}.${flipped}`)).toBeNull();
    expect(verifyState(`${encoded}.${sig.slice(0, 63)}`)).toBeNull();
    expect(verifyState(`${encoded}.${"z".repeat(64)}`)).toBeNull();
    expect(verifyState(encoded)).toBeNull();
    expect(verifyState(`.${sig}`)).toBeNull();
    expect(verifyState("")).toBeNull();
    expect(verifyState("garbage")).toBeNull();
  });

  it("rejects a state signed with a different secret", () => {
    const state = signState("user-1", provider);
    process.env.JWT_SECRET = "rotated";
    try {
      expect(verifyState(state)).toBeNull();
    } finally {
      process.env.JWT_SECRET = "unit-test-secret";
    }
    expect(verifyState(state)).toEqual({ userId: "user-1", provider });
  });

  it("expires after 10 minutes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-23T10:00:00Z"));
    const state = signState("user-1", provider);
    vi.setSystemTime(new Date("2026-09-23T10:09:59Z"));
    expect(verifyState(state)).not.toBeNull();
    vi.setSystemTime(new Date("2026-09-23T10:10:01Z"));
    expect(verifyState(state)).toBeNull();
  });

  it("rejects a correctly signed payload that lacks required fields", () => {
    // Re-sign a hand-made payload with the same HMAC construction the module uses
    const sign = (encoded: string) =>
      createHmac("sha256", `${process.env.JWT_SECRET}:integrations-oauth-state`).update(encoded).digest("hex");
    const mk = (payload: unknown) => {
      const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
      return `${encoded}.${sign(encoded)}`;
    };
    expect(verifyState(mk({ userId: "u", provider, exp: Date.now() + 1000 }))).toEqual({ userId: "u", provider });
    expect(verifyState(mk({ provider, exp: Date.now() + 1000 }))).toBeNull();
    expect(verifyState(mk({ userId: "u", exp: Date.now() + 1000 }))).toBeNull();
    expect(verifyState(mk({ userId: "u", provider, exp: "soon" }))).toBeNull();
    expect(verifyState(mk("not-an-object"))).toBeNull();
  });
});
