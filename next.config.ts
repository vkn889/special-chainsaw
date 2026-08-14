import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admin-uploaded session story photos are served from Supabase Storage.
    remotePatterns: [
      new URL(
        "https://hkrybdhsvxodvkhvbffm.supabase.co/storage/v1/object/public/session-story-images/**"
      ),
    ],
  },
};

export default nextConfig;
