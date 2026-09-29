/**
 * Routing: #<direction>/<page>, e.g. #porcelain/book. A bare #porcelain is
 * that direction's home; an empty hash is the overview board.
 *
 * Hash routing because the site is served from GitHub Pages and also shipped
 * as one standalone HTML file; neither can rewrite paths. In-page jumps still
 * use scrollToId, never #anchors, or they would replace the route.
 */

import { PAGES, type PageId } from "@/content";

export const DIRECTIONS = [
  { id: "nocturne", letter: "A", name: "Nocturne" },
  { id: "porcelain", letter: "B", name: "Porcelain" },
  { id: "ascend", letter: "C", name: "Ascend" },
] as const;

export type DirId = (typeof DIRECTIONS)[number]["id"];
export type View = { dir: "overview" } | { dir: DirId; page: PageId };

export const href = (dir: DirId, page: PageId = "home") => (page === "home" ? `#${dir}` : `#${dir}/${page}`);

export function readHash(): View {
  const [d, p] = window.location.hash.replace(/^#\/?/, "").split("/");
  const dir = DIRECTIONS.find((x) => x.id === d)?.id;
  if (!dir) return { dir: "overview" };
  const page = (p && p in PAGES ? p : "home") as PageId;
  return { dir, page };
}
