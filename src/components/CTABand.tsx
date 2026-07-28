import Link from "next/link";

export default function CTABand() {
  return (
    <section className="relative bg-deep-2 py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-noise-radials" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-2xl mb-3">✨</p>
        <h2 className="font-heading text-4xl sm:text-5xl text-cream leading-tight">
          You Are Ready.
          <br />
          <span className="italic text-gold">Your Healing Awaits.</span>
        </h2>
        <p className="mt-6 text-muted leading-relaxed">
          If you feel called to understand yourself more deeply — if you&apos;re
          ready to release what no longer serves you — you are in exactly the
          right place.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-9 rounded-full bg-violet hover:bg-violet-light shadow-[0_0_30px_rgba(123,79,166,0.4)] transition-colors text-cream text-xs tracking-[0.15em] uppercase px-8 py-4"
        >
          Book Your Session Today
        </Link>
      </div>
    </section>
  );
}
