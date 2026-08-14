import { cookies } from "next/headers";
import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";
import type { Database } from "./database.types";

/** Supabase client for Server Components, Server Actions, and Route
 *  Handlers. Reads/writes the auth session via cookies so the admin's
 *  signed-in state persists across requests. */
export async function createClient() {
  const { url, publishableKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  const setAll: SetAllCookies = (cookiesToSet) => {
    try {
      cookiesToSet.forEach(({ name, value, options }) =>
        cookieStore.set(name, value, options)
      );
    } catch {
      // Called from a Server Component that can't set cookies (e.g. a
      // static render). The proxy refreshes the session instead, so
      // this is safe to ignore.
    }
  };

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll,
    },
  });
}
