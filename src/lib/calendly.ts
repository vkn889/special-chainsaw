export const CALENDLY_URLS = {
  qhht: "https://calendly.com/chakrahhealing-info/qhht-session",
  virtual: "https://calendly.com/chakrahhealing-info/virtual-quantum-healing-session",
} as const;

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function openCalendlyPopup(url: string) {
  if (typeof window === "undefined") return;
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
