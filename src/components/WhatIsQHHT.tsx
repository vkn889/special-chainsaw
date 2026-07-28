import Faq from "./Faq";

export default function WhatIsQHHT() {
  return (
    <section id="what-is-this" className="bg-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
            ✦ Understanding the Work
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream leading-tight">
            What Is Chakra
            <br />
            <span className="italic text-gold">Healing Hypnosis?</span>
          </h1>
          <div className="w-16 h-px bg-gold/60 my-7" />

          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              Chakra Healing Hypnosis is a deeply integrative modality that
              combines two powerful healing traditions. Hypnosis guides you
              into a relaxed, receptive state where the subconscious becomes
              accessible — and within that state, we work directly with your
              chakra energy system.
            </p>
            <p>
              The seven chakras are spinning wheels of life-force energy
              running along your spine. When these centers are blocked or
              unbalanced, we experience it as emotional distress, physical
              tension, mental fog, or a sense of disconnection from our
              purpose.
            </p>
            <p>
              In session, I guide you through a hypnotic journey that allows
              your own inner wisdom to surface — revealing what needs
              healing, clearing energetic congestion, and bringing each
              chakra into harmony.
            </p>
          </div>
        </div>

        <Faq />
      </div>
    </section>
  );
}
