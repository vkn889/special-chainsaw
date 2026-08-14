import SessionStories from "@/components/SessionStories";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, sessionStoriesSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { getSessionStories } from "@/lib/session-stories.server";

export const metadata = pageMetadata({
  title: "Session Stories",
  description:
    "Real QHHT and Virtual Quantum Healing session stories — the insights, past-life journeys, and healings clients have experienced with Saroja.",
  path: "/session-stories",
});

export default async function SessionStoriesPage() {
  const stories = await getSessionStories();

  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("Session Stories", "/session-stories")} />
      {stories.length > 0 && <JsonLd data={sessionStoriesSchema(stories)} />}
      <SessionStories stories={stories} />
      <CTABand />
    </div>
  );
}
