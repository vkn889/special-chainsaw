"use client";

import Script from "next/script";

export default function ElfsightReviews({ widgetId }: { widgetId: string }) {
  return (
    <div className="mt-14">
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />
      <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />
    </div>
  );
}
