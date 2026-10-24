import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/firebase/config";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5; // 5 days

/** Exchanges a freshly-minted Firebase ID token (from the login form) for an
 *  httpOnly session cookie the server can verify on every admin request. */
export async function POST(request: NextRequest) {
  const { idToken } = (await request.json().catch(() => ({}))) as { idToken?: string };
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  const auth = getAdminAuth();
  try {
    const decoded = await auth.verifyIdToken(idToken, true);

    // Only mint sessions for a sign-in that just happened, and only for
    // accounts flagged as admins (scripts/set-admin.mjs).
    const signedInSecondsAgo = Date.now() / 1000 - decoded.auth_time;
    if (signedInSecondsAgo > 5 * 60 || decoded.admin !== true) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionCookie, {
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

/** Signs the admin out: clears the cookie and revokes the session server-side
 *  so a copied cookie stops working too. */
export async function DELETE() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  cookieStore.delete(SESSION_COOKIE);

  if (sessionCookie) {
    try {
      const auth = getAdminAuth();
      const decoded = await auth.verifySessionCookie(sessionCookie);
      await auth.revokeRefreshTokens(decoded.sub);
    } catch {
      // Already invalid — nothing to revoke.
    }
  }

  return NextResponse.json({ ok: true });
}
