import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/firebase/config";

// Next.js 16 renamed Middleware to Proxy (same mechanism). This only needs
// to run on the admin routes — the public marketing pages don't touch auth,
// so keeping the matcher scoped avoids extra work on every request.
//
// This is an optimistic check on cookie presence only: signed-out visitors
// get bounced to the login form, and a signed-in admin skips past it. The
// pages themselves verify the cookie with the Admin SDK (getAdminSession),
// which is the real line of defense.
export async function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/dashboard") && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard"],
};
