/**
 * ============================================================
 * REST API Plugin - Shared response helpers
 * Same envelope as calls.routes.ts / contacts.routes.ts:
 *   { success, data, meta: { requestId, timestamp, pagination? } }
 *   { success: false, error: { code, message, details? }, meta }
 * ============================================================
 */

import type { Response } from 'express';
import type { ZodError } from 'zod';
import type { AuthenticatedApiRequest, ApiResponse, ApiErrorCode, PaginationMeta } from '../types.js';

export const MAX_PAGE_SIZE = 100;

export function baseMeta(req: AuthenticatedApiRequest): { requestId: string; timestamp: string } {
  return { requestId: req.requestId, timestamp: new Date().toISOString() };
}

export function paginationMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
  const totalPages = Math.ceil(totalItems / pageSize);
  return { page, pageSize, totalItems, totalPages, hasNext: page < totalPages, hasPrev: page > 1 };
}

/** `page` / `pageSize` query params (pageSize capped at 100). */
export function pageParams(req: AuthenticatedApiRequest, defaultSize = 50): { page: number; pageSize: number; offset: number } {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const pageSize = Math.min(Math.max(1, parseInt(req.query.pageSize as string, 10) || defaultSize), MAX_PAGE_SIZE);
  return { page, pageSize, offset: (page - 1) * pageSize };
}

export function sendData<T>(req: AuthenticatedApiRequest, res: Response, data: T, status = 200, pagination?: PaginationMeta): void {
  const response: ApiResponse<T> = { success: true, data, meta: { ...baseMeta(req), ...(pagination ? { pagination } : {}) } };
  res.status(status).json(response);
}

export function sendError(
  req: AuthenticatedApiRequest, res: Response, status: number, code: ApiErrorCode | 'DO_NOT_CALL', message: string,
  details?: Record<string, unknown>,
): void {
  const response: ApiResponse = { success: false, error: { code, message, details }, meta: baseMeta(req) };
  res.status(status).json(response);
}

export function sendValidationError(req: AuthenticatedApiRequest, res: Response, error: ZodError): void {
  sendError(req, res, 400, 'VALIDATION_ERROR', 'Invalid request body', { errors: error.flatten().fieldErrors });
}

export function sendNotFound(req: AuthenticatedApiRequest, res: Response, what: string): void {
  sendError(req, res, 404, 'NOT_FOUND', `${what} not found.`);
}

export function queryString(req: AuthenticatedApiRequest, key: string): string {
  const v = req.query[key];
  return typeof v === 'string' ? v.trim() : '';
}

/** ISO date/date-time query param → Date, or null when absent/invalid. */
export function queryDate(req: AuthenticatedApiRequest, key: string): Date | null {
  const raw = queryString(req, key);
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}
