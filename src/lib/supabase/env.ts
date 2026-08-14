// Shared, validated read of the Supabase env vars. Both the browser and
// server clients call this so a missing var fails loudly in one place
// instead of as a cryptic fetch error deep in @supabase/ssr, and each
// caller gets back plain narrowed `string`s to pass straight to the SDK.

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "Copy .env.example to .env.local and fill in your Supabase project values."
    );
  }

  return { url, publishableKey };
}

// Raw (possibly undefined) values for call sites that can tolerate a
// missing value and handle it themselves, e.g. image URL helpers and the
// proxy (which should fail open rather than throw on every request).
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
