/**
 * Every word the three directions print, in one place.
 *
 * Three sources, kept apart on purpose:
 *   BOOK — lifted from the Ghattas Clinic brand book (ADMEDICA, 2026). This is
 *          the client's own language and can be used as written.
 *   PLAN, CORE_SERVICES, SPECIALTIES — from the client's marketing launch plan
 *          (Downloads/Ghattas_Clinic_Marketing_Plan final.pdf, 2026-09), including
 *          its website mockup on page 8. Also the client's words, except where a
 *          line is marked "ours".
 *   the rest — carried over from the Elite Clinic build and still PLACEHOLDER:
 *          services, durations, the visit, reviews, articles, contact details
 *          and every procedure count. None of it has been verified.
 *
 * The three directions share this file so that the only thing that differs
 * between them is design. A client comparing them should never be comparing
 * copy.
 */

/* ── Identity ─────────────────────────────────────────────── */

export const BRAND = {
  name: "Ghattas Clinic",
  line: "For Men's Health",
  doctor: "Dr. Osama Ghattas",
  doctorShort: "Dr. Ghattas",
  title: "Consultant Urologist & Andrologist",
  institution: "Dar El Zokora",
  years: 22,
  /* Contact: placeholders until the clinic confirms. */
  phone: "+20 2 3850 1200",
  whatsapp: "+20 100 000 0000",
  whatsappHref: "https://wa.me/201000000000",
  email: "hello@ghattasclinic.com",
  area: "Sheikh Zayed City, Giza",
  hours: "Saturday to Thursday, 11:00 to 21:00",
  hoursNote: "By appointment only",
} as const;

/* ── Brand book ───────────────────────────────────────────── */

export const BOOK = {
  tagline: "A more personal access to expertise.",
  overview: [
    "Ghattas Clinic is a premium healthcare experience created around the expertise of Dr. Osama Ghattas, founder of Dar El Zokora, with more than 22 years of clinical experience.",
    "The clinic was created to give patients easier, more direct access to Dr. Ghattas within a private, efficient, and highly personalized setting, combining trusted medical expertise with priority access, discretion, premium service, and a seamless journey for local and international patients.",
  ],
  vision:
    "To establish Ghattas Clinic as a leading destination for premium specialized care, built around expertise, trust, privacy, and exceptional patient experience.",
  mission:
    "To provide patients with direct access to trusted medical expertise through a highly personalized, discreet, and efficient healthcare experience.",
  positioning:
    "Ghattas Clinic is the premium, personalized expression of Dr. Osama Ghattas' medical expertise.",
  positioningMore:
    "While Dar El Zokora represents the broader institution, team, and specialized capabilities built by Dr. Ghattas, Ghattas Clinic provides a more direct, private, and exclusive route to his expertise.",
  designedFor: [
    "Patients seeking direct access to Dr. Osama Ghattas",
    "Patients who value privacy and premium service",
    "Patients who prefer faster and more flexible care",
    "International patients seeking a fully coordinated experience",
  ],
  /* The plan added Technology to the book's three. */
  values: ["Expertise", "Access", "Privacy", "Technology"] as const,
  valuesLine: "Delivered through Signature Care",
} as const;

/* ── Marketing plan ───────────────────────────────────────── */

export const PLAN = {
  /* "Men's Health" is the category, "A New Perspective" the positioning,
     "A private world" the experience: the plan's own hierarchy. */
  slogan: "A New Perspective on Men's Health.",
  bioShort:
    "A private Men's Health destination bringing together expertise, discretion, technology and personalized care, all in one elevated healthcare experience.",
  bioFull:
    "Designed exclusively around men, Ghattas Clinic brings together medical expertise, discretion, technology and personalized care in one private healthcare experience. From your first appointment to every step of your journey, we are committed to making Men's Health more personal, seamless and accessible.",
  closing: ["More than a clinic.", "A private world of Men's Health."],
} as const;

