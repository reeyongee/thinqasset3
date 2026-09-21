import type { Metadata } from "next";
import { ProfileTextPair } from "@/components/profiles/ProfileTextPair";
import { BOARD_MEMBERS } from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Board and Governance — ThinqAsset",
  description: "Board and governance showcase with fluid expansion animations.",
  path: "/board",
  robots: noIndexRobots,
});

export default function BoardPage() {
  return (
    <ProfileTextPair title="Board and Governance" members={BOARD_MEMBERS} />
  );
}
