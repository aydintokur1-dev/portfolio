import type { MetadataRoute } from "next";
import { GATED_SLUGS } from "@/lib/gate-client";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", ...GATED_SLUGS.map((slug) => `/work/${slug}`)],
    },
    sitemap: "https://aydinswork.com/sitemap.xml",
  };
}
