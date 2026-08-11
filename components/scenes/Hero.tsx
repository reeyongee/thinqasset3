"use client";

import type { RefObject } from "react";
import { PageHero } from "@/components/page-hero/PageHero";
import { FOUNDER } from "@/components/founder-letter/constants";
import { PAGE_HERO_IMAGES } from "@/lib/brand-assets";

export default function Hero({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <PageHero
      sectionRef={sectionRef}
      priority
      imageSrc={PAGE_HERO_IMAGES.about}
      lines={[
        "A message from",
        <>
          the Office of the <em className="italic text-brass">Founder</em>
        </>,
      ]}
      subtitle={`${FOUNDER.name} — Chief Executive Officer`}
    />
  );
}
