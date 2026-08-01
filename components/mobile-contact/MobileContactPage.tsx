"use client";

import "@/components/mobile-home/mobile-home.css";
import "./mobile-contact.css";
import { MobileContactHero } from "./sections/MobileContactHero";
import { MobileContactWizard } from "./sections/MobileContactWizard";
import { useContactForm } from "./useContactForm";

export function MobileContactPage() {
  const {
    wizardOpen,
    step,
    showSuccess,
    form,
    openWizard,
    closeWizard,
    updateField,
    handleProfileContinue,
    handleExpertiseContinue,
    handleSubmit,
    goBack,
  } = useContactForm();

  return (
    <div className="mobile-contact" data-transition-page>
      <MobileContactHero onOpenForm={openWizard} />

      {wizardOpen ? (
        <MobileContactWizard
          step={step}
          showSuccess={showSuccess}
          form={form}
          onBack={goBack}
          onClose={closeWizard}
          onChange={updateField}
          onProfileContinue={handleProfileContinue}
          onExpertiseContinue={handleExpertiseContinue}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}
