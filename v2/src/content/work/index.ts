import type { CaseStudy } from "@/content/types";

import pickleball from "./pickleball";
import pickleballHomepage from "./pickleball-homepage";
import pickleballTournaments from "./pickleball-tournaments";
import pickleballApps from "./pickleball-apps";
import volgen from "./volgen";
import tmobStudio from "./tmob-studio";
import balkanTransfer from "./balkan-transfer";
import cuckoo from "./cuckoo";
import innos from "./innos";
import akbank from "./akbank";
import morpaKampus from "./morpa-kampus";
import morpaDers from "./morpa-ders";

/** All case studies, in display order. */
export const studies: CaseStudy[] = [
  pickleball,
  pickleballTournaments,
  pickleballHomepage,
  pickleballApps,
  volgen,
  tmobStudio,
  balkanTransfer,
  cuckoo,
  innos,
  akbank,
  morpaKampus,
  morpaDers,
];

/** Look a study up by its slug; undefined when the slug isn't one of ours. */
export function getStudy(slug: string): CaseStudy | undefined {
  return studies.find((s) => s.slug === slug);
}
