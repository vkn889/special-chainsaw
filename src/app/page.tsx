import Link from "next/link";
import Hero from "@/components/Hero";
import ChakraStrip from "@/components/ChakraStrip";
import Benefits from "@/components/Benefits";
import CTABand from "@/components/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Chakra Healing Hypnosis with Saroja, a QHHT certified practitioner in Mill Creek, WA. In-person and virtual sessions to release blocks and restore your energy.",
  path: "/",
});

const EXPLORE_LINKS = [
  {
    href: "/about",
    title: "Meet Saroja",
    description: "A QHHT certified practitioner and cancer-remission survivor.",
  },
  {
    href: "/what-is-this",
    title: "What Is This?",
    description: "The philosophy behind the practice, explained simply.",
  },
  {
    href: "/sessions",
    title: "Sessions",
    description: "In-person in Mill Creek, WA, or virtual worldwide.",
  },
  {
    href: "/session-stories",
    title: "Session Stories",
    description: "Real insights and healings from past sessions.",
  },
  {
    href: "/testimonials",
    title: "Testimonials",
    description: "Real words from clients who've walked this path.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <ChakraStrip />
      <Benefits />

      <section className="bg-deep-2 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
            ✦ Where To Go Next
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-cream max-w-xl">
            Choose Your
            <br />
            <span className="italic text-gold">Next Step</span>
          </h2>

          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {EXPLORE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-deep/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-deep/90"
              >
                <h3 className="font-heading text-2xl text-cream mb-2 flex items-center gap-2">
                  {item.title}
                  <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
