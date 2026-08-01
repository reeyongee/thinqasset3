"use client";

import dynamic from "next/dynamic";
import "./mobile-home.css";
import { GlobeScrollSection } from "@/components/globe-scroll";
import { MobileNumbers } from "./sections/MobileNumbers";

const MobileFeatures = dynamic(() =>
  import("./sections/MobileFeatures").then((m) => ({ default: m.MobileFeatures })),
);
const MobileHowItWorks = dynamic(() =>
  import("./sections/MobileHowItWorks").then((m) => ({
    default: m.MobileHowItWorks,
  })),
);
const MobileApproach = dynamic(() =>
  import("./sections/MobileApproach").then((m) => ({ default: m.MobileApproach })),
);
const MobileBenefits = dynamic(() =>
  import("./sections/MobileBenefits").then((m) => ({ default: m.MobileBenefits })),
);
const MobileTestimonials = dynamic(() =>
  import("./sections/MobileTestimonials").then((m) => ({
    default: m.MobileTestimonials,
  })),
);
const MobileGlobeSection = dynamic(() =>
  import("./sections/MobileGlobeSection").then((m) => ({
    default: m.MobileGlobeSection,
  })),
);
const MobileFaq = dynamic(() =>
  import("./sections/MobileFaq").then((m) => ({ default: m.MobileFaq })),
);
const MobileFinalCta = dynamic(() =>
  import("./sections/MobileFinalCta").then((m) => ({
    default: m.MobileFinalCta,
  })),
);

export function MobileHomePage() {
  return (
    <div className="mobile-home" data-transition-page>
      <GlobeScrollSection />
      <MobileNumbers />
      <MobileFeatures />
      <MobileHowItWorks />
      <MobileApproach />
      <MobileBenefits />
      <MobileTestimonials />
      <MobileGlobeSection />
      <MobileFaq />
      <MobileFinalCta />
    </div>
  );
}
