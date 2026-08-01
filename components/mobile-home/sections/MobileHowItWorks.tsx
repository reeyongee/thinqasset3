import { STEPS } from "@/components/how-it-works/constants";
import { MobileReveal } from "../MobileReveal";

export function MobileHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mobile-section"
      aria-labelledby="mobile-hiw-heading"
    >
      <MobileReveal>
        <h2 id="mobile-hiw-heading" className="mobile-section__headline">
          From mandate to launch,{" "}
          <span className="text-ta-gold">with discipline</span>
        </h2>
      </MobileReveal>

      <div className="mobile-timeline mt-8">
        {STEPS.map((step, index) => (
          <MobileReveal key={step.id} delay={index * 0.05}>
            <div className="mobile-timeline__item">
              <div className="mobile-timeline__dot">{step.number}</div>
              <div>
                <h3 className="m-0 font-[family-name:var(--font-inter)] text-base font-medium text-white">
                  {step.title}
                </h3>
                <p className="mobile-section__body mt-2 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
