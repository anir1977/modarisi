import "server-only";

// Simple in-memory sliding-window limiter.
// Limits are per serverless instance (memory is not shared between instances),
// so this is a first line of defence against abuse, not an exact quota.

type Window = { limit: number; ms: number };

const buckets = new Map<string, number[]>();

function hit(key: string, w: Window, now: number): boolean {
  const list = (buckets.get(key) ?? []).filter((t) => now - t < w.ms);
  if (list.length >= w.limit) {
    buckets.set(key, list);
    return false;
  }
  list.push(now);
  buckets.set(key, list);
  return true;
}

export const TUTOR_LIMITS = {
  perIpHour: { limit: 10, ms: 60 * 60 * 1000 },
  perIpDay: { limit: 30, ms: 24 * 60 * 60 * 1000 },
  globalHour: { limit: 300, ms: 60 * 60 * 1000 },
} satisfies Record<string, Window>;

export type LimitResult = { ok: true } | { ok: false; reason: "ip-hour" | "ip-day" | "global" };

/** Checks all windows without consuming quota if any window is already full. */
export function checkTutorLimit(ip: string, now = Date.now()): LimitResult {
  const peek = (key: string, w: Window) => (buckets.get(key) ?? []).filter((t) => now - t < w.ms).length < w.limit;

  if (!peek("global", TUTOR_LIMITS.globalHour)) return { ok: false, reason: "global" };
  if (!peek(`d:${ip}`, TUTOR_LIMITS.perIpDay)) return { ok: false, reason: "ip-day" };
  if (!peek(`h:${ip}`, TUTOR_LIMITS.perIpHour)) return { ok: false, reason: "ip-hour" };

  hit("global", TUTOR_LIMITS.globalHour, now);
  hit(`d:${ip}`, TUTOR_LIMITS.perIpDay, now);
  hit(`h:${ip}`, TUTOR_LIMITS.perIpHour, now);

  // Keep memory bounded.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.every((t) => now - t >= TUTOR_LIMITS.perIpDay.ms)) buckets.delete(k);
  }
  return { ok: true };
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim();
}
