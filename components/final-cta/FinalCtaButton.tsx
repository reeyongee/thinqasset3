import { HeroButton } from "@/components/hero/HeroButton";
import { FINAL_CTA_COPY, FINAL_CTA_HREF } from "./constants";

export function FinalCtaButton() {
  return (
    <HeroButton
      href={FINAL_CTA_HREF}
      label={FINAL_CTA_COPY.button}
      className="relative z-[1]"
    />
  );
}
