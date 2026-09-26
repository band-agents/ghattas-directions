/**
 * One page, four views: the overview board and the three directions.
 *
 * Routed on a bare hash token (#nocturne, not #/nocturne) because the artifact
 * host only passes plain tokens through to location.hash. In-page links
 * therefore never use #anchors — they call scrollToId instead, or they would
 * overwrite the route.
 */

import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { Overview } from "@/overview/Overview";
import { Nocturne } from "@/directions/Nocturne";
import { Porcelain } from "@/directions/Porcelain";
import { Ascend } from "@/directions/Ascend";

export const DIRECTIONS = [
  { id: "nocturne", letter: "A", name: "Nocturne" },
  { id: "porcelain", letter: "B", name: "Porcelain" },
  { id: "ascend", letter: "C", name: "Ascend" },
] as const;
type View = "overview" | (typeof DIRECTIONS)[number]["id"];

const read = (): View => {
  const h = window.location.hash.replace(/^#\/?/, "");
  return (DIRECTIONS.some((d) => d.id === h) ? h : "overview") as View;
};

const TITLES: Record<View, string> = {
  overview: "Ghattas Clinic Directions",
  nocturne: "Ghattas Clinic · A · Nocturne",
  porcelain: "Ghattas Clinic · B · Porcelain",
  ascend: "Ghattas Clinic · C · Ascend",
};

export function App() {
  const [view, setView] = useState<View>(read);

  useEffect(() => {
    const on = () => {
      setView(read());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useEffect(() => {
    document.title = TITLES[view];
  }, [view]);

  return (
    <>
      {view === "overview" && <Overview />}
      {view === "nocturne" && <Nocturne />}
      {view === "porcelain" && <Porcelain />}
      {view === "ascend" && <Ascend />}
      {view !== "overview" && (
        <nav className="sw" aria-label="Switch direction">
          <a href="#overview" className="sw-home"><LayoutGrid size={14} /><span className="sw-name">Overview</span></a>
          {DIRECTIONS.map((d) => (
            <a key={d.id} href={`#${d.id}`} aria-current={view === d.id ? "page" : undefined}>
              <b>{d.letter}</b><span className="sw-name">{d.name}</span>
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
