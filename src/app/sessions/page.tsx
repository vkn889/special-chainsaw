import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Sessions",
  description:
    "Choose your healing path: an in-person QHHT session in Mill Creek, WA, or a Virtual Quantum Healing Session available worldwide via video call.",
};

export default function SessionsPage() {
  return (
    <div className="pt-[112px]">
      <Services />
    </div>
  );
}
