import { CHAKRAS } from "@/lib/content";

export default function ChakraStrip() {
  return (
    <section className="bg-deep-2 border-y border-white/5 py-8">
      <div className="mx-auto max-w-5xl px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
        {CHAKRAS.map((chakra, i) => (
          <div
            key={chakra.name}
            className="flex flex-col items-center gap-2.5"
          >
            <span className="relative flex items-center justify-center w-3 h-3">
              <span
                className="absolute inline-flex h-full w-full rounded-full animate-ripple"
                style={{ backgroundColor: chakra.color, animationDelay: `${i * 0.3}s` }}
              />
              <span
                className="relative inline-flex rounded-full w-3 h-3 animate-pulse-dot"
                style={{ backgroundColor: chakra.color, animationDelay: `${i * 0.3}s` }}
              />
            </span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted">
              {chakra.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
