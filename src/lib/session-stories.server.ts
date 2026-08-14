import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { SessionStory } from "./session-stories";

/** Fetches every published session story, newest first. Runs on the server
 *  (Server Component / Route Handler) using the request's cookies, so a
 *  story an admin just uploaded appears on the next page load — no
 *  redeploy or cache purge needed. */
export async function getSessionStories(): Promise<SessionStory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("session_stories")
    .select("id,title,body,image_path,session_type,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load session stories:", error.message);
    return [];
  }

  return data ?? [];
}
