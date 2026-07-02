import type { FeatureData } from "./constants";
import { FeatureIcon } from "./FeatureIcons";

type FeatureCardContentProps = {
  feature: FeatureData;
};

export function FeatureCardContent({ feature }: FeatureCardContentProps) {
  return (
    <div className="feature-card-footer flex flex-none flex-col gap-2 p-5">
      <div className="flex items-start gap-2">
        <span className="feature-card-icon shrink-0 text-white">
          <FeatureIcon name={feature.icon} />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="m-0 min-h-6 font-[family-name:var(--font-inter)] text-base font-medium leading-6 tracking-[-0.01em] text-white">
            {feature.title}
          </p>
          <p className="m-0 min-h-[calc(3*0.875rem*1.2)] font-[family-name:var(--font-inter)] text-sm font-normal leading-[1.2] tracking-[-0.01em] text-token-muted">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
