import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import type { IntegrationProvider as ProviderKey } from "@shared/schema";

const STATE_TTL_MS = 10 * 60 * 1000;

interface StatePayload {
  userId: string;
  provider: ProviderKey;
  nonce: string;
  exp: number;
}

// Same fallback as server/middleware/auth.ts so dev setups without JWT_SECRET still work;
// production must never sign OAuth state with a public default.
function stateSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") throw new Error("JWT_SECRET is required to sign OAuth state in production");
    return "insecure-dev-secret-CHANGE-ME:integrations-oauth-state";
  }
  return `${secret}:integrations-oauth-state`;
}

function sign(encoded: string): string {
  return createHmac("sha256", stateSecret()).update(encoded).digest("hex");
}

export function signState(userId: string, provider: ProviderKey): string {
  const payload: StatePayload = { userId, provider, nonce: randomBytes(8).toString("hex"), exp: Date.now() + STATE_TTL_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyState(state: string): { userId: string; provider: ProviderKey } | null {
  try {
    const [encoded, sig] = state.split(".");
    if (!encoded || !/^[0-9a-f]{64}$/.test(sig)) return null;
    const expected = Buffer.from(sign(encoded), "hex");
    const given = Buffer.from(sig, "hex");
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString()) as StatePayload;
    if (!payload.userId || !payload.provider || typeof payload.exp !== "number") return null;
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, provider: payload.provider };
  } catch {
    return null;
  }
}
