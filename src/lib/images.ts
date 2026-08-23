import manifest from "@/content/images.json";

/**
 * Image manifest emitted by the pipeline (public/work/<slug>/*.webp).
 * Everything degrades gracefully: a missing figure renders a tinted placeholder
 * rather than breaking the page, so content and images can land independently.
 */
export type Img = { src: string; width: number; height: number; top?: string | null };

type Manifest = {
  [slug: string]: { cover?: string; figures?: Record<string, Img & { original?: string }> } | undefined;
} & { about?: { portrait?: Img } };

const m = manifest as unknown as Manifest;

export function getCover(slug: string): Img | null {
  const p = m[slug];
  if (!p?.cover) return null;
  return { src: p.cover, width: 1600, height: 1000 };
}

export function getFigure(slug: string, key: string): Img | null {
  const f = m[slug]?.figures?.[key];
  return f ?? null;
}

export function getPortrait(): Img | null {
  return m.about?.portrait ?? null;
}
