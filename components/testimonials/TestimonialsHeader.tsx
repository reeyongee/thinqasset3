import { HeroButton } from "@/components/hero/HeroButton";
import { TestimonialsHeadline } from "./TestimonialsHeadline";

export function TestimonialsHeader() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between min-[810px]:gap-0">
      <TestimonialsHeadline />

      <div className="testimonials-cta w-full shrink-0 will-change-transform min-[810px]:w-auto">
        <HeroButton className="w-full min-[810px]:w-auto" />
      </div>
    </div>
  );
}
