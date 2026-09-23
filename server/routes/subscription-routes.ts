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
      const csvHeader = "Date,Type,Amount,Description,Reference\n";
      
      // CSV rows
      const csvRows = transactions.map(t => {
        const date = new Date(t.createdAt).toISOString();
        const type = t.type === "credit" ? "Credit" : "Debit";
        const amount = t.type === "credit" ? `+${t.amount}` : `-${Math.abs(t.amount)}`;
        const description = escapeCSV(t.description);
        const reference = escapeCSV(t.stripePaymentId || t.reference || "");
        return `${date},${type},${amount},${description},${reference}`;
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
        company: user.company,
        billingAddressLine1: user.billingAddressLine1,
        billingAddressLine2: user.billingAddressLine2,
        billingCity: user.billingCity,
        billingState: user.billingState,
        billingStateCode: user.billingStateCode,
        billingPostalCode: user.billingPostalCode,
        billingCountry: user.billingCountry,
        billingPhone: user.billingPhone,
        gstin: user.gstin,
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
      const {
        billingName, company, billingAddressLine1, billingAddressLine2, billingCity, billingState,
        billingStateCode, billingPostalCode, billingCountry, billingPhone, gstin,
      } = req.body;

      const optionalText = (max: number) => z.string().trim().max(max).optional().nullable().or(z.literal(""));
      const billingProfileSchema = z.object({
        billingName: z.string().trim().min(1, "Full name is required").max(200),
        company: optionalText(200),
        billingAddressLine1: z.string().trim().min(1, "Address line 1 is required").max(300),
        billingAddressLine2: optionalText(300),
        billingCity: z.string().trim().min(1, "City is required").max(100),
        billingState: z.string().trim().min(1, "State/Province is required").max(100),
        billingStateCode: z.string().trim().regex(/^[0-9]{2}$/, "State code must be 2 digits").optional().nullable().or(z.literal("")),
        billingPostalCode: z.string().trim().min(1, "Postal code is required").max(20),
        billingCountry: z.string().trim().min(1, "Country is required").max(100),
        billingPhone: z.string().trim().regex(/^\+?[0-9]{6,15}$/, "Enter a valid phone number").optional().nullable().or(z.literal("")),
        gstin: z.string().trim().toUpperCase().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Enter a valid GSTIN").optional().nullable().or(z.literal("")),
      });

      const validationResult = billingProfileSchema.safeParse({
        billingName, company, billingAddressLine1, billingAddressLine2, billingCity, billingState,
        billingStateCode, billingPostalCode, billingCountry, billingPhone, gstin,
      });

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(e => e.message).join(", ");
        return res.status(400).json({ error: errors });
      }

      const v = validationResult.data;
      await storage.updateUser(req.userId!, {
        billingName: v.billingName,
        company: v.company || null,
        billingAddressLine1: v.billingAddressLine1,
        billingAddressLine2: v.billingAddressLine2 || null,
        billingCity: v.billingCity,
        billingState: v.billingState,
        billingStateCode: v.billingStateCode || null,
        billingPostalCode: v.billingPostalCode,
        billingCountry: v.billingCountry,
        billingPhone: v.billingPhone || null,
        gstin: v.gstin || null,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Update billing profile error:", error);
      res.status(500).json({ error: "Failed to update billing profile" });
    }
  });


  // ============================================
  // PHONE NUMBER RENTAL (one-time INR payment via Cashfree)
  // Purchase flow: Plivo search → POST /api/cashfree/orders { type: 'phone_number', phoneNumber, country }
  // → Cashfree checkout → billingService.completePurchase buys the number from Plivo.
  // ============================================

  /**
   * GET /api/phone-number/subscriptions
   * Returns the user's Plivo phone numbers (active/pending).
   */
  router.get("/api/phone-number/subscriptions", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { PlivoPhoneService } = await import("../engines/plivo/services/plivo-phone.service.js");
      const numbers = await PlivoPhoneService.getUserPhoneNumbers(userId);
      res.json(numbers);
    } catch (error: any) {
      console.error("Get phone subscriptions error:", error);
      res.status(500).json({ error: "Failed to get phone numbers" });
    }
  });

  /**
   * DELETE /api/phone-number/subscriptions/:phoneNumberId
   * Releases the Plivo number (no further monthly credit billing).
   */
  router.delete("/api/phone-number/subscriptions/:phoneNumberId", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { phoneNumberId } = req.params;

      const { PlivoPhoneService } = await import("../engines/plivo/services/plivo-phone.service.js");
      const numbers = await PlivoPhoneService.getUserPhoneNumbers(userId);
      const numberRecord = numbers.find((n: any) => n.id === phoneNumberId);

      if (!numberRecord) {
        return res.status(404).json({ error: "Phone number not found" });
      }

      // Release from Plivo + delete from DB
      await PlivoPhoneService.releaseNumber(phoneNumberId);

      // Notify (never throws)
      const { dispatchEvent } = await import("../services/event-dispatcher");
      await dispatchEvent("phone_number_released", {
        userId,
        data: { phoneNumber: numberRecord.phoneNumber, reason: "Released by user" },
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Release phone number error:", error);
      res.status(500).json({ error: error.message || "Release failed" });
    }
  });

  return router;
}
