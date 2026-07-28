"use client";

import Link from "next/link";
import { CALENDLY_URLS, openCalendlyPopup } from "@/lib/calendly";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep pt-[112px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 w-[420px] h-[420px] rounded-full bg-violet/30 blur-[110px] animate-float" />
        <div className="absolute right-[-80px] top-[8%] w-[380px] h-[380px] rounded-full bg-teal/20 blur-[110px] animate-float-slow" />
        <div className="absolute left-[8%] bottom-[-60px] w-[360px] h-[360px] rounded-full bg-rose/15 blur-[110px] animate-float-slower" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="animate-fade-up text-gold text-xs sm:text-sm tracking-[0.35em] uppercase mb-6"
          style={{ animationDelay: "0.05s" }}
        >
          ✦ Align · Release · Transform ✦
        </p>

        <h1
          className="animate-fade-up font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-cream"
          style={{ animationDelay: "0.15s" }}
        >
          Heal From Within.
          <br />
          <span className="italic text-gold">Awaken Your Energy.</span>
        </h1>

        <p
          className="animate-fade-up mt-8 text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto"
          style={{ animationDelay: "0.3s" }}
        >
          Experience the profound union of Chakra Healing and deep Hypnosis —
          a sacred journey into your subconscious to release blocks, balance
          your energy, and reconnect with your highest self.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <button
            onClick={() => openCalendlyPopup(CALENDLY_URLS.qhht)}
            className="w-full sm:w-auto rounded-full bg-violet hover:bg-violet-light shadow-[0_0_30px_rgba(123,79,166,0.45)] transition-colors text-cream text-xs tracking-[0.15em] uppercase px-8 py-4"
          >
            Book Your Session
          </button>
          <Link
            href="/what-is-this"
            className="w-full sm:w-auto rounded-full border border-cream/25 hover:border-gold hover:text-gold transition-colors text-cream text-xs tracking-[0.15em] uppercase px-8 py-4 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
