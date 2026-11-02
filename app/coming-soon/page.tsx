import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon/ComingSoon";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Coming soon",
  description: "ThinqAsset is coming soon.",
  path: "/",
  robots: noIndexRobots,
});

export default function ComingSoonPage() {
  return <ComingSoon />;
}
