import type { CSSProperties } from "react";
import type { InvoiceData } from "@/lib/invoice/types";
import { formatAmount, lineTotal, withComputedTotals } from "@/lib/invoice/calc";
import "./invoice-document.css";

const SPARK_PATH =
  "M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z";

function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={SPARK_PATH} />
    </svg>
  );
}

function Multiline({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </>
  );
}

type InvoiceDocumentProps = {
  data: InvoiceData;
  /** Live applet preview vs print/PDF source. */
  mode?: "preview" | "print";
  markSrc?: string;
  qrSrc?: string;
  className?: string;
  style?: CSSProperties;
};

export function InvoiceDocument({
  data: raw,
  mode = "preview",
  markSrc = "/invoice/header-mark.png",
  qrSrc,
  className = "",
  style,
}: InvoiceDocumentProps) {
  const data = withComputedTotals(raw);
  const paperClass =
    data.paper === "white" ? "invoice-doc--white" : "invoice-doc--ivory";
  const modeClass = mode === "preview" ? "invoice-doc--preview" : "";
  const resolvedQr =
    data.qrImageDataUrl ||
    qrSrc ||
    "/invoice/qr-default.png";

  return (
    <div
      className={`invoice-doc ${paperClass} ${modeClass} ${className}`.trim()}
      style={style}
    >
      <section className="sheet" aria-label="ThinqAsset invoice">
        <div className="sheet-footer-band" aria-hidden />
        <div className="sheet-paper">
          <div className="rail" aria-hidden>
            <Spark className="rail__spark" />
          </div>
          <div className="wm" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} alt="" />
          </div>

          <div className="sheet-inner">
            <header className="header">
              <div className="brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="brand__mark" src={markSrc} alt="" />
                <div className="brand__text">
                  <div className="brand__name">{data.brandName}</div>
                  <div className="brand__sub">{data.brandSub}</div>
                </div>
              </div>
              <div className="doc-title">
                <div className="doc-title__rule" aria-hidden />
                <div className="doc-title__stack">
                  <div className="doc-title__word">{data.docTitle}</div>
                  <Spark className="spark" />
                </div>
              </div>
            </header>

            <div className="info-grid">
              <div className="info-cell">
                <div className="icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 21h18" />
                    <path d="M5 21V8l7-4 7 4v13" />
                    <path d="M9 21v-6h6v6" />
                    <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
                  </svg>
                </div>
                <div>
                  <div className="info-cell__label">{data.issuerName}</div>
                  <div className="info-cell__body">
                    <Multiline text={data.issuerAddress} />
                  </div>
                </div>
              </div>

              <div className="info-cell">
                <div className="icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="info-cell__label">Contact</div>
                  <div className="info-cell__body">
                    {data.contactPhone}
                    <br />
                    {data.contactEmail}
                    <br />
                    {data.contactWeb}
                  </div>
                </div>
              </div>

              <div className="info-cell">
                <div className="icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <div className="info-cell__label">Bill To</div>
                  <div className="info-cell__body">
                    <strong>{data.billToName}</strong>
                    <br />
                    <Multiline text={data.billToAddress} />
                  </div>
                </div>
              </div>

              <div className="info-cell">
                <div className="icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="info-cell__label">Ship To</div>
                  <div className="info-cell__body">
                    <strong>{data.shipToName}</strong>
                    <br />
                    <Multiline text={data.shipToAddress} />
                  </div>
                </div>
              </div>
            </div>

            <div className="summary">
              <div className="summary__cell">
                <div className="summary__label">Due Amount</div>
                <div className="summary__value">{data.dueAmount}</div>
              </div>
              <div className="summary__cell">
                <div className="summary__label">Due Date</div>
                <div className="summary__value">{data.dueDate}</div>
              </div>
              <div className="summary__cell">
                <div className="summary__label">Invoice #</div>
                <div className="summary__value">{data.invoiceNumber}</div>
              </div>
              <div className="summary__cell">
                <div className="summary__label">Invoice Date</div>
                <div className="summary__value">{data.invoiceDate}</div>
              </div>
            </div>

            <div className="table-wrap">
              <table className="items">
                <colgroup>
                  <col className="c-num" />
                  <col className="c-desc" />
                  <col className="c-qty" />
                  <col className="c-rate" />
                  <col className="c-dis" />
                  {data.vatEnabled ? <col className="c-gst" /> : null}
                  <col className="c-tot" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="ctr">#</th>
                    <th>Description of Goods / Services</th>
                    <th className="ctr">Qty.</th>
                    <th className="num">Rate ({data.currency})</th>
                    <th className="num">Dis.</th>
                    {data.vatEnabled ? <th className="num">VAT</th> : null}
                    <th className="num">Total ({data.currency})</th>
                  </tr>
                </thead>
                <tbody>
                  {data.lineItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="ctr">{index + 1}</td>
                      <td>{item.description}</td>
                      <td className="ctr">{item.qty}</td>
                      <td className="num">{formatAmount(item.rate)}</td>
                      <td className="num">{item.discount || "—"}</td>
                      {data.vatEnabled ? (
                        <td className="num">{item.vatPercent}%</td>
                      ) : null}
                      <td className="num">
                        {formatAmount(lineTotal(item, data.vatEnabled))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="below">
              <div>
                <div className="notes__block">
                  <div className="notes__label">Payment Method</div>
                  <div className="notes__body">{data.paymentMethod}</div>
                </div>
                <div className="notes__block">
                  <div className="notes__label">In Words</div>
                  <div className="notes__body">{data.amountInWords}</div>
                </div>
              </div>
              <table className="totals">
                <tbody>
                  <tr>
                    <td className="muted">Sub Total</td>
                    <td>{data.subtotal}</td>
                  </tr>
                  {data.vatEnabled ? (
                    <tr>
                      <td className="muted">{data.vatLabel}</td>
                      <td>{data.vatAmount}</td>
                    </tr>
                  ) : null}
                  <tr className="grand">
                    <td>TOTAL ({data.currency})</td>
                    <td>{data.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sigs">
              <div>
                <div className="sig__title">{data.acceptedByLabel}</div>
                <div className="sig__line" />
                <div className="sig__meta">
                  Name:
                  <br />
                  Designation:
                  <br />
                  Date:
                </div>
              </div>
              <div>
                <div className="sig__title">{data.authorizedLabel}</div>
                {data.authorizedSignatureDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="sig__image"
                    src={data.authorizedSignatureDataUrl}
                    alt="Authorized signature"
                  />
                ) : null}
                <div className="sig__line" />
                <div className="sig__meta">
                  <strong>{data.authorizedName}</strong>
                </div>
              </div>
            </div>

            <div className="divider" aria-hidden>
              <Spark className="spark" />
            </div>

            <div
              className={
                data.scanToPayEnabled ? "pay" : "pay pay--solo"
              }
            >
              <div className="pay__col">
                <div className="pay__head">
                  <div className="icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 21h18" />
                      <path d="M4 21V10l8-5 8 5v11" />
                      <path d="M9 21v-5h6v5" />
                      <path d="M8 10h8" />
                    </svg>
                  </div>
                  <div className="pay__title">Payment Information</div>
                </div>
                <table className="pay-table">
                  <tbody>
                    <tr>
                      <td>Bank Name</td>
                      <td>{data.bankName}</td>
                    </tr>
                    <tr>
                      <td>Account Name</td>
                      <td>{data.accountName}</td>
                    </tr>
                    <tr>
                      <td>Account No.</td>
                      <td>{data.accountNumber}</td>
                    </tr>
                    <tr>
                      <td>SWIFT Code</td>
                      <td>{data.swiftCode}</td>
                    </tr>
                    <tr>
                      <td>Bank Address</td>
                      <td>{data.bankAddress}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {data.scanToPayEnabled ? (
                <div className="pay__col">
                  <div className="pay__head">
                    <div className="icon" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M3 12h18" />
                        <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
                      </svg>
                    </div>
                    <div className="pay__title">Scan to Pay</div>
                  </div>
                  <div className="scan">
                    <div className="scan__qr">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={resolvedQr} alt="QR code" />
                    </div>
                    <div className="scan__meta">
                      <strong>Name</strong>
                      {data.scanName}
                      <br />
                      <br />
                      <strong>{data.licenseLabel}</strong>
                      {data.licenseValue}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
