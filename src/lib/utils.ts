/**
 * Utility Functions
 * 
 * This module provides helper functions for company logos and industry context.
 * Used throughout the application for displaying company information.
 * 
 * @module lib/utils
 */

import { EXTERNAL_SERVICES } from "@/config/app.config";

/**
 * Domain mapping for company logo resolution
 * Maps company names to their primary domains for logo fetching
 */
const COMPANY_DOMAINS: Record<string, string> = {
  pertamina: "pertamedika.co.id",
  ihc: "pertamedika.co.id",
  pertamedika: "pertamedika.co.id",
  orderonline: "orderonline.id",
  orami: "orami.co.id",
  sirclo: "orami.co.id",
  huawei: "huawei.com",
  nexwave: "huawei.com",
  bejana: "bejana.id",
  globalindo: "bejana.id",
} as const;

/** 
 * Industry classification for companies
 * Maps company identifiers to their industry context
 */
const INDUSTRY_MAP: Record<string, string> = {
  pertamina: "Healthcare Technology",
  ihc: "Healthcare Technology",
  pertamedika: "Healthcare Technology",
  orderonline: "Logistics & Warehousing",
  orami: "E-commerce Platform",
  sirclo: "E-commerce Platform",
  huawei: "Telecommunications",
  nexwave: "Telecommunications",
  bejana: "Data & Analytics",
  globalindo: "Data & Analytics",
} as const;

/**
 * Get the primary domain for a company
 * 
 * @param company - Company name to look up
 * @returns Primary domain string
 * 
 * @internal
 */
function getCompanyDomain(company: string): string {
  const normalized = company.toLowerCase();

  for (const [key, domain] of Object.entries(COMPANY_DOMAINS)) {
    if (normalized.includes(key)) {
      return domain;
    }
  }

  return "google.com"; // Fallback domain
}

/**
 * Get logo URL for a company using Clearbit API
 * 
 * This function uses the Clearbit Logo API to fetch company logos.
 * It maps company names to their primary domains for accurate logo resolution.
 * 
 * @param company - Company name
 * @returns Full URL to the company logo from Clearbit
 * 
 * @throws {Error} If company parameter is empty
 * 
 * @example
 * ```ts
 * const logoUrl = getLogoUrl("PT. Pertamina Bina Medika IHC");
 * // Returns: "https://logo.clearbit.com/pertamedika.co.id"
 * ```
 */
export function getLogoUrl(company: string): string {
  if (!company || typeof company !== "string") {
    throw new Error("Company name is required and must be a string");
  }

  const domain = getCompanyDomain(company);
  return `${EXTERNAL_SERVICES.clearbitLogoApi}/${domain}`;
}

/**
 * Get fallback logo URL using Google's favicon service
 * 
 * This function provides an alternative logo source using Google's
 * favicon service. Useful when Clearbit API fails or for better reliability.
 * 
 * @param company - Company name
 * @returns Full URL to the company logo from Google's favicon service
 * 
 * @throws {Error} If company parameter is empty
 * 
 * @example
 * ```ts
 * const fallbackUrl = getLogoFallback("OrderOnline.id");
 * // Returns: "https://www.google.com/s2/favicons?domain=orderonline.id&sz=128"
 * ```
 */
export function getLogoFallback(company: string): string {
  if (!company || typeof company !== "string") {
    throw new Error("Company name is required and must be a string");
  }

  const domain = getCompanyDomain(company);
  return `${EXTERNAL_SERVICES.googleFaviconApi}?domain=${domain}&sz=128`;
}

/**
 * Get industry context for a company
 * 
 * Returns a human-readable industry classification based on company name.
 * Useful for categorizing work experience and providing context.
 * 
 * @param company - Company name
 * @returns Industry classification string
 * 
 * @throws {Error} If company parameter is empty
 * 
 * @example
 * ```ts
 * const industry = getIndustryContext("Orami by SIRCLO");
 * // Returns: "E-commerce Platform"
 * ```
 */
export function getIndustryContext(company: string): string {
  if (!company || typeof company !== "string") {
    throw new Error("Company name is required and must be a string");
  }

  const normalized = company.toLowerCase();

  for (const [key, industry] of Object.entries(INDUSTRY_MAP)) {
    if (normalized.includes(key)) {
      return industry;
    }
  }

  return "Technology"; // Default industry
}

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
 * ```
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  if (dateString.toLowerCase() === "present") {
    return "Present";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if parsing fails
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date);
  } catch {
    return dateString; // Return original on error
  }
}

/**
 * Truncate a string to a specified length
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to append when truncated (default: "...")
 * @returns Truncated string
 * 
 * @example
 * ```ts
 * truncate("This is a long text", 10) // Returns: "This is a..."
 * ```
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
 * 
 * @example
 * ```ts
 * const debouncedSearch = debounce((query) => search(query), 300);
 * ```
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
 * 
 * @example
 * ```ts
 * const throttledScroll = throttle(handleScroll, 100);
 * ```
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

