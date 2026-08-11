"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { signalIntroCompleteOnce } from "@/lib/transition/introControl";
import { GlobeScrollCanvas, type GlobeScrollCanvasHandle } from "./GlobeScrollCanvas";
import {
  GLOBE_SCROLL_EYEBROW,
  GLOBE_SCROLL_HERO,
  GLOBE_SCROLL_JURISDICTIONS,
  GLOBE_SCROLL_PROBLEM,
  GLOBE_SCROLL_SOLUTION,
  GLOBE_SCROLL_STATS,
} from "./content";
import { useGlobeScroll } from "./useGlobeScroll";
import "./globe-scroll.css";

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduceMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCE_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReduceMotionSnapshot() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

function getReduceMotionServerSnapshot() {
  return false;
}

export function GlobeScrollSection() {
  const landingRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const globeLayerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeScrollCanvasHandle>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const problemHeadlineRef = useRef<HTMLHeadingElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const solutionHeadlineRef = useRef<HTMLHeadingElement>(null);
  const fadeSentinelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotionSnapshot,
    getReduceMotionServerSnapshot,
  );

  useEffect(() => {
    signalIntroCompleteOnce();
  }, []);

  useGlobeScroll({
    landingRef,
    globeLayerRef,
    veilRef,
    globeRef,
    problemHeadlineRef,
    solutionRef,
    fadeAfterRef: fadeSentinelRef,
    narrativeRef,
    statsRef,
    solutionHeadlineRef,
  });

  return (
    <section
      ref={landingRef}
      className="globe-scroll"
      aria-labelledby="globe-scroll-heading"
    >
      {/* Soft navy veil — radial-masked so the site mesh blob shows around the globe */}
      <div ref={veilRef} className="globe-scroll__veil" aria-hidden />

      <div ref={globeLayerRef} className="globe-scroll__globe-layer">
        <GlobeScrollCanvas ref={globeRef} paused={prefersReducedMotion} />
        <div className="globe-scroll__globe-gradient" aria-hidden />
      </div>

      <div className="globe-scroll__content">
        <section className="globe-scroll__hero">
          <div className="globe-scroll__hero-content">
            <h1 id="globe-scroll-heading" data-transition-text="headline">
              {GLOBE_SCROLL_HERO.title}
              <span className="globe-scroll__title-accent">
                {GLOBE_SCROLL_HERO.titleAccent}
              </span>
            </h1>
            <p className="globe-scroll__hero-body" data-transition-text="body">
              <span className="globe-scroll__hero-body-accent">
                {GLOBE_SCROLL_HERO.bodyLead}
              </span>
              {GLOBE_SCROLL_HERO.bodyRest ? (
                <> {GLOBE_SCROLL_HERO.bodyRest}</>
              ) : null}
            </p>
            <div className="globe-scroll__ctas">
              <GlowButton
                href={GLOBE_SCROLL_HERO.ctaHref}
                variant="gold"
                size="sm"
                transitionItem
              >
                {GLOBE_SCROLL_HERO.ctaLabel}
              </GlowButton>
              <GlowButton href="/services" size="sm" transitionItem>
                Our services
              </GlowButton>
            </div>
          </div>

          <div className="globe-scroll__logos" aria-label="Operating jurisdictions">
            <div className="globe-scroll__logos-backdrop" aria-hidden>
              <div className="globe-scroll__logos-backdrop-circle" />
            </div>
            <div className="globe-scroll__logos-marquee">
              <ul>
                {GLOBE_SCROLL_JURISDICTIONS.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div
          ref={narrativeRef}
          className="globe-scroll__narrative globe-scroll__narrative--hidden"
        >
          <section className="globe-scroll__problem">
            <h2 ref={problemHeadlineRef}>{GLOBE_SCROLL_PROBLEM}</h2>
          </section>

          <section ref={solutionRef} className="globe-scroll__solution">
            <h2 ref={solutionHeadlineRef}>{GLOBE_SCROLL_SOLUTION}</h2>
            <p className="globe-scroll__solution-eyebrow">{GLOBE_SCROLL_EYEBROW}</p>
          </section>
        </div>

        <div ref={statsRef} className="globe-scroll__stats" aria-label="Key metrics">
          <div className="globe-scroll__stats-backdrop" aria-hidden>
            <div className="globe-scroll__stats-backdrop-circle" />
          </div>
          <div className="globe-scroll__stats-inner">
            {GLOBE_SCROLL_STATS.map((stat) => (
              <div key={stat.label} className="globe-scroll__stat">
                <span className="globe-scroll__stat-label">{stat.label}</span>
                <strong>{stat.value}</strong>
                <span className="globe-scroll__stat-desc">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={fadeSentinelRef}
          className="globe-scroll__fade-sentinel"
          aria-hidden
        />
      </div>
    </section>
  );
}
