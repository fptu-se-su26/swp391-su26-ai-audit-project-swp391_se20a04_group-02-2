/**
 * Application-wide constants
 * Eliminates magic numbers and provides single source of truth
 */

// ===== REQUEST LIMITS =====
export const REQUEST_LIMITS = {
  JSON_BODY: '20mb',
  URL_ENCODED_BODY: '20mb',
} as const;

// ===== PAGINATION DEFAULTS =====
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;

// ===== USER ROLES =====
export const ROLES = {
  FARMER: 'farmer',
  ENTERPRISE: 'enterprise',
  ADMIN: 'admin',
} as const;

// ===== PRODUCT CONFIG =====
export const PRODUCT_CONFIG = {
  DEFAULT_PAGE_SIZE: 50,
  DEFAULT_SELLER_NAME: 'Nông dân',
  DEFAULT_SELLER_RATING: 5,
  DEFAULT_TOTAL_CONTRACTS: 0,
} as const;
