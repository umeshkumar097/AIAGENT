export const DEFAULT_TIMEOUT_MS = 10_000;

export interface JsonResponse<T = any> {
  ok: boolean;
  status: number;
  data: T | null;
  text: string;
}

export function truncate(text: string, max = 300): string {
  const single = text.replace(/\s+/g, " ").trim();
  return single.length > max ? `${single.slice(0, max)}…` : single;
}

export async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new Error(`Request to ${new URL(url).host} timed out after ${timeoutMs} ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/** Performs the request and parses JSON when possible; never throws on HTTP errors so callers can branch on status. */
export async function requestJson<T = any>(url: string, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<JsonResponse<T>> {
  const resp = await fetchWithTimeout(url, init, timeoutMs);
  const text = await resp.text();
  let data: T | null = null;
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      data = null;
    }
  }
  return { ok: resp.ok, status: resp.status, data, text };
}

export function describeFailure(what: string, res: JsonResponse): string {
  const body = res.data && typeof res.data === "object" ? JSON.stringify(res.data) : res.text;
  return `${what} failed (HTTP ${res.status}): ${truncate(body || "empty response")}`;
}

export function jsonHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return { "Content-Type": "application/json", Accept: "application/json", ...extra };
}

export const FORM_HEADERS = { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" };
