"use client";

import { useRef } from "react";
import { FinalCtaButton } from "./FinalCtaButton";
import { FinalCtaHeadline } from "./FinalCtaHeadline";
import { FinalCtaWheel } from "./FinalCtaWheel";
import { useFinalCtaAnimations } from "./useFinalCtaAnimations";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  useFinalCtaAnimations({ sectionRef, rotatorRef });

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="final-cta-section section-intrinsic-xl relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 overflow-hidden pb-24 pt-[320px]"
    >
      <FinalCtaWheel rotatorRef={rotatorRef} />

      <FinalCtaHeadline />

      <FinalCtaButton />
    </section>
  );
}
