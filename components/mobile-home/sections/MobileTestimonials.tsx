import Image from "next/image";
import { TESTIMONIALS } from "@/components/testimonials/constants";
import { MobileReveal } from "../MobileReveal";

export function MobileTestimonials() {
  return (
    <section
      id="testimonials"
      className="mobile-section"
      aria-labelledby="mobile-testimonials-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-testimonials-heading"
          className="mobile-section__headline"
        >
          Trusted by institutions{" "}
          <span className="text-ta-gold">globally</span>
        </h2>
      </MobileReveal>

      <div className="mobile-snap-row mt-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <MobileReveal key={testimonial.id} delay={index * 0.05}>
            <article className="mobile-card overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={testimonial.heroImage}
                  alt=""
                  fill
                  sizes="82vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <blockquote className="m-0 font-display text-lg leading-snug text-white">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="mobile-section__body mt-4 text-sm">
                  {testimonial.name}
                </p>
                <p className="mobile-section__body mt-1 text-xs">
                  {testimonial.role}
                </p>
              </div>
            </article>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
