export type CountryCodeOption = {
  code: string;
  iso: string;
  name: string;
};

/** Curated dial codes — ThinqAsset markets first, then common international. */
export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "+230", iso: "MU", name: "Mauritius" },
  { code: "+971", iso: "AE", name: "United Arab Emirates" },
  { code: "+352", iso: "LU", name: "Luxembourg" },
  { code: "+44", iso: "GB", name: "United Kingdom" },
  { code: "+1", iso: "US", name: "United States" },
  { code: "+91", iso: "IN", name: "India" },
  { code: "+65", iso: "SG", name: "Singapore" },
  { code: "+852", iso: "HK", name: "Hong Kong" },
  { code: "+61", iso: "AU", name: "Australia" },
  { code: "+33", iso: "FR", name: "France" },
  { code: "+49", iso: "DE", name: "Germany" },
  { code: "+41", iso: "CH", name: "Switzerland" },
  { code: "+27", iso: "ZA", name: "South Africa" },
  { code: "+254", iso: "KE", name: "Kenya" },
  { code: "+234", iso: "NG", name: "Nigeria" },
  { code: "+966", iso: "SA", name: "Saudi Arabia" },
  { code: "+974", iso: "QA", name: "Qatar" },
  { code: "+965", iso: "KW", name: "Kuwait" },
  { code: "+973", iso: "BH", name: "Bahrain" },
  { code: "+968", iso: "OM", name: "Oman" },
  { code: "+86", iso: "CN", name: "China" },
  { code: "+81", iso: "JP", name: "Japan" },
  { code: "+82", iso: "KR", name: "South Korea" },
  { code: "+39", iso: "IT", name: "Italy" },
  { code: "+34", iso: "ES", name: "Spain" },
  { code: "+31", iso: "NL", name: "Netherlands" },
  { code: "+353", iso: "IE", name: "Ireland" },
  { code: "+46", iso: "SE", name: "Sweden" },
  { code: "+48", iso: "PL", name: "Poland" },
  { code: "+55", iso: "BR", name: "Brazil" },
  { code: "+52", iso: "MX", name: "Mexico" },
  { code: "+64", iso: "NZ", name: "New Zealand" },
];

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0].code;

export const PHONE_MIN_DIGITS = 7;
export const PHONE_MAX_DIGITS = 15;

/** Digits only, capped to E.164 national-number length. */
export function sanitizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
}

/** Letters, spaces, hyphen, apostrophe — strips everything else. */
export function sanitizePersonName(value: string): string {
  return value.replace(/[^\p{L}\s'-]/gu, "").slice(0, 60);
}

export const PHONE_PATTERN = `[0-9]{${PHONE_MIN_DIGITS},${PHONE_MAX_DIGITS}}`;
