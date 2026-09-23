import { describe, it, expect, vi, afterEach } from "vitest";
import {
  APP_HOST, SITE_HOST, isAppHost, isSiteHost, isSitePath, isAppPath, crossDomainRedirect, appUrl, safeNextPath,
} from "@/lib/domains";

describe("host constants", () => {
  it("come from VITE_* env (pinned in vitest.config.ts)", () => {
    expect(APP_HOST).toBe("app.zonvo.tech");
    expect(SITE_HOST).toBe("zonvo.tech");
  });
});

describe("isAppHost / isSiteHost", () => {
  it("compare case-insensitively and accept www. for the site", () => {
    expect(isAppHost("app.zonvo.tech")).toBe(true);
    expect(isAppHost("APP.ZONVO.TECH")).toBe(true);
    expect(isAppHost("zonvo.tech")).toBe(false);
    expect(isSiteHost("zonvo.tech")).toBe(true);
    expect(isSiteHost("WWW.zonvo.tech")).toBe(true);
    expect(isSiteHost("app.zonvo.tech")).toBe(false);
    expect(isSiteHost("zonvo.tech.evil.com")).toBe(false);
    expect(isSiteHost("localhost")).toBe(false);
  });
});

describe("isAppPath / isSitePath", () => {
  it("match exact segments or a trailing slash, never a longer word", () => {
    expect(isAppPath("/app")).toBe(true);
    expect(isAppPath("/app/payment-result")).toBe(true);
    expect(isAppPath("/login")).toBe(true);
    expect(isAppPath("/admin/users")).toBe(true);
    expect(isAppPath("/team")).toBe(true);
    expect(isAppPath("/apps")).toBe(false);
    expect(isAppPath("/application")).toBe(false);
    expect(isAppPath("/")).toBe(false);
    expect(isAppPath("/pricing")).toBe(false);
    expect(isAppPath("app")).toBe(false);
  });

  it("the root and marketing pages are site paths; product pages are not", () => {
    expect(isSitePath("/")).toBe(true);
    expect(isSitePath("/pricing")).toBe(true);
    expect(isSitePath("/blog/some-post")).toBe(true);
    expect(isSitePath("/refund-policy")).toBe(true);
    expect(isSitePath("/pricing-old")).toBe(false);
    expect(isSitePath("/app")).toBe(false);
    expect(isSitePath("/login")).toBe(false);
  });
});

describe("crossDomainRedirect", () => {
  it("hops product paths from the site host to the app host, preserving query and hash", () => {
    expect(crossDomainRedirect("zonvo.tech", "/app/payment-result", "?order_id=abc", "#done"))
      .toBe("https://app.zonvo.tech/app/payment-result?order_id=abc#done");
    expect(crossDomainRedirect("www.zonvo.tech", "/login")).toBe("https://app.zonvo.tech/login");
  });

  it("hops marketing paths from the app host to the site host", () => {
    expect(crossDomainRedirect("app.zonvo.tech", "/pricing", "?utm=x")).toBe("https://zonvo.tech/pricing?utm=x");
    expect(crossDomainRedirect("APP.ZONVO.TECH", "/terms")).toBe("https://zonvo.tech/terms");
  });

  it("leaves the root alone on the app host (it is the product's home)", () => {
    expect(crossDomainRedirect("app.zonvo.tech", "/")).toBeNull();
  });

  it("returns null when the host already serves the path", () => {
    expect(crossDomainRedirect("zonvo.tech", "/pricing")).toBeNull();
    expect(crossDomainRedirect("zonvo.tech", "/")).toBeNull();
    expect(crossDomainRedirect("app.zonvo.tech", "/app/dashboard")).toBeNull();
    expect(crossDomainRedirect("app.zonvo.tech", "/some-unknown-page")).toBeNull();
  });

  it("never redirects unknown hosts (localhost, staging, white-label)", () => {
    expect(crossDomainRedirect("localhost", "/app")).toBeNull();
    expect(crossDomainRedirect("staging.zonvo.tech", "/pricing")).toBeNull();
    expect(crossDomainRedirect("client.example.com", "/login")).toBeNull();
  });

  it("defaults search and hash to empty strings", () => {
    expect(crossDomainRedirect("zonvo.tech", "/app")).toBe("https://app.zonvo.tech/app");
  });
});

describe("appUrl (reads window.location)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("is absolute on the marketing site and relative elsewhere", () => {
    vi.stubGlobal("window", { location: { hostname: "zonvo.tech" } });
    expect(appUrl("/login")).toBe("https://app.zonvo.tech/login");
    vi.stubGlobal("window", { location: { hostname: "app.zonvo.tech" } });
    expect(appUrl("/login")).toBe("/login");
    vi.stubGlobal("window", { location: { hostname: "localhost" } });
    expect(appUrl("/register")).toBe("/register");
  });
});

describe("safeNextPath", () => {
  it("accepts product paths, raw or URL-encoded", () => {
    expect(safeNextPath("/app/billing")).toBe("/app/billing");
    expect(safeNextPath("%2Fapp%2Fbilling")).toBe("/app/billing");
    expect(safeNextPath("/admin")).toBe("/admin");
  });

  it("rejects empty input", () => {
    expect(safeNextPath(null)).toBeNull();
    expect(safeNextPath(undefined)).toBeNull();
    expect(safeNextPath("")).toBeNull();
  });

  it("rejects open-redirect vectors", () => {
    expect(safeNextPath("https://evil.com/app")).toBeNull();
    expect(safeNextPath("//evil.com/app")).toBeNull();
    expect(safeNextPath("%2F%2Fevil.com")).toBeNull();
    expect(safeNextPath("javascript:alert(1)")).toBeNull();
    expect(safeNextPath("app/x")).toBeNull();
    expect(safeNextPath("/\\evil.com")).toBeNull(); // not an app path
  });

  it("rejects marketing paths and unknown paths", () => {
    expect(safeNextPath("/pricing")).toBeNull();
    expect(safeNextPath("/")).toBeNull();
    expect(safeNextPath("/apps")).toBeNull();
  });

  it("returns null on malformed percent-encoding instead of throwing", () => {
    expect(safeNextPath("%E0%A4%A")).toBeNull();
    expect(safeNextPath("/app/%")).toBeNull();
  });

  it("keeps a query string / hash on a nested app path (prefix match)", () => {
    expect(safeNextPath("/app/billing?tab=x#top")).toBe("/app/billing?tab=x#top");
    // …but a bare app root with a query is not matched (`/app?x` is neither `/app` nor `/app/…`)
    expect(safeNextPath("/app?x=1")).toBeNull();
  });
});