/**
 * The four core services, "the four services patients engage with first".
 * `line` and `body` are the plan's services page; `points` gather what the
 * plan says elsewhere about the same service: its website mockup, the booking
 * engine and WhatsApp CRM, the tourism partners, the growth services.
 */
export const CORE_SERVICES = [
  {
    id: "appointment",
    name: "Take an Appointment",
    kicker: "Online booking",
    line: "Your time matters.",
    body: "Book your consultation online, choose your date and time, pay securely, and receive instant confirmation.",
    points: [
      "Your own date and time",
      "Secure online payment",
      "Instant confirmation",
      "WhatsApp reminders and follow-up",
      "Arabic and English",
    ],
    cta: "Book Your Appointment",
    page: "book",
  },
  {
    id: "private",
    name: "Own the Clinic",
    kicker: "Private reservation",
    line: "Your privacy comes first.",
    body: "A private clinic journey built around comfort and confidentiality, with dedicated spaces and appointment-based access.",
    points: [
      "A dedicated waiting area",
      "No shared spaces",
      "No waiting time",
      "Appointment-based access",
      "Discreet records and follow-up",
    ],
    cta: "Discover Private Care",
    page: "private",
  },
  {
    id: "abroad",
    name: "Come From Abroad",
    kicker: "International patients",
    line: "From your flight to your follow-up.",
    body: "A complete medical journey for international patients: travel support, accommodation, treatment and follow-up.",
    points: [
      "Flights, hotel and treatment in one package",
      "A dedicated concierge contact",
      "Airport pickup and accommodation",
      "Follow-up once you are home",
      "For you and your family, from the GCC and beyond",
    ],
    cta: "Plan Your Medical Journey",
    page: "international",
  },
  {
    id: "beyond",
    name: "Men's Health & Beyond",
    kicker: "Multidisciplinary care",
    line: "Complete care for the modern man.",
    body: "Andrology and sexual health, plus complementary services like men's aesthetics & plastic surgery.",
    points: [
      "Andrology and sexual health",
      "Men's aesthetics & plastic surgery",
      "Dermatology, skin and hair transplant",
      "Nutrition, hormones and endocrinology",
      "Pain management, psychotherapy, pediatric surgery",
    ],
    cta: "Explore Our Services",
    page: "specialties",
  },
] as const;

/** The plan's brand experience: "four pillars define every patient touchpoint". */
export const EXPERIENCE_PILLARS = {
  title: "The Men's Health experience",
  intro: "Four pillars define every patient touchpoint, from the website to the waiting room.",
  pillars: [
    { title: "Private", body: "Your healthcare journey is designed around discretion and confidentiality." },
    { title: "Personal", body: "Every patient receives individual attention and a journey tailored to their needs." },
    { title: "Expert", body: "Specialized medical expertise sits at the center of every decision." },
    { title: "Seamless", body: "From online booking to treatment and follow-up, every step is connected." },
  ],
} as const;

/** The five parts of the clinic experience, in the book's order. */
export const EXPERIENCE = [
  { title: "Expertise", body: "More than 22 years of clinical experience and the credibility behind the foundation of Dar El Zokora." },
  { title: "Access", body: "A service model designed specifically to make access to Dr. Ghattas easier and more efficient." },
  { title: "Privacy", body: "A discreet and exclusive setting for patients seeking greater confidentiality." },
  { title: "Personalization", body: "A patient journey tailored around individual medical needs, expectations, and schedules." },
  { title: "Hospitality", body: "A premium service experience extending beyond clinical care." },
] as const;

