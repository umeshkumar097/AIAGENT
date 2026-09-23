import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// webhook-helper imports `storage` (→ db). Only the pure origin/URL helpers are under test.
vi.mock("../server/db", () => ({ db: {} }));
vi.mock("../server/storage", () => ({ storage: {} }));

type Helper = typeof import("../server/engines/payment/webhook-helper");

const ENV_KEYS = ["APP_URL", "APP_DOMAIN", "NODE_ENV"] as const;
const saved: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> = {};

/** FRONTEND_URL is computed at import time, so set env first and import a fresh module instance. */
async function load(env: Partial<Record<(typeof ENV_KEYS)[number], string>>): Promise<Helper> {
  for (const k of ENV_KEYS) delete process.env[k];
  Object.assign(process.env, env);
  vi.resetModules();
  return import("../server/engines/payment/webhook-helper");
}

const req = (headers: Record<string, string | string[] | undefined>) => ({ headers });

beforeEach(() => { for (const k of ENV_KEYS) saved[k] = process.env[k]; });
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k];
  }
  vi.restoreAllMocks();
});

describe("FRONTEND_URL", () => {
  it("prefers APP_DOMAIN (protocol stripped, https forced) over APP_URL", async () => {
    const m = await load({ APP_DOMAIN: "https://app.zonvo.tech", APP_URL: "http://other" });
    expect(m.FRONTEND_URL).toBe("https://app.zonvo.tech");
    expect((await load({ APP_DOMAIN: "http://zonvo.tech" })).FRONTEND_URL).toBe("https://zonvo.tech");
    expect((await load({ APP_DOMAIN: "zonvo.tech" })).FRONTEND_URL).toBe("https://zonvo.tech");
  });

  it("uses APP_URL verbatim, else localhost:5000", async () => {
    expect((await load({ APP_URL: "http://localhost:3000" })).FRONTEND_URL).toBe("http://localhost:3000");
    expect((await load({})).FRONTEND_URL).toBe("http://localhost:5000");
  });

  it("in production with nothing configured logs a config error and still falls back", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const m = await load({ NODE_ENV: "production" });
    expect(m.FRONTEND_URL).toBe("http://localhost:5000");
    expect(err).toHaveBeenCalledWith(expect.stringContaining("APP_DOMAIN or APP_URL"));
  });

  it("webhook URLs hang off FRONTEND_URL", async () => {
    const m = await load({ APP_URL: "https://zonvo.tech" });
    expect(m.getWebhookUrl("cashfree")).toBe("https://zonvo.tech/api/cashfree/webhook");
    expect(m.getElevenLabsWebhookUrl()).toBe("https://zonvo.tech/api/elevenlabs/webhook");
  });
});

describe("resolveAppOrigin", () => {
  let m: Helper;
  beforeEach(async () => { m = await load({ APP_URL: "https://zonvo.tech" }); });

  it("returns the browser's https origin when it is on the same registrable domain", () => {
    expect(m.resolveAppOrigin(req({ origin: "https://app.zonvo.tech" }))).toBe("https://app.zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "https://www.zonvo.tech" }))).toBe("https://www.zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "https://APP.ZONVO.TECH" }))).toBe("https://app.zonvo.tech");
  });

  it("falls back to the Referer and reduces it to an origin", () => {
    expect(m.resolveAppOrigin(req({ referer: "https://app.zonvo.tech/app/billing?x=1#y" }))).toBe("https://app.zonvo.tech");
  });

  it("prefers Origin over Referer", () => {
    expect(m.resolveAppOrigin(req({ origin: "https://app.zonvo.tech", referer: "https://www.zonvo.tech/" }))).toBe("https://app.zonvo.tech");
  });

  it("takes the first value of a multi-valued header", () => {
    expect(m.resolveAppOrigin(req({ origin: ["https://app.zonvo.tech", "https://evil.com"] }))).toBe("https://app.zonvo.tech");
  });

  it("falls back to FRONTEND_URL for foreign, look-alike, insecure, missing or malformed origins", () => {
    expect(m.resolveAppOrigin(req({ origin: "https://evil.com" }))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "https://zonvo.tech.evil.com" }))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "https://evilzonvo.tech" }))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "http://app.zonvo.tech" }))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({}))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "" }))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({ origin: "null" }))).toBe("https://zonvo.tech"); // opaque origin
    expect(m.resolveAppOrigin(req({ origin: "not a url" }))).toBe("https://zonvo.tech");
    expect(m.resolveAppOrigin(req({ referer: "app.zonvo.tech/path" }))).toBe("https://zonvo.tech");
  });

  it("allows plain http only for localhost, and only when FRONTEND_URL is localhost too", async () => {
    const local = await load({ APP_URL: "http://localhost:5000" });
    expect(local.resolveAppOrigin(req({ origin: "http://localhost:5173" }))).toBe("http://localhost:5173");
    expect(local.resolveAppOrigin(req({ origin: "http://127.0.0.1:5173" }))).toBe("http://localhost:5000");
    // production FRONTEND_URL: localhost is a different registrable domain
    expect(m.resolveAppOrigin(req({ origin: "http://localhost:5173" }))).toBe("https://zonvo.tech");
  });

  it.todo("registrableDomain() takes the last two labels, so with FRONTEND_URL on a multi-part TLD (e.g. app.example.co.in) any https://*.co.in origin would be trusted — see webhook-helper.ts:41-43");
});
