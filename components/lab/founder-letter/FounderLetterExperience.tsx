"use client";

import { ClosingScene } from "./ClosingScene";
import { EcosystemScene } from "./EcosystemScene";
import { FootprintScene } from "./FootprintScene";
import { FounderHero } from "./FounderHero";
import { PurposeScene } from "./PurposeScene";
import { ScrollRail } from "./ScrollRail";
import { TrustScene } from "./TrustScene";
import "./founder-letter.css";

/**
 * A Message from the Office of the Founder & CEO — scrollytelling experience.
 *
 * Scene architecture (scroll is the timeline):
 *   Hero (establish)      → page progress: portrait parallax + scale, fade-out
 *   Purpose (build)       → section progress: word-scrub manifesto
 *   Footprint (reveal)    → section progress: jurisdiction timeline
 *   Ecosystem (transition)→ pinned deck: capability cards peel
 *   Trust (resolve)       → section progress: giant word scrub + body
 *   Closing (resolve)     → section progress: signature block
 *
 * Every scene derives from a single springed scroll progress value; no
 * state-driven animation, no imperative timelines.
 */
export function FounderLetterExperience() {
  return (
    <div className="fl-page" data-transition-page>
      <div className="fl-page__bg" aria-hidden />
      <div className="fl-noise" aria-hidden />
      <ScrollRail />
      <main>
        <FounderHero />
        <PurposeScene />
        <FootprintScene />
        <EcosystemScene />
        <TrustScene />
        <ClosingScene />
      </main>
    </div>
  );
}
