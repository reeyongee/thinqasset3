"use client";

import { useRef } from "react";
import { NumbersHeadline } from "./NumbersHeadline";
import { StatCard } from "./StatCard";
import { TrustBar } from "./TrustBar";
import { STATS } from "./constants";
import { useNumbersAnimations } from "./useNumbersAnimations";

export function NumbersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useNumbersAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      data-numbers-section
      className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center px-4 py-24 min-[810px]:px-6"
      aria-labelledby="numbers-heading"
    >
      <div className="flex w-full flex-col gap-6 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:gap-6">
        <div className="flex w-full flex-1 flex-col gap-6 min-[810px]:gap-10 min-[1200px]:min-h-[488px] min-[1200px]:justify-between min-[1200px]:gap-0">
          <NumbersHeadline />
          <TrustBar />
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-2 min-[810px]:grid-cols-2">
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
