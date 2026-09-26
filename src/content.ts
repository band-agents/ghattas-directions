/**
 * Every word the three directions print, in one place.
 *
 * Two sources, kept apart on purpose:
 *   BOOK — lifted from the Ghattas Clinic brand book (ADMEDICA, 2026). This is
 *          the client's own language and can be used as written.
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
  values: ["Expertise", "Access", "Privacy"] as const,
  valuesLine: "Delivered through Signature Care",
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

export const QUICK = [
  { id: "book", title: "Book a visit", text: "Six services, real slots", target: "doors" },
  { id: "treat", title: "What we treat", text: "Andrology to hormonal health", target: "treat" },
  { id: "doctor", title: "Your consultant", text: "The same doctor, every visit", target: "doctor" },
  { id: "portal", title: "Patient portal", text: "Results, scans, prescriptions", target: "doors" },
] as const;

export const SERVICES = [
  {
    id: "consultation",
    name: "Men's Health Consultation",
    short: "Consultation",
    summary: "A full private consultation with Dr. Osama Ghattas.",
    detail: "History, examination where needed, and a written plan before you leave. Any tests are arranged the same visit.",
    minutes: 40,
  },
  {
    id: "andrology",
    name: "Andrology",
    short: "Andrology",
    summary: "Erectile function, performance and male sexual health.",
    detail: "Most cases have a treatable physical cause that a basic workup finds quickly: vascular, hormonal or medication-related.",
    minutes: 45,
  },
  {
    id: "fertility",
    name: "Male Fertility",
    short: "Fertility",
    summary: "Semen analysis, varicocele assessment and fertility planning.",
    detail: "A full male workup takes one visit and one lab run, and it changes the couple's plan more often than people expect.",
    minutes: 45,
  },
  {
    id: "hormones",
    name: "Hormone & Testosterone",
    short: "Hormones",
    summary: "Low testosterone, energy, mood and metabolic health.",
    detail: "Morning samples, repeated to confirm. Treatment starts only when the numbers and the symptoms agree.",
    minutes: 35,
  },
  {
    id: "urology",
    name: "General Urology",
    short: "Urology",
    summary: "Prostate, urinary symptoms, stones and infections.",
    detail: "Ultrasound and laboratory on site, so an investigation that usually spans three appointments takes one.",
    minutes: 40,
  },
  {
    id: "screening",
    name: "Executive Health Screening",
    short: "Screening",
    summary: "A complete men's check-up in a single half-day.",
    detail: "Cardiovascular, metabolic, hormonal, prostate and urological, read together by one consultant.",
    minutes: 180,
  },
] as const;

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
  lead:
    "One coordinated journey for international patients: your reports reviewed before you fly, a travel letter and flights around the treatment dates, a car at arrivals, a hotel near the clinic, and the clinical work scheduled on consecutive days.",
  steps: [
    { title: "Reviewed before you fly", body: "Send your reports. Get a plan, a day count and a fixed quote." },
    { title: "Travel letter and flights", body: "Booked around the treatment dates, not the other way round." },
    { title: "Met at arrivals", body: "Cairo International, then a car for every visit." },
    { title: "Days, not weeks", body: "Everything scheduled back to back." },
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
    context: "Executive screening",
    body: "Bloods, ultrasound and ECG in one morning, and one doctor who read all of it together instead of handing me three envelopes.",
  },
  {
    initials: "H. F.",
    context: "Male fertility",
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
    title: "Half of fertility difficulty is male. Most of it is never checked.",
    category: "Fertility",
    minutes: 5,
    excerpt: "A full male workup is one visit and one lab run. It changes the plan for the couple more often than anyone expects.",
  },
  {
    title: "What we mean when we say the visit is private",
    category: "The clinic",
    minutes: 4,
    excerpt: "Privacy is a set of operational decisions, not a promise on a website. These are ours.",
  },
] as const;

export const NAV = [
  { label: "Treatments", target: "treat" },
  { label: "Signature Care", target: "care" },
  { label: "Dr. Ghattas", target: "doctor" },
  { label: "International", target: "passage" },
  { label: "Journal", target: "journal" },
] as const;

/**
 * The hierarchy all three directions share, top to bottom. The overview page
 * prints this as the comparison table, so it is also the section contract:
 * every direction renders one block per id, in this order.
 */
export const HIERARCHY = [
  { id: "hero", name: "Hero", job: "Say what this is and who runs it, with the booking button in reach." },
  { id: "quick", name: "Quick routes", job: "Four doors for the four things most visitors came to do." },
  { id: "treat", name: "What we treat", job: "Answer 'is this for my problem?' before anything else." },
  { id: "care", name: "Signature Care", job: "Why here: the five pillars from the brand book." },
  { id: "visit", name: "The visit", job: "What happens, in order, so a first visit feels known." },
  { id: "numbers", name: "By the numbers", job: "Proof in four figures, each with its source." },
  { id: "doctor", name: "The consultant", job: "Dr. Ghattas, his record, and the one-doctor promise." },
  { id: "passage", name: "From abroad", job: "Ghattas Passage for international patients." },
  { id: "voices", name: "In their words", job: "Three patient voices, initials only." },
  { id: "journal", name: "Journal", job: "Written by the clinic, for search and for trust." },
  { id: "doors", name: "Two doors", job: "New patients book; returning patients open the portal." },
] as const;
