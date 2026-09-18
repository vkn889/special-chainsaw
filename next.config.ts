import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admin-uploaded session story and event photos are served from Supabase Storage.
    remotePatterns: [
      new URL(
        "https://hkrybdhsvxodvkhvbffm.supabase.co/storage/v1/object/public/session-story-images/**"
      ),
      new URL(
        "https://hkrybdhsvxodvkhvbffm.supabase.co/storage/v1/object/public/event-images/**"
      ),
    ],
  },
};

export default nextConfig;
