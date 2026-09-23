'use strict';
/**
 * Admin credit package routes — INR price only (Cashfree). No gateway sync.
 */
import { Router, Response } from 'express';
import { storage } from '../../storage';
import { AdminRequest, requireAdminPermission } from '../../middleware/admin-auth';
import { insertCreditPackageSchema } from '@shared/schema';

/** Decimal columns expect strings; accept numbers from the UI. */
function normalisePackageBody(body: any): { data: any; error?: string } {
  const data = { ...(body || {}) };
  if (typeof data.price === 'number') {
    data.price = data.price.toFixed(2);
  } else if (typeof data.price === 'string' && data.price.trim() !== '') {
    const n = parseFloat(data.price);
    if (!Number.isFinite(n)) return { data, error: 'price must be a number' };
    data.price = n.toFixed(2);
  }
  return { data };
}

function validationErrorResponse(res: Response, error: any) {
  return res.status(400).json({ error: 'Validation failed', details: error.errors });
}

export function registerCreditPackagesRoutes(router: Router) {
  router.get('/credit-packages', requireAdminPermission('billing', 'credits', 'read'), async (_req: AdminRequest, res: Response) => {
    try {
      const packages = await storage.getAllCreditPackages();
      res.json(packages);
    } catch (error) {
      console.error('Error fetching credit packages:', error);
      res.status(500).json({ error: 'Failed to fetch credit packages' });
    }
  });

  router.post('/credit-packages', requireAdminPermission('billing', 'credits', 'create'), async (req: AdminRequest, res: Response) => {
    try {
      const { data: bodyData, error: priceError } = normalisePackageBody(req.body);
      if (priceError) return res.status(400).json({ error: priceError });

      let packageData;
      try {
        packageData = insertCreditPackageSchema.parse(bodyData);
      } catch (validationError: any) {
        if (validationError.errors) return validationErrorResponse(res, validationError);
        throw validationError;
      }

      const newPackage = await storage.createCreditPackage(packageData);
      res.json(newPackage);
    } catch (error: any) {
      console.error('Error creating credit package:', error);
      if (error.name === 'ZodError') return validationErrorResponse(res, error);
      res.status(500).json({ error: 'Failed to create credit package' });
    }
  });

  router.patch('/credit-packages/:packageId', requireAdminPermission('billing', 'credits', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { packageId } = req.params;
      const { data: bodyData, error: priceError } = normalisePackageBody(req.body);
      if (priceError) return res.status(400).json({ error: priceError });

      let updateData;
      try {
        updateData = insertCreditPackageSchema.partial().parse(bodyData);
      } catch (validationError: any) {
        if (validationError.errors) return validationErrorResponse(res, validationError);
        throw validationError;
      }

      const existingPackage = await storage.getCreditPackage(packageId);
      if (!existingPackage) {
        return res.status(404).json({ error: 'Credit package not found' });
      }

      await storage.updateCreditPackage(packageId, updateData);
      const updatedPackage = await storage.getCreditPackage(packageId);
      res.json({ success: true, package: updatedPackage });
    } catch (error: any) {
      console.error('Error updating credit package:', error);
      if (error.name === 'ZodError') return validationErrorResponse(res, error);
      res.status(500).json({ error: 'Failed to update credit package' });
    }
  });
}
