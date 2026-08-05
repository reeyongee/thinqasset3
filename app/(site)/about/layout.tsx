import type { Metadata } from "next";
import { FOUNDER } from "@/components/founder-letter/constants";
import { TBG_TAGLINE } from "@/lib/brand-assets";

export const metadata: Metadata = {
  title: `About Us — A Message from ${FOUNDER.name} | THINQASSET`,
  description: `${TBG_TAGLINE} A letter from ${FOUNDER.name}, Founder & CEO of ${FOUNDER.org}, ${FOUNDER.place}.`,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
