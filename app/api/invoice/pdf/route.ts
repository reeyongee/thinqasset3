import { NextResponse } from "next/server";
import type { InvoiceData } from "@/lib/invoice/types";
import { renderInvoicePdf } from "@/lib/invoice/renderPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isInvoiceData(body: unknown): body is InvoiceData {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return typeof b.invoiceNumber === "string" && Array.isArray(b.lineItems);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isInvoiceData(body)) {
    return NextResponse.json({ error: "Invalid invoice payload" }, { status: 400 });
  }

  try {
    const pdf = await renderInvoicePdf(body);
    const filename = `${body.invoiceNumber || "invoice"}.pdf`.replace(
      /[^\w.-]+/g,
      "_",
    );
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[invoice/pdf]", err);
    const message =
      err instanceof Error ? err.message : "PDF generation failed";
    return NextResponse.json(
      {
        error: message,
        hint: "Ensure Chromium is installed: npx playwright install chromium",
      },
      { status: 500 },
    );
  }
}
