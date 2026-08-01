import type { Metadata } from "next";
import { ContactViewportGate } from "@/components/mobile-contact/ContactViewportGate";

export const metadata: Metadata = {
  title: "Contact — THINQASSET",
  description:
    "Start a consultation with ThinqAsset Fund Management — fund platform, structures, and corporate infrastructure.",
};

export default function ContactPage() {
  return <ContactViewportGate />;
}
