"use client";

import { CALENDLY_URLS, openCalendlyPopup } from "@/lib/calendly";

const numberedSteps = {
  qhht: [
    {
      title: "A relaxed, unhurried pre-talk conversation",
      detail:
        "(1–2 hrs) exploring your life, your questions, and your intentions. No rush, no judgment — this is your space.",
    },
    {
      title: "Hypnotic induction",
      detail:
        "into the Somnambulistic trance state — a deeply relaxed, receptive level of consciousness where your Higher Self naturally surfaces.",
    },
    {
      title: "Exploration of one or more past lives",
      detail:
        "chosen by your Higher Self — vivid scenes from other times, places, and dimensions with direct relevance to your present life.",
    },
    {
      title: "A direct conversation with your Higher Self",
      detail:
        "receiving answers to your deepest questions and initiating healing on a physical, emotional, and energetic level.",
    },
    {
      title: "A gentle awakening and integration",
      detail: "conversation to close the session and anchor your insights.",
    },
  ],
  virtual: [
    {
      title: "A pre-session conversation",
      detail:
        "via video call to discuss your intentions, questions, and what you wish to heal or understand.",
    },
    {
      title: "Guided hypnotic induction",
      detail:
        "— you relax comfortably in your own space while being gently guided into a deep receptive state.",
    },
    {
      title: "Chakra scanning and clearing",
      detail:
        "across all seven energy centres, with focused work on areas of imbalance or blockage.",
    },
    {
      title: "Subconscious exploration and Higher Self dialogue",
      detail: "— receiving healing, clarity, and answers to your deepest questions.",
    },
    {
      title: "Gentle awakening",
      detail:
        "and a post-session integration conversation to ground your experience.",
    },
  ],
};

const included = [
  "Full pre-session intake and life review conversation",
  "Deep Somnambulistic hypnotic induction",
  "Past life regression and Higher Self dialogue",
  "Energetic and physical healing requests addressed",
  "Post-session integration and grounding support",
  "Personal audio recording — yours to keep forever",
];

const beforeSession = [
  { icon: "📶", text: "Stable internet connection (wired preferred)" },
  { icon: "🤫", text: "Quiet private space — no disturbances for the full session" },
  { icon: "🛏️", text: "Comfortable place to lie down (bed or sofa)" },
  { icon: "📷", text: "Camera showing your face and upper body clearly" },
  { icon: "🎧", text: "Good quality headphones — strongly recommended" },
  { icon: "🔕", text: "Phone on silent, notifications off, door closed" },
];

