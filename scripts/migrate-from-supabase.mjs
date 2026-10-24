// One-off import of the data exported from Supabase (scripts/supabase-export/)
// into Firestore + Firebase Storage. Keeps the original IDs and image file
// names, so it is safe to re-run — it overwrites rather than duplicates.
//
//   node --env-file=.env.local scripts/migrate-from-supabase.mjs
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { initAdmin } from "./firebase-admin.mjs";

const EXPORT_DIR = new URL("./supabase-export/", import.meta.url);

const app = initAdmin();
const db = getFirestore(app);
const bucket = getStorage(app).bucket();

const data = JSON.parse(await readFile(new URL("data.json", EXPORT_DIR), "utf8"));

// Matches the folder names the app uses (EVENT_IMAGE_FOLDER etc.).
const collections = [
  { name: "session_stories", folder: "session-story-images", rows: data.session_stories },
  { name: "events", folder: "event-images", rows: data.events },
];

for (const { name, folder, rows } of collections) {
  for (const { id, ...fields } of rows) {
    if (fields.image_path) {
      const localFile = new URL(`${folder}/${fields.image_path}`, EXPORT_DIR);
      if (!existsSync(localFile)) {
        throw new Error(`Missing exported image ${folder}/${fields.image_path}`);
      }
      const ext = fields.image_path.split(".").pop().toLowerCase();
      await bucket.upload(fileURLToPath(localFile), {
        destination: `${folder}/${fields.image_path}`,
        contentType: ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg",
      });
      console.log(`  uploaded ${folder}/${fields.image_path}`);
    }

    await db.collection(name).doc(id).set(fields);
    console.log(`${name}/${id} — ${fields.title}`);
  }
}

const [stories, events] = await Promise.all([
  db.collection("session_stories").count().get(),
  db.collection("events").count().get(),
]);
console.log(
  `\nDone. Firestore now has ${stories.data().count} session stories and ${events.data().count} events ` +
    `(export had ${data.session_stories.length} and ${data.events.length}).`
);
