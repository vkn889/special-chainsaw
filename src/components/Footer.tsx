import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/content";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="bg-deep border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg text-cream"
        >
          <span className="text-gold">✦</span>
          Chakra Healing Hypnosis
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase text-muted hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-muted hover:text-gold hover:border-gold/50 transition-colors"
            >
              <SocialIcon icon={social.icon} className="w-4 h-4 fill-current" />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs text-muted text-center">
        © 2026 Chakra Healing Hypnosis · www.chakrahealinghypnosis.com
      </p>
    </footer>
  );
}
