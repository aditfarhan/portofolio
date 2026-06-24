/**
 * Sitemap Generation
 *
 * Automatically generates a sitemap for search engines.
 * Only includes real, existing routes — never phantom URLs.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/app.config";
import { CASE_STUDY_SLUGS } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...CASE_STUDY_SLUGS.map((slug) => ({
      url: `${baseUrl}/case-studies/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
