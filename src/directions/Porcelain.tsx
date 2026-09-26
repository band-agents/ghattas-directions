/**
 * Direction B — PORCELAIN. Logo option 02 (globe G, high-contrast serif).
 *
 * The brand book's light pages, extended into a site: porcelain paper, navy
 * ink, gold used as leaf rather than paint. Laid out like a printed journal —
 * every section opens with a running head and a folio, the way each page of
 * the book carries "Business Description … Ghattas Clinic ® Brand Book" along
 * its foot. Bodoni Moda for display, Hanken Grotesk for text.
 *
 * Mood: the consulting room at ten in the morning. Calm, exact, unhurried.
 */

import { ArrowRight, CalendarCheck, Menu, MessageCircle, X } from "lucide-react";

import { Lockup, Mark, Wordmark } from "@/brand/Logo";
import {
  ARTICLES, BOOK, BRAND, EXPERIENCE, JOURNEY, NAV, PASSAGE, QUICK, RECORD, REVIEWS, SERVICES, SIGNATURE, STATS,
} from "@/content";
import { CountUp, LivePlayer, Reveal, RevealGroup, RevealItem, RuleDraw, SplitText, scrollToId } from "@/lib/motion";
import { useHeader } from "@/lib/useHeader";
import { MEDALLION, PorcelainHero } from "@/remotion/PorcelainHero";
import { ROUTE, RouteMap, type RouteTheme } from "@/remotion/RouteMap";
import { GOLD, NAVY } from "@/brand/tokens";
import portrait from "@/media/dr-portrait.webp";
import "./porcelain.css";

const LOGO = "globeSerif" as const;
const ROMAN = ["I", "II", "III", "IV"];

const ROUTE_THEME: RouteTheme = {
  line: "rgba(17,24,38,0.2)", pulse: GOLD[500], city: NAVY[850], label: NAVY[850],
  dim: NAVY[500], hub: GOLD.ink, font: "'Hanken Grotesk', sans-serif", labelWeight: 500,
};

/** Section order doubles as the folio: the page number printed on each head. */
const FOLIO: Record<string, string> = {
  quick: "02", treat: "03", care: "04", visit: "05", numbers: "06", doctor: "07",
  passage: "08", voices: "09", journal: "10", doors: "11",
};

