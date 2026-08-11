import type { Metadata } from "next";
import { ServicesViewportGate } from "@/components/mobile-services/ServicesViewportGate";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Global regulated fund platform, institutional structures across DIFC, Mauritius and Luxembourg, and corporate & institutional services from ThinqAsset.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesViewportGate />;
}
