import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "./events";

/** Fetches every event, soonest-first. Runs on the server (Server
 *  Component / Route Handler) using the request's cookies, so an event an
 *  admin just published or edited appears on the next page load — no
 *  redeploy or cache purge needed. */
export async function getEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      "id,title,description,event_date,start_time,end_time,timezone,location,registration_url,image_path,created_at"
    )
    .order("event_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Failed to load events:", error.message);
    return [];
  }

  return data ?? [];
}
