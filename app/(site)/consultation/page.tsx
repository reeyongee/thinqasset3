import { redirect } from "next/navigation";
import { CONTACT_FORM_HREF } from "@/lib/transition/constants";

/** Legacy route — primary redirect also lives in next.config.ts. */
export default function LegacyContactRedirect() {
  redirect(CONTACT_FORM_HREF);
}
