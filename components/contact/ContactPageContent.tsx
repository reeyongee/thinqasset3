"use client";

import type { FormEvent, MouseEvent } from "react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { PageHero } from "@/components/page-hero/PageHero";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { PAGE_HERO_IMAGES } from "@/lib/brand-assets";
import { splitWords } from "@/lib/contact/splitWords";
import {
  lockPageScroll,
  unlockPageScroll,
} from "@/lib/scroll/lockPageScroll";
import {
  DEFAULT_COUNTRY_CODE,
  sanitizePersonName,
} from "@/lib/contact/phone";
import { ContactFormButton } from "./ContactFormButton";
import { PhoneField } from "./PhoneField";
import {
  CONTACT_CTA_CARDS,
  EXPERTISE_OPTIONS,
  FORM_STEPS,
  type ExpertiseOption,
} from "./constants";
import { useContactMotion } from "./useContactMotion";
import "./contact.css";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  expertise: ExpertiseOption | "";
  message: string;
};

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: "",
  expertise: "",
  message: "",
};

function subscribeNoop() {
  return () => {};
}

export function ContactPageContent({ startWithForm = false }: { startWithForm?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const successDescRef = useRef<HTMLParagraphElement>(null);
  const autoOpenedRef = useRef(false);
  const [pageStep, setPageStep] = useState<1 | 2>(1);
  const [activeSubstep, setActiveSubstep] = useState(1);
  const [validatedSteps, setValidatedSteps] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [transitionLock, setTransitionLock] = useState(false);

  const { playFormIntro, playHeroIntro, animateSuccess } = useContactMotion(
    rootRef,
    headlineRef,
    formRef,
  );

  useEffect(() => {
    return () => {
      document.body.classList.remove("contact-step-2");
      unlockPageScroll();
    };
  }, []);

  useEffect(() => {
    if (!headlineRef.current) return;
    splitWords(headlineRef.current);
  }, []);

  useEffect(() => {
    if (!showSuccess || !successDescRef.current) return;
    requestAnimationFrame(() => {
      if (successDescRef.current) {
        animateSuccess(successDescRef.current);
      }
    });
  }, [showSuccess, animateSuccess]);

  const openForm = useCallback(() => {
    if (transitionLock) return;
    setTransitionLock(true);
    document.body.classList.add("contact-step-2");
    lockPageScroll();
    window.setTimeout(() => {
      playFormIntro();
      setPageStep(2);
      window.setTimeout(() => setTransitionLock(false), 1000);
    }, 250);
  }, [playFormIntro, transitionLock]);

  useEffect(() => {
    if (!startWithForm || autoOpenedRef.current) return;
    const timer = window.setTimeout(() => {
      autoOpenedRef.current = true;
      openForm();
      const url = new URL(window.location.href);
      if (url.searchParams.has("form")) {
        url.searchParams.delete("form");
        window.history.replaceState(
          {},
          "",
          `${url.pathname}${url.search}${url.hash}`,
        );
      }
    }, 150);
    return () => window.clearTimeout(timer);
  }, [openForm, startWithForm]);

  const closeForm = useCallback(() => {
    if (transitionLock) return;
    setTransitionLock(true);
    window.setTimeout(() => {
      playHeroIntro();
      setPageStep(1);
      document.body.classList.remove("contact-step-2");
      unlockPageScroll();
      setActiveSubstep(1);
      setValidatedSteps([]);
      setShowSuccess(false);
      setForm(INITIAL_FORM);
      window.setTimeout(() => setTransitionLock(false), 1000);
    }, 250);
  }, [playHeroIntro, transitionLock]);

  const markValidated = (step: number) => {
    setValidatedSteps((prev) => (prev.includes(step) ? prev : [...prev, step]));
  };

  const handleProfileContinue = (event: FormEvent) => {
    event.preventDefault();
    const formEl = event.currentTarget as HTMLFormElement;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    markValidated(1);
    setActiveSubstep(2);
  };

  const handleExpertiseContinue = (event: FormEvent) => {
    event.preventDefault();
    if (!form.expertise) return;
    markValidated(2);
    setActiveSubstep(3);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formEl = event.currentTarget as HTMLFormElement;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    markValidated(3);
    setShowSuccess(true);
  };

  const handleRadioRowClick = (event: MouseEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    const input = row.querySelector<HTMLInputElement>('input[type="radio"]');
    if (!input) return;
    input.checked = true;
    setForm((f) => ({ ...f, expertise: input.value as ExpertiseOption }));
  };

  const handleValidatedStepClick = (substep: number) => {
    if (!validatedSteps.includes(substep) || substep === activeSubstep) return;
    setActiveSubstep(substep);
    if (substep !== 3) setShowSuccess(false);
  };

  const stepClass = (substep: number) => {
    const classes = ["contact-hero__form__step"];
    if (activeSubstep === substep) classes.push("is-selected");
    if (validatedSteps.includes(substep)) classes.push("is-validated");
    if (substep === 3 && showSuccess) classes.push("is-completed");
    return classes.join(" ");
  };

  const requestStepSubmit = (button: HTMLButtonElement) => {
    const formEl = button
      .closest(".contact-hero__form__step")
      ?.querySelector("form") as HTMLFormElement | null;
    formEl?.requestSubmit();
  };

  return (
    <>
      <PageHero
        imageSrc={PAGE_HERO_IMAGES.contact}
        lines={[
          "Contact",
          <>
            The right structure starts with a{" "}
            <em className="italic text-brass">conversation.</em>
          </>,
        ]}
        meta={["Contact", "ThinqAsset", "Global advisory"]}
      />
      <ScrollSection chapter={{ num: "01", label: "Contact" }}>
        <section
          ref={rootRef}
          className="contact-page contact-page--page-hero"
          data-transition-page
          data-step={pageStep}
        >
      <div className="contact-page__container">
        <section
          className={`contact-hero ${pageStep === 1 ? "is-selected" : ""}`}
        >
          <div className="contact-hero__inner">
            <p className="contact-hero__eyebrow contact-hero__eyebrow--hidden" data-transition-text="body">
              Contact
            </p>

            <div className="contact-hero__top contact-hero__top--hidden">
              <h1 data-transition-text="headline">Contact</h1>
            </div>

            <div className="contact-hero__middle contact-hero__middle--hidden">
              <div className="contact-hero__middle__inner">
                <p className="contact-hero__middle__header">Contact</p>
                <h2 data-transition-text="headline">
                  <p ref={headlineRef}>
                    The right structure
                    <br />
                    starts with a <em>conversation.</em>
                  </p>
                </h2>
              </div>
            </div>

            <div className="contact-hero__bottom">
              {CONTACT_CTA_CARDS.map((card) => {
                const inner = (
                  <>
                    <div className="contact-hero__bottom__button__info">
                      <p>{card.label}</p>
                      <h2>{card.title}</h2>
                    </div>
                    <div className="contact-hero__bottom__button__arrow">
                      <div className="contact-hero__bottom__button__arrow__inner" />
                    </div>
                  </>
                );

                if (card.id === "form") {
                  return (
                    <button
                      key={card.id}
                      type="button"
                      className="contact-hero__bottom__button"
                      data-transition-item
                      onClick={openForm}
                    >
                      {inner}
                    </button>
                  );
                }

                if (card.href?.startsWith("/")) {
                  return (
                    <TransitionLink
                      key={card.id}
                      href={card.href}
                      className="contact-hero__bottom__button"
                      data-transition-item
                    >
                      {inner}
                    </TransitionLink>
                  );
                }

                return (
                  <a
                    key={card.id}
                    href={card.href!}
                    className="contact-hero__bottom__button"
                    data-transition-item
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
      </ScrollSection>
      {mounted
        ? createPortal(
            <div
              ref={formRef}
              className={`contact-hero__form ${pageStep === 2 ? "is-selected" : ""}`}
            >
          <button
            type="button"
            className="contact-hero__form__close"
            aria-label="Close form"
            onClick={closeForm}
          >
            <div className="contact-hero__form__close__line">
              <div className="contact-hero__form__close__line__inner" />
            </div>
            <div className="contact-hero__form__close__line">
              <div className="contact-hero__form__close__line__inner" />
            </div>
          </button>

          <div className="contact-hero__form__close-rail">
            <button
              type="button"
              className="contact-hero__form__close"
              aria-label="Close form"
              onClick={closeForm}
            >
              <div className="contact-hero__form__close__line">
                <div className="contact-hero__form__close__line__inner" />
              </div>
              <div className="contact-hero__form__close__line">
                <div className="contact-hero__form__close__line__inner" />
              </div>
            </button>
          </div>

          <div className="contact-hero__form__container">
            {FORM_STEPS.map((step) => (
              <div
                key={step.id}
                className={stepClass(step.substep)}
                data-substep={step.substep}
                onClick={() => handleValidatedStepClick(step.substep)}
                onKeyDown={() => undefined}
                role="presentation"
              >
                <div className="contact-hero__form__step__left">
                  <p className="contact-hero__form__step__id">{step.id}.</p>
                  <div className="contact-hero__form__step__id__checked" />

                  {step.substep === 3 ? (
                    <div className="contact-hero__form__step__left__inner">
                      <p className="contact-hero__form__step__title">
                        {step.title}
                      </p>
                      <p className="contact-hero__form__step__title contact-hero__form__step__title2">
                        Submission confirmed
                      </p>
                    </div>
                  ) : (
                    <p className="contact-hero__form__step__title">
                      {step.title}
                    </p>
                  )}

                  <div className="contact-hero__form__step__header">
                    <p className="contact-hero__form__step__header__inner">
                      {step.verticalLabel}
                    </p>
                  </div>
                </div>

                <div className="contact-hero__form__step__middle">
                  {step.substep === 1 && (
                    <>
                      <h2>{step.title}</h2>
                      <div className="contact-hero__form__step__middle__inner">
                        <form onSubmit={handleProfileContinue}>
                          <div className="page__input__container width50">
                            <input
                              id="first-name"
                              name="firstName"
                              type="text"
                              placeholder="First name"
                              required
                              minLength={1}
                              maxLength={60}
                              autoComplete="given-name"
                              value={form.firstName}
                              onChange={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  firstName: sanitizePersonName(e.target.value),
                                }))
                              }
                            />
                            <label htmlFor="first-name">First name</label>
                          </div>
                          <div className="page__input__container width50">
                            <input
                              id="last-name"
                              name="lastName"
                              type="text"
                              placeholder="Last name"
                              required
                              minLength={1}
                              maxLength={60}
                              autoComplete="family-name"
                              value={form.lastName}
                              onChange={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  lastName: sanitizePersonName(e.target.value),
                                }))
                              }
                            />
                            <label htmlFor="last-name">Last name</label>
                          </div>
                          <div className="page__input__container">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Email"
                              required
                              autoComplete="email"
                              inputMode="email"
                              value={form.email}
                              onChange={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  email: e.target.value.trimStart(),
                                }))
                              }
                              onBlur={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  email: e.target.value.trim(),
                                }))
                              }
                            />
                            <label htmlFor="email">Email</label>
                          </div>
                          <PhoneField
                            id="phone"
                            countryCode={form.countryCode}
                            phone={form.phone}
                            onCountryCodeChange={(countryCode) =>
                              setForm((f) => ({ ...f, countryCode }))
                            }
                            onPhoneChange={(phone) =>
                              setForm((f) => ({ ...f, phone }))
                            }
                          />
                          <input type="submit" hidden />
                        </form>
                      </div>
                      <div className="contact-hero__form__step__middle__bottom">
                        <ContactFormButton
                          onClick={(e) =>
                            requestStepSubmit(e.currentTarget)
                          }
                        >
                          Continue
                        </ContactFormButton>
                      </div>
                    </>
                  )}

                  {step.substep === 2 && (
                    <>
                      <h2>
                        Select the expertise
                        {step.titleMobileHiddenSuffix ? (
                          <span>{step.titleMobileHiddenSuffix}</span>
                        ) : null}
                        .
                      </h2>
                      <div className="contact-hero__form__step__middle__inner">
                        <form onSubmit={handleExpertiseContinue}>
                          {EXPERTISE_OPTIONS.map((option, index) => (
                            <div
                              key={option}
                              className="page__input__container__radio"
                              onClick={handleRadioRowClick}
                              onKeyDown={() => undefined}
                              role="presentation"
                            >
                              <input
                                id={`expertise-${index}`}
                                type="radio"
                                name="expertise"
                                value={option}
                                checked={form.expertise === option}
                                onChange={() =>
                                  setForm((f) => ({
                                    ...f,
                                    expertise: option,
                                  }))
                                }
                                required
                              />
                              <label htmlFor={`expertise-${index}`}>
                                {option}
                              </label>
                            </div>
                          ))}
                          <input type="submit" hidden />
                        </form>
                      </div>
                      <div className="contact-hero__form__step__middle__bottom">
                        <ContactFormButton
                          onClick={(e) => requestStepSubmit(e.currentTarget)}
                        >
                          Continue
                        </ContactFormButton>
                      </div>
                    </>
                  )}

                  {step.substep === 3 && (
                    <>
                      <div
                        className={`contact-hero__form__step__middle__middle ${!showSuccess ? "is-selected" : ""}`}
                      >
                        <h2>{step.title}</h2>
                        <div className="contact-hero__form__step__middle__inner">
                          <form onSubmit={handleSubmit}>
                            <div className="page__input__container">
                              <textarea
                                id="message"
                                name="message"
                                placeholder="Type your message here."
                                required
                                value={form.message}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    message: e.target.value,
                                  }))
                                }
                              />
                              <label htmlFor="message">Message</label>
                            </div>
                            <input type="submit" hidden />
                          </form>
                        </div>
                        <div className="contact-hero__form__step__middle__bottom">
                          <p className="contact-hero__form__step__middle__bottom__text">
                            This site is protected by reCAPTCHA.
                            <br />
                            The Google{" "}
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a
                              href="https://policies.google.com/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Terms of Service
                            </a>{" "}
                            related to reCAPTCHA apply.
                          </p>
                          <ContactFormButton
                            onClick={(e) => requestStepSubmit(e.currentTarget)}
                          >
                            Submit
                          </ContactFormButton>
                        </div>
                      </div>

                      <div
                        className={`contact-hero__form__step__middle__success ${showSuccess ? "is-selected" : ""}`}
                      >
                        <div className="contact-hero__form__step__middle__success__top">
                          <p className="contact-hero__form__step__id">03.</p>
                          <div className="contact-hero__form__step__id__checked" />
                        </div>
                        <div className="contact-hero__form__step__middle__success__middle">
                          <p className="contact-hero__form__step__middle__success__middle__header">
                            Submission confirmed
                          </p>
                          <p
                            ref={successDescRef}
                            className="contact-hero__form__step__middle__success__middle__description"
                          >
                            Thank you <strong>for your submission</strong>.
                            <br />
                            Our team will contact you shortly about next steps.
                          </p>
                          <ContactFormButton onClick={closeForm}>
                            Got it
                          </ContactFormButton>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
