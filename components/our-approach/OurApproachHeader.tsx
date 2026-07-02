import { HeroButton } from "@/components/hero/HeroButton";
import { APPROACH_BODY } from "./constants";
import { OurApproachHeadline } from "./OurApproachHeadline";

export function OurApproachHeader() {
  return (
    <div className="flex w-full flex-col gap-6 min-[810px]:gap-6">
      <div className="flex flex-col gap-2 max-[809px]:gap-2">
        <OurApproachHeadline />
        <p className="m-0 max-w-[480px] font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.02em] text-token-muted max-[809px]:text-sm max-[809px]:leading-[21px]">
          {APPROACH_BODY}
        </p>
      </div>

      <div className="approach-cta w-full shrink-0 will-change-transform min-[810px]:w-auto">
        <HeroButton className="w-full min-[810px]:w-auto" />
      </div>
    </div>
  );
}
