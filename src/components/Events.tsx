import type { Event } from "@/lib/events";
import { isUpcoming } from "@/lib/events";
import EventCard from "./EventCard";

export default function Events({ events }: { events: Event[] }) {
  const upcoming = events.filter(isUpcoming);
  const past = events.filter((e) => !isUpcoming(e));

  return (
    <section id="events" className="bg-deep py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
          ✦ Gather With Us
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl text-cream leading-tight max-w-2xl">
          Workshops &amp;
          <br />
          <span className="italic text-gold">Group Events</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted leading-relaxed">
          Group workshops and live sessions where you can experience guided
          hypnosis, connect with your Higher Self, and explore this work
          before committing to a full QHHT session.
        </p>

        {upcoming.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-white/15 p-10 text-center">
            <p className="text-sm text-muted italic leading-relaxed">
              No upcoming events right now — check back soon, or{" "}
              <a href="/contact" className="text-gold hover:underline">
                get in touch
              </a>{" "}
              to be notified of the next one.
            </p>
          </div>
        ) : (
          <div className="mt-14 space-y-6">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-20">
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
              ✦ Past Events
            </p>
            <div className="space-y-6 opacity-70">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
