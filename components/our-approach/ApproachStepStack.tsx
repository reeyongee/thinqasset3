"use client";

import { useState } from "react";
import type { ApproachStep } from "./constants";
import { ApproachStepCard } from "./ApproachStepCard";

type ApproachStepStackProps = {
  steps: ApproachStep[];
};

export function ApproachStepStack({ steps }: ApproachStepStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="approach-accordion flex w-full flex-1 flex-col gap-4 will-change-transform"
      role="tablist"
      aria-label="Investing journey steps"
    >
      {steps.map((step, index) => (
        <ApproachStepCard
          key={step.id}
          step={step}
          index={index}
          isOpen={activeIndex === index}
          isDefaultOpen={index === 0}
          onSelect={setActiveIndex}
        />
      ))}
    </div>
  );
}
