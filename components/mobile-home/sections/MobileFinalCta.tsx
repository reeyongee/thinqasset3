import { HeroButton } from "@/components/hero/HeroButton";
import {
  FINAL_CTA_COPY,
  FINAL_CTA_HREF,
} from "@/components/final-cta/constants";
import { MobileReveal } from "../MobileReveal";

type MobileFinalCtaProps = {
  className?: string;
  variant?: "centered" | "slug";
};

export function MobileFinalCta({
  className = "",
  variant = "centered",
}: MobileFinalCtaProps) {
  const isSlug = variant === "slug";

  return (
    <section
      id="final-cta"
      className={[
        isSlug ? "mobile-slug-final-cta-section" : "mobile-section pb-16",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="mobile-final-cta-heading"
    >
      <MobileReveal>
        <div
          className={[
            "mobile-card",
            isSlug
              ? "mobile-slug-final-cta__card"
              : "p-6 text-center",
          ].join(" ")}
        >
          <h2
            id="mobile-final-cta-heading"
            className={[
              isSlug
                ? "mobile-services-section__headline"
                : "mobile-section__headline text-[1.625rem]",
            ].join(" ")}
          >
            {FINAL_CTA_COPY.title}
          </h2>
          <p
            className={[
              isSlug
                ? "mobile-slug-body mobile-slug-final-cta__body"
                : "mobile-section__body mx-auto mt-3 max-w-[32ch] text-sm",
            ].join(" ")}
          >
            {FINAL_CTA_COPY.subtitle}
          </p>
          <div className={isSlug ? "mobile-slug-final-cta__action" : "mt-6"}>
            <HeroButton
              className="w-full"
              label={FINAL_CTA_COPY.button}
              href={FINAL_CTA_HREF}
            />
          </div>
        </div>
      </MobileReveal>
    </section>
  );
}
