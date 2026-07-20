export const FOOTER_TAGLINE =
  "Connecting the Middle East with global investment opportunities through tailored strategies and institutional-grade service.";

export const FOOTER_EMAIL = "info@thinqasset.com";

export const FOOTER_MENU_COLUMNS = [
  [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ],
  [
    { label: "Why ThinqAsset", href: "/#why-thinqasset" },
    { label: "Global Footprint", href: "/#global-footprint" },
  ],
  [
    { label: "Consultation", href: "/contact" },
    { label: "Contact", href: "mailto:info@thinqasset.com" },
  ],
] as const;

export const FOOTER_SOCIAL_HEADING = "Follow ThinqAsset";

export const FOOTER_SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/thinqasset",
    icon: "linkedin" as const,
  },
] as const;

export const FOOTER_NEWSLETTER_HEADING = "Stay Informed";
export const FOOTER_NEWSLETTER_SUCCESS =
  "Thank you — we'll be in touch with fund insights and updates.";
export const FOOTER_NEWSLETTER_FAIL =
  "Something went wrong. Please try again or email us directly.";

export type FooterOffice = {
  country: string;
  company: string;
  addressLines: string[];
  href: string;
  /** Drop generated WebP into public/thinqasset-assets/footer/ */
  imageSrc: string;
  imageAlt: string;
  isFirst?: boolean;
};

export const FOOTER_OFFICE_IMAGE_DIR = "/thinqasset-assets/footer";

export const FOOTER_OFFICES: FooterOffice[] = [
  {
    country: "Mauritius",
    company: "ThinqAsset Fund Management Ltd\nOperational Headquarters",
    addressLines: [
      "Direct fund management and VCC structuring.",
      "40+ double tax treaties across Asia, Europe, and Africa.",
      "Email: info@thinqasset.com",
    ],
    href: "/#global-footprint",
    imageSrc: `${FOOTER_OFFICE_IMAGE_DIR}/mauritius.webp`,
    imageAlt: "Port Louis financial district skyline at dusk",
    isFirst: true,
  },
  {
    country: "UAE",
    company: "ThinqAsset\nDIFC & ADGM",
    addressLines: [
      "Gateway to the Gulf for capital formation",
      "and institutional relationships.",
      "Email: info@thinqasset.com",
    ],
    href: "/#global-footprint",
    imageSrc: `${FOOTER_OFFICE_IMAGE_DIR}/uae.webp`,
    imageAlt: "Dubai International Financial Centre skyline",
  },
  {
    country: "Luxembourg",
    company: "ThinqAsset Fund Management\nEuropean Anchor",
    addressLines: [
      "Direct fund management and investor access",
      "across European markets.",
      "Email: info@thinqasset.com",
    ],
    href: "/#global-footprint",
    imageSrc: `${FOOTER_OFFICE_IMAGE_DIR}/luxembourg.webp`,
    imageAlt: "Luxembourg Kirchberg financial district architecture",
  },
  {
    country: "Singapore",
    company: "ThinqAsset\nAsia-Pacific Partnerships",
    addressLines: [
      "Fund administration, compliance, and portfolio",
      "support across APAC ecosystems.",
      "Email: info@thinqasset.com",
    ],
    href: "/#global-footprint",
    imageSrc: `${FOOTER_OFFICE_IMAGE_DIR}/singapore.webp`,
    imageAlt: "Singapore Marina Bay financial district skyline",
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-of-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;

export const FOOTER_COPYRIGHT =
  "ThinqAsset Fund Management Ltd © All Rights Reserved";
