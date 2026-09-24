/**
 * Origin a request arrived on (`X-Forwarded-Proto` / `X-Forwarded-Host` / `Host`), used to print real
 * URLs in served documentation. Only a syntactically valid host is accepted (no header injection);
 * anything else falls back to FRONTEND_URL.
 */
import { FRONTEND_URL } from '../engines/payment/webhook-helper';

const HOST_RE = /^[a-z0-9]([a-z0-9.-]{0,252})(:\d{1,5})?$/i;

type HeaderBag = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return (v || '').split(',')[0].trim();
}

export function resolveRequestOrigin(req: { headers: HeaderBag; secure?: boolean }): string {
  const host = first(req.headers['x-forwarded-host']) || first(req.headers.host);
  if (!host || !HOST_RE.test(host)) return FRONTEND_URL;
  const forwardedProto = first(req.headers['x-forwarded-proto']).toLowerCase();
  const hostname = host.split(':')[0].toLowerCase();
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  const proto = forwardedProto === 'http' || forwardedProto === 'https'
    ? forwardedProto
    : (req.secure || !isLocal ? 'https' : 'http');
  return `${proto}://${host}`;
}

/** Replaces the docs placeholder host with the real origin (also in already-escaped or JSON text). */
export function replaceDocsPlaceholder(text: string, origin: string): string {
  return text.replace(/https:\/\/your-domain\.com/g, origin);
}
