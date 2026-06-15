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

export const ZonvoAI_BRAND = {
  name: 'Zonvo AI',
  company: 'Bisht Technologies Private Limited',
  website: 'https://zonvo.tech',
  email: 'cs@zonvo.tech',
  copyright: '© 2025 Zonvo AI',
  product: 'Zonvo AI'
} as const;

export const ZonvoAI_VERSION = {
  core: '1.0.0',
  api: 'v1',
  build: process.env.BUILD_NUMBER || 'dev'
} as const;

export const ZonvoAI_HEADERS = {
  author: 'X-Author',
  version: 'X-Api-Version',
  requestId: 'X-Request-Id'
} as const;
