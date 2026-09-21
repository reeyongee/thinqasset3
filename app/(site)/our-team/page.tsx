import type { Metadata } from "next";
import {
  InteractiveCardGallery,
  TEAM_MEMBERS,
} from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team — ThinqAsset",
  description: "Executive leadership and fund management profiles.",
  path: "/our-team",
  robots: noIndexRobots,
});

export default function OurTeamPage() {
  return (
    <InteractiveCardGallery
      title="Our Team"
      members={TEAM_MEMBERS}
      mobileStack
    />
  );
}
