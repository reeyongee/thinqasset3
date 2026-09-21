import type { Metadata } from "next";
import {
  InteractiveCardGallery,
  BOARD_MEMBERS,
} from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Board — ThinqAsset",
  description: "Board and governance leadership at ThinqAsset.",
  path: "/our-board",
  robots: noIndexRobots,
});

export default function OurBoardPage() {
  return (
    <InteractiveCardGallery
      title="Our Board"
      members={BOARD_MEMBERS}
      mobileStack
    />
  );
}
