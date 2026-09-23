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

import { Router, Response } from "express";
import { storage } from "../storage";
import { authenticateToken, requireRole, type AuthRequest } from "../middleware/auth";
import { db } from "../db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { processCashfreeRefund, RefundValidationError } from "../engines/payment/gateways/cashfree";
import { generateRefundNoteForRefund, refundNoteService } from "../services/refund-note-service";

const router = Router();

interface RefundRequest {
  amount: number;
  reason?: string;
  adminNote?: string;
  customerNote?: string;
}

/**
 * POST /api/admin/refunds/:transactionId — Cashfree refund + credit note.
 * Legacy-gateway transactions (Stripe/Razorpay/…) cannot be refunded here.
 */
router.post("/:transactionId", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
  try {
    const { transactionId } = req.params;
    const { amount, reason, adminNote, customerNote } = req.body as RefundRequest;
    const adminId = req.userId!;

    const result = await processCashfreeRefund({
      transactionId,
      amount: Number(amount),
      reason,
      adminId,
      adminNote: adminNote || null,
      customerNote: customerNote || null,
    });

    const [adminUser] = await db.select({ id: users.id, name: users.name })
      .from(users)
      .where(eq(users.id, adminId));

    res.json({
      message: "Refund processed successfully",
      refund: { ...result.refund, adminUser },
      cfRefundId: result.cfRefundId,
      creditNoteId: result.creditNoteId,
      creditsReversed: result.creditsReversed,
    });
  } catch (error: any) {
    if (error instanceof RefundValidationError) {
      return res.status(error.status).json({ message: error.message, error: error.message });
    }
    console.error("Error processing refund:", error);
    res.status(500).json({ message: "Failed to process refund" });
  }
});

router.get("/:id/download", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const userRole = req.userRole;
    
    const refund = await storage.getRefund(id);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    // Users can only download their own refund notes, admins can download any
    if (userRole !== 'admin' && userRole !== 'super_admin' && refund.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!refund.pdfUrl) {
      // Try to generate the refund note if it doesn't exist
      try {
        const updatedRefund = await generateRefundNoteForRefund(id);
        if (!updatedRefund.pdfUrl) {
          return res.status(404).json({ message: "Refund note PDF not available" });
        }
      } catch (error) {
        return res.status(404).json({ message: "Refund note PDF not available" });
      }
    }

    const pdfBuffer = await refundNoteService.getRefundNotePDF(id);
    if (!pdfBuffer) {
      return res.status(404).json({ message: "Refund note PDF file not found" });
    }

    const latestRefund = await storage.getRefund(id);
    const fileName = latestRefund?.refundNoteNumber 
      ? `${latestRefund.refundNoteNumber.replace(/\//g, '-')}.pdf`
      : `refund-note-${id}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error("Error downloading refund note:", error);
    res.status(500).json({ message: "Failed to download refund note" });
  }
});

router.get("/:id", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const refund = await storage.getRefund(id);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    const [user] = await db.select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(eq(users.id, refund.userId));

    const transaction = await storage.getPaymentTransaction(refund.transactionId);

    let adminUser = null;
    if (refund.adminId) {
      const [admin] = await db.select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.id, refund.adminId));
      adminUser = admin || null;
    }

    res.json({
      ...refund,
      user: user || null,
      transaction: transaction || null,
      adminUser,
    });
  } catch (error: any) {
    console.error("Error fetching refund:", error);
    res.status(500).json({ message: "Failed to fetch refund" });
  }
});

router.get("/", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
  try {
    const allRefunds = await storage.getAllRefunds();
    
    const enrichedRefunds = await Promise.all(allRefunds.map(async (refund) => {
      const [user] = await db.select({ id: users.id, name: users.name, email: users.email })
        .from(users)
        .where(eq(users.id, refund.userId));
      
      const transaction = await storage.getPaymentTransaction(refund.transactionId);

      let adminUser = null;
      if (refund.adminId) {
        const [admin] = await db.select({ id: users.id, name: users.name })
          .from(users)
          .where(eq(users.id, refund.adminId));
        adminUser = admin || null;
      }

      return {
        ...refund,
        user: user || null,
        transaction: transaction || null,
        adminUser,
      };
    }));

    res.json(enrichedRefunds);
  } catch (error: any) {
    console.error("Error fetching refunds:", error);
    res.status(500).json({ message: "Failed to fetch refunds" });
  }
});

// Get user's own refunds
router.get("/user/my-refunds", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const userRefunds = await storage.getUserRefunds(userId);
    
    // Enrich with transaction info
    const enrichedRefunds = await Promise.all(userRefunds.map(async (refund) => {
      const transaction = await storage.getPaymentTransaction(refund.transactionId);
      return {
        ...refund,
        transaction: transaction ? {
          id: transaction.id,
          type: transaction.type,
          gateway: transaction.gateway,
          description: transaction.description,
        } : null,
      };
    }));

    res.json(enrichedRefunds);
  } catch (error: any) {
    console.error("Error fetching user refunds:", error);
    res.status(500).json({ message: "Failed to fetch refunds" });
  }
});

// Download refund note PDF (admin)
router.get("/admin/:id/download", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const refund = await storage.getRefund(id);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    if (!refund.pdfUrl) {
      // Try to generate the refund note if it doesn't exist
      try {
        const updatedRefund = await refundNoteService.generateRefundNote(id);
        if (!updatedRefund.pdfUrl) {
          return res.status(404).json({ message: "Refund note PDF not available" });
        }
        refund.pdfUrl = updatedRefund.pdfUrl;
      } catch (genError: any) {
        return res.status(404).json({ message: "Refund note PDF not available" });
      }
    }

    const fs = await import('fs');
    if (!fs.existsSync(refund.pdfUrl)) {
      return res.status(404).json({ message: "Refund note PDF file not found" });
    }

    const fileName = `RefundNote-${refund.refundNoteNumber || id}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    const fileStream = fs.createReadStream(refund.pdfUrl);
    fileStream.pipe(res);
  } catch (error: any) {
    console.error("Error downloading refund note:", error);
    res.status(500).json({ message: "Failed to download refund note" });
  }
});

// Download refund note PDF (user - own refunds only)
router.get("/user/:id/download", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    
    const refund = await storage.getRefund(id);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    // Verify the refund belongs to this user
    if (refund.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!refund.pdfUrl) {
      return res.status(404).json({ message: "Refund note PDF not available" });
    }

    const fs = await import('fs');
    if (!fs.existsSync(refund.pdfUrl)) {
      return res.status(404).json({ message: "Refund note PDF file not found" });
    }

    const fileName = `RefundNote-${refund.refundNoteNumber || id}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    const fileStream = fs.createReadStream(refund.pdfUrl);
    fileStream.pipe(res);
  } catch (error: any) {
    console.error("Error downloading refund note:", error);
    res.status(500).json({ message: "Failed to download refund note" });
  }
});

export default router;
