/**
 * One small looping picture per core service, drawn in line.
 *
 *   appointment — a calendar; the chosen day moves and a check confirms it
 *   private     — an arched private door that opens onto light, then closes
 *   abroad      — a flight arcing over a globe into a pulsing pin
 *   beyond      — the brand mark with six specialties orbiting it
 *
 * The client's own mockup used stock photographs here (a phone, a lounge, a
 * passport, a statue). We have no photography yet, and line drawings in the
 * brand's gold stay in the same world as the logo and the hero.
 *
 * Seamless: every motion is periodic in the 180-frame loop. Themed by props, so
 * each direction draws it in its own colours and face.
 */

import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LOGOS } from "@/brand/logos";
import type { LogoKey } from "@/brand/Logo";

export const GLYPH = { width: 600, height: 600, frames: 180 } as const;

export type GlyphKind = "appointment" | "private" | "abroad" | "beyond";

/** The colours and face a direction draws the glyphs in. */
export interface GlyphTheme {
  line: string;    // main strokes
  accent: string;  // the moving part
  dim: string;     // construction lines
  text: string;    // labels
  ink: string;     // strokes drawn on top of the accent colour
  font: string;
  logo: LogoKey;
  /** Crop the empty margin round each drawing. Off inside a round frame, where
      the corners of the calendar would poke past the circle. */
  tight?: boolean;
}

export type GlyphProps = GlyphTheme & { kind: GlyphKind } & Record<string, unknown>;

const ease = Easing.bezier(0.22, 1, 0.36, 1);

/* Beyond keeps the full canvas: its labels orbit out to the edge. */
const CROP: Record<GlyphKind, string> = {
  appointment: "76 92 448 448",
  private: "76 104 448 448",
  abroad: "76 70 448 448",
  beyond: "0 0 600 600",
};

export function ServiceGlyph(p: GlyphProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  return (
    <AbsoluteFill>
      <svg viewBox={p.tight ? CROP[p.kind] : "0 0 600 600"} width="100%" height="100%" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {p.kind === "appointment" && <Appointment p={p} frame={frame} />}
        {p.kind === "private" && <Private p={p} t={t} />}
        {p.kind === "abroad" && <Abroad p={p} t={t} />}
        {p.kind === "beyond" && <Beyond p={p} t={t} />}
      </svg>
    </AbsoluteFill>
  );
}

/* ── Take an Appointment ─────────────────────────────────── */

const DAYS: [number, number][] = [[2, 1], [5, 2], [3, 3]];

function Appointment({ p, frame }: { p: GlyphProps; frame: number }) {
  const seg = 60;
  const i = Math.floor(frame / seg) % DAYS.length;
  const local = frame % seg;
  const from = DAYS[(i + DAYS.length - 1) % DAYS.length], to = DAYS[i];
  const k = interpolate(local, [0, 18], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const col = from[0] + (to[0] - from[0]) * k, row = from[1] + (to[1] - from[1]) * k;
  const cx = (c: number) => 158 + c * 47, cy = (r: number) => 262 + r * 50;
  const check = interpolate(local, [20, 34, 50, 58], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <g>
      <rect x={112} y={150} width={376} height={330} rx={26} stroke={p.line} strokeWidth={3} />
      <line x1={112} x2={488} y1={216} y2={216} stroke={p.line} strokeWidth={2} />
      <line x1={196} x2={196} y1={124} y2={172} stroke={p.line} strokeWidth={6} />
      <line x1={404} x2={404} y1={124} y2={172} stroke={p.line} strokeWidth={6} />
      <text x={300} y={194} textAnchor="middle" fill={p.text} fontFamily={p.font} fontSize={20} letterSpacing={6}>YOUR TIME</text>
      {Array.from({ length: 28 }, (_, n) => (
        <circle key={n} cx={cx(n % 7)} cy={cy(Math.floor(n / 7))} r={4.5} fill={p.dim} />
      ))}
      <circle cx={cx(col)} cy={cy(row)} r={21} stroke={p.accent} strokeWidth={3} />
      <circle cx={cx(col)} cy={cy(row)} r={6} fill={p.accent} />
      <g opacity={check}>
        <circle cx={470} cy={458} r={40} fill={p.accent} />
        <path d="M 452 459 L 466 473 L 490 446" stroke={p.ink} strokeWidth={6}
          pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - check} />
      </g>
    </g>
  );
}

/* ── Own the Clinic ──────────────────────────────────────── */

