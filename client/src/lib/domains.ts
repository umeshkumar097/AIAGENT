/**
 * Two-host layout: the marketing site lives on SITE_HOST (zonvo.tech) and the product
 * (login, register, dashboard, admin) on APP_HOST (app.zonvo.tech). The login cookie and
 * stored token are bound to the app host, so any product path opened on the site host —
 * e.g. the Cashfree return URL or an emailed link — must hop to the app host, otherwise the
 * user looks logged out. Marketing paths opened on the app host hop the other way.
 *
 * Hosts are configurable at build time (VITE_APP_HOST / VITE_SITE_HOST); other hostnames
 * (localhost, staging, white-label installs) are left alone.
 */
export const APP_HOST: string = (import.meta.env.VITE_APP_HOST as string | undefined)?.trim() || "app.zonvo.tech";
export const SITE_HOST: string = (import.meta.env.VITE_SITE_HOST as string | undefined)?.trim() || "zonvo.tech";

/** Paths served by the marketing site. Everything else is product. */
const SITE_PATHS = [
  "/features", "/pricing", "/use-cases", "/integrations", "/contact", "/blog",
  "/privacy", "/terms", "/refund-policy", "/cookies", "/data-deletion",
];

/** Product paths that must live on the app host (checked as prefixes). */
const APP_PATHS = ["/app", "/admin", "/login", "/register", "/team"];

export function isAppHost(hostname: string = window.location.hostname): boolean {
  return hostname.toLowerCase() === APP_HOST.toLowerCase();
}

export function isSiteHost(hostname: string = window.location.hostname): boolean {
  const h = hostname.toLowerCase();
  return h === SITE_HOST.toLowerCase() || h === `www.${SITE_HOST.toLowerCase()}`;
}

function startsWithPath(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isSitePath(pathname: string): boolean {
  return pathname === "/" || SITE_PATHS.some((p) => startsWithPath(pathname, p));
}

export function isAppPath(pathname: string): boolean {
  return APP_PATHS.some((p) => startsWithPath(pathname, p));
}

/**
 * Absolute URL to hop to when the current host does not serve the current path, else null.
 * Keeps path, query and hash so a Cashfree return (`/app/payment-result?order_id=…`) survives.
 */
export function crossDomainRedirect(
  hostname: string,
  pathname: string,
  search: string = "",
  hash: string = ""
): string | null {
  if (isSiteHost(hostname) && isAppPath(pathname)) {
    return `https://${APP_HOST}${pathname}${search}${hash}`;
  }
  if (isAppHost(hostname) && pathname !== "/" && isSitePath(pathname)) {
    return `https://${SITE_HOST}${pathname}${search}${hash}`;
  }
  return null;
}

/** Absolute app URL for links rendered on the marketing site (login / register buttons). */
export function appUrl(path: string): string {
  if (isSiteHost()) return `https://${APP_HOST}${path}`;
  return path;
}

/** `next` value the login page may return to after sign-in (product paths only). */
export function safeNextPath(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return null;
  }
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return null;
  return isAppPath(decoded) ? decoded : null;
}
