"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirebaseConfig } from "./config";

/** Firebase SDK handles for Client Components (browser). Used by the admin
 *  login form and dashboard to sign in and upload content. Writes are only
 *  allowed for accounts with the `admin` custom claim (see firestore.rules /
 *  storage.rules). */
export function getFirebase() {
  const app = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
  return {
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };
}
