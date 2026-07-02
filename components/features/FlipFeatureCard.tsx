import type { FeatureData } from "./constants";
import { FeatureCardContent } from "./FeatureCardContent";
import { OptimusCardBack } from "./OptimusCardBack";
import { ExposureGauge } from "./visuals/ExposureGauge";
import { OrionOrbs } from "./visuals/OrionOrbs";
import { PortfolioDonut } from "./visuals/PortfolioDonut";

type FlipFeatureCardProps = {
  feature: FeatureData;
  index: number;
};

function FeatureVisual({ visual }: { visual: FeatureData["visual"] }) {
  switch (visual) {
    case "portfolio":
      return <PortfolioDonut />;
    case "orion":
      return <OrionOrbs />;
    case "exposure":
      return <ExposureGauge />;
  }
}

const Z_INDEX = ["z-30", "z-20", "z-10"] as const;

export function FlipFeatureCard({ feature, index }: FlipFeatureCardProps) {
  const zClass = Z_INDEX[index] ?? "";

  return (
    <div
      className={`feature-card-wrapper relative w-full will-change-transform ${zClass} ${
        index === 2
          ? "min-[810px]:max-[1199px]:col-span-2 min-[810px]:max-[1199px]:max-w-[375px] min-[810px]:max-[1199px]:justify-self-start"
          : ""
      }`}
      data-feature-index={index}
    >
      <div className="feature-flip-card h-[440px] w-full min-[810px]:h-[460px] min-[1200px]:w-[376px]">
        <div className="feature-flip-inner relative h-full w-full">
          <div className="feature-flip-back absolute inset-0 z-[2] overflow-hidden rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface">
            <OptimusCardBack />
          </div>

          <div className="feature-flip-front absolute inset-0 z-[1] flex flex-col overflow-hidden rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface">
            <div className="feature-card-visual relative min-h-0 flex-1 max-[809px]:h-[310px] max-[809px]:flex-none">
              <FeatureVisual visual={feature.visual} />
            </div>
            <FeatureCardContent feature={feature} />
          </div>
        </div>
      </div>
    </div>
  );
}
