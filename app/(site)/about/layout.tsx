import type { Metadata } from "next";
import { FOUNDER } from "@/components/founder-letter/constants";
import { TBG_TAGLINE } from "@/lib/brand-assets";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: `About Us — A Message from ${FOUNDER.name}`,
  description: `${TBG_TAGLINE} A letter from ${FOUNDER.name}, Founder & CEO of ${FOUNDER.org}, ${FOUNDER.place}.`,
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
