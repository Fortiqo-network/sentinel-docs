import type { MetadataRoute } from "next";
import { allDocParams } from "@/lib/docs";

const SITE_URL = "https://docs.fortiqo.xyz";

/** Sitemap of every documentation page declared in nav.json. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allDocParams().map(({ slug }) => ({
    url: slug.length ? `${SITE_URL}/${slug.join("/")}` : `${SITE_URL}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: slug.length === 0 ? 1.0 : 0.7,
  }));
}
