"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  EVENT_IMAGE_BUCKET,
  formatEventDate,
  formatEventTime,
  getEventImageUrl,
  type Event,
} from "@/lib/events";

const TIMEZONES = ["PST", "PDT", "MST", "MDT", "CST", "CDT", "EST", "EDT"] as const;

function extensionFor(file: File) {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  return file.type.split("/")[1] || "jpg";
}

export default function EventsManager({
  initialEvents,
}: {
  initialEvents: Event[];
}) {
  const supabase = createClient();

  const [events, setEvents] = useState<Event[]>(initialEvents);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timezone, setTimezone] = useState<string>(TIMEZONES[0]);
  const [location, setLocation] = useState("Online via Zoom");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingImagePath, setEditingImagePath] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  async function loadEvents() {
    const { data, error } = await supabase
      .from("events")
      .select(
        "id,title,description,event_date,start_time,end_time,timezone,location,registration_url,image_path,created_at"
      )
      .order("event_date", { ascending: true })
      .order("start_time", { ascending: true });
    if (!error && data) setEvents(data);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  }

  function resetForm() {
    setEditingId(null);
    setEditingImagePath(null);
    setTitle("");
    setDescription("");
    setEventDate("");
    setStartTime("");
    setEndTime("");
    setTimezone(TIMEZONES[0]);
    setLocation("Online via Zoom");
    setRegistrationUrl("");
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(event: Event) {
    setEditingId(event.id);
    setEditingImagePath(event.image_path);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.event_date);
    setStartTime(event.start_time.slice(0, 5));
    setEndTime(event.end_time ? event.end_time.slice(0, 5) : "");
    setTimezone(event.timezone);
    setLocation(event.location);
    setRegistrationUrl(event.registration_url ?? "");
    setFile(null);
    setPreview(getEventImageUrl(event.image_path));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormError(null);
    setFormSuccess(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!title.trim() || !description.trim() || !eventDate || !startTime) {
      setFormError("Please fill in the title, description, date, and start time.");
      return;
    }

    setSubmitting(true);
    try {
      let imagePath: string | null = editingId ? editingImagePath : null;

      if (file) {
        const path = `${crypto.randomUUID()}.${extensionFor(file)}`;
        const { error: uploadError } = await supabase.storage
          .from(EVENT_IMAGE_BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) {
          setFormError(`Image upload failed: ${uploadError.message}`);
          setSubmitting(false);
          return;
        }
        imagePath = path;
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        event_date: eventDate,
        start_time: startTime,
        end_time: endTime || null,
        timezone,
        location: location.trim() || "Online",
        registration_url: registrationUrl.trim() || null,
        image_path: imagePath,
      };

      const { error: saveError } = editingId
        ? await supabase.from("events").update(payload).eq("id", editingId)
        : await supabase.from("events").insert(payload);

      if (saveError) {
        setFormError(`Could not save the event: ${saveError.message}`);
        setSubmitting(false);
        return;
      }

      const wasEditing = Boolean(editingId);
      resetForm();
      setFormSuccess(
        wasEditing
          ? "Changes saved — already updated on /events."
          : "Published — it's already live on /events."
      );
      await loadEvents();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(event: Event) {
    if (!confirm(`Delete "${event.title}"? This can't be undone.`)) return;

    if (event.image_path) {
      await supabase.storage.from(EVENT_IMAGE_BUCKET).remove([event.image_path]);
    }
    const { error } = await supabase.from("events").delete().eq("id", event.id);
    if (!error) {
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
      if (editingId === event.id) resetForm();
    }
  }

  return (
    <div>
      {/* New / edit event form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-deep-2 p-6 sm:p-8 space-y-5 scroll-mt-8"
      >
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-1">
          {editingId ? "✎ Edit Event" : "✦ New Event"}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label
              htmlFor="eventTitle"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Title
            </label>
            <input
              id="eventTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
              placeholder="e.g. Free Online Past Life Regression Workshop"
            />
          </div>

          <div>
            <label
              htmlFor="eventDate"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Date
            </label>
            <input
              id="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60 [color-scheme:dark]"
            />
          </div>

          <div>
            <label
              htmlFor="timezone"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Start Time
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60 [color-scheme:dark]"
            />
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              End Time (optional)
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60 [color-scheme:dark]"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Location
            </label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
              placeholder="e.g. Online via Zoom, or an address"
            />
          </div>

          <div>
            <label
              htmlFor="registrationUrl"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Registration Link (optional)
            </label>
            <input
              id="registrationUrl"
              type="url"
              value={registrationUrl}
              onChange={(e) => setRegistrationUrl(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
              placeholder="https://…"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="eventImage"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              {editingId ? "Photo (leave blank to keep current)" : "Photo (optional)"}
            </label>
            <input
              id="eventImage"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-2.5 text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-violet file:px-4 file:py-2 file:text-xs file:tracking-[0.1em] file:uppercase file:text-cream"
            />
          </div>

          {preview && (
            <div className="sm:col-span-2">
              <Image
                src={preview}
                alt="Photo preview"
                width={200}
                height={150}
                unoptimized
                className="h-32 w-auto rounded-lg border border-white/10 object-cover"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <label
              htmlFor="eventDescription"
              className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2"
            >
              Description
            </label>
            <textarea
              id="eventDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={8}
              className="w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-cream outline-none focus:border-gold/60"
              placeholder="What is this event? What should people expect?"
            />
          </div>
        </div>

        {formError && (
          <p role="alert" className="text-sm text-root">
            {formError}
          </p>
        )}
        {formSuccess && <p className="text-sm text-heart">{formSuccess}</p>}

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-violet px-6 py-3.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:bg-gold hover:text-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? editingId
                ? "Saving…"
                : "Publishing…"
              : editingId
                ? "Save Changes"
                : "Publish Event"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={submitting}
              className="rounded-full border border-cream/25 px-6 py-3.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing events */}
      <div className="mt-14">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-5">
          ✦ All Events ({events.length})
        </p>

        {events.length === 0 ? (
          <p className="text-sm text-muted italic">
            Nothing scheduled yet — add your first event above.
          </p>
        ) : (
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-deep-2">
            {events.map((event) => (
              <li key={event.id} className="flex items-center gap-4 p-4 sm:p-5">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-deep">
                  {getEventImageUrl(event.image_path) ? (
                    <Image
                      src={getEventImageUrl(event.image_path)!}
                      alt={event.title}
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
                    {event.title}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {formatEventDate(event.event_date)} ·{" "}
                    {formatEventTime(event.start_time)}
                    {event.end_time ? ` – ${formatEventTime(event.end_time)}` : ""}{" "}
                    {event.timezone} · {event.location}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => startEdit(event)}
                    aria-label={`Edit "${event.title}"`}
                    title="Edit"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    aria-label={`Delete "${event.title}"`}
                    title="Delete"
                    className="rounded-full border border-root/40 px-4 py-2 text-[11px] tracking-[0.1em] uppercase text-root transition-colors hover:bg-root/10"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
