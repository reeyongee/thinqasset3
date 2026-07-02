"use client";

import { useRef } from "react";
import { BENEFIT_ROWS } from "./constants";
import { BenefitsHeader } from "./BenefitsHeader";
import { BenefitsRow } from "./BenefitsRow";
import { useBenefitsAnimations } from "./useBenefitsAnimations";

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useBenefitsAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="section-deferred-paint section-intrinsic-md mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-6 px-4 py-32 min-[810px]:px-6"
      aria-labelledby="benefits-heading"
    >
      <BenefitsHeader />

      <div className="flex w-full flex-col gap-3">
        {BENEFIT_ROWS.map((row, rowIndex) => (
          <BenefitsRow key={rowIndex} benefits={row} />
        ))}
      </div>
    </section>
  );
}
