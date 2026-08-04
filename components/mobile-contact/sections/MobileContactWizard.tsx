import type { FormEvent } from "react";
import { FORM_STEPS } from "@/components/contact/constants";
import type { ContactFormState } from "../useContactForm";
import { MobileContactStepExpertise } from "./MobileContactStepExpertise";
import { MobileContactStepMessage } from "./MobileContactStepMessage";
import { MobileContactStepProfile } from "./MobileContactStepProfile";
import { MobileContactSuccess } from "./MobileContactSuccess";

type MobileContactWizardProps = {
  step: number;
  showSuccess: boolean;
  form: ContactFormState;
  onBack: () => void;
  onClose: () => void;
  onChange: <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => void;
  onProfileContinue: (event: FormEvent<HTMLFormElement>) => void;
  onExpertiseContinue: (event: FormEvent<HTMLFormElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function MobileContactWizard({
  step,
  showSuccess,
  form,
  onBack,
  onClose,
  onChange,
  onProfileContinue,
  onExpertiseContinue,
  onSubmit,
}: MobileContactWizardProps) {
  const currentStep = FORM_STEPS[step - 1];
  const progressStep = showSuccess ? 3 : step;

  return (
    <div
      className="mobile-contact-wizard"
      role="dialog"
      aria-modal="true"
      aria-label="Consultation form"
    >
      <button
        type="button"
        className="mobile-contact-wizard__close mobile-pressable"
        aria-label="Close form"
        onClick={onClose}
      >
        <span className="mobile-contact-wizard__close-line" aria-hidden />
        <span className="mobile-contact-wizard__close-line" aria-hidden />
      </button>

      {!showSuccess ? (
        <div className="mobile-contact-wizard__progress">
          <p className="mobile-contact-wizard__progress-count">
            <span className="mobile-contact-wizard__progress-current">
              {String(progressStep).padStart(2, "0")}
            </span>
            <span aria-hidden>/</span>
            <span>{String(FORM_STEPS.length).padStart(2, "0")}</span>
          </p>
          <p className="mobile-contact-wizard__progress-label">
            {currentStep?.verticalLabel}
          </p>
        </div>
      ) : null}

      <div className="mobile-contact-wizard__body">
        {showSuccess ? (
          <MobileContactSuccess onClose={onClose} />
        ) : step === 1 ? (
          <MobileContactStepProfile
            form={form}
            onChange={onChange}
            onSubmit={onProfileContinue}
          />
        ) : step === 2 ? (
          <MobileContactStepExpertise
            form={form}
            onChange={onChange}
            onSubmit={onExpertiseContinue}
            onBack={onBack}
          />
        ) : (
          <MobileContactStepMessage
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
}
