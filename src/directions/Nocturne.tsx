/**
 * Direction A — NOCTURNE. Logo option 01 (globe G, flared sans).
 *
 * The brand book's own dark pages, extended into a site: navy grounds, the G
 * drawn as a gold hairline the way the book's cover draws it, chapter openers
 * set like the book's section dividers ("02  Logo / System"), and one bright
 * band of brushed gold where the numbers sit. Cormorant for display, Manrope
 * for everything that has to be read at size.
 *
 * Mood: a members' club after hours. Private, quiet, expensive.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarCheck, Menu, MessageCircle, X } from "lucide-react";

import { Lockup, Mark, Wordmark } from "@/brand/Logo";
import {
  ARTICLES, BOOK, BRAND, EXPERIENCE, JOURNEY, NAV, PASSAGE, QUICK, RECORD, REVIEWS, SERVICES, SIGNATURE, STATS,
} from "@/content";
import { CountUp, LivePlayer, Reveal, RevealGroup, RevealItem, RuleDraw, SplitText, scrollToId } from "@/lib/motion";
import { useHeader } from "@/lib/useHeader";
import { GLOBE, GlobeHero } from "@/remotion/GlobeHero";
import { ROUTE, RouteMap, type RouteTheme } from "@/remotion/RouteMap";
import { GOLD, NAVY } from "@/brand/tokens";
import portrait from "@/media/dr-portrait.webp";
import "./nocturne.css";

const LOGO = "globeSans" as const;
const TREATS = ["Erectile function", "Male fertility", "Testosterone", "Prostate & urology"];

const ROUTE_THEME: RouteTheme = {
  line: "rgba(234,201,152,0.26)", pulse: GOLD[100], city: GOLD.logo, label: "#FFFDFA",
  dim: "rgba(255,253,250,0.45)", hub: GOLD.logo, font: "Manrope, sans-serif", labelWeight: 500,
};

export function Nocturne() {
  return (
    <div className="nx">
      <Header />
      <main>
        <Hero />
        <Quick />
        <Treat />
        <Care />
        <Visit />
        <Numbers />
        <Doctor />
        <Passage />
        <Voices />
        <Journal />
        <Doors />
      </main>
      <Footer />
    </div>
  );
}

/* ── Chrome ───────────────────────────────────────────────── */

function Header() {
  const { scrolled, open, setOpen } = useHeader();
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <header className={`nx-head${scrolled ? " is-solid" : ""}`}>
      <div className="nx-wrap nx-head-in">
        <button className="nx-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Ghattas Clinic, back to top">
          <Lockup logo={LOGO} height={38} mark="brushed" name="#FFFDFA" sub={GOLD.logo} />
        </button>
        <nav className="nx-links" aria-label="Sections">
          {NAV.map((n) => <button key={n.target} onClick={() => go(n.target)}>{n.label}</button>)}
        </nav>
        <div className="nx-head-cta">
          <a className="nx-ghost-link" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> Ask privately
          </a>
          <button className="nx-btn nx-btn-gold nx-btn-sm" onClick={() => go("doors")}>Book</button>
          <button className="nx-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </div>
      {open && (
        <div className="nx-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nx-wrap nx-menu-top">
            <Lockup logo={LOGO} height={34} mark="brushed" name="#FFFDFA" sub={GOLD.logo} />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="nx-wrap nx-menu-list">
            {NAV.map((n, i) => (
              <button key={n.target} onClick={() => go(n.target)}>
                <span className="u-tnum">{String(i + 1).padStart(2, "0")}</span>{n.label}
              </button>
            ))}
            <button className="nx-btn nx-btn-gold" onClick={() => go("doors")}>Book a private consultation</button>
          </nav>
        </div>
      )}
    </header>
  );
}

