"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  computeMaskFromBounds,
  computeNarrativeMask,
  type GlobeScrollCanvasHandle,
} from "./GlobeScrollCanvas";
import {
  HERO_LOGOS_FADE_END,
  HERO_LOGOS_FADE_END_MOBILE,
  MASK_SOLID_STOP,
  MOBILE_JS_BREAKPOINT,
  MOBILE_PORTRAIT_QUERY,
  NARRATIVE_TEXT_END_DESKTOP,
  NARRATIVE_TEXT_END_MOBILE,
  REVEAL_FADE_END,
  REVEAL_FADE_START,
  STATS_EXIT_PROGRESS,
  STATS_SECTION_EXIT_FADE_RATIO,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = MOBILE_JS_BREAKPOINT;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/** Fin Ke.smoothstep — used for revealFade (bg mask offset only) */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Fin c(x): revealFade = smoothstep(progress, 0.75, 1) */
function revealFadeFromProgress(progress: number) {
  return smoothstep(REVEAL_FADE_START, REVEAL_FADE_END, progress);
}

type UseGlobeScrollOptions = {
  landingRef: RefObject<HTMLElement | null>;
  globeLayerRef: RefObject<HTMLDivElement | null>;
  veilRef: RefObject<HTMLDivElement | null>;
  globeRef: RefObject<GlobeScrollCanvasHandle | null>;
  problemHeadlineRef: RefObject<HTMLElement | null>;
  solutionRef: RefObject<HTMLElement | null>;
  /** Center-unlock sentinel — ST end after camera zoom; no fade */
  fadeAfterRef: RefObject<HTMLElement | null>;
  narrativeRef: RefObject<HTMLElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  solutionHeadlineRef: RefObject<HTMLElement | null>;
};

export function useGlobeScroll({
  landingRef,
  globeLayerRef,
  veilRef,
  globeRef,
  problemHeadlineRef,
  solutionRef,
  fadeAfterRef,
  narrativeRef,
  statsRef,
  solutionHeadlineRef,
}: UseGlobeScrollOptions) {
  const narrativeProgressRef = useRef(0);
  const maskRatiosRef = useRef({
    ready: false,
    x: 0.5,
    y: 0.78,
    rx: 0.42,
    ry: 0.22,
  });

  useEffect(() => {
    const landing = landingRef.current;
    const globeLayer = globeLayerRef.current;
    const veil = veilRef.current;
    const narrative = narrativeRef.current;
    if (!landing || !globeLayer || !veil || !narrative) return;

    let frame = 0;
    let boundsPoll = 0;
    let textTrigger: ScrollTrigger | null = null;
    let centerTrigger: ScrollTrigger | null = null;
    let narrativeObserver: IntersectionObserver | null = null;
    let sectionObserver: IntersectionObserver | null = null;
    let narrativeIntersecting = false;
    let sectionInView = true;
    let lastScrollY = window.scrollY;
    let textPhaseProgress = 0;
    let centerPhaseProgress = 0;

    const setBackgroundMask = (
      enabled: boolean,
      x?: number,
      y?: number,
      radiusX?: number,
      radiusY?: number,
    ) => {
      if (!enabled) {
        landing.style.removeProperty("--globe-scroll-mask-x");
        landing.style.removeProperty("--globe-scroll-mask-y");
        landing.style.removeProperty("--globe-scroll-mask-rx");
        landing.style.removeProperty("--globe-scroll-mask-ry");
        landing.dataset.masked = "false";
        return;
      }
      landing.style.setProperty("--globe-scroll-mask-x", `${x}px`);
      landing.style.setProperty("--globe-scroll-mask-y", `${y}px`);
      landing.style.setProperty("--globe-scroll-mask-rx", `${radiusX}px`);
      landing.style.setProperty("--globe-scroll-mask-ry", `${radiusY}px`);
      landing.style.setProperty("--globe-scroll-mask-solid", MASK_SOLID_STOP);
      landing.dataset.masked = "true";
    };

    const clearNarrativeMask = () => {
      narrative.classList.remove("globe-scroll__narrative--masked");
      narrative.classList.add("globe-scroll__narrative--hidden");
      narrative.style.removeProperty("--narrative-mask-x");
      narrative.style.removeProperty("--narrative-mask-y");
      narrative.style.removeProperty("--narrative-mask-inner");
      narrative.style.removeProperty("--narrative-mask-outer");
    };

    const setNarrativeMask = (
      x: number,
      y: number,
      inner: number,
      outer: number,
    ) => {
      narrative.style.setProperty("--narrative-mask-x", `${x}px`);
      narrative.style.setProperty("--narrative-mask-y", `${y}px`);
      narrative.style.setProperty("--narrative-mask-inner", `${inner}px`);
      narrative.style.setProperty("--narrative-mask-outer", `${outer}px`);
      narrative.classList.add("globe-scroll__narrative--masked");
      narrative.classList.remove("globe-scroll__narrative--hidden");
    };

    const storeMaskRatios = (x: number, y: number, rx: number, ry: number) => {
      if (window.innerWidth <= 0 || window.innerHeight <= 0) return;
      maskRatiosRef.current = {
        ready: true,
        x: x / window.innerWidth,
        y: y / window.innerHeight,
        rx: rx / window.innerWidth,
        ry: ry / window.innerHeight,
      };
    };

    const applyScrubProgress = () => {
      const textEnd =
        window.innerWidth < MOBILE_BREAKPOINT
          ? NARRATIVE_TEXT_END_MOBILE
          : NARRATIVE_TEXT_END_DESKTOP;
      const progress =
        textPhaseProgress * textEnd +
        centerPhaseProgress * (1 - textEnd);
      narrativeProgressRef.current = progress;
      globeRef.current?.setNarrativeProgress(progress);
    };

    let triggersReady = false;
    let triggersWereMobile: boolean | null = null;

    const killTriggers = () => {
      textTrigger?.kill();
      centerTrigger?.kill();
      textTrigger = null;
      centerTrigger = null;
      triggersReady = false;
    };

    const setupTriggers = () => {
      const problem = problemHeadlineRef.current;
      const solutionHeadline = solutionHeadlineRef.current;
      const unlockSentinel = fadeAfterRef.current;
      if (!problem || !solutionHeadline || !unlockSentinel || !globeRef.current) {
        return;
      }

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (
        triggersReady &&
        textTrigger &&
        centerTrigger &&
        triggersWereMobile === isMobile
      ) {
        return;
      }

      killTriggers();
      triggersWereMobile = isMobile;
      textPhaseProgress = 0;
      centerPhaseProgress = 0;
      narrativeProgressRef.current = 0;
      globeRef.current.setNarrativeProgress(0);

      // Phase A (both viewports): problem → solution center.
      // Globe stays bottom-framed so solution copy stays readable (fin.com).
      textTrigger = ScrollTrigger.create({
        trigger: problem,
        start: "top 82%",
        endTrigger: solutionHeadline,
        end: "center center",
        scrub: 1,
        onUpdate(self) {
          textPhaseProgress = self.progress;
          if (self.progress < 1) centerPhaseProgress = 0;
          applyScrubProgress();
          onScroll();
        },
      });

      // Phase B: solution center → unlock sentinel — globe moves to center, then unlock.
      centerTrigger = ScrollTrigger.create({
        trigger: solutionHeadline,
        start: "center center",
        endTrigger: unlockSentinel,
        end: "top center",
        scrub: 1,
        onUpdate(self) {
          centerPhaseProgress = self.progress;
          textPhaseProgress = 1;
          applyScrubProgress();
          onScroll();
        },
      });

      triggersReady = true;
    };

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      // Match fixed globe layer (--app-vh / visualViewport) so exit ride-out
      // doesn't jump when mobile chrome shows/hides.
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const isMobilePortrait = window.matchMedia(MOBILE_PORTRAIT_QUERY).matches;
      const scrollingDown = scrollY >= lastScrollY;
      lastScrollY = scrollY;

      const sectionRect = landing.getBoundingClientRect();
      sectionInView = sectionRect.bottom > 0 && sectionRect.top < vh;

      // Ride fixed layers out with the section bottom (unlock scroll)
      const exitTravel = sectionInView
        ? Math.max(0, vh - sectionRect.bottom)
        : vh;
      const exitY = sectionInView ? -exitTravel : -vh;
      const exitTransform = `translate3d(0, ${exitY}px, 0)`;
      globeLayer.style.transform = exitTransform;
      veil.style.transform = exitTransform;

      if (!sectionInView) {
        globeLayer.style.opacity = "0";
        veil.style.opacity = "0";
        setBackgroundMask(false);
        clearNarrativeMask();
        const stats = statsRef.current;
        if (stats) {
          stats.style.opacity = "0";
          stats.style.transform = isMobilePortrait ? "" : exitTransform;
        }
        return;
      }

      const sectionTop = sectionRect.top + scrollY;
      const sectionScroll = Math.max(0, scrollY - sectionTop);
      const narrativeProgress = narrativeProgressRef.current;
      const centerComplete = narrativeProgress >= 0.995;

      // Soft veil fades as the globe centers so the mesh blob reads clearly
      const veilFade = 1 - smoothstep(0, 0.85, centerPhaseProgress);
      veil.style.opacity = String(veilFade);
      globeLayer.style.opacity = "1";

      const logos = landing.querySelector<HTMLElement>(".globe-scroll__logos");
      if (logos) {
        const logosFadeEnd = isMobilePortrait
          ? HERO_LOGOS_FADE_END_MOBILE
          : HERO_LOGOS_FADE_END;
        logos.style.opacity = String(
          clamp01(1 - sectionScroll / logosFadeEnd),
        );
      }

      const bounds = globeRef.current?.getScreenBounds();
      const maskProgress = revealFadeFromProgress(narrativeProgress);
      // Bg veil mask only during the hero→center scrub. Narrative mask must stay
      // alive after center (fin.com) so solution copy can scroll out from behind
      // the globe — never hard-hide it at progress ≈ 1.
      const showBackgroundMask = Boolean(
        bounds && bounds.radius > 0 && !centerComplete,
      );

      if (bounds && bounds.radius > 0) {
        if (showBackgroundMask) {
          const mask = computeMaskFromBounds(bounds, maskProgress, vh, isMobile);
          if (!maskRatiosRef.current.ready || maskProgress <= 0.05) {
            storeMaskRatios(mask.x, mask.y, mask.radiusX, mask.radiusY);
          }
          setBackgroundMask(true, mask.x, mask.y, mask.radiusX, mask.radiusY);
        } else {
          setBackgroundMask(false);
        }

        if (narrativeIntersecting) {
          const narrativeViewportTop = narrative.getBoundingClientRect().top;
          const narrativeMask = computeNarrativeMask(bounds, narrativeViewportTop);
          setNarrativeMask(
            narrativeMask.x,
            narrativeMask.y,
            narrativeMask.inner,
            narrativeMask.outer,
          );
        } else {
          clearNarrativeMask();
        }
      } else {
        setBackgroundMask(false);
        clearNarrativeMask();
      }

      // Stats — fade in with problem; fade out before/during section unlock
      const stats = statsRef.current;
      const problemHeadline = problemHeadlineRef.current;
      const solutionHeadline = solutionHeadlineRef.current;

      if (stats && solutionHeadline && problemHeadline) {
        const problemTop = problemHeadline.getBoundingClientRect().top;
        const solutionHeadlineTop = solutionHeadline.getBoundingClientRect().top;
        const solutionHeadlineBottom =
          solutionHeadline.getBoundingClientRect().bottom;

        const enter = clamp01(1 - problemTop / (vh / 2));
        const enterOffsetPx =
          (1 - enter) * 2 * (parseFloat(getComputedStyle(landing).fontSize) || 16);

        const highlightValues = scrollingDown
          ? solutionHeadlineTop < vh / 2
          : solutionHeadlineBottom < vh / 2;

        // Fade as narrative unlocks, and as the section bottom leaves the viewport
        const narrativeExitFade =
          narrativeProgress < STATS_EXIT_PROGRESS
            ? 1
            : 1 - smoothstep(STATS_EXIT_PROGRESS, 1, narrativeProgress);
        const sectionExitFade =
          1 - smoothstep(0, vh * STATS_SECTION_EXIT_FADE_RATIO, exitTravel);
        const statsOpacity = enter * Math.min(narrativeExitFade, sectionExitFade);

        // Mobile: keep stats pinned to the bottom and fade — don't ride exitY
        // (that produced the large negative translate mid-story).
        const statsY = enterOffsetPx + (isMobilePortrait ? 0 : exitY);

        stats.style.opacity = String(statsOpacity);
        stats.style.translate = "";
        stats.style.transform =
          statsY === 0 ? "none" : `translate3d(0, ${statsY}px, 0)`;
        stats.style.transition = "none";
        stats.dataset.highlight = highlightValues ? "true" : "false";

        const backdrop = stats.querySelector<HTMLElement>(
          ".globe-scroll__stats-backdrop",
        );
        if (backdrop) {
          backdrop.style.opacity = String((1 - maskProgress) * statsOpacity);
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      maskRatiosRef.current.ready = false;
      setupTriggers();
      onScroll();
      ScrollTrigger.refresh();
    };

    narrativeObserver = new IntersectionObserver(
      (entries) => {
        narrativeIntersecting = entries[0]?.isIntersecting ?? false;
        onScroll();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    narrativeObserver.observe(narrative);

    // Keep scroll-driven masks fresh while the stage is onscreen without a
    // permanent RAF; intersection covers enter/leave, scroll covers motion.
    sectionObserver = new IntersectionObserver(
      (entries) => {
        sectionInView = entries[0]?.isIntersecting ?? false;
        onScroll();
      },
      { rootMargin: "80px 0px" },
    );
    sectionObserver.observe(landing);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onScroll);

    setupTriggers();
    onResize();

    // Globe bounds arrive async after textures load — refresh masks once ready.
    let boundsPollAttempts = 0;
    const pollBounds = () => {
      const bounds = globeRef.current?.getScreenBounds();
      if (bounds && bounds.radius > 0) {
        onScroll();
        boundsPoll = 0;
        return;
      }
      boundsPollAttempts += 1;
      if (boundsPollAttempts > 180) {
        boundsPoll = 0;
        return;
      }
      boundsPoll = requestAnimationFrame(pollBounds);
    };
    boundsPoll = requestAnimationFrame(pollBounds);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (boundsPoll) cancelAnimationFrame(boundsPoll);
      narrativeObserver?.disconnect();
      sectionObserver?.disconnect();
      killTriggers();
      setBackgroundMask(false);
      clearNarrativeMask();
      globeLayer.style.transform = "";
      globeLayer.style.opacity = "";
      veil.style.transform = "";
      veil.style.opacity = "";
      const stats = statsRef.current;
      if (stats) {
        stats.style.transform = "";
        stats.style.opacity = "";
        stats.style.translate = "";
      }
    };
  }, [
    landingRef,
    globeLayerRef,
    veilRef,
    globeRef,
    problemHeadlineRef,
    solutionRef,
    fadeAfterRef,
    narrativeRef,
    statsRef,
    solutionHeadlineRef,
  ]);
}
