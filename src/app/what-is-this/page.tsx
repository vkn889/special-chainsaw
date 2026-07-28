import WhatIsQHHT from "@/components/WhatIsQHHT";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What Is This? (QHHT Explained)",
  description:
    "Understand how Chakra Healing Hypnosis combines hypnosis and the seven-chakra energy system, plus answers to common questions about the process.",
  path: "/what-is-this",
});

export default function WhatIsThisPage() {
  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("What Is This?", "/what-is-this")} />
      <JsonLd data={faqPageSchema()} />
      <WhatIsQHHT />
    </div>
  );
}