/** Signature Care, the service philosophy. This is the site's "why here". */
export const SIGNATURE = {
  intro: "Signature Care is the service philosophy of Ghattas Clinic.",
  meaning:
    "It means delivering care around the individual patient rather than around the traditional healthcare process.",
  pillars: [
    { title: "Priority Access", body: "Faster and easier access to Dr. Osama Ghattas, consultations, investigations, and procedures." },
    { title: "Personal Attention", body: "A more direct and personalized relationship throughout the patient journey." },
    { title: "Complete Privacy", body: "A discreet environment designed for patients who value confidentiality and personal space." },
    { title: "Seamless Coordination", body: "One carefully managed journey from consultation and diagnosis to treatment, procedures, and follow-up." },
    { title: "Premium Experience", body: "A higher level of comfort, convenience, responsiveness, and service at every touchpoint." },
  ],
} as const;

/** Tone of voice. Each pair is a claim and the limit on it. */
export const PERSONALITY = [
  ["Expert", "yet approachable"],
  ["Premium", "yet understated"],
  ["Private", "yet personal"],
  ["Confident", "yet never excessive"],
  ["Medical", "yet far from institutional"],
] as const;

/* ── Site content (PLACEHOLDER) ───────────────────────────── */

export type Group = "core" | "beyond";

/**
 * Men's Health & Beyond, as the plan lists it: the two core specialties Dr.
 * Ghattas treats himself (Andrology, Sexual Health), then the eight growth
 * services in the plan's own order, hosted on site or reached through the
 * clinic's network. Urology and Fertility were removed at the client's request
 * (2026-09-29) and must not come back. Summaries are the plan's where it gives one;
 * the rest are ours and marked.
 */
export const GROUPS: Record<Group, { title: string; note: string; by: string }> = {
  core: {
    title: "Core specialties",
    note: "Dr. Ghattas' direct clinical foundation, and the reason patients seek out the clinic.",
    by: "Dr. Ghattas",
  },
  beyond: {
    title: "New & complementary",
    note: "Complementary specialties within one trusted, private setting, from visiting specialists and the clinic's referral network.",
    by: "Visiting specialist",
  },
};

export const SPECIALTIES: { id: string; name: string; short: string; group: Group; summary: string }[] = [
  { id: "andrology", name: "Andrology", short: "Andrology", group: "core", summary: "Erectile function, performance and male sexual health." /* ours */ },
  { id: "sexual", name: "Sexual Health", short: "Sexual health", group: "core", summary: "Confidential assessment and treatment of sexual function and wellbeing." /* ours */ },
  { id: "aesthetics", name: "Men's Aesthetics & Plastic Surgery", short: "Aesthetics", group: "beyond", summary: "Partner surgeons hosted on site for consultations and procedures." },
  { id: "skin", name: "Dermatology & Skin Health", short: "Skin health", group: "beyond", summary: "Male-focused skin, hair and grooming treatments." },
  { id: "hair", name: "Hair Transplant", short: "Hair", group: "beyond", summary: "Transplant and regrowth referrals through the clinic network." },
  { id: "pediatric", name: "Pediatric Surgery", short: "Pediatric", group: "beyond", summary: "Surgical care for children, through the same private route." /* ours */ },
  { id: "nutrition", name: "Nutrition & Hormonal Health", short: "Nutrition", group: "beyond", summary: "Wellness and performance-focused specialist add-ons." },
  { id: "endocrinology", name: "Endocrinology", short: "Endocrinology", group: "beyond", summary: "Hormonal and metabolic care from visiting specialists." /* ours */ },
  { id: "pain", name: "Pain Management", short: "Pain", group: "beyond", summary: "Specialist care for chronic and persistent pain." /* ours */ },
  { id: "psychotherapy", name: "Psychotherapy", short: "Psychotherapy", group: "beyond", summary: "Confidential support for the mind as well as the body." /* ours */ },
];

export const JOURNEY = [
  { title: "Book in a minute", body: "Choose what you need, a day and a time. No phone queue and nothing to explain to a receptionist." },
  { title: "Arrive to a room", body: "A separate entrance leads to a private lounge. You will not sit with other patients." },
  { title: "Forty minutes", body: "Long enough to say the whole thing. Tests are done the same visit, not a fortnight later." },
  { title: "Results in your portal", body: "Scans, bloods and your written plan in one place, usually before you get home." },
] as const;

