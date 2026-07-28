import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import CalendlyLoader from "@/components/CalendlyLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, SITE_URL } from "@/lib/structured-data";
import { DEFAULT_TITLE, OG_IMAGE } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Chakra Healing Hypnosis",
  },
  description:
    "Chakra Healing Hypnosis with Saroja, a QHHT certified practitioner in Mill Creek, WA. In-person and virtual sessions to release blocks, balance your energy, and reconnect with your highest self.",
  keywords: [
    "Chakra Healing Hypnosis",
    "QHHT",
    "Quantum Healing Hypnosis Technique",
    "Dolores Cannon",
    "chakra healing",
    "past life regression",
    "hypnotherapy Mill Creek WA",
    "Saroja QHHT practitioner",
    "virtual hypnosis session",
  ],
  authors: [{ name: "Saroja" }],
  category: "Health & Wellness",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  verification: {
    google: "XLnEHO-CkRzaw_x14oEsu_J2szNIZP_iT2VtfLBkQms",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Experience the profound union of Chakra Healing and deep Hypnosis with Saroja, QHHT certified practitioner. In-person sessions in Mill Creek, WA and virtual sessions worldwide.",
    url: SITE_URL,
    siteName: "Chakra Healing Hypnosis",
    images: [OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Experience the profound union of Chakra Healing and deep Hypnosis — a sacred journey into your subconscious to release blocks and reconnect with your highest self.",
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "scroll-smooth",
        cormorant.variable,
        jost.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd data={localBusinessSchema()} />
        <CalendlyLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
