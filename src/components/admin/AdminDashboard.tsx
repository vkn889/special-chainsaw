"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  SESSION_STORY_IMAGE_BUCKET,
  getSessionStoryImageUrl,
  type SessionStory,
} from "@/lib/session-stories";

const SESSION_TYPES = [
  "QHHT Session",
  "Virtual Quantum Healing Session",
] as const;

function extensionFor(file: File) {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  return file.type.split("/")[1] || "jpg";
}

export default function AdminDashboard({
  email,
  initialStories,
}: {
  email: string;
  initialStories: SessionStory[];
}) {
  const router = useRouter();
  const supabase = createClient();

  // Seeded from the server-rendered page, so the dashboard never needs a
  // client-side bootstrap fetch — `loadStories` below is only ever called
  // from event handlers (after publish/delete), never from an effect.
  const [stories, setStories] = useState<SessionStory[]>(initialStories);

  const [title, setTitle] = useState("");
  const [sessionType, setSessionType] = useState<string>(SESSION_TYPES[0]);
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  async function loadStories() {
    const { data, error } = await supabase
      .from("session_stories")
      .select("id,title,body,image_path,session_type,created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setStories(data);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!title.trim() || !body.trim()) {
      setFormError("Please fill in both a title and the story.");
      return;
    }

    setSubmitting(true);
    try {
      let imagePath: string | null = null;

      if (file) {
        const path = `${crypto.randomUUID()}.${extensionFor(file)}`;
        const { error: uploadError } = await supabase.storage
          .from(SESSION_STORY_IMAGE_BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) {
          setFormError(`Image upload failed: ${uploadError.message}`);
          setSubmitting(false);
          return;
        }
        imagePath = path;
      }

      const { error: insertError } = await supabase.from("session_stories").insert({
        title: title.trim(),
        body: body.trim(),
        session_type: sessionType,
        image_path: imagePath,
      });

      if (insertError) {
        setFormError(`Could not save the story: ${insertError.message}`);
        setSubmitting(false);
        return;
      }

      setTitle("");
      setBody("");
      setSessionType(SESSION_TYPES[0]);
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFormSuccess("Published — it's already live on /session-stories.");
      await loadStories();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(story: SessionStory) {
    if (!confirm(`Delete "${story.title}"? This can't be undone.`)) return;

    if (story.image_path) {
      await supabase.storage.from(SESSION_STORY_IMAGE_BUCKET).remove([story.image_path]);
    }
    const { error } = await supabase.from("session_stories").delete().eq("id", story.id);
    if (!error) setStories((prev) => prev.filter((s) => s.id !== story.id));
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">
            ✦ Admin
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl text-cream">
            Session Stories Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">Signed in as {email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-cream/25 px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Sign Out
        </button>
      </div>

      {/* New story form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-deep-2 p-6 sm:p-8 space-y-5"
      >
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-1">
          ✦ New Session Story
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
              placeholder="e.g. Releasing Generational Grief"
            />
          </div>

          <div>
            <label
              htmlFor="sessionType"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Session Type
            </label>
            <select
              id="sessionType"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
            >
              {SESSION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Photo (optional)
            </label>
            <input
              id="image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-2.5 text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-violet file:px-4 file:py-2 file:text-xs file:tracking-[0.1em] file:uppercase file:text-cream"
            />
            <p className="mt-1.5 text-[11px] text-muted">
              On a phone, this opens your camera automatically.
            </p>
          </div>

          {preview && (
            <div className="sm:col-span-2">
              <Image
                src={preview}
                alt="Selected photo preview"
                width={200}
                height={150}
                unoptimized
                className="h-32 w-auto rounded-lg border border-white/10 object-cover"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <label
              htmlFor="body"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Story / Insights / Healing
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
              placeholder="What insights came through? What healing took place? (Remember to change identifying details to protect client privacy.)"
            />
          </div>
        </div>

        {formError && (
          <p role="alert" className="text-sm text-root">
            {formError}
          </p>
        )}
        {formSuccess && <p className="text-sm text-heart">{formSuccess}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-violet px-6 py-3.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:bg-gold hover:text-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Publishing…" : "Publish Session Story"}
        </button>
      </form>

      {/* Existing stories */}
      <div className="mt-14">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
          ✦ Published Stories ({stories.length})
        </p>

        {stories.length === 0 ? (
          <p className="text-sm text-muted italic">
            Nothing published yet — add your first story above.
          </p>
        ) : (
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-deep-2">
            {stories.map((story) => (
              <li
                key={story.id}
                className="flex items-center gap-4 p-4 sm:p-5"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-deep">
                  {getSessionStoryImageUrl(story.image_path) ? (
                    <Image
                      src={getSessionStoryImageUrl(story.image_path)!}
                      alt={story.title}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gold/70">
                      ✦
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-cream">
                    {story.title}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {story.session_type} ·{" "}
                    {new Date(story.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(story)}
                  className="shrink-0 rounded-full border border-root/40 px-4 py-2 text-[11px] tracking-[0.1em] uppercase text-root transition-colors hover:bg-root/10"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
