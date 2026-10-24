"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebase } from "@/lib/firebase/client";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const { auth } = getFirebase();
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      // Swap the ID token for an httpOnly session cookie the server checks.
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await credential.user.getIdToken() }),
      });
      if (!res.ok) {
        await signOut(auth);
        setError(
          res.status === 403
            ? "This account doesn't have admin access."
            : "Sign-in failed. Please try again."
        );
        setPending(false);
        return;
      }
    } catch {
      setError("Incorrect email or password.");
      setPending(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold/60"
          placeholder="admin@chakrahealinghypnosis.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold/60"
          placeholder="••••••••••"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-root">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-violet px-6 py-3.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:bg-gold hover:text-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
