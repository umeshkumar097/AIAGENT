'use strict';
/**
 * ============================================================
 * Plivo Phone Number Service
 * 
 * Manages phone number inventory:
 * - Search available numbers by country/region
 * - Purchase numbers
 * - Release numbers
 * - Admin pricing configuration
 * - KYC status tracking for India numbers
 * ============================================================
 */

import * as plivo from 'plivo';
import { db } from "../../../db";
import { plivoPhoneNumbers, plivoCredentials, plivoPhonePricing, users, creditTransactions, globalSettings } from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import type { PlivoPhoneNumber, PlivoNumberSearchResult, PlivoNumberSearchResponse, PlivoNumberPurchaseResponse, PlivoApplication, PlivoApplicationListResponse } from '../types';
import { logger } from '../../../utils/logger';

type PlivoPhoneNumberRecord = typeof plivoPhoneNumbers.$inferSelect;
type InsertPlivoPhoneNumber = typeof plivoPhoneNumbers.$inferInsert;
type PlivoPhonePricingRecord = typeof plivoPhonePricing.$inferSelect;

interface PlivoCredentialRecord {
  id: string;
  authId: string;
  authToken: string;
  isActive: boolean;
  isPrimary: boolean;
}

export interface PhoneNumberSearchResult {
  phoneNumber: string;
  country: string;
  region: string | null;
  city: string | null;
  numberType: 'local' | 'toll_free' | 'national' | 'mobile' | 'fixed';
  subType: string | null;
  capabilities: {
    voice: boolean;
    sms: boolean;
  };
  monthlyRentalRate: number;
  setupRate: number;
  voiceRate: number;
  smsRate: number;
}

/** Public number types accepted by the search ('any' = no Plivo type filter) */
export type PhoneNumberSearchType = 'local' | 'toll_free' | 'national' | 'mobile' | 'fixed' | 'any';

export interface PhoneNumberSearchParams {
  countryCode: string;
  type?: PhoneNumberSearchType;
  region?: string;
  pattern?: string;
  /** Numbers per page (1..MAX_SEARCH_LIMIT, default DEFAULT_SEARCH_LIMIT) */
  limit?: number;
  /** Position of the first number (for "load more") */
  offset?: number;
}

export interface PhoneNumberSearchPage {
  numbers: PhoneNumberSearchResult[];
  offset: number;
  limit: number;
  /** Plivo's total_count for the filter, when it reports one */
  totalCount: number | null;
  hasMore: boolean;
}

export interface PurchaseResult {
  success: boolean;
  phoneNumber: PlivoPhoneNumberRecord;
  creditsDeducted: number;
  kycRequired: boolean;
}

export class PlivoPhoneService {
  private static plivoClients: Map<string, plivo.Client> = new Map();

  /** Plivo's PhoneNumber search returns at most 20 numbers per request */
  static readonly PLIVO_SEARCH_PAGE_SIZE = 20;
  /** Largest page a caller may ask for in one request (3 Plivo requests) */
  static readonly MAX_SEARCH_LIMIT = 60;
  static readonly DEFAULT_SEARCH_LIMIT = 40;

  /**
   * Get or create a Plivo client for a given credential
   */
  private static async getPlivoClient(credentialId?: string): Promise<{ client: plivo.Client; credential: PlivoCredentialRecord }> {
    let credential: PlivoCredentialRecord | undefined;

    if (credentialId) {
      const [cred] = await db
        .select()
        .from(plivoCredentials)
        .where(and(eq(plivoCredentials.id, credentialId), eq(plivoCredentials.isActive, true)))
        .limit(1);
      credential = cred;
    }

    if (!credential) {
      const [primaryCred] = await db
        .select()
        .from(plivoCredentials)
        .where(and(eq(plivoCredentials.isPrimary, true), eq(plivoCredentials.isActive, true)))
        .limit(1);
      credential = primaryCred;
    }

    if (!credential) {
      const [anyCred] = await db
        .select()
        .from(plivoCredentials)
        .where(eq(plivoCredentials.isActive, true))
        .limit(1);
      credential = anyCred;
    }

    if (!credential) {
      throw new Error('No active Plivo credentials found. Please configure Plivo credentials in admin settings.');
    }

    if (!this.plivoClients.has(credential.id)) {
      const client = new plivo.Client(credential.authId, credential.authToken);
      this.plivoClients.set(credential.id, client);
    }

    return {
      client: this.plivoClients.get(credential.id)!,
      credential,
    };
  }

  /**
   * Search available phone numbers from Plivo
   * API: GET https://api.plivo.com/v1/Account/{auth_id}/PhoneNumber/
   * SDK: client.numbers.search(country_iso, options)
   *
   * Plivo returns at most 20 numbers per request (`limit` 1-20) and paginates with `offset`
   * (`meta.limit/offset/total_count/next`). A "page" here is filled from several Plivo requests so
   * callers can ask for up to MAX_SEARCH_LIMIT numbers at once and load more with `offset`.
   *
   * Response structure:
   * {
   *   api_id: string,
   *   meta: { limit, offset, total_count, next, previous },
   *   objects: [{
   *     number: string,
   *     type: 'fixed' | 'mobile' | 'tollfree',
   *     sub_type: 'local' | 'national' | 'fixed' | 'mobile' | 'tollfree',
   *     city: string,
   *     region: string,
   *     country: string,
   *     voice_enabled: boolean,
   *     sms_enabled: boolean,
   *     monthly_rental_rate: string,
   *     setup_rate: string,
   *     voice_rate: string,
   *     sms_rate: string
   *   }]
   * }
   */
  static async searchAvailableNumbers(params: PhoneNumberSearchParams): Promise<PhoneNumberSearchResult[]> {
    const page = await this.searchAvailableNumbersPage(params);
    return page.numbers;
  }

  /** Plivo `type` filter for our public number types (undefined = no filter, every type). */
  private static plivoSearchType(type: PhoneNumberSearchType | undefined): string | undefined {
    switch (type) {
      case 'toll_free': return 'tollfree';
      case 'national': return 'national';
      case 'mobile': return 'mobile';
      case 'fixed': return 'fixed';
      case 'any': return undefined;
      default: return 'local';
    }
  }

