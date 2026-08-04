"use client";

import { useIsPhoneViewport } from "@/components/mobile-home/useIsPhoneViewport";
import { DesktopContact } from "./DesktopContact";
import { MobileContactPage } from "./MobileContactPage";

export function ContactViewportGate({ startWithForm = false }: { startWithForm?: boolean }) {
  const isPhone = useIsPhoneViewport();

  if (isPhone) {
    return <MobileContactPage startWithForm={startWithForm} />;
  }

  return <DesktopContact startWithForm={startWithForm} />;
}
