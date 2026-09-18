"use client";

import { useEffect, useRef, useState } from "react";
import type { SessionStory } from "@/lib/session-stories";
import { getSessionStoryImageUrl } from "@/lib/session-stories";
import StoryImage from "./StoryImage";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function StoryCard({ story }: { story: SessionStory }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  // Measured once, while the paragraph is still line-clamped — this is
  // what decides whether "Read More" is shown at all. It intentionally
  // doesn't depend on `expanded`, so it isn't re-measured (and wiped out)
  // once the clamp is lifted.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [story.body]);

  return (
    <article
      id={story.id}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-deep-2 scroll-mt-32"
    >
      <StoryImage
        src={getSessionStoryImageUrl(story.image_path)}
        alt={story.title}
        seed={story.id}
      />

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

        <p
          ref={bodyRef}
          className={`mt-3 flex-1 text-sm leading-relaxed text-muted whitespace-pre-line ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {story.body}
        </p>

        {isClamped && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 self-start text-[11px] tracking-[0.15em] uppercase text-gold hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </article>
  );
}
