import Events from "@/components/Events";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, eventsSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { getEvents } from "@/lib/events.server";
import { isUpcoming } from "@/lib/events";

// See src/app/session-stories/page.tsx for why this is required: always
// render at request time so an event an admin just published or edited
// shows up immediately, and so the build doesn't try to prerender this
// against Supabase before request context (and its env vars) exist.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Events",
  description:
    "Free group workshops and live Past Life Regression sessions with Saroja — a QHHT certified practitioner. See upcoming dates and reserve your spot.",
  path: "/events",
});

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = events.filter(isUpcoming);

  return (
    <div className="pt-[112px]">
      <JsonLd data={breadcrumbSchema("Events", "/events")} />
      {upcoming.length > 0 && (
        <>
          {eventsSchema(upcoming).map((schema) => (
            <JsonLd key={schema["@id"]} data={schema} />
          ))}
        </>
      )}
      <Events events={events} />
      <CTABand />
    </div>
  );
}
