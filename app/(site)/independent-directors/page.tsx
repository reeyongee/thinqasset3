import type { Metadata } from "next";
import {
  InteractiveCardGallery,
  INDEPENDENT_DIRECTORS,
} from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Independent Directors — ThinqAsset",
  description: "Independent Directors governance showcase with fluid expansion animations.",
  path: "/independent-directors",
  robots: noIndexRobots,
});

export default function IndependentDirectorsPage() {
  return (
    <InteractiveCardGallery
      title="Our Independent Directors"
      members={INDEPENDENT_DIRECTORS}
    />
  );
}
