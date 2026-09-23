'use strict';
/**
 * GET /api/cashfree/quote — the checkout page's price breakdown: GST added on top of the list price
 * (or split out of it when the seller setting says prices are inclusive). Amounts come from plan / package
 * rows and settings only.
 *   ?type=plan&planId=&billingPeriod=monthly|yearly | ?type=credits&packageId= | ?type=phone_number&country=XX
 *   optional stateCode=NN overrides the buyer's saved GST state (the page re-quotes when the state changes)
 */

import express, { type Response, type Router } from 'express';
import { authenticateToken, type AuthRequest } from '../../../../middleware/auth';
import { storage } from '../../../../storage';
import { PlivoPhoneService } from '../../../plivo/services/plivo-phone.service';
import { logger } from '../../../../utils/logger';
import { resolveBuyerStateCode } from '../../invoice-service';
import { getSellerInfo, quotePrice, resolveStateCode } from '../../invoice-gst';

const router: Router = express.Router();

export const DEFAULT_PHONE_NUMBER_PRICE_INR = 400;

function toAmount(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value ?? ''));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

export async function getPhoneNumberPriceInr(): Promise<number> {
  const setting = await storage.getGlobalSetting('phone_number_price_inr');
  const n = toAmount(setting?.value);
  return n > 0 ? n : DEFAULT_PHONE_NUMBER_PRICE_INR;
}

export class QuoteRequestError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'QuoteRequestError';
    this.status = status;
  }
}

export interface QuoteItem {
  type: 'plan' | 'credits' | 'phone_number';
  description: string;
  listPrice: number;
  planId: string | null;
  planName: string | null;
  billingPeriod: 'monthly' | 'yearly' | null;
  packageId: string | null;
  credits: number | null;
  phoneNumber: string | null;
  country: string | null;
  autoRenewAvailable: boolean;
}

function param(query: Record<string, unknown>, key: string): string {
  const value = query[key];
  return typeof value === 'string' ? value.trim() : '';
}

/** Same price sources as the order endpoint, minus the Plivo availability check (a quote only needs the country price). */
export async function resolveQuoteItem(query: Record<string, unknown>): Promise<QuoteItem> {
  const type = param(query, 'type');
  const base: Omit<QuoteItem, 'type' | 'description' | 'listPrice'> = {
    planId: null, planName: null, billingPeriod: null, packageId: null, credits: null, phoneNumber: null, country: null, autoRenewAvailable: false,
  };

  if (type === 'credits') {
    const packageId = param(query, 'packageId');
    if (!packageId) throw new QuoteRequestError('packageId is required');
    const pkg = await storage.getCreditPackage(packageId);
    if (!pkg) throw new QuoteRequestError('Credit package not found', 404);
    if (!pkg.isActive) throw new QuoteRequestError('Credit package is not available');
    const listPrice = toAmount(pkg.price);
    if (listPrice <= 0) throw new QuoteRequestError('Credit package has no price configured');
    return { ...base, type, description: `${pkg.name} (${pkg.credits} credits)`, listPrice, packageId: pkg.id, credits: pkg.credits };
  }

  if (type === 'plan') {
    const planId = param(query, 'planId');
    if (!planId) throw new QuoteRequestError('planId is required');
    const billingPeriod = param(query, 'billingPeriod') === 'yearly' ? 'yearly' : 'monthly';
    const plan = await storage.getPlan(planId);
    if (!plan) throw new QuoteRequestError('Plan not found', 404);
    if (!plan.isActive) throw new QuoteRequestError('Plan is not available');
    const listPrice = billingPeriod === 'yearly' ? toAmount(plan.yearlyPrice) : toAmount(plan.monthlyPrice);
    if (listPrice <= 0) {
      throw new QuoteRequestError(billingPeriod === 'yearly' && !plan.yearlyPrice ? 'This plan has no yearly price' : 'This plan does not require payment');
    }
    return {
      ...base, type, description: `${plan.displayName} plan (${billingPeriod})`, listPrice,
      planId: plan.id, planName: plan.displayName, billingPeriod, autoRenewAvailable: true,
    };
  }

  if (type === 'phone_number') {
    const country = param(query, 'country').toUpperCase();
    if (!/^[A-Z]{2}$/.test(country)) throw new QuoteRequestError('A valid 2-letter country code is required');
    const pricing = await PlivoPhoneService.getAdminPricing(country);
    if (!pricing) throw new QuoteRequestError(`Phone numbers are not available for ${country}`);
    if (!pricing.isActive) throw new QuoteRequestError(`Phone numbers are disabled for ${pricing.countryName}`);
    const phoneNumber = param(query, 'phoneNumber');
    return {
      ...base, type, description: `Phone number rental (${pricing.countryName})`, listPrice: await getPhoneNumberPriceInr(),
      phoneNumber: /^\+?[0-9]{6,20}$/.test(phoneNumber) ? phoneNumber : null, country,
    };
  }

  throw new QuoteRequestError("type must be one of 'credits', 'plan', 'phone_number'");
}

router.get('/quote', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await storage.getUser(req.userId!);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let item: QuoteItem;
    try {
      item = await resolveQuoteItem((req.query || {}) as Record<string, unknown>);
    } catch (error) {
      if (error instanceof QuoteRequestError) return res.status(error.status).json({ error: error.message });
      throw error;
    }

    const override = param((req.query || {}) as Record<string, unknown>, 'stateCode');
    if (override && !resolveStateCode(override)) {
      return res.status(400).json({ error: 'Invalid GST state code' });
    }
    const buyerStateCode = override ? resolveStateCode(override) : resolveBuyerStateCode(user);
    const [quote, seller] = await Promise.all([quotePrice(item.listPrice, buyerStateCode), getSellerInfo()]);
    const { listPrice: _listPrice, ...rest } = item;

    res.json({ ...rest, quote, hsnSac: seller.hsnSac, currency: 'INR' });
  } catch (error) {
    logger.error('Error building checkout quote', error, 'Cashfree');
    res.status(500).json({ error: 'Failed to build the price quote' });
  }
});

export const cashfreeQuoteRouter = router;
