// Shared, validated read of the public Firebase web config. The browser SDK
// and the server (admin) SDK both call this so a missing var fails loudly in
// one place instead of as a cryptic error deep inside the Firebase SDK.
//
// Each NEXT_PUBLIC_ var is referenced literally (not via a computed key) so
// Next.js can inline it into the client bundle.

export function getFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase config: ${missing.join(", ")}. ` +
        "Set the NEXT_PUBLIC_FIREBASE_* env vars (see README)."
    );
  }

  return config as { [K in keyof typeof config]: string };
}

// Raw (possibly undefined) value for call sites that can tolerate a missing
// value and handle it themselves, e.g. the image URL helper.
export const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

/** httpOnly cookie holding the Firebase session cookie (minted by
 *  /api/admin/session). Shared by the proxy, the route handler and the
 *  server-side session check. */
export const SESSION_COOKIE = "admin_session";

/** Builds the public download URL for an object in Firebase Storage. The
 *  image folders are public-read (see storage.rules), so this is a plain,
 *  deterministic URL — no token, signing or extra round trip needed. */
export function getStorageObjectUrl(objectPath: string): string | null {
  if (!FIREBASE_STORAGE_BUCKET) return null;
  return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(objectPath)}?alt=media`;
}
