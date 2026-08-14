import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { createClient } from "@/lib/supabase/server";

// See src/app/session-stories/page.tsx for why this is required.
export const dynamic = "force-dynamic";

// Admin login has no value in search results and shouldn't be crawled.
export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="pt-[112px] min-h-[80vh] flex items-center justify-center bg-deep px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-gold text-2xl drop-shadow-[0_0_8px_rgba(201,168,76,0.75)]">
            ✦
          </span>
          <h1 className="font-heading text-2xl text-cream mt-3">
            Admin Login
          </h1>
          <p className="text-sm text-muted mt-2">
            Chakra Healing Hypnosis — Session Stories
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-deep-2 p-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