export function Porcelain() {
  return (
    <div className="pc">
      <Header />
      <main>
        <Hero />
        <Contents />
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

function RunningHead({ id, title, tone }: { id: string; title: string; tone?: "dark" }) {
  return (
    <div className={`pc-run${tone ? " pc-run-dark" : ""}`}>
      <span>{title}</span>
      <RuleDraw className="pc-run-rule" />
      <span>Ghattas Clinic ® <i>p.</i> <b className="u-tnum">{FOLIO[id]}</b></span>
    </div>
  );
}

/* ── Chrome ───────────────────────────────────────────────── */

function Header() {
  const { scrolled, open, setOpen } = useHeader();
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <header className={`pc-head${scrolled ? " is-solid" : ""}`}>
      <div className="pc-wrap pc-head-in">
        <button className="pc-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Ghattas Clinic, back to top">
          <Lockup logo={LOGO} height={40} mark="brushed" name={NAVY[850]} sub={GOLD.ink} />
        </button>
        <nav className="pc-links" aria-label="Sections">
          {NAV.map((n) => <button key={n.target} onClick={() => go(n.target)}>{n.label}</button>)}
        </nav>
        <div className="pc-head-cta">
          <button className="pc-btn pc-btn-navy pc-btn-sm" onClick={() => go("doors")}>Book a visit</button>
          <button className="pc-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </div>
      {open && (
        <div className="pc-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="pc-wrap pc-menu-top">
            <Lockup logo={LOGO} height={34} mark="brushed" name={NAVY[850]} sub={GOLD.ink} />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="pc-wrap pc-menu-list">
            {NAV.map((n) => <button key={n.target} onClick={() => go(n.target)}>{n.label}</button>)}
            <button className="pc-btn pc-btn-navy" onClick={() => go("doors")}>Book a private visit</button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */

function Hero() {
  const lead = `The private practice of ${BRAND.doctor}, founder of ${BRAND.institution}, with more than ${BRAND.years} years of clinical experience. One patient at a time, a private entrance, and the consultant himself from the first visit to the last.`;
  return (
    <section className="pc-hero" id="hero">
      <div className="pc-wrap pc-hero-grid">
        <div className="pc-hero-copy">
          <Reveal y={10}><p className="pc-kicker">By appointment only · {BRAND.area.split(",")[0]}</p></Reveal>
          <SplitText as="h1" onMount delay={0.1} each={0.06} text={BOOK.tagline} accent={["expertise"]} className="pc-h1" />
          <Reveal delay={0.45} y={14}>
            <p className="pc-lead pc-dropcap">{lead}</p>
          </Reveal>
          <Reveal delay={0.55} y={14} className="pc-hero-cta">
            <button className="pc-btn pc-btn-navy" onClick={() => scrollToId("doors")}>
              <CalendarCheck size={17} /> Book a private consultation
            </button>
            <a className="pc-textlink" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={0} className="pc-hero-visual">
          <LivePlayer
            component={PorcelainHero}
            width={MEDALLION.width} height={MEDALLION.height} frames={MEDALLION.frames} still={45}
            label="Dr. Osama Ghattas inside a navy medallion framed by the gold ring of the G, with the brand's personality pairs changing beneath"
          />
        </Reveal>
      </div>
      <div className="pc-wrap">
        <RevealGroup className="pc-values" each={0.1}>
          {EXPERIENCE.slice(0, 3).map((e) => (
            <RevealItem key={e.title} className="pc-value">
              <h2>{e.title}</h2>
              <p>{e.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Contents (quick routes) ──────────────────────────────── */

function Contents() {
  return (
    <section className="pc-sec pc-contents" id="quick">
      <div className="pc-wrap">
        <RunningHead id="quick" title="Contents" />
        <div className="pc-toc-grid">
          <Reveal><h2 className="pc-h2">Where to begin.</h2></Reveal>
          <RevealGroup as="ol" className="pc-toc" each={0.07}>
            {QUICK.map((q) => (
              <RevealItem as="li" key={q.id}>
                <button onClick={() => scrollToId(q.target)}>
                  <span className="pc-toc-t">{q.title}</span>
                  <span className="pc-toc-lead" aria-hidden />
                  <span className="pc-toc-p"><i>p.</i> <span className="u-tnum">{FOLIO[q.target]}</span></span>
                  <span className="pc-toc-s">{q.text}</span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ── What we treat ────────────────────────────────────────── */

function Treat() {
  return (
    <section className="pc-sec" id="treat">
      <div className="pc-wrap">
        <RunningHead id="treat" title="What we treat" />
        <SplitText text="Six services. One consultant reading all of it." className="pc-h2 pc-h2-wide" accent={["One", "consultant"]} />
        <RevealGroup className="pc-services" each={0.07}>
          {SERVICES.map((s) => (
            <RevealItem as="article" key={s.id} className="pc-service">
              <p className="pc-service-meta u-tnum">{s.minutes} min · with {BRAND.doctorShort}</p>
              <h3>{s.name}</h3>
              <p className="pc-service-sum">{s.summary}</p>
              <p className="pc-service-det">{s.detail}</p>
              <button className="pc-textlink" onClick={() => scrollToId("doors")}>Book this visit <ArrowRight size={15} /></button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Signature Care ───────────────────────────────────────── */

function Care() {
  return (
    <section className="pc-sec pc-care" id="care">
      <div className="pc-wrap">
        <RunningHead id="care" title="Signature Care" />
        <div className="pc-care-grid">
          <div className="pc-care-intro">
            <Reveal>
              <p className="pc-care-big pc-dropcap">
                <em>Signature Care</em> is the service philosophy of Ghattas Clinic. {SIGNATURE.meaning}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="pc-care-mark">
              <Mark logo={LOGO} height={64} fill="brushed" />
              <p>{BOOK.values.join(" · ")}<br /><i>{BOOK.valuesLine}</i></p>
            </Reveal>
          </div>
          <RevealGroup as="ul" className="pc-pillars" each={0.08}>
            {SIGNATURE.pillars.map((p) => (
              <RevealItem as="li" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ── The visit ────────────────────────────────────────────── */

function Visit() {
  return (
    <section className="pc-sec pc-visit" id="visit">
      <div className="pc-wrap">
        <RunningHead id="visit" title="The visit" />
        <SplitText text="A visit, start to finish." className="pc-h2" accent={["finish."]} />
        <RevealGroup as="ol" className="pc-steps" each={0.1}>
          {JOURNEY.map((j, i) => (
            <RevealItem as="li" key={j.title} className="pc-step">
              <span className="pc-step-n">{ROMAN[i]}</span>
              <h3>{j.title}</h3>
              <p>{j.body}</p>
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
    <section className="pc-sec pc-numbers" id="numbers">
      <div className="pc-wrap">
        <RunningHead id="numbers" title="By the numbers" />
        <RevealGroup className="pc-stats" each={0.08}>
          {STATS.map((s) => (
            <RevealItem key={s.label} className="pc-stat">
              <span className="pc-stat-v"><CountUp value={s.value} suffix={s.suffix} /></span>
              <span className="pc-stat-l">{s.label}</span>
              <span className="pc-stat-s">{s.source}</span>
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
    <section className="pc-sec pc-doctor" id="doctor">
      <div className="pc-wrap">
        <RunningHead id="doctor" title="Your consultant" tone="dark" />
        <div className="pc-doc">
          <div className="pc-doc-copy">
            <SplitText text="One doctor, from the first visit to the last." className="pc-h2" accent={["One", "doctor,"]} />
            <Reveal delay={0.1}>
              <p className="pc-doc-pos">{BOOK.positioning}</p>
              <p className="pc-doc-more">{BOOK.positioningMore}</p>
            </Reveal>
            <RevealGroup as="ul" className="pc-record" each={0.08}>
              {RECORD.map(([n, l]) => (
                <RevealItem as="li" key={l}><b>{n}</b><span>{l}</span></RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.2}>
              <button className="pc-btn pc-btn-gold" onClick={() => scrollToId("doors")}>
                <CalendarCheck size={17} /> Book with {BRAND.doctorShort}
              </button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="pc-doc-arch">
            {/* Mid-thigh crop, inside an arch that visibly does the cutting. */}
            <img src={portrait} alt="Dr. Osama Ghattas" loading="lazy" />
            <span className="pc-doc-cap">{BRAND.doctor} · Founder, {BRAND.institution}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── From abroad ──────────────────────────────────────────── */

function Passage() {
  return (
    <section className="pc-sec pc-passage" id="passage">
      <div className="pc-wrap">
        <RunningHead id="passage" title="From abroad" />
        <div className="pc-passage-grid">
          <div>
            <SplitText text={PASSAGE.name} className="pc-h2" accent={["Passage"]} />
            <Reveal delay={0.1}><p className="pc-lead">{PASSAGE.lead}</p></Reveal>
            <RevealGroup as="ol" className="pc-passage-steps" each={0.08}>
              {PASSAGE.steps.map((s, i) => (
                <RevealItem as="li" key={s.title}>
                  <span className="pc-passage-n">{ROMAN[i]}</span>
                  <div><h3>{s.title}</h3><p>{s.body}</p></div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="pc-map">
            <LivePlayer
              component={RouteMap} inputProps={ROUTE_THEME}
              width={ROUTE.width} height={ROUTE.height} frames={ROUTE.frames} still={60}
              label="Map centred on Cairo showing routes from nine origin cities at their true bearing and distance"
            />
            <p className="pc-caption"><i>Fig. 1</i> Origin cities at their true bearing and distance from Cairo. The selection is illustrative.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Voices ───────────────────────────────────────────────── */

function Voices() {
  const [first, ...rest] = REVIEWS;
  return (
    <section className="pc-sec pc-voices" id="voices">
      <div className="pc-wrap">
        <RunningHead id="voices" title="In their words" />
        <Reveal className="pc-pull">
          <span aria-hidden>&ldquo;</span>
          <blockquote>{first.body}</blockquote>
          <p>{first.initials} · {first.context}</p>
        </Reveal>
        <RevealGroup className="pc-quotes" each={0.1}>
          {rest.map((r) => (
            <RevealItem as="article" key={r.initials} className="pc-quote">
              <blockquote>{r.body}</blockquote>
              <p>{r.initials} · {r.context}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="pc-caption pc-center">Sample testimonials, to be replaced with consented patient words.</p>
      </div>
    </section>
  );
}

/* ── Journal ──────────────────────────────────────────────── */

function Journal() {
  return (
    <section className="pc-sec" id="journal">
      <div className="pc-wrap">
        <RunningHead id="journal" title="Journal" />
        <SplitText text="Written by the clinic, not by an agency." className="pc-h2 pc-h2-wide" accent={["clinic,"]} />
        <RevealGroup className="pc-articles" each={0.08}>
          {ARTICLES.map((a) => (
            <RevealItem as="article" key={a.title} className="pc-article">
              <p className="pc-article-c">{a.category}</p>
              <h3>{a.title}</h3>
              <p className="pc-article-e">{a.excerpt}</p>
              <p className="pc-article-m u-tnum">{a.minutes} min read <ArrowRight size={14} /></p>
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
    <section className="pc-sec pc-doors-sec" id="doors">
      <div className="pc-wrap">
        <RunningHead id="doors" title="Two doors" />
        <RevealGroup className="pc-doors" each={0.12}>
          <RevealItem className="pc-door pc-door-navy">
            <p className="pc-kicker pc-kicker-light">New patient</p>
            <h2>Book without picking up the phone.</h2>
            <p>Choose what you need, a day and a time. Confirmation is immediate, and nothing we send you names the service.</p>
            <button className="pc-btn pc-btn-gold"><CalendarCheck size={17} /> Start booking</button>
          </RevealItem>
          <RevealItem className="pc-door">
            <p className="pc-kicker">Returning patient</p>
            <h2>Everything from your last visit, waiting.</h2>
            <p>Scans, blood results, prescriptions and your written plan in one place, with discreet mode on by default.</p>
            <button className="pc-btn pc-btn-line">Open the patient portal <ArrowRight size={16} /></button>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="pc-foot">
      <div className="pc-wrap">
        <div className="pc-foot-mark">
          <Mark logo={LOGO} height={64} fill="brushed" />
          <Wordmark logo={LOGO} height={84} name={NAVY[850]} sub={GOLD.ink} />
        </div>
        <p className="pc-foot-promise">Every message we send names only &ldquo;Ghattas Clinic&rdquo; and a time.</p>
        <div className="pc-foot-grid">
          <div><p className="pc-kicker">Visit</p><p>{BRAND.area}</p><p className="pc-dim">{BRAND.hoursNote}</p></div>
          <div><p className="pc-kicker">Hours</p><p>{BRAND.hours}</p></div>
          <div><p className="pc-kicker">Private line</p><p className="u-tnum">{BRAND.whatsapp}</p><p className="pc-dim u-tnum">{BRAND.phone}</p></div>
          <div><p className="pc-kicker">Email</p><p>{BRAND.email}</p></div>
        </div>
        <div className="pc-foot-base">
          <span>Contact details are placeholders</span>
          <span>Ghattas Clinic ® {BRAND.line}</span>
        </div>
      </div>
    </footer>
  );
}
