"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/content";
import DistanceCheck from "./DistanceCheck";
import SocialIcon from "./SocialIcon";

type SessionType = "qhht" | "virtual" | null;

const virtualChecklist = [
  "Stable internet connection (wired preferred)",
  "Quiet private space — no disturbances for the full session",
  "Comfortable place to lie down (bed or sofa)",
  "Good quality headphones — strongly recommended",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sessionType, setSessionType] = useState<SessionType>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function selectSessionType(type: SessionType) {
    setSessionType(type);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];
    if (!name.trim()) nextErrors.push("Please share your name.");
    if (!email.trim()) nextErrors.push("Please share your email address.");
    if (!sessionType) nextErrors.push("Please select a session type.");
    setErrors(nextErrors);
    if (nextErrors.length) {
      setSubmitted(false);
      return;
    }

    const subject = encodeURIComponent(`Session inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSession type: ${
        sessionType === "qhht" ? "QHHT (in-person)" : "Virtual"
      }\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
            ✦ Reach Out
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream leading-tight">
            Let&apos;s Begin
            <br />
            <span className="italic text-gold">Your Journey</span>
          </h1>
          <div className="w-16 h-px bg-gold/60 my-7" />
          <p className="text-muted leading-relaxed max-w-md">
            Ready to explore what&apos;s possible? Fill out the form and
            I&apos;ll be in touch shortly to schedule your session. I&apos;m
            honoured to walk this path with you.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-cream/90 hover:text-gold transition-colors"
            >
              <span className="text-gold">✉</span>
              {CONTACT_EMAIL}
            </a>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-cream/90 hover:text-gold transition-colors"
              >
                <span className="text-gold">
                  <SocialIcon icon={social.icon} />
                </span>
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl bg-deep-2 border border-white/15 focus:border-gold outline-none px-4 py-3.5 text-sm text-cream placeholder:text-muted/60"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl bg-deep-2 border border-white/15 focus:border-gold outline-none px-4 py-3.5 text-sm text-cream placeholder:text-muted/60"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">
              Session Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => selectSessionType("qhht")}
                className={`flex flex-col items-center gap-2 rounded-2xl border py-6 transition-colors ${
                  sessionType === "qhht"
                    ? "border-gold bg-gold/10"
                    : "border-white/15 hover:border-white/30"
                }`}
              >
                <span className="text-2xl">🌀</span>
                <span className="font-heading text-lg text-cream tracking-wide">
                  QHHT
                </span>
                <span className="text-[11px] tracking-[0.15em] uppercase text-muted">
                  In-Person
                </span>
              </button>
              <button
                type="button"
                onClick={() => selectSessionType("virtual")}
                className={`flex flex-col items-center gap-2 rounded-2xl border py-6 transition-colors ${
                  sessionType === "virtual"
                    ? "border-gold bg-gold/10"
                    : "border-white/15 hover:border-white/30"
                }`}
              >
                <span className="text-2xl">🌐</span>
                <span className="font-heading text-lg text-cream tracking-wide">
                  Virtual
                </span>
                <span className="text-[11px] tracking-[0.15em] uppercase text-muted">
                  Online Session
                </span>
              </button>
            </div>
          </div>

          {sessionType === "qhht" && <DistanceCheck />}

          {sessionType === "virtual" && (
            <div className="rounded-2xl border border-white/10 bg-deep-2 p-5">
              <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                Before your virtual session, you&apos;ll want
              </p>
              <ul className="space-y-2 text-sm text-cream/90">
                {virtualChecklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gold">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Share what's bringing you here, what you hope to explore, or any questions you have..."
              className="w-full rounded-xl bg-deep-2 border border-white/15 focus:border-gold outline-none px-4 py-3.5 text-sm text-cream placeholder:text-muted/60 resize-y"
            />
          </div>

          {errors.length > 0 && (
            <div className="rounded-xl border-l-2 border-root bg-root/10 p-4 text-sm text-cream space-y-1">
              {errors.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          )}

          {submitted && errors.length === 0 && (
            <div className="rounded-xl border-l-2 border-heart bg-heart/10 p-4 text-sm text-cream">
              {`Your email client should now be open with your message ready to send. If it didn't open, email ${CONTACT_EMAIL} directly.`}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-violet hover:bg-violet-light shadow-[0_0_30px_rgba(123,79,166,0.35)] transition-colors text-cream text-xs tracking-[0.15em] uppercase px-8 py-4"
          >
            Send Message ✦
          </button>
        </form>
      </div>
    </section>
  );
}
