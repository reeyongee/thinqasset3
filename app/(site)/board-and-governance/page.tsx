import type { Metadata } from "next";
import {
  InteractiveCardGallery,
  BOARD_MEMBERS,
} from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Board and Governance — ThinqAsset",
  description: "Board and governance showcase with fluid expansion animations.",
  path: "/board-and-governance",
  robots: noIndexRobots,
});

export default function BoardAndGovernancePage() {
  return (
    <InteractiveCardGallery
      title="Board and Governance"
      members={BOARD_MEMBERS}
    />
  );
}
