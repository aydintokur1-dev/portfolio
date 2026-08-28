import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  turbopack: {
    root: path.join(__dirname),
  },
  // Studies that no longer exist: send old links and search results to the
  // work index instead of a 404.
  async redirects() {
    return ["pickleball", "innos", "tmob-studio", "tmob"].map((slug) => ({
      source: `/work/${slug}`,
      destination: "/#work",
      permanent: true,
    }));
  },
};

export default nextConfig;