/** `value` animates from zero. `source` is printed under each figure. */
export const STATS = [
  { value: 22, suffix: "+", label: "Years of clinical experience", source: "Brand book" },
  { value: 20000, suffix: "+", label: "Procedures performed", source: "Per the clinic, to confirm" },
  { value: 40, suffix: " min", label: "Standard consultation", source: "Clinic policy" },
  { value: 1, suffix: "", label: "Patient in the clinic at a time", source: "Clinic policy" },
] as const;

export const RECORD = [
  ["22+", "years of clinical experience"],
  ["Founder", "of Dar El Zokora"],
  ["1", "consultant, start to finish"],
] as const;

export const PASSAGE = {
  name: "Ghattas Passage",
  kicker: "Coming from abroad",
  /* Plan: services page, website mockup, and the medical-tourism partners page. */
  lead:
    "A complete medical journey for international patients: travel support, accommodation, treatment and follow-up. From flight tickets to medical support, everything is handled for you and your family.",
  steps: [
    { title: "Reviewed before you fly", body: "Send your reports. Get a plan, a day count and a fixed quote." },
    { title: "One package", body: "Flights, hotel stay and treatment bundled for GCC and international patients." },
    { title: "A dedicated concierge", body: "One contact for airport pickup, accommodation and appointments." },
    { title: "Follow-up from home", body: "Your care continues after you fly back." },
  ],
} as const;

/**
 * Where patients typically travel from. The positions in the route map are
 * real: bearing and great-circle distance from Cairo, computed at render.
 * Which cities to show is illustrative until the clinic says otherwise.
 */
export const ORIGINS = [
  { city: "Riyadh", lat: 24.71, lon: 46.68 },
  { city: "Jeddah", lat: 21.49, lon: 39.19 },
  { city: "Kuwait", lat: 29.38, lon: 47.98 },
  { city: "Dubai", lat: 25.2, lon: 55.27 },
  { city: "Amman", lat: 31.95, lon: 35.93 },
  { city: "Khartoum", lat: 15.5, lon: 32.56 },
  { city: "Tripoli", lat: 32.89, lon: 13.19 },
  { city: "Lagos", lat: 6.52, lon: 3.38 },
  { city: "London", lat: 51.51, lon: -0.13 },
] as const;
export const CAIRO = { lat: 30.04, lon: 31.24 };

export const REVIEWS = [
  {
    initials: "A. M.",
    context: "Andrology",
    body: "I put this off for two years. What changed it was booking at midnight without saying a word to anyone, and walking in through a door no one else was using.",
  },
  {
    initials: "K. S.",
    context: "Andrology",
    body: "Bloods, ultrasound and ECG in one morning, and one doctor who read all of it together instead of handing me three envelopes.",
  },
  {
    initials: "H. F.",
    context: "Sexual health",
    body: "He explained the results to my wife and to me differently, because we needed to hear different things. That is not a small skill.",
  },
] as const;

export const ARTICLES = [
  {
    title: "Low testosterone: what actually counts as a symptom",
    category: "Hormones",
    minutes: 6,
    excerpt: "Tiredness alone proves nothing. What the symptoms and the numbers have to look like before treatment is the right answer.",
  },
  {
    title: "Erectile difficulty is usually physical, and usually treatable",
    category: "Andrology",
    minutes: 5,
    excerpt: "Most cases have a physical cause that a basic workup finds quickly: vascular, hormonal or medication-related.",
  },
  {
    title: "What we mean when we say the visit is private",
    category: "The clinic",
    minutes: 4,
    excerpt: "Privacy is a set of operational decisions, not a promise on a website. These are ours.",
  },
] as const;

/* ── Pages ──────────────────────────────────────────────── */

/**
 * The site map all three directions share. Every direction renders the same
 * eight pages with the same sections in the same order; only the design
 * differs. The overview prints this as its page-by-page table.
 *
 * The four core services each own a page: Take an Appointment is Book, Own
 * the Clinic is Private Care, Come From Abroad is International, and Men's
 * Health & Beyond is the specialties page.
 */
