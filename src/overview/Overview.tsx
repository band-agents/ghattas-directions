/**
 * The board the client opens first.
 *
 * It borrows the brand book's own furniture: the cover's three-column
 * PROJECT SCOPE / CLIENT / CREDITS row, gold serif headings with an italic
 * sub-line, the "… Ghattas Clinic ® Brand Book" running foot. It should read
 * as the next chapter of the book rather than as a fourth design.
 *
 * Order: what this is → what changed since round one → what is fixed (the
 * book) → the three directions → how they differ, section by section → what
 * we need from the clinic.
 */

import { ArrowRight, Check } from "lucide-react";
import type { ComponentType } from "react";

import { Mark, Wordmark, type LogoKey } from "@/brand/Logo";
import { BRUSHED_CSS, GOLD, NAVY } from "@/brand/tokens";
import { BOOK, HIERARCHY, PERSONALITY } from "@/content";
import { LivePlayer, Reveal, RevealGroup, RevealItem, scrollToId } from "@/lib/motion";
import { GLOBE, GlobeHero } from "@/remotion/GlobeHero";
import { MEDALLION, PorcelainHero } from "@/remotion/PorcelainHero";
import { ASCEND, AscendHero } from "@/remotion/AscendHero";
import "./overview.css";

interface Direction {
  id: string; letter: string; name: string; idea: string; summary: string;
  logo: LogoKey; logoName: string; type: [string, string, string]; // display, text, sample family css
  ratio: [number, number, number]; // navy, gold, porcelain
  motion: string; chooseIf: string;
  player: { c: ComponentType<Record<string, unknown>>; w: number; h: number; f: number; still: number };
  stage: string;
}

const DIRECTIONS: Direction[] = [
  {
    id: "nocturne", letter: "A", name: "Nocturne", idea: "After hours.",
    summary: "The brand book's dark pages turned into a site. Navy grounds, the G drawn as a gold hairline the way the book's cover draws it, chapter openers set like the book's section dividers, and one band of brushed gold.",
    logo: "globeSans", logoName: "Option 01 · globe G, flared sans",
    type: ["Cormorant", "Manrope", "'Cormorant', serif"],
    ratio: [82, 12, 6],
    motion: "The globe G turns behind Dr. Ghattas with real cities rotating past and Cairo lit. Light traces the mark. Hairlines draw in; headlines rise out of a mask.",
    chooseIf: "the clinic should feel like a private members' club. Strongest for the Gulf and for patients flying in.",
    player: { c: GlobeHero, w: GLOBE.width, h: GLOBE.height, f: GLOBE.frames, still: 0 },
    stage: "radial-gradient(80% 70% at 60% 45%, #0A3152, #0F141D 75%)",
  },
  {
    id: "porcelain", letter: "B", name: "Porcelain", idea: "The consulting room.",
    summary: "The book's light pages turned into a journal. Porcelain paper, navy ink, gold used as leaf. Every section opens with a running head and a page number, as each page of the book does.",
    logo: "globeSerif", logoName: "Option 02 · globe G, serif",
    type: ["Bodoni Moda", "Hanken Grotesk", "'Bodoni Moda', serif"],
    ratio: [18, 6, 76],
    motion: "Dr. Ghattas inside a navy medallion framed by the G's ring. The values circle it, light runs round the ring, and the five personality pairs change beneath.",
    chooseIf: "trust and clinical calm should lead. The most medical of the three, and the easiest to read at length.",
    player: { c: PorcelainHero, w: MEDALLION.width, h: MEDALLION.height, f: MEDALLION.frames, still: 45 },
    stage: "#FFFDFA",
  },
  {
    id: "ascend", letter: "C", name: "Ascend", idea: "Forward.",
    summary: "The third mark's geometry runs the page. Every panel is cut at 45° the way the mark is cut, the arrow's diagonal becomes hairlines, a staircase and a ticker, and the type is the mark's own wide grotesque over an italic serif.",
    logo: "arrow", logoName: "Option 03 · arrow G, extended sans",
    type: ["Archivo Expanded", "DM Serif Display", "'Archivo', sans-serif"],
    ratio: [46, 30, 24],
    motion: "The arrow lifts off the mark along its own diagonal, hairlines climb at 45°, and three facts slide in on the same angle. A ticker of the brand's values runs under the hero.",
    chooseIf: "the clinic wants energy and a younger, performance-minded patient. The boldest on social media.",
    player: { c: AscendHero, w: ASCEND.width, h: ASCEND.height, f: ASCEND.frames, still: 120 },
    stage: "#111826",
  },
];

