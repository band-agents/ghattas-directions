/**
 * Direction A — Nocturne. The hero picture.
 *
 * The book's cover treatment, set moving: the globe G drawn as a gold hairline
 * outline, with a turning globe behind it — ghost meridians sweeping and real
 * cities rotating past, Cairo lit — and Dr. Ghattas seated in front.
 *
 * Every motion here is cyclic and lands exactly on its start at the last
 * frame, so the loop has no seam: the meridian set repeats every 30°, the
 * cities turn a full 360°, the tracing light runs once round each stroke.
 * The entrance is done by the page around the player, not in here — a
 * composition cannot tell its first loop from its tenth.
 */

import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";
import { LOGOS } from "@/brand/logos";
import { GOLD } from "@/brand/tokens";
import { CAIRO, ORIGINS } from "@/content";
import seated from "@/media/dr-seated.webp";

export const GLOBE = { width: 1080, height: 1200, frames: 720 } as const;

const CX = 540, CY = 560, R = 470;
const MARK = LOGOS.globeSans.mark;
const S = (R * 2) / MARK.w;
const rad = (d: number) => (d * Math.PI) / 180;

export function GlobeHero() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0 → 1 over the loop

  /* Meridians: six great circles 30° apart. Turning the set by 60° per loop
     maps it onto itself, so the end frame equals the first. */
  const spin = t * (Math.PI / 3);
  const meridians = Array.from({ length: 6 }, (_, k) => Math.abs(Math.cos(spin + (k * Math.PI) / 6)) * R);

  /* Cities: orthographic, axis upright, one full turn per loop. Longitude is
     offset so Cairo faces the viewer at the start. */
  const lon0 = CAIRO.lon + t * 360;
  const project = (lat: number, lon: number) => {
    const dl = rad(lon - lon0), p = rad(lat);
    return { x: CX + R * Math.cos(p) * Math.sin(dl), y: CY - R * Math.sin(p), z: Math.cos(p) * Math.cos(dl) };
  };
  const cairo = project(CAIRO.lat, CAIRO.lon);
  const glow = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 6);

  /* The orbit dot goes round twice per loop. */
  const oa = t * Math.PI * 4;
  const orbit = { rx: 560, ry: 132, rot: -14 };
  const od = { x: orbit.rx * Math.cos(oa), y: orbit.ry * Math.sin(oa) };

  return (
    <AbsoluteFill>
      <svg viewBox={`0 0 ${GLOBE.width} ${GLOBE.height}`} width="100%" height="100%">
        <defs>
          <radialGradient id="gh-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD.logo} stopOpacity={0.16 + glow * 0.05} />
            <stop offset="60%" stopColor={GOLD.logo} stopOpacity={0.04} />
            <stop offset="100%" stopColor={GOLD.logo} stopOpacity={0} />
          </radialGradient>
          <clipPath id="gh-disc"><circle cx={CX} cy={CY} r={R - 2} /></clipPath>
        </defs>

        <circle cx={CX} cy={CY + 40} r={R * 0.95} fill="url(#gh-halo)" />

        {/* The turning globe, inside the ring. */}
        <g clipPath="url(#gh-disc)" stroke={GOLD.logo} fill="none">
          {meridians.map((rx, k) => (
            <ellipse key={k} cx={CX} cy={CY} rx={Math.max(rx, 0.5)} ry={R} strokeWidth={1} opacity={0.09 + 0.05 * (rx / R)} />
          ))}
          {[-60, -30, 30, 60].map((lat) => {
            const y = CY - R * Math.sin(rad(lat)), hw = R * Math.cos(rad(lat));
            return <line key={lat} x1={CX - hw} x2={CX + hw} y1={y} y2={y} strokeWidth={1} opacity={0.1} />;
          })}
        </g>

        {/* Origin cities rotating past; only the near hemisphere shows. */}
        {ORIGINS.map((o) => {
          const p = project(o.lat, o.lon);
          if (p.z <= 0.02) return null;
          return <circle key={o.city} cx={p.x} cy={p.y} r={3.2} fill={GOLD[200]} opacity={0.25 + 0.6 * p.z} />;
        })}
        {cairo.z > 0.02 && (
          <g opacity={Math.min(1, cairo.z * 1.6)}>
            <circle cx={cairo.x} cy={cairo.y} r={10 + glow * 16} fill="none" stroke={GOLD[100]} strokeWidth={1.4} opacity={0.5 * (1 - glow)} />
            <circle cx={cairo.x} cy={cairo.y} r={5.5} fill={GOLD[100]} />
            <text x={cairo.x + 16} y={cairo.y - 12} fill={GOLD[100]} fontFamily="Manrope, sans-serif" fontSize={17} letterSpacing={5} fontWeight={600}>CAIRO</text>
          </g>
        )}

        {/* The mark itself, as the book's cover draws it: outline only. */}
        <g transform={`translate(${CX - R} ${CY - R}) scale(${S})`}>
          {MARK.d.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={GOLD.logo} strokeWidth={1.3} opacity={0.62} vectorEffect="non-scaling-stroke" />
          ))}
          {/* Light running once round each stroke per loop. */}
          {MARK.d.map((d, i) => (
            <path
              key={`t${i}`}
              d={d}
              pathLength={1}
              fill="none"
              stroke={GOLD[100]}
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeDasharray="0.07 0.93"
              strokeDashoffset={-(t + i * 0.23) % 1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Orbit: the back half is drawn here, behind him. */}
        <g transform={`translate(${CX} ${CY + 60}) rotate(${orbit.rot})`}>
          <ellipse rx={orbit.rx} ry={orbit.ry} fill="none" stroke={GOLD.logo} strokeWidth={1} strokeDasharray="2 11" opacity={0.4} />
          {od.y < 0 && <circle cx={od.x} cy={od.y} r={5} fill={GOLD[100]} opacity={0.7} />}
        </g>
      </svg>

      {/* Dr. Ghattas. The complete seated figure, so nothing is cropped. */}
      <div style={{ position: "absolute", left: "50%", bottom: 34, transform: "translateX(-50%)", width: 452 }}>
        <div style={{
          position: "absolute", left: "8%", right: "8%", bottom: -6, height: 46, borderRadius: "50%",
          background: "rgba(0,0,0,0.55)", filter: "blur(20px)",
        }} />
        <Img src={seated} style={{ position: "relative", width: "100%", display: "block" }} />
      </div>

      {/* Front half of the orbit passes in front of the chair. */}
      <svg viewBox={`0 0 ${GLOBE.width} ${GLOBE.height}`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(${CX} ${CY + 60}) rotate(${orbit.rot})`}>
          <path
            d={`M ${-orbit.rx} 0 A ${orbit.rx} ${orbit.ry} 0 0 0 ${orbit.rx} 0`}
            fill="none" stroke={GOLD.logo} strokeWidth={1} strokeDasharray="2 11" opacity={0.55}
          />
          {od.y >= 0 && <circle cx={od.x} cy={od.y} r={6} fill={GOLD[100]} />}
        </g>
      </svg>
    </AbsoluteFill>
  );
}
