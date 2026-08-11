import type { Metadata } from "next";
import { InvoiceApplet } from "@/components/invoice/InvoiceApplet";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Invoice generator",
  description: "Generate a ThinqAsset A4 invoice PDF from editable fields.",
  path: "/invoice",
  robots: noIndexRobots,
});

export default function InvoicePage() {
  return (
    <section data-transition-page className="inv-page">
      <InvoiceApplet />
    </section>
  );
}
