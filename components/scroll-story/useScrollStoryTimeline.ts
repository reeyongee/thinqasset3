"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  runWithScrollBreakpoints,
  scheduleScrollRefresh,
} from "@/lib/scroll/scrollOrchestrator";
import {
  BEAT_STARTS,
  GRAPH_PHASE_START,
  HERO_FADE_END,
  SCROLL_RUNWAY_DESKTOP,
  SCROLL_RUNWAY_MOBILE,
  STORY_BEATS,
} from "./constants";
import { getBeatTimeline } from "@/components/lab/scroll-svg/beatTimelineRegistry";
import { scrollStoryProgressStore } from "./scrollStoryProgressStore";
import { waitForScrollStoryReady } from "@/lib/transition/waitForHeroIntro";

gsap.registerPlugin(ScrollTrigger);

let scrollStoryTimelineGeneration = 0;

type UseScrollStoryTimelineProps = {
  sectionRef: RefObject<HTMLElement | null>;
  stickyRef: RefObject<HTMLDivElement | null>;
};

async function waitForBeatTimelines(
  section: HTMLElement,
  expected: number,
): Promise<gsap.core.Timeline[]> {
  for (let attempt = 0; attempt < 60; attempt++) {
    const stages = section.querySelectorAll<SVGSVGElement>(
      ".scroll-story-beat-viz .scroll-svg-stage",
    );
    if (stages.length >= expected) {
      const timelines = [...stages].map((stage) => getBeatTimeline(stage));
      if (timelines.every((tl): tl is gsap.core.Timeline => Boolean(tl))) {
        return timelines;
      }
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }
  return [];
}

export function useScrollStoryTimeline({
  sectionRef,
  stickyRef,
}: UseScrollStoryTimelineProps) {
  useGSAP(
    () => {
      let disposed = false;
      let teardown: (() => void) | undefined;

      void waitForScrollStoryReady().then(async () => {
        if (disposed) return;

        const generation = ++scrollStoryTimelineGeneration;
        const section = sectionRef.current;
        const sticky = stickyRef.current;
        if (!section || !sticky) return;
        if (generation !== scrollStoryTimelineGeneration) return;

        const heroContent = section.querySelector<HTMLElement>(
          ".scroll-story-hero-content",
        );
        const image = section.querySelector<HTMLElement>(".scroll-story-image");
        const beatStage = section.querySelector<HTMLElement>(
          ".scroll-story-beats-visual",
        );
        const beatViz = STORY_BEATS.map((_, i) =>
          section.querySelector<HTMLElement>(`.scroll-story-beat-viz-${i}`),
        );
        const beats = STORY_BEATS.map((_, i) =>
          section.querySelector<HTMLElement>(`.scroll-story-beat-${i}`),
        );

        if (!heroContent || !image || !beatStage) return;

        const beatTimelines = await waitForBeatTimelines(
          section,
          STORY_BEATS.length,
        );
        if (disposed || generation !== scrollStoryTimelineGeneration) return;

        gsap.set(heroContent, { opacity: 1, y: 0, clearProps: "filter" });
        gsap.set(beatViz, { opacity: 0 });
        gsap.set(beatStage, { opacity: 0 });

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        beatTimelines.forEach((tl) => {
          tl.pause(0);
          if (prefersReducedMotion) {
            tl.progress(1);
          }
        });

        const revertBreakpoints = runWithScrollBreakpoints(({ isMobile }) => {
          const end = isMobile ? SCROLL_RUNWAY_MOBILE : SCROLL_RUNWAY_DESKTOP;
          const beatsStart = GRAPH_PHASE_START;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end,
              pin: sticky,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                scrollStoryProgressStore.setProgress(
                  self.progress,
                  self.isActive,
                );
              },
              onLeave: () => {
                scrollStoryProgressStore.setProgress(1, false);
              },
              onEnterBack: (self) => {
                scrollStoryProgressStore.setProgress(
                  self.progress,
                  self.isActive,
                );
              },
            },
            defaults: { duration: 1, ease: "none" },
          });

          tl.to(
            heroContent,
            { opacity: 0, y: -12, duration: HERO_FADE_END },
            0,
          );

          tl.to(image, { opacity: 0, duration: 0.08 }, beatsStart - 0.02);
          tl.fromTo(
            beatStage,
            { opacity: 0 },
            { opacity: 1, duration: 0.12 },
            beatsStart,
          );

          const beatFade = 0.14;
          const beatEnds = [
            ...BEAT_STARTS.slice(1),
            1,
          ] as number[];

          beats.forEach((beat, index) => {
            if (!beat) return;
            const start = BEAT_STARTS[index] ?? beatsStart;
            const next = beatEnds[index] ?? 1;
            const viz = beatViz[index];
            const beatTl = beatTimelines[index];

            tl.fromTo(
              beat,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: beatFade * 0.5 },
              start,
            );

            if (viz) {
              tl.fromTo(
                viz,
                { opacity: 0 },
                { opacity: 1, duration: beatFade * 0.45 },
                start,
              );
            }

            if (beatTl && !prefersReducedMotion) {
              // Scrub assemble animation across the beat's scroll window
              tl.fromTo(
                beatTl,
                { time: 0 },
                {
                  time: beatTl.duration(),
                  duration: Math.max(0.12, next - start - 0.04),
                  ease: "none",
                },
                start + 0.02,
              );
            } else if (beatTl && prefersReducedMotion) {
              beatTl.progress(1);
            }

            if (index < beats.length - 1) {
              tl.to(
                beat,
                { opacity: 0, y: -12, duration: beatFade * 0.5 },
                start + beatFade,
              );
              if (viz) {
                tl.to(
                  viz,
                  { opacity: 0, duration: beatFade * 0.45 },
                  next - 0.06,
                );
              }
            }
          });
        });

        scheduleScrollRefresh();

        teardown = () => {
          scrollStoryProgressStore.reset();
          revertBreakpoints();
        };
      });

      return () => {
        disposed = true;
        teardown?.();
      };
    },
    { scope: sectionRef, dependencies: [] },
  );
}