export type PageId = "home" | "book" | "private" | "specialties" | "international" | "doctor" | "journal" | "contact";

export interface PageInfo {
  nav: string;
  kicker: string;
  title: string;
  /** Words in the title set in the accent voice. */
  accent: string[];
  line?: string;
  intro: string;
  /** Which core service this page is, if any; its points go in the page head. */
  service?: (typeof CORE_SERVICES)[number]["id"];
  sections: string[];
  job: string;
}

export const PAGES: Record<PageId, PageInfo> = {
  home: {
    nav: "Home", kicker: "Men's Health", title: PLAN.slogan, accent: ["Perspective"], intro: PLAN.bioShort,
    sections: ["Hero", "Your Health, Your Journey", "Signature Care", "By the numbers", "Your consultant", "In their words", "Journal", "Two doors"],
    job: "Say what this is, then send each visitor to the one of four services he came for.",
  },
  book: {
    nav: "Book", kicker: "Take an Appointment", title: "Book your visit online.", accent: ["online."],
    line: "Your time matters.", intro: CORE_SERVICES[0].body, service: "appointment",
    sections: ["Booking", "The visit"],
    job: "Book in a minute: what for, a day and a time, your details, confirmation.",
  },
  private: {
    nav: "Private Care", kicker: "Own the Clinic", title: "The clinic, for you alone.", accent: ["alone."],
    line: "Your privacy comes first.", intro: CORE_SERVICES[1].body, service: "private",
    sections: ["The Men's Health experience", "Signature Care", "Two doors"],
    job: "Show what private means here, in the plan's four pillars and the book's Signature Care.",
  },
  specialties: {
    nav: "Men's Health", kicker: "Men's Health & Beyond", title: "Complete care for the modern man.", accent: ["modern", "man."],
    intro: CORE_SERVICES[3].body, service: "beyond",
    sections: ["Core specialties", "New & complementary", "Two doors"],
    job: "Answer 'is this for my problem?': two core specialties, eight complementary ones.",
  },
  international: {
    nav: "International", kicker: "Come From Abroad", title: "From your flight to your follow-up.", accent: ["follow-up."],
    intro: CORE_SERVICES[2].body, service: "abroad",
    sections: ["Ghattas Passage", "Two doors"],
    job: "Ghattas Passage: the route map, the package and the concierge.",
  },
  doctor: {
    nav: "Dr. Ghattas", kicker: "Your consultant", title: "Dr. Osama Ghattas.", accent: ["Ghattas."],
    line: BRAND.title, intro: BOOK.overview[0],
    sections: ["The record", "By the numbers", "In their words", "Two doors"],
    job: "The man behind the name: his record, his figures, and what patients say.",
  },
  journal: {
    nav: "Journal", kicker: "Journal", title: "Men's health, explained simply.", accent: ["simply."],
    intro: "Myths and facts about men's health, written by the clinic rather than by an agency.",
    sections: ["Articles", "Two doors"],
    job: "Educational articles, for search and for trust.",
  },
  contact: {
    nav: "Contact", kicker: "Contact", title: "A direct line to the clinic.", accent: ["direct"],
    intro: "WhatsApp, phone or email, for booking, reminders and follow-up. Visits are by appointment only.",
    sections: ["Details", "Enquiry"],
    job: "Every way to reach the clinic, and a short enquiry form.",
  },
};

/** Header order. Book is the button, not a link. */
export const NAV: PageId[] = ["private", "specialties", "international", "doctor", "journal", "contact"];
/** Short names for hero chips: the two core specialties, then two growth services. */
export const HERO_SPECIALTIES = ["Andrology", "Sexual health", "Men's aesthetics", "Skin & hair"];

export const PAGE_ORDER: PageId[] = ["home", "book", "private", "specialties", "international", "doctor", "journal", "contact"];
