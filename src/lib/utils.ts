/**
 * Utility Functions
 *
 * @module lib/utils
 */

/**
 * Format a date string to a short human-readable form.
 *
 * @example
 * formatDate("2023-01") // "Jan 2023"
 * formatDate("")        // "Present"
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
      timeZone: "UTC",
    }).format(date);
  } catch {
    return dateString;
  }
}
