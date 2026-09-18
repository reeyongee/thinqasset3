import { areLabRoutesEnabled, isLabOrTestRoute } from "@/lib/lab-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
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
  matcher: [
    "/lab/:path*",
    "/test",
    "/test/:path*",
    "/test10",
    "/test10/:path*",
    "/test11",
    "/test11/:path*",
    "/test13",
    "/test13/:path*",
    "/test14",
    "/test14/:path*",
  ],
};
