/**
 * Direction C — Ascend. The hero picture.
 *
 * A brushed-gold panel cut at 45° on two corners, the way the option-03 mark
 * is cut. Behind Dr. Ghattas the mark stands large and the arrow lifts off it
 * along its own diagonal; hairlines climb at 45°; three facts slide in on the
 * same angle.
 *
 * Seamless loop: the hairlines advance exactly two spacings per loop and the
 * arrow's lift is one sine period. The facts are a designed cycle — in, hold,
 * out — so the loop restart reads as the next beat, not a jump.
 */

import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LOGOS } from "@/brand/logos";
import { BRUSHED_STOPS, GOLD, NAVY } from "@/brand/tokens";
import seated from "@/media/dr-seated.webp";

export const ASCEND = { width: 1080, height: 1200, frames: 300 } as const;

const W = ASCEND.width, H = ASCEND.height, CUT = 120;
const PANEL = `${CUT},0 ${W},0 ${W},${H - CUT} ${W - CUT},${H} 0,${H} 0,${CUT}`;
const MARK = LOGOS.arrow.mark;
/* Part order is the PDF's: G body, lower bar, then the arrow. */
const ARROW = 2;
const GAP = 64;

const FACTS = ["22+ YEARS", "ONE PATIENT AT A TIME", "40-MINUTE CONSULTATIONS"];

export function AscendHero() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const shift = t * GAP * 2;
  const lift = (1 - Math.cos(t * Math.PI * 2)) / 2; // 0 → 1 → 0
  const markH = 700, s = markH / MARK.h;

  return (
    <AbsoluteFill style={{ fontFamily: "'Archivo', sans-serif" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        <defs>
          <linearGradient id="as-brushed" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
            {BRUSHED_STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
          </linearGradient>
          <clipPath id="as-panel"><polygon points={PANEL} /></clipPath>
        </defs>

        <polygon points={PANEL} fill="url(#as-brushed)" />

        {/* 45° hairlines climbing up and to the right. */}
        <g clipPath="url(#as-panel)" stroke={NAVY[850]} strokeWidth={1.2} opacity={0.13}>
          {Array.from({ length: 40 }, (_, i) => {
            const x = -H + i * GAP + (shift % GAP);
            return <line key={i} x1={x} y1={H} x2={x + H} y2={0} />;
          })}
        </g>

        {/* The mark, large, embossed into the gold. */}
        <g transform={`translate(${W - MARK.w * s + 40} 150) scale(${s})`} opacity={0.3}>
          {MARK.d.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={GOLD[500]}
              transform={i === ARROW ? `translate(${lift * 9} ${-lift * 9})` : undefined}
            />
          ))}
        </g>
      </svg>

      <div style={{ position: "absolute", left: 96, bottom: 30, width: 470 }}>
        <div style={{
          position: "absolute", left: "6%", right: "6%", bottom: -4, height: 44, borderRadius: "50%",
          background: "rgba(40,24,8,0.45)", filter: "blur(18px)",
        }} />
        <Img src={seated} style={{ position: "relative", width: "100%", display: "block" }} />
      </div>

      {FACTS.map((f, i) => {
        const inAt = 18 + i * 16, outAt = durationInFrames - 46 + i * 8;
        const p = interpolate(frame, [inAt, inAt + 26, outAt, outAt + 22], [0, 1, 1, 0], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1),
        });
        const d = (1 - p) * 60;
        return (
          <div
            key={f}
            style={{
              position: "absolute", right: 46, bottom: 250 - i * 78,
              transform: `translate(${-d}px, ${d}px)`, opacity: p,
              background: NAVY[850], color: GOLD[200],
              padding: "16px 26px 15px",
              clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
              fontSize: 21, fontWeight: 800, fontStretch: "125%", letterSpacing: "0.06em",
              display: "flex", alignItems: "center", gap: 14,
            }}
          >
            <span style={{ color: GOLD[400] }}>↗</span>{f}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
