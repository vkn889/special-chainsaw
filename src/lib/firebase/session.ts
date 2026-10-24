import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth } from "./admin";
import { SESSION_COOKIE } from "./config";

export type AdminSession = { uid: string; email: string | null };

/** Verifies the request's session cookie and returns the signed-in admin, or
 *  null. Checks revocation and the `admin` custom claim, so this — not the
 *  proxy's optimistic cookie check — is the real line of defense. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    if (decoded.admin !== true) return null;
    return { uid: decoded.uid, email: decoded.email ?? null };
  } catch {
    // Expired, revoked or malformed — treat as signed out.
    return null;
  }
}
