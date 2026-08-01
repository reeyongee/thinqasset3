import Image from "next/image";
import type { ServiceCarouselSlide } from "@/components/services/constants";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";

type MobileSlugCarouselProps = {
  headline: string;
  slides: readonly ServiceCarouselSlide[];
};

export function MobileSlugCarousel({
  headline,
  slides,
}: MobileSlugCarouselProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-slug-carousel-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-slug-carousel-heading"
          className="mobile-services-section__headline"
        >
          {headline}
        </h2>
      </MobileReveal>

      <div className="mobile-slug-carousel">
        {slides.map((slide, index) => (
          <MobileReveal key={slide.href} delay={index * 0.04}>
            <TransitionLink
              href={slide.href}
              className="mobile-slug-carousel__card mobile-slug-card mobile-pressable"
            >
              <div className="mobile-slug-carousel__media">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="82vw"
                  className="object-cover"
                />
              </div>
              <div className="mobile-slug-carousel__body">
                <h3 className="mobile-slug-carousel__title">{slide.title}</h3>
                <p className="mobile-slug-carousel__desc">{slide.description}</p>
              </div>
            </TransitionLink>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
