import { type RefObject } from "react";
import {
  LAB_COPY,
  RIPE_SCROLL_TARGET_GAP,
  RIPE_SCROLL_TARGET_HEIGHT,
} from "./constants";

export function RipeMarquee() {
  return (
    <div
      className="ripe-hero-lab__marquee"
      style={{ minHeight: RIPE_SCROLL_TARGET_GAP }}
      aria-hidden
    >
      <p className="ripe-hero-lab__marquee-tag">{LAB_COPY.marqueeTag}</p>
      <div className="ripe-hero-lab__marquee-logos" />
    </div>
  );
}

export function RipeFollowSection({
  scrollTargetRef,
}: {
  scrollTargetRef: RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={scrollTargetRef}
      className="ripe-hero-lab__follow"
      data-ripe-scroll-target
      style={{ minHeight: RIPE_SCROLL_TARGET_HEIGHT }}
      aria-label="ThinqAsset follow section"
    >
      <div className="ripe-hero-lab__follow-inner">
        <p className="ripe-hero-lab__follow-eyebrow">{LAB_COPY.followEyebrow}</p>
        <h2 className="ripe-hero-lab__follow-heading">{LAB_COPY.followHeading}</h2>
        <p className="ripe-hero-lab__follow-body">{LAB_COPY.followBody}</p>
      </div>
    </section>
  );
}
