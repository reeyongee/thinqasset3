"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useRef } from "react";
import {
  RIPE_PARALLAX_RATIO,
  RIPE_VISUAL_SCALE_END,
} from "./constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINE_SPRING = {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.05,
};

export function useRipeHeroMotion(
  scrollTargetRef?: RefObject<HTMLElement | null>,
) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const visual = visualRef.current;
      const visualInner = visualInnerRef.current;
      if (!section || !visual || !visualInner) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headlineLines = section.querySelectorAll(
        ".ripe-hero__headline [data-ripe-line]",
      );
      const bodyLines = section.querySelectorAll(
        ".ripe-hero__body [data-ripe-line]",
      );
      const appearTargets = section.querySelectorAll("[data-ripe-appear]");

      if (prefersReducedMotion) {
        gsap.set([visual, visualInner, headlineLines, bodyLines, appearTargets], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.set(visualInner, { scale: 1.5, transformOrigin: "50% 50%" });
      gsap.set(visual, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set([headlineLines, bodyLines], { opacity: 0.001, y: 24 });
      gsap.set(appearTargets, { opacity: 0.001, y: 24 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.to(visualInner, { scale: 1, duration: 10, ease: "power1.out" }, 0);
      intro.to(headlineLines, { ...LINE_SPRING }, 1);
      intro.to(bodyLines, { ...LINE_SPRING, stagger: 0.04 }, 1);
      intro.to(
        appearTargets,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
        },
        1.1,
      );

      const setSectionY = gsap.quickSetter(section, "y", "px");
      const onScroll = () => {
        setSectionY(window.scrollY * RIPE_PARALLAX_RATIO);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const scrollTriggers: ScrollTrigger[] = [];
      let cancelled = false;

      const mountScrollScale = () => {
        if (cancelled) return;

        const scrollTarget =
          scrollTargetRef?.current ??
          section
            .closest(".ripe-hero-lab")
            ?.querySelector<HTMLElement>("[data-ripe-scroll-target]") ??
          null;

        if (!scrollTarget) return;

        const scrollScale = gsap.fromTo(
          visual,
          { scale: 1 },
          {
            scale: RIPE_VISUAL_SCALE_END,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: scrollTarget,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        if (scrollScale.scrollTrigger) {
          scrollTriggers.push(scrollScale.scrollTrigger);
        }
        ScrollTrigger.refresh();
      };

      requestAnimationFrame(mountScrollScale);

      return () => {
        cancelled = true;
        window.removeEventListener("scroll", onScroll);
        scrollTriggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [scrollTargetRef] },
  );

  return { sectionRef, visualRef, visualInnerRef };
}
