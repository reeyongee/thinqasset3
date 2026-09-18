import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found/NotFoundPage";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: noIndexRobots,
});

/** Middleware rewrite target for blocked lab URLs (see middleware.ts). */
export default function NotFoundTrigger() {
  return <NotFoundPage />;
}