/** The book's section divider: a big numeral, then a two-line gold label. */
function Chapter({ n, a, b }: { n: string; a: string; b: string }) {
  return (
    <Reveal className="nx-chap">
      <span className="nx-chap-n u-tnum">{n}</span>
      <span className="nx-chap-l"><span>{a}</span><span>{b}</span></span>
    </Reveal>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="nx-hero" id="hero">
      <Mark logo={LOGO} height="135%" fill={GOLD.logo} outline={1} className="nx-hero-ghost" />
      <div className="nx-wrap nx-hero-grid">
        <div className="nx-hero-copy">
          <motion.p className="nx-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <span className="nx-live" aria-hidden />By appointment only · {BRAND.area.split(",")[0]}
          </motion.p>
          <SplitText as="h1" onMount delay={0.15} text={BOOK.tagline} accent={["expertise"]} className="nx-h1" />
          <Reveal delay={0.5} className="nx-hero-lead">
            <RuleDraw className="nx-rule-short" delay={0.7} />
            <p>
              The private practice of {BRAND.doctor}, founder of {BRAND.institution}, with more than {BRAND.years} years
              of clinical experience. One patient at a time, a private entrance, and the consultant himself from the first
              visit to the last.
            </p>
          </Reveal>
          <Reveal delay={0.62} className="nx-hero-cta">
            <button className="nx-btn nx-btn-gold" onClick={() => scrollToId("doors")}>
              <CalendarCheck size={17} /> Book a private consultation
            </button>
            <a className="nx-btn nx-btn-ghost" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.74}>
            <ul className="nx-treats">{TREATS.map((t) => <li key={t}>{t}</li>)}</ul>
          </Reveal>
        </div>
        <motion.div
          className="nx-hero-visual"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <LivePlayer
            component={GlobeHero}
            width={GLOBE.width} height={GLOBE.height} frames={GLOBE.frames}
            label="Dr. Osama Ghattas seated in front of the Ghattas Clinic globe mark, drawn in gold lines and turning slowly"
          />
        </motion.div>
      </div>
      <div className="nx-wrap">
        <Reveal delay={0.9} className="nx-values">
          {BOOK.values.map((v, i) => (
            <span key={v} className="nx-value">{i > 0 && <i aria-hidden>·</i>}{v}</span>
          ))}
          <span className="nx-values-line">{BOOK.valuesLine}</span>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Quick routes ─────────────────────────────────────────── */

function Quick() {
  return (
    <section className="nx-quick" id="quick" aria-label="Quick routes">
      <RevealGroup className="nx-wrap nx-quick-row" each={0.07}>
        {QUICK.map((q) => (
          <RevealItem key={q.id}>
            <button className="nx-quick-item" onClick={() => scrollToId(q.target)}>
              <span className="nx-quick-t">{q.title}</span>
              <span className="nx-quick-s">{q.text}</span>
              <ArrowUpRight size={18} className="nx-quick-a" />
            </button>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ── What we treat ────────────────────────────────────────── */

function Treat() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];
  return (
    <section className="nx-sec" id="treat">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n="01" a="What we" b="treat" />
          <SplitText text="Six services. One consultant reading all of it." className="nx-h2" accent={["One"]} />
        </div>
        <div className="nx-treat">
          <ol className="nx-treat-list">
            {SERVICES.map((sv, i) => (
              <li key={sv.id}>
                <button
                  className={`nx-treat-row${i === active ? " is-on" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={i === active}
                >
                  <span className="nx-treat-n u-tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nx-treat-name">{sv.name}</span>
                  <span className="nx-treat-min u-tnum">{sv.minutes} min</span>
                </button>
                {/* Mobile: the detail opens inline under its own row. */}
                {i === active && (
                  <div className="nx-treat-inline">
                    <p>{sv.summary}</p>
                    <p className="nx-muted">{sv.detail}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <aside className="nx-treat-card" aria-live="polite">
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Mark logo={LOGO} height={46} fill="brushed" />
              <h3>{s.name}</h3>
              <p className="nx-treat-sum">{s.summary}</p>
              <p className="nx-muted">{s.detail}</p>
              <dl className="nx-treat-meta">
                <div><dt>Visit length</dt><dd className="u-tnum">{s.minutes} minutes</dd></div>
                <div><dt>Seen by</dt><dd>{BRAND.doctor}</dd></div>
              </dl>
              <button className="nx-btn nx-btn-gold" onClick={() => scrollToId("doors")}>
                Book {s.short.toLowerCase()} <ArrowRight size={16} />
              </button>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ── Signature Care ───────────────────────────────────────── */

function Care() {
  return (
    <section className="nx-sec nx-care" id="care">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n="02" a="Signature" b="Care" />
          <div>
            <SplitText text={SIGNATURE.intro} className="nx-h2" accent={["Signature", "Care"]} />
            <Reveal delay={0.1}><p className="nx-lead">{SIGNATURE.meaning}</p></Reveal>
          </div>
        </div>
        <RevealGroup className="nx-pillars" each={0.09}>
          {SIGNATURE.pillars.map((p) => (
            <RevealItem key={p.title} className="nx-pillar">
              <RuleDraw className="nx-rule" />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <div className="nx-marquee" aria-hidden>
        <div className="nx-marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>{EXPERIENCE.map((e) => <em key={e.title}>{e.title}</em>)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The visit ────────────────────────────────────────────── */

function Visit() {
  return (
    <section className="nx-sec nx-visit" id="visit">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n="03" a="The" b="visit" />
          <SplitText text="A visit, start to finish." className="nx-h2" accent={["finish."]} />
        </div>
        <div className="nx-steps">
          <RuleDraw className="nx-steps-line" />
          <RevealGroup className="nx-steps-row" each={0.12}>
            {JOURNEY.map((j, i) => (
              <RevealItem key={j.title} className="nx-step">
                <span className="nx-step-dot" aria-hidden />
                <span className="nx-step-n u-tnum">Step {i + 1}</span>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ── Numbers ──────────────────────────────────────────────── */

function Numbers() {
  return (
    <section className="nx-numbers" id="numbers">
      <Mark logo={LOGO} height="160%" fill={NAVY[850]} outline={1} className="nx-numbers-ghost" />
      <div className="nx-wrap">
        <Reveal className="nx-numbers-head">
          <span className="nx-label nx-label-dark">By the numbers</span>
          <h2>Measured, not estimated.</h2>
        </Reveal>
        <RevealGroup className="nx-numbers-row" each={0.08}>
          {STATS.map((s) => (
            <RevealItem key={s.label} className="nx-stat">
              <span className="nx-stat-v"><CountUp value={s.value} suffix={s.suffix} /></span>
              <span className="nx-stat-l">{s.label}</span>
              <span className="nx-stat-s">{s.source}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── The consultant ───────────────────────────────────────── */

function Doctor() {
  return (
    <section className="nx-sec" id="doctor">
      <div className="nx-wrap nx-doc">
        <Reveal className="nx-doc-frame">
          {/* The mid-thigh crop lives inside this frame, where the frame is
              visibly doing the cutting. */}
          <img src={portrait} alt="Dr. Osama Ghattas" loading="lazy" />
          <span className="nx-doc-cap">{BRAND.doctor}<br /><em>Founder, {BRAND.institution}</em></span>
        </Reveal>
        <div className="nx-doc-copy">
          <Chapter n="04" a="Your" b="consultant" />
          <SplitText text="One doctor, from the first visit to the last." className="nx-h2" accent={["One", "doctor,"]} />
          <Reveal delay={0.1}>
            <p className="nx-lead">{BOOK.positioning}</p>
            <p className="nx-muted nx-doc-more">{BOOK.positioningMore}</p>
          </Reveal>
          <RevealGroup as="ul" className="nx-record" each={0.08}>
            {RECORD.map(([n, l]) => (
              <RevealItem as="li" key={l}><span className="nx-record-n">{n}</span><span>{l}</span></RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2} className="nx-doc-cta">
            <button className="nx-btn nx-btn-gold" onClick={() => scrollToId("doors")}><CalendarCheck size={17} /> Book with {BRAND.doctorShort}</button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── From abroad ──────────────────────────────────────────── */

function Passage() {
  return (
    <section className="nx-sec nx-passage" id="passage">
      <div className="nx-wrap nx-passage-grid">
        <div>
          <Chapter n="05" a="From" b="abroad" />
          <SplitText text={PASSAGE.name} className="nx-h2" accent={["Passage"]} />
          <Reveal delay={0.1}><p className="nx-lead">{PASSAGE.lead}</p></Reveal>
          <RevealGroup as="ol" className="nx-passage-steps" each={0.08}>
            {PASSAGE.steps.map((s, i) => (
              <RevealItem as="li" key={s.title}>
                <span className="u-tnum">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Reveal delay={0.1} className="nx-passage-map">
          <LivePlayer
            component={RouteMap} inputProps={ROUTE_THEME}
            width={ROUTE.width} height={ROUTE.height} frames={ROUTE.frames} still={60}
            label="Map centred on Cairo showing flight routes from Riyadh, Jeddah, Kuwait, Dubai, Amman, Khartoum, Tripoli, Lagos and London, each at its true bearing and distance"
          />
          <p className="nx-map-note">Bearing and distance from Cairo are true. The cities shown are illustrative.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Voices ───────────────────────────────────────────────── */

function Voices() {
  return (
    <section className="nx-sec nx-voices" id="voices">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n="06" a="In their" b="words" />
          <SplitText text="What men say afterwards." className="nx-h2" accent={["afterwards."]} />
        </div>
        <RevealGroup className="nx-quotes" each={0.1}>
          {REVIEWS.map((r) => (
            <RevealItem key={r.initials} as="article" className="nx-quote">
              <span className="nx-quote-mark" aria-hidden>&ldquo;</span>
              <blockquote>{r.body}</blockquote>
              <footer><span>{r.initials}</span>{r.context}</footer>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="nx-note">Sample testimonials. To be replaced with consented patient words, initials only.</p>
      </div>
    </section>
  );
}

/* ── Journal ──────────────────────────────────────────────── */

function Journal() {
  return (
    <section className="nx-sec" id="journal">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n="07" a="The" b="journal" />
          <SplitText text="Written by the clinic, not by an agency." className="nx-h2" accent={["clinic,"]} />
        </div>
        <RevealGroup as="ul" className="nx-articles" each={0.08}>
          {ARTICLES.map((a) => (
            <RevealItem as="li" key={a.title}>
              <a className="nx-article" href="#nocturne" onClick={(e) => e.preventDefault()}>
                <span className="nx-article-c">{a.category}</span>
                <span className="nx-article-t">{a.title}</span>
                <span className="nx-article-m u-tnum">{a.minutes} min read</span>
                <ArrowRight size={20} className="nx-article-a" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Two doors ────────────────────────────────────────────── */

function Doors() {
  return (
    <section className="nx-sec nx-doors-sec" id="doors">
      <RevealGroup className="nx-wrap nx-doors" each={0.12}>
        <RevealItem className="nx-door nx-door-gold">
          <span className="nx-label nx-label-dark">New patient</span>
          <h2>Book without picking up the phone.</h2>
          <p>Choose what you need, a day and a time. Confirmation is immediate, and nothing we send you names the service.</p>
          <button className="nx-btn nx-btn-navy"><CalendarCheck size={17} /> Start booking</button>
        </RevealItem>
        <RevealItem className="nx-door">
          <span className="nx-label">Returning patient</span>
          <h2>Everything from your last visit, waiting.</h2>
          <p>Scans, blood results, prescriptions and your written plan in one place, with discreet mode on by default.</p>
          <button className="nx-btn nx-btn-ghost">Open the patient portal <ArrowRight size={16} /></button>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="nx-foot">
      <div className="nx-wrap">
        <div className="nx-foot-top">
          <Wordmark logo={LOGO} height={72} name="#FFFDFA" sub={GOLD.logo} />
          <p className="nx-foot-promise">Every message we send names only &ldquo;Ghattas Clinic&rdquo; and a time.</p>
        </div>
        <div className="nx-foot-grid">
          <div><span className="nx-label">Visit</span><p>{BRAND.area}</p><p className="nx-muted">{BRAND.hoursNote}</p></div>
          <div><span className="nx-label">Hours</span><p>{BRAND.hours}</p></div>
          <div><span className="nx-label">Private line</span><p className="u-tnum">{BRAND.whatsapp}</p><p className="nx-muted u-tnum">{BRAND.phone}</p></div>
          <div><span className="nx-label">Email</span><p>{BRAND.email}</p></div>
        </div>
        <div className="nx-foot-base">
          <span>Ghattas Clinic ® {BRAND.line}</span>
          <span>Contact details are placeholders</span>
        </div>
      </div>
    </footer>
  );
}
