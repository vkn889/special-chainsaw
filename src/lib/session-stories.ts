import { SUPABASE_URL } from "@/lib/supabase/env";

// Client-safe: types and pure helpers only. The actual data fetch
// (`getSessionStories`) lives in `./session-stories.server` because it
// needs `next/headers`, which can't be pulled into client bundles (e.g.
// the admin dashboard imports this file for its shared types/helpers).

export const SESSION_STORY_IMAGE_BUCKET = "session-story-images";

export type SessionStory = {
  id: string;
  title: string;
  body: string;
  image_path: string | null;
  session_type: string | null;
  created_at: string;
};

/** Builds the public URL for an uploaded story image. The storage bucket
 *  is public-read, so this is a plain, deterministic URL — no signing or
 *  extra round trip needed. */
export function getSessionStoryImageUrl(imagePath: string | null): string | null {
  if (!imagePath || !SUPABASE_URL) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/${SESSION_STORY_IMAGE_BUCKET}/${imagePath}`;
}
