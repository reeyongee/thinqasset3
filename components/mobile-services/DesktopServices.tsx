"use client";

import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { PageHero } from "@/components/page-hero/PageHero";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import { SERVICES_HERO } from "@/components/services/constants";
import { ServicesColumns } from "@/components/services/ServicesColumns";
import { PAGE_HERO_IMAGES } from "@/lib/brand-assets";
import "@/components/services/services.css";

export function DesktopServices() {
  return (
    <div className="services-page" data-transition-page>
      <PageHero
        priority
        imageSrc={PAGE_HERO_IMAGES.services}
        lines={[
          SERVICES_HERO.headlineLines[0],
          <>
            {SERVICES_HERO.headlineLines[1].split(" ")[0]}{" "}
            <em className="italic text-brass">
              {SERVICES_HERO.headlineLines[1].split(" ").slice(1).join(" ")}
            </em>
          </>,
        ]}
        subtitle={SERVICES_HERO.subline}
        meta={[SERVICES_HERO.eyebrow, SERVICES_HERO.brand, SERVICES_HERO.meta]}
      />
      <ScrollSection chapter={{ num: "01", label: "Platforms" }}>
        <ServicesColumns />
      </ScrollSection>
      <ScrollSection chapter={{ num: "02", label: "Contact" }}>
        <FinalCtaSection />
      </ScrollSection>
    </div>
  );
}
