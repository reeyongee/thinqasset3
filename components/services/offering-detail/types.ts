export type OfferingCapability = {
  title: string;
  detail: string;
};

export type OfferingJourneyStep = {
  title: string;
  detail: string;
};

/** Cobe globe location ids used by the Structures jurisdiction heroes. */
export type OfferingGlobeLocationId = "uae" | "mauritius" | "luxembourg";

export type OfferingDetailContent = {
  slug: string;
  /** Display index, e.g. "01" */
  index: string;
  title: string;
  /** Hero lede — one clear sentence */
  lede: string;
  /** Oversized manifesto line */
  statement: string;
  /** Two narrative paragraphs under the statement */
  narrative: readonly [string, string];
  /** Capability stack — what the offering actually covers */
  capabilities: readonly OfferingCapability[];
  /** How engagement typically unfolds */
  journey: readonly OfferingJourneyStep[];
  /** Who benefits most */
  audiences: readonly string[];
  /** Concrete outcomes / proof points */
  outcomes: readonly string[];
  /** Sibling offering slugs for the related band (2–3) */
  relatedSlugs: readonly string[];
  /**
   * When set, the offering hero mounts a Cobe globe fly-in to this pin
   * instead of a static image (Structures jurisdiction pages).
   */
  heroGlobeLocationId?: OfferingGlobeLocationId;
};
