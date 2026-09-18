import { SiteShell } from "@/components/site-chrome/SiteShell";
import { NotFoundExperience } from "./NotFoundExperience";

export function NotFoundPage() {
  return (
    <SiteShell disableScrollChrome>
      <NotFoundExperience />
    </SiteShell>
  );
}
