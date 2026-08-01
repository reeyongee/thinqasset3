"use client";

import { useIsPhoneViewport } from "@/components/mobile-home/useIsPhoneViewport";
import { DesktopServices } from "./DesktopServices";
import { MobileServicesPage } from "./MobileServicesPage";

export function ServicesViewportGate() {
  const isPhone = useIsPhoneViewport();

  if (isPhone) {
    return <MobileServicesPage />;
  }

  return <DesktopServices />;
}
