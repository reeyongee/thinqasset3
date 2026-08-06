import type { Metadata } from "next";
import { InvoiceApplet } from "@/components/invoice/InvoiceApplet";

export const metadata: Metadata = {
  title: "Invoice generator — THINQASSET",
  description: "Generate a ThinqAsset A4 invoice PDF from editable fields.",
  robots: { index: false, follow: false },
};

export default function InvoicePage() {
  return (
    <section data-transition-page className="inv-page">
      <InvoiceApplet />
    </section>
  );
}
