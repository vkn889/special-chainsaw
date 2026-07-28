import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Begin your journey with Chakra Healing Hypnosis. Check if you're within range for an in-person QHHT session, or book a Virtual Quantum Healing Session.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
      <Contact />
    </div>
  );
}
