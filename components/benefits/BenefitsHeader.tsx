import { HeroButton } from "@/components/hero/HeroButton";
import { BenefitsHeadline } from "./BenefitsHeadline";

export function BenefitsHeader() {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-6 min-[810px]:flex-row min-[810px]:items-center min-[810px]:gap-0">
      <BenefitsHeadline />

      <div className="benefits-cta w-full shrink-0 will-change-transform min-[810px]:w-auto">
        <HeroButton className="w-full min-[810px]:w-auto" />
      </div>
    </div>
  );
}
