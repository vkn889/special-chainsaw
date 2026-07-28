"use client";

import { useState } from "react";
import { checkDistanceFromPractice, type DistanceCheckResult } from "@/lib/geo";
import { CALENDLY_URLS, openCalendlyPopup } from "@/lib/calendly";

export default function DistanceCheck() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DistanceCheckResult | null>(null);

  async function handleCheck() {
    const query = input.trim();
    if (!query) return;
    setLoading(true);
    setResult(null);
    const outcome = await checkDistanceFromPractice(query);
    setResult(outcome);
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-deep/60 p-5">
      <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
        Check if you&apos;re within 25 miles of Mill Creek, WA
      </p>
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          placeholder="ZIP code or City, State"
          className="flex-1 min-w-0 rounded-xl bg-deep border border-white/15 focus:border-gold outline-none px-4 py-3 text-sm text-cream placeholder:text-muted/60"
        />
        <button
          onClick={handleCheck}
          disabled={loading || !input.trim()}
          className="shrink-0 rounded-full border border-gold/60 text-gold text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-gold hover:text-deep transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {result && (
        <div className="mt-4 text-sm leading-relaxed">
          {result.status === "within-range" && (
            <div className="rounded-xl border-l-2 border-heart bg-heart/10 p-4">
              <p className="text-cream">
                {`✓ You're about ${Math.round(
                  result.miles
                )} miles away — within range for an in-person QHHT session.`}
              </p>
              <button
                onClick={() => openCalendlyPopup(CALENDLY_URLS.qhht)}
                className="mt-4 rounded-full bg-violet hover:bg-violet-light transition-colors text-cream text-xs tracking-[0.15em] uppercase px-6 py-3.5"
              >
                📋 Book QHHT Session
              </button>
            </div>
          )}
          {result.status === "out-of-range" && (
            <div className="rounded-xl border-l-2 border-root bg-root/10 p-4 text-cream">
              {`You're about ${Math.round(
                result.miles
              )} miles away — that's beyond our 25-mile in-person range. A Virtual Quantum Healing Session brings the same depth of healing to you anywhere in the world.`}
            </div>
          )}
          {result.status === "not-found" && (
            <div className="rounded-xl border-l-2 border-gold bg-gold/10 p-4 text-cream">
              We couldn&apos;t find that location. Try a ZIP code or
              &ldquo;City, State&rdquo; format.
            </div>
          )}
          {result.status === "network-error" && (
            <div className="rounded-xl border-l-2 border-gold bg-gold/10 p-4 text-cream">
              The distance check is temporarily unavailable. Please reach out
              directly and we&apos;ll help you figure out the best session
              type.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
