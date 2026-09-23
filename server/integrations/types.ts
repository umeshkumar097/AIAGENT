import type { UserIntegration, IntegrationProvider as ProviderKey } from "@shared/schema";

export type ProviderKind = "oauth" | "apikey" | "webhook";
export type SyncStatus = "success" | "failed" | "skipped";
export type EventData = Record<string, unknown>;

export interface ExchangeResult {
  accessToken: string;
  refreshToken?: string | null;
  expiresIn?: number | null;
  instanceUrl?: string | null;
  externalAccountId?: string | null;
  accountName?: string | null;
}

export interface RefreshResult {
  accessToken: string;
  refreshToken?: string | null;
  expiresIn?: number | null;
  instanceUrl?: string | null;
}

export interface ValidateResult {
  ok: boolean;
  accountName?: string | null;
  externalAccountId?: string | null;
  error?: string;
}

export interface TestResult extends ValidateResult {
  results?: Array<{ url: string; ok: boolean; httpStatus?: number; error?: string }>;
}

export interface SyncResult {
  action: string;
  status: SyncStatus;
  sourceId?: string | null;
  externalId?: string | null;
  error?: string | null;
  payload?: Record<string, unknown> | null;
}

export interface ConfigResult {
  config: Record<string, unknown>;
  /** Secret to store in `access_token` (Cal.com API key); undefined keeps the stored one */
  accessToken?: string | null;
  error?: string;
}

export interface HandleContext {
  userId: string;
  sourceId: string | null;
  /** Provider-side id previously logged for (action, sourceId), e.g. a Cal.com booking uid */
  findExternalId(action: string, sourceId: string): Promise<string | null>;
}

export interface IntegrationProvider {
  key: ProviderKey;
  displayName: string;
  kind: ProviderKind;
  /** global_settings keys the admin must fill before this provider can be used */
  appKeys: string[];
  getAuthUrl?(redirectUri: string, state: string): Promise<string>;
  exchangeCode?(code: string, redirectUri: string): Promise<ExchangeResult>;
  refresh?(row: UserIntegration): Promise<RefreshResult>;
  revoke?(row: UserIntegration): Promise<void>;
  validate(row: UserIntegration): Promise<ValidateResult>;
  test?(row: UserIntegration): Promise<TestResult>;
  options?(row: UserIntegration): Promise<Record<string, unknown>>;
  applyConfig?(input: Record<string, unknown>, existing: UserIntegration | null): Promise<ConfigResult>;
  publicConfig(row: UserIntegration | null): Record<string, unknown>;
  supports(event: string, row: UserIntegration): boolean;
  handle(row: UserIntegration, event: string, data: EventData, ctx: HandleContext): Promise<SyncResult[]>;
}

/** Thrown when the provider rejects our credentials even after a refresh; the hub marks the row `status: 'error'`. */
export class ProviderAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProviderAuthError";
  }
}

export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return typeof err === "string" ? err : "Unknown error";
}
