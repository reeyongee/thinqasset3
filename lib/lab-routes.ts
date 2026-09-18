/**
 * Dev / motion-lab routes. Blocked in production unless ENABLE_LAB_ROUTES is set.
 * See middleware.ts.
 */

const LAB_ROUTE_PREFIXES = ["/lab/"] as const;

const TEST_ROUTE_EXACT = new Set([
  "/test",
  "/test10",
  "/test11",
  "/test13",
  "/test14",
]);

export function areLabRoutesEnabled(): boolean {
  const flag = process.env.ENABLE_LAB_ROUTES;
  if (flag === "1" || flag === "true") return true;
  return process.env.NODE_ENV !== "production";
}

/** True when this pathname is a lab or /test* experiment route. */
export function isLabOrTestRoute(pathname: string): boolean {
  if (TEST_ROUTE_EXACT.has(pathname)) return true;

  for (const prefix of LAB_ROUTE_PREFIXES) {
    if (pathname.startsWith(prefix)) return true;
  }

  if (pathname.startsWith("/test/")) return true;

  if (
    pathname.startsWith("/test10/") ||
    pathname.startsWith("/test11/") ||
    pathname.startsWith("/test13/") ||
    pathname.startsWith("/test14/")
  ) {
    return true;
  }

  return false;
}
