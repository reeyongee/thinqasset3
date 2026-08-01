"use client";

import { useRef } from "react";
import { RipeFollowSection, RipeMarquee } from "@/components/lab/ripe-hero/RipeCoverSections";
import { RipeHeroSection } from "@/components/lab/ripe-hero/RipeHeroSection";

export function RipeHeroLabContent() {
  const scrollTargetRef = useRef<HTMLElement>(null);

  return (
    <div className="ripe-hero-lab">
      <p className="ripe-hero-lab__nav">
        <a href="/test">← Test labs</a>
      </p>

      <RipeHeroSection scrollTargetRef={scrollTargetRef} />

      <div className="ripe-hero-lab__cover-stack">
        <RipeMarquee />
        <RipeFollowSection scrollTargetRef={scrollTargetRef} />
      </div>

      <section className="ripe-hero-lab__scroll" aria-label="Scroll test spacer">
        <div className="ripe-hero-lab__scroll-inner">
          <p>
            Scroll to verify the cover effect: navy surface sections scroll at
            normal speed while the hero lags at 68% (Framer speed&nbsp;32), so
            content slides over the prism video and headline together.
          </p>
        </div>
      </section>
    </div>
  );
}
