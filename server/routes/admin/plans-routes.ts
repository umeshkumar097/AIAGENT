'use strict';
/**
 * Admin plan routes — INR pricing only (Cashfree). No gateway sync.
 */
import { Router, Response } from 'express';
import { storage } from '../../storage';
import { AdminRequest, requireAdminPermission } from '../../middleware/admin-auth';
import { insertPlanSchema } from '@shared/schema';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

const PRICE_FIELDS = ['monthlyPrice', 'yearlyPrice'] as const;

/** Decimal columns expect strings; accept numbers from the UI. */
function normalisePlanBody(body: any): any {
  const result = { ...(body || {}) };
  for (const field of PRICE_FIELDS) {
    const value = result[field];
    if (typeof value === 'number') {
      result[field] = value.toFixed(2);
    } else if (typeof value === 'string' && value.trim() !== '') {
      const n = parseFloat(value);
      if (!Number.isFinite(n)) return { __invalidPrice: field };
      result[field] = n.toFixed(2);
    } else if (value === '' || value === null) {
      result[field] = field === 'yearlyPrice' ? null : '0.00';
    }
  }
  return result;
}

function validationErrorResponse(res: Response, error: any) {
  return res.status(400).json({ error: 'Validation failed', details: error.errors });
}

export function registerPlansRoutes(router: Router) {
  router.get('/plans', requireAdminPermission('billing', 'plans', 'read'), async (_req: AdminRequest, res: Response) => {
    try {
      const plans = await storage.getAllPlans();
      res.json(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).json({ error: 'Failed to fetch plans' });
    }
  });

  router.post('/plans', requireAdminPermission('billing', 'plans', 'create'), async (req: AdminRequest, res: Response) => {
    try {
      const bodyData = normalisePlanBody(req.body);
      if (bodyData.__invalidPrice) {
        return res.status(400).json({ error: `${bodyData.__invalidPrice} must be a number` });
      }

      let planData;
      try {
        planData = insertPlanSchema.parse(bodyData);
      } catch (validationError: any) {
        if (validationError.errors) return validationErrorResponse(res, validationError);
        throw validationError;
      }

      const newPlan = await storage.createPlan(planData);
      res.json({ plan: newPlan });
    } catch (error: any) {
      console.error('Error creating plan:', error);
      if (error.name === 'ZodError') return validationErrorResponse(res, error);
      res.status(500).json({ error: 'Failed to create plan' });
    }
  });

  router.patch('/plans/:planId', requireAdminPermission('billing', 'plans', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { planId } = req.params;
      const bodyData = normalisePlanBody(req.body);
      if (bodyData.__invalidPrice) {
        return res.status(400).json({ error: `${bodyData.__invalidPrice} must be a number` });
      }

      let updateData;
      try {
        updateData = insertPlanSchema.partial().parse(bodyData);
      } catch (validationError: any) {
        if (validationError.errors) return validationErrorResponse(res, validationError);
        throw validationError;
      }

      const existingPlan = await storage.getPlan(planId);
      if (!existingPlan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      await storage.updatePlan(planId, updateData);
      const updatedPlan = await storage.getPlan(planId);
      res.json({ success: true, plan: updatedPlan });
    } catch (error: any) {
      console.error('Error updating plan:', error);
      if (error.name === 'ZodError') return validationErrorResponse(res, error);
      res.status(500).json({ error: 'Failed to update plan' });
    }
  });

  router.get('/plans/:planId/users', requireAdminPermission('billing', 'plans', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const { planId } = req.params;

      const plan = await storage.getPlan(planId);
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      const allUsers = await storage.getAllUsers();
      const usersOnPlan = allUsers.filter(user => {
        return user.planType && user.planType.toLowerCase() === plan.name.toLowerCase();
      });

      res.json({
        planId,
        planName: plan.displayName,
        userCount: usersOnPlan.length,
        users: usersOnPlan.map(u => ({ id: u.id, name: u.name, email: u.email }))
      });
    } catch (error: any) {
      console.error('Error fetching plan users:', error);
      res.status(500).json({ error: 'Failed to fetch plan users' });
    }
  });

  router.post('/plans/:planId/migrate', requireAdminPermission('billing', 'plans', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { planId } = req.params;
      const { targetPlanId } = req.body;

      if (!targetPlanId) {
        return res.status(400).json({ error: 'Target plan ID is required' });
      }

      const sourcePlan = await storage.getPlan(planId);
      if (!sourcePlan) {
        return res.status(404).json({ error: 'Source plan not found' });
      }

      const targetPlan = await storage.getPlan(targetPlanId);
      if (!targetPlan) {
        return res.status(404).json({ error: 'Target plan not found' });
      }

      const allUsers = await storage.getAllUsers();
      const usersOnPlan = allUsers.filter(user => {
        return user.planType && user.planType.toLowerCase() === sourcePlan.name.toLowerCase();
      });

      if (usersOnPlan.length === 0) {
        return res.json({ success: true, migratedCount: 0 });
      }

      const { users } = await import('@shared/schema');

      for (const user of usersOnPlan) {
        await db.update(users)
          .set({ planType: targetPlan.name })
          .where(eq(users.id, user.id));
      }

      res.json({
        success: true,
        migratedCount: usersOnPlan.length,
        targetPlanName: targetPlan.displayName
      });
    } catch (error: any) {
      console.error('Error migrating users:', error);
      res.status(500).json({ error: 'Failed to migrate users' });
    }
  });

  router.delete('/plans/:planId', requireAdminPermission('billing', 'plans', 'delete'), async (req: AdminRequest, res: Response) => {
    try {
      const { planId } = req.params;

      const plan = await storage.getPlan(planId);
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      const allUsers = await storage.getAllUsers();
      const usersOnPlan = allUsers.filter(user => {
        return user.planType && user.planType.toLowerCase() === plan.name.toLowerCase();
      });

      if (usersOnPlan.length > 0) {
        return res.status(400).json({
          error: 'USERS_NEED_MIGRATION',
          userCount: usersOnPlan.length,
          message: `${usersOnPlan.length} user(s) are currently subscribed to this plan. Please migrate them to another plan first.`
        });
      }

      await storage.deletePlan(planId);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error deleting plan:', error);
      res.status(500).json({ error: 'Failed to delete plan' });
    }
  });
}
