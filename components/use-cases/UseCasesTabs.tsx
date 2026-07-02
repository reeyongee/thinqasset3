import type { UseCaseData } from "./constants";

type UseCasesTabsProps = {
  cases: UseCaseData[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function UseCasesTabs({
  cases,
  activeIndex,
  onSelect,
}: UseCasesTabsProps) {
  return (
    <div
      className="flex flex-row flex-wrap items-center justify-center gap-2.5 overflow-hidden"
      role="tablist"
      aria-label="Investor use cases"
    >
      {cases.map((useCase, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={useCase.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`use-case-panel-${useCase.id}`}
            id={`use-case-tab-${useCase.id}`}
            onClick={() => onSelect(index)}
            className={[
              "use-case-tab shrink-0 cursor-pointer rounded-lg px-4 py-3 font-[family-name:var(--font-inter)] text-sm font-normal leading-[16.8px] tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ease-[cubic-bezier(0.12,0.23,0.5,1)]",
              isActive
                ? "bg-token-surface text-ta-gold"
                : "bg-transparent text-token-muted hover:bg-token-surface hover:text-ta-gold",
            ].join(" ")}
          >
            {useCase.tabLabel}
          </button>
        );
      })}
    </div>
  );
}
