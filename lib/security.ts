const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escapes user-provided values before interpolating them into HTML emails or invoices.
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

/**
 * Strips CR/LF/NUL characters to prevent SMTP header injection.
 */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\0]+/g, " ").trim();
}

/**
 * Extracts the client IP address from incoming request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

const MAX_RATE_LIMIT_BUCKETS = 2000;
const rateLimitStore = new Map<string, RateLimitBucket>();

function pruneExpiredBuckets(now: number): void {
  for (const [bucketKey, bucket] of rateLimitStore.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitStore.delete(bucketKey);
    }
  }

  while (rateLimitStore.size > MAX_RATE_LIMIT_BUCKETS) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (!oldestKey) {
      break;
    }
    rateLimitStore.delete(oldestKey);
  }
}

/**
 * Applies a bounded in-memory fixed-window rate limit per caller key.
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const limit = Math.max(1, options.limit);
  const windowMs = Math.max(1000, options.windowMs);

  const existing = rateLimitStore.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.delete(key);
    if (rateLimitStore.size >= MAX_RATE_LIMIT_BUCKETS) {
      pruneExpiredBuckets(now);
    }
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      retryAfterSec: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec,
    };
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSec,
  };
}

/**
 * Clears the in-memory rate limit store (primarily for unit tests).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
