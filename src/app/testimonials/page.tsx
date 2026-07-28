import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Testimonials",
  description:
    "Read verified Google reviews from clients who have journeyed through a Chakra Healing Hypnosis session with Saroja.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("Testimonials", "/testimonials")} />
      <Testimonials />
    </div>
  );
}
