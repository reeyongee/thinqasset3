import Image from "next/image";
import {
  BENEFIT_ROWS,
  BENEFITS_HEADLINE_LINE1,
  BENEFITS_HEADLINE_LINE2,
} from "@/components/benefits/constants";
import { MobileReveal } from "../MobileReveal";

const ALL_BENEFITS = BENEFIT_ROWS.flat();

export function MobileBenefits() {
  return (
    <section
      id="benefits"
      className="mobile-section"
      aria-labelledby="mobile-benefits-heading"
    >
      <MobileReveal>
        <h2 id="mobile-benefits-heading" className="mobile-section__headline">
          {BENEFITS_HEADLINE_LINE1}
          <span className="block text-ta-gold">{BENEFITS_HEADLINE_LINE2}</span>
        </h2>
      </MobileReveal>

      <div className="mobile-snap-row mt-6">
        {ALL_BENEFITS.map((benefit, index) => (
          <MobileReveal key={benefit.id} delay={index * 0.04}>
            <article className="mobile-card overflow-hidden">
              <div className="relative h-36 w-full">
                <Image
                  src={benefit.image}
                  alt={benefit.imageAlt}
                  fill
                  sizes="82vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="m-0 font-display text-xl leading-tight text-white">
                  {benefit.title}
                </h3>
                <p className="mobile-section__body mt-2 text-sm">
                  {benefit.description}
                </p>
              </div>
            </article>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
