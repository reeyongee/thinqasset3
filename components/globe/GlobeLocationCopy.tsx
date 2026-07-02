import type { GlobeLocation } from "./constants";
import { GLOBE_DEFAULT_COPY } from "./constants";

type GlobeLocationCopyProps = {
  activeLocation: GlobeLocation | null;
};

const bodyTextClass =
  "m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.5] tracking-[-0.02em] text-token-muted max-[809px]:text-sm max-[809px]:leading-[21px]";

export function GlobeLocationCopy({ activeLocation }: GlobeLocationCopyProps) {
  return (
    <div
      key={activeLocation?.id ?? "default"}
      className="globe-location-copy-inner flex h-full flex-col justify-between gap-8"
    >
      {activeLocation ? (
        <div className="flex flex-col gap-3">
          <p className="font-display globe-location-name m-0 text-xl leading-[1.3] tracking-[-0.4px] text-white">
            {activeLocation.name}
          </p>
          <p className={`globe-location-desc ${bodyTextClass}`}>
            {activeLocation.desc}
          </p>
        </div>
      ) : (
        <p className={bodyTextClass}>{GLOBE_DEFAULT_COPY}</p>
      )}
    </div>
  );
}
