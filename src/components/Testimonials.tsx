import {
  ELFSIGHT_WIDGET_ID,
  GOOGLE_PROFILE_URL,
  GOOGLE_REVIEW_URL,
  TESTIMONIALS,
} from "@/lib/content";
import ElfsightReviews from "./ElfsightReviews";

function Stars() {
  return (
    <div className="text-gold text-sm tracking-wider" aria-hidden>
      ★★★★★
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
          ✦ Client Experiences
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl text-cream leading-tight max-w-2xl">
          Words From Those
          <br />
          <span className="italic text-gold">Who Have Journeyed</span>
        </h2>

        {ELFSIGHT_WIDGET_ID ? (
          <ElfsightReviews widgetId={ELFSIGHT_WIDGET_ID} />
        ) : (
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-deep-2 p-8 flex flex-col"
              >
                <span className="font-heading text-4xl text-violet-light/60 leading-none">
                  &rdquo;
                </span>
                <Stars />
                <p className="mt-4 text-sm text-cream/90 italic leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-gold text-xs tracking-[0.15em] uppercase">
                    — {t.name}
                    {t.session ? `, ${t.session}` : ""}
                  </p>
                  <a
                    href={GOOGLE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.15em] uppercase text-muted hover:text-gold transition-colors mt-1 inline-block"
                  >
                    ✦ Verified Google Review
                  </a>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-dashed border-white/15 p-8 flex flex-col items-center justify-center text-center">
              <div className="text-gold text-sm tracking-wider mb-4" aria-hidden>
                ★★★★★
              </div>
              <p className="text-sm text-muted italic leading-relaxed">
                More reviews coming soon. Be among the first to share your
                experience with Chakra Healing Hypnosis.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 rounded-full border border-gold/50 text-gold text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-gold hover:text-deep transition-colors"
              >
                ★ Leave a Google Review
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-deep-2 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full bg-cream text-[#4285F4] font-heading text-lg font-bold flex items-center justify-center">
              G
            </span>
            <div>
              <p className="text-cream font-medium">
                Loved your session with Saroja?
              </p>
              <p className="text-sm text-muted">
                Your review helps others find their path to healing.
              </p>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-violet hover:bg-violet-light transition-colors text-cream text-xs tracking-[0.15em] uppercase px-6 py-3.5"
          >
            ★ Leave a Google Review
          </a>
        </div>
      </div>
    </section>
  );
}
