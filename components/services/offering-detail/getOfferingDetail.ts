import type { OfferingDetailContent } from "./types";
import { getFundPlatformOfferingDetail } from "./fundPlatformOfferingContent";
import { getStructuresOfferingDetail } from "./structuresOfferingContent";
import { getCorporateOfferingDetail } from "./corporateOfferingContent";

/** Resolve enriched offering detail across all three service pillars. */
export function getOfferingDetail(
  slug: string,
): OfferingDetailContent | undefined {
  return (
    getFundPlatformOfferingDetail(slug) ??
    getStructuresOfferingDetail(slug) ??
    getCorporateOfferingDetail(slug)
  );
}

export function hasOfferingDetail(slug: string): boolean {
  return getOfferingDetail(slug) !== undefined;
}
