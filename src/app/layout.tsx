import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CalendlyLoader from "@/components/CalendlyLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const siteUrl = "https://chakrahealinghypnosis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chakra Healing Hypnosis | Align Your Energy, Transform Your Life",
    template: "%s | Chakra Healing Hypnosis",
  },
  description:
    "Chakra Healing Hypnosis with Saroja, a QHHT certified practitioner in Mill Creek, WA. In-person and virtual sessions to release blocks, balance your energy, and reconnect with your highest self.",
  openGraph: {
    title: "Chakra Healing Hypnosis | Align Your Energy, Transform Your Life",
    description:
      "Experience the profound union of Chakra Healing and deep Hypnosis with Saroja, QHHT certified practitioner. In-person sessions in Mill Creek, WA and virtual sessions worldwide.",
    url: siteUrl,
    siteName: "Chakra Healing Hypnosis",
    images: ["/images/saroja-photo.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chakra Healing Hypnosis | Align Your Energy, Transform Your Life",
    description:
      "Experience the profound union of Chakra Healing and deep Hypnosis — a sacred journey into your subconscious to release blocks and reconnect with your highest self.",
    images: ["/images/saroja-photo.jpg"],
  },
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
        <CalendlyLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
