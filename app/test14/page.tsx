import type { Metadata } from "next";
import { HeroContent } from "@/components/lab/test14/HeroContent";
import { PrismVideoBackground } from "@/components/lab/test14/PrismVideoBackground";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Glass Prism Video Background",
  description:
    "Full-resolution prism reference video, right-anchored with edge fades.",
  path: "/test14",
  robots: noIndexRobots,
});

export default function Test14Page() {
  return (
    <section
      data-transition-page
      className="relative h-dvh w-full overflow-hidden"
      style={{ background: "#000105" }}
    >
      <PrismVideoBackground contained />
      <HeroContent />
    </section>
  );
}
