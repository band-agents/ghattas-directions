/**
 * Direction A — NOCTURNE. Logo option 01 (globe G, flared sans).
 *
 * The brand book's own dark pages, extended into a site: navy grounds, the G
 * drawn as a gold hairline the way the book's cover draws it, chapter openers
 * set like the book's section dividers ("02  Logo / System"), and one bright
 * band of brushed gold where the numbers sit. Cormorant for display, Manrope
 * for everything that has to be read at size.
 *
 * Eight pages (see PAGES in content.ts). Sections are components; each page is
 * a list of them under a page head. Mood: a members' club after hours.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Menu, MessageCircle, X } from "lucide-react";

import { Lockup, Mark, Wordmark } from "@/brand/Logo";
import {
  ARTICLES, BOOK, BRAND, CORE_SERVICES, EXPERIENCE, EXPERIENCE_PILLARS, GROUPS, HERO_SPECIALTIES, JOURNEY, NAV,
  PAGES, PASSAGE, PLAN, RECORD, REVIEWS, SIGNATURE, SPECIALTIES, STATS, type Group, type PageId,
} from "@/content";
import { CountUp, LivePlayer, Reveal, RevealGroup, RevealItem, RuleDraw, SplitText } from "@/lib/motion";
import { useHeader } from "@/lib/useHeader";
import { href } from "@/lib/routes";
import { GLOBE, GlobeHero } from "@/remotion/GlobeHero";
import { ROUTE, RouteMap, type RouteTheme } from "@/remotion/RouteMap";
import { GLYPH, ServiceGlyph, type GlyphTheme } from "@/remotion/ServiceGlyph";
import { Booking } from "@/kit/Booking";
import { ContactPanel } from "@/kit/ContactPanel";
import { GOLD, NAVY } from "@/brand/tokens";
import portrait from "@/media/dr-portrait.webp";
import "./nocturne.css";

const LOGO = "globeSans" as const;
const to = (p: PageId) => href("nocturne", p);
const UI = { primary: "nx-btn nx-btn-gold", secondary: "nx-btn nx-btn-ghost" };

const GLYPH_THEME: GlyphTheme = {
  line: "rgba(234,201,152,0.78)", accent: GOLD[200], dim: "rgba(234,201,152,0.16)",
  text: "rgba(255,253,250,0.55)", ink: NAVY[850], font: "Manrope, sans-serif", logo: "globeSans", tight: true,
};

const ROUTE_THEME: RouteTheme = {
  line: "rgba(234,201,152,0.26)", pulse: GOLD[100], city: GOLD.logo, label: "#FFFDFA",
  dim: "rgba(255,253,250,0.45)", hub: GOLD.logo, font: "Manrope, sans-serif", labelWeight: 500,
};

export function Nocturne({ page }: { page: PageId }) {
  return (
    <div className="nx">
      <Header page={page} />
      <main>
        {page === "home" && <>
          <Hero /><Services /><SpecialtyIndex /><Care n="02" /><Numbers /><Doctor n="03" teaser /><Voices n="04" />
          <Journal n="05" limit={3} /><Doors />
        </>}
        {page === "book" && <>
          <PageHead page="book" />
          <section className="nx-sec nx-sec-tight"><div className="nx-wrap"><Booking ui={UI} /></div></section>
          <Visit n="01" />
        </>}
        {page === "private" && <>
          <PageHead page="private" />
          <Pillars n="01" /><Care n="02" /><Doors />
        </>}
        {page === "specialties" && <>
          <PageHead page="specialties" />
          <Treat /><Doors />
        </>}
        {page === "international" && <>
          <PageHead page="international" />
          <Passage n="01" /><Doors />
        </>}
        {page === "doctor" && <>
          <PageHead page="doctor" />
          <Doctor n="01" /><Numbers /><Voices n="02" /><Doors />
        </>}
        {page === "journal" && <>
          <PageHead page="journal" />
          <Journal /><Doors />
        </>}
        {page === "contact" && <>
          <PageHead page="contact" />
          <section className="nx-sec nx-sec-tight"><div className="nx-wrap"><ContactPanel ui={UI} /></div></section>
        </>}
      </main>
      <Footer />
    </div>
  );
}

/* ── Chrome ───────────────────────────────────────────────── */

