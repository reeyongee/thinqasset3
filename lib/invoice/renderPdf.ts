import { chromium } from "playwright";
import type { InvoiceData } from "@/lib/invoice/types";
import { renderInvoiceHtml } from "@/lib/invoice/renderHtml";

export async function renderInvoicePdf(data: InvoiceData): Promise<Buffer> {
  const html = await renderInvoiceHtml(data);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({
      width: "210mm",
      height: "297mm",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
