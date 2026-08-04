import { ServiceOfferingDetail } from "@/components/services/offering-detail/ServiceOfferingDetail";
import "@/components/services/services.css";
import type { SlugOfferingData } from "./types";

type DesktopOfferingDetailProps = {
  data: SlugOfferingData;
};

export function DesktopOfferingDetail({ data }: DesktopOfferingDetailProps) {
  return (
    <ServiceOfferingDetail
      content={data.content}
      pillar={data.pillar}
      offeringIndex={data.offeringIndex}
    />
  );
}
