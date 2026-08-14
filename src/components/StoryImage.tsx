import Image from "next/image";
import { CHAKRAS } from "@/lib/content";

/** Deterministically picks two chakra colors from a story's id so each
 *  placeholder card gets a distinct, repeatable gradient instead of random
 *  flicker between renders. */
function pickChakraPair(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const a = CHAKRAS[hash % CHAKRAS.length];
  const b = CHAKRAS[(hash + 3) % CHAKRAS.length];
  return [a, b] as const;
}

/** The "small image" half of a session story card. Renders the admin's
 *  uploaded photo when one exists, otherwise a soft generated aura in the
 *  site's chakra palette so every entry still reads as a distinct piece of
 *  visual content while awaiting a real photo. */
export default function StoryImage({
  src,
  alt,
  seed,
}: {
  src: string | null;
  alt: string;
  seed: string;
}) {
  if (src) {
    return (
      <div className="relative h-48 w-full overflow-hidden bg-deep">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const [colorA, colorB] = pickChakraPair(seed);

  return (
    <div
      className="relative h-48 w-full overflow-hidden bg-deep"
      style={{
        backgroundImage: `radial-gradient(ellipse 140% 120% at 20% 15%, ${colorA.color}55, transparent 65%), radial-gradient(ellipse 140% 120% at 85% 90%, ${colorB.color}45, transparent 65%)`,
      }}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border animate-float-slow"
        style={{ borderColor: `${colorA.color}70` }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border animate-float"
        style={{ borderColor: `${colorB.color}40` }}
      />
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-gold/80 drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]"
        aria-hidden
      >
        ✦
      </span>
    </div>
  );
}
