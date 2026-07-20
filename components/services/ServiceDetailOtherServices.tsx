"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { OfferingIcon } from "./OfferingIcon";
import { useServiceDetailOtherServicesAnimation } from "./useServiceDetailOtherServicesAnimation";

export type ServiceDetailOtherServicesSlide = {
  href: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceDetailOtherServicesProps = {
  headline?: string;
  slides: readonly ServiceDetailOtherServicesSlide[];
};

function CarouselArrowIcon({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="32"
      height="12"
      viewBox="0 0 32 12"
      fill="none"
      aria-hidden
    >
      {direction === "left" ? (
        <path
          d="M0.5 6H31M6 1L1 6L6 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M31.5 6H1M26 1L31 6L26 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function LearnMoreArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceDetailOtherServices({
  headline = "Our other services",
  slides,
}: ServiceDetailOtherServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  useServiceDetailOtherServicesAnimation({ sectionRef });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (slides.length === 0) return null;

  return (
    <section ref={sectionRef} className="sd-other-services sd-section">
      {headline ? (
        <div className="sd-container">
          <div className="max-w-228 text-left">
            <h2 className="sc-heading sd-h2">{headline}</h2>
          </div>
        </div>
      ) : null}

      <div className={headline ? "mt-8 sm:mt-10 lg:mt-16" : undefined}>
        <div
          ref={emblaRef}
          className="overflow-hidden px-4 sm:px-6 lg:px-34"
        >
          <div className="flex touch-pan-y touch-pinch-zoom">
            {slides.map((slide) => (
              <div
                key={slide.href}
                className="sc-slide mr-4 min-w-0 max-w-85 shrink-0 grow-0 basis-full sm:mr-5 sm:w-90 sm:max-w-none sm:basis-auto lg:mr-6 lg:w-152"
              >
                <div className="sc-slide-card relative flex h-full flex-col p-4 sm:p-6 lg:p-8">
                  <div className="relative aspect-542/304 w-full overflow-hidden rounded-xl sm:rounded-2xl">
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      sizes="(max-width: 640px) 340px, (max-width: 1024px) 360px, 542px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-5 sm:pt-6 lg:pt-8">
                    <div className="mb-3 size-6 sm:mb-4 sm:size-7 lg:size-8">
                      <OfferingIcon className="h-full w-full text-ta-gold" />
                    </div>
                    <h3 className="mb-2 font-[family-name:var(--font-inter)] text-lg font-semibold text-white sm:text-xl lg:text-2xl">
                      {slide.title}
                    </h3>
                    <p className="sd-body flex-1">{slide.description}</p>
                    <TransitionLink
                      href={slide.href}
                      className="group relative mt-5 inline-flex items-center gap-2 text-base font-medium text-white after:absolute after:inset-0 sm:mt-6 sm:gap-2.5 lg:mt-8 lg:gap-3"
                    >
                      <span className="relative">
                        Learn more
                        <span
                          className="arrow-link-underline absolute left-0 -bottom-[0.15em] h-[0.1em] w-0 bg-[color:var(--ta-gold)] transition-all duration-300 group-hover:w-full"
                          aria-hidden
                        />
                      </span>
                      <div className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110">
                        <LearnMoreArrowIcon className="size-[1em] -rotate-45" />
                      </div>
                    </TransitionLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sc-nav mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4 lg:mt-10">
          <button
            type="button"
            className="sc-nav-btn flex h-12 w-12 cursor-pointer items-center justify-center rounded-full sm:h-13 sm:w-13 lg:h-15 lg:w-15"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <CarouselArrowIcon
              direction="left"
              className="h-3 w-8"
            />
          </button>
          <button
            type="button"
            className="sc-nav-btn flex h-12 w-12 cursor-pointer items-center justify-center rounded-full sm:h-13 sm:w-13 lg:h-15 lg:w-15"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <CarouselArrowIcon
              direction="right"
              className="h-3 w-8"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
