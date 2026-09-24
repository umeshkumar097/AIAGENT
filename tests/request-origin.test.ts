import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";

// request-origin → webhook-helper → storage/db. Only the pure origin logic is under test.
vi.mock("../server/db", () => ({ db: {} }));
vi.mock("../server/storage", () => ({ storage: {} }));

type Mod = typeof import("../server/utils/request-origin");
let mod: Mod;
const saved = { APP_URL: process.env.APP_URL, APP_DOMAIN: process.env.APP_DOMAIN, NODE_ENV: process.env.NODE_ENV };

beforeAll(async () => {
  delete process.env.APP_URL;
  delete process.env.NODE_ENV;
  process.env.APP_DOMAIN = "app.zonvo.tech"; // FRONTEND_URL = https://app.zonvo.tech
  vi.resetModules();
  mod = await import("../server/utils/request-origin");
});
afterAll(() => { Object.assign(process.env, saved); });

const req = (headers: Record<string, string | string[] | undefined>, secure = false) => ({ headers, secure });

describe("resolveRequestOrigin", () => {
  it("uses X-Forwarded-Proto/Host from the proxy", () => {
    expect(mod.resolveRequestOrigin(req({ "x-forwarded-proto": "https", "x-forwarded-host": "app.zonvo.tech", host: "127.0.0.1:5000" })))
      .toBe("https://app.zonvo.tech");
  });

  it("falls back to Host and assumes https for non-local hosts, http for localhost", () => {
    expect(mod.resolveRequestOrigin(req({ host: "api.example.co.in" }))).toBe("https://api.example.co.in");
    expect(mod.resolveRequestOrigin(req({ host: "localhost:5000" }))).toBe("http://localhost:5000");
  });

  it("rejects an injected host and falls back to FRONTEND_URL", () => {
    expect(mod.resolveRequestOrigin(req({ host: "evil.com\"><script>" }))).toBe("https://app.zonvo.tech");
    expect(mod.resolveRequestOrigin(req({}))).toBe("https://app.zonvo.tech");
  });
});

describe("replaceDocsPlaceholder", () => {
  it("rewrites every placeholder host", () => {
    expect(mod.replaceDocsPlaceholder("a https://your-domain.com/api/v1 b https://your-domain.com/x", "https://app.zonvo.tech"))
      .toBe("a https://app.zonvo.tech/api/v1 b https://app.zonvo.tech/x");
  });
});
