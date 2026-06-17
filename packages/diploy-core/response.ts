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

import type { Response } from 'express';

export interface ZonvoAIApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ZonvoAIPaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export const ZonvoAIResponse = {
  success<T>(res: Response, data: T, statusCode: number = 200): Response {
    const response: ZonvoAIApiResponse<T> = {
      success: true,
      data
    };
    return res.status(statusCode).json(response);
  },

  created<T>(res: Response, data: T): Response {
    return ZonvoAIResponse.success(res, data, 201);
  },

  noContent(res: Response): Response {
    return res.status(204).send();
  },

  error(
    res: Response,
    message: string,
    statusCode: number = 500,
    code?: string
  ): Response {
    const response: ZonvoAIApiResponse = {
      success: false,
      error: message,
      code
    };
    return res.status(statusCode).json(response);
  },

  validationError(res: Response, message: string, details?: Record<string, unknown>): Response {
    const response: ZonvoAIApiResponse = {
      success: false,
      error: message,
      code: 'VALIDATION_ERROR',
      ...(details && { data: details })
    };
    return res.status(400).json(response);
  },

  unauthorized(res: Response, message: string = 'Authentication required'): Response {
    return ZonvoAIResponse.error(res, message, 401, 'UNAUTHORIZED');
  },

  forbidden(res: Response, message: string = 'Access denied'): Response {
    return ZonvoAIResponse.error(res, message, 403, 'FORBIDDEN');
  },

  notFound(res: Response, resource: string = 'Resource'): Response {
    return ZonvoAIResponse.error(res, `${resource} not found`, 404, 'NOT_FOUND');
  },

  paginated<T>(
    res: Response,
    data: T[],
    options: ZonvoAIPaginationOptions
  ): Response {
    const totalPages = Math.ceil(options.total / options.limit);
    const response: ZonvoAIApiResponse<T[]> = {
      success: true,
      data,
      meta: {
        page: options.page,
        limit: options.limit,
        total: options.total,
        totalPages
      }
    };
    return res.status(200).json(response);
  }
};
