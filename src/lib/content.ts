export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/what-is-this", label: "What Is This?" },
  { href: "/sessions", label: "Sessions" },
  { href: "/session-stories", label: "Session Stories" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export const CHAKRAS = [
  { name: "Root", color: "#c0392b" },
  { name: "Sacral", color: "#d9822b" },
  { name: "Solar", color: "#d9b93a" },
  { name: "Heart", color: "#3fa66a" },
  { name: "Throat", color: "#3f8fd9" },
  { name: "Third Eye", color: "#4a4ac9" },
  { name: "Crown", color: "#9b5fd9" },
];

export const BENEFITS = [
  {
    icon: "🌱",
    title: "Emotional Release",
    description:
      "Gently dissolve stored grief, fear, anger, and trauma held in your energy field and subconscious mind.",
  },
  {
    icon: "⚡",
    title: "Chakra Balancing",
    description:
      "Identify and clear blockages across all seven energy centers, restoring natural flow and vitality.",
  },
  {
    icon: "🌙",
    title: "Past Life Exploration",
    description:
      "Journey into past lives or deep memory to uncover patterns affecting your present wellbeing.",
  },
  {
    icon: "✨",
    title: "Higher Self Connection",
    description:
      "Access the infinite wisdom of your Higher Self for clarity, purpose, and spiritual direction.",
  },
  {
    icon: "🦋",
    title: "Break Limiting Patterns",
    description:
      "Release self-sabotage, generational trauma, and belief systems that keep you stuck.",
  },
  {
    icon: "❤️‍🩹",
    title: "Physical Healing Support",
    description:
      "Energetic clearing often supports physical wellbeing — the body holds what the mind has not processed.",
  },
];

export const FAQS = [
  {
    question: "Will I be in control during hypnosis?",
    answer:
      "Yes, always. Hypnosis is a state of deep relaxation and focused awareness — you remain in control the entire time and can hear, speak, and respond throughout. You cannot be made to do or say anything against your will, and you can bring yourself out of the state whenever you choose.",
  },
  {
    question: "Do I need to believe in chakras?",
    answer:
      "No prior belief is required. Many clients arrive curious rather than certain, and the process works regardless of your spiritual background. What matters most is an openness to the experience and a willingness to explore your own inner landscape.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Many clients find a single QHHT session deeply transformative, as it is designed to be a comprehensive, full-day experience. Some choose to return for follow-up virtual sessions to continue integrating and deepening their healing over time.",
  },
  {
    question: "Are sessions held in person or online?",
    answer:
      "Both. In-person QHHT sessions are held in Mill Creek, WA for local clients, while Virtual Quantum Healing Sessions are available worldwide via secure video call — your energy field has no geographical boundary.",
  },
  {
    question: "Is there a QHHT practitioner near me in the Seattle area?",
    answer:
      "If you're within about 25 miles of Mill Creek, WA — including Bothell, Everett, Lynnwood, Edmonds, Kirkland, and Seattle — you're within range for an in-person QHHT session. Outside that range, or anywhere else in the world, a Virtual Quantum Healing Session offers the same depth of healing over a secure video call. Use the distance check on the Contact page to confirm you're in range.",
  },
  {
    question: "Will I receive a recording?",
    answer:
      "Yes. Every session includes a personal audio recording that is yours to keep forever. Many clients find that listening back in the days and weeks that follow continues to deepen the healing that began in session.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Saroja came to my home and created such a comfortable connection I felt like I had known her for years. Her calm, confident guidance dropped me into a deep QHHT state and the time flew by. The conversation with my Higher Self was crystal-clear and I received practical answers to long-held questions about purpose, health, and next steps in my work. If you're looking for a practitioner who can hold deep, multi-dimensional space while keeping you safely tethered to the now, book a session with Saroja.",
    name: "Katie Steinle",
    session: "QHHT Session",
  },
  {
    quote:
      "I contacted Chakra Healing Space few months back for the session and had an amazing experience. Saroja is very kind and helpful to take you through the entire process. She is patient in listening the problem and guide you through. She has a beautiful hypnotic voice which instantly takes you very deep. I have recommended many people and they all had great experiences as well. Thank you Saroja, you are the best ❤️",
    name: "Prachi",
    session: "QHHT Session",
  },
  {
    quote:
      "Saroja is the most gentle and loving healer I have worked with in my 25 years of doing healing work. She gently holds your heart but also holds you accountable, sees your challenges and holds her hand to your shoulder as you walk through. I experienced a massive shift in my physical and emotional being and got answers for questions I have carried my whole life. I cannot recommend her work enough.",
    name: "Genn Z",
    session: "QHHT Session",
  },
  {
    quote:
      "What a pleasant experience. She is caring and sincere in the work she does! It was wonderful interacting with her 💜",
    name: "Jacqueline Gilbert",
    session: null,
  },
];

// Google Business Profile listing — used for "Verified Google Review" badges
export const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/place/Chakra+Healing+Hypnosis/@47.7981182,-122.249172,13z/data=!4m8!3m7!1s0x65dba83df48740f9:0x93d81bd4877839c1!8m2!3d47.7980679!4d-122.2079725!9m1!1b1!16s%2Fg%2F11z8j__ztk";

// Direct "write a review" link — used for "Leave a Google Review" buttons
export const GOOGLE_REVIEW_URL = "https://g.page/r/CcE5eIfUG9iTEBM/review";

// Elfsight "Google Reviews" widget ID (the part after "elfsight-app-" in your
// embed code from elfsight.com). Leave empty to show the curated testimonials
// below instead of the live-synced widget.
export const ELFSIGHT_WIDGET_ID = "";

export const CONTACT_EMAIL = "admin@chakrahealinghypnosis.com";

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/chakrahhealinghypnosis?igsh=bjY4eTN2d2Jodzhu&utm_source=qr",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@chakrahhealingqhht?_r=1&_t=ZP-98OMXAbUOI3",
    icon: "tiktok",
  },
] as const;

// Mill Creek, WA
export const PRACTICE_ORIGIN = { lat: 47.8601, lon: -122.2043 };
export const MAX_LOCAL_DISTANCE_MILES = 25;

// Named cities within the ~25mi in-person radius. Naming actual towns
// (rather than only "25 mile radius") is what local/"near me" search
// results tend to reward — used in both the LocalBusiness schema's
// areaServed and in on-page copy.
export const SERVICE_AREA_CITIES = [
  "Mill Creek",
  "Bothell",
  "Everett",
  "Lynnwood",
  "Edmonds",
  "Kirkland",
  "Seattle",
] as const;
