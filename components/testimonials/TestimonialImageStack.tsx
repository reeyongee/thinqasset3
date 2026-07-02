import Image from "next/image";
import { TESTIMONIALS } from "./constants";

type TestimonialImageStackProps = {
  activeIndex: number;
};

export function TestimonialImageStack({
  activeIndex,
}: TestimonialImageStackProps) {
  return (
    <div className="relative h-full min-h-0 w-full flex-1">
      {TESTIMONIALS.map((testimonial, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={testimonial.id}
            className={[
              "absolute inset-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.12,0.23,0.5,1)]",
              isActive ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-hidden={!isActive}
          >
            <Image
              src={testimonial.heroImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1200px) 707px, (min-width: 810px) 60vw, 100vw"
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
