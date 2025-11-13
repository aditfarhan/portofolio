/**
 * Utility functions for the application
 */

/**
 * Get logo URL for a company using Clearbit API
 */
export function getLogoUrl(company: string): string {
  const name = company.toLowerCase();

  if (
    name.includes("pertamina") ||
    name.includes("ihc") ||
    name.includes("pertamedika")
  ) {
    return "https://logo.clearbit.com/pertamedika.co.id";
  }

  if (name.includes("orderonline")) {
    return "https://logo.clearbit.com/orderonline.id";
  }

  if (name.includes("orami") || name.includes("sirclo")) {
    return "https://logo.clearbit.com/orami.co.id";
  }

  if (name.includes("huawei") || name.includes("nexwave")) {
    return "https://logo.clearbit.com/huawei.com";
  }

  if (name.includes("bejana") || name.includes("globalindo")) {
    return "https://logo.clearbit.com/bejana.id";
  }

  return "https://logo.clearbit.com/google.com";
}

/**
 * Get fallback logo URL using Google's favicon service
 */
export function getLogoFallback(company: string): string {
  const name = company.toLowerCase();
  let domain = "google.com";

  if (
    name.includes("pertamina") ||
    name.includes("ihc") ||
    name.includes("pertamedika")
  ) {
    domain = "pertamedika.co.id";
  } else if (name.includes("orderonline")) {
    domain = "orderonline.id";
  } else if (name.includes("orami") || name.includes("sirclo")) {
    domain = "orami.co.id";
  } else if (name.includes("huawei") || name.includes("nexwave")) {
    domain = "huawei.com";
  } else if (name.includes("bejana") || name.includes("globalindo")) {
    domain = "bejana.id";
  }

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

/**
 * Get industry context for a company
 */
export function getIndustryContext(company: string): string {
  const name = company.toLowerCase();

  if (
    name.includes("pertamina") ||
    name.includes("ihc") ||
    name.includes("pertamedika")
  ) {
    return "Healthcare Technology";
  }

  if (name.includes("orderonline")) {
    return "E-commerce & Digital Solutions";
  }

  if (name.includes("orami") || name.includes("sirclo")) {
    return "E-commerce Platform";
  }

  if (name.includes("huawei") || name.includes("nexwave")) {
    return "Telecommunications";
  }

  if (name.includes("bejana") || name.includes("globalindo")) {
    return "Data & Analytics";
  }

  return "Technology";
}

/**
 * Create responsive style object for meteors
 */
export function createMeteorStyle(
  animationName: string,
  animationDuration: string,
  animationDelay: string
): React.CSSProperties {
  return {
    animationName,
    animationDuration,
    animationDelay,
  };
}

/**
 * Create responsive style object for meteor bursts
 */
export function createMeteorBurstStyle(
  animationName: string,
  animationDuration: string,
  animationDelay: string
): React.CSSProperties {
  return {
    animationName,
    animationDuration,
    animationDelay,
  };
}

/**
 * Helper for circular array navigation
 */
export function navigateCircular(
  currentIndex: number,
  delta: number,
  arrayLength: number
): number {
  return (currentIndex + delta + arrayLength) % arrayLength;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate random number between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is visible in viewport
 */
export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
