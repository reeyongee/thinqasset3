"use client";

import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { ServicesColumns } from "@/components/services/ServicesColumns";
import { ServicesHero } from "@/components/services/ServicesHero";
import "@/components/services/services.css";

export function DesktopServices() {
  return (
    <>
      <div className="services-page" data-transition-page>
        <ServicesHero />
        <ServicesColumns />
      </div>

      <FinalCtaSection />
    </>
  );
}
