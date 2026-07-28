import Services from "@/components/Services";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sessions (QHHT & Virtual Healing)",
  description:
    "Choose your healing path: an in-person QHHT session in Mill Creek, WA, or a Virtual Quantum Healing Session available worldwide via video call.",
  path: "/sessions",
});

export default function SessionsPage() {
  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("Sessions", "/sessions")} />
      <Services />
    </div>
  );
}
