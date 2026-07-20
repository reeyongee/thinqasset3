"use client";

import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import "./services.css";
import { ServicesColumns } from "./ServicesColumns";
import { ServicesHero } from "./ServicesHero";

export function ServicesPageContent() {
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
