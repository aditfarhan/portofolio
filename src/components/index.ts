/**
 * Components Barrel Export
 * 
 * Centralized export point for all components.
 * This simplifies imports throughout the application.
 * 
 * @module components
 * 
 * @example
 * ```ts
 * // Instead of:
 * // import HomeDeck from '@/components/HomeDeck';
 * // import ProfileCard from '@/components/ProfileCard';
 * 
 * // Use:
 * import { HomeDeck, ProfileCard } from '@/components';
 * ```
 */

export { default as AboutMe } from "./AboutMe";
export { default as BackgroundEffects } from "./BackgroundEffects";
export { default as HomeDeck } from "./HomeDeck";
export { default as ProfileCard } from "./ProfileCard";
export { default as ProjectCard } from "./ProjectCard";
export { default as ThemeProvider } from "./ThemeProvider";
export { default as ErrorBoundary } from "./ErrorBoundary";
