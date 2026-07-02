import type { UseCaseData } from "./constants";
import { UseCaseCopy } from "./UseCaseCopy";
import { UseCaseImageStack } from "./UseCaseImageStack";
import { UseCasesTabs } from "./UseCasesTabs";

type UseCasePanelProps = {
  cases: UseCaseData[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function UseCasePanel({
  cases,
  activeIndex,
  onSelect,
}: UseCasePanelProps) {
  const activeCase = cases[activeIndex];

  return (
    <div className="use-cases-panel hidden w-full flex-col gap-6 opacity-0 will-change-transform min-[810px]:flex">
      <UseCasesTabs
        cases={cases}
        activeIndex={activeIndex}
        onSelect={onSelect}
      />

      <div className="flex w-full flex-col items-center gap-6 min-[810px]:flex-row">
        <div className="w-full min-[810px]:flex-[3]">
          <UseCaseImageStack activeIndex={activeIndex} />
        </div>

        <div className="w-full min-[810px]:flex-[2]">
          <UseCaseCopy
            useCase={activeCase}
            panelId={`use-case-panel-${activeCase.id}`}
            labelledBy={`use-case-tab-${activeCase.id}`}
          />
        </div>
      </div>
    </div>
  );
}
