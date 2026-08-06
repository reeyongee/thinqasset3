import type { InvoiceData, InvoiceLineItem } from "./types";

export function newLineId(): string {
  return `line-${Math.random().toString(36).slice(2, 10)}`;
}

export function createDefaultLineItems(): InvoiceLineItem[] {
  return [
    {
      id: newLineId(),
      description: "Advisory retainer — Q2 2024",
      qty: 1,
      rate: 10000,
      discount: "—",
      vatPercent: 5,
    },
    {
      id: newLineId(),
      description: "Structuring & documentation",
      qty: 1,
      rate: 4285.71,
      discount: "—",
      vatPercent: 5,
    },
  ];
}

export function createDefaultInvoice(): InvoiceData {
  return {
    paper: "ivory",
    brandName: "ThinqAsset",
    brandSub: "Global",
    docTitle: "Invoice",

    issuerName: "ThinqAsset Global Ltd.",
    issuerAddress: "DIFC & ADGM\nDubai, United Arab Emirates",

    contactPhone: "+971 XX XXX XXXX",
    contactEmail: "info@thinqasset.com",
    contactWeb: "www.thinqasset.com",

    billToName: "Acme Holdings Pte. Ltd.",
    billToAddress: "Level 12, Marina Gate\nDubai, United Arab Emirates",
    shipToName: "Acme Holdings Pte. Ltd.",
    shipToAddress: "Level 12, Marina Gate\nDubai, United Arab Emirates",

    dueAmount: "AED 15,000.00",
    dueDate: "21 May 2024",
    invoiceNumber: "INV-2024-051",
    invoiceDate: "21 Apr 2024",

    currency: "AED",
    lineItems: createDefaultLineItems(),

    vatEnabled: true,
    scanToPayEnabled: true,

    paymentMethod: "Bank Transfer",
    amountInWords: "Fifteen Thousand UAE Dirhams Only",

    autoTotals: true,
    subtotal: "AED 14,285.71",
    vatLabel: "VAT (5%)",
    vatAmount: "AED 714.29",
    total: "15,000.00",

    acceptedByLabel: "Accepted By",
    authorizedLabel: "Authorized Signature",
    authorizedName: "ThinqAsset Global Ltd.",
    authorizedSignatureDataUrl: "",

    bankName: "Emirates NBD",
    accountName: "ThinqAsset Global Ltd.",
    accountNumber: "000-1-234567-0",
    swiftCode: "EBILAEAD",
    bankAddress: "Baniyas Road, Deira, Dubai, UAE",

    qrUrl: "https://www.thinqasset.com",
    qrImageDataUrl: "",
    licenseLabel: "License",
    licenseValue: "TL-XXXXXXX",
    scanName: "ThinqAsset Global Ltd.",
  };
}
