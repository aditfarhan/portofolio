/**
 * Application Configuration
 * 
 * Centralized configuration for the entire application.
 * This file contains environment-specific settings, feature flags,
 * and application metadata.
 * 
 * @module config/app
 */

/**
 * Application metadata and information
 */
export const APP_CONFIG = {
    /** Application name */
    name: "Farhan Portfolio",
    /** Application version */
    version: "0.1.0",
    /** Application description */
    description: "Professional portfolio of Muhammad Aditia Farhan",
    /** Base URL for production */
    url: "https://aditfarhan-portofolio.vercel.app",
    /** Author information */
    author: {
        name: "Muhammad Aditia Farhan",
        email: "aditiafarhan25@gmail.com",
        linkedin: "https://www.linkedin.com/in/muhammad-aditia-farhan",
        github: "https://github.com/aditfarhan",
    },
} as const;

/**
 * Feature flags for enabling/disabling features
 */
export const FEATURE_FLAGS = {
    /** Enable analytics tracking */
    enableAnalytics: false,
    /** Enable error reporting to external service */
    enableErrorReporting: false,
    /** Enable performance monitoring */
    enablePerformanceMonitoring: false,
    /** Enable A/B testing */
    enableABTesting: false,
} as const;

/**
 * Animation and timing configurations
 */
export const ANIMATION_CONFIG = {
    /** Default animation duration in milliseconds */
    defaultDuration: 600,
    /** Auto-rotate interval for flip cards in milliseconds */
    autoRotateInterval: 15000,
    /** Reduced motion preference respected */
    respectReducedMotion: true,
} as const;

/**
 * UI component configurations
 */
export const UI_CONFIG = {
    /** Maximum projects to show initially */
    initialProjectsCount: 6,
    /** Number of projects to load per "Show More" action */
    projectsLoadIncrement: 3,
    /** Default theme */
    defaultTheme: "masculine" as const,
    /** Available themes */
    themes: ["masculine"] as const,
} as const;

/**
 * SEO and metadata configurations
 */
export const SEO_CONFIG = {
    /** Site URL */
    siteUrl: "https://aditfarhan-portofolio.vercel.app",
    /** Default page title */
    defaultTitle: "Muhammad Aditia Farhan - Software Engineer Portfolio",
    /** Title template for sub-pages */
    titleTemplate: "%s | Muhammad Aditia Farhan",
    /** Default meta description */
    defaultDescription:
        "Professional software engineer portfolio of Muhammad Aditia Farhan. Expert in React, Next.js, TypeScript, and healthcare technology. 5+ years experience building scalable web applications for enterprise clients.",
    /** Keywords for SEO */
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
    /** Open Graph image URL */
    ogImage: "/og-image.jpg",
    /** Twitter handle */
    twitterHandle: "@adtfrhan",
} as const;

/**
 * External service configurations
 */
export const EXTERNAL_SERVICES = {
    /** Clearbit logo API base URL */
    clearbitLogoApi: "https://logo.clearbit.com",
    /** Google favicon service base URL */
    googleFaviconApi: "https://www.google.com/s2/favicons",
    /** Google site verification code */
    googleSiteVerification: "ZysRmiDkYuRgfl21-iOq7EsNByZb4kS1hxtoCJJjLX4",
} as const;

/**
 * Performance thresholds and limits
 */
export const PERFORMANCE_CONFIG = {
    /** Maximum component render time in milliseconds (warning threshold) */
    maxRenderTime: 16,
    /** Enable performance profiling in development */
    enableProfiling: process.env.NODE_ENV === "development",
    /** Core Web Vitals thresholds */
    webVitals: {
        /** Largest Contentful Paint (LCP) threshold in seconds */
        lcp: 2.5,
        /** First Input Delay (FID) threshold in milliseconds */
        fid: 100,
        /** Cumulative Layout Shift (CLS) threshold */
        cls: 0.1,
    },
} as const;

/**
 * Development and debugging configurations
 */
export const DEV_CONFIG = {
    /** Enable debug logging */
    enableDebugLogging: process.env.NODE_ENV === "development",
    /** Enable React DevTools */
    enableReactDevTools: process.env.NODE_ENV === "development",
    /** Show performance metrics in console */
    showPerformanceMetrics: process.env.NODE_ENV === "development",
} as const;
