"use client";

import dynamic from "next/dynamic";
import { GlobeScrollSection } from "@/components/globe-scroll";
import { NumbersSection } from "@/components/numbers/NumbersSection";

const FeaturesSection = dynamic(() =>
  import("@/components/features/FeaturesSection").then((m) => ({
    default: m.FeaturesSection,
  })),
);
const HowItWorksSection = dynamic(() =>
  import("@/components/how-it-works/HowItWorksSection").then((m) => ({
    default: m.HowItWorksSection,
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
const TestimonialsSection = dynamic(() =>
  import("@/components/testimonials/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
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
      <HowItWorksSection />
      <OurApproachSection />
      <BenefitsSection />
      <TestimonialsSection />
      <GlobeSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
