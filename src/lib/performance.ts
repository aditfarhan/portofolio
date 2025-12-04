/**
 * Performance Monitoring Utilities
 * 
 * This module provides utilities for monitoring and tracking
 * application performance, including component render times
 * and Core Web Vitals.
 * 
 * @module lib/performance
 */

import { PERFORMANCE_CONFIG, DEV_CONFIG } from "@/config/app.config";

/**
 * Performance metric types
 */
export type MetricType = "render" | "interaction" | "navigation" | "custom";

/**
 * Performance metric data
 */
export interface PerformanceMetric {
    /** Name of the metric */
    name: string;
    /** Type of metric */
    type: MetricType;
    /** Value in milliseconds */
    value: number;
    /** Timestamp when metric was recorded */
    timestamp: number;
    /** Additional metadata */
    metadata?: Record<string, unknown>;
}

/**
 * Singleton class for performance monitoring
 */
class PerformanceMonitor {
    private metrics: PerformanceMetric[] = [];
    private timers: Map<string, number> = new Map();

    /**
     * Start a performance timer
     * 
     * @param name - Unique name for the timer
     * 
     * @example
     * ```ts
     * PerformanceMonitor.start("component-render");
     * // ... some work
     * PerformanceMonitor.end("component-render");
     * ```
     */
    start(name: string): void {
        this.timers.set(name, performance.now());
    }

    /**
     * End a performance timer and record the metric
     * 
     * @param name - Name of the timer to end
     * @param type - Type of metric (default: "custom")
     * @param metadata - Additional metadata to store
     * @returns Duration in milliseconds, or null if timer not found
     */
    end(
        name: string,
        type: MetricType = "custom",
        metadata?: Record<string, unknown>
    ): number | null {
        const startTime = this.timers.get(name);

        if (!startTime) {
            if (DEV_CONFIG.enableDebugLogging) {
                console.warn(`Performance timer "${name}" was never started`);
            }
            return null;
        }

        const duration = performance.now() - startTime;
        this.timers.delete(name);

        const metric: PerformanceMetric = {
            name,
            type,
            value: duration,
            timestamp: Date.now(),
            metadata,
        };

        this.metrics.push(metric);

        if (DEV_CONFIG.showPerformanceMetrics) {
            this.logMetric(metric);
        }

        return duration;
    }

    /**
     * Record a custom metric
     * 
     * @param name - Name of the metric
     * @param value - Value in milliseconds
     * @param type - Type of metric
     * @param metadata - Additional metadata
     */
    record(
        name: string,
        value: number,
        type: MetricType = "custom",
        metadata?: Record<string, unknown>
    ): void {
        const metric: PerformanceMetric = {
            name,
            type,
            value,
            timestamp: Date.now(),
            metadata,
        };

        this.metrics.push(metric);

        if (DEV_CONFIG.showPerformanceMetrics) {
            this.logMetric(metric);
        }
    }

    /**
     * Get all recorded metrics
     * 
     * @returns Array of all performance metrics
     */
    getMetrics(): PerformanceMetric[] {
        return [...this.metrics];
    }

    /**
     * Get metrics filtered by type
     * 
     * @param type - Type of metrics to retrieve
     * @returns Filtered array of metrics
     */
    getMetricsByType(type: MetricType): PerformanceMetric[] {
        return this.metrics.filter((m) => m.type === type);
    }

    /**
     * Clear all recorded metrics
     */
    clear(): void {
        this.metrics = [];
        this.timers.clear();
    }

    /**
     * Log a metric to console (development only)
     * 
     * @param metric - The metric to log
     */
    private logMetric(metric: PerformanceMetric): void {
        const color = this.getColorForMetric(metric);
        console.log(
            `%c[Performance] ${metric.name} (${metric.type}): ${metric.value.toFixed(2)}ms`,
            `color: ${color}; font-weight: bold;`
        );
    }

    /**
     * Get console color based on metric value
     * 
     * @param metric - The metric to evaluate
     * @returns CSS color string
     */
    private getColorForMetric(metric: PerformanceMetric): string {
        if (metric.type === "render") {
            if (metric.value > PERFORMANCE_CONFIG.maxRenderTime) {
                return "#ff6b6b"; // Red for slow renders
            }
            return "#51cf66"; // Green for good renders
        }
        return "#339af0"; // Blue for other metrics
    }
}

/**
 * Singleton instance of PerformanceMonitor
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Higher-order function to measure component render time
 * 
 * @param componentName - Name of the component
 * @param callback - Function to measure
 * @returns Result of the callback
 * 
 * @example
 * ```ts
 * const result = measureRender("MyComponent", () => {
 *   // component render logic
 *   return renderResult;
 * });
 * ```
 */
export function measureRender<T>(
    componentName: string,
    callback: () => T
): T {
    if (!PERFORMANCE_CONFIG.enableProfiling) {
        return callback();
    }

    const timerName = `render:${componentName}`;
    performanceMonitor.start(timerName);

    try {
        const result = callback();
        performanceMonitor.end(timerName, "render", { component: componentName });
        return result;
    } catch (error) {
        performanceMonitor.end(timerName, "render", {
            component: componentName,
            error: true,
        });
        throw error;
    }
}

/**
 * Report Core Web Vitals to analytics
 * 
 * @param metric - Web Vitals metric object
 * 
 * @example
 * ```ts
 * import { onCLS, onFID, onLCP } from 'web-vitals';
 * 
 * onCLS(reportWebVitals);
 * onFID(reportWebVitals);
 * onLCP(reportWebVitals);
 * ```
 */
export function reportWebVitals(metric: {
    name: string;
    value: number;
    id: string;
}): void {
    if (DEV_CONFIG.showPerformanceMetrics) {
        console.log("[Web Vitals]", metric);
    }

    // In production, send to analytics service
    // Example: analytics.track('web-vitals', metric);
}

/**
 * Check if a performance value exceeds threshold
 * 
 * @param metricName - Name of the metric (LCP, FID, CLS)
 * @param value - Measured value
 * @returns True if value exceeds threshold
 */
export function exceedsThreshold(metricName: string, value: number): boolean {
    const thresholds = PERFORMANCE_CONFIG.webVitals;

    switch (metricName.toLowerCase()) {
        case "lcp":
            return value > thresholds.lcp * 1000; // Convert to ms
        case "fid":
            return value > thresholds.fid;
        case "cls":
            return value > thresholds.cls;
        default:
            return false;
    }
}
