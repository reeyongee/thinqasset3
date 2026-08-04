import type { Metadata } from "next";
import { ContactViewportGate } from "@/components/mobile-contact/ContactViewportGate";

export const metadata: Metadata = {
  title: "Contact — THINQASSET",
  description:
    "Start a consultation with ThinqAsset Fund Management — fund platform, structures, and corporate infrastructure.",
};

type ContactPageProps = {
  searchParams: Promise<{ form?: string | string[] }>;
};

function wantsFormOpen(form: string | string[] | undefined) {
  const value = Array.isArray(form) ? form[0] : form;
  return value === "1" || value === "open" || value === "true";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  return <ContactViewportGate startWithForm={wantsFormOpen(params.form)} />;
}
