"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { HeroButton } from "@/components/hero/HeroButton";
import {
  HERO_BG_POSTER,
  HERO_BG_VIDEO_MP4,
  HERO_BG_VIDEO_WEBM,
} from "@/components/hero/constants";
import { TBG_TAGLINE } from "@/lib/brand-assets";
import { CONSULTATION_HREF } from "@/lib/transition/constants";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function MobileHero() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  return (
    <section className="mobile-hero" aria-label="Hero">
      <div className="mobile-hero__media relative" aria-hidden>
        <Image
          src={HERO_BG_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {!prefersReducedMotion ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_BG_POSTER}
          >
            <source src={HERO_BG_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_BG_VIDEO_MP4} type="video/mp4" />
          </video>
        ) : null}
        <div className="mobile-hero__shade" />
      </div>

      <div className="mobile-hero__content">
        <p
          className="m-0 font-[family-name:var(--font-geist-mono)] text-[11px] font-medium uppercase leading-none tracking-[0.22em] text-ta-gold"
          data-transition-text="body"
        >
          {TBG_TAGLINE}
        </p>
        <h1 className="mobile-hero__headline" data-transition-text="headline">
          Innovative Global Fund Management.
        </h1>

        <p
          className="mobile-section__body max-w-[34ch]"
          data-transition-text="body"
        >
          <span className="text-ta-gold">
            Connecting the Middle East with global investment opportunities
          </span>{" "}
          through tailored strategies and unparalleled service.
        </p>

        <HeroButton
          className="w-full"
          href={CONSULTATION_HREF}
          transitionItem
        />
      </div>
    </section>
  );
}