  private static async fetchPlivoSearchPage(
    client: plivo.Client,
    countryCode: string,
    searchParams: Record<string, unknown>,
  ): Promise<{ objects: PlivoNumberSearchResult[]; totalCount: number | null }> {
    logger.info(`Search params: country=${countryCode}`, searchParams, 'PlivoPhone');
    // Plivo SDK: client.numbers.search(country_iso, options) — the country code is the FIRST argument
    const response = await client.numbers.search(countryCode, searchParams) as PlivoNumberSearchResponse | PlivoNumberSearchResult[];
    // The SDK may return the objects array directly or wrapped
    if (Array.isArray(response)) return { objects: response, totalCount: null };
    const total = response?.meta?.total_count;
    return { objects: response?.objects || [], totalCount: typeof total === 'number' ? total : null };
  }

  private static mapSearchResult(num: PlivoNumberSearchResult, countryCode: string): PhoneNumberSearchResult {
    // Determine our numberType from Plivo's type/sub_type
    let numberType: PhoneNumberSearchResult['numberType'] = 'local';
    const plivoType = (num.type ?? '').toLowerCase();
    const plivoSubType = (num.sub_type ?? '').toLowerCase();

    if (plivoType === 'tollfree' || plivoSubType === 'tollfree') {
      numberType = 'toll_free';
    } else if (plivoSubType === 'national') {
      numberType = 'national';
    } else if (plivoType === 'mobile') {
      numberType = 'mobile';
    } else if (plivoSubType === 'local' || plivoType === 'local') {
      numberType = 'local';
    } else if (plivoType === 'fixed') {
      numberType = 'fixed';
    }

    return {
      phoneNumber: num.number,
      country: countryCode,
      region: num.region || null,
      city: num.city || null,
      numberType,
      subType: num.sub_type ?? null,
      capabilities: {
        voice: num.voice_enabled === true,
        sms: num.sms_enabled === true,
      },
      monthlyRentalRate: parseFloat(num.monthly_rental_rate ?? '0'),
      setupRate: parseFloat(num.setup_rate ?? '0'),
      voiceRate: parseFloat(num.voice_rate ?? '0'),
      smsRate: parseFloat(num.sms_rate ?? '0'),
    };
  }

  /**
   * One page of purchasable numbers: `limit` (1..MAX_SEARCH_LIMIT, default DEFAULT_SEARCH_LIMIT) numbers
   * starting at `offset`, gathered from as many 20-number Plivo requests as needed. `hasMore` tells the
   * UI whether `offset + numbers.length` is worth requesting.
   */
  static async searchAvailableNumbersPage(params: PhoneNumberSearchParams): Promise<PhoneNumberSearchPage> {
    const countryCode = params.countryCode.toUpperCase();
    const requested = Number.isFinite(params.limit) ? Math.floor(params.limit as number) : this.DEFAULT_SEARCH_LIMIT;
    const limit = Math.min(Math.max(requested, 1), this.MAX_SEARCH_LIMIT);
    const offset = Number.isFinite(params.offset) ? Math.max(0, Math.floor(params.offset as number)) : 0;
    logger.info(`Searching numbers in ${countryCode} (type=${params.type || 'local'}, limit=${limit}, offset=${offset})`, undefined, 'PlivoPhone');

    const { client } = await this.getPlivoClient();

    // Plivo API accepts type: 'tollfree', 'local', 'mobile', 'national', 'fixed'
    let plivoType = this.plivoSearchType(params.type);
    const isLocalSearch = plivoType === 'local';
    const baseParams: Record<string, unknown> = {};
    if (params.region) baseParams.region = params.region;
    if (params.pattern) baseParams.pattern = params.pattern;

    const collected: PlivoNumberSearchResult[] = [];
    const seen = new Set<string>();
    let totalCount: number | null = null;

    try {
      while (collected.length < limit) {
        const pageLimit = Math.min(this.PLIVO_SEARCH_PAGE_SIZE, limit - collected.length);
        const pageOffset = offset + collected.length;
        const searchParams: Record<string, unknown> = { ...baseParams, limit: pageLimit, offset: pageOffset };
        if (plivoType) searchParams.type = plivoType;

        let page = await this.fetchPlivoSearchPage(client, countryCode, searchParams);

        // Many countries (India in particular) classify local numbers as type 'fixed' with sub_type 'local',
        // so a 'local' search comes back empty: retry the same page with type='fixed' and stay on it.
        if (isLocalSearch && plivoType === 'local' && page.objects.length === 0) {
          logger.info(`No results with type='local' at offset ${pageOffset}, retrying with type='fixed'`, undefined, 'PlivoPhone');
          plivoType = 'fixed';
          page = await this.fetchPlivoSearchPage(client, countryCode, { ...searchParams, type: 'fixed' });
        }

        if (page.totalCount !== null) totalCount = page.totalCount;
        for (const num of page.objects) {
          if (!num?.number || seen.has(num.number)) continue;
          seen.add(num.number);
          collected.push(num);
        }
        if (page.objects.length < pageLimit) break; // Plivo ran out of numbers
        if (totalCount !== null && pageOffset + page.objects.length >= totalCount) break;
      }
    } catch (error: any) {
      logger.error(`Search failed: ${error?.message || error}`, error, 'PlivoPhone');
      // Empty result instead of an error when Plivo simply has nothing for this country/filter
      if (error?.message?.includes('not found') || error?.statusCode === 404) {
        logger.info(`No numbers available for ${countryCode}`, undefined, 'PlivoPhone');
        return { numbers: [], offset, limit, totalCount: 0, hasMore: false };
      }
      throw new Error(`Failed to search phone numbers: ${error.message}`);
    }

    if (collected.length === 0) {
      logger.info(`No numbers found for ${countryCode}`, undefined, 'PlivoPhone');
    } else {
      logger.info(`Found ${collected.length} numbers for ${countryCode} (offset ${offset}, total ${totalCount ?? '?'})`, undefined, 'PlivoPhone');
    }

    const numbers = collected.slice(0, limit).map((num) => this.mapSearchResult(num, countryCode));
    const hasMore = collected.length >= limit && (totalCount === null || offset + collected.length < totalCount);
    return { numbers, offset, limit, totalCount, hasMore };
  }

