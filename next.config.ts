import type { NextConfig } from "next";

const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const nextConfig: NextConfig = {
  images: {
    // Admin-uploaded session story and event photos are served from Firebase
    // Storage. Object paths are URL-encoded into a single segment
    // (e.g. "event-images%2F<id>.jpg") with an "?alt=media" query.
    remotePatterns: storageBucket
      ? [
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            pathname: `/v0/b/${storageBucket}/o/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
