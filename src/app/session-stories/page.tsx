import SessionStories from "@/components/SessionStories";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, sessionStoriesSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { getSessionStories } from "@/lib/session-stories.server";

// Always render at request time so a story an admin just published shows
// up immediately. This also matters at build time: without it, Next tries
// a static-prerender trial pass that runs this module before any request
// context exists, which throws if the Supabase env vars aren't present in
// that build environment (e.g. a CI/build step that doesn't inject them).
export const dynamic = "force-dynamic";

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
