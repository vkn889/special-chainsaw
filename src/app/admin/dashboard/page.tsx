import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/firebase/session";
import { getSessionStories } from "@/lib/session-stories.server";
import { getEvents } from "@/lib/events.server";

// See src/app/session-stories/page.tsx for why this is required.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  // Proxy already redirects signed-out visitors, but auth is re-checked
  // here too — Proxy does optimistic checks only and shouldn't be the
  // sole line of defense (see Next.js authentication guide).
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin");
  }

  const email = session.email ?? "Admin";
  const [stories, events] = await Promise.all([getSessionStories(), getEvents()]);

  return (
    <div className="pt-[112px] bg-deep min-h-screen">
      <AdminDashboard email={email} initialStories={stories} initialEvents={events} />
    </div>
  );
}
