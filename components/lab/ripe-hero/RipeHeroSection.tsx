"use client";

import { type RefObject } from "react";
import {
  LAB_COPY,
  LAB_CTA,
  LAB_HERO_POSTER,
  LAB_HERO_VIDEO_MP4,
  LAB_HERO_VIDEO_WEBM,
} from "./constants";
import { LabHeroButton } from "./LabHeroButton";
import { TokenizedText } from "./TokenizedText";
import { useRipeHeroMotion } from "./useRipeHeroMotion";
import "./ripe-hero.css";

type RipeHeroSectionProps = {
  scrollTargetRef?: RefObject<HTMLElement | null>;
};

export function RipeHeroSection({ scrollTargetRef }: RipeHeroSectionProps) {
  const { sectionRef, visualRef, visualInnerRef } =
    useRipeHeroMotion(scrollTargetRef);

  return (
    <section
      ref={sectionRef}
      className="ripe-hero"
      aria-label="ThinqAsset hero lab"
    >
      <div ref={visualRef} className="ripe-hero__visual" aria-hidden>
        <div ref={visualInnerRef} className="ripe-hero__visual-inner">
          <video
            className="ripe-hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={LAB_HERO_POSTER}
          >
            <source src={LAB_HERO_VIDEO_WEBM} type="video/webm" />
            <source src={LAB_HERO_VIDEO_MP4} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="ripe-hero__wrapper">
        <div className="ripe-hero__header">
          <div className="ripe-hero__text">
            <h1 className="ripe-hero__headline">
              <span className="ripe-hero__headline-inner" data-ripe-line>
                {LAB_COPY.headlineLines.map((line) => (
                  <span className="ripe-hero__headline-line" key={line}>
                    <TokenizedText text={line} />
                  </span>
                ))}
              </span>
            </h1>
            <p className="ripe-hero__body">
              <span className="ripe-hero__body-inner" data-ripe-line>
                <TokenizedText text={LAB_COPY.body} />
              </span>
            </p>
          </div>

          <div className="ripe-hero__buttons">
            <LabHeroButton
              href={LAB_CTA.primary.href}
              label={LAB_CTA.primary.label}
              variant="gold"
            />
            <LabHeroButton
              href={LAB_CTA.secondary.href}
              label={LAB_CTA.secondary.label}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
