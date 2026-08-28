import type { CaseStudy } from "@/content/types";

import pickleballHomepage from "./pickleball-homepage";
import pickleballTournaments from "./pickleball-tournaments";
import pickleballApps from "./pickleball-apps";
import volgen from "./volgen";
import balkanTransfer from "./balkan-transfer";
import cuckoo from "./cuckoo";
import akbank from "./akbank";
import morpaKampus from "./morpa-kampus";
import morpaDers from "./morpa-ders";

/** All case studies, in display order. */
export const studies: CaseStudy[] = [
  pickleballTournaments,
  pickleballHomepage,
  pickleballApps,
  volgen,
  balkanTransfer,
  cuckoo,
  akbank,
  morpaKampus,
  morpaDers,
];

/** Look a study up by its slug; undefined when the slug isn't one of ours. */
export function getStudy(slug: string): CaseStudy | undefined {
  return studies.find((s) => s.slug === slug);
}
