// Shared Admin SDK setup for the one-off scripts in this folder. Reads the
// same env vars as the app (run scripts with `node --env-file=.env.local`).
import { cert, initializeApp } from "firebase-admin/app";

export function initAdmin() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !storageBucket || !clientEmail || !privateKey) {
    console.error(
      "Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, " +
        "FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY. Run with `node --env-file=.env.local`."
    );
    process.exit(1);
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
}
