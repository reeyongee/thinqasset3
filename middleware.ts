import { areLabRoutesEnabled, isLabOrTestRoute } from "@/lib/lab-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Pages and APIs that stay reachable while the site shows coming soon. */
function bypassesComingSoon(pathname: string): boolean {
  return (
    pathname === "/invoice" ||
    pathname.startsWith("/invoice/") ||
    pathname.startsWith("/api/invoice/")
  );
}

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === "production" &&
    !bypassesComingSoon(request.nextUrl.pathname)
  ) {
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }

  if (areLabRoutesEnabled()) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  if (!isLabOrTestRoute(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/not-found-trigger", request.url), {
    status: 404,
  });
}

export const config = {
  // Everything except Next internals and static files (paths with an extension).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
