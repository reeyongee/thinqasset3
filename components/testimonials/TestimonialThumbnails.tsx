"use client";

import Image from "next/image";
import type { TestimonialData } from "./constants";

type TestimonialThumbnailsProps = {
  testimonials: TestimonialData[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function TestimonialThumbnails({
  testimonials,
  activeIndex,
  onSelect,
}: TestimonialThumbnailsProps) {
  return (
    <div
      className="absolute bottom-6 left-6 flex w-[320px] flex-row gap-2.5 min-[810px]:left-6 min-[810px]:w-[320px] max-[809px]:left-1/2 max-[809px]:w-[90%] max-[809px]:-translate-x-1/2 max-[809px]:gap-2"
      role="tablist"
      aria-label="Testimonial slides"
    >
      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={testimonial.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={testimonial.name}
            onClick={() => onSelect(index)}
            className={[
              "testimonial-thumb group relative h-20 shrink-0 cursor-pointer overflow-hidden rounded border border-[color:var(--token-btn-border)] bg-token-surface transition-[opacity,transform,border-color] duration-[400ms] ease-[cubic-bezier(0.12,0.23,0.5,1)] min-[810px]:w-[100px] max-[809px]:min-w-0 max-[809px]:flex-1",
              isActive ? "testimonial-thumb--active" : "",
            ].join(" ")}
          >
            <Image
              src={testimonial.thumbImage}
              alt=""
              fill
              className={[
                "object-cover object-center transition-opacity duration-[400ms] ease-[cubic-bezier(0.12,0.23,0.5,1)]",
                isActive
                  ? "opacity-100"
                  : "opacity-[0.35] group-hover:opacity-100",
              ].join(" ")}
              sizes="100px"
            />
          </button>
        );
      })}
    </div>
  );
}
