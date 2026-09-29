/**
 * The overview board, then three directions of eight pages each.
 * Routes: #<direction>/<page> (see lib/routes.ts). Switching direction keeps
 * the page, so the client can compare the same page across A, B and C.
 */

import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { PAGES } from "@/content";
import { DIRECTIONS, href, readHash, type View } from "@/lib/routes";
import { Overview } from "@/overview/Overview";
import { Nocturne } from "@/directions/Nocturne";
import { Porcelain } from "@/directions/Porcelain";
import { Ascend } from "@/directions/Ascend";

export function App() {
  const [view, setView] = useState<View>(readHash);

  useEffect(() => {
    const on = () => {
      setView(readHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useEffect(() => {
    if (view.dir === "overview") { document.title = "Ghattas Clinic Directions"; return; }
    const d = DIRECTIONS.find((x) => x.id === view.dir)!;
    document.title = `${PAGES[view.page].nav} · Ghattas · ${d.letter} ${d.name}`;
  }, [view]);

  if (view.dir === "overview") return <Overview />;
  const { dir, page } = view;

  return (
    <>
      {dir === "nocturne" && <Nocturne page={page} />}
      {dir === "porcelain" && <Porcelain page={page} />}
      {dir === "ascend" && <Ascend page={page} />}
      <nav className="sw" aria-label="Switch direction">
        <a href="#overview" className="sw-home"><LayoutGrid size={14} /><span className="sw-name">Overview</span></a>
        {DIRECTIONS.map((d) => (
          <a key={d.id} href={href(d.id, page)} aria-current={dir === d.id ? "page" : undefined}>
            <b>{d.letter}</b><span className="sw-name">{d.name}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
