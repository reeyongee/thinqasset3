"use client";

import { useIsPhoneViewport } from "@/components/mobile-home/useIsPhoneViewport";
import { DesktopOfferingDetail } from "./DesktopOfferingDetail";
import { DesktopPillarHub } from "./DesktopPillarHub";
import { MobileOfferingDetailPage } from "./MobileOfferingDetailPage";
import { MobilePillarHubPage } from "./MobilePillarHubPage";
import type { SlugPageData } from "./types";

type ServiceSlugViewportGateProps = {
  data: SlugPageData;
};

export function ServiceSlugViewportGate({ data }: ServiceSlugViewportGateProps) {
  const isPhone = useIsPhoneViewport();

  if (isPhone) {
    return data.mode === "offering" ? (
      <MobileOfferingDetailPage data={data} />
    ) : (
      <MobilePillarHubPage data={data} />
    );
  }

  return data.mode === "offering" ? (
    <DesktopOfferingDetail data={data} />
  ) : (
    <DesktopPillarHub data={data} />
  );
}
