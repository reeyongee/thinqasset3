import type { FormEvent } from "react";
import { ContactFormButton } from "@/components/contact/ContactFormButton";
import type { ContactFormState } from "../useContactForm";

type MobileContactStepProfileProps = {
  form: ContactFormState;
  onChange: <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function MobileContactStepProfile({
  form,
  onChange,
  onSubmit,
}: MobileContactStepProfileProps) {
  return (
    <div className="mobile-contact-step">
      <h2 className="mobile-contact-step__title">Add your personal information.</h2>

      <form className="mobile-contact-form" onSubmit={onSubmit}>
        <div className="mobile-contact-field">
          <input
            id="mobile-first-name"
            name="firstName"
            type="text"
            placeholder="First name"
            required
            value={form.firstName}
            onChange={(event) => onChange("firstName", event.target.value)}
          />
          <label htmlFor="mobile-first-name">First name</label>
        </div>

        <div className="mobile-contact-field">
          <input
            id="mobile-last-name"
            name="lastName"
            type="text"
            placeholder="Last name"
            required
            value={form.lastName}
            onChange={(event) => onChange("lastName", event.target.value)}
          />
          <label htmlFor="mobile-last-name">Last name</label>
        </div>

        <div className="mobile-contact-field">
          <input
            id="mobile-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
          />
          <label htmlFor="mobile-email">Email</label>
        </div>

        <div className="mobile-contact-field">
          <input
            id="mobile-phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            required
            value={form.phone}
            onChange={(event) => onChange("phone", event.target.value)}
          />
          <label htmlFor="mobile-phone">Phone</label>
        </div>

        <input type="submit" hidden />
      </form>

      <div className="mobile-contact-step__actions">
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
