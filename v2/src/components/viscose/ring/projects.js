// The ring's deal, in ring order — derived from the site's own case studies
// so the carousel can never disagree with the content it opens. Entry n sits
// one slot along from entry n−1, which is what lets the column top-right
// count up as the carousel turns. Reorder `studies` to change the sequence —
// never imageOffset, which rotates the art without moving the list.
//
// The cards carry no artwork in v2: each cell is typeset in ring/atlas.js
// from these fields. `locked` marks the gated studies so their cells carry
// the padlock and the info panel says so.
import { studies } from "@/content/work";

// The right-hand lockup sets the type small against the year, so the long
// role strings are compressed to a label that fits the composition.
const TYPE = {
  pickleball: "Platform",
  "pickleball-tournaments": "Product design",
  "pickleball-homepage": "Web design",
  "pickleball-apps": "Native apps",
  volgen: "Design + build",
  "tmob-studio": "Design + build",
  "balkan-transfer": "Product design",
  cuckoo: "Product design",
  innos: "3-day case",
  "akbank-wings": "UI refresh",
  "morpa-kampus": "Product design",
  "morpa-ders": "Product design",
};

export const PROJECTS = studies.map((s) => ({
  slug: s.slug,
  name: s.org,
  type: TYPE[s.slug] ?? s.role,
  year: s.year,
  role: s.role,
  title: s.title,
  summary: s.summary,
  tint: s.tint,
  locked: !!s.gated,
}));
