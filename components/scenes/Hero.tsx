"use client";

import type { RefObject } from "react";
import { PageHero } from "@/components/page-hero/PageHero";

const META = [
  "DIFC, Dubai — UAE",
  "To our stakeholders",
  "Ref. TBG / Founder\u2019s Letter",
] as const;

export default function Hero({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <PageHero
      sectionRef={sectionRef}
      priority
      lines={[
        "A message from",
        <>
          the Office of the <em className="italic text-brass">Founder</em>
        </>,
      ]}
      subtitle="& Chief Executive Officer"
      meta={META}
    />
  );
}
