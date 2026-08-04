import { ContactPageContent } from "@/components/contact/ContactPageContent";

export function DesktopContact({ startWithForm = false }: { startWithForm?: boolean }) {
  return <ContactPageContent startWithForm={startWithForm} />;
}
