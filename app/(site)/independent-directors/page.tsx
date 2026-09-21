import type { Metadata } from "next";
import { ProfileTextPair } from "@/components/profiles/ProfileTextPair";
import { INDEPENDENT_DIRECTORS } from "@/components/test-playground/InteractiveCardGallery";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Independent Directors — ThinqAsset",
  description: "Independent Directors governance showcase with fluid expansion animations.",
  path: "/independent-directors",
  robots: noIndexRobots,
});

export default function IndependentDirectorsPage() {
  return (
    <ProfileTextPair
      title="Our Independent Directors"
      members={INDEPENDENT_DIRECTORS}
    />
  );
}
