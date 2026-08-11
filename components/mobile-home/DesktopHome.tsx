"use client";

import dynamic from "next/dynamic";
import { GlobeScrollSection } from "@/components/globe-scroll";
import { NumbersSection } from "@/components/numbers/NumbersSection";

const FeaturesSection = dynamic(() =>
  import("@/components/features/FeaturesSection").then((m) => ({
    default: m.FeaturesSection,
  })),
);
const OurApproachSection = dynamic(() =>
  import("@/components/our-approach/OurApproachSection").then((m) => ({
    default: m.OurApproachSection,
  })),
);
const BenefitsSection = dynamic(() =>
  import("@/components/benefits/BenefitsSection").then((m) => ({
    default: m.BenefitsSection,
  })),
);
const GlobeSection = dynamic(() =>
  import("@/components/globe/GlobeSection").then((m) => ({
    default: m.GlobeSection,
  })),
);
const FaqSection = dynamic(() =>
  import("@/components/faq/FaqSection").then((m) => ({
    default: m.FaqSection,
  })),
);
const FinalCtaSection = dynamic(() =>
  import("@/components/final-cta/FinalCtaSection").then((m) => ({
    default: m.FinalCtaSection,
  })),
);

export function DesktopHome() {
  return (
    <>
      <GlobeScrollSection />
      <NumbersSection />
      <FeaturesSection />
      <OurApproachSection />
      <BenefitsSection />
      <GlobeSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
