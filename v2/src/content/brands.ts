export type Brand = { name: string; slug: string; period?: string };

/**
 * Logo row: employers and clients. `slug` is the key the logo asset will use.
 * Periods come from docs/05-FACTS.md and docs/03-COPY.md; omitted where unconfirmed.
 */
export const brands: Brand[] = [
  { name: "Pickleball, Inc.", slug: "pickleball", period: "2024 – present" },
  { name: "Bild", slug: "bild", period: "2022 – 2024" },
  { name: "Agency Look", slug: "agency-look", period: "2022" },
  { name: "Morpa", slug: "morpa", period: "2021 – 2022" },
  { name: "Akbank", slug: "akbank" },
  { name: "DenizBank", slug: "denizbank" },
  { name: "Fibabanka", slug: "fibabanka" },
  { name: "Allianz", slug: "allianz" },
  { name: "Tmob AI Studio", slug: "tmob-ai-studio" },
  { name: "Balkan Transfer", slug: "balkan-transfer", period: "2023" },
  { name: "Cuckoo", slug: "cuckoo", period: "2022 – 2023" },
  { name: "VOLGEN", slug: "volgen", period: "2026" },
  { name: "Innos", slug: "innos", period: "2024" },
  { name: "Investisseur Privé", slug: "investisseur-prive" },
];
