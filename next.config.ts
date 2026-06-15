import type { NextConfig } from "next";

/**
 * Standalone Sentinel documentation site (docs.fortiqo.xyz). Renders the
 * markdown in this repo; no external services. Security headers mirror the
 * platform baseline.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
