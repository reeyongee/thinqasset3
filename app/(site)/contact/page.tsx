import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact — THINQASSET",
  description:
    "Start a consultation with ThinqAsset Fund Management — fund platform, structures, and corporate infrastructure.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
