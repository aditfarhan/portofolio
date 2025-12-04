/**
 * Custom Hooks Barrel Export
 * 
 * Centralized export point for all custom hooks.
 * This simplifies imports throughout the application.
 * 
 * @module hooks
 * 
 * @example
 * ```ts
 * // Instead of:
 * // import { useFlipAnimation } from '@/hooks/useFlipAnimation';
 * // import { useExperienceNavigation } from '@/hooks/useExperienceNavigation';
 * 
 * // Use:
 * import { useFlipAnimation, useExperienceNavigation } from '@/hooks';
 * ```
 */

export { useFlipAnimation } from "./useFlipAnimation";
export { useExperienceNavigation } from "./useExperienceNavigation";
export { useAboutTabNavigation } from "./useAboutTabNavigation";
export { useTechGroupNavigation } from "./useTechGroupNavigation";
