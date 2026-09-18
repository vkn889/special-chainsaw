"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, type NavItem, type NavLink } from "@/lib/content";
import { CALENDLY_URLS, openCalendlyPopup } from "@/lib/calendly";

function NavDropdown({
  link,
  isActive,
}: {
  link: Extract<NavLink, { children: NavItem[] }>;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center gap-1.5 py-1 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
          isActive || open
            ? "text-gold drop-shadow-[0_0_6px_rgba(201,168,76,0.6)]"
            : "text-cream/80 hover:text-gold hover:drop-shadow-[0_0_6px_rgba(201,168,76,0.5)]"
        }`}
      >
        {link.label}
        <svg
          viewBox="0 0 10 6"
          aria-hidden
          className={`h-[6px] w-[10px] fill-current transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M0 0 L5 6 L10 0 Z" />
        </svg>
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-gold shadow-[0_0_6px_rgba(201,168,76,0.8)] transition-all duration-300 ${
            isActive ? "w-full" : "w-0"
          }`}
        />
      </button>

      <div
        className={`absolute right-0 top-full mt-3 w-52 origin-top-right rounded-xl border border-white/10 bg-deep-2/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="py-2">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-xs tracking-[0.1em] uppercase text-cream/85 transition-colors hover:bg-white/5 hover:text-gold"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4">
      <header
        className={`relative mx-auto max-w-7xl rounded-2xl border animate-nav-glow transition-colors duration-500 ${
          scrolled || open
            ? "border-gold/25 bg-deep/85 backdrop-blur-xl"
            : "border-white/10 bg-deep/55 backdrop-blur-lg"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <nav className="relative flex items-center justify-between h-[68px] px-5 sm:px-7">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg sm:text-xl text-cream tracking-wide"
          >
            <span className="text-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.75)]">
              ✦
            </span>
            <span>Chakra Healing Hypnosis</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              if ("children" in link) {
                const isActive = link.children.some(
                  (child) => pathname === child.href
                );
                return (
                  <NavDropdown key={link.label} link={link} isActive={isActive} />
                );
              }
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-gold drop-shadow-[0_0_6px_rgba(201,168,76,0.6)]"
                      : "text-cream/80 hover:text-gold hover:drop-shadow-[0_0_6px_rgba(201,168,76,0.5)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold shadow-[0_0_6px_rgba(201,168,76,0.8)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
            <button
              onClick={() => openCalendlyPopup(CALENDLY_URLS.qhht)}
              className="rounded-full bg-violet px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-cream shadow-[0_0_18px_rgba(123,79,166,0.55)] transition-all duration-300 hover:bg-gold hover:text-deep hover:shadow-[0_0_22px_rgba(201,168,76,0.6)]"
            >
              Book Now
            </button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[6px]"
          >
            <span
              className={`block h-px w-6 bg-cream transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-cream transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-6 bg-cream transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            open ? "max-h-[32rem] overflow-y-auto" : "max-h-0"
          } border-t border-white/10`}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => {
              if ("children" in link) {
                return (
                  <div key={link.label} className="flex flex-col gap-3">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted">
                      {link.label}
                    </span>
                    <div className="flex flex-col gap-3 pl-3 border-l border-white/10">
                      {link.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`text-sm tracking-[0.15em] uppercase transition-colors ${
                              isActive ? "text-gold" : "text-cream/85 hover:text-gold"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm tracking-[0.15em] uppercase transition-colors ${
                    isActive ? "text-gold" : "text-cream/85 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setOpen(false);
                openCalendlyPopup(CALENDLY_URLS.qhht);
              }}
              className="rounded-full bg-violet text-cream text-sm tracking-[0.15em] uppercase px-5 py-3 shadow-[0_0_18px_rgba(123,79,166,0.5)] hover:bg-gold hover:text-deep transition-colors text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
