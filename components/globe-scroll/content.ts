import { CTA_HREF } from "@/components/hero/constants";
import { STORY_BEATS } from "@/components/scroll-story/constants";
import { GLOBE_LOCATIONS } from "@/components/globe/constants";
import { STATS } from "@/components/numbers/constants";

export const GLOBE_SCROLL_HERO = {
  title: "Innovative Global",
  titleAccent: "Fund Management.",
  bodyLead: "Connecting the world.",
  bodyRest: "",
  ctaHref: CTA_HREF,
  ctaLabel: "Contact",
} as const;

export const GLOBE_SCROLL_JURISDICTIONS = GLOBE_LOCATIONS.filter(
  (loc) => loc.id !== "singapore",
).map((loc) => loc.name);

export const GLOBE_SCROLL_PROBLEM = STORY_BEATS[0].body;

export const GLOBE_SCROLL_SOLUTION = STORY_BEATS[3].body;

export const GLOBE_SCROLL_EYEBROW =
  "Cross-border. Six jurisdictions, one operating standard.";

export const GLOBE_SCROLL_STATS = STATS.map((stat) => ({
  label: stat.label.replace("Core ", "").replace(" Launched", ""),
  value: stat.display ?? `${stat.prefix}${stat.end}${stat.suffix}`,
  desc:
    stat.id === "subfunds"
      ? "Structures."
      : stat.id === "dtas"
        ? "Throughout the world"
        : stat.id === "jurisdictions"
          ? "DIFC · Mauritius · Luxembourg"
          : "Global investor reach",
}));
