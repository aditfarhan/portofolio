/**
 * Robots.txt Configuration
 * 
 * Controls how search engines crawl and index the site.
 * Provides directives for search engine bots.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/config/app.config';

/**
 * Generate robots.txt for search engine crawlers
 * 
 * Allows all bots to crawl all pages and points to sitemap.
 * 
 * @returns Robots configuration
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/private/'],
        },
        sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    };
}
