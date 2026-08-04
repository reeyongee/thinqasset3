import { redirect } from "next/navigation";
import { CONSULTATION_HREF } from "@/lib/transition/constants";

/** Legacy route — primary redirect also lives in next.config.ts. */
export default function ConsultationPage() {
  redirect(CONSULTATION_HREF);
}
