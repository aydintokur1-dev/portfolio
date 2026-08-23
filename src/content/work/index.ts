import type { CaseStudy } from "@/content/types";

import pickleball from "./pickleball";
import volgen from "./volgen";
import balkanTransfer from "./balkan-transfer";
import cuckoo from "./cuckoo";
import innos from "./innos";
import morpa from "./morpa";
import visitMontenegro from "./visit-montenegro";

/** All case studies, in display order. */
export const studies: CaseStudy[] = [
  pickleball,
  volgen,
  balkanTransfer,
  cuckoo,
  innos,
  morpa,
  visitMontenegro,
];

/** Look a study up by its slug; undefined when the slug isn't one of ours. */
export function getStudy(slug: string): CaseStudy | undefined {
  return studies.find((s) => s.slug === slug);
}
