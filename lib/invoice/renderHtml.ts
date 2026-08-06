import { readFileSync } from "fs";
import path from "path";
import QRCode from "qrcode";
import type { InvoiceData } from "./types";
import { formatAmount, lineTotal, withComputedTotals } from "./calc";

const ROOT = process.cwd();

function loadCss(): string {
  const cssPath = path.join(ROOT, "components/invoice/invoice-document.css");
  return readFileSync(cssPath, "utf8");
}

function loadAssetDataUri(relFromPublic: string, mime: string): string {
  const file = path.join(ROOT, "public", relFromPublic);
  const buf = readFileSync(file);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function loadFontDataUri(relFromPublic: string): string {
  return loadAssetDataUri(relFromPublic, "font/woff2");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\n/g, "<br />");
}

function sparkSvg(className: string): string {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" /></svg>`;
}

export async function renderInvoiceHtml(raw: InvoiceData): Promise<string> {
  const data = withComputedTotals(raw);
  const css = loadCss();
  const mark = loadAssetDataUri("invoice/header-mark.png", "image/png");
  const qrPng =
    data.qrImageDataUrl ||
    (await QRCode.toDataURL(data.qrUrl || "https://www.thinqasset.com", {
      margin: 1,
      width: 256,
      errorCorrectionLevel: "M",
    }));
  const fontReg = loadFontDataUri("fonts/lp-saturnia/regular.woff2");
  const fontBold = loadFontDataUri("fonts/lp-saturnia/bold.woff2");
  const paper = data.paper === "white" ? "#ffffff" : "#fbfaf7";
  const paperClass =
    data.paper === "white" ? "invoice-doc--white" : "invoice-doc--ivory";

  const rows = data.lineItems
    .map((item, i) => {
      const vatCell = data.vatEnabled
        ? `<td class="num">${item.vatPercent}%</td>`
        : "";
      return `
      <tr>
        <td class="ctr">${i + 1}</td>
        <td>${escapeHtml(item.description)}</td>
        <td class="ctr">${item.qty}</td>
        <td class="num">${formatAmount(item.rate)}</td>
        <td class="num">${escapeHtml(item.discount || "—")}</td>
        ${vatCell}
        <td class="num">${formatAmount(lineTotal(item, data.vatEnabled))}</td>
      </tr>`;
    })
    .join("");

  const vatHeader = data.vatEnabled ? `<th class="num">VAT</th>` : "";
  const vatCol = data.vatEnabled ? `<col class="c-gst" />` : "";
  const vatTotalRow = data.vatEnabled
    ? `<tr><td class="muted">${escapeHtml(data.vatLabel)}</td><td>${escapeHtml(data.vatAmount)}</td></tr>`
    : "";
  const sigImg = data.authorizedSignatureDataUrl
    ? `<img class="sig__image" src="${data.authorizedSignatureDataUrl}" alt="Authorized signature" />`
    : "";
  const scanBlock = data.scanToPayEnabled
    ? `
          <div class="pay__col">
            <div class="pay__head">
              <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg></div>
              <div class="pay__title">Scan to Pay</div>
            </div>
            <div class="scan">
              <div class="scan__qr"><img src="${qrPng}" alt="QR code" /></div>
              <div class="scan__meta">
                <strong>Name</strong>${escapeHtml(data.scanName)}<br /><br />
                <strong>${escapeHtml(data.licenseLabel)}</strong>${escapeHtml(data.licenseValue)}
              </div>
            </div>
          </div>`
    : "";
  const payClass = data.scanToPayEnabled ? "pay" : "pay pay--solo";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Invoice</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
@font-face {
  font-family: "LP Saturnia";
  font-style: normal;
  font-weight: 400;
  src: url("${fontReg}") format("woff2");
}
@font-face {
  font-family: "LP Saturnia";
  font-style: normal;
  font-weight: 700;
  src: url("${fontBold}") format("woff2");
}
${css}
html, body {
  margin: 0;
  padding: 0;
  background: none;
  width: 210mm;
  height: 297mm;
}
.invoice-doc .sheet {
  margin: 0;
  box-shadow: none;
}
.invoice-doc {
  --paper: ${paper};
}
</style>
</head>
<body>
<div class="invoice-doc ${paperClass}">
  <section class="sheet" aria-label="ThinqAsset invoice">
    <div class="sheet-footer-band" aria-hidden="true"></div>
    <div class="sheet-paper">
      <div class="rail" aria-hidden="true">${sparkSvg("rail__spark")}</div>
      <div class="wm" aria-hidden="true"><img src="${mark}" alt="" /></div>
      <div class="sheet-inner">
        <header class="header">
          <div class="brand">
            <img class="brand__mark" src="${mark}" alt="" />
            <div class="brand__text">
              <div class="brand__name">${escapeHtml(data.brandName)}</div>
              <div class="brand__sub">${escapeHtml(data.brandSub)}</div>
            </div>
          </div>
          <div class="doc-title">
            <div class="doc-title__rule" aria-hidden="true"></div>
            <div class="doc-title__stack">
              <div class="doc-title__word">${escapeHtml(data.docTitle)}</div>
              ${sparkSvg("spark")}
            </div>
          </div>
        </header>

        <div class="info-grid">
          <div class="info-cell">
            <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18"/><path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-6h6v6"/><path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg></div>
            <div>
              <div class="info-cell__label">${escapeHtml(data.issuerName)}</div>
              <div class="info-cell__body">${nl2br(data.issuerAddress)}</div>
            </div>
          </div>
          <div class="info-cell">
            <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg></div>
            <div>
              <div class="info-cell__label">Contact</div>
              <div class="info-cell__body">${escapeHtml(data.contactPhone)}<br />${escapeHtml(data.contactEmail)}<br />${escapeHtml(data.contactWeb)}</div>
            </div>
          </div>
          <div class="info-cell">
            <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            <div>
              <div class="info-cell__label">Bill To</div>
              <div class="info-cell__body"><strong>${escapeHtml(data.billToName)}</strong><br />${nl2br(data.billToAddress)}</div>
            </div>
          </div>
          <div class="info-cell">
            <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
            <div>
              <div class="info-cell__label">Ship To</div>
              <div class="info-cell__body"><strong>${escapeHtml(data.shipToName)}</strong><br />${nl2br(data.shipToAddress)}</div>
            </div>
          </div>
        </div>

        <div class="summary">
          <div class="summary__cell"><div class="summary__label">Due Amount</div><div class="summary__value">${escapeHtml(data.dueAmount)}</div></div>
          <div class="summary__cell"><div class="summary__label">Due Date</div><div class="summary__value">${escapeHtml(data.dueDate)}</div></div>
          <div class="summary__cell"><div class="summary__label">Invoice #</div><div class="summary__value">${escapeHtml(data.invoiceNumber)}</div></div>
          <div class="summary__cell"><div class="summary__label">Invoice Date</div><div class="summary__value">${escapeHtml(data.invoiceDate)}</div></div>
        </div>

        <div class="table-wrap">
          <table class="items">
            <colgroup>
              <col class="c-num" /><col class="c-desc" /><col class="c-qty" />
              <col class="c-rate" /><col class="c-dis" />${vatCol}<col class="c-tot" />
            </colgroup>
            <thead>
              <tr>
                <th class="ctr">#</th>
                <th>Description of Goods / Services</th>
                <th class="ctr">Qty.</th>
                <th class="num">Rate (${escapeHtml(data.currency)})</th>
                <th class="num">Dis.</th>
                ${vatHeader}
                <th class="num">Total (${escapeHtml(data.currency)})</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>

        <div class="below">
          <div>
            <div class="notes__block"><div class="notes__label">Payment Method</div><div class="notes__body">${escapeHtml(data.paymentMethod)}</div></div>
            <div class="notes__block"><div class="notes__label">In Words</div><div class="notes__body">${escapeHtml(data.amountInWords)}</div></div>
          </div>
          <table class="totals">
            <tr><td class="muted">Sub Total</td><td>${escapeHtml(data.subtotal)}</td></tr>
            ${vatTotalRow}
            <tr class="grand"><td>TOTAL (${escapeHtml(data.currency)})</td><td>${escapeHtml(data.total)}</td></tr>
          </table>
        </div>

        <div class="sigs">
          <div>
            <div class="sig__title">${escapeHtml(data.acceptedByLabel)}</div>
            <div class="sig__line"></div>
            <div class="sig__meta">Name:<br />Designation:<br />Date:</div>
          </div>
          <div>
            <div class="sig__title">${escapeHtml(data.authorizedLabel)}</div>
            ${sigImg}
            <div class="sig__line"></div>
            <div class="sig__meta"><strong>${escapeHtml(data.authorizedName)}</strong></div>
          </div>
        </div>

        <div class="divider" aria-hidden="true">${sparkSvg("spark")}</div>

        <div class="${payClass}">
          <div class="pay__col">
            <div class="pay__head">
              <div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18"/><path d="M4 21V10l8-5 8 5v11"/><path d="M9 21v-5h6v5"/><path d="M8 10h8"/></svg></div>
              <div class="pay__title">Payment Information</div>
            </div>
            <table class="pay-table">
              <tr><td>Bank Name</td><td>${escapeHtml(data.bankName)}</td></tr>
              <tr><td>Account Name</td><td>${escapeHtml(data.accountName)}</td></tr>
              <tr><td>Account No.</td><td>${escapeHtml(data.accountNumber)}</td></tr>
              <tr><td>SWIFT Code</td><td>${escapeHtml(data.swiftCode)}</td></tr>
              <tr><td>Bank Address</td><td>${escapeHtml(data.bankAddress)}</td></tr>
            </table>
          </div>
          ${scanBlock}
        </div>
      </div>
    </div>
  </section>
</div>
</body>
</html>`;
}
