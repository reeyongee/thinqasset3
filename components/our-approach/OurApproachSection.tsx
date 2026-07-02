"use client";

import { useRef } from "react";
import { APPROACH_STEPS } from "./constants";
import { ApproachStepStack } from "./ApproachStepStack";
import { OurApproachHeader } from "./OurApproachHeader";
import { useApproachAnimations } from "./useApproachAnimations";

export function OurApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useApproachAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="section-deferred-paint section-intrinsic-lg mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center px-4 py-32 min-[810px]:px-6"
      aria-labelledby="use-cases-heading"
    >
      <div className="flex w-full flex-col gap-6 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:gap-8">
        <div className="approach-header-col z-[1] flex w-full flex-col min-[1200px]:sticky min-[1200px]:top-6 min-[1200px]:max-w-[480px] min-[1200px]:flex-[1_0_0]">
          <OurApproachHeader />
        </div>

        <ApproachStepStack steps={APPROACH_STEPS} />
      </div>
    </section>
  );
}
