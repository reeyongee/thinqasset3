"use client";

import "@/components/mobile-home/mobile-home.css";
import { MobileFinalCta } from "@/components/mobile-home/sections/MobileFinalCta";
import { PageHero } from "@/components/page-hero/PageHero";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import { SERVICES_HERO } from "@/components/services/constants";
import { PAGE_HERO_IMAGES } from "@/lib/brand-assets";
import "./mobile-services.css";
import { MobileServicesPillars } from "./sections/MobileServicesPillars";

export function MobileServicesPage() {
  return (
    <div className="mobile-services" data-transition-page>
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
        <MobileServicesPillars />
      </ScrollSection>
      <ScrollSection chapter={{ num: "02", label: "Contact" }}>
        <MobileFinalCta />
      </ScrollSection>
    </div>
  );
}
