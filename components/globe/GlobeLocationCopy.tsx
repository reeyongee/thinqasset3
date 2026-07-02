import type { GlobeLocation } from "./constants";
import { GLOBE_DEFAULT_BODY, GLOBE_INSTRUCTION } from "./constants";

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
        <>
          <div className="flex flex-col gap-3">
            <p className="m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.02em] text-white max-[809px]:text-sm max-[809px]:leading-[21px]">
              {GLOBE_INSTRUCTION}
            </p>
            <p className={bodyTextClass}>{GLOBE_DEFAULT_BODY}</p>
          </div>
          <p className="m-0 font-[family-name:var(--font-inter)] text-sm leading-[1.2] text-token-muted">
            Click a pin to explore
          </p>
        </>
      )}
    </div>
  );
}
