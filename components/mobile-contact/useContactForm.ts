"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import type { ExpertiseOption } from "@/components/contact/constants";
import {
  lockPageScroll,
  unlockPageScroll,
} from "@/lib/scroll/lockPageScroll";
import { DEFAULT_COUNTRY_CODE } from "@/lib/contact/phone";

export type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  expertise: ExpertiseOption | "";
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: "",
  expertise: "",
  message: "",
};

export function useContactForm() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);

  useEffect(() => {
    if (wizardOpen) {
      document.body.classList.add("contact-step-2");
      lockPageScroll();
    } else {
      document.body.classList.remove("contact-step-2");
      unlockPageScroll();
    }

    return () => {
      document.body.classList.remove("contact-step-2");
      unlockPageScroll();
    };
  }, [wizardOpen]);

  const resetForm = useCallback(() => {
    setStep(1);
    setShowSuccess(false);
    setForm(INITIAL_FORM);
  }, []);

  const openWizard = useCallback(() => {
    resetForm();
    setWizardOpen(true);
  }, [resetForm]);

  const closeWizard = useCallback(() => {
    setWizardOpen(false);
    resetForm();
  }, [resetForm]);

  const updateField = useCallback(
    <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
      setForm((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const handleProfileContinue = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    setStep(2);
  }, []);

  const handleExpertiseContinue = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.expertise) return;
    setStep(3);
  }, [form.expertise]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    setShowSuccess(true);
  }, []);

  const goBack = useCallback(() => {
    if (showSuccess) {
      setShowSuccess(false);
      return;
    }
    if (step > 1) {
      setStep((current) => current - 1);
    } else {
      closeWizard();
    }
  }, [closeWizard, showSuccess, step]);

  return {
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
  };
}
