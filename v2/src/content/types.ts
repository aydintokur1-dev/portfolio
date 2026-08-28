/**
 * Content types. Case studies are plain TS modules (src/content/work/*.ts)
 * so they type-check, tree-shake, and stay easy for any agent to edit.
 */

export type Tint = "blue" | "yellow" | "green" | "lavender" | "pink";

/** A figure references an optimised image by the slug the image pipeline emits. */
export type Figure = {
  /** key into the image manifest, e.g. "style-guide" */
  src: string;
  caption?: string;
  /** full-bleed inside the column (default) or a narrower inset */
  size?: "full" | "inset";
  /**
   * Tall images (> 1.5:1) scroll inside a viewport-height frame by default.
   * "full" lays the whole image out at its natural height so the entire
   * design is visible as the page scrolls — use for stitched full-page shots.
   */
  frame?: "scroll" | "full";
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; by?: string }
  | { type: "figure"; figure: Figure }
  | { type: "figures"; figures: Figure[] } // 2-up grid
  /** before/after pair laid out side by side at full height, with sticky column labels */
  | { type: "compare"; before: Figure; after: Figure; labels?: [string, string]; caption?: string }
  | { type: "stat"; items: { value: string; label: string }[] }
  | { type: "decision"; problem: string; constraint?: string; decision: string; outcome?: string };

export type CaseStudy = {
  slug: string;
  title: string; // the claim, e.g. "From form-filling to decision-making"
  org: string; // "Balkan Transfer"
  year: string; // "2023" or "2024 – present"
  role: string; // "Lead Product Designer"
  tint: Tint;
  tier: "flagship" | "depth" | "range";
  /** one-paragraph summary used on the home card and at the top of the page */
  summary: string;
  /** mono facts shown in a small table at the top */
  facts: { label: string; value: string }[];
  /** cover figure key — shown at its native aspect on the detail page; the home grid uses the 16:10 crop */
  cover: string;
  /**
   * Optional before/after cover for the detail page: two figure keys shown
   * side by side under BEFORE/AFTER chips. Each side can carry a `thumb`
   * (a crop shown in place) while the click opens the full `src` at 1:1.
   * The home grid still uses `cover`.
   */
  coverCompare?: { before: { src: string; thumb?: string }; after: { src: string; thumb?: string } };
  sections: { heading: string; blocks: Block[] }[];
  /** true if the page sits behind the password gate (unreleased work) */
  gated?: boolean;
  /** external link, if the thing is live */
  link?: { href: string; label: string };
};

export type Testimonial = {
  name: string;
  role: string;
  relation: string; // "managed Aydın directly", "same team", …
  date: string; // "May 2025"
  lang: "en" | "tr";
  text: string;
  /** English translation when lang === "tr" */
  en?: string;
  /** Verbatim sentence(s) from `text` to show on the card instead of the auto-cut opening. */
  excerpt?: string;
  /** Same, for `en`. */
  excerptEn?: string;
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
};
