import { getStorageObjectUrl } from "@/lib/firebase/config";

// Client-safe: types and pure helpers only. The actual data fetch
// (`getSessionStories`) lives in `./session-stories.server` because it
// needs `next/headers`, which can't be pulled into client bundles (e.g.
// the admin dashboard imports this file for its shared types/helpers).

export const SESSION_STORIES_COLLECTION = "session_stories";
/** Firebase Storage folder holding story photos. */
export const SESSION_STORY_IMAGE_FOLDER = "session-story-images";

export type SessionStory = {
  id: string;
  title: string;
  body: string;
  image_path: string | null;
  session_type: string | null;
  created_at: string;
};

/** Maps a Firestore document (admin or browser SDK) to a SessionStory. */
export function sessionStoryFromDoc(id: string, d: Record<string, unknown>): SessionStory {
  return {
    id,
    title: d.title as string,
    body: d.body as string,
    image_path: (d.image_path as string | null) ?? null,
    session_type: (d.session_type as string | null) ?? null,
    created_at: d.created_at as string,
  };
}

/** Builds the public URL for an uploaded story image. */
export function getSessionStoryImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  return getStorageObjectUrl(`${SESSION_STORY_IMAGE_FOLDER}/${imagePath}`);
}
