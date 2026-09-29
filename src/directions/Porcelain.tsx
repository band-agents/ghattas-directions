/**
 * Direction B — PORCELAIN. Logo option 02 (globe G, high-contrast serif).
 *
 * The brand book's light pages, extended into a site: porcelain paper, navy
 * ink, gold used as leaf rather than paint. Laid out like a printed journal:
 * every section opens with a running head carrying the page's folio, the way
 * each page of the book carries "… Ghattas Clinic ® Brand Book" along its foot.
 * Bodoni Moda for display, Hanken Grotesk for text.
 *
 * Eight pages; the folio printed on every running head is the page's number
 * in the site, so "p. 04" on a link is where it goes. Mood: the consulting
 * room at ten in the morning. Calm, exact, unhurried.
 */

import type { ReactNode } from "react";
import { ArrowRight, CalendarCheck, Menu, MessageCircle, X } from "lucide-react";

import { Lockup, Mark, Wordmark } from "@/brand/Logo";
import {
  ARTICLES, BOOK, BRAND, CORE_SERVICES, EXPERIENCE, EXPERIENCE_PILLARS, GROUPS, HERO_SPECIALTIES, JOURNEY, NAV,
  PAGES, PAGE_ORDER, PASSAGE, PLAN, RECORD, REVIEWS, SIGNATURE, SPECIALTIES, STATS, type Group, type PageId,
} from "@/content";
import { CountUp, LivePlayer, Reveal, RevealGroup, RevealItem, RuleDraw, SplitText } from "@/lib/motion";
import { useHeader } from "@/lib/useHeader";
import { href } from "@/lib/routes";
import { MEDALLION, PorcelainHero } from "@/remotion/PorcelainHero";
import { ROUTE, RouteMap, type RouteTheme } from "@/remotion/RouteMap";
import { GLYPH, ServiceGlyph, type GlyphTheme } from "@/remotion/ServiceGlyph";
import { Booking } from "@/kit/Booking";
import { ContactPanel } from "@/kit/ContactPanel";
import { GOLD, NAVY } from "@/brand/tokens";
import portrait from "@/media/dr-portrait.webp";
import "./porcelain.css";

const LOGO = "globeSerif" as const;
const ROMAN = ["I", "II", "III", "IV"];
const to = (p: PageId) => href("porcelain", p);
const folio = (p: PageId) => String(PAGE_ORDER.indexOf(p) + 1).padStart(2, "0");
const UI = { primary: "pc-btn pc-btn-navy", secondary: "pc-btn pc-btn-line" };
const GROUP_ORDER: Group[] = ["core", "beyond"];

const GLYPH_THEME: GlyphTheme = {
  line: NAVY[850], accent: GOLD[400], dim: "rgba(17,24,38,0.12)", text: NAVY[600], ink: "#FFFDFA",
  font: "'Hanken Grotesk', sans-serif", logo: "globeSerif",
};

const ROUTE_THEME: RouteTheme = {
  line: "rgba(17,24,38,0.2)", pulse: GOLD[500], city: NAVY[850], label: NAVY[850],
  dim: NAVY[500], hub: GOLD.ink, font: "'Hanken Grotesk', sans-serif", labelWeight: 500,
};

type Run = (title: string, tone?: "dark") => ReactNode;

export function Porcelain({ page }: { page: PageId }) {
  const run: Run = (title, tone) => <RunningHead page={page} title={title} tone={tone} />;
  return (
    <div className="pc">
      <Header page={page} />
      <main>
        {page === "home" && <>
          <Hero /><Services run={run} /><SpecialtyIndex run={run} /><Care run={run} /><Numbers run={run} />
          <Doctor run={run} teaser /><Voices run={run} /><Journal run={run} limit={3} /><Doors run={run} />
        </>}
        {page === "book" && <>
          <PageHead page="book" />
          <section className="pc-sec pc-sec-tight"><div className="pc-wrap">{run("Booking")}<Booking ui={UI} /></div></section>
          <Visit run={run} />
        </>}
        {page === "private" && <>
          <PageHead page="private" />
          <Pillars run={run} /><Care run={run} /><Doors run={run} />
        </>}
        {page === "specialties" && <>
          <PageHead page="specialties" />
          <Treat run={run} /><Doors run={run} />
        </>}
        {page === "international" && <>
          <PageHead page="international" />
          <Passage run={run} /><Doors run={run} />
        </>}
        {page === "doctor" && <>
          <PageHead page="doctor" />
          <Doctor run={run} /><Numbers run={run} /><Voices run={run} /><Doors run={run} />
        </>}
        {page === "journal" && <>
          <PageHead page="journal" />
          <Journal run={run} /><Doors run={run} />
        </>}
        {page === "contact" && <>
          <PageHead page="contact" />
          <section className="pc-sec pc-sec-tight"><div className="pc-wrap">{run("Details and enquiry")}<ContactPanel ui={UI} /></div></section>
        </>}
      </main>
      <Footer />
    </div>
  );
}

