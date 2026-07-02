"use client";

import { useRef, useState } from "react";
import { USE_CASES } from "./constants";
import { UseCasePanel } from "./UseCasePanel";
import { UseCasesHeadline } from "./UseCasesHeadline";
import { UseCasesMobileSlideshow } from "./UseCasesMobileSlideshow";
import { useUseCasesAnimations } from "./useUseCasesAnimations";

export function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useUseCasesAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-6 overflow-hidden px-4 py-32 min-[810px]:px-6"
      aria-labelledby="use-cases-heading"
    >
      <UseCasesHeadline />

      <UseCasePanel
        cases={USE_CASES}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      <UseCasesMobileSlideshow cases={USE_CASES} />
    </section>
  );
}
