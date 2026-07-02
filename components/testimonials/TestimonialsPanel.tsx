"use client";

import { useState } from "react";
import { TESTIMONIALS } from "./constants";
import { TestimonialImageStack } from "./TestimonialImageStack";
import { TestimonialQuote } from "./TestimonialQuote";
import { TestimonialThumbnails } from "./TestimonialThumbnails";

export function TestimonialsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <div className="testimonials-panel flex h-[640px] w-full flex-col gap-3 will-change-transform min-[810px]:h-[480px] min-[810px]:flex-row">
      <div className="order-0 flex h-[346px] shrink-0 flex-col items-start justify-center rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface p-8 min-[810px]:order-2 min-[810px]:h-auto min-[810px]:min-w-0 min-[810px]:flex-1 min-[810px]:justify-normal min-[810px]:p-10">
        <TestimonialQuote
          testimonial={activeTestimonial}
          activeIndex={activeIndex}
        />
      </div>

      <div className="relative order-1 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-token-surface/50 backdrop-blur-sm min-[810px]:order-1 min-[810px]:flex-[2]">
        <TestimonialImageStack activeIndex={activeIndex} />
        <TestimonialThumbnails
          testimonials={TESTIMONIALS}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}
