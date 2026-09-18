"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import type { Event } from "@/lib/events";
import { formatEventDate, formatEventTime, getEventImageUrl } from "@/lib/events";
import StoryImage from "./StoryImage";

function formatWhen(event: Event) {
  const time = `${formatEventTime(event.start_time)}${
    event.end_time ? ` – ${formatEventTime(event.end_time)}` : ""
  } ${event.timezone}`;
  return `${formatEventDate(event.event_date)} · ${time}`;
}

function ReserveButton({ event, className }: { event: Event; className: string }) {
  if (!event.registration_url) return null;
  return (
    <a
      href={event.registration_url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Reserve Your Spot
    </a>
  );
}

export default function EventCard({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);
  const when = formatWhen(event);

  return (
    <article
      id={event.id}
      className="overflow-hidden rounded-2xl border border-white/10 bg-deep-2 scroll-mt-32"
    >
      <StoryImage
        src={getEventImageUrl(event.image_path)}
        alt={event.title}
        seed={event.id}
        className="aspect-video w-full"
      />

      <div className="flex flex-col items-center p-6 sm:p-8 text-center">
        <h2 className="font-heading text-2xl text-cream leading-snug">
          {event.title}
        </h2>
        <p className="mt-3 text-sm text-muted">{when}</p>
        <p className="mt-1 text-sm text-muted">{event.location}</p>

        <div className="mt-6 flex items-center gap-3">
          <ReserveButton
            event={event}
            className="rounded-full bg-violet px-6 py-3 text-xs tracking-[0.15em] uppercase text-cream shadow-[0_0_18px_rgba(123,79,166,0.45)] transition-colors hover:bg-gold hover:text-deep"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`View full details for ${event.title}`}
            title="View more"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-colors hover:border-gold hover:text-gold"
          >
            <span aria-hidden className="text-lg leading-none tracking-[0.15em]">
              •••
            </span>
          </button>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-[61] max-h-[85vh] w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-deep-2 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="font-heading text-2xl text-cream leading-snug">
                {event.title}
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                ✕
              </Dialog.Close>
            </div>

            <p className="mt-3 text-xs tracking-[0.1em] uppercase text-gold">
              {when}
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-violet-light">
              {event.location}
            </p>

            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted">
              {event.description}
            </p>

            <ReserveButton
              event={event}
              className="mt-7 inline-block rounded-full bg-violet px-6 py-3 text-xs tracking-[0.15em] uppercase text-cream shadow-[0_0_18px_rgba(123,79,166,0.45)] transition-colors hover:bg-gold hover:text-deep"
            />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </article>
  );
}
