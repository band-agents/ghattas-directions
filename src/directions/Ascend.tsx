/**
 * Direction C — ASCEND. Logo option 03 (angular G with the up-arrow).
 *
 * The third mark's geometry runs the whole page: every panel is cut at 45° on
 * two corners the way the mark is cut, the arrow's diagonal becomes hairlines,
 * a staircase and a ticker, and the type is the mark's own pairing, a wide
 * heavy grotesque with an italic serif under it (GHATTAS / Clinic). Archivo at
 * 125% width for display, DM Serif Display italic for the second voice.
 *
 * Mood: confident and forward. Performance medicine, not a waiting room.
 */

import { ArrowRight, ArrowUpRight, CalendarCheck, Menu, MessageCircle, X } from "lucide-react";

import { Lockup, Mark, Wordmark } from "@/brand/Logo";
import {
  ARTICLES, BOOK, BRAND, CORE_SERVICES, GROUPS, JOURNEY, NAV, PASSAGE, PLAN, RECORD, REVIEWS,
  SIGNATURE, SPECIALTIES, STATS, type Group,
} from "@/content";
import { CountUp, LivePlayer, Reveal, RevealGroup, RevealItem, SplitText, scrollToId } from "@/lib/motion";
import { useHeader } from "@/lib/useHeader";
import { ASCEND, AscendHero } from "@/remotion/AscendHero";
import { ROUTE, RouteMap, type RouteTheme } from "@/remotion/RouteMap";
import { GLYPH, ServiceGlyph, type GlyphTheme } from "@/remotion/ServiceGlyph";
import { GOLD, NAVY } from "@/brand/tokens";
import portrait from "@/media/dr-portrait.webp";
import "./ascend.css";

const LOGO = "arrow" as const;

/* Two glyph themes: the cards alternate navy and porcelain. */
const GLYPH_ON_NAVY: GlyphTheme = {
  line: GOLD[200], accent: GOLD[300], dim: "rgba(240,205,157,0.16)", text: "rgba(255,253,250,0.6)", ink: NAVY[850],
  font: "'Archivo', sans-serif", logo: "arrow", tight: true,
};
const GLYPH_ON_PAPER: GlyphTheme = {
  line: NAVY[850], accent: GOLD.ink, dim: "rgba(15,20,29,0.12)", text: NAVY[600], ink: "#FFFDFA",
  font: "'Archivo', sans-serif", logo: "arrow", tight: true,
};

const ROUTE_THEME: RouteTheme = {
  line: "rgba(234,201,152,0.24)", pulse: GOLD[200], city: GOLD[300], label: "#FFFDFA",
  dim: "rgba(255,253,250,0.5)", hub: GOLD[200], font: "'Archivo', sans-serif", labelWeight: 700,
  caps: true, routes: "straight",
};

