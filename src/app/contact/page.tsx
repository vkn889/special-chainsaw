import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin your journey with Chakra Healing Hypnosis. Check if you're within range for an in-person QHHT session, or book a Virtual Quantum Healing Session.",
};

export default function ContactPage() {
  return (
    <div className="pt-[112px]">
      <Contact />
    </div>
  );
}
