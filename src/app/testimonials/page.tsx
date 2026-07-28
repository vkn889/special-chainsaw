import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read verified Google reviews from clients who have journeyed through a Chakra Healing Hypnosis session with Saroja.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-[112px]">
      <Testimonials />
    </div>
  );
}