const CHANGES: [string, string, string][] = [
  ["Name", "Elite Clinic", "Ghattas Clinic, For Men's Health"],
  ["Logo", "A single-letter G drawn by us", "The book's three official marks, one per direction, taken as vectors from the PDF"],
  ["Colour", "Hospital navy with sand, coral and gold", "Only the book's three: Dark Navy, Luxury Brushed Gold, Porcelain"],
  ["Words", "Our own positioning", "The book's language: tagline, positioning, Signature Care, tone of voice"],
  ["Type", "Fraunces with IBM Plex", "A new pairing per direction, each matched to its logo's letterforms"],
];

const KEPT = [
  "The same eleven sections, in the same order, in all three",
  "Dr. Ghattas's portraits, full figure in the hero",
  "Discreet messaging: nothing names the service",
  "The international programme, renamed Ghattas Passage",
];

/** How each direction treats each section. Same rows as HIERARCHY. */
const TREATMENT: Record<string, [string, string, string]> = {
  hero: ["The globe G in gold line, turning, with Dr. Ghattas seated in front", "A navy medallion inside the G's ring, personality pairs changing beneath", "A brushed-gold panel cut at 45°, the arrow lifting, facts sliding in"],
  quick: ["A hairline row of four", "A contents page with page numbers", "Cut-corner tiles that fill navy on hover"],
  treat: ["An index list with a sticky detail card", "A ruled editorial grid, everything visible", "Six cards led by the length of the visit"],
  care: ["Five pillars under drawn rules, then a marquee of the values", "A drop-cap essay beside the five pillars", "Five pillars climbing as a staircase"],
  visit: ["Four stops on a gold timeline", "Roman numerals, I to IV", "Outlined 01 to 04 with arrows between"],
  numbers: ["The one brushed-gold band on the page", "Large Bodoni figures between column rules", "A brushed-gold band with wide numerals"],
  doctor: ["Framed portrait, the record in gold", "The one navy page, an arched portrait", "A cut-corner panel with the mark behind him"],
  passage: ["Live route map, gold on navy, curved routes", "Live route map, navy on paper, captioned as a figure", "Live route map, straight routes, capital labels"],
  voices: ["Three columns in italic serif", "One pull quote, two beneath", "Three cut-corner cards, the middle one navy"],
  journal: ["A ruled index with gold arrows", "Magazine cards under a heavy rule", "Rows with category chips"],
  doors: ["Brushed gold beside a hairline navy panel", "One ruled box, navy half and paper half", "Gold and navy blocks with 45° cuts"],
};

const ASKS = [
  ["Pick a direction", "Or a mix: any direction can wear any of the three logos."],
  ["Pick a logo option", "The book leaves three open. Each direction shows one in use."],
  ["Confirm the figures", "22+ years is from the book. The 20,000+ procedures figure still needs a source."],
  ["Send real details", "Address, phone, WhatsApp, email and hours are placeholders."],
  ["Clear the testimonials", "The three quotes are samples. We need consented words, initials only."],
  ["Arabic", "Recommended for the Gulf and for search. The layouts are ready to mirror."],
];

export function Overview() {
  return (
    <div className="ov">
      <Cover />
      <main>
        <Changed />
        <Foundations />
        <Directions />
        <Compare />
        <Asks />
      </main>
      <footer className="ov-foot">
        <div className="ov-wrap ov-foot-in">
          <span>Website directions · Round 2</span>
          <span>Ghattas Clinic ® For Men&apos;s Health</span>
        </div>
      </footer>
    </div>
  );
}

/* ── Cover ────────────────────────────────────────────────── */

