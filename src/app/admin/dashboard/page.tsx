import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { createClient } from "@/lib/supabase/server";
import { getSessionStories } from "@/lib/session-stories.server";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  // Proxy already redirects signed-out visitors, but auth is re-checked
  // here too — Proxy does optimistic checks only and shouldn't be the
  // sole line of defense (see Next.js authentication guide).
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/admin");
  }

  const email = (data.claims.email as string | undefined) ?? "Admin";
  const stories = await getSessionStories();

  return (
    <div className="pt-[112px] bg-deep min-h-screen">
      <AdminDashboard email={email} initialStories={stories} />
    </div>
  );
}
