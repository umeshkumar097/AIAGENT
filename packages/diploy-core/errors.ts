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

export class ZonvoAIError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'ZonvoAI_ERROR',
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ZonvoAIError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ZonvoAIValidationError extends ZonvoAIError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ZonvoAIValidationError';
  }
}

export class ZonvoAIAuthError extends ZonvoAIError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTH_ERROR');
    this.name = 'ZonvoAIAuthError';
  }
}

export class ZonvoAIForbiddenError extends ZonvoAIError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'FORBIDDEN_ERROR');
    this.name = 'ZonvoAIForbiddenError';
  }
}

export class ZonvoAINotFoundError extends ZonvoAIError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND_ERROR');
    this.name = 'ZonvoAINotFoundError';
  }
}

export class ZonvoAIRateLimitError extends ZonvoAIError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'ZonvoAIRateLimitError';
  }
}

export class ZonvoAIExternalServiceError extends ZonvoAIError {
  constructor(service: string, message: string) {
    super(`${service}: ${message}`, 502, 'EXTERNAL_SERVICE_ERROR', { service });
    this.name = 'ZonvoAIExternalServiceError';
  }
}
