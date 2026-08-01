import type { FormEvent } from "react";
import { EXPERTISE_OPTIONS } from "@/components/contact/constants";
import { ContactFormButton } from "@/components/contact/ContactFormButton";
import type { ContactFormState } from "../useContactForm";

type MobileContactStepExpertiseProps = {
  form: ContactFormState;
  onChange: <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export function MobileContactStepExpertise({
  form,
  onChange,
  onSubmit,
  onBack,
}: MobileContactStepExpertiseProps) {
  return (
    <div className="mobile-contact-step">
      <h2 className="mobile-contact-step__title">
        Select the area of your interest.
      </h2>

      <form className="mobile-contact-form" onSubmit={onSubmit}>
        {EXPERTISE_OPTIONS.map((option, index) => (
          <label
            key={option}
            className="mobile-contact-radio mobile-pressable"
          >
            <input
              id={`mobile-expertise-${index}`}
              type="radio"
              name="expertise"
              value={option}
              checked={form.expertise === option}
              onChange={() => onChange("expertise", option)}
              required
            />
            <span>{option}</span>
          </label>
        ))}
        <input type="submit" hidden />
      </form>

      <div className="mobile-contact-step__actions mobile-contact-step__actions--split">
        <button
          type="button"
          className="mobile-contact-back-btn mobile-pressable"
          onClick={onBack}
        >
          Back
        </button>
        <ContactFormButton
          type="button"
          onClick={(event) => {
            const formEl = event.currentTarget
              .closest(".mobile-contact-step")
              ?.querySelector("form") as HTMLFormElement | null;
            formEl?.requestSubmit();
          }}
        >
          Continue
        </ContactFormButton>
      </div>
    </div>
  );
}
