import type { Metadata } from "next";
import {
  TBG_TAGLINE,
  THINQASSET_FAVICON,
  THINQASSET_OG_IMAGE,
} from "@/lib/brand-assets";

export const SITE_URL = "https://www.thinqasset.com";

export const SITE_NAME = "THINQASSET";

export const SITE_TITLE_DEFAULT = `${SITE_NAME} — ${TBG_TAGLINE}`;

export const SITE_DESCRIPTION = `${TBG_TAGLINE} ThinqAsset Fund Management Ltd delivers tailored investment strategies and unparalleled client service, Connecting the world across Mauritius, DIFC, Luxembourg, and beyond.`;

const NOINDEX: Metadata["robots"] = { index: false, follow: false };

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      {
        url: THINQASSET_FAVICON.icon32,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: THINQASSET_FAVICON.icon192,
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: THINQASSET_FAVICON.apple180,
  },
  other: {
    "msapplication-TileImage": THINQASSET_FAVICON.msTile270,
  },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: THINQASSET_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: [THINQASSET_OG_IMAGE],
  },
};

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  robots?: Metadata["robots"];
  ogImage?: string;
};

/** Page-level metadata that inherits the root title template and default OG image. */
export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  robots,
  ogImage = THINQASSET_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const url = path ? new URL(path, SITE_URL).toString() : undefined;

  return {
    title,
    description,
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const noIndexRobots = NOINDEX;
