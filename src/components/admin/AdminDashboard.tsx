"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { SessionStory } from "@/lib/session-stories";
import type { Event } from "@/lib/events";
import SessionStoriesManager from "./SessionStoriesManager";
import EventsManager from "./EventsManager";

type Tab = "stories" | "events";

export default function AdminDashboard({
  email,
  initialStories,
  initialEvents,
}: {
  email: string;
  initialStories: SessionStory[];
  initialEvents: Event[];
}) {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("stories");

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">
            ✦ Admin
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl text-cream">
            Content Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">Signed in as {email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-cream/25 px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Sign Out
        </button>
      </div>

      <div className="flex gap-2 mb-10 rounded-full border border-white/10 bg-deep-2 p-1.5 w-fit">
        <button
          onClick={() => setTab("stories")}
          className={`rounded-full px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors ${
            tab === "stories"
              ? "bg-violet text-cream"
              : "text-muted hover:text-cream"
          }`}
        >
          Session Stories
        </button>
        <button
          onClick={() => setTab("events")}
          className={`rounded-full px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors ${
            tab === "events"
              ? "bg-violet text-cream"
              : "text-muted hover:text-cream"
          }`}
        >
          Events
        </button>
      </div>

      {tab === "stories" ? (
        <SessionStoriesManager initialStories={initialStories} />
      ) : (
        <EventsManager initialEvents={initialEvents} />
      )}
    </div>
  );
}
