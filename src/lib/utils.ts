/**
 * Utility Functions
 *
 * Helper functions used throughout the application.
 * Note: getLogoUrl, getLogoFallback, getIndustryContext were removed —
 * they used Clearbit's free API which was shut down in 2023, and were
 * not imported by any active component.
 *
 * @module lib/utils
 */

/**
 * Format a date string to a more readable format
 *
 * @param dateString - ISO date string or human-readable date
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate("2023-01") // Returns: "Jan 2023"
 * formatDate("Present") // Returns: "Present"
 * formatDate("")        // Returns: "Present"
 * ```
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "Present";

  if (dateString.toLowerCase() === "present") {
    return "Present";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Truncate a string to a specified length
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to append when truncated (default: "...")
 * @returns Truncated string
 */
export function truncate(
  text: string,
  maxLength: number,
  suffix = "..."
): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Debounce a function call
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle a function call
 *
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
