"use client";

import Image from "next/image";
import { useState } from "react";
import { HeroButton } from "@/components/hero/HeroButton";
import {
  APPROACH_BODY,
  APPROACH_CTA,
  APPROACH_HEADLINE_LINE1,
  APPROACH_HEADLINE_LINE2,
  APPROACH_STEPS,
} from "@/components/our-approach/constants";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { MobileReveal } from "../MobileReveal";

export function MobileApproach() {
  const [openId, setOpenId] = useState<string | null>(APPROACH_STEPS[0]?.id ?? null);

  return (
    <section
      id="services"
      className="mobile-section"
      aria-labelledby="mobile-services-heading"
    >
      <MobileReveal>
        <h2 id="mobile-services-heading" className="mobile-section__headline">
          {APPROACH_HEADLINE_LINE1}
          <span className="block text-ta-gold">{APPROACH_HEADLINE_LINE2}</span>
        </h2>
        <p className="mobile-section__body mt-3 max-w-[38ch]">{APPROACH_BODY}</p>
      </MobileReveal>

      <div className="mt-6 flex flex-col gap-3">
        {APPROACH_STEPS.map((step, index) => {
          const open = openId === step.id;

          return (
            <MobileReveal key={step.id} delay={index * 0.04}>
              <article className="mobile-card overflow-hidden">
                <button
                  type="button"
                  className="mobile-accordion__trigger mobile-pressable"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenId((current) => (current === step.id ? null : step.id))
                  }
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="font-[family-name:var(--font-geist-mono)] text-xs text-token-muted"
                      aria-hidden
                    >
                      {step.number}
                    </span>
                    <span>{step.title}</span>
                  </span>
                  <span aria-hidden className="text-ta-gold">
                    {open ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="mobile-accordion__panel"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="mobile-accordion__panel-inner">
                    <div className="relative h-40 w-full">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-4 px-4 pb-4 pt-4">
                      <p className="mobile-section__body m-0 text-sm">
                        {step.description}
                      </p>
                      <TransitionLink
                        href={step.href}
                        className="inline-flex py-2 font-[family-name:var(--font-inter)] text-sm font-medium text-ta-gold"
                      >
                        {step.linkLabel} →
                      </TransitionLink>
                    </div>
                  </div>
                </div>
              </article>
            </MobileReveal>
          );
        })}
      </div>

      <MobileReveal className="mt-6">
        <HeroButton
          className="w-full"
          label={APPROACH_CTA.label}
          href={APPROACH_CTA.href}
        />
      </MobileReveal>
    </section>
  );
}
