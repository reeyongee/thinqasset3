"use client";

import Image from "next/image";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useServiceDetailRelatedAnimation } from "./useServiceDetailRelatedAnimation";

export type ServiceDetailRelatedCard = {
  href: string;
  image: {
    src: string;
    alt: string;
  };
  meta: string;
  description: string;
};

export type ServiceDetailRelatedProps = {
  headline: string;
  linkHref: string;
  linkLabel: string;
  cards: readonly [ServiceDetailRelatedCard, ServiceDetailRelatedCard];
};

function RelatedArrowIcon({ className }: { className?: string }) {
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

export function ServiceDetailRelated({
  headline,
  linkHref,
  linkLabel,
  cards,
}: ServiceDetailRelatedProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useServiceDetailRelatedAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="sd-related-section sd-section">
      <div className="sd-container">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between lg:mb-16">
          <h2 className="sd-related-headline sd-h2">{headline}</h2>
          <TransitionLink
            href={linkHref}
            className="group sd-related-link inline-flex items-center gap-2 text-base font-medium sm:gap-2.5 lg:gap-3"
          >
            <span className="relative">
              {linkLabel}
              <span
                className="arrow-link-underline absolute left-0 -bottom-[0.15em] h-[0.1em] w-0 transition-all duration-300 group-hover:w-full"
                aria-hidden
              />
            </span>
            <div className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110">
              <RelatedArrowIcon className="size-[1em] -rotate-45" />
            </div>
          </TransitionLink>
        </div>

        <div className="sd-related-grid">
          <div className="grid gap-x-10 gap-y-12 sm:gap-y-14 md:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
            {cards.map((card, index) => (
              <div
                key={card.href}
                className={
                  index === 1
                    ? "flex flex-col gap-12 sm:gap-14 md:pt-20 lg:gap-16"
                    : "flex flex-col gap-12 sm:gap-14 lg:gap-16"
                }
              >
                <TransitionLink href={card.href} className="card-link group block">
                  <article>
                    <div className="card-image-wrap relative overflow-hidden rounded-3xl">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        width={600}
                        height={600}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="card-img aspect-square max-w-150 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="card-meta mt-3 sm:mt-4 lg:mt-6">
                      <p>
                        {card.meta.split(" • ")[0]}
                        <span className="mx-2">•</span>
                        {card.meta.split(" • ").slice(1).join(" • ")}
                      </p>
                    </div>
                    <p className="card-desc">{card.description}</p>
                  </article>
                </TransitionLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
