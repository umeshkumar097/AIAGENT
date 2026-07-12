'use strict';
/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { Router, Request, Response } from "express";
import { RouteContext, AuthRequest, escapeCSV } from "./common";

export function createSubscriptionRoutes(ctx: RouteContext): Router {
  const router = Router();
  const { storage, authenticateToken, authenticateHybrid } = ctx;

  // ============================================
  // PLANS ROUTES
  // ============================================

  // Get all plans (public)
  router.get("/api/plans", async (req: Request, res: Response) => {
    try {
      const plans = await storage.getAllPlans();
      res.json(plans);
    } catch (error: any) {
      console.error("Get plans error:", error);
      res.status(500).json({ error: "Failed to get plans" });
    }
  });

  // Get subscription plans (authenticated)
  router.get("/api/subscriptions/plans", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const plans = await storage.getAllPlans();
      res.json(plans);
    } catch (error: any) {
      console.error("Get subscription plans error:", error);
      res.status(500).json({ error: "Failed to get subscription plans" });
    }
  });

  // ============================================
  // USER SUBSCRIPTION ROUTES
  // ============================================

  // Get user's current subscription
  router.get("/api/subscriptions/my-subscription", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const subscription = await storage.getUserSubscription(req.userId!);
      res.json(subscription || null);
    } catch (error: any) {
      console.error("Get user subscription error:", error);
      res.status(500).json({ error: "Failed to get subscription" });
    }
  });

  // Get user subscription (alternate endpoint)
  router.get("/api/user-subscription", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const subscription = await storage.getUserSubscription(req.userId!);
      res.json(subscription);
    } catch (error: any) {
      console.error("Get user subscription error:", error);
      res.status(500).json({ error: "Failed to get subscription" });
    }
  });

  // ============================================
  // CREDIT PACKAGES ROUTES
  // ============================================

  // Get all credit packages (public)
  router.get("/api/credit-packages", async (req: Request, res: Response) => {
    try {
      const packages = await storage.getAllCreditPackages();
      res.json(packages);
    } catch (error: any) {
      console.error("Get credit packages error:", error);
      res.status(500).json({ error: "Failed to get credit packages" });
    }
  });

  // ============================================
  // CREDIT TRANSACTIONS ROUTES
  // ============================================

  // Get user's credit transactions
  router.get("/api/credits/transactions", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const transactions = await storage.getUserCreditTransactions(req.userId!);
      res.json(transactions);
    } catch (error: any) {
      console.error("Get credit transactions error:", error);
      res.status(500).json({ error: "Failed to get credit transactions" });
    }
  });

  // Get credit transactions (alternate endpoint)
  router.get("/api/credit-transactions", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const transactions = await storage.getUserCreditTransactions(req.userId!);
      res.json(transactions);
    } catch (error: any) {
      console.error("Get credit transactions error:", error);
      res.status(500).json({ error: "Failed to get credit transactions" });
    }
  });

  // Export credit transactions as CSV
  router.get("/api/credit-transactions/export", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const transactions = await storage.getUserCreditTransactions(req.userId!);
      
      // CSV header
      const csvHeader = "Date,Type,Amount,Description,Stripe Payment ID\n";
      
      // CSV rows
      const csvRows = transactions.map(t => {
        const date = new Date(t.createdAt).toISOString();
        const type = t.type === "credit" ? "Credit" : "Debit";
        const amount = t.type === "credit" ? `+${t.amount}` : `-${Math.abs(t.amount)}`;
        const description = escapeCSV(t.description);
        const stripeId = escapeCSV(t.stripePaymentId || "");
        return `${date},${type},${amount},${description},${stripeId}`;
      }).join("\n");

      const csv = csvHeader + csvRows;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="transactions-${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csv);
    } catch (error: any) {
      console.error("Export credit transactions error:", error);
      res.status(500).json({ error: "Failed to export credit transactions" });
    }
  });

  // ============================================
  // BILLING PROFILE ROUTES
  // ============================================

  // Get user's billing profile
  router.get("/api/billing-profile", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({
        billingName: user.billingName,
        billingAddressLine1: user.billingAddressLine1,
        billingAddressLine2: user.billingAddressLine2,
        billingCity: user.billingCity,
        billingState: user.billingState,
        billingPostalCode: user.billingPostalCode,
        billingCountry: user.billingCountry,
      });
    } catch (error: any) {
      console.error("Get billing profile error:", error);
      res.status(500).json({ error: "Failed to get billing profile" });
    }
  });

  // Update user's billing profile
  router.put("/api/billing-profile", authenticateHybrid, async (req: AuthRequest, res: Response) => {
    try {
      const { z } = await import('zod');
      const { billingName, billingAddressLine1, billingAddressLine2, billingCity, billingState, billingPostalCode, billingCountry } = req.body;
      
      const billingProfileSchema = z.object({
        billingName: z.string().min(1, "Full name is required"),
        billingAddressLine1: z.string().min(1, "Address line 1 is required"),
        billingAddressLine2: z.string().optional().nullable(),
        billingCity: z.string().min(1, "City is required"),
        billingState: z.string().min(1, "State/Province is required"),
        billingPostalCode: z.string().min(1, "Postal code is required"),
        billingCountry: z.string().min(1, "Country is required"),
      });
      
      const validationResult = billingProfileSchema.safeParse({
        billingName,
        billingAddressLine1,
        billingAddressLine2,
        billingCity,
        billingState,
        billingPostalCode,
        billingCountry,
      });
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(e => e.message).join(", ");
        return res.status(400).json({ error: errors });
      }
      
      await storage.updateUser(req.userId!, {
        billingName: billingName || null,
        billingAddressLine1: billingAddressLine1 || null,
        billingAddressLine2: billingAddressLine2 || null,
        billingCity: billingCity || null,
        billingState: billingState || null,
        billingPostalCode: billingPostalCode || null,
        billingCountry: billingCountry || null,
      });
      
      res.json({ success: true });
    } catch (error: any) {
      console.error("Update billing profile error:", error);
      res.status(500).json({ error: "Failed to update billing profile" });
    }
  });


  // ============================================
  // PHONE NUMBER SUBSCRIPTION (₹400/month via Stripe)
  // Auto-buys a Plivo number and bills monthly
  // ============================================

  /**
   * POST /api/phone-number/subscribe
   * Creates a Stripe Checkout Session for ₹400/month phone number rental.
   * Returns checkoutUrl → frontend redirects user to Stripe hosted payment page.
   * After payment, Stripe redirects to /api/phone-number/subscribe/return?session_id=...
   */
  router.post("/api/phone-number/subscribe", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { country = "IN", phoneNumber } = req.body;

      // 1. Get Stripe secret key
      const stripeKeySetting = await storage.getGlobalSetting("stripe_secret_key");
      const stripeSecretKey = (stripeKeySetting?.value as string) || process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        return res.status(500).json({ error: "Stripe not configured" });
      }

      // 2. Get price ID
      const priceIdSetting = await storage.getGlobalSetting("phone_number_stripe_price_id");
      const priceId = priceIdSetting?.value as string;
      if (!priceId) {
        return res.status(500).json({ error: "Phone number price not configured. Contact admin." });
      }

      // 3. Get user
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-10-29.clover" as any });

      // 4. Ensure Stripe customer
      let stripeCustomerId = user.stripeCustomerId;
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.billingName || user.email,
          metadata: { userId },
        });
        stripeCustomerId = customer.id;
        await storage.updateUser(userId, { stripeCustomerId });
      }

      // 5. Determine origin for redirect URLs
      const origin = (req.headers.origin as string) || process.env.APP_URL || "https://app.zonvo.tech";

      // 6. Create Stripe Checkout Session (hosted payment page)
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: {
          type: "phone_number_rental",
          userId,
          country: country.toUpperCase(),
          phoneNumber: phoneNumber || "",
        },
        subscription_data: {
          metadata: {
            type: "phone_number_rental",
            userId,
            country: country.toUpperCase(),
            phoneNumber: phoneNumber || "",
          },
        },
        success_url: `${origin}/app/phone-numbers?checkout_success=1&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/app/phone-numbers`,
        allow_promotion_codes: false,
      });

      res.json({
        checkoutUrl: session.url,
        sessionId: session.id,
      });
    } catch (error: any) {
      console.error("Phone number subscribe error:", error);
      res.status(500).json({ error: error.message || "Subscription creation failed" });
    }
  });

  /**
   * GET /api/phone-number/subscribe/checkout-success
   * Called after Stripe Checkout success redirect. 
   * Reads session metadata → buys the phone number from Plivo → saves to DB.
   */
  router.get("/api/phone-number/subscribe/checkout-success", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { session_id } = req.query;
      if (!session_id) return res.status(400).json({ error: "session_id required" });

      const stripeKeySetting = await storage.getGlobalSetting("stripe_secret_key");
      const stripeSecretKey = (stripeKeySetting?.value as string) || process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) return res.status(500).json({ error: "Stripe not configured" });

      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-10-29.clover" as any });

      // Retrieve the checkout session
      const session = await stripe.checkout.sessions.retrieve(session_id as string);
      if (session.payment_status !== "paid") {
        return res.status(400).json({ error: "Payment not completed" });
      }

      const { userId: sessionUserId, country, phoneNumber } = session.metadata || {};
      const stripeSubscriptionId = session.subscription as string;

      // Verify this belongs to the authenticated user
      if (sessionUserId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      if (!phoneNumber || !country || !stripeSubscriptionId) {
        return res.status(400).json({ error: "Missing phone/country in session metadata" });
      }

      // Check if already processed (idempotency)
      const { PlivoPhoneService } = await import("../engines/plivo/services/plivo-phone.service.js");
      const existing = await PlivoPhoneService.getUserPhoneNumbers(req.userId!);
      const alreadyOwned = existing.find((n: any) => n.stripeSubscriptionId === stripeSubscriptionId);
      if (alreadyOwned) {
        return res.json({ success: true, phoneNumber: alreadyOwned.phoneNumber, alreadyProcessed: true });
      }

      // Purchase from Plivo
      await PlivoPhoneService.purchaseNumberViaStripe({
        userId: req.userId!,
        phoneNumber,
        country,
        stripeSubscriptionId,
      });

      res.json({ success: true, phoneNumber });
    } catch (error: any) {
      console.error("Checkout success handler error:", error);
      res.status(500).json({ error: error.message || "Failed to process payment" });
    }
  });

  /**
   * POST /api/phone-number/subscribe/confirm
   * Called after Stripe payment succeeds on frontend.
   * Buys the SPECIFIC number the user selected.
   */
  router.post("/api/phone-number/subscribe/confirm", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { stripeSubscriptionId, country = "IN", phoneNumber } = req.body;

      if (!stripeSubscriptionId) {
        return res.status(400).json({ error: "stripeSubscriptionId required" });
      }
      if (!phoneNumber) {
        return res.status(400).json({ error: "phoneNumber required" });
      }

      const { PlivoPhoneService } = await import("../engines/plivo/services/plivo-phone.service.js");

      // Purchase the specific number user selected — Stripe handles billing
      await PlivoPhoneService.purchaseNumberViaStripe({
        userId,
        phoneNumber,
        country: country.toUpperCase(),
        stripeSubscriptionId,
      });

      res.json({ success: true, phoneNumber });
    } catch (error: any) {
      console.error("Phone number confirm error:", error);
      res.status(500).json({ error: error.message || "Number purchase failed" });
    }
  });

  /**
   * GET /api/phone-number/subscriptions
   * Returns user's active phone number subscriptions with billing info.
   */
  router.get("/api/phone-number/subscriptions", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { PlivoPhoneService } = await import("../engines/plivo/services/plivo-phone.service.js");
      const numbers = await PlivoPhoneService.getUserPhoneNumbers(userId);

      // Filter only Stripe-billed numbers
      const stripeBilled = numbers.filter((n: any) => n.stripeSubscriptionId);
      res.json(stripeBilled);
    } catch (error: any) {
      console.error("Get phone subscriptions error:", error);
      res.status(500).json({ error: "Failed to get subscriptions" });
    }
  });

  /**
   * DELETE /api/phone-number/subscriptions/:phoneNumberId
   * Cancels Stripe subscription and releases the Plivo number.
   */
  router.delete("/api/phone-number/subscriptions/:phoneNumberId", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { phoneNumberId } = req.params;

      const stripeKeySetting = await storage.getGlobalSetting("stripe_secret_key");
      const stripeSecretKey = (stripeKeySetting?.value as string) || process.env.STRIPE_SECRET_KEY;

      const { PlivoPhoneService } = await import("../engines/plivo/services/plivo-phone.service.js");
      const numbers = await PlivoPhoneService.getUserPhoneNumbers(userId);
      const numberRecord = numbers.find((n: any) => n.id === phoneNumberId);

      if (!numberRecord) {
        return res.status(404).json({ error: "Phone number not found" });
      }

      // Cancel Stripe subscription if present
      if (numberRecord.stripeSubscriptionId && stripeSecretKey) {
        const { default: Stripe } = await import("stripe");
        const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-10-29.clover" as any });
        await stripe.subscriptions.cancel(numberRecord.stripeSubscriptionId);
      }

      // Release from Plivo + delete from DB
      await PlivoPhoneService.releaseNumber(phoneNumberId);

      res.json({ success: true });
    } catch (error: any) {
      console.error("Cancel phone subscription error:", error);
      res.status(500).json({ error: error.message || "Cancellation failed" });
    }
  });

  return router;
}