function RunningHead({ page, title, tone }: { page: PageId; title: string; tone?: "dark" }) {
  return (
    <div className={`pc-run${tone ? " pc-run-dark" : ""}`}>
      <span>{title}</span>
      <RuleDraw className="pc-run-rule" />
      <span>Ghattas Clinic ® <i>p.</i> <b className="u-tnum">{folio(page)}</b></span>
    </div>
  );
}

/* ── Chrome ───────────────────────────────────────────────── */

function Header({ page }: { page: PageId }) {
  const { scrolled, open, setOpen } = useHeader();
  return (
    <header className={`pc-head${scrolled || page !== "home" ? " is-solid" : ""}`}>
      <div className="pc-wrap pc-head-in">
        <a className="pc-logo" href={to("home")} aria-label="Ghattas, for Men's Health: home">
          <Lockup logo={LOGO} height={52} mark="brushed" name={NAVY[850]} sub={GOLD.ink} />
        </a>
        <nav className="pc-links" aria-label="Pages">
          {NAV.map((p) => <a key={p} href={to(p)} aria-current={p === page ? "page" : undefined}>{PAGES[p].nav}</a>)}
        </nav>
        <div className="pc-head-cta">
          <a className="pc-btn pc-btn-navy pc-btn-sm" href={to("book")}>Book a visit</a>
          <button className="pc-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </div>
      {open && (
        <div className="pc-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="pc-wrap pc-menu-top">
            <Lockup logo={LOGO} height={40} mark="brushed" name={NAVY[850]} sub={GOLD.ink} />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="pc-wrap pc-menu-list">
            {(["home", ...NAV] as PageId[]).map((p) => (
              <a key={p} href={to(p)} onClick={() => setOpen(false)} aria-current={p === page ? "page" : undefined}>
                {PAGES[p].nav}<i>p. {folio(p)}</i>
              </a>
            ))}
            <a className="pc-btn pc-btn-navy" href={to("book")} onClick={() => setOpen(false)}>Book a private visit</a>
          </nav>
        </div>
      )}
    </header>
  );
}

