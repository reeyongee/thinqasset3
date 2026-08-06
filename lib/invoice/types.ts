export type InvoicePaper = "ivory" | "white";

export type InvoiceLineItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
  discount: string;
  vatPercent: number;
};

export type InvoiceData = {
  paper: InvoicePaper;
  brandName: string;
  brandSub: string;
  docTitle: string;

  issuerName: string;
  issuerAddress: string;

  contactPhone: string;
  contactEmail: string;
  contactWeb: string;

  billToName: string;
  billToAddress: string;
  shipToName: string;
  shipToAddress: string;

  dueAmount: string;
  dueDate: string;
  invoiceNumber: string;
  invoiceDate: string;

  currency: string;
  lineItems: InvoiceLineItem[];

  /** When false, VAT column/row are hidden and totals exclude VAT. */
  vatEnabled: boolean;
  /** When false, Scan to Pay block is omitted. */
  scanToPayEnabled: boolean;

  paymentMethod: string;
  amountInWords: string;

  /** When true, subtotal/vat/total are derived from line items. */
  autoTotals: boolean;
  subtotal: string;
  vatLabel: string;
  vatAmount: string;
  total: string;

  acceptedByLabel: string;
  authorizedLabel: string;
  authorizedName: string;
  /** Optional data-URL of authorized signature image. */
  authorizedSignatureDataUrl: string;

  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
  bankAddress: string;

  qrUrl: string;
  /** Optional uploaded QR image (data URL). Overrides generated QR when set. */
  qrImageDataUrl: string;
  licenseLabel: string;
  licenseValue: string;
  scanName: string;
};
