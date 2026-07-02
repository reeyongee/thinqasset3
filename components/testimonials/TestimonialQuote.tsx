"use client";

import { useRef } from "react";
import type { TestimonialData } from "./constants";
import { useTestimonialQuoteAnimation } from "./useTestimonialQuoteAnimation";

type TestimonialQuoteProps = {
  testimonial: TestimonialData;
  activeIndex: number;
};

export function TestimonialQuote({
  testimonial,
  activeIndex,
}: TestimonialQuoteProps) {
  const quoteRef = useRef<HTMLDivElement>(null);
  useTestimonialQuoteAnimation({ quoteRef, activeIndex });

  return (
    <div
      ref={quoteRef}
      className="flex h-full flex-col justify-between"
      role="tabpanel"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <h3 className="font-display testimonial-quote-text m-0 text-left text-2xl leading-[31.2px] tracking-[-0.72px] text-white [text-wrap:balance]">
        {testimonial.quote}
      </h3>

      <div className="testimonial-author-block flex flex-col gap-1">
        <p className="m-0 font-[family-name:var(--font-inter)] text-base leading-[1.4] text-white">
          {testimonial.name}
        </p>
        <p className="m-0 font-[family-name:var(--font-inter)] text-sm leading-[1.2] text-token-muted">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}
