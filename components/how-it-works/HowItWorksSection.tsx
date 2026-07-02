"use client";

import { useRef } from "react";
import { HeroButton } from "@/components/hero/HeroButton";
import { STEPS } from "./constants";
import { HowItWorksHeadline } from "./HowItWorksHeadline";
import { StepCard } from "./StepCard";
import { useHowItWorksAnimations } from "./useHowItWorksAnimations";

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useHowItWorksAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="hiw-section section-deferred-paint section-intrinsic-lg mx-auto w-full max-w-[1200px] scroll-mt-10 rounded-none px-4 py-24 max-[809px]:rounded-[40px] min-[810px]:px-6"
      aria-labelledby="how-it-works-heading"
    >
      <div className="flex w-full flex-col gap-10 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:gap-10">
        <div className="hiw-text-col sticky z-[1] flex w-full flex-col gap-6 min-[1200px]:max-w-[480px] min-[1200px]:flex-[1_0_0] min-[1200px]:pb-16">
          <HowItWorksHeadline />
          <HeroButton className="w-fit self-start" />
        </div>

        <div className="hiw-steps flex w-full flex-[1_0_0] flex-col gap-12">
          {STEPS.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
