import { CONTACT_FORM_HREF } from "@/lib/transition/constants";

export const FINAL_CTA_HREF = CONTACT_FORM_HREF;
export const FINAL_CTA_COPY = {
  title: "Speak with our team",
  subtitle:
    "Mauritius and Dubai teams — institutional fund solutions across Mauritius, DIFC, and global markets.",
  button: "Contact Us",
} as const;

export const FINAL_CTA_TOKENS = {
  muted: "rgba(184, 184, 184, 0.9)",
  btnBg: "rgba(255, 255, 255, 0.06)",
  btnBorder: "rgba(255, 255, 255, 0.08)",
} as const;