function Private({ p, t }: { p: GlyphProps; t: number }) {
  const open = (1 - Math.cos(t * Math.PI * 2)) / 2; // 0 → 1 → 0
  const leaf = 200 * (1 - open * 0.82);
  const arch = "M 200 478 V 262 A 100 100 0 0 1 400 262 V 478";
  return (
    <g>
      <defs>
        <clipPath id="gl-arch"><path d={`${arch} Z`} /></clipPath>
        <linearGradient id="gl-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.accent} stopOpacity={0.55} />
          <stop offset="1" stopColor={p.accent} stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Light through the doorway, on the wall and spilling on the floor. */}
      <rect x={200} y={160} width={200} height={318} fill="url(#gl-light)" opacity={open} clipPath="url(#gl-arch)" />
      <path d={`M 200 478 L 400 478 L ${470 + open * 40} 560 L ${130 - open * 40} 560 Z`} fill={p.accent} opacity={0.12 * open} />
      {/* The door leaf, hinged on the left, narrowing as it swings open. */}
      <g clipPath="url(#gl-arch)">
        <rect x={200} y={160} width={leaf} height={318} fill={p.dim} />
        <line x1={200 + leaf} x2={200 + leaf} y1={160} y2={478} stroke={p.line} strokeWidth={2.5} />
        <circle cx={200 + leaf - 22} cy={372} r={6} fill={p.accent} opacity={1 - open} />
      </g>
      <path d={arch} stroke={p.line} strokeWidth={3} />
      <path d="M 176 478 V 250 A 124 124 0 0 1 424 250 V 478" stroke={p.dim} strokeWidth={2} />
      <line x1={90} x2={510} y1={478} y2={478} stroke={p.line} strokeWidth={3} />
      <text x={300} y={136} textAnchor="middle" fill={p.text} fontFamily={p.font} fontSize={20} letterSpacing={6}>PRIVATE</text>
    </g>
  );
}

/* ── Come From Abroad ────────────────────────────────────── */

function Abroad({ p, t }: { p: GlyphProps; t: number }) {
  const a = { x: 104, y: 438 }, c = { x: 250, y: 96 }, b = { x: 468, y: 226 };
  const u = t, v = 1 - u;
  const x = v * v * a.x + 2 * v * u * c.x + u * u * b.x;
  const y = v * v * a.y + 2 * v * u * c.y + u * u * b.y;
  const dx = 2 * v * (c.x - a.x) + 2 * u * (b.x - c.x), dy = 2 * v * (c.y - a.y) + 2 * u * (b.y - c.y);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const show = Math.min(1, Math.sin(Math.PI * t) * 3);
  const pulse = (t * 3) % 1;
  const d = `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`;
  return (
    <g>
      <circle cx={300} cy={318} r={176} stroke={p.dim} strokeWidth={2} />
      <ellipse cx={300} cy={318} rx={76} ry={176} stroke={p.dim} strokeWidth={2} />
      <line x1={124} x2={476} y1={318} y2={318} stroke={p.dim} strokeWidth={2} />
      <path d={d} stroke={p.line} strokeWidth={2.5} strokeDasharray="3 12" />
      <path d={d} pathLength={1} stroke={p.accent} strokeWidth={3} strokeDasharray={`${u} 1`} opacity={show} />
      <circle cx={a.x} cy={a.y} r={7} fill={p.line} />
      <circle cx={b.x} cy={b.y} r={14 + pulse * 40} stroke={p.accent} strokeWidth={2} opacity={1 - pulse} />
      <circle cx={b.x} cy={b.y} r={10} fill={p.accent} />
      <text x={b.x} y={b.y - 30} textAnchor="middle" fill={p.text} fontFamily={p.font} fontSize={20} letterSpacing={5}>CAIRO</text>
      <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={show}>
        <path d="M 22 0 L -10 -8 L -16 -26 L -24 -26 L -20 -6 L -34 -4 L -40 -14 L -46 -14 L -42 0 L -46 14 L -40 14 L -34 4 L -20 6 L -24 26 L -16 26 L -10 8 Z"
          fill={p.accent} />
      </g>
    </g>
  );
}

/* ── Men's Health & Beyond ───────────────────────────────── */

const ORBIT = ["Andrology", "Sexual health", "Aesthetics", "Dermatology", "Hair", "Nutrition"];

function Beyond({ p, t }: { p: GlyphProps; t: number }) {
  const spin = t * 60; // six-fold, so a 60° turn is a seamless loop
  const m = LOGOS[p.logo].mark;
  const s = 96 / m.h;
  return (
    <g>
      <circle cx={300} cy={300} r={138} stroke={p.dim} strokeWidth={2} />
      <circle cx={300} cy={300} r={92} stroke={p.line} strokeWidth={2} strokeDasharray="2 10"
        transform={`rotate(${-spin * 2} 300 300)`} />
      <g transform={`translate(${300 - (m.w * s) / 2} ${300 - (m.h * s) / 2}) scale(${s})`}>
        {m.d.map((d, i) => <path key={i} d={d} fill={p.accent} />)}
      </g>
      {ORBIT.map((label, k) => {
        const deg = spin + k * 60 - 90;
        const r = (deg * Math.PI) / 180;
        const x = 300 + 138 * Math.cos(r), y = 300 + 138 * Math.sin(r);
        const lx = 300 + 160 * Math.cos(r), ly = 300 + 160 * Math.sin(r);
        const anchor = Math.abs(Math.cos(r)) < 0.25 ? "middle" : Math.cos(r) > 0 ? "start" : "end";
        return (
          <g key={label}>
            <circle cx={x} cy={y} r={8} fill={p.accent} />
            <text x={lx} y={ly + 7} textAnchor={anchor} fill={p.text} fontFamily={p.font} fontSize={19} letterSpacing={0.5}>{label}</text>
          </g>
        );
      })}
    </g>
  );
}
