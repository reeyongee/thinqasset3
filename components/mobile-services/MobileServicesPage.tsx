"use client";

import "@/components/mobile-home/mobile-home.css";
import { MobileFinalCta } from "@/components/mobile-home/sections/MobileFinalCta";
import "./mobile-services.css";
import { MobileServicesHero } from "./sections/MobileServicesHero";
import { MobileServicesPillars } from "./sections/MobileServicesPillars";

export function MobileServicesPage() {
  return (
    <div className="mobile-services" data-transition-page>
      <MobileServicesHero />
      <MobileServicesPillars />
      <MobileFinalCta />
    </div>
  );
}
