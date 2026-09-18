import type { SessionStory } from "@/lib/session-stories";
import StoryCard from "./StoryCard";

export default function SessionStories({ stories }: { stories: SessionStory[] }) {
  return (
    <section id="session-stories" className="bg-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
          ✦ Real Journeys
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl text-cream leading-tight max-w-2xl">
          Stories From the
          <br />
          <span className="italic text-gold">Somnambulistic State</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted leading-relaxed">
          A glimpse into the insights, past-life journeys, and healings that
          have unfolded in QHHT and Virtual Quantum Healing sessions. Every
          story is shared with the client&apos;s permission, and identifying
          details are changed to protect their privacy.
        </p>

        {stories.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-white/15 p-10 text-center">
            <p className="text-sm text-muted italic leading-relaxed">
              New session stories are added regularly — check back soon for
              the first entries.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
