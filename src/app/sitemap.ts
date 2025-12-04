/**
 * Sitemap Generation
 * 
 * Automatically generates a sitemap for search engines.
 * This helps search engines discover and index all pages.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';
import { portfolio } from '@/data/portfolio';
import { SEO_CONFIG } from '@/config/app.config';

/**
 * Generate sitemap for search engines
 * 
 * Includes:
 * - Homepage (highest priority)
 * - Project pages (high priority)
 * 
 * @returns Sitemap array
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SEO_CONFIG.siteUrl;
    const lastModified = new Date();

    // Main pages
    const routes = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
    ];

    // Project pages (if you add individual project pages in the future)
    const projectRoutes = portfolio.projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...projectRoutes];
}