function Cover() {
  return (
    <header className="ov-cover">
      <Mark logo="globeSans" height="150%" fill={GOLD.logo} outline={1} className="ov-cover-ghost" />
      <div className="ov-wrap">
        <div className="ov-meta">
          <div><span>Project scope</span><b>Website revamp, three directions</b></div>
          <div><span>Client</span><b>Ghattas Clinic</b></div>
          <div><span>Round</span><b>02 · September 2026</b></div>
        </div>
        <div className="ov-cover-main">
          <Reveal y={16}><Wordmark logo="globeSans" height={92} name="#FFFDFA" sub={GOLD.logo} /></Reveal>
          <Reveal delay={0.15} y={16}>
            <h1>Three ways to build the website on the brand book.</h1>
            <p>
              Same colours, same marks, same eleven sections in the same order. What changes between them is
              the mood, the type, the layout and the motion.
            </p>
          </Reveal>
          <Reveal delay={0.3} y={16} className="ov-cover-links">
            {DIRECTIONS.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="ov-pill">
                <b>{d.letter}</b>{d.name}<ArrowRight size={15} />
              </a>
            ))}
            <button className="ov-textlink" onClick={() => scrollToId("compare")}>Compare them section by section</button>
          </Reveal>
        </div>
        <p className="ov-cover-foot">For Men&apos;s Health</p>
      </div>
    </header>
  );
}

function Head({ title, sub, id }: { title: string; sub: string; id?: string }) {
  return (
    <Reveal className="ov-head">
      <h2 id={id}>{title}</h2>
      <p>{sub}</p>
    </Reveal>
  );
}

/* ── What changed ─────────────────────────────────────────── */

