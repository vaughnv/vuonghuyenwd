import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True only when the required Firebase env vars are present. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

let cachedDb: Firestore | null = null;

/**
 * Lazily initialise Firestore. Returns null when Firebase is not configured,
 * so callers can degrade gracefully instead of throwing at import time.
 */
export function getDb(): Firestore | null {
  if (!isFirebaseConfigured) return null;
  if (cachedDb) return cachedDb;

  const app: FirebaseApp = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);
  cachedDb = getFirestore(app);
  return cachedDb;
}
