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
  defaultTitle: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
  titleTemplate: "%s | Muhammad Aditia Farhan",
  defaultDescription:
    "Software Engineer in Jakarta with 5+ years building enterprise healthcare systems, HIS/EMR platforms, and scalable web applications across healthcare, logistics, e-commerce, and telecom. Lead engineer for HIS/EMR deployed across 12+ hospitals in Indonesia.",
  keywords: [
    "Muhammad Aditia Farhan",
    "healthcare software engineer Indonesia",
    "HIS EMR developer",
    "SATUSEHAT integration engineer",
    "enterprise web development Jakarta",
    "React Next.js TypeScript developer",
    "Docker Kubernetes Jenkins",
    "healthcare IT engineer Indonesia",
    "hospital information system developer",
    "full stack engineer healthcare",
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
