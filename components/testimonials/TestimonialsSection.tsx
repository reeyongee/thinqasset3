"use client";

import { useRef } from "react";
import { TestimonialsHeader } from "./TestimonialsHeader";
import { TestimonialsPanel } from "./TestimonialsPanel";
import { useTestimonialsAnimations } from "./useTestimonialsAnimations";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useTestimonialsAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-deferred-paint section-intrinsic-lg mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-6 overflow-clip px-4 py-32 min-[810px]:px-6"
      aria-labelledby="testimonials-heading"
    >
      <TestimonialsHeader />
      <TestimonialsPanel />
    </section>
  );
}
