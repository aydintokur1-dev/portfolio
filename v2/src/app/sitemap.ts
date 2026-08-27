import type { MetadataRoute } from "next";
import { studies } from "@/content/work";
import { isGated } from "@/lib/gate-client";

const SITE_URL = "https://aydinswork.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...studies
      .filter((s) => !isGated(s.slug))
      .map((s) => ({
        url: `${SITE_URL}/work/${s.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ];
}
