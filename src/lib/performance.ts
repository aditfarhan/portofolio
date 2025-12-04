/**
 * Performance Monitoring Utilities
 * 
 * Minimal performance monitoring focused on Web Vitals reporting.
 * Only includes functions actively used in the application.
 * 
 * @module lib/performance
 */

import { DEV_CONFIG } from "@/config/app.config";

/**
 * Report a metric to the performance monitor
 * 
 * Wrapper function for recording metrics from Web Vitals.
 * Logs to console in development for monitoring.
 * 
 * @param name - Metric name (LCP, FID, CLS, etc.)
 * @param value - Metric value in milliseconds
 * 
 * @example
 * ```ts
 * reportMetric('LCP', 1250);
 * reportMetric('FID', 45);
 * ```
 */
export function reportMetric(name: string, value: number): void {
    if (DEV_CONFIG.showPerformanceMetrics) {
        console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }

    // In production, send to analytics service
    // Example: analytics.track('web-vitals', { name, value });
}
