/**
 * Web Vitals Reporting
 * 
 * Reports Core Web Vitals to analytics or console.
 * Tracks performance metrics in real-time.
 * 
 * @module app/web-vitals
 */

"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportMetric } from "@/lib/performance";

/**
 * Web Vitals Reporter Component
 * 
 * Automatically reports Web Vitals metrics.
 * In development: logs to console
 * In production: can be sent to analytics service
 * 
 * @example
 * ```tsx
 * // Add to layout.tsx
 * <WebVitals />
 * ```
 */
export function WebVitals() {
    useReportWebVitals((metric) => {
        // Report to performance monitor
        reportMetric(metric.name, metric.value);

        // In development, log to console
        if (process.env.NODE_ENV === "development") {
            console.log(`[Web Vitals] ${metric.name}:`, {
                value: metric.value,
                rating: metric.rating,
                delta: metric.delta,
            });
        }

        // In production, send to analytics
        // Example: sendToAnalytics(metric)
        // Example: sendToGoogleAnalytics(metric)
        // Example: sendToVercelAnalytics(metric)
    });

    return null;
}
