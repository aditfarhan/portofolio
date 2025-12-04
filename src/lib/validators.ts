/**
 * Validation Utilities
 * 
 * This module provides validation functions for data integrity.
 * Only essential validators used in the application are included.
 * 
 * @module lib/validators
 */

import type { Project, Link, Period } from "@/types";

/**
 * Validates if a string is a valid URL
 * 
 * @param url - The URL string to validate
 * @returns True if valid URL, false otherwise
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validates if a period object has valid dates
 * 
 * @param period - The period object to validate
 * @returns True if valid period, false otherwise
 */
export function isValidPeriod(period: Period | undefined): boolean {
    if (!period) return true; // Optional field

    if (!period.start || typeof period.start !== "string") {
        return false;
    }

    if (period.end && typeof period.end !== "string") {
        return false;
    }

    return true;
}

/**
 * Validates if a link object has required properties
 * 
 * @param link - The link object to validate
 * @returns True if valid link, false otherwise
 */
export function isValidLink(link: Link): boolean {
    if (!link.type || !link.url) {
        return false;
    }

    if (!isValidUrl(link.url)) {
        return false;
    }

    const validTypes = [
        "github",
        "demo",
        "docs",
        "npm",
        "storybook",
        "article",
        "design",
        "video",
        "case-study",
    ];

    return validTypes.includes(link.type);
}

/**
 * Validates if a project object has all required properties
 * 
 * @param project - The project object to validate
 * @returns True if valid project, false otherwise
 */
export function isValidProject(project: Project): boolean {
    // Required fields
    if (!project.id || !project.title || !project.description) {
        return false;
    }

    // Tags must be an array
    if (!Array.isArray(project.tags)) {
        return false;
    }

    // Validate links if present
    if (project.links) {
        if (!Array.isArray(project.links)) {
            return false;
        }

        for (const link of project.links) {
            if (!isValidLink(link)) {
                return false;
            }
        }
    }

    // Validate period if present
    if (!isValidPeriod(project.period)) {
        return false;
    }

    // Validate highlights if present
    if (project.highlights && !Array.isArray(project.highlights)) {
        return false;
    }

    return true;
}
