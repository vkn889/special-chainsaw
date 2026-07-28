import About from "@/components/About";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Saroja",
  description:
    "Meet Saroja, a QHHT certified Chakra Healing Hypnosis practitioner in Mill Creek, WA, and cancer-remission survivor guiding clients into deep subconscious healing.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("About", "/about")} />
      <About />
    </div>
  );
}
