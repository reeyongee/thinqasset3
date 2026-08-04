"use client";

import { useRef } from "react";
import ChapterBar, { FOUNDER_CHAPTERS } from "@/components/ChapterBar";
import ScrollIndicator from "@/components/ScrollIndicator";
import Hero from "@/components/scenes/Hero";
import Purpose from "@/components/scenes/Purpose";
import Jurisdictions from "@/components/scenes/Jurisdictions";
import Capabilities from "@/components/scenes/Capabilities";
import Portrait from "@/components/scenes/Portrait";
import Expansion from "@/components/scenes/Expansion";
import Trust from "@/components/scenes/Trust";
import Signature from "@/components/scenes/Signature";

export function FounderLetterPage() {
  const hero = useRef<HTMLElement>(null);
  const purpose = useRef<HTMLElement>(null);
  const jurisdictions = useRef<HTMLElement>(null);
  const capabilities = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLElement>(null);
  const expansion = useRef<HTMLElement>(null);
  const trust = useRef<HTMLElement>(null);
  const signature = useRef<HTMLElement>(null);

  const sections = [
    hero,
    purpose,
    jurisdictions,
    capabilities,
    portrait,
    expansion,
    trust,
    signature,
  ];

  return (
    <div className="founder-letter" data-transition-page>
      <ChapterBar sections={sections} chapters={FOUNDER_CHAPTERS} dockAboveFooter />
      <ScrollIndicator />
      <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        <Hero sectionRef={hero} />
        <Purpose sectionRef={purpose} />
        <Jurisdictions sectionRef={jurisdictions} />
        <Capabilities sectionRef={capabilities} />
        <Portrait sectionRef={portrait} />
        <Expansion sectionRef={expansion} />
        <Trust sectionRef={trust} />
        <Signature sectionRef={signature} />
      </div>
    </div>
  );
}
