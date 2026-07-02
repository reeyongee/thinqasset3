"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ApproachStep } from "./constants";
import { useApproachStepBodyAnimation } from "./useApproachStepBodyAnimation";

type ApproachStepCardProps = {
  step: ApproachStep;
  index: number;
  isOpen: boolean;
  isDefaultOpen: boolean;
  onSelect: (index: number) => void;
};

export function ApproachStepCard({
  step,
  index,
  isOpen,
  isDefaultOpen,
  onSelect,
}: ApproachStepCardProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useApproachStepBodyAnimation({
    bodyRef,
    imageRef,
    isOpen,
    isDefaultOpen,
  });

  return (
    <button
      type="button"
      className={[
        "approach-step-card w-full cursor-pointer border border-solid text-left transition-[border-radius,background-color,min-height,border-color] duration-500 ease-[cubic-bezier(0.12,0.23,0.17,0.99)]",
        isOpen
          ? "min-h-[473px] overflow-hidden rounded-2xl border-[color:var(--token-btn-border)] bg-token-surface min-[1200px]:min-h-[411px] min-[1200px]:rounded-[32px]"
          : "flex min-h-[73px] items-center overflow-hidden rounded-[80px] border-[color:var(--token-btn-border)] bg-[var(--token-btn-bg)] px-6 py-6 hover:bg-[var(--token-btn-bg-hover)] min-[1200px]:min-h-[76px]",
      ].join(" ")}
      aria-expanded={isOpen}
      aria-controls={`approach-panel-${step.id}`}
      id={`approach-tab-${step.id}`}
      onClick={() => onSelect(index)}
    >
      {isOpen ? (
        <div className="approach-step-open relative min-h-[473px] w-full min-[1200px]:min-h-[411px]">
          <div ref={imageRef} className="approach-step-media" aria-hidden>
            <Image
              src={step.image}
              alt=""
              fill
              sizes="(min-width: 1200px) 720px, 100vw"
              className="approach-step-image"
            />
            <div className="approach-step-media-overlay" />
          </div>

          <div className="approach-step-scrim" aria-hidden />

          <div className="relative z-[2] flex min-h-[473px] w-full flex-col px-6 py-6 min-[1200px]:min-h-[411px] min-[1200px]:max-w-[min(100%,420px)] min-[1200px]:px-8 min-[1200px]:py-6">
            <div
              ref={bodyRef}
              id={`approach-panel-${step.id}`}
              role="region"
              aria-labelledby={`approach-tab-${step.id}`}
              className="approach-step-body flex min-h-[220px] flex-1 flex-col justify-between gap-6 min-[1200px]:min-h-[320px] min-[1200px]:gap-0"
            >
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-[family-name:var(--font-inter)] text-xl font-normal leading-[25px] tracking-[-0.02em] text-white min-[1200px]:text-[22px] min-[1200px]:leading-[27.5px] min-[1200px]:tracking-[-0.44px]">
                  {step.title}
                </h3>
                <p className="m-0 font-[family-name:var(--font-inter)] text-sm font-normal leading-[21px] tracking-[-0.02em] text-token-muted min-[1200px]:text-base min-[1200px]:leading-6">
                  {step.description}
                </p>
              </div>

              <p className="hiw-step-number-wrap m-0 font-[family-name:var(--font-geist-mono)] text-[34px] font-normal leading-[39px] tracking-[-0.04em] text-token-muted min-[1200px]:text-[60px] min-[1200px]:leading-[69px]">
                {step.number}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="m-0 w-full px-6 font-[family-name:var(--font-inter)] text-xl font-normal leading-[25px] tracking-[-0.02em] text-white min-[1200px]:text-[22px] min-[1200px]:leading-[27.5px]">
          {step.title}
        </h3>
      )}
    </button>
  );
}
