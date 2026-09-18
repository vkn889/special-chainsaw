import { SUPABASE_URL } from "@/lib/supabase/env";

// Client-safe: types and pure helpers only. The actual data fetch
// (`getEvents`) lives in `./events.server` because it needs `next/headers`,
// which can't be pulled into client bundles (e.g. the admin dashboard
// imports this file for its shared types/helpers).

export const EVENT_IMAGE_BUCKET = "event-images";

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

/** Builds the public URL for an uploaded event image. The storage bucket
 *  is public-read, so this is a plain, deterministic URL — no signing or
 *  extra round trip needed. */
export function getEventImageUrl(imagePath: string | null): string | null {
  if (!imagePath || !SUPABASE_URL) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/${EVENT_IMAGE_BUCKET}/${imagePath}`;
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
