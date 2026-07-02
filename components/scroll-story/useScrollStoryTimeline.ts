"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  runWithScrollBreakpoints,
  scheduleScrollRefresh,
} from "@/lib/scroll/scrollOrchestrator";
import {
  BEAT_STARTS,
  GRAPH_CANDLE_GROW_DURATION,
  GRAPH_FRAME_FADE_DURATION,
  GRAPH_PHASE_DURATION,
  GRAPH_PHASE_START,
  GRAPH_POV_END_DESKTOP,
  GRAPH_POV_END_MOBILE,
  GRAPH_POV_START,
  HERO_FADE_END,
  SCROLL_RUNWAY_DESKTOP,
  SCROLL_RUNWAY_MOBILE,
  STORY_BEATS,
} from "./constants";
import { GRAPH_CHART_BASELINE_Y } from "./graphChartData";
import { getPathProgressForX } from "./graphPathUtils";
import { scrollStoryProgressStore } from "./scrollStoryProgressStore";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type UseScrollStoryTimelineProps = {
  sectionRef: RefObject<HTMLElement | null>;
  stickyRef: RefObject<HTMLDivElement | null>;
};

export function useScrollStoryTimeline({
  sectionRef,
  stickyRef,
}: UseScrollStoryTimelineProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;

      const heroContent = section.querySelector<HTMLElement>(
        ".scroll-story-hero-content",
      );
      const image = section.querySelector<HTMLElement>(".scroll-story-image");
      const graph = section.querySelector<HTMLElement>(".scroll-story-graph");
      const path = section.querySelector<SVGPathElement>(".scroll-story-path");
      const pathGhost = section.querySelector<SVGPathElement>(
        ".scroll-story-path-ghost",
      );
      const focalPoint = section.querySelector<SVGCircleElement>(
        ".scroll-story-focal-point",
      );
      const povPan = section.querySelector<SVGGElement>(
        ".scroll-story-pov-pan",
      );
      const povScale = section.querySelector<SVGGElement>(
        ".scroll-story-pov-scale",
      );
      const dots = section.querySelectorAll<SVGCircleElement>(
        ".scroll-story-dots circle",
      );
      const chartFrame = section.querySelector<SVGGElement>(
        ".scroll-story-chart-frame",
      );
      const candles = section.querySelectorAll<SVGGElement>(
        ".scroll-story-candle",
      );
      const beats = STORY_BEATS.map((_, i) =>
        section.querySelector<HTMLElement>(`.scroll-story-beat-${i}`),
      );

      if (
        !heroContent ||
        !image ||
        !graph ||
        !path ||
        !focalPoint ||
        !povPan ||
        !povScale
      ) {
        return;
      }

      const pathLength = path.getTotalLength();
      const drawPaths = pathGhost ? [path, pathGhost] : [path];
      gsap.set(drawPaths, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.set(dots, { attr: { r: "0" } });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (chartFrame) {
        gsap.set(chartFrame, { opacity: prefersReducedMotion ? 1 : 0 });
      }

      candles.forEach((candle) => {
        const x = candle.getAttribute("data-candle-x") ?? "0";
        const origin = `${x}px ${GRAPH_CHART_BASELINE_Y}px`;
        gsap.set(candle, {
          scaleY: prefersReducedMotion ? 1 : 0.001,
          transformOrigin: origin,
          svgOrigin: origin,
        });
      });

      gsap.set(povScale, {
        transformOrigin: "0px 0px",
        ...GRAPH_POV_START,
      });

      const xTo = gsap.quickTo(povPan, "x", { duration: 0.3 });
      const yTo = gsap.quickTo(povPan, "y", { duration: 0.3 });

      const syncPan = () => {
        xTo(-(gsap.getProperty(focalPoint, "x") as number));
        yTo(-(gsap.getProperty(focalPoint, "y") as number));
      };

      gsap.set(povPan, {
        x: -(gsap.getProperty(focalPoint, "x") as number),
        y: -(gsap.getProperty(focalPoint, "y") as number),
      });

      const revertBreakpoints = runWithScrollBreakpoints(({ isMobile }) => {
        const end = isMobile ? SCROLL_RUNWAY_MOBILE : SCROLL_RUNWAY_DESKTOP;
        const graphDur = GRAPH_PHASE_DURATION;
        const graphStart = GRAPH_PHASE_START;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            pin: sticky,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              scrollStoryProgressStore.setProgress(self.progress, self.isActive);
            },
            onLeave: () => {
              scrollStoryProgressStore.setProgress(1, false);
            },
            onEnterBack: (self) => {
              scrollStoryProgressStore.setProgress(self.progress, self.isActive);
            },
          },
          defaults: { duration: 1, ease: "none" },
          onUpdate: syncPan,
        });

        tl.to(
          heroContent,
          { opacity: 0, y: -12, duration: HERO_FADE_END },
          0,
        );

        tl.to(image, { opacity: 0, duration: 0.08 }, graphStart - 0.02);
        tl.fromTo(
          graph,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          graphStart,
        );

        if (chartFrame) {
          tl.to(
            chartFrame,
            { opacity: 1, duration: GRAPH_FRAME_FADE_DURATION },
            graphStart - 0.02,
          );
        }

        if (candles.length > 0 && !prefersReducedMotion) {
          candles.forEach((candle) => {
            const x = Number(candle.getAttribute("data-candle-x") ?? 0);
            const pathProgress = getPathProgressForX(path, x);

            tl.to(
              candle,
              {
                scaleY: 1,
                duration: GRAPH_CANDLE_GROW_DURATION,
                ease: "power2.out",
              },
              graphStart + pathProgress * graphDur,
            );
          });
        }

        tl.to(
          drawPaths,
          { strokeDashoffset: 0, duration: graphDur },
          graphStart,
        );

        tl.to(
          focalPoint,
          {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            immediateRender: true,
            duration: graphDur,
          },
          graphStart,
        );

        dots.forEach((dot) => {
          const x = Number(dot.getAttribute("cx") ?? 0);
          const pathProgress = getPathProgressForX(path, x);

          tl.to(
            dot,
            { attr: { r: "1.5" }, duration: 0.03, ease: "power2.out" },
            graphStart + pathProgress * graphDur,
          );
        });

        if (isMobile) {
          tl.fromTo(
            povScale,
            { ...GRAPH_POV_START, scale: 1.6 },
            { ...GRAPH_POV_END_MOBILE, duration: graphDur },
            graphStart,
          );
        } else {
          tl.fromTo(
            povScale,
            { ...GRAPH_POV_START },
            {
              ...GRAPH_POV_END_DESKTOP,
              ease: "expo.inOut",
              duration: graphDur,
            },
            graphStart,
          );
        }

        const beatFade = 0.14;

        beats.forEach((beat, index) => {
          if (!beat) return;

          const start = BEAT_STARTS[index] ?? graphStart;

          tl.fromTo(
            beat,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: beatFade * 0.5 },
            start,
          );

          if (index < beats.length - 1) {
            tl.to(
              beat,
              { opacity: 0, y: -12, duration: beatFade * 0.5 },
              start + beatFade,
            );
          }
        });
      });

      scheduleScrollRefresh();

      return () => {
        scrollStoryProgressStore.reset();
        revertBreakpoints();
      };
    },
    { scope: sectionRef, dependencies: [] },
  );
}
