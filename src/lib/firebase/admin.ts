import "server-only";
import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseConfig } from "./config";

/** Firebase Admin SDK for Server Components and Route Handlers. Authenticates
 *  with a service account, so it bypasses security rules — never import this
 *  from client code (`server-only` enforces that). */
function getAdminApp() {
  if (getApps().length > 0) return getApp();

  const { projectId, storageBucket } = getFirebaseConfig();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Env var UIs store the PEM's newlines as literal "\n".
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY. " +
        "Add the service account credentials to the environment (see README)."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