export function Ascend() {
  return (
    <div className="as">
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Services />
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
    <header className={`as-head${scrolled ? " is-solid" : ""}`}>
      <div className="as-wrap as-head-in">
        <button className="as-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Ghattas Clinic, back to top">
          <Lockup logo={LOGO} height={42} mark="brushed" name="#FFFDFA" sub={GOLD[300]} />
        </button>
        <nav className="as-links" aria-label="Sections">
          {NAV.map((n) => <button key={n.target} onClick={() => go(n.target)}>{n.label}</button>)}
        </nav>
        <div className="as-head-cta">
          <a className="as-icon-link" href={BRAND.whatsappHref} target="_blank" rel="noreferrer" aria-label="Ask on WhatsApp"><MessageCircle size={18} /></a>
          <button className="as-btn as-btn-gold as-btn-sm" onClick={() => go("doors")}>Book <ArrowUpRight size={15} /></button>
          <button className="as-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </div>
      {open && (
        <div className="as-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="as-wrap as-menu-top">
            <Lockup logo={LOGO} height={32} mark="brushed" name="#FFFDFA" sub={GOLD[300]} />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="as-wrap as-menu-list">
            {NAV.map((n) => <button key={n.target} onClick={() => go(n.target)}>{n.label}<ArrowUpRight size={22} /></button>)}
            <button className="as-btn as-btn-gold" onClick={() => go("doors")}>Book a private consultation</button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Label({ children, tone }: { children: string; tone?: "dark" | "light" }) {
  return <span className={`as-label${tone ? ` as-label-${tone}` : ""}`}><i aria-hidden>↗</i>{children}</span>;
}

/* ── Hero ─────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="as-hero" id="hero">
      <div className="as-hero-lines" aria-hidden />
      <div className="as-wrap as-hero-grid">
        <div className="as-hero-copy">
          <Reveal y={12}><Label tone="light">By appointment only · Sheikh Zayed</Label></Reveal>
          <SplitText as="h1" onMount delay={0.1} each={0.06} text={PLAN.slogan} accentFrom={4} className="as-h1" />
          <Reveal delay={0.45} y={16}>
            <p className="as-lead">
              {PLAN.bioShort} Led by {BRAND.doctor}, {BRAND.title.toLowerCase()} and founder of {BRAND.institution},
              with more than {BRAND.years} years of clinical experience.
            </p>
          </Reveal>
          <Reveal delay={0.55} y={16} className="as-hero-cta">
            <button className="as-btn as-btn-gold" onClick={() => scrollToId("doors")}>
              <CalendarCheck size={17} /> Book a private consultation
            </button>
            <a className="as-btn as-btn-line" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.15} y={40} className="as-hero-visual">
          <LivePlayer
            component={AscendHero}
            width={ASCEND.width} height={ASCEND.height} frames={ASCEND.frames} still={120}
            label="Dr. Osama Ghattas seated on a brushed-gold panel cut at 45 degrees, with the Ghattas arrow mark behind him and three facts sliding in"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Ticker() {
  const words = [...BOOK.values, "Men's Health & Beyond", "Signature Care"];
  return (
    <div className="as-ticker" aria-hidden>
      <div className="as-ticker-track">
        {[0, 1].map((k) => (
          <span key={k}>{words.map((w) => <b key={w}>{w}<i>↗</i></b>)}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Your health, your journey ───────────────────────────── */

function Services() {
  return (
    <section className="as-sec as-svcs-sec" id="services">
      <div className="as-wrap">
        <div className="as-sec-head as-svcs-head">
          <div>
            <Label>Your health, your journey</Label>
            <SplitText text="Your Health, Your Journey." className="as-h2" accentFrom={2} />
          </div>
          <Reveal delay={0.1}>
            <p className="as-lead">
              A complete healthcare experience designed around the modern man: the four core services patients
              engage with first.
            </p>
          </Reveal>
        </div>
        <RevealGroup className="as-svcs" each={0.1}>
          {CORE_SERVICES.map((sv, i) => {
            const navy = i === 0 || i === 3; // a diagonal, like the mark
            return (
              <RevealItem as="article" key={sv.id} className={`as-svc as-cut${navy ? " is-navy" : ""}`}>
                <div className="as-svc-top">
                  <span className="as-svc-n u-tnum">{String(i + 1).padStart(2, "0")}</span>
                  <div className="as-svc-art">
                    <LivePlayer
                      component={ServiceGlyph} inputProps={{ ...(navy ? GLYPH_ON_NAVY : GLYPH_ON_PAPER), kind: sv.id }}
                      width={GLYPH.width} height={GLYPH.height} frames={GLYPH.frames} still={40}
                      label={`${sv.name}: ${sv.line}`}
                    />
                  </div>
                </div>
                <Label tone={navy ? "light" : undefined}>{sv.kicker}</Label>
                <h3>{sv.name}</h3>
                <p className="as-svc-line">{sv.line}</p>
                <p className="as-svc-text">{sv.body}</p>
                <ul className="as-svc-points">{sv.points.map((pt) => <li key={pt} className="as-cut">{pt}</li>)}</ul>
                <button className={`as-btn ${navy ? "as-btn-gold" : "as-btn-navy"}`} onClick={() => scrollToId(sv.target)}>
                  {sv.cta} <ArrowUpRight size={16} />
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Men's Health & Beyond ────────────────────────────────── */

const GROUP_ORDER: Group[] = ["core", "beyond"];

function Treat() {
  return (
    <section className="as-sec" id="treat">
      <div className="as-wrap">
        <div className="as-sec-head">
          <Label>Men's health &amp; beyond</Label>
          <SplitText text="Complete care for the modern man." className="as-h2" accentFrom={2} />
        </div>
        {GROUP_ORDER.map((gk) => (
          <div key={gk} className="as-group">
            <Reveal className="as-group-head">
              <h3>{GROUPS[gk].title}</h3>
              <p>{GROUPS[gk].note}</p>
            </Reveal>
            <RevealGroup className="as-services" each={0.05}>
              {SPECIALTIES.filter((sp) => sp.group === gk).map((sp) => (
                <RevealItem as="article" key={sp.id} className={`as-service as-cut${gk === "core" ? " is-core" : ""}`}>
                  <div className="as-service-top">
                    <span className="as-chip as-cut">{gk === "core" ? BRAND.doctorShort : GROUPS[gk].by}</span>
                    <ArrowUpRight size={22} className="as-service-a" />
                  </div>
                  <h4>{sp.name}</h4>
                  <p className="as-service-sum">{sp.summary}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Signature Care ───────────────────────────────────────── */

function Care() {
  return (
    <section className="as-sec as-care" id="care">
      <div className="as-wrap">
        <div className="as-sec-head">
          <Label tone="light">Signature Care</Label>
          <SplitText text="Care built around you, not around the process." className="as-h2 as-h2-light" accentFrom={4} />
          <Reveal delay={0.1}><p className="as-lead as-lead-light">{SIGNATURE.intro} {SIGNATURE.meaning}</p></Reveal>
        </div>
        {/* Five pillars climbing left to right, on the mark's diagonal. */}
        <RevealGroup className="as-stairs" each={0.1}>
          {SIGNATURE.pillars.map((p, i) => (
            <RevealItem key={p.title} className={`as-stair as-cut${i === SIGNATURE.pillars.length - 1 ? " is-top" : ""}`} style={{ ["--i" as string]: i }}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── The visit ────────────────────────────────────────────── */

function Visit() {
  return (
    <section className="as-sec" id="visit">
      <div className="as-wrap">
        <div className="as-sec-head">
          <Label>The visit</Label>
          <SplitText text="A visit, start to finish." className="as-h2" accentFrom={2} />
        </div>
        <RevealGroup as="ol" className="as-steps" each={0.1}>
          {JOURNEY.map((j, i) => (
            <RevealItem as="li" key={j.title} className="as-step">
              <span className="as-step-n u-tnum">{String(i + 1).padStart(2, "0")}</span>
              <h3>{j.title}</h3>
              <p>{j.body}</p>
              {i < JOURNEY.length - 1 && <ArrowRight size={22} className="as-step-a" aria-hidden />}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Numbers ──────────────────────────────────────────────── */

function Numbers() {
  return (
    <section className="as-numbers" id="numbers">
      <div className="as-wrap">
        <Reveal><Label tone="dark">By the numbers</Label></Reveal>
        <RevealGroup className="as-stats" each={0.08}>
          {STATS.map((s) => (
            <RevealItem key={s.label} className="as-stat">
              <span className="as-stat-v"><CountUp value={s.value} suffix={s.suffix} /></span>
              <span className="as-stat-l">{s.label}</span>
              <span className="as-stat-s">{s.source}</span>
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
    <section className="as-sec" id="doctor">
      <div className="as-wrap as-doc">
        <Reveal className="as-doc-panel as-cut">
          <Mark logo={LOGO} height="78%" fill="rgba(234,201,152,0.1)" className="as-doc-mark" />
          {/* Mid-thigh crop, inside a panel whose edge does the cutting. */}
          <img src={portrait} alt="Dr. Osama Ghattas" loading="lazy" />
        </Reveal>
        <div>
          <Label>Your consultant</Label>
          <SplitText text="One doctor, from the first visit to the last." className="as-h2" accentFrom={2} />
          <Reveal delay={0.1}>
            <p className="as-doc-pos">{BOOK.positioning}</p>
            <p className="as-lead">{BOOK.positioningMore}</p>
          </Reveal>
          <RevealGroup className="as-record" each={0.08}>
            {RECORD.map(([n, l]) => (
              <RevealItem key={l} className="as-record-i as-cut"><b>{n}</b><span>{l}</span></RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2}>
            <button className="as-btn as-btn-navy" onClick={() => scrollToId("doors")}>
              <CalendarCheck size={17} /> Book with {BRAND.doctorShort}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── From abroad ──────────────────────────────────────────── */

function Passage() {
  return (
    <section className="as-sec as-passage" id="passage">
      <div className="as-wrap as-passage-grid">
        <div>
          <Label tone="light">From abroad</Label>
          <SplitText text={PASSAGE.name} className="as-h2 as-h2-light" accent={["Passage"]} />
          <Reveal delay={0.1}><p className="as-lead as-lead-light">{PASSAGE.lead}</p></Reveal>
          <RevealGroup as="ol" className="as-passage-steps" each={0.08}>
            {PASSAGE.steps.map((s, i) => (
              <RevealItem as="li" key={s.title}>
                <span className="u-tnum">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Reveal delay={0.1} className="as-map">
          <LivePlayer
            component={RouteMap} inputProps={ROUTE_THEME}
            width={ROUTE.width} height={ROUTE.height} frames={ROUTE.frames} still={60}
            label="Map centred on Cairo showing straight routes from nine origin cities at their true bearing and distance"
          />
          <p className="as-map-note">True bearing and distance from Cairo. Cities illustrative.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Voices ───────────────────────────────────────────────── */

function Voices() {
  return (
    <section className="as-sec" id="voices">
      <div className="as-wrap">
        <div className="as-sec-head">
          <Label>In their words</Label>
          <SplitText text="What men say afterwards." className="as-h2" accent={["afterwards."]} />
        </div>
        <RevealGroup className="as-quotes" each={0.1}>
          {REVIEWS.map((r) => (
            <RevealItem as="article" key={r.initials} className="as-quote as-cut">
              <blockquote>&ldquo;{r.body}&rdquo;</blockquote>
              <footer><b>{r.initials}</b><span>{r.context}</span></footer>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="as-note">Sample testimonials, to be replaced with consented patient words.</p>
      </div>
    </section>
  );
}

/* ── Journal ──────────────────────────────────────────────── */

function Journal() {
  return (
    <section className="as-sec as-journal" id="journal">
      <div className="as-wrap">
        <div className="as-sec-head">
          <Label>Journal</Label>
          <SplitText text="Written by the clinic, not by an agency." className="as-h2" accentFrom={4} />
        </div>
        <RevealGroup as="ul" className="as-articles" each={0.08}>
          {ARTICLES.map((a) => (
            <RevealItem as="li" key={a.title}>
              <a className="as-article" href="#ascend" onClick={(e) => e.preventDefault()}>
                <span className="as-chip as-cut">{a.category}</span>
                <span className="as-article-t">{a.title}</span>
                <span className="as-article-m u-tnum">{a.minutes} min</span>
                <ArrowUpRight size={26} className="as-article-a" />
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
    <section className="as-sec as-doors-sec" id="doors">
      <RevealGroup className="as-wrap as-doors" each={0.12}>
        <RevealItem className="as-door as-door-gold as-cut">
          <Label tone="dark">New patient</Label>
          <h2>Book without picking up the phone.</h2>
          <p>Choose what you need, a day and a time. Confirmation is immediate, and nothing we send you names the service.</p>
          <button className="as-btn as-btn-navy"><CalendarCheck size={17} /> Start booking</button>
        </RevealItem>
        <RevealItem className="as-door as-door-navy as-cut">
          <Label tone="light">Returning patient</Label>
          <h2>Everything from your last visit, waiting.</h2>
          <p>Scans, blood results, prescriptions and your written plan in one place, with discreet mode on by default.</p>
          <button className="as-btn as-btn-line">Open the patient portal <ArrowUpRight size={16} /></button>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="as-foot">
      <Mark logo={LOGO} height="120%" fill="rgba(234,201,152,0.05)" className="as-foot-ghost" />
      <div className="as-wrap">
        <div className="as-foot-top">
          <Wordmark logo={LOGO} height={78} name="#FFFDFA" sub={GOLD[300]} />
          <p>{PLAN.closing[0]}<br />{PLAN.closing[1]}</p>
        </div>
        <div className="as-foot-grid">
          <div><Label tone="light">Visit</Label><p>{BRAND.area}</p><p className="as-dim">{BRAND.hoursNote}</p></div>
          <div><Label tone="light">Hours</Label><p>{BRAND.hours}</p></div>
          <div><Label tone="light">Private line</Label><p className="u-tnum">{BRAND.whatsapp}</p><p className="as-dim u-tnum">{BRAND.phone}</p></div>
          <div><Label tone="light">Email</Label><p>{BRAND.email}</p></div>
        </div>
        <div className="as-foot-base"><span>Ghattas Clinic ® {BRAND.line}</span><span>Contact details are placeholders</span></div>
      </div>
    </footer>
  );
}
