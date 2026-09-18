import type { Event } from "@/lib/events";
import {
  formatEventDate,
  formatEventTime,
  getEventImageUrl,
  isUpcoming,
} from "@/lib/events";
import StoryImage from "./StoryImage";

function EventCard({ event }: { event: Event }) {
  return (
    <article
      id={event.id}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-deep-2 scroll-mt-32 sm:flex-row"
    >
      <div className="sm:w-64 sm:shrink-0">
        <StoryImage
          src={getEventImageUrl(event.image_path)}
          alt={event.title}
          seed={event.id}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-gold">
            {formatEventDate(event.event_date)}
          </span>
          <span className="text-[11px] tracking-[0.1em] uppercase text-muted">
            {formatEventTime(event.start_time)}
            {event.end_time ? ` – ${formatEventTime(event.end_time)}` : ""}{" "}
            {event.timezone}
          </span>
        </div>

        <h2 className="font-heading mt-4 text-2xl text-cream leading-snug">
          {event.title}
        </h2>

        <p className="mt-1 text-xs tracking-[0.1em] uppercase text-violet-light">
          {event.location}
        </p>

        <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted">
          {event.description}
        </p>

        {event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block self-start rounded-full bg-violet px-6 py-3 text-xs tracking-[0.15em] uppercase text-cream shadow-[0_0_18px_rgba(123,79,166,0.45)] transition-colors hover:bg-gold hover:text-deep"
          >
            Reserve Your Spot
          </a>
        )}
      </div>
    </article>
  );
}

export default function Events({ events }: { events: Event[] }) {
  const upcoming = events.filter(isUpcoming);
  const past = events.filter((e) => !isUpcoming(e));

  return (
    <section id="events" className="bg-deep py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
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