function Changed() {
  return (
    <section className="ov-sec">
      <div className="ov-wrap">
        <Head title="Since round one" sub="What changed, and what stayed" />
        <div className="ov-changed">
          <div className="ov-table-scroll">
            <table className="ov-table ov-table-changes">
              <thead><tr><th scope="col">&nbsp;</th><th scope="col">Round one</th><th scope="col">Now</th></tr></thead>
              <tbody>
                {CHANGES.map(([k, a, b]) => (
                  <tr key={k}><th scope="row">{k}</th><td className="ov-was">{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal className="ov-kept">
            <h3>Kept on purpose</h3>
            <ul>{KEPT.map((k) => <li key={k}><Check size={16} />{k}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── The book ─────────────────────────────────────────────── */

const SWATCHES = [
  { name: "Dark Navy", pantone: "Pantone 2768 C", spec: "#082741", shown: NAVY[850], ramp: [NAVY[500], NAVY[600], NAVY[700], NAVY[800], NAVY[900]], fg: "#FFFDFA" },
  { name: "Luxury Brushed Gold", pantone: "Pantone 2007 C", spec: "#E5B335", shown: BRUSHED_CSS, ramp: [GOLD[500], GOLD[400], GOLD[300], GOLD[200], GOLD[100]], fg: "#111826" },
  { name: "Porcelain", pantone: "Pantone 3564 U", spec: "#FFFDFA", shown: "#FFFDFA", ramp: [], fg: "#111826" },
];

function Foundations() {
  return (
    <section className="ov-sec ov-book">
      <div className="ov-wrap">
        <Head title="Fixed by the book" sub="Shared by all three directions" />

        <RevealGroup className="ov-swatches" each={0.08}>
          {SWATCHES.map((s) => (
            <RevealItem key={s.name} className="ov-swatch">
              <div className="ov-swatch-face" style={{ background: s.shown, color: s.fg }}>
                <b>{s.name}</b><span>{s.pantone}</span>
              </div>
              {/* Porcelain has no ramp in the book; the empty strip keeps the captions level. */}
              <div className="ov-ramp" aria-hidden={s.ramp.length === 0}>{s.ramp.map((c) => <span key={c} style={{ background: c }} title={c} />)}</div>
              <p className="u-tnum">Printed as {s.spec}{s.ramp.length > 0 ? " · ramp from the colour grid" : ""}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="ov-footnote">
          The colours are matched to the book&apos;s own swatches and colour grid as they appear on the page. The gold
          text colour on light grounds is the dark end of the book&apos;s gold gradient ({GOLD.ink}), the only gold that
          stays readable at body size.
        </p>

        <div className="ov-book-grid">
          <Reveal className="ov-logos">
            <h3>Three logo options</h3>
            <div className="ov-logo-row">
              {(["globeSans", "globeSerif", "arrow"] as LogoKey[]).map((k, i) => (
                <div key={k} className="ov-logo">
                  <Mark logo={k} height={52} fill="brushed" />
                  <Wordmark logo={k} height={34} name="#FFFDFA" sub={GOLD.logo} />
                  <span>Option 0{i + 1} · in direction {"ABC"[i]}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="ov-voice">
            <h3>Tone of voice</h3>
            <ul>{PERSONALITY.map(([a, b]) => <li key={a}><b>{a},</b> <i>{b}</i></li>)}</ul>
            <p className="ov-values">{BOOK.values.join(" · ")} <i>{BOOK.valuesLine}</i></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── The three ────────────────────────────────────────────── */

function Directions() {
  return (
    <section className="ov-sec">
      <div className="ov-wrap">
        <Head title="The three directions" sub="Each one live, with its hero running" />
        <div className="ov-dirs">
          {DIRECTIONS.map((d) => (
            <Reveal key={d.id} className="ov-dir">
              <a href={`#${d.id}`} className="ov-dir-stage" style={{ background: d.stage }} aria-label={`Open direction ${d.letter}, ${d.name}`}>
                <LivePlayer
                  component={d.player.c} width={d.player.w} height={d.player.h} frames={d.player.f} still={d.player.still}
                  label={`Hero animation for direction ${d.letter}`}
                />
              </a>
              <div className="ov-dir-body">
                <p className="ov-dir-letter">Direction {d.letter}</p>
                <h3>{d.name} <i>{d.idea}</i></h3>
                <p className="ov-dir-sum">{d.summary}</p>
                <dl className="ov-dir-spec">
                  <div><dt>Logo</dt><dd>{d.logoName}</dd></div>
                  <div><dt>Type</dt><dd><span style={{ fontFamily: d.type[2] }} className="ov-aa">Aa</span>{d.type[0]} with {d.type[1]}</dd></div>
                  <div>
                    <dt>Colour</dt>
                    <dd>
                      <span className="ov-ratio" aria-hidden>
                        <span style={{ flex: d.ratio[0], background: NAVY[850] }} />
                        <span style={{ flex: d.ratio[1], background: BRUSHED_CSS }} />
                        <span style={{ flex: d.ratio[2], background: "#FFFDFA" }} />
                      </span>
                      <span className="u-tnum">Navy {d.ratio[0]}% · Gold {d.ratio[1]}% · Porcelain {d.ratio[2]}%</span>
                    </dd>
                  </div>
                  <div><dt>Motion</dt><dd>{d.motion}</dd></div>
                  <div><dt>Choose it if</dt><dd>{d.chooseIf}</dd></div>
                </dl>
                <a href={`#${d.id}`} className="ov-btn">Open {d.name} <ArrowRight size={16} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section by section ───────────────────────────────────── */

function Compare() {
  return (
    <section className="ov-sec ov-compare">
      <div className="ov-wrap">
        <Head id="compare" title="Section by section" sub="One hierarchy, three treatments" />
        <div className="ov-table-scroll">
          <table className="ov-table ov-table-compare">
            <thead>
              <tr>
                <th scope="col">Section</th>
                {DIRECTIONS.map((d) => <th key={d.id} scope="col"><a href={`#${d.id}`}>{d.letter} · {d.name}</a></th>)}
              </tr>
            </thead>
            <tbody>
              {HIERARCHY.map((h, i) => (
                <tr key={h.id}>
                  <th scope="row">
                    <span className="u-tnum ov-n">{String(i + 1).padStart(2, "0")}</span>
                    <b>{h.name}</b>
                    <span className="ov-job">{h.job}</span>
                  </th>
                  {TREATMENT[h.id].map((t, k) => <td key={k}>{t}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── What we need ─────────────────────────────────────────── */

function Asks() {
  return (
    <section className="ov-sec">
      <div className="ov-wrap">
        <Head title="What we need from the clinic" sub="To move one direction into build" />
        <RevealGroup as="ol" className="ov-asks" each={0.06}>
          {ASKS.map(([t, b], i) => (
            <RevealItem as="li" key={t}>
              <span className="u-tnum">{String(i + 1).padStart(2, "0")}</span>
              <div><b>{t}</b><p>{b}</p></div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
