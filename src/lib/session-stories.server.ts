import "server-only";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  SESSION_STORIES_COLLECTION,
  sessionStoryFromDoc,
  type SessionStory,
} from "./session-stories";

/** Fetches every published session story, newest first. Runs on the server
 *  (Server Component / Route Handler) on each request, so a story an admin
 *  just uploaded appears on the next page load — no redeploy or cache purge
 *  needed. */
export async function getSessionStories(): Promise<SessionStory[]> {
  try {
    const snapshot = await getAdminDb()
      .collection(SESSION_STORIES_COLLECTION)
      .orderBy("created_at", "desc")
      .get();
    return snapshot.docs.map((doc) => sessionStoryFromDoc(doc.id, doc.data()));
  } catch (error) {
    console.error("Failed to load session stories:", error);
    return [];
  }
}