function Header({ page }: { page: PageId }) {
  const { scrolled, open, setOpen } = useHeader();
  return (
    <header className={`nx-head${scrolled || page !== "home" ? " is-solid" : ""}`}>
      <div className="nx-wrap nx-head-in">
        <a className="nx-logo" href={to("home")} aria-label="Ghattas, for Men's Health: home">
          <Lockup logo={LOGO} height={50} mark="brushed" name="#FFFDFA" sub={GOLD.logo} />
        </a>
        <nav className="nx-links" aria-label="Pages">
          {NAV.map((p) => <a key={p} href={to(p)} aria-current={p === page ? "page" : undefined}>{PAGES[p].nav}</a>)}
        </nav>
        <div className="nx-head-cta">
          <a className="nx-ghost-link" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> Ask privately
          </a>
          <a className="nx-btn nx-btn-gold nx-btn-sm" href={to("book")}>Book</a>
          <button className="nx-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </div>
      {open && (
        <div className="nx-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nx-wrap nx-menu-top">
            <Lockup logo={LOGO} height={40} mark="brushed" name="#FFFDFA" sub={GOLD.logo} />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="nx-wrap nx-menu-list">
            {(["home", ...NAV] as PageId[]).map((p, i) => (
              <a key={p} href={to(p)} onClick={() => setOpen(false)} aria-current={p === page ? "page" : undefined}>
                <span className="u-tnum">{String(i + 1).padStart(2, "0")}</span>{PAGES[p].nav}
              </a>
            ))}
            <a className="nx-btn nx-btn-gold" href={to("book")} onClick={() => setOpen(false)}>Book a private consultation</a>
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

/** Every inner page opens the same way: breadcrumb, kicker, title, and the service's points. */
function PageHead({ page }: { page: PageId }) {
  const p = PAGES[page];
  const sv = CORE_SERVICES.find((s) => s.id === p.service);
  return (
    <section className="nx-phead">
      <Mark logo={LOGO} height="170%" fill={GOLD.logo} outline={1} className="nx-phead-ghost" />
      <div className="nx-wrap nx-phead-grid">
        <div>
          <p className="nx-crumb"><a href={to("home")}>Home</a><span aria-hidden>/</span>{p.nav}</p>
          <p className="nx-kicker">{p.kicker}</p>
          <SplitText as="h1" onMount delay={0.1} text={p.title} accent={p.accent} className="nx-h1 nx-h1-page" />
          {p.line && <Reveal delay={0.3}><p className="nx-phead-line">{p.line}</p></Reveal>}
          <Reveal delay={0.4}><p className="nx-lead">{p.intro}</p></Reveal>
        </div>
        {sv && (
          <Reveal delay={0.5} className="nx-phead-aside">
            <div className="nx-phead-art">
              <LivePlayer component={ServiceGlyph} inputProps={{ ...GLYPH_THEME, kind: sv.id }}
                width={GLYPH.width} height={GLYPH.height} frames={GLYPH.frames} still={40} label={`${sv.name}: ${sv.line}`} />
            </div>
            <ul className="nx-svc-points">{sv.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ── Home: hero ───────────────────────────────────────────── */

function Hero() {
  return (
    <section className="nx-hero" id="hero">
      <Mark logo={LOGO} height="135%" fill={GOLD.logo} outline={1} className="nx-hero-ghost" />
      <div className="nx-wrap nx-hero-grid">
        <div className="nx-hero-copy">
          <motion.p className="nx-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <span className="nx-live" aria-hidden />By appointment only · {BRAND.area.split(",")[0]}
          </motion.p>
          <SplitText as="h1" onMount delay={0.15} text={PLAN.slogan} accent={["Perspective"]} className="nx-h1" />
          <Reveal delay={0.5} className="nx-hero-lead">
            <RuleDraw className="nx-rule-short" delay={0.7} />
            <p>
              {PLAN.bioShort} Led by {BRAND.doctor}, founder of {BRAND.institution}, with more than {BRAND.years} years
              of clinical experience.
            </p>
          </Reveal>
          <Reveal delay={0.62} className="nx-hero-cta">
            <a className="nx-btn nx-btn-gold" href={to("book")}><CalendarCheck size={17} /> Book a private consultation</a>
            <a className="nx-btn nx-btn-ghost" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.74}>
            <ul className="nx-treats">{HERO_SPECIALTIES.map((t) => <li key={t}>{t}</li>)}</ul>
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
            label="Dr. Osama Ghattas seated in front of the Ghattas globe mark, drawn in gold lines and turning slowly"
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

/* ── Home: the four services ─────────────────────────────── */

function Services() {
  return (
    <section className="nx-sec nx-services" id="services">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n="01" a="Your" b="journey" />
          <div>
            <SplitText text="Your Health, Your Journey." className="nx-h2" accent={["Journey"]} />
            <Reveal delay={0.1}>
              <p className="nx-lead">
                A complete healthcare experience designed around the modern man: the four core services patients
                engage with first.
              </p>
            </Reveal>
          </div>
        </div>
        <RevealGroup className="nx-svcs" each={0.1}>
          {CORE_SERVICES.map((sv, i) => (
            <RevealItem as="article" key={sv.id} className="nx-svc">
              <a className="nx-svc-art" href={to(sv.page)} tabIndex={-1} aria-hidden>
                <LivePlayer
                  component={ServiceGlyph} inputProps={{ ...GLYPH_THEME, kind: sv.id }}
                  width={GLYPH.width} height={GLYPH.height} frames={GLYPH.frames} still={40}
                  label={`${sv.name}: ${sv.line}`}
                />
              </a>
              <div className="nx-svc-body">
                <p className="nx-svc-k"><span className="u-tnum">{String(i + 1).padStart(2, "0")}</span>{sv.kicker}</p>
                <h3><a href={to(sv.page)}>{sv.name}</a></h3>
                <p className="nx-svc-line">{sv.line}</p>
                <p className="nx-svc-text">{sv.body}</p>
              </div>
              <div className="nx-svc-side">
                <ul className="nx-svc-points">{sv.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <a className="nx-svc-cta" href={to(sv.page)}>{sv.cta} <ArrowRight size={16} /></a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Every specialty by name, on the home page, so none is only one click deep. */
function SpecialtyIndex() {
  return (
    <section className="nx-index" aria-label="Specialties">
      <div className="nx-wrap nx-index-grid">
        {GROUP_ORDER.map((gk) => (
          <Reveal key={gk} className="nx-index-col">
            <p className="nx-label">{GROUPS[gk].title}</p>
            <ul>{SPECIALTIES.filter((s) => s.group === gk).map((s) => <li key={s.id}><a href={to("specialties")}>{s.name}</a></li>)}</ul>
          </Reveal>
        ))}
        <a className="nx-svc-cta nx-index-cta" href={to("specialties")}>All specialties <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

/* ── Men's Health & Beyond ────────────────────────────────── */

const GROUP_ORDER: Group[] = ["core", "beyond"];

function Treat() {
  const [active, setActive] = useState(0);
  const s = SPECIALTIES[active];
  const g = GROUPS[s.group];
  return (
    <section className="nx-sec" id="treat">
      <div className="nx-wrap">
        <div className="nx-treat">
          <div className="nx-treat-list">
            {GROUP_ORDER.map((gk) => (
              <div key={gk} className="nx-treat-group">
                <p className="nx-treat-gh">{GROUPS[gk].title}<span>{GROUPS[gk].note}</span></p>
                <ol>
                  {SPECIALTIES.map((sv, i) => sv.group !== gk ? null : (
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
                        <span className="nx-treat-min">{GROUPS[sv.group].by}</span>
                      </button>
                      {/* Mobile: the detail opens inline under its own row. */}
                      {i === active && <div className="nx-treat-inline"><p>{sv.summary}</p></div>}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <aside className="nx-treat-card" aria-live="polite">
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Mark logo={LOGO} height={46} fill="brushed" />
              <h3>{s.name}</h3>
              <p className="nx-treat-sum">{s.summary}</p>
              <p className="nx-muted">{g.note}</p>
              <dl className="nx-treat-meta">
                <div><dt>Group</dt><dd>{g.title}</dd></div>
                <div><dt>Seen by</dt><dd>{s.group === "core" ? BRAND.doctor : g.by}</dd></div>
              </dl>
              <a className="nx-btn nx-btn-gold" href={to("book")}>Book {s.short.toLowerCase()} <ArrowRight size={16} /></a>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ── Private care: the plan's four pillars ──────────────── */

function Pillars({ n }: { n: string }) {
  return (
    <section className="nx-sec" id="experience">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n={n} a="The" b="experience" />
          <div>
            <SplitText text={`${EXPERIENCE_PILLARS.title}.`} className="nx-h2" accent={["experience."]} />
            <Reveal delay={0.1}><p className="nx-lead">{EXPERIENCE_PILLARS.intro}</p></Reveal>
          </div>
        </div>
        <RevealGroup className="nx-pillars nx-pillars-4" each={0.09}>
          {EXPERIENCE_PILLARS.pillars.map((p, i) => (
            <RevealItem key={p.title} className="nx-pillar">
              <RuleDraw className="nx-rule" />
              <span className="nx-pillar-n u-tnum">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Signature Care ───────────────────────────────────────── */

function Care({ n }: { n: string }) {
  return (
    <section className="nx-sec nx-care" id="care">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n={n} a="Signature" b="Care" />
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

function Visit({ n }: { n: string }) {
  return (
    <section className="nx-sec nx-visit" id="visit">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n={n} a="The" b="visit" />
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

function Doctor({ n, teaser }: { n: string; teaser?: boolean }) {
  return (
    <section className="nx-sec" id="doctor">
      <div className="nx-wrap nx-doc">
        <Reveal className="nx-doc-frame">
          {/* The mid-thigh crop lives inside this frame, where the frame is
              visibly doing the cutting. */}
          <img src={portrait} alt="Dr. Osama Ghattas" loading="lazy" />
          <span className="nx-doc-cap">{BRAND.doctor}<br /><em>{BRAND.title}</em></span>
        </Reveal>
        <div className="nx-doc-copy">
          <Chapter n={n} a="Your" b="consultant" />
          <SplitText text="One doctor, from the first visit to the last." className="nx-h2" accent={["One", "doctor,"]} />
          <Reveal delay={0.1}>
            <p className="nx-lead">{BOOK.positioning}</p>
            <p className="nx-muted nx-doc-more">{BOOK.positioningMore}</p>
          </Reveal>
          <RevealGroup as="ul" className="nx-record" each={0.08}>
            {RECORD.map(([num, l]) => (
              <RevealItem as="li" key={l}><span className="nx-record-n">{num}</span><span>{l}</span></RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2} className="nx-doc-cta">
            <a className="nx-btn nx-btn-gold" href={to("book")}><CalendarCheck size={17} /> Book with {BRAND.doctorShort}</a>
            {teaser && <a className="nx-btn nx-btn-ghost" href={to("doctor")}>About {BRAND.doctorShort} <ArrowRight size={16} /></a>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── From abroad ──────────────────────────────────────────── */

function Passage({ n }: { n: string }) {
  return (
    <section className="nx-sec nx-passage" id="passage">
      <div className="nx-wrap nx-passage-grid">
        <div>
          <Chapter n={n} a="Ghattas" b="Passage" />
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
          <Reveal delay={0.2}>
            <a className="nx-btn nx-btn-gold nx-passage-cta" href={to("contact")}>Plan your medical journey <ArrowRight size={16} /></a>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="nx-passage-map">
          <LivePlayer
            component={RouteMap} inputProps={ROUTE_THEME}
            width={ROUTE.width} height={ROUTE.height} frames={ROUTE.frames} still={60}
            label="Map centred on Cairo showing flight routes from the Gulf, Africa and Europe, each at its true bearing and distance"
          />
          <p className="nx-map-note">Bearing and distance from Cairo are true. The cities shown are illustrative.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Voices ───────────────────────────────────────────────── */

function Voices({ n }: { n: string }) {
  return (
    <section className="nx-sec nx-voices" id="voices">
      <div className="nx-wrap">
        <div className="nx-sec-head">
          <Chapter n={n} a="In their" b="words" />
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

function Journal({ n, limit }: { n?: string; limit?: number }) {
  const list = limit ? ARTICLES.slice(0, limit) : ARTICLES;
  return (
    <section className="nx-sec" id="journal">
      <div className="nx-wrap">
        {n && (
          <div className="nx-sec-head">
            <Chapter n={n} a="The" b="journal" />
            <SplitText text="Written by the clinic, not by an agency." className="nx-h2" accent={["clinic,"]} />
          </div>
        )}
        <RevealGroup as="ul" className="nx-articles" each={0.08}>
          {list.map((a) => (
            <RevealItem as="li" key={a.title}>
              <div className="nx-article">
                <span className="nx-article-c">{a.category}</span>
                <span className="nx-article-t">{a.title}<span className="nx-article-e">{a.excerpt}</span></span>
                <span className="nx-article-m u-tnum">{a.minutes} min read</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        {n && <Reveal><a className="nx-svc-cta nx-more" href={to("journal")}>All articles <ArrowRight size={16} /></a></Reveal>}
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
          <a className="nx-btn nx-btn-navy" href={to("book")}><CalendarCheck size={17} /> Start booking</a>
        </RevealItem>
        <RevealItem className="nx-door">
          <span className="nx-label">Returning patient</span>
          <h2>Everything from your last visit, waiting.</h2>
          <p>Scans, blood results, prescriptions and your written plan in one place, with discreet mode on by default.</p>
          <a className="nx-btn nx-btn-ghost" href={to("contact")}>Ask about the patient portal <ArrowRight size={16} /></a>
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
          <p className="nx-foot-promise">{PLAN.closing[0]}<br />{PLAN.closing[1]}</p>
        </div>
        <nav className="nx-foot-nav" aria-label="All pages">
          {(["home", "book", ...NAV] as PageId[]).map((p) => <a key={p} href={to(p)}>{PAGES[p].nav}</a>)}
        </nav>
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
