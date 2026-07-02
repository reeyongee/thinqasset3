import type { TrustItemData } from "./constants";
import { TrustIcon } from "./TrustIcons";

type TrustItemProps = {
  item: TrustItemData;
};

export function TrustItem({ item }: TrustItemProps) {
  return (
    <div className="numbers-trust-item flex w-full flex-col gap-1 opacity-0">
      <div className="flex w-full items-center gap-2">
        <span className="shrink-0 text-white">
          <TrustIcon name={item.icon} />
        </span>
        <p className="m-0 flex-1 font-[family-name:var(--font-inter)] text-base font-medium leading-6 tracking-[-0.02em] text-white">
          {item.title}
        </p>
      </div>
      <p className="m-0 w-full font-[family-name:var(--font-inter)] text-sm leading-[1.2] tracking-[-0.01em] text-token-muted">
        {item.subtitle}
      </p>
    </div>
  );
}
