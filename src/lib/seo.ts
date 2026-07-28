import type { Metadata } from "next";
import { SITE_URL } from "./structured-data";

export const OG_IMAGE = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: "Chakra Healing Hypnosis with Saroja — Heal From Within. Awaken Your Energy.",
};

export const DEFAULT_TITLE =
  "Chakra Healing Hypnosis with Saroja | QHHT Practitioner in Mill Creek, WA & Worldwide";

// Next.js does not deep-merge `openGraph`/`twitter` between a layout and a
// page — a page-level value fully replaces the parent's, silently dropping
// fields like the image. So every page builds its own complete block here
// instead of only overriding title/description.
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page-specific title segment. The root layout's template appends
   *  " | Chakra Healing Hypnosis" automatically — don't include the brand
   *  name here. Omit entirely on the home page to use the root default. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = title ? `${title} | Chakra Healing Hypnosis` : DEFAULT_TITLE;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Chakra Healing Hypnosis",
      images: [OG_IMAGE],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
