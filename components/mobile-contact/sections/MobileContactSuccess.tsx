import { ContactFormButton } from "@/components/contact/ContactFormButton";

type MobileContactSuccessProps = {
  onClose: () => void;
};

export function MobileContactSuccess({ onClose }: MobileContactSuccessProps) {
  return (
    <div className="mobile-contact-success">
      <p className="mobile-contact-success__step">03.</p>
      <h2 className="mobile-contact-success__title">Submission confirmed</h2>
      <p className="mobile-contact-success__body">
        Thank you <strong>for your submission</strong>.
        <br />
        Our team will contact you shortly about next steps.
      </p>
      <ContactFormButton type="button" onClick={onClose}>
        Got it
      </ContactFormButton>
    </div>
  );
}
