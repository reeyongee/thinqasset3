"use client";

import type { RefObject } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const APPEAR_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";

type UseTestimonialQuoteAnimationProps = {
  quoteRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
};

export function useTestimonialQuoteAnimation({
  quoteRef,
  activeIndex,
}: UseTestimonialQuoteAnimationProps) {
  const isInitialMount = useRef(true);

  useGSAP(
    () => {
      const root = quoteRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const quote = root.querySelector<HTMLElement>(".testimonial-quote-text");
      const author = root.querySelector<HTMLElement>(".testimonial-author-block");

      if (reducedMotion) {
        gsap.set([quote, author].filter(Boolean), { opacity: 1, y: 0 });
        return;
      }

      if (isInitialMount.current) {
        isInitialMount.current = false;
        gsap.set([quote, author].filter(Boolean), { opacity: 1, y: 0 });
        return;
      }

      const targets = [quote, author].filter(Boolean) as HTMLElement[];

      gsap.fromTo(
        targets,
        { opacity: 0.001, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: APPEAR_EASE,
          stagger: 0.2,
          delay: 0.2,
        },
      );
    },
    { scope: quoteRef, dependencies: [activeIndex] },
  );
}
