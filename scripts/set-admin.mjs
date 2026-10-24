// Creates (or updates) a Firebase Auth user and grants it the `admin` claim
// the dashboard, security rules and session route all check for.
//
//   node --env-file=.env.local scripts/set-admin.mjs <email> <password>
//
// Re-running with an existing email resets that account's password.
import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "./firebase-admin.mjs";

const [email, password] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error("Usage: node --env-file=.env.local scripts/set-admin.mjs <email> <password (8+ chars)>");
  process.exit(1);
}

const auth = getAuth(initAdmin());

let user;
try {
  user = await auth.getUserByEmail(email);
  user = await auth.updateUser(user.uid, { password });
  console.log(`Updated password for existing user ${email}`);
} catch (error) {
  if (error.code !== "auth/user-not-found") throw error;
  user = await auth.createUser({ email, password, emailVerified: true });
  console.log(`Created user ${email}`);
}

await auth.setCustomUserClaims(user.uid, { admin: true });
console.log(`Granted admin access to ${email} (uid ${user.uid}).`);
