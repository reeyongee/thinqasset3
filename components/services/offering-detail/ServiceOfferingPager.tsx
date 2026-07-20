"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useServiceOfferingPagerAnimation } from "./useServiceOfferingPagerAnimation";

export type OfferingPagerTarget = {
  href: string;
  index: string;
  title: string;
};

export type ServiceOfferingPagerProps = {
  currentLabel: string;
  position: number;
  total: number;
  previous: OfferingPagerTarget;
  next: OfferingPagerTarget;
};

export function ServiceOfferingPager({
  currentLabel,
  position,
  total,
  previous,
  next,
}: ServiceOfferingPagerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingPagerAnimation({ sectionRef });

  return (
    <nav
      ref={sectionRef}
      className="od-pager sd-section"
      aria-label="Offering navigation"
    >
      <div className="sd-container">
        <p className="od-pager__progress">
          <span className="od-pager__progress-current">
            {String(position).padStart(2, "0")}
          </span>
          <span className="od-pager__progress-sep" aria-hidden>
            /
          </span>
          <span className="od-pager__progress-total">
            {String(total).padStart(2, "0")}
          </span>
          <span className="od-pager__progress-label">{currentLabel}</span>
        </p>

        <div className="od-pager__row">
          <TransitionLink
            href={previous.href}
            className="od-pager__link od-pager__link--prev"
            aria-label={`Previous offering: ${previous.title}`}
          >
            <span className="od-pager__dir" aria-hidden>
              ← Previous
            </span>
            <span className="od-pager__meta">
              <span className="od-pager__index">{previous.index}</span>
              <span className="od-pager__title">{previous.title}</span>
            </span>
          </TransitionLink>

          <TransitionLink
            href={next.href}
            className="od-pager__link od-pager__link--next"
            aria-label={`Next offering: ${next.title}`}
          >
            <span className="od-pager__dir" aria-hidden>
              Next →
            </span>
            <span className="od-pager__meta">
              <span className="od-pager__index">{next.index}</span>
              <span className="od-pager__title">{next.title}</span>
            </span>
          </TransitionLink>
        </div>
      </div>
    </nav>
  );
}
