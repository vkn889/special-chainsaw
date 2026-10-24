import "server-only";
import { getAdminDb } from "@/lib/firebase/admin";
import { EVENTS_COLLECTION, eventFromDoc, sortEvents, type Event } from "./events";

/** Fetches every event, soonest-first. Runs on the server (Server Component /
 *  Route Handler) on each request, so an event an admin just published or
 *  edited appears on the next page load — no redeploy or cache purge needed. */
export async function getEvents(): Promise<Event[]> {
  try {
    const snapshot = await getAdminDb().collection(EVENTS_COLLECTION).get();
    return sortEvents(snapshot.docs.map((doc) => eventFromDoc(doc.id, doc.data())));
  } catch (error) {
    console.error("Failed to load events:", error);
    return [];
  }
}
