import { MAURITIUS_DTA_LINE, TBG_TAGLINE } from "@/lib/brand-assets";

export const FOOTER_TAGLINE = TBG_TAGLINE;

export const FOOTER_EMAIL = "info@thinqasset.com";

export const FOOTER_MENU_COLUMNS = [
  [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ],
  [
    { label: "Services", href: "/services" },
    { label: "Our Structures", href: "/services/our-structures" },
  ],
  [{ label: "Contact", href: "/contact" }],
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
      "Direct Fund Management and structuring.",
      `${MAURITIUS_DTA_LINE}.`,
      "Email: info@thinqasset.com",
    ],
    href: "/services/mauritius-protected-cell-company",
    imageSrc: `${FOOTER_OFFICE_IMAGE_DIR}/mauritius.webp`,
    imageAlt: "Port Louis financial district skyline at dusk",
    isFirst: true,
  },
  {
    country: "UAE",
    company: "ThinqAsset\nDIFC",
    addressLines: [
      "Gateway to the Gulf for capital formation",
      "and institutional relationships.",
      "Email: info@thinqasset.com",
    ],
    href: "/services/difc-structures",
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
    href: "/services/luxembourg-gp-lp",
    imageSrc: `${FOOTER_OFFICE_IMAGE_DIR}/luxembourg.webp`,
    imageAlt: "Luxembourg Kirchberg financial district architecture",
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-of-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;

export const FOOTER_COPYRIGHT =
  "ThinqAsset Fund Management Ltd © All Rights Reserved";
