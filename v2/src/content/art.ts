/**
 * The mat behind each project cover: Van Gogh drawings from the Van Gogh
 * Museum, Amsterdam.
 *
 * They render exactly as they were scanned — their own paper and ink, at full
 * opacity, with no tint, wash or filter over them. The card's tinted backdrop
 * is skipped wherever one of these is present, because it would shift the
 * drawing's colour.
 *
 * Provenance: public-domain / CC0 scans via Wikimedia Commons. Vincent van
 * Gogh died in 1890, so the works themselves are long out of copyright and the
 * scans carry no further restriction. Credit is not legally required, but the
 * titles are kept here so it can be surfaced whenever we want to.
 */
export type Art = { src: string; title: string };

/** Keyed by case-study slug. A slug with no entry simply renders the flat tint. */
export const art: Record<string, Art> = {
  pickleball: { src: "/art/loom.webp", title: "Weaver: The Whole Loom, Seen from the Front" },
  volgen: { src: "/art/willow-road.webp", title: "Landscape with Path and Pollard Willows" },
  "balkan-transfer": { src: "/art/townscape.webp", title: "The Old Tower and Houses" },
  cuckoo: { src: "/art/field-diggers.webp", title: "Field with Figures Digging" },
  "morpa-kampus": { src: "/art/bridge-workers.webp", title: "Labourers on a Bridge" },
  "morpa-ders": { src: "/art/weaver.webp", title: "Weaver, Seen from the Front" },
};