/** Inner pages open like a chapter: running head, title, and the service's points in a medallion aside. */
function PageHead({ page }: { page: PageId }) {
  const p = PAGES[page];
  const sv = CORE_SERVICES.find((s) => s.id === p.service);
  return (
    <section className="pc-phead">
      <div className="pc-wrap">
        <RunningHead page={page} title={p.kicker} />
        <div className="pc-phead-grid">
          <div>
            <p className="pc-crumb"><a href={to("home")}>Home</a><span aria-hidden>/</span>{p.nav}</p>
            <SplitText as="h1" onMount delay={0.1} each={0.06} text={p.title} accent={p.accent} className="pc-h1 pc-h1-page" />
            {p.line && <Reveal delay={0.3} y={10}><p className="pc-phead-line">{p.line}</p></Reveal>}
            <Reveal delay={0.4} y={10}><p className="pc-lead pc-dropcap">{p.intro}</p></Reveal>
          </div>
          {sv && (
            <Reveal delay={0.5} className="pc-phead-aside">
              <div className="pc-svc-art pc-phead-art">
                <LivePlayer component={ServiceGlyph} inputProps={{ ...GLYPH_THEME, kind: sv.id }}
                  width={GLYPH.width} height={GLYPH.height} frames={GLYPH.frames} still={40} label={`${sv.name}: ${sv.line}`} />
              </div>
              <ul className="pc-svc-points">{sv.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Home: hero ───────────────────────────────────────────── */

function Hero() {
  const lead = `${PLAN.bioShort} Led by ${BRAND.doctor}, founder of ${BRAND.institution}, with more than ${BRAND.years} years of clinical experience.`;
  return (
    <section className="pc-hero" id="hero">
      <div className="pc-wrap pc-hero-grid">
        <div className="pc-hero-copy">
          <Reveal y={10}><p className="pc-kicker">By appointment only · {BRAND.area.split(",")[0]}</p></Reveal>
          <SplitText as="h1" onMount delay={0.1} each={0.06} text={PLAN.slogan} accent={["Perspective"]} className="pc-h1" />
          <Reveal delay={0.45} y={14}>
            <p className="pc-lead pc-dropcap">{lead}</p>
          </Reveal>
          <Reveal delay={0.55} y={14} className="pc-hero-cta">
            <a className="pc-btn pc-btn-navy" href={to("book")}><CalendarCheck size={17} /> Book a private consultation</a>
            <a className="pc-textlink" href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.65} y={10}>
            <p className="pc-hero-specs">{HERO_SPECIALTIES.join(" · ")}</p>
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

/* ── Home: the four services ─────────────────────────────── */

function Services({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-svcs-sec" id="services">
      <div className="pc-wrap">
        {run("Your health, your journey")}
        <div className="pc-svcs-head">
          <SplitText text="Your Health, Your Journey." className="pc-h2" accent={["Journey."]} />
          <Reveal delay={0.1}>
            <p className="pc-lead">
              A complete healthcare experience designed around the modern man: the four core services patients
              engage with first.
            </p>
          </Reveal>
        </div>
        <RevealGroup className="pc-svcs" each={0.1}>
          {CORE_SERVICES.map((sv, i) => (
            <RevealItem as="article" key={sv.id} className="pc-svc">
              <div className="pc-svc-top">
                <a className="pc-svc-art" href={to(sv.page)} tabIndex={-1} aria-hidden>
                  <LivePlayer
                    component={ServiceGlyph} inputProps={{ ...GLYPH_THEME, kind: sv.id }}
                    width={GLYPH.width} height={GLYPH.height} frames={GLYPH.frames} still={40}
                    label={`${sv.name}: ${sv.line}`}
                  />
                </a>
                <div>
                  <span className="pc-svc-n u-tnum">{String(i + 1).padStart(2, "0")}</span>
                  <p className="pc-kicker">{sv.kicker}</p>
                </div>
              </div>
              <h3><a href={to(sv.page)}>{sv.name}</a></h3>
              <p className="pc-svc-line">{sv.line}</p>
              <p className="pc-svc-text">{sv.body}</p>
              <ul className="pc-svc-points">{sv.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <a className="pc-textlink" href={to(sv.page)}>
                {sv.cta} <span className="pc-svc-folio"><i>p.</i> {folio(sv.page)}</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** The home page's index: every specialty by name, set like the back of a book. */
function SpecialtyIndex({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-index-sec" id="index">
      <div className="pc-wrap">
        {run("Index of specialties")}
        <div className="pc-index">
          {GROUP_ORDER.map((gk) => (
            <Reveal key={gk} className="pc-index-col">
              <h3>{GROUPS[gk].title}</h3>
              <ul>
                {SPECIALTIES.filter((s) => s.group === gk).map((s) => (
                  <li key={s.id}>
                    <a href={to("specialties")}>
                      <span>{s.name}</span><span className="pc-toc-lead" aria-hidden /><span className="pc-index-p"><i>p.</i> {folio("specialties")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Men's Health & Beyond ────────────────────────────────── */

function Treat({ run }: { run: Run }) {
  return (
    <section className="pc-sec" id="treat">
      <div className="pc-wrap">
        {run("Men's health & beyond")}
        {GROUP_ORDER.map((gk) => (
          <div key={gk} className="pc-group">
            <Reveal className="pc-group-head">
              <h3>{GROUPS[gk].title}</h3>
              <p>{GROUPS[gk].note}</p>
            </Reveal>
            <RevealGroup className={`pc-services${gk === "core" ? " is-core" : ""}`} each={0.06}>
              {SPECIALTIES.filter((sp) => sp.group === gk).map((sp) => (
                <RevealItem as="article" key={sp.id} className="pc-service">
                  <p className="pc-service-meta">{gk === "core" ? BRAND.doctor : GROUPS[gk].by}</p>
                  <h4>{sp.name}</h4>
                  <p className="pc-service-sum">{sp.summary}</p>
                  <a className="pc-textlink" href={to("book")}>Book <ArrowRight size={15} /></a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Private care: the plan's four pillars ──────────────── */

function Pillars({ run }: { run: Run }) {
  return (
    <section className="pc-sec" id="experience">
      <div className="pc-wrap">
        {run(EXPERIENCE_PILLARS.title)}
        <div className="pc-svcs-head">
          <SplitText text={`${EXPERIENCE_PILLARS.title}.`} className="pc-h2" accent={["experience."]} />
          <Reveal delay={0.1}><p className="pc-lead">{EXPERIENCE_PILLARS.intro}</p></Reveal>
        </div>
        <RevealGroup as="ol" className="pc-steps" each={0.1}>
          {EXPERIENCE_PILLARS.pillars.map((p, i) => (
            <RevealItem as="li" key={p.title} className="pc-step">
              <span className="pc-step-n">{ROMAN[i]}</span>
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

function Care({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-care" id="care">
      <div className="pc-wrap">
        {run("Signature Care")}
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

function Visit({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-visit" id="visit">
      <div className="pc-wrap">
        {run("The visit")}
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

function Numbers({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-numbers" id="numbers">
      <div className="pc-wrap">
        {run("By the numbers")}
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

function Doctor({ run, teaser }: { run: Run; teaser?: boolean }) {
  return (
    <section className="pc-sec pc-doctor" id="doctor">
      <div className="pc-wrap">
        {run("Your consultant", "dark")}
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
            <Reveal delay={0.2} className="pc-doc-cta">
              <a className="pc-btn pc-btn-gold" href={to("book")}><CalendarCheck size={17} /> Book with {BRAND.doctorShort}</a>
              {teaser && (
                <a className="pc-textlink pc-textlink-light" href={to("doctor")}>
                  About {BRAND.doctorShort} <span className="pc-svc-folio"><i>p.</i> {folio("doctor")}</span>
                </a>
              )}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="pc-doc-arch">
            {/* Mid-thigh crop, inside an arch that visibly does the cutting. */}
            <img src={portrait} alt="Dr. Osama Ghattas" loading="lazy" />
            <span className="pc-doc-cap">{BRAND.doctor} · {BRAND.title}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── From abroad ──────────────────────────────────────────── */

function Passage({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-passage" id="passage">
      <div className="pc-wrap">
        {run("Ghattas Passage")}
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
            <Reveal delay={0.2}>
              <a className="pc-btn pc-btn-navy pc-passage-cta" href={to("contact")}>Plan your medical journey <ArrowRight size={16} /></a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="pc-map">
            <LivePlayer
              component={RouteMap} inputProps={ROUTE_THEME}
              width={ROUTE.width} height={ROUTE.height} frames={ROUTE.frames} still={60}
              label="Map centred on Cairo showing routes from the Gulf, Africa and Europe at their true bearing and distance"
            />
            <p className="pc-caption"><i>Fig. 1</i> Origin cities at their true bearing and distance from Cairo. The selection is illustrative.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Voices ───────────────────────────────────────────────── */

function Voices({ run }: { run: Run }) {
  const [first, ...rest] = REVIEWS;
  return (
    <section className="pc-sec pc-voices" id="voices">
      <div className="pc-wrap">
        {run("In their words")}
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

function Journal({ run, limit }: { run: Run; limit?: number }) {
  const list = limit ? ARTICLES.slice(0, limit) : ARTICLES;
  return (
    <section className="pc-sec" id="journal">
      <div className="pc-wrap">
        {run("Journal")}
        {limit && <SplitText text="Written by the clinic, not by an agency." className="pc-h2 pc-h2-wide" accent={["clinic,"]} />}
        <RevealGroup className="pc-articles" each={0.08}>
          {list.map((a) => (
            <RevealItem as="article" key={a.title} className="pc-article">
              <p className="pc-article-c">{a.category}</p>
              <h3>{a.title}</h3>
              <p className="pc-article-e">{a.excerpt}</p>
              <p className="pc-article-m u-tnum">{a.minutes} min read</p>
            </RevealItem>
          ))}
        </RevealGroup>
        {limit && (
          <Reveal>
            <a className="pc-textlink pc-more" href={to("journal")}>All articles <span className="pc-svc-folio"><i>p.</i> {folio("journal")}</span></a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ── Two doors ────────────────────────────────────────────── */

function Doors({ run }: { run: Run }) {
  return (
    <section className="pc-sec pc-doors-sec" id="doors">
      <div className="pc-wrap">
        {run("Two doors")}
        <RevealGroup className="pc-doors" each={0.12}>
          <RevealItem className="pc-door pc-door-navy">
            <p className="pc-kicker pc-kicker-light">New patient</p>
            <h2>Book without picking up the phone.</h2>
            <p>Choose what you need, a day and a time. Confirmation is immediate, and nothing we send you names the service.</p>
            <a className="pc-btn pc-btn-gold" href={to("book")}><CalendarCheck size={17} /> Start booking</a>
          </RevealItem>
          <RevealItem className="pc-door">
            <p className="pc-kicker">Returning patient</p>
            <h2>Everything from your last visit, waiting.</h2>
            <p>Scans, blood results, prescriptions and your written plan in one place, with discreet mode on by default.</p>
            <a className="pc-btn pc-btn-line" href={to("contact")}>Ask about the patient portal <ArrowRight size={16} /></a>
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
        <p className="pc-foot-promise">{PLAN.closing[0]}<br />{PLAN.closing[1]}</p>
        <nav className="pc-foot-nav" aria-label="All pages">
          {PAGE_ORDER.map((p) => <a key={p} href={to(p)}>{PAGES[p].nav} <i>p. {folio(p)}</i></a>)}
        </nav>
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
