import type { InvoiceData, InvoiceLineItem } from "./types";

export function lineNet(item: InvoiceLineItem): number {
  return item.qty * item.rate;
}

export function lineVat(item: InvoiceLineItem, vatEnabled: boolean): number {
  if (!vatEnabled) return 0;
  return lineNet(item) * (item.vatPercent / 100);
}

export function lineTotal(item: InvoiceLineItem, vatEnabled: boolean): number {
  return lineNet(item) + lineVat(item, vatEnabled);
}

export function formatMoney(n: number, currency: string): string {
  const fixed = n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency} ${fixed}`;
}

export function formatAmount(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Derive subtotal / VAT / total from line items. */
export function computeTotals(
  data: Pick<InvoiceData, "lineItems" | "currency" | "vatEnabled">,
): {
  subtotal: number;
  vat: number;
  total: number;
  subtotalLabel: string;
  vatAmountLabel: string;
  totalLabel: string;
  dueAmountLabel: string;
} {
  const subtotal = data.lineItems.reduce((sum, item) => sum + lineNet(item), 0);
  const vat = data.vatEnabled
    ? data.lineItems.reduce((sum, item) => sum + lineVat(item, true), 0)
    : 0;
  const total = subtotal + vat;
  return {
    subtotal,
    vat,
    total,
    subtotalLabel: formatMoney(subtotal, data.currency),
    vatAmountLabel: formatMoney(vat, data.currency),
    totalLabel: formatAmount(total),
    dueAmountLabel: formatMoney(total, data.currency),
  };
}

/** Apply auto totals onto a copy of invoice data when autoTotals is on. */
export function withComputedTotals(data: InvoiceData): InvoiceData {
  if (!data.autoTotals) return data;
  const t = computeTotals(data);
  const vatPercents = [...new Set(data.lineItems.map((i) => i.vatPercent))];
  const vatLabel =
    vatPercents.length === 1 ? `VAT (${vatPercents[0]}%)` : "VAT";
  return {
    ...data,
    subtotal: t.subtotalLabel,
    vatLabel,
    vatAmount: t.vatAmountLabel,
    total: t.totalLabel,
    dueAmount: t.dueAmountLabel,
  };
}
