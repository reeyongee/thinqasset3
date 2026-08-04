"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import { splitWords } from "@/lib/contact/splitWords";

gsap.registerPlugin(useGSAP);

function setHidden(elements: gsap.TweenTarget, opacity = 0.01) {
  return gsap.set(elements, { y: 20, opacity, immediateRender: true });
}

function fadeIn(elements: gsap.TweenTarget, stagger = 0) {
  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger,
    ease: "power2.out",
  });
}

function setOpacityHidden(elements: gsap.TweenTarget, opacity = 0.01) {
  return gsap.set(elements, { opacity, immediateRender: true });
}

function fadeInOpacity(elements: gsap.TweenTarget, stagger = 0) {
  return gsap.to(elements, {
    opacity: 1,
    duration: 0.7,
    stagger,
    ease: "power2.out",
  });
}

function buildWordSplitTimeline(words: gsap.TweenTarget) {
  gsap.set(words, { yPercent: 25, opacity: 0.01, immediateRender: true });

  return gsap
    .timeline()
    .to(words, {
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.inOut",
    })
    .to(
      words,
      {
        yPercent: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<",
    );
}

export function useContactMotion(
  rootRef: React.RefObject<HTMLElement | null>,
  headlineRef: React.RefObject<HTMLParagraphElement | null>,
  formRef: React.RefObject<HTMLElement | null>,
) {
  const { isNavigating } = useTransitionAnimation();
  const arrivedViaTransition = useRef(false);
  const heroTimeline = useRef<gsap.core.Timeline | null>(null);
  const formTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isNavigating) {
      arrivedViaTransition.current = true;
    }
  }, [isNavigating]);

  useGSAP(
    () => {
      if (!headlineRef.current || isNavigating) return;

      const words = headlineRef.current.querySelectorAll("span");

      heroTimeline.current = arrivedViaTransition.current
        ? null
        : gsap
            .timeline({ paused: true })
            .add(setHidden(".contact-hero__eyebrow"))
            .add(setHidden(".contact-hero__top"))
            .add(setHidden(".contact-hero__bottom__button"))
            .add(fadeIn(".contact-hero__eyebrow"), 0.1)
            .add(fadeIn(".contact-hero__top"), 0.15)
            .add(buildWordSplitTimeline(words), 0.1)
            .add(fadeIn(".contact-hero__bottom__button", 0.1), ">-=0.4");

      if (!arrivedViaTransition.current) {
        heroTimeline.current?.play(0);
      }
    },
    { scope: rootRef, dependencies: [isNavigating] },
  );

  useGSAP(
    () => {
      if (!formRef.current || isNavigating) return;

      formTimeline.current = gsap
        .timeline({ paused: true })
        .add(setOpacityHidden(".contact-hero__form__step", 0.1))
        .add(setHidden(".contact-hero__form__close"))
        .add(fadeInOpacity(".contact-hero__form__step", 0.15))
        .add(fadeIn(".contact-hero__form__close"), "<+=0.2");
    },
    { scope: formRef, dependencies: [isNavigating] },
  );

  const playFormIntro = () => {
    formTimeline.current?.play(0);
  };

  const playHeroIntro = () => {
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll("span");

    gsap
      .timeline({ paused: true })
      .add(setHidden(".contact-hero__eyebrow"))
      .add(setHidden(".contact-hero__top"))
      .add(setHidden(".contact-hero__bottom__button"))
      .add(fadeIn(".contact-hero__eyebrow"), 0.1)
      .add(fadeIn(".contact-hero__top"), 0.15)
      .add(buildWordSplitTimeline(words), 0.1)
      .add(fadeIn(".contact-hero__bottom__button", 0.1), ">-=0.4")
      .play(0);
  };

  const animateSuccess = useCallback((descriptionEl: HTMLElement) => {
    if (!formRef.current) return;

    splitWords(descriptionEl);
    const root = formRef.current;

    gsap
      .timeline({ defaults: { immediateRender: true } })
      .add(
        setHidden(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__top",
          ),
        ),
      )
      .add(
        setHidden(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__middle__header",
          ),
        ),
      )
      .add(
        setOpacityHidden(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__middle .contact-form-action",
          ),
          0.1,
        ),
      )
      .add(
        setHidden(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__middle__description span",
          ),
        ),
      )
      .add(
        fadeIn(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__top",
          ),
        ),
      )
      .add(
        fadeIn(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__middle__header",
          ),
        ),
        "<",
      )
      .add(
        fadeIn(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__middle__description span",
          ),
          0.1,
        ),
        "<+=0.1",
      )
      .add(
        fadeInOpacity(
          root.querySelectorAll(
            ".contact-hero__form__step__middle__success__middle .contact-form-action",
          ),
        ),
        ">-=0.5",
      );
  }, [formRef]);

  return { playFormIntro, playHeroIntro, animateSuccess };
}
