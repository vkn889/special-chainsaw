import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed Middleware to Proxy (same mechanism). This only needs
// to run on the admin routes — the public marketing pages don't touch
// Supabase auth, so keeping the matcher scoped avoids extra work on every
// request across the site.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/admin", "/admin/dashboard"],
};
