"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import "@/components/mobile-home/mobile-home.css";
import { PageHero } from "@/components/page-hero/PageHero";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import "./mobile-contact.css";
import { MobileContactHero } from "./sections/MobileContactHero";
import { MobileContactWizard } from "./sections/MobileContactWizard";
import { useContactForm } from "./useContactForm";

function subscribeNoop() {
  return () => {};
}

export function MobileContactPage({ startWithForm = false }: { startWithForm?: boolean }) {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const autoOpenedRef = useRef(false);
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

  useEffect(() => {
    if (!startWithForm || autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    openWizard();
    const url = new URL(window.location.href);
    if (url.searchParams.has("form")) {
      url.searchParams.delete("form");
      window.history.replaceState(
        {},
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, [openWizard, startWithForm]);

  return (
    <div className="mobile-contact" data-transition-page>
      <PageHero
        lines={[
          "Consultation",
          <>
            The right structure starts with a{" "}
            <em className="italic text-brass">conversation.</em>
          </>,
        ]}
        meta={["Contact", "ThinqAsset", "Global advisory"]}
      />
      <ScrollSection chapter={{ num: "01", label: "Contact" }}>
        {!wizardOpen ? <MobileContactHero onOpenForm={openWizard} /> : null}
      </ScrollSection>
      {wizardOpen && mounted
        ? createPortal(
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
            />,
            document.body,
          )
        : null}
    </div>
  );
}
