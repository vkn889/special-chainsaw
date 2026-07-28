import type { Metadata } from "next";
import WhatIsQHHT from "@/components/WhatIsQHHT";

export const metadata: Metadata = {
  title: "What Is Chakra Healing Hypnosis?",
  description:
    "Understand how Chakra Healing Hypnosis combines hypnosis and the seven-chakra energy system, plus answers to common questions about the process.",
};

export default function WhatIsThisPage() {
  return (
    <div className="pt-[112px]">
      <WhatIsQHHT />
    </div>
  );
}
