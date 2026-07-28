import { BENEFITS } from "@/lib/content";

export default function Benefits() {
  return (
    <section className="bg-deep-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
          ✦ How This Supports You
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl text-cream max-w-2xl">
          What <span className="italic text-gold">Healing</span> Can Look
          Like
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-deep/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-deep/90"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet via-gold to-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="text-3xl mb-5">{benefit.icon}</div>
              <h3 className="font-heading text-xl text-cream mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
