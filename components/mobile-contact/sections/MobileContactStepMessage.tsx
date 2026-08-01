import type { FormEvent } from "react";
import { ContactFormButton } from "@/components/contact/ContactFormButton";
import type { ContactFormState } from "../useContactForm";

type MobileContactStepMessageProps = {
  form: ContactFormState;
  onChange: <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export function MobileContactStepMessage({
  form,
  onChange,
  onSubmit,
  onBack,
}: MobileContactStepMessageProps) {
  return (
    <div className="mobile-contact-step">
      <h2 className="mobile-contact-step__title">
        Anything else we should know?
      </h2>

      <form className="mobile-contact-form" onSubmit={onSubmit}>
        <div className="mobile-contact-field mobile-contact-field--textarea">
          <textarea
            id="mobile-message"
            name="message"
            placeholder="Type your message here."
            required
            value={form.message}
            onChange={(event) => onChange("message", event.target.value)}
          />
          <label htmlFor="mobile-message">Message</label>
        </div>
        <input type="submit" hidden />
      </form>

      <p className="mobile-contact-recaptcha">
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
          Submit
        </ContactFormButton>
      </div>
    </div>
  );
}
