/**
 * Ghattas Passage — where patients fly in from.
 *
 * An azimuthal map centred on Cairo. Each city sits at its true great-circle
 * bearing from Cairo, and at a radius that grows with the square root of its
 * true distance (so Amman at 490 km and Lagos at 3,960 km both fit without
 * the near cities piling onto the centre). The rings mark 1,000-km steps on
 * that same scale. Nothing is placed by eye.
 *
 * Themed per direction through props; the geometry is shared.
 * Seamless loop: every pulse has a 120-frame period and the loop is 240.
 */

import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CAIRO, ORIGINS } from "@/content";

export const ROUTE = { width: 1200, height: 900, frames: 240 } as const;

export interface RouteTheme extends Record<string, unknown> {
  line: string;      // rings, arcs at rest
  pulse: string;     // travelling light
  city: string;      // city dots
  label: string;     // city names
  dim: string;       // distances, ring labels
  hub: string;       // Cairo
  font: string;
  labelWeight?: number;
  caps?: boolean;
  /** "arc" curves the routes; "straight" runs them as rules (Ascend). */
  routes?: "arc" | "straight";
}

const CX = 600, CY = 450, SCALE = 390, MAX_KM = 4000;
const rad = (d: number) => (d * Math.PI) / 180;
/* Riyadh, Kuwait and Dubai crowd one bearing, and Amman sits right above
   them. Labels move so none collide; every dot stays at its true position. */
const LABEL_POS: Record<string, "left" | "right" | "above"> = { Riyadh: "left", Kuwait: "left", Amman: "above" };

function bearingKm(lat: number, lon: number) {
  const p1 = rad(CAIRO.lat), p2 = rad(lat), dl = rad(lon - CAIRO.lon);
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  const brg = Math.atan2(y, x);
  const a = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  const km = 2 * 6371 * Math.asin(Math.sqrt(a));
  return { brg, km };
}

const radius = (km: number) => Math.sqrt(km / MAX_KM) * SCALE;

export const PLACES = ORIGINS.map((o) => {
  const { brg, km } = bearingKm(o.lat, o.lon);
  const r = radius(km);
  return { ...o, km, x: CX + r * Math.sin(brg), y: CY - r * Math.cos(brg), brg };
});

export function RouteMap(theme: RouteTheme) {
  const frame = useCurrentFrame();
  const period = 120;
  const hub = (frame % 60) / 60;
  const straight = theme.routes === "straight";
  const up = (s: string) => (theme.caps ? s.toUpperCase() : s);

  return (
    <AbsoluteFill>
      <svg viewBox={`0 0 ${ROUTE.width} ${ROUTE.height}`} width="100%" height="100%" style={{ fontFamily: theme.font }}>
        {[1000, 2000, 3000, 4000].map((km) => (
          <g key={km}>
            <circle cx={CX} cy={CY} r={radius(km)} fill="none" stroke={theme.line} strokeWidth={1} strokeDasharray={straight ? "none" : "3 7"} opacity={0.55} />
            <text x={CX + 6} y={CY - radius(km) - 7} fill={theme.dim} fontSize={19} letterSpacing={1.5}>
              {km.toLocaleString("en-US")} km
            </text>
          </g>
        ))}
        {/* North, so the bearings read as bearings. */}
        <line x1={CX} x2={CX} y1={CY - SCALE - 34} y2={CY - SCALE - 14} stroke={theme.dim} strokeWidth={1.5} />
        <text x={CX} y={CY - SCALE - 42} textAnchor="middle" fill={theme.dim} fontSize={18} letterSpacing={3}>N</text>

        {PLACES.map((p, i) => {
          const mx = (p.x + CX) / 2, my = (p.y + CY) / 2;
          const nx = -(CY - p.y), ny = CX - p.x; // perpendicular
          const len = Math.hypot(nx, ny) || 1;
          const bend = straight ? 0 : 0.2;
          const qx = mx + (nx / len) * Math.hypot(p.x - CX, p.y - CY) * bend;
          const qy = my + (ny / len) * Math.hypot(p.x - CX, p.y - CY) * bend;
          const d = `M ${p.x} ${p.y} Q ${qx} ${qy} ${CX} ${CY}`;
          const phase = ((frame + i * 23) % period) / period;
          const u = phase, v = 1 - u;
          const px = v * v * p.x + 2 * v * u * qx + u * u * CX;
          const py = v * v * p.y + 2 * v * u * qy + u * u * CY;
          const fade = Math.sin(Math.PI * phase);
          const pos: "left" | "right" | "above" = LABEL_POS[p.city] ?? (p.x >= CX ? "right" : "left");
          const lx = pos === "above" ? p.x : p.x + (pos === "right" ? 14 : -14);
          const anchor = pos === "above" ? "middle" : pos === "right" ? "start" : "end";
          const ly = pos === "above" ? p.y - 40 : p.y + 8;
          return (
            <g key={p.city}>
              <path d={d} fill="none" stroke={theme.line} strokeWidth={1.2} opacity={0.9} />
              <path d={d} pathLength={1} fill="none" stroke={theme.pulse} strokeWidth={2.4} strokeLinecap="round"
                strokeDasharray="0.12 0.88" strokeDashoffset={-phase + 0.12} opacity={fade} />
              <circle cx={px} cy={py} r={4.5} fill={theme.pulse} opacity={fade} />
              <circle cx={p.x} cy={p.y} r={6.5} fill={theme.city} />
              <text x={lx} y={ly} textAnchor={anchor}
                fill={theme.label} fontSize={29} fontWeight={theme.labelWeight ?? 500} letterSpacing={theme.caps ? 2 : 0.2}>
                {up(p.city)}
              </text>
              <text x={lx} y={ly + 26} textAnchor={anchor}
                fill={theme.dim} fontSize={19} letterSpacing={1}>
                {(Math.round(p.km / 10) * 10).toLocaleString("en-US")} km
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={12 + hub * 34} fill="none" stroke={theme.hub} strokeWidth={1.5} opacity={1 - hub} />
        <circle cx={CX} cy={CY} r={9} fill={theme.hub} />
        <text x={CX} y={CY + 52} textAnchor="middle" fill={theme.hub} fontSize={25} fontWeight={700} letterSpacing={6}>CAIRO</text>
      </svg>
    </AbsoluteFill>
  );
}
