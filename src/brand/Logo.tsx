/**
 * The brand book's marks, drawn from the vectors in logos.ts.
 *
 * `fill` takes any CSS colour, or "brushed" for the book's gold gradient. The
 * gradient is defined per instance with useId, because two SVGs on a page that
 * share a gradient id resolve to whichever was painted first.
 */

import { useId, type CSSProperties } from "react";
import { LOGOS } from "./logos";
import { BRUSHED_STOPS } from "./tokens";

export type LogoKey = keyof typeof LOGOS;
type Fill = string | "brushed";

/* userSpaceOnUse, so one sweep crosses the whole mark. In bounding-box units
   every part would get its own gradient and the brushing would restart on
   each stroke of the letter. */
function Brushed({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <defs>
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2={h}>
        {BRUSHED_STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
      </linearGradient>
    </defs>
  );
}

const paint = (f: Fill, id: string) => (f === "brushed" ? `url(#${id})` : f);

/** The logomark alone. Sized by height. */
export function Mark({
  logo, height, fill = "currentColor", outline, className, style,
}: {
  logo: LogoKey; height: number | string; fill?: Fill;
  /** Stroke the mark instead of filling it — the book's cover treatment. */
  outline?: number; className?: string; style?: CSSProperties;
}) {
  const id = useId().replace(/:/g, "");
  const m = LOGOS[logo].mark;
  const pad = outline ? outline : 0;
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${m.w + pad * 2} ${m.h + pad * 2}`}
      style={{ height, width: "auto", display: "block", overflow: "visible", ...style }}
      className={className}
      aria-hidden
    >
      {fill === "brushed" && <Brushed id={id} w={m.w} h={m.h} />}
      {outline
        ? m.d.map((d, i) => <path key={i} d={d} fill="none" stroke={paint(fill, id)} strokeWidth={outline} vectorEffect="non-scaling-stroke" />)
        : m.d.map((d, i) => <path key={i} d={d} fill={paint(fill, id)} />)}
    </svg>
  );
}

/** GHATTAS over CLINIC, each line coloured separately. Sized by height. */
export function Wordmark({
  logo, height, name = "currentColor", sub, className, title = "Ghattas Clinic",
}: {
  logo: LogoKey; height: number | string; name?: Fill; sub?: Fill; className?: string; title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const w = LOGOS[logo].word;
  return (
    <svg
      viewBox={`0 0 ${w.w} ${w.h}`}
      style={{ height, width: "auto", display: "block" }}
      className={className}
      role="img"
      aria-label={title}
    >
      {(name === "brushed" || sub === "brushed") && <Brushed id={id} w={w.w} h={w.h} />}
      {w.name.map((d, i) => <path key={"n" + i} d={d} fill={paint(name, id)} />)}
      {w.sub.map((d, i) => <path key={"s" + i} d={d} fill={paint(sub ?? name, id)} />)}
    </svg>
  );
}

/**
 * Mark + wordmark, laid out as the book's horizontal lockup. The gap and the
 * mark-to-wordmark height ratio are measured off the book's lockup page.
 */
export function Lockup({
  logo, height, mark = "currentColor", name = "currentColor", sub, className,
}: {
  logo: LogoKey; height: number; mark?: Fill; name?: Fill; sub?: Fill; className?: string;
}) {
  const ratio = logo === "arrow" ? 0.85 : 0.8;
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: height * 0.26 }}>
      <Mark logo={logo} height={height} fill={mark} />
      <Wordmark logo={logo} height={height * ratio} name={name} sub={sub} />
    </span>
  );
}
