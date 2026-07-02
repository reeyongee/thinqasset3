"use client";

import { useRef } from "react";
import { HeroButton } from "@/components/hero/HeroButton";
import type { UseCaseData } from "./constants";
import { useUseCaseCopyAnimation } from "./useUseCaseCopyAnimation";

type UseCaseCopyProps = {
  useCase: UseCaseData;
  panelId: string;
  labelledBy: string;
};

export function UseCaseCopy({ useCase, panelId, labelledBy }: UseCaseCopyProps) {
  const copyRef = useRef<HTMLDivElement>(null);
  useUseCaseCopyAnimation({ copyRef, useCaseId: useCase.id });

  return (
    <div
      ref={copyRef}
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className="use-case-copy flex flex-col justify-center gap-4"
    >
      <p className="m-0 font-[family-name:var(--font-inter)] text-sm font-normal leading-[16.8px] tracking-[-0.01em] text-token-muted">
        {useCase.title}
      </p>
      <p className="m-0 font-[family-name:var(--font-inter)] text-xl font-normal leading-[26px] tracking-[-0.02em] text-white [text-wrap:balance]">
        {useCase.description}
      </p>
      <HeroButton className="w-fit self-start" />
    </div>
  );
}
