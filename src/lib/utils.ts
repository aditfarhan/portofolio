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
    return "Logistics & Warehousing";
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
