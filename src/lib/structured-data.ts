import {
  CONTACT_EMAIL,
  FAQS,
  GOOGLE_PROFILE_URL,
  PRACTICE_ORIGIN,
  SERVICE_AREA_CITIES,
  SOCIAL_LINKS,
  TESTIMONIALS,
} from "./content";

export const SITE_URL = "https://www.chakrahealinghypnosis.com";

export function localBusinessSchema() {
  const reviews = TESTIMONIALS.map((t) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: t.name,
    },
    reviewBody: t.quote,
  }));

  return {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: "Chakra Healing Hypnosis",
    alternateName: "Chakra Healing Hypnosis with Saroja",
    description:
      "QHHT certified Chakra Healing Hypnosis practice led by Saroja, offering in-person sessions in Mill Creek, WA and virtual sessions worldwide.",
    url: SITE_URL,
    image: `${SITE_URL}/images/og-cover.jpg`,
    logo: `${SITE_URL}/icon-512.png`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mill Creek",
      addressRegion: "WA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: PRACTICE_ORIGIN.lat,
      longitude: PRACTICE_ORIGIN.lon,
    },
    areaServed: [
      ...SERVICE_AREA_CITIES.map((city) => ({
        "@type": "City",
        name: `${city}, WA`,
      })),
      { "@type": "Place", name: "Worldwide (Virtual Sessions)" },
    ],
    founder: {
      "@type": "Person",
      name: "Saroja",
      jobTitle: "QHHT Certified Practitioner",
    },
    sameAs: [GOOGLE_PROFILE_URL, ...SOCIAL_LINKS.map((s) => s.href)],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Chakra Healing Hypnosis Sessions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "QHHT Session",
            description:
              "A full-day, in-person Quantum Healing Hypnosis Technique session guiding you into the Somnambulistic level of trance.",
            areaServed: SERVICE_AREA_CITIES.map((city) => `${city}, WA`).join(", "),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Virtual Quantum Healing Session",
            description:
              "A deep hypnosis and chakra healing session delivered via secure video call, available worldwide.",
            areaServed: "Worldwide",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      reviewCount: String(TESTIMONIALS.length),
    },
    review: reviews,
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function sessionStoriesSchema(
  stories: { id: string; title: string; created_at: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Session Stories — Chakra Healing Hypnosis",
    itemListElement: stories.map((story, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/session-stories#${story.id}`,
      name: story.title,
    })),
  };
}

export function breadcrumbSchema(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}