function StepList({
  steps,
}: {
  steps: { title: string; detail: string }[];
}) {
  return (
    <ol className="divide-y divide-white/10">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4 py-4 first:pt-0">
          <span className="shrink-0 w-7 h-7 rounded-full border border-violet/60 text-violet-light text-sm flex items-center justify-center">
            {i + 1}
          </span>
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-cream font-medium">{step.title}</strong>{" "}
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function Services() {
  return (
    <section id="sessions" className="bg-deep-2 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="font-heading text-4xl sm:text-5xl text-cream leading-tight">
          Choose Your
          <br />
          <span className="italic text-gold">Healing Path</span>
        </h2>

        {/* QHHT Session */}
        <div className="mt-14 rounded-3xl border-t-2 border-transparent bg-gradient-to-r from-violet via-gold to-teal p-[1px]">
          <div className="rounded-[calc(1.5rem-1px)] bg-deep-2 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="rounded-full border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase px-3 py-1.5">
                In-Person · Mill Creek, WA
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-muted">
                4–6 Hours
              </span>
            </div>

            <h3 className="font-heading text-3xl text-cream">QHHT Session</h3>
            <p className="text-xs tracking-[0.15em] uppercase text-muted mt-1">
              Quantum Healing Hypnosis Technique
            </p>

            <p className="mt-5 text-muted leading-relaxed max-w-3xl">
              Developed by the legendary Dolores Cannon over 45 years of
              practice, QHHT guides you into the Somnambulistic level of
              trance — the deepest state of hypnosis — where your most
              profound healing naturally occurs. This is a full-day, deeply
              personal journey into the layers of your consciousness that
              hold your answers, your patterns, and your potential for
              healing.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-10 border-t border-white/10 pt-8">
              <div>
                <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">
                  ✦ What to Expect
                </p>
                <StepList steps={numberedSteps.qhht} />
              </div>

              <div>
                <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">
                  ✦ What&apos;s Included
                </p>
                <ul className="divide-y divide-white/10">
                  {included.map((item) => (
                    <li key={item} className="py-3 text-sm text-muted first:pt-0">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border-l-2 border-gold/60 bg-deep/50 p-4 text-sm text-muted leading-relaxed">
                  <strong className="text-cream">Plan for a full day.</strong>{" "}
                  Wear comfortable clothing and eat a light meal beforehand.
                  Write down your most important questions — these become the
                  heart of your Higher Self conversation.
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => openCalendlyPopup(CALENDLY_URLS.qhht)}
                    className="rounded-full bg-violet hover:bg-violet-light transition-colors text-cream text-xs tracking-[0.15em] uppercase px-6 py-3.5"
                  >
                    📋 Book QHHT Session
                  </button>
                  <button
                    onClick={() => openCalendlyPopup(CALENDLY_URLS.qhht)}
                    className="rounded-full border border-cream/25 hover:border-gold hover:text-gold transition-colors text-cream text-xs tracking-[0.15em] uppercase px-6 py-3.5"
                  >
                    View Calendar ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Session */}
        <div className="mt-10 rounded-3xl border-t-2 border-transparent bg-gradient-to-r from-teal via-gold to-violet p-[1px]">
          <div className="rounded-[calc(1.5rem-1px)] bg-deep-2 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="rounded-full border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase px-3 py-1.5">
                Online · Available Worldwide
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-muted">
                2–3 Hours
              </span>
            </div>

            <h3 className="font-heading text-3xl text-cream">
              Virtual Quantum Healing Session
            </h3>
            <p className="text-xs tracking-[0.15em] uppercase text-muted mt-1">
              Deep Hypnosis &amp; Chakra Healing via Video Call
            </p>

            <p className="mt-5 text-muted leading-relaxed max-w-3xl">
              The Virtual Quantum Healing Session brings the same depth of
              healing and Higher Self connection to clients anywhere in the
              world. Through a secure video call, you are guided into a
              deeply relaxed hypnotic state where chakra balancing,
              subconscious exploration, and energetic healing can all occur —
              regardless of where you are physically located. Your energy
              field has no geographical boundary.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-10 border-t border-white/10 pt-8">
              <div>
                <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">
                  ✦ What to Expect
                </p>
                <StepList steps={numberedSteps.virtual} />
              </div>

              <div>
                <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">
                  ✦ Before Your Session
                </p>
                <ul className="divide-y divide-white/10">
                  {beforeSession.map((item) => (
                    <li
                      key={item.text}
                      className="py-3 text-sm text-muted first:pt-0 flex items-center gap-2.5"
                    >
                      <span>{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border-l-2 border-gold/60 bg-deep/50 p-4 text-sm text-muted leading-relaxed">
                  <strong className="text-cream">
                    Personal audio recording included.
                  </strong>{" "}
                  Many clients find that listening back in the days that
                  follow continues to deepen the healing that began in
                  session.
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => openCalendlyPopup(CALENDLY_URLS.virtual)}
                    className="rounded-full bg-violet hover:bg-violet-light transition-colors text-cream text-xs tracking-[0.15em] uppercase px-6 py-3.5"
                  >
                    📋 Book Virtual Session
                  </button>
                  <button
                    onClick={() => openCalendlyPopup(CALENDLY_URLS.virtual)}
                    className="rounded-full border border-cream/25 hover:border-gold hover:text-gold transition-colors text-cream text-xs tracking-[0.15em] uppercase px-6 py-3.5"
                  >
                    View Calendar ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
