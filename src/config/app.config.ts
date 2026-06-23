/**
 * Application Configuration
 *
 * Only exports that are actively imported elsewhere are kept here.
 * Removed: APP_CONFIG, FEATURE_FLAGS, ANIMATION_CONFIG, UI_CONFIG,
 *           EXTERNAL_SERVICES, PERFORMANCE_CONFIG (all unused).
 *
 * @module config/app
 */

/**
 * SEO and metadata configurations
 * Used by: sitemap.ts, robots.ts
 */
export const SEO_CONFIG = {
  siteUrl: "https://aditfarhan-portofolio.vercel.app",
  defaultTitle: "Muhammad Aditia Farhan — Software Engineer Portfolio",
  titleTemplate: "%s | Muhammad Aditia Farhan",
  defaultDescription:
    "Professional software engineer portfolio of Muhammad Aditia Farhan. Specializing in React, Next.js, TypeScript, and healthcare technology. 5+ years experience building scalable web applications for enterprise clients.",
  keywords: [
    "Muhammad Aditia Farhan",
    "software engineer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript expert",
    "healthcare technology",
    "web development Indonesia",
    "full stack developer",
    "frontend engineer",
    "scalable web applications",
  ],
  twitterHandle: "@adtfrhan",
} as const;

/**
 * Development and debugging configurations
 * Used by: lib/performance.ts (web-vitals logging)
 */
export const DEV_CONFIG = {
  enableDebugLogging: process.env.NODE_ENV === "development",
  enableReactDevTools: process.env.NODE_ENV === "development",
  showPerformanceMetrics: process.env.NODE_ENV === "development",
} as const;
