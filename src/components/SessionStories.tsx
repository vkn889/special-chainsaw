import type { SessionStory } from "@/lib/session-stories";
import { getSessionStoryImageUrl } from "@/lib/session-stories";
import StoryImage from "./StoryImage";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

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
              <article
                key={story.id}
                id={story.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-deep-2 scroll-mt-32"
              >
                {/* Image section */}
                <StoryImage
                  src={getSessionStoryImageUrl(story.image_path)}
                  alt={story.title}
                  seed={story.id}
                />

                {/* Text section */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    {story.session_type ? (
                      <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-gold">
                        {story.session_type}
                      </span>
                    ) : (
                      <span />
                    )}
                    <time
                      dateTime={story.created_at}
                      className="text-[11px] tracking-[0.1em] uppercase text-muted"
                    >
                      {formatDate(story.created_at)}
                    </time>
                  </div>

                  <h2 className="font-heading mt-4 text-xl text-cream leading-snug">
                    {story.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted whitespace-pre-line">
                    {story.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
