"use client";

import { useEffect, useRef, useState } from "react";
import type { BenefitData } from "./constants";
import { BenefitCard } from "./BenefitCard";

type BenefitsRowProps = {
  benefits: BenefitData[];
};

export function BenefitsRow({ benefits }: BenefitsRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    const clearActive = () => setActiveId(null);

    const handlePointerDown = (event: PointerEvent) => {
      if (!row.contains(event.target as Node)) {
        clearActive();
      }
    };

    window.addEventListener("scroll", clearActive, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("scroll", clearActive);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="benefits-row flex w-full flex-col gap-3 min-[810px]:flex-row"
    >
      {benefits.map((benefit) => (
        <BenefitCard
          key={benefit.id}
          benefit={benefit}
          isActive={activeId === benefit.id}
          onActivate={() =>
            setActiveId((current) =>
              current === benefit.id ? null : benefit.id,
            )
          }
        />
      ))}
    </div>
  );
}
