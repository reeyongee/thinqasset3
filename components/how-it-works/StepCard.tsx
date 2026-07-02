import type { StepData } from "./constants";

type StepCardProps = {
  step: StepData;
  index: number;
};

export function StepCard({ step, index }: StepCardProps) {
  const scrollClass =
    index === 0
      ? "hiw-step-card hiw-step-card--scroll-1"
      : index === 1
        ? "hiw-step-card hiw-step-card--scroll-2"
        : "hiw-step-card";

  return (
    <article
      id={step.id}
      className={`${scrollClass} sticky z-[1] flex w-full flex-col items-start justify-start gap-6 overflow-hidden rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface max-[809px]:flex-col min-[810px]:flex-row min-[810px]:items-center min-[810px]:gap-6`}
      data-step-index={index}
    >
      <div className="hiw-step-number-wrap flex shrink-0 flex-col items-end justify-end gap-2.5 max-[809px]:w-min max-[809px]:justify-center min-[810px]:h-[189px] min-[810px]:w-[158px]">
        <p className="m-0 font-[family-name:var(--font-geist-mono)] text-[172px] font-normal leading-[1.1] tracking-[-0.04em] text-token-muted">
          {step.number}
        </p>
      </div>

      <div className="flex w-full flex-none flex-col justify-center p-6 min-[810px]:min-h-[189px] min-[810px]:flex-1 min-[810px]:self-stretch">
        <div className="flex flex-col gap-2.5">
          <p className="m-0 font-[family-name:var(--font-inter)] text-xl font-normal leading-[26px] tracking-[-0.02em] text-white">
            {step.title}
          </p>
          <p className="m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.02em] text-token-muted [text-wrap:balance]">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}
