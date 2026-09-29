/**
 * Direction B — Porcelain. The hero picture.
 *
 * A navy medallion on porcelain with Dr. Ghattas inside it. The ring around
 * it is the G's ring, opened where the letter opens, with a light running
 * round it; the book's values circle on a text path; and the five personality
 * pairs from the tone-of-voice page change underneath, one every three
 * seconds.
 *
 * The portrait used here is the one cut at mid-thigh. That crop is only
 * allowed inside a frame that visibly does the cutting — here the circle does,
 * and the image runs past the circle's bottom edge so no hard line of its own
 * ever shows.
 *
 * Seamless loop: the text ring carries its phrase three times and turns 120°
 * per loop; the glint runs once round; five pairs × 90 frames = 450.
 */

import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GOLD, NAVY } from "@/brand/tokens";
import { PERSONALITY } from "@/content";
import portrait from "@/media/dr-portrait.webp";

export const MEDALLION = { width: 1080, height: 1350, frames: 450 } as const;

const CX = 540, CY = 600, R = 400;
const RING = 432;
const TEXT_R = 488;

export function PorcelainHero() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const per = durationInFrames / PERSONALITY.length;
  const idx = Math.floor(frame / per) % PERSONALITY.length;
  const local = frame - idx * per;
  const op = interpolate(local, [0, 14, per - 14, per], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dy = interpolate(local, [0, 18], [16, 0], { extrapolateRight: "clamp" });
  const [a, b] = PERSONALITY[idx];

  /* The G's opening, on the right: the ring stops at -40° and restarts at -4°. */
  const gapFrom = -40, gapTo = -4;
  const pt = (deg: number, r = RING) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)];
  const [sx, sy] = pt(gapTo), [ex, ey] = pt(gapFrom);
  const ringPath = `M ${sx} ${sy} A ${RING} ${RING} 0 1 1 ${ex} ${ey}`;
  const phrase = "EXPERTISE  ·  ACCESS  ·  PRIVACY  ·  TECHNOLOGY  ·  ";
  const circ = 2 * Math.PI * TEXT_R;

  return (
    <AbsoluteFill style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <svg viewBox={`0 0 ${MEDALLION.width} ${MEDALLION.height}`} width="100%" height="100%">
        <defs>
          <radialGradient id="pc-navy" cx="45%" cy="35%" r="75%">
            <stop offset="0%" stopColor={NAVY.blue} />
            <stop offset="55%" stopColor={NAVY.spec} />
            <stop offset="100%" stopColor={NAVY.deep} />
          </radialGradient>
          <linearGradient id="pc-glint" x1="0" x2="1">
            <stop offset="0" stopColor={GOLD[100]} stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFF4E0" />
            <stop offset="1" stopColor={GOLD[100]} stopOpacity="0" />
          </linearGradient>
          <clipPath id="pc-disc"><circle cx={CX} cy={CY} r={R} /></clipPath>
          <path id="pc-textring" d={`M ${CX} ${CY - TEXT_R} a ${TEXT_R} ${TEXT_R} 0 1 1 -0.01 0`} />
        </defs>

        {/* Values on a circle, turning. */}
        <g transform={`rotate(${t * 120} ${CX} ${CY})`}>
          <text fill={NAVY[600]} fontSize={21} letterSpacing={2} fontWeight={500}>
            <textPath href="#pc-textring" textLength={circ - 2} lengthAdjust="spacing">
              {phrase.repeat(3)}
            </textPath>
          </text>
        </g>

        <circle cx={CX} cy={CY} r={R} fill="url(#pc-navy)" />
        {/* A soft pool of light behind his shoulders. */}
        <circle cx={CX + 20} cy={CY - 60} r={260} fill={GOLD.logo} opacity={0.12} clipPath="url(#pc-disc)" />
      </svg>

      <div style={{
        position: "absolute", left: CX - R, top: CY - R, width: R * 2, height: R * 2,
        borderRadius: "50%", overflow: "hidden",
      }}>
        <Img src={portrait} style={{ position: "absolute", width: 700, left: R - 350 + 10, top: 64, display: "block" }} />
      </div>

      <svg viewBox={`0 0 ${MEDALLION.width} ${MEDALLION.height}`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {/* The G's ring, opened on the right, with the crossbar coming in. */}
        <path d={ringPath} fill="none" stroke={GOLD[400]} strokeWidth={3} />
        <line x1={CX + RING - 70} x2={sx + 1.5} y1={sy} y2={sy} stroke={GOLD[400]} strokeWidth={3} />
        <line x1={ex - 44} x2={ex + 1.5} y1={ey} y2={ey} stroke={GOLD[400]} strokeWidth={3} />
        <path
          d={ringPath} pathLength={1} fill="none" stroke="#FFF1D8" strokeWidth={5} strokeLinecap="round"
          strokeDasharray="0.05 0.95" strokeDashoffset={-t} opacity={0.9}
        />

        <text x={CX} y={1128} textAnchor="middle" fill={NAVY[600]} fontSize={19} letterSpacing={7} fontWeight={600}>
          DR. OSAMA GHATTAS · FOUNDER, DAR EL ZOKORA
        </text>
        <line x1={CX - 40} x2={CX + 40} y1={1160} y2={1160} stroke={GOLD[400]} strokeWidth={2} />

        <g opacity={op} transform={`translate(0 ${dy})`}>
          <text x={CX} y={1250} textAnchor="middle" fontFamily="'Bodoni Moda', serif" fontSize={64}>
            <tspan fill={NAVY[850]} fontWeight={500}>{a}, </tspan>
            <tspan fill={GOLD.ink} fontStyle="italic" fontWeight={400}>{b}.</tspan>
          </text>
        </g>
        {/* Which of the five pairs is showing. */}
        <g transform={`translate(${CX - 48} 1300)`}>
          {PERSONALITY.map((_, i) => (
            <rect key={i} x={i * 22} y={0} width={14} height={2.5} fill={i === idx ? GOLD.ink : NAVY[500]} opacity={i === idx ? 1 : 0.3} />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
}
