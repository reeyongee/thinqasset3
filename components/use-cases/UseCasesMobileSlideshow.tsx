"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UseCaseData } from "./constants";
import { UseCaseMobileCard } from "./UseCaseMobileCard";

type UseCasesMobileSlideshowProps = {
  cases: UseCaseData[];
};

export function UseCasesMobileSlideshow({ cases }: UseCasesMobileSlideshowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;

    const slideWidth = el.firstElementChild.clientWidth;
    const gap = 10;
    const index = Math.round(el.scrollLeft / (slideWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), cases.length - 1));
  }, [cases.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;

    const slideWidth = el.firstElementChild.clientWidth;
    el.scrollTo({ left: index * (slideWidth + 10), behavior: "smooth" });
  };

  return (
    <div className="use-cases-mobile flex min-[810px]:hidden w-full flex-col gap-2.5 opacity-0 will-change-transform">
      <div
        ref={scrollRef}
        className="use-cases-mobile-track flex h-[500px] w-full snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((useCase) => (
          <UseCaseMobileCard key={useCase.id} useCase={useCase} />
        ))}
      </div>

      <div
        className="flex items-center justify-center gap-2.5 pt-2"
        role="tablist"
        aria-label="Use case slides"
      >
        {cases.map((useCase, index) => (
          <button
            key={useCase.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={useCase.tabLabel}
            onClick={() => scrollToIndex(index)}
            className={[
              "h-2.5 w-2.5 rounded-full transition-opacity duration-200",
              index === activeIndex ? "bg-ta-gold opacity-100" : "bg-ta-grey-muted opacity-50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
