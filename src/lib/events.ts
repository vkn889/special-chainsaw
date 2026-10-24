import { getStorageObjectUrl } from "@/lib/firebase/config";

// Client-safe: types and pure helpers only. The actual data fetch
// (`getEvents`) lives in `./events.server` because it needs `next/headers`,
// which can't be pulled into client bundles (e.g. the admin dashboard
// imports this file for its shared types/helpers).

export const EVENTS_COLLECTION = "events";
/** Firebase Storage folder holding event photos. */
export const EVENT_IMAGE_FOLDER = "event-images";

// Shared between the admin cropper and the public card/dialog so an image
// cropped to this ratio always displays without any further CSS cropping.
export const EVENT_IMAGE_ASPECT = 16 / 9;

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  timezone: string;
  location: string;
  registration_url: string | null;
  image_path: string | null;
  created_at: string;
};

/** Maps a Firestore document (admin or browser SDK) to an Event. */
export function eventFromDoc(id: string, d: Record<string, unknown>): Event {
  return {
    id,
    title: d.title as string,
    description: d.description as string,
    event_date: d.event_date as string,
    start_time: d.start_time as string,
    end_time: (d.end_time as string | null) ?? null,
    timezone: d.timezone as string,
    location: d.location as string,
    registration_url: (d.registration_url as string | null) ?? null,
    image_path: (d.image_path as string | null) ?? null,
    created_at: d.created_at as string,
  };
}

/** Builds the public URL for an uploaded event image. */
export function getEventImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  return getStorageObjectUrl(`${EVENT_IMAGE_FOLDER}/${imagePath}`);
}

/** Soonest-first: by date, then start time. Sorted in code rather than with
 *  a two-field Firestore orderBy, which would need a composite index. */
export function sortEvents(events: Event[]): Event[] {
  return [...events].sort(
    (a, b) =>
      a.event_date.localeCompare(b.event_date) ||
      a.start_time.localeCompare(b.start_time)
  );
}

/** Formats a "HH:MM:SS" (or "HH:MM") time-of-day string as e.g. "10:00 AM". */
export function formatEventTime(time: string): string {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/** Formats an event's date as e.g. "Friday, September 25, 2026". */
export function formatEventDate(date: string): string {
  // event_date is a plain "YYYY-MM-DD" date (no time component), so parse
  // it as local/UTC-agnostic rather than through `new Date(date)`, which
  // would shift it a day depending on the reader's timezone.
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** True when the event's date is today or in the future. */
export function isUpcoming(event: Pick<Event, "event_date">): boolean {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return event.event_date >= todayStr;
}
