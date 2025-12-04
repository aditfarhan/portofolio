/**
 * Validation Utilities
 * 
 * This module provides validation functions for data integrity
 * and input validation throughout the application.
 * 
 * @module lib/validators
 */

import type { Project, Link, Period, Experience } from "@/types";

/**
 * Validates if a string is a valid URL
 * 
 * @param url - The URL string to validate
 * @returns True if valid URL, false otherwise
 * 
 * @example
 * ```ts
 * isValidUrl("https://example.com") // true
 * isValidUrl("not a url") // false
 * ```
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
 * Validates if a string is a valid email address
 * 
 * @param email - The email string to validate
 * @returns True if valid email, false otherwise
 * 
 * @example
 * ```ts
 * isValidEmail("user@example.com") // true
 * isValidEmail("invalid-email") // false
 * ```
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates if a period object has valid dates
 * 
 * @param period - The period object to validate
 * @returns True if valid period, false otherwise
 * 
 * @example
 * ```ts
 * isValidPeriod({ start: "2023-01", end: "2024-01" }) // true
 * isValidPeriod({ start: "", end: "2024-01" }) // false
 * ```
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
 * 
 * @example
 * ```ts
 * isValidLink({ type: "github", url: "https://github.com/user/repo" }) // true
 * isValidLink({ type: "github" }) // false - missing url
 * ```
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
 * 
 * @example
 * ```ts
 * isValidProject({
 *   id: "proj-1",
 *   title: "My Project",
 *   description: "A great project",
 *   tags: ["React", "TypeScript"]
 * }) // true
 * ```
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

/**
 * Validates if an experience object has all required properties
 * 
 * @param experience - The experience object to validate
 * @returns True if valid experience, false otherwise
 */
export function isValidExperience(experience: Experience): boolean {
    if (!experience.company || !experience.location) {
        return false;
    }

    if (!Array.isArray(experience.roles) || experience.roles.length === 0) {
        return false;
    }

    for (const role of experience.roles) {
        if (!role.title || !role.period) {
            return false;
        }
    }

    if (!experience.highlight || !experience.achievement) {
        return false;
    }

    return true;
}

/**
 * Validates if a number is within a specified range
 * 
 * @param value - The number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if within range, false otherwise
 * 
 * @example
 * ```ts
 * isInRange(5, 0, 10) // true
 * isInRange(15, 0, 10) // false
 * ```
 */
export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

/**
 * Sanitizes a string by removing potentially dangerous characters
 * 
 * @param input - The string to sanitize
 * @returns Sanitized string
 * 
 * @example
 * ```ts
 * sanitizeString("<script>alert('xss')</script>") // "scriptalert('xss')/script"
 * ```
 */
export function sanitizeString(input: string): string {
    return input.replace(/[<>]/g, "");
}

/**
 * Validates if an array is not empty
 * 
 * @param array - The array to check
 * @returns True if array has at least one element
 * 
 * @example
 * ```ts
 * isNonEmptyArray([1, 2, 3]) // true
 * isNonEmptyArray([]) // false
 * ```
 */
export function isNonEmptyArray<T>(array: T[]): array is [T, ...T[]] {
    return Array.isArray(array) && array.length > 0;
}
