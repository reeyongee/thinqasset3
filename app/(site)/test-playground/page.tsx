import type { Metadata } from "next";
import { InteractiveCardGallery } from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio Founders — Fluid Gallery",
  description: "Interactive portfolio founder showcase with fluid expansion animations.",
  path: "/test-playground",
  robots: noIndexRobots,
});

export default function TestPlaygroundPage() {
  return <InteractiveCardGallery />;
}