  /**
   * Purchase a phone number for a user
   * API: POST https://api.plivo.com/v1/Account/{auth_id}/PhoneNumber/{number}/
   * SDK: client.numbers.buy(number)
   * 
   * Response: { api_id, message, numbers: [{ number, status }], status }
   * Note: SDK response structure may vary - handle both old and new formats
   */
  static async purchaseNumber(params: {
    userId: string;
    phoneNumber: string;
    country: string;
    region?: string;
    numberType?: 'local' | 'toll_free' | 'national';
    capabilities?: { voice: boolean; sms: boolean };
  }): Promise<PurchaseResult> {
    logger.info(`Purchasing ${params.phoneNumber} for user ${params.userId}`, undefined, 'PlivoPhone');

    // Get user and validate credits
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, params.userId))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    // Get admin pricing for the country
    const pricing = await this.getAdminPricingRecord(params.country.toUpperCase());
    if (!pricing) {
      throw new Error(`Phone numbers not available for country: ${params.country}. Contact admin.`);
    }

    if (!pricing.isActive) {
      throw new Error(`Phone numbers are disabled for ${pricing.countryName}`);
    }

    // Check user credits
    if (user.credits < pricing.purchaseCredits) {
      throw new Error(`Insufficient credits. Required: ${pricing.purchaseCredits}, Available: ${user.credits}`);
    }

    // Get Plivo client and purchase the number
    const { client, credential } = await this.getPlivoClient();

    let plivoNumberId: string;
    try {
      // SDK: client.numbers.buy(phoneNumber)
      // Response: { api_id, message, numbers: [{ number, status }], status } or { number, status, message }
      const response = await client.numbers.buy(params.phoneNumber);
      logger.info(`Buy response`, response, 'PlivoPhone');
      
      // Handle different response formats
      const responseAny = response as PlivoNumberPurchaseResponse;
      if (responseAny?.numbers && Array.isArray(responseAny.numbers)) {
        plivoNumberId = responseAny.numbers[0]?.number ?? params.phoneNumber;
      } else if (responseAny?.number) {
        plivoNumberId = responseAny.number;
      } else {
        // Fallback to input phone number
        plivoNumberId = params.phoneNumber;
      }
      logger.info(`Successfully purchased ${params.phoneNumber} via Plivo, ID: ${plivoNumberId}`, undefined, 'PlivoPhone');
    } catch (error: any) {
      logger.error('Plivo purchase failed', error, 'PlivoPhone');
      // Check for KYC-related errors
      if (error?.message?.includes('KYC') || error?.message?.includes('verification') || error?.message?.includes('compliance')) {
        throw new Error(`KYC verification required to purchase numbers in ${params.country}. Please complete verification first.`);
      }
      throw new Error(`Failed to purchase number: ${error.message}`);
    }

    // Calculate next billing date (1 month from now)
    const nextBillingDate = new Date();
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

    // Create phone number record - use passed capabilities from search, default to true
    const capabilities = params.capabilities || { voice: true, sms: true };
    
    const [phoneRecord] = await db
      .insert(plivoPhoneNumbers)
      .values({
        userId: params.userId,
        plivoCredentialId: credential.id,
        phoneNumber: params.phoneNumber,
        plivoNumberId: plivoNumberId,
        friendlyName: params.phoneNumber,
        country: params.country.toUpperCase(),
        region: params.region || null,
        numberType: params.numberType || 'local',
        capabilities,
        status: pricing.kycRequired ? 'pending' : 'active',
        kycStatus: pricing.kycRequired ? 'pending' : null,
        purchaseCredits: pricing.purchaseCredits,
        monthlyCredits: pricing.monthlyCredits,
        nextBillingDate,
        purchasedAt: new Date(),
      } as InsertPlivoPhoneNumber)
      .returning();

    // Deduct credits
    await db
      .update(users)
      .set({
        credits: sql`GREATEST(0, ${users.credits} - ${pricing.purchaseCredits})`,
      })
      .where(eq(users.id, params.userId));

    // Record credit transaction
    await db.insert(creditTransactions).values({
      userId: params.userId,
      type: 'usage',
      amount: -pricing.purchaseCredits,
      description: `Phone number purchase: ${params.phoneNumber} (${pricing.countryName})`,
      reference: phoneRecord.id,
    });

    logger.info(`Deducted ${pricing.purchaseCredits} credits for number ${params.phoneNumber}`, undefined, 'PlivoPhone');

    return {
      success: true,
      phoneNumber: phoneRecord,
      creditsDeducted: pricing.purchaseCredits,
      kycRequired: pricing.kycRequired,
    };
  }

  /**
   * True when Plivo lists `phoneNumber` as purchasable in `countryCode` — used to validate paid orders before
   * checkout so only Plivo-fulfillable numbers are ever charged for. Plivo's `pattern` filter is a prefix on the
   * digits after the country calling code (pattern 415 → numbers starting with 1415), so the digits after a
   * 1–3 digit code (and the full string) are tried. The search runs WITHOUT a type filter first so a number
   * listed as toll-free / national / fixed is never rejected because the caller guessed its type wrong.
   */
  static async isNumberAvailableForPurchase(
    countryCode: string,
    phoneNumber: string,
    type: PhoneNumberSearchType = 'local',
  ): Promise<boolean> {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length < 6) return false;
    const matches = (results: PhoneNumberSearchResult[]) => results.some((r) => r.phoneNumber.replace(/\D/g, '') === digits);
    const candidates = Array.from(new Set([digits.slice(1), digits.slice(2), digits.slice(3), digits].filter((p) => p.length >= 4)));
    for (const pattern of candidates) {
      const page = await this.searchAvailableNumbersPage({ countryCode, type: 'any', pattern, limit: this.PLIVO_SEARCH_PAGE_SIZE });
      if (matches(page.numbers)) return true;
    }
    // Some inventories only answer type-filtered searches: retry with the type the number was listed under
    if (type !== 'any') {
      for (const pattern of candidates) {
        const page = await this.searchAvailableNumbersPage({ countryCode, type, pattern, limit: this.PLIVO_SEARCH_PAGE_SIZE });
        if (matches(page.numbers)) return true;
      }
    }
    return false;
  }

  /** Plivo number id when the account already rents `phoneNumber`, else null (404 = not rented). */
  private static async rentedNumberId(client: unknown, phoneNumber: string): Promise<string | null> {
    try {
      const rented = await (client as { numbers: { get: (n: string) => Promise<{ number?: string } | undefined> } }).numbers.get(phoneNumber);
      return rented ? (rented.number || phoneNumber) : null;
    } catch {
      return null;
    }
  }

  /**
   * Purchase a Plivo number that was PAID for in INR via Cashfree (no credit deduction
   * for the purchase; the number keeps being billed monthly in credits by the phone billing cron).
   * Called by billingService.completePurchase after the payment is confirmed.
   * Idempotent: if the number already belongs to this user, the existing row is returned.
   */
  static async purchaseNumberPaid(params: {
    userId: string;
    phoneNumber: string;
    country: string;
    transactionId: string;
  }): Promise<PlivoPhoneNumberRecord> {
    const country = params.country.toUpperCase();
    logger.info(`Purchasing paid number ${params.phoneNumber} for user ${params.userId} (txn ${params.transactionId})`, undefined, 'PlivoPhone');

    const existing = await this.getPhoneNumberByNumber(params.phoneNumber);
    if (existing && existing.userId === params.userId && existing.status !== 'released') {
      logger.info(`Number ${params.phoneNumber} already owned by user ${params.userId}; skipping purchase`, undefined, 'PlivoPhone');
      return existing;
    }
    if (existing && existing.status !== 'released') {
      throw new Error(`Phone number ${params.phoneNumber} is already assigned to another account`);
    }

    const pricing = await this.getAdminPricingRecord(country);
    if (!pricing) {
      throw new Error(`Phone numbers not available for country: ${country}. Contact admin.`);
    }

    const { client, credential } = await this.getPlivoClient();

    let plivoNumberId: string;
    try {
      const response = await client.numbers.buy(params.phoneNumber);
      const responseAny = response as PlivoNumberPurchaseResponse;
      if (responseAny?.numbers && Array.isArray(responseAny.numbers)) {
        plivoNumberId = responseAny.numbers[0]?.number ?? params.phoneNumber;
      } else if (responseAny?.number) {
        plivoNumberId = responseAny.number;
      } else {
        plivoNumberId = params.phoneNumber;
      }
      logger.info(`Purchased ${params.phoneNumber} via Plivo (paid, txn ${params.transactionId})`, undefined, 'PlivoPhone');
    } catch (error: any) {
      // A previous attempt may have bought the number but died before the DB write: the account already rents it
      const rented = await this.rentedNumberId(client, params.phoneNumber);
      if (!rented) {
        logger.error('Plivo purchase failed in paid flow', error, 'PlivoPhone');
        throw new Error(`Failed to purchase number from Plivo: ${error.message}`);
      }
      plivoNumberId = rented;
      logger.warn(`Plivo reports ${params.phoneNumber} already rented by this account; treating as purchased (txn ${params.transactionId})`, undefined, 'PlivoPhone');
    }

    const nextBillingDate = new Date();
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

    const values = {
      userId: params.userId,
      plivoCredentialId: credential.id,
      phoneNumber: params.phoneNumber,
      plivoNumberId,
      friendlyName: params.phoneNumber,
      country,
      numberType: 'local',
      capabilities: { voice: true, sms: true },
      status: pricing.kycRequired ? 'pending' : 'active',
      kycStatus: pricing.kycRequired ? 'pending' : null,
      purchaseCredits: 0,
      monthlyCredits: pricing.monthlyCredits,
      nextBillingDate,
      purchasedAt: new Date(),
    } as InsertPlivoPhoneNumber;

    let phoneRecord: PlivoPhoneNumberRecord;
    if (existing) {
      // Re-activate a previously released row (phone_number is unique)
      const [updated] = await db
        .update(plivoPhoneNumbers)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(plivoPhoneNumbers.id, existing.id))
        .returning();
      phoneRecord = updated;
    } else {
      const [inserted] = await db.insert(plivoPhoneNumbers).values(values).returning();
      phoneRecord = inserted;
    }

    logger.info(`Saved paid number ${params.phoneNumber} (row ${phoneRecord.id}, txn ${params.transactionId})`, undefined, 'PlivoPhone');
    return phoneRecord;
  }

  /**
   * Get all phone numbers for a user (active/pending, not released)
   */
  static async getUserPhoneNumbers(userId: string) {
    return db
      .select()
      .from(plivoPhoneNumbers)
      .where(
        sql`${plivoPhoneNumbers.userId} = ${userId} AND ${plivoPhoneNumbers.status} != 'released'`
      )
      .orderBy(desc(plivoPhoneNumbers.createdAt));
  }

  /**
   * Release a phone number (cancel and remove)
   */
  static async releaseNumber(phoneNumberId: string): Promise<void> {
    logger.info(`Releasing number ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [phoneRecord] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .limit(1);

    if (!phoneRecord) {
      throw new Error('Phone number not found');
    }

    // Get Plivo client
    const { client } = await this.getPlivoClient(phoneRecord.plivoCredentialId || undefined);

    // Release from Plivo
    // Note: The Plivo SDK does not export the 'unrent' method in its TypeScript types,
    // but it exists at runtime per their API documentation
    try {
      await (client as { numbers: { unrent: (numberId: string) => Promise<void> } }).numbers.unrent(phoneRecord.plivoNumberId);
      logger.info(`Released ${phoneRecord.phoneNumber} from Plivo`, undefined, 'PlivoPhone');
    } catch (error: any) {
      logger.error('Plivo release failed (may already be released)', error, 'PlivoPhone');
      // Continue to update our records even if Plivo fails
    }

    // Update status in database
    await db
      .update(plivoPhoneNumbers)
      .set({
        status: 'released',
        updatedAt: new Date(),
      })
      .where(eq(plivoPhoneNumbers.id, phoneNumberId));

    logger.info(`Number ${phoneNumberId} marked as released`, undefined, 'PlivoPhone');
  }

  /**
   * Get all phone numbers for a user
   */
  static async getUserNumbers(userId: string): Promise<PlivoPhoneNumberRecord[]> {
    const numbers = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(
        and(
          eq(plivoPhoneNumbers.userId, userId),
          sql`${plivoPhoneNumbers.status} != 'released'`
        )
      )
      .orderBy(desc(plivoPhoneNumbers.createdAt));

    return numbers;
  }

  /**
   * Get a single phone number by ID
   */
  static async getPhoneNumberById(phoneNumberId: string): Promise<PlivoPhoneNumberRecord | null> {
    const [number] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .limit(1);

    return number || null;
  }

  /**
   * Get a phone number by phone number string
   */
  static async getPhoneNumberByNumber(phoneNumber: string): Promise<PlivoPhoneNumberRecord | null> {
    const [number] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.phoneNumber, phoneNumber))
      .limit(1);

    return number || null;
  }

  /**
   * Configure webhook URLs for a phone number (for incoming calls)
   * 
   * Plivo requires creating an Application with webhook URLs, then
   * assigning that application's app_id to the phone number.
   * 
   * SDK methods:
   * - client.applications.create(params) - creates app with answer_url, etc.
   * - client.numbers.update(number, { app_id }) - assigns app to number
   */
  static async configureWebhooks(phoneNumberId: string, baseUrl: string): Promise<void> {
    logger.info(`Configuring webhooks for ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [phoneRecord] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .limit(1);

    if (!phoneRecord) {
      throw new Error('Phone number not found');
    }

    const { client } = await this.getPlivoClient(phoneRecord.plivoCredentialId || undefined);

    try {
      const answerUrl = `${baseUrl}/api/plivo/incoming`;
      const hangupUrl = `${baseUrl}/api/plivo/voice/status`;

      const appNameSettingResult = await db.select().from(globalSettings).where(eq(globalSettings.key, 'app_name')).limit(1);
      const appNameRaw = appNameSettingResult[0]?.value;
      const platformName = (typeof appNameRaw === 'string' ? appNameRaw.trim() : '') || 'platform';
      const appName = `${platformName}-${phoneRecord.phoneNumber}`;

      // Create or update a Plivo Application with the webhook URLs
      let appId: string;
      
      // First, try to find and delete any existing app with this name
      // This ensures a clean configuration
      try {
        const appsResponse = await client.applications.list({ limit: 100 }) as unknown as PlivoApplicationListResponse;
        const appsList: PlivoApplication[] = Array.isArray(appsResponse) ? appsResponse as unknown as PlivoApplication[] : (appsResponse?.objects || []);
        const existingApp = appsList.find((app: PlivoApplication) => 
          app.app_name === appName || app.appName === appName
        );
        
        if (existingApp) {
          const existingAppId = existingApp.appId || existingApp.app_id;
          logger.info(`Deleting existing application ${existingAppId}`, undefined, 'PlivoPhone');
          try {
            await client.applications.delete(existingAppId!);
            logger.info(`Deleted old application ${existingAppId}`, undefined, 'PlivoPhone');
          } catch (deleteError: any) {
            logger.info(`Could not delete app (may be in use): ${deleteError.message}`, undefined, 'PlivoPhone');
          }
        }
      } catch (listError: any) {
        logger.info(`Could not list apps: ${listError.message}`, undefined, 'PlivoPhone');
      }

      // Now create a fresh application
      try {
        const appResponse = await client.applications.create(
          appName, // app_name
          {
            answerUrl,
            answerMethod: 'POST',
            hangupUrl,
            hangupMethod: 'POST',
            fallbackAnswerUrl: answerUrl,
            fallbackMethod: 'POST',
          }
        ) as unknown as { appId?: string; app_id?: string };
        appId = appResponse.appId || appResponse.app_id || '';
        logger.info(`Created new application ${appId} for ${phoneRecord.phoneNumber}`, undefined, 'PlivoPhone');
      } catch (createError: any) {
        // If creation still fails (app not deleted), find and update existing
        logger.info(`Could not create app, finding existing: ${createError.message}`, undefined, 'PlivoPhone');
        
        const appsResponse = await client.applications.list({ limit: 100 }) as unknown as PlivoApplicationListResponse;
        const appsList: PlivoApplication[] = Array.isArray(appsResponse) ? appsResponse as unknown as PlivoApplication[] : (appsResponse?.objects || []);
        const existingApp = appsList.find((app: PlivoApplication) => 
          app.app_name === appName || app.appName === appName
        );
        
        if (existingApp) {
          appId = existingApp.appId || existingApp.app_id || '';
          logger.info(`Using existing application ${appId}`, undefined, 'PlivoPhone');
          
          // Update the existing app with new URLs
          await client.applications.update(appId, {
            answerUrl,
            answerMethod: 'POST',
            hangupUrl,
            hangupMethod: 'POST',
          } as any);
          logger.info(`Updated application URLs`, undefined, 'PlivoPhone');
        } else {
          throw createError;
        }
      }

      // Assign the application to the phone number
      // NOTE: Plivo SDK expects snake_case 'app_id', not camelCase 'appId'
      logger.info(`Assigning app ${appId} to number ${phoneRecord.plivoNumberId}`, undefined, 'PlivoPhone');
      const updateResult = await client.numbers.update(phoneRecord.plivoNumberId, {
        appId: appId,
      } as any);
      logger.info(`Number update result`, updateResult, 'PlivoPhone');

      logger.info(`Webhooks configured for ${phoneRecord.phoneNumber} via app ${appId}`, undefined, 'PlivoPhone');
    } catch (error: any) {
      logger.error('Webhook configuration failed', error, 'PlivoPhone');
      throw new Error(`Failed to configure webhooks: ${error.message}`);
    }
  }

  /**
   * Assign an incoming agent to a phone number
   */
  static async assignAgent(phoneNumberId: string, agentId: string): Promise<PlivoPhoneNumberRecord> {
    logger.info(`Assigning agent ${agentId} to number ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [updatedNumber] = await db
      .update(plivoPhoneNumbers)
      .set({
        assignedAgentId: agentId,
        updatedAt: new Date(),
      })
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .returning();

    if (!updatedNumber) {
      throw new Error('Phone number not found');
    }

    return updatedNumber;
  }

  /**
   * Unassign agent from a phone number
   */
  static async unassignAgent(phoneNumberId: string): Promise<PlivoPhoneNumberRecord> {
    logger.info(`Unassigning agent from number ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [updatedNumber] = await db
      .update(plivoPhoneNumbers)
      .set({
        assignedAgentId: null,
        updatedAt: new Date(),
      })
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .returning();

    if (!updatedNumber) {
      throw new Error('Phone number not found');
    }

    return updatedNumber;
  }

  /**
   * Clear webhooks from a phone number (for when removing an incoming connection)
   * This removes the application assignment from the number on Plivo
   */
  static async clearWebhooks(phoneNumberId: string): Promise<void> {
    logger.info(`Clearing webhooks for ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [phoneRecord] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .limit(1);

    if (!phoneRecord) {
      throw new Error('Phone number not found');
    }

    const { client } = await this.getPlivoClient(phoneRecord.plivoCredentialId || undefined);

    try {
      // Note: Plivo SDK doesn't export types for numbers.update method
      const clientAny = client as any;
      
      // Remove app assignment from phone number by setting app_id to empty
      await clientAny.numbers.update(phoneRecord.plivoNumberId, {
        appId: '',
      });

      logger.info(`Webhooks cleared for ${phoneRecord.phoneNumber}`, undefined, 'PlivoPhone');
    } catch (error: any) {
      logger.error('Failed to clear webhooks', error, 'PlivoPhone');
      // Don't throw - allow unassignment even if Plivo update fails
    }
  }

  // ============================================================
  // Admin Pricing Management
  // ============================================================

  /**
   * Get admin pricing record for a country (internal)
   */
  private static async getAdminPricingRecord(countryCode: string): Promise<PlivoPhonePricingRecord | null> {
    const [pricing] = await db
      .select()
      .from(plivoPhonePricing)
      .where(eq(plivoPhonePricing.countryCode, countryCode.toUpperCase()))
      .limit(1);

    return pricing || null;
  }

  /**
   * Get admin pricing for a country (public API)
   */
  static async getAdminPricing(countryCode: string): Promise<{
    purchaseCredits: number;
    monthlyCredits: number;
    kycRequired: boolean;
    countryName: string;
    isActive: boolean;
  } | null> {
    const pricing = await this.getAdminPricingRecord(countryCode);
    if (!pricing) return null;

    return {
      purchaseCredits: pricing.purchaseCredits,
      monthlyCredits: pricing.monthlyCredits,
      kycRequired: pricing.kycRequired,
      countryName: pricing.countryName,
      isActive: pricing.isActive,
    };
  }

  /**
   * Get all admin pricing records
   */
  static async getAllAdminPricing(): Promise<PlivoPhonePricingRecord[]> {
    const pricing = await db
      .select()
      .from(plivoPhonePricing)
      .orderBy(plivoPhonePricing.countryName);

    return pricing;
  }

  /**
   * Set admin pricing for a country
   */
  static async setAdminPricing(countryCode: string, pricing: {
    countryName: string;
    purchaseCredits: number;
    monthlyCredits: number;
    kycRequired?: boolean;
    isActive?: boolean;
  }): Promise<PlivoPhonePricingRecord> {
    logger.info(`Setting pricing for ${countryCode}`, undefined, 'PlivoPhone');

    const code = countryCode.toUpperCase();

    // Check if pricing exists
    const existing = await this.getAdminPricingRecord(code);

    if (existing) {
      // Update existing
      const [updated] = await db
        .update(plivoPhonePricing)
        .set({
          countryName: pricing.countryName,
          purchaseCredits: pricing.purchaseCredits,
          monthlyCredits: pricing.monthlyCredits,
          kycRequired: pricing.kycRequired ?? existing.kycRequired,
          isActive: pricing.isActive ?? existing.isActive,
          updatedAt: new Date(),
        })
        .where(eq(plivoPhonePricing.id, existing.id))
        .returning();

      return updated;
    } else {
      // Create new
      const [created] = await db
        .insert(plivoPhonePricing)
        .values({
          countryCode: code,
          countryName: pricing.countryName,
          purchaseCredits: pricing.purchaseCredits,
          monthlyCredits: pricing.monthlyCredits,
          kycRequired: pricing.kycRequired ?? false,
          isActive: pricing.isActive ?? true,
        })
        .returning();

      return created;
    }
  }

  /**
   * Delete admin pricing for a country
   */
  static async deleteAdminPricing(countryCode: string): Promise<void> {
    logger.info(`Deleting pricing for ${countryCode}`, undefined, 'PlivoPhone');

    await db
      .delete(plivoPhonePricing)
      .where(eq(plivoPhonePricing.countryCode, countryCode.toUpperCase()));
  }

  // ============================================================
  // Monthly Billing
  // ============================================================

  /**
   * Process monthly billing for all active phone numbers
   * Called by cron job
   */
  static async processMonthlyBilling(): Promise<{
    processed: number;
    suspended: number;
    errors: string[];
  }> {
    logger.info(`Processing monthly billing`, undefined, 'PlivoPhone');

    const now = new Date();
    const results = { processed: 0, suspended: 0, errors: [] as string[] };

    // Get all numbers due for billing
    const numbersDue = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(
        and(
          eq(plivoPhoneNumbers.status, 'active'),
          sql`${plivoPhoneNumbers.nextBillingDate} <= ${now}`
        )
      );

    for (const number of numbersDue) {
      if (!number.userId) {
        results.errors.push(`Number ${number.phoneNumber} has no owner`);
        continue;
      }

      try {
        // Get user credits
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, number.userId))
          .limit(1);

        if (!user) {
          results.errors.push(`User not found for number ${number.phoneNumber}`);
          continue;
        }

        if (user.credits < number.monthlyCredits) {
          // Insufficient credits - suspend number
          await db
            .update(plivoPhoneNumbers)
            .set({
              status: 'suspended',
              updatedAt: new Date(),
            })
            .where(eq(plivoPhoneNumbers.id, number.id));

          results.suspended++;
          logger.info(`Suspended ${number.phoneNumber} - insufficient credits`, undefined, 'PlivoPhone');
          continue;
        }

        // Deduct monthly credits
        await db
          .update(users)
          .set({
            credits: sql`GREATEST(0, ${users.credits} - ${number.monthlyCredits})`,
          })
          .where(eq(users.id, number.userId));

        // Record transaction
        await db.insert(creditTransactions).values({
          userId: number.userId,
          type: 'usage',
          amount: -number.monthlyCredits,
          description: `Monthly phone rental: ${number.phoneNumber}`,
          reference: number.id,
        });

        // Update next billing date
        const nextBilling = new Date();
        nextBilling.setMonth(nextBilling.getMonth() + 1);

        await db
          .update(plivoPhoneNumbers)
          .set({
            nextBillingDate: nextBilling,
            updatedAt: new Date(),
          })
          .where(eq(plivoPhoneNumbers.id, number.id));

        results.processed++;
        logger.info(`Billed ${number.monthlyCredits} credits for ${number.phoneNumber}`, undefined, 'PlivoPhone');

      } catch (error: any) {
        results.errors.push(`Error billing ${number.phoneNumber}: ${error.message}`);
      }
    }

    logger.info(`Billing complete: ${results.processed} processed, ${results.suspended} suspended`, undefined, 'PlivoPhone');
    return results;
  }

  /**
   * Reactivate a suspended number after user adds credits
   */
  static async reactivateNumber(phoneNumberId: string): Promise<PlivoPhoneNumberRecord> {
    logger.info(`Reactivating number ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [number] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .limit(1);

    if (!number) {
      throw new Error('Phone number not found');
    }

    if (number.status !== 'suspended') {
      throw new Error('Number is not suspended');
    }

    // Get user and verify credits
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, number.userId!))
      .limit(1);

    if (!user || user.credits < number.monthlyCredits) {
      throw new Error('Insufficient credits to reactivate');
    }

    // Deduct monthly credits for immediate billing
    await db
      .update(users)
      .set({
        credits: sql`GREATEST(0, ${users.credits} - ${number.monthlyCredits})`,
      })
      .where(eq(users.id, number.userId!));

    // Record transaction
    await db.insert(creditTransactions).values({
      userId: number.userId!,
      type: 'usage',
      amount: -number.monthlyCredits,
      description: `Phone reactivation: ${number.phoneNumber}`,
      reference: number.id,
    });

    // Calculate next billing date
    const nextBilling = new Date();
    nextBilling.setMonth(nextBilling.getMonth() + 1);

    // Reactivate
    const [updated] = await db
      .update(plivoPhoneNumbers)
      .set({
        status: 'active',
        nextBillingDate: nextBilling,
        updatedAt: new Date(),
      })
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .returning();

    logger.info(`Reactivated ${number.phoneNumber}`, undefined, 'PlivoPhone');
    return updated;
  }

  /**
   * Get phone number statistics for admin dashboard
   */
  static async getPhoneStats(): Promise<{
    total: number;
    active: number;
    pending: number;
    suspended: number;
    byCountry: Record<string, number>;
  }> {
    const numbers = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(sql`${plivoPhoneNumbers.status} != 'released'`);

    const stats = {
      total: numbers.length,
      active: 0,
      pending: 0,
      suspended: 0,
      byCountry: {} as Record<string, number>,
    };

    for (const num of numbers) {
      if (num.status === 'active') stats.active++;
      else if (num.status === 'pending') stats.pending++;
      else if (num.status === 'suspended') stats.suspended++;

      stats.byCountry[num.country] = (stats.byCountry[num.country] || 0) + 1;
    }

    return stats;
  }

  /**
   * Clear cached Plivo clients (useful when credentials are updated)
   */
  static clearClientCache(): void {
    this.plivoClients.clear();
    logger.info('Cleared Plivo client cache', undefined, 'PlivoPhone');
  }

  /**
   * List all phone numbers from Plivo account (admin sync)
   * API Docs: https://www.plivo.com/docs/numbers/api/account-phone-number/list-all-my-numbers
   */
  static async listAccountNumbers(): Promise<{
    numbers: Array<{
      number: string;
      country: string;
      region?: string;
      numberType: string;
      voiceEnabled: boolean;
      smsEnabled: boolean;
      monthlyRentalRate: number;
    }>;
    syncedCount: number;
    newNumbers: string[];
  }> {
    logger.info('Fetching account numbers for sync', undefined, 'PlivoPhone');

    const { client, credential } = await this.getPlivoClient();

    try {
      // Paginate through all numbers from Plivo account
      const allPlivoNumbers: any[] = [];
      let offset = 0;
      const limit = 100;
      let hasMore = true;

      while (hasMore) {
        // Plivo SDK: numbers.list() returns rented numbers
        // API: GET https://api.plivo.com/v1/Account/{auth_id}/Number/
        logger.info(`Calling Plivo numbers.list with limit=${limit}, offset=${offset}`, undefined, 'PlivoPhone');
        
        let response: any;
        try {
          response = await (client as any).numbers.list({ limit, offset });
          logger.info(`Plivo API raw response type: ${typeof response}, keys: ${response ? Object.keys(response) : 'null'}`, undefined, 'PlivoPhone');
          logger.info(`Plivo API response:`, JSON.stringify(response, null, 2).substring(0, 500), 'PlivoPhone');
        } catch (apiError: any) {
          logger.error(`Plivo numbers.list API error: ${apiError.message}`, apiError, 'PlivoPhone');
          throw apiError;
        }
        
        // Handle different response formats from Plivo SDK
        let pageNumbers: any[] = [];
        if (Array.isArray(response)) {
          pageNumbers = response;
        } else if (response?.objects && Array.isArray(response.objects)) {
          pageNumbers = response.objects;
        } else if (response && typeof response === 'object') {
          // Try to extract numbers from the response
          const keys = Object.keys(response);
          logger.info(`Response keys: ${keys.join(', ')}`, undefined, 'PlivoPhone');
          if (response.meta && response.objects === undefined) {
            pageNumbers = [];
          }
        }
        
        allPlivoNumbers.push(...pageNumbers);
        logger.info(`Fetched ${pageNumbers.length} numbers (offset: ${offset})`, undefined, 'PlivoPhone');

        // Check if there are more pages
        if (pageNumbers.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }

      const plivoNumbers = allPlivoNumbers;
      logger.info(`Found ${plivoNumbers.length} total numbers in Plivo account`, undefined, 'PlivoPhone');

      // Get existing numbers in our database
      const existingNumbers = await db
        .select()
        .from(plivoPhoneNumbers)
        .where(eq(plivoPhoneNumbers.plivoCredentialId, credential.id));

      const existingSet = new Set(existingNumbers.map(n => n.phoneNumber));
      const newNumbers: string[] = [];

      const formattedNumbers = plivoNumbers.map((num: any) => {
        const numberData = {
          number: num.number,
          country: num.country || 'US',
          region: num.region || num.city || null,
          numberType: num.number_type || num.type || 'local',
          voiceEnabled: num.voice_enabled === true,
          smsEnabled: num.sms_enabled === true,
          monthlyRentalRate: parseFloat(num.monthly_rental_rate || '0'),
        };

        if (!existingSet.has(num.number)) {
          newNumbers.push(num.number);
        }

        return numberData;
      });

      return {
        numbers: formattedNumbers,
        syncedCount: plivoNumbers.length,
        newNumbers,
      };
    } catch (error: any) {
      logger.error('Failed to list account numbers', error, 'PlivoPhone');
      throw new Error(`Failed to fetch Plivo account numbers: ${error.message}`);
    }
  }

  /**
   * Sync Plivo account numbers to database (admin)
   * Full bidirectional sync:
   * - Imports new numbers from Plivo that aren't tracked
   * - Updates existing numbers with changed properties
   * - Marks numbers as released that no longer exist in Plivo
   */
  static async syncAccountNumbers(): Promise<{
    imported: number;
    updated: number;
    removed: number;
    skipped: number;
    errors: string[];
  }> {
    logger.info('Starting full account number sync', undefined, 'PlivoPhone');

    const { credential } = await this.getPlivoClient();
    const { numbers: plivoNumbers } = await this.listAccountNumbers();

    // Create a map of Plivo numbers for quick lookup
    const plivoNumberMap = new Map<string, typeof plivoNumbers[0]>();
    for (const num of plivoNumbers) {
      plivoNumberMap.set(num.number, num);
    }

    // Get existing numbers from database for this credential
    const existingNumbers = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.plivoCredentialId, credential.id));

    const existingMap = new Map<string, typeof existingNumbers[0]>();
    for (const num of existingNumbers) {
      existingMap.set(num.phoneNumber, num);
    }

    let imported = 0;
    let updated = 0;
    let removed = 0;
    let skipped = 0;
    const errors: string[] = [];

    // 1. Process numbers from Plivo (import new, update existing)
    for (const num of plivoNumbers) {
      const existing = existingMap.get(num.number);

      if (existing) {
        // Number exists in both - check if update needed
        try {
          // Normalize numberType for comparison
          const normalizedType = (num.numberType || 'local') as 'local' | 'toll_free' | 'national';
          
          const needsUpdate = 
            existing.country !== (num.country || 'US') ||
            existing.region !== (num.region || null) ||
            existing.numberType !== normalizedType ||
            existing.status === 'released' || // Reactivate if was released
            existing.status === 'suspended' || // Reactivate if was suspended
            JSON.stringify(existing.capabilities) !== JSON.stringify({ voice: num.voiceEnabled, sms: num.smsEnabled });

          if (needsUpdate) {
            await db
              .update(plivoPhoneNumbers)
              .set({
                country: num.country || 'US',
                region: num.region || null,
                numberType: normalizedType,
                capabilities: { voice: num.voiceEnabled, sms: num.smsEnabled },
                status: 'active', // Reactivate if it was released/suspended but is back in Plivo
                updatedAt: new Date(),
              })
              .where(eq(plivoPhoneNumbers.id, existing.id));
            
            updated++;
            logger.info(`Updated ${num.number}`, undefined, 'PlivoPhone');
          } else {
            skipped++;
          }
        } catch (err: any) {
          errors.push(`Update ${num.number}: ${err.message}`);
        }
      } else {
        // New number - import it
        try {
          await db.insert(plivoPhoneNumbers).values({
            plivoCredentialId: credential.id,
            phoneNumber: num.number,
            plivoNumberId: num.number,
            friendlyName: num.number,
            country: num.country || 'US',
            region: num.region || null,
            numberType: (num.numberType || 'local') as 'local' | 'toll_free' | 'national',
            capabilities: { 
              voice: num.voiceEnabled, 
              sms: num.smsEnabled 
            },
            status: 'active',
            purchaseCredits: 0,
            monthlyCredits: 0,
            purchasedAt: new Date(),
            isSystemPool: true,
          } as InsertPlivoPhoneNumber);

          imported++;
          logger.info(`Imported ${num.number}`, undefined, 'PlivoPhone');
        } catch (err: any) {
          errors.push(`Import ${num.number}: ${err.message}`);
        }
      }
    }

    // 2. Mark numbers as released that exist in DB but not in Plivo
    // Also clear relationships (user, agent, webhooks) to prevent stale references
    for (const existing of existingNumbers) {
      // Skip if already released or if it exists in Plivo
      if (existing.status === 'released' || plivoNumberMap.has(existing.phoneNumber)) {
        continue;
      }

      try {
        await db
          .update(plivoPhoneNumbers)
          .set({
            status: 'released',
            userId: null, // Clear user assignment
            assignedAgentId: null, // Clear agent assignment
            openaiCredentialId: null, // Clear OpenAI credential link
            updatedAt: new Date(),
          })
          .where(eq(plivoPhoneNumbers.id, existing.id));

        removed++;
        logger.info(`Marked ${existing.phoneNumber} as released and cleared relationships (not in Plivo)`, undefined, 'PlivoPhone');
      } catch (err: any) {
        errors.push(`Remove ${existing.phoneNumber}: ${err.message}`);
      }
    }

    logger.info(`Sync complete: ${imported} imported, ${updated} updated, ${removed} removed, ${skipped} unchanged, ${errors.length} errors`, undefined, 'PlivoPhone');

    return { imported, updated, removed, skipped, errors };
  }

  /**
   * Unrent (release) a number from Plivo account
   * API Docs: https://www.plivo.com/docs/numbers/api/account-phone-number/unrent-a-number
   */
  static async unrentNumber(phoneNumberId: string): Promise<void> {
    logger.info(`Unrenting number ${phoneNumberId}`, undefined, 'PlivoPhone');

    const [phoneRecord] = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .limit(1);

    if (!phoneRecord) {
      throw new Error('Phone number not found');
    }

    const { client } = await this.getPlivoClient(phoneRecord.plivoCredentialId || undefined);

    try {
      // Note: Plivo SDK doesn't export types for numbers.unrent method
      await (client as any).numbers.unrent(phoneRecord.phoneNumber);
      logger.info(`Successfully unrented ${phoneRecord.phoneNumber} from Plivo`, undefined, 'PlivoPhone');
    } catch (error: any) {
      // If the number is already released, just log and continue
      if (error?.statusCode === 404 || error?.message?.includes('not found')) {
        logger.info(`Number ${phoneRecord.phoneNumber} already released from Plivo`, undefined, 'PlivoPhone');
      } else {
        logger.error('Unrent failed', error, 'PlivoPhone');
        throw new Error(`Failed to unrent number: ${error.message}`);
      }
    }

    // Update status in database
    await db
      .update(plivoPhoneNumbers)
      .set({
        status: 'released',
        updatedAt: new Date(),
      })
      .where(eq(plivoPhoneNumbers.id, phoneNumberId));

    logger.info(`Number ${phoneRecord.phoneNumber} marked as released`, undefined, 'PlivoPhone');
  }

  /**
   * Get all Plivo phone numbers in the system (admin view)
   */
  static async getAllNumbers(): Promise<PlivoPhoneNumberRecord[]> {
    const numbers = await db
      .select()
      .from(plivoPhoneNumbers)
      .where(sql`${plivoPhoneNumbers.status} != 'released'`)
      .orderBy(desc(plivoPhoneNumbers.createdAt));

    return numbers;
  }

  /**
   * Assign a phone number to a user or mark as system pool
   */
  static async assignNumberToUser(
    phoneNumberId: string, 
    userId: string | null, 
    isSystemPool: boolean = false
  ): Promise<PlivoPhoneNumberRecord> {
    logger.info(`Assigning number ${phoneNumberId} to user ${userId || 'system pool'}`, undefined, 'PlivoPhone');

    const [updated] = await db
      .update(plivoPhoneNumbers)
      .set({
        userId: userId || null,
        updatedAt: new Date(),
      } as any)
      .where(eq(plivoPhoneNumbers.id, phoneNumberId))
      .returning();

    if (!updated) {
      throw new Error('Phone number not found');
    }

    return updated;
  }
}
