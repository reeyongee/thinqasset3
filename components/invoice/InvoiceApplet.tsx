"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";
import QRCode from "qrcode";
import { InvoiceDocument } from "@/components/invoice/InvoiceDocument";
import { computeTotals } from "@/lib/invoice/calc";
import { createDefaultInvoice, newLineId } from "@/lib/invoice/defaults";
import type { InvoiceData, InvoiceLineItem } from "@/lib/invoice/types";
import "./invoice-applet.css";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
};

function Field({ label, value, onChange, multiline, rows = 3 }: FieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="inv-field" htmlFor={id}>
      <span className="inv-field__label">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          className="inv-field__input"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          className="inv-field__input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inv-switch">
      <span className="inv-switch__label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={checked ? "inv-switch__track is-on" : "inv-switch__track"}
        onClick={() => onChange(!checked)}
      >
        <span className="inv-switch__thumb" />
      </button>
    </label>
  );
}

function FileField({
  label,
  accept,
  onFile,
  onClear,
  hasValue,
  hint,
}: {
  label: string;
  accept: string;
  onFile: (dataUrl: string) => void;
  onClear: () => void;
  hasValue: boolean;
  hint?: string;
}) {
  return (
    <div className="inv-file">
      <span className="inv-field__label">{label}</span>
      {hint ? <p className="inv-file__hint">{hint}</p> : null}
      <div className="inv-file__row">
        <label className="inv-btn inv-btn--small inv-file__pick">
          {hasValue ? "Replace" : "Upload"}
          <input
            type="file"
            accept={accept}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === "string") onFile(reader.result);
              };
              reader.readAsDataURL(file);
              e.target.value = "";
            }}
          />
        </label>
        {hasValue ? (
          <button type="button" className="inv-btn inv-btn--small" onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

function updateLine(
  items: InvoiceLineItem[],
  id: string,
  patch: Partial<InvoiceLineItem>,
): InvoiceLineItem[] {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

/** Map trackpad horizontal swipe to vertical scroll inside a column. */
function useColumnWheel(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const mostlyHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (mostlyHorizontal && e.deltaX !== 0) {
        e.preventDefault();
        el.scrollTop += e.deltaX;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref]);
}

export function InvoiceApplet() {
  const [data, setData] = useState<InvoiceData>(() => createDefaultInvoice());
  const [qrSrc, setQrSrc] = useState("/invoice/qr-default.png");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.62);

  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  useColumnWheel(leftColRef);
  useColumnWheel(rightColRef);

  useEffect(() => {
    if (data.qrImageDataUrl) {
      setQrSrc(data.qrImageDataUrl);
      return;
    }
    if (!data.scanToPayEnabled) return;
    let cancelled = false;
    const url = data.qrUrl.trim() || "https://www.thinqasset.com";
    QRCode.toDataURL(url, { margin: 1, width: 256 })
      .then((src) => {
        if (!cancelled) setQrSrc(src);
      })
      .catch(() => {
        if (!cancelled) setQrSrc("/invoice/qr-default.png");
      });
    return () => {
      cancelled = true;
    };
  }, [data.qrUrl, data.qrImageDataUrl, data.scanToPayEnabled]);

  useEffect(() => {
    if (!data.autoTotals) return;
    const t = computeTotals(data);
    const vatPercents = [...new Set(data.lineItems.map((i) => i.vatPercent))];
    const vatLabel =
      vatPercents.length === 1 ? `VAT (${vatPercents[0]}%)` : "VAT";
    setData((prev) => {
      if (
        prev.subtotal === t.subtotalLabel &&
        prev.vatAmount === t.vatAmountLabel &&
        prev.total === t.totalLabel &&
        prev.dueAmount === t.dueAmountLabel &&
        prev.vatLabel === vatLabel
      ) {
        return prev;
      }
      return {
        ...prev,
        subtotal: t.subtotalLabel,
        vatAmount: t.vatAmountLabel,
        total: t.totalLabel,
        dueAmount: t.dueAmountLabel,
        vatLabel,
      };
    });
  }, [data.autoTotals, data.lineItems, data.currency, data.vatEnabled]);

  useEffect(() => {
    if (!previewOpen) return;
    function fit() {
      const bar = 56;
      const pad = 32;
      const availH = window.innerHeight - bar - pad;
      const availW = Math.min(window.innerWidth * 0.92, 900) - pad;
      // A4 @ 96dpi CSS px
      const pageW = 794;
      const pageH = 1123;
      const scale = Math.min(1, availW / pageW, availH / pageH);
      setPreviewScale(Math.max(0.32, scale));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [previewOpen]);

  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewOpen]);

  const patch = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const filename = useMemo(
    () => `${data.invoiceNumber || "invoice"}.pdf`.replace(/[^\w.-]+/g, "_"),
    [data.invoiceNumber],
  );

  async function downloadPdf() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/invoice/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
          hint?: string;
        } | null;
        throw new Error(
          [payload?.error, payload?.hint].filter(Boolean).join(" — ") ||
            `PDF failed (${res.status})`,
        );
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inv-applet">
      <header className="inv-applet__top" data-transition-item>
        <div>
          <h1 data-transition-text="headline" className="inv-applet__title">
            Invoice generator
          </h1>
          <p data-transition-text="body" className="inv-applet__lede">
            Fill every field, then open the preview or download the PDF.
          </p>
        </div>
        <div className="inv-applet__actions">
          <button
            type="button"
            className="inv-btn inv-btn--primary"
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </button>
          <button
            type="button"
            className="inv-btn"
            disabled={busy}
            onClick={() => void downloadPdf()}
          >
            {busy ? "Generating…" : "Download PDF"}
          </button>
          <button
            type="button"
            className="inv-btn"
            disabled={busy}
            onClick={() => {
              setData(createDefaultInvoice());
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
      </header>
      {error ? <p className="inv-applet__error">{error}</p> : null}

      <div className="inv-applet__columns" data-transition-item>
        <div className="inv-applet__col" ref={leftColRef}>
          <section className="inv-section">
            <h2 className="inv-section__title">Paper & toggles</h2>
            <div className="inv-toggle">
              <button
                type="button"
                className={
                  data.paper === "ivory" ? "inv-toggle__btn is-active" : "inv-toggle__btn"
                }
                onClick={() => patch("paper", "ivory")}
              >
                Ivory
              </button>
              <button
                type="button"
                className={
                  data.paper === "white" ? "inv-toggle__btn is-active" : "inv-toggle__btn"
                }
                onClick={() => patch("paper", "white")}
              >
                White
              </button>
            </div>
            <Switch
              label="VAT"
              checked={data.vatEnabled}
              onChange={(v) => patch("vatEnabled", v)}
            />
            <Switch
              label="Scan to pay"
              checked={data.scanToPayEnabled}
              onChange={(v) => patch("scanToPayEnabled", v)}
            />
            <label className="inv-check">
              <input
                type="checkbox"
                checked={data.autoTotals}
                onChange={(e) => patch("autoTotals", e.target.checked)}
              />
              Auto-calculate totals from line items
            </label>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Brand</h2>
            <div className="inv-grid">
              <Field label="Brand name" value={data.brandName} onChange={(v) => patch("brandName", v)} />
              <Field label="Brand subtitle" value={data.brandSub} onChange={(v) => patch("brandSub", v)} />
              <Field label="Document title" value={data.docTitle} onChange={(v) => patch("docTitle", v)} />
              <Field label="Currency" value={data.currency} onChange={(v) => patch("currency", v)} />
            </div>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Issuer & contact</h2>
            <div className="inv-grid">
              <Field label="Issuer name" value={data.issuerName} onChange={(v) => patch("issuerName", v)} />
              <Field
                label="Issuer address"
                value={data.issuerAddress}
                onChange={(v) => patch("issuerAddress", v)}
                multiline
              />
              <Field label="Phone" value={data.contactPhone} onChange={(v) => patch("contactPhone", v)} />
              <Field label="Email" value={data.contactEmail} onChange={(v) => patch("contactEmail", v)} />
              <Field label="Website" value={data.contactWeb} onChange={(v) => patch("contactWeb", v)} />
            </div>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Bill / ship</h2>
            <div className="inv-grid">
              <Field label="Bill to name" value={data.billToName} onChange={(v) => patch("billToName", v)} />
              <Field
                label="Bill to address"
                value={data.billToAddress}
                onChange={(v) => patch("billToAddress", v)}
                multiline
              />
              <Field label="Ship to name" value={data.shipToName} onChange={(v) => patch("shipToName", v)} />
              <Field
                label="Ship to address"
                value={data.shipToAddress}
                onChange={(v) => patch("shipToAddress", v)}
                multiline
              />
            </div>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Summary</h2>
            <div className="inv-grid">
              <Field
                label="Due amount"
                value={data.dueAmount}
                onChange={(v) =>
                  setData((prev) => ({ ...prev, dueAmount: v, autoTotals: false }))
                }
              />
              <Field label="Due date" value={data.dueDate} onChange={(v) => patch("dueDate", v)} />
              <Field
                label="Invoice #"
                value={data.invoiceNumber}
                onChange={(v) => patch("invoiceNumber", v)}
              />
              <Field
                label="Invoice date"
                value={data.invoiceDate}
                onChange={(v) => patch("invoiceDate", v)}
              />
            </div>
          </section>
        </div>

        <div className="inv-applet__col" ref={rightColRef}>
          <section className="inv-section">
            <div className="inv-section__row">
              <h2 className="inv-section__title">Line items</h2>
              <button
                type="button"
                className="inv-btn inv-btn--small"
                onClick={() =>
                  patch("lineItems", [
                    ...data.lineItems,
                    {
                      id: newLineId(),
                      description: "New line item",
                      qty: 1,
                      rate: 0,
                      discount: "—",
                      vatPercent: 5,
                    },
                  ])
                }
              >
                Add line
              </button>
            </div>
            <div className="inv-lines">
              {data.lineItems.map((item, index) => (
                <div className="inv-line" key={item.id}>
                  <div className="inv-line__head">
                    <span>#{index + 1}</span>
                    <button
                      type="button"
                      className="inv-btn inv-btn--small"
                      disabled={data.lineItems.length <= 1}
                      onClick={() =>
                        patch(
                          "lineItems",
                          data.lineItems.filter((l) => l.id !== item.id),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <Field
                    label="Description"
                    value={item.description}
                    onChange={(v) =>
                      patch(
                        "lineItems",
                        updateLine(data.lineItems, item.id, { description: v }),
                      )
                    }
                  />
                  <div className="inv-grid inv-grid--4">
                    <label className="inv-field">
                      <span className="inv-field__label">Qty</span>
                      <input
                        className="inv-field__input"
                        type="number"
                        min={0}
                        step={1}
                        value={item.qty}
                        onChange={(e) =>
                          patch(
                            "lineItems",
                            updateLine(data.lineItems, item.id, {
                              qty: Number(e.target.value) || 0,
                            }),
                          )
                        }
                      />
                    </label>
                    <label className="inv-field">
                      <span className="inv-field__label">Rate</span>
                      <input
                        className="inv-field__input"
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.rate}
                        onChange={(e) =>
                          patch(
                            "lineItems",
                            updateLine(data.lineItems, item.id, {
                              rate: Number(e.target.value) || 0,
                            }),
                          )
                        }
                      />
                    </label>
                    <Field
                      label="Discount"
                      value={item.discount}
                      onChange={(v) =>
                        patch(
                          "lineItems",
                          updateLine(data.lineItems, item.id, { discount: v }),
                        )
                      }
                    />
                    {data.vatEnabled ? (
                      <label className="inv-field">
                        <span className="inv-field__label">VAT %</span>
                        <input
                          className="inv-field__input"
                          type="number"
                          min={0}
                          step={0.1}
                          value={item.vatPercent}
                          onChange={(e) =>
                            patch(
                              "lineItems",
                              updateLine(data.lineItems, item.id, {
                                vatPercent: Number(e.target.value) || 0,
                              }),
                            )
                          }
                        />
                      </label>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Totals & notes</h2>
            <div className="inv-grid">
              <Field
                label="Payment method"
                value={data.paymentMethod}
                onChange={(v) => patch("paymentMethod", v)}
              />
              <Field
                label="Amount in words"
                value={data.amountInWords}
                onChange={(v) => patch("amountInWords", v)}
              />
              <Field
                label="Subtotal"
                value={data.subtotal}
                onChange={(v) =>
                  setData((prev) => ({ ...prev, subtotal: v, autoTotals: false }))
                }
              />
              {data.vatEnabled ? (
                <>
                  <Field
                    label="VAT label"
                    value={data.vatLabel}
                    onChange={(v) => patch("vatLabel", v)}
                  />
                  <Field
                    label="VAT amount"
                    value={data.vatAmount}
                    onChange={(v) =>
                      setData((prev) => ({
                        ...prev,
                        vatAmount: v,
                        autoTotals: false,
                      }))
                    }
                  />
                </>
              ) : null}
              <Field
                label="Total"
                value={data.total}
                onChange={(v) =>
                  setData((prev) => ({ ...prev, total: v, autoTotals: false }))
                }
              />
            </div>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Signatures</h2>
            <div className="inv-grid">
              <Field
                label="Authorized name"
                value={data.authorizedName}
                onChange={(v) => patch("authorizedName", v)}
              />
              <FileField
                label="Authorized signature (optional)"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                hasValue={Boolean(data.authorizedSignatureDataUrl)}
                hint="Upload a signature image to place above the authorized line."
                onFile={(dataUrl) => patch("authorizedSignatureDataUrl", dataUrl)}
                onClear={() => patch("authorizedSignatureDataUrl", "")}
              />
            </div>
          </section>

          <section className="inv-section">
            <h2 className="inv-section__title">Payment</h2>
            <div className="inv-grid">
              <Field label="Bank name" value={data.bankName} onChange={(v) => patch("bankName", v)} />
              <Field
                label="Account name"
                value={data.accountName}
                onChange={(v) => patch("accountName", v)}
              />
              <Field
                label="Account number"
                value={data.accountNumber}
                onChange={(v) => patch("accountNumber", v)}
              />
              <Field label="SWIFT" value={data.swiftCode} onChange={(v) => patch("swiftCode", v)} />
              <Field
                label="Bank address"
                value={data.bankAddress}
                onChange={(v) => patch("bankAddress", v)}
                multiline
                rows={2}
              />
            </div>
          </section>

          {data.scanToPayEnabled ? (
            <section className="inv-section">
              <h2 className="inv-section__title">Scan to pay</h2>
              <div className="inv-grid">
                <Field label="QR URL" value={data.qrUrl} onChange={(v) => patch("qrUrl", v)} />
                <FileField
                  label="QR image (optional upload)"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  hasValue={Boolean(data.qrImageDataUrl)}
                  hint="If uploaded, this image replaces the generated QR."
                  onFile={(dataUrl) => patch("qrImageDataUrl", dataUrl)}
                  onClear={() => patch("qrImageDataUrl", "")}
                />
                <Field label="Scan name" value={data.scanName} onChange={(v) => patch("scanName", v)} />
                <Field
                  label="License label"
                  value={data.licenseLabel}
                  onChange={(v) => patch("licenseLabel", v)}
                />
                <Field
                  label="License value"
                  value={data.licenseValue}
                  onChange={(v) => patch("licenseValue", v)}
                />
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <div
        className={previewOpen ? "inv-drawer is-open" : "inv-drawer"}
        aria-hidden={!previewOpen}
      >
        <button
          type="button"
          className="inv-drawer__backdrop"
          aria-label="Close preview"
          tabIndex={previewOpen ? 0 : -1}
          onClick={() => setPreviewOpen(false)}
        />
        <aside
          className="inv-drawer__panel"
          role="dialog"
          aria-label="Invoice preview"
          style={
            {
              ["--inv-preview-scale"]: String(previewScale),
              ["--inv-drawer-width"]: `${Math.ceil(794 * previewScale + 40)}px`,
            } as CSSProperties
          }
        >
          <div className="inv-drawer__bar">
            <span className="inv-drawer__title">Preview</span>
            <div className="inv-drawer__bar-actions">
              <button
                type="button"
                className="inv-btn inv-btn--small"
                disabled={busy}
                onClick={() => void downloadPdf()}
              >
                {busy ? "…" : "Download"}
              </button>
              <button
                type="button"
                className="inv-drawer__close"
                aria-label="Close preview"
                onClick={() => setPreviewOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
          <div className="inv-drawer__frame">
            <div
              className="inv-drawer__scale"
              style={{
                width: `${794 * previewScale}px`,
                height: `${1123 * previewScale}px`,
              }}
            >
              <div
                className="inv-drawer__page"
                style={{ transform: `scale(${previewScale})` }}
              >
                <InvoiceDocument data={data} mode="preview" qrSrc={qrSrc} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
