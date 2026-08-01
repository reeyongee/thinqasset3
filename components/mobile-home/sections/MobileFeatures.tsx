import { FEATURES } from "@/components/features/constants";
import { MobileReveal } from "../MobileReveal";

export function MobileFeatures() {
  return (
    <section
      id="features"
      className="mobile-section"
      aria-labelledby="mobile-features-heading"
    >
      <MobileReveal>
        <h2 id="mobile-features-heading" className="mobile-section__headline">
          Our Philosophy{" "}
          <span className="text-ta-gold">built on conviction</span>
        </h2>
      </MobileReveal>

      <div className="mt-6 flex flex-col gap-3">
        {FEATURES.map((feature, index) => (
          <MobileReveal key={feature.id} delay={index * 0.05}>
            <article className="mobile-card p-4">
              <h3 className="m-0 font-display text-xl leading-tight text-white">
                {feature.title}
              </h3>
              <p className="mobile-section__body mt-2 text-sm">
                {feature.description}
              </p>
            </article>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
