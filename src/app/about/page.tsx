import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Saroja",
  description:
    "Meet Saroja, a QHHT certified Chakra Healing Hypnosis practitioner in Mill Creek, WA, and cancer-remission survivor guiding clients into deep subconscious healing.",
};

export default function AboutPage() {
  return (
    <div className="pt-[112px]">
      <About />
    </div>
  );
}
