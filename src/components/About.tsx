import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="relative bg-deep py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative mx-auto md:mx-0 max-w-md w-full">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-gold/30" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border border-violet/30" />
          <div className="relative rounded-3xl border border-white/10 p-2 overflow-hidden">
            <Image
              src="/images/saroja-photo.jpg"
              alt="Saroja, QHHT certified Chakra Healing Hypnosis practitioner, smiling on a coastal shoreline"
              width={1015}
              height={1268}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
            <div className="pointer-events-none absolute inset-x-2 bottom-2 h-20 rounded-b-2xl bg-gradient-to-t from-deep via-deep/40 to-transparent" />
          </div>
        </div>

        <div>
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
            ✦ Welcome
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-cream leading-tight">
            Your Soul Has Been
            <br />
            <span className="italic text-gold">Waiting for This</span>
          </h2>
          <div className="w-16 h-px bg-gold/60 my-7" />

          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              I&apos;m <strong className="text-cream">Saroja</strong>, a{" "}
              <strong className="text-cream">
                QHHT certified practitioner
              </strong>{" "}
              here to guide you into a deeply personalized healing experience
              that combines the ancient wisdom of chakra energy work with the
              transformative power of hypnosis.
            </p>
            <p>
              My own path to this work began as a{" "}
              <strong className="text-cream">cancer survivor</strong>. QHHT
              became a profound part of my remission journey — teaching me
              firsthand how deeply the mind, body, and energy field are
              connected, and how much healing becomes possible when we access
              the subconscious with intention and trust. That experience is
              why I do this work, and why I hold every session as sacred.
            </p>
            <p>
              Every session creates a{" "}
              <strong className="text-cream">
                safe, compassionate space
              </strong>{" "}
              where you can release what no longer serves you, explore the
              roots of emotional and physical imbalances, and reconnect with
              the luminous energy that lives within you.
            </p>
            <p>
              Together, we work with your{" "}
              <strong className="text-cream">
                subconscious mind and your energy body
              </strong>{" "}
              — clearing blockages across all seven chakras while accessing
              deep layers of healing that talk therapy alone cannot reach.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-block mt-9 rounded-full bg-violet hover:bg-violet-light shadow-[0_0_30px_rgba(123,79,166,0.35)] transition-colors text-cream text-xs tracking-[0.15em] uppercase px-8 py-4"
          >
            Begin Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
