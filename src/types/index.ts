/**
 * Centralized Type Definitions
 * 
 * This file contains all TypeScript interfaces and types used throughout the application.
 * Centralizing types improves maintainability and reduces duplication.
 * 
 * @module types
 */

/**
 * Supported link types for projects and external resources
 */
export type LinkType =
  | "github"
  | "demo"
  | "docs"
  | "npm"
  | "storybook"
  | "article"
  | "design"
  | "video"
  | "case-study";

/**
 * External link with type and optional label
 */
export interface Link {
  /** Type of link (github, demo, docs, etc.) */
  type: LinkType;
  /** Full URL to the resource */
  url: string;
  /** Optional custom label to display instead of type */
  label?: string;
}

/**
 * Time period with start and optional end date
 */
export interface Period {
  /** Start date in ISO-8601 format or human-readable string (e.g., "2023-01" or "Jan 2023") */
  start: string;
  /** End date in same format as start, or "Present" for ongoing */
  end?: string;
}

/**
 * Project information for portfolio showcase
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Short, compelling tagline (optional) */
  tagline?: string;
  /** Detailed description of the project */
  description: string;
  /** Technology tags (e.g., React, TypeScript, etc.) */
  tags: string[];
  /** External links to demos, repos, case studies, etc. */
  links?: Link[];
  /** Time period when project was active */
  period?: Period;
  /** Optional image path relative to public directory */
  image?: string;
  /** Key highlights or achievements (bullet points) */
  highlights?: string[];
}

/**
 * Complete portfolio data structure
 */
export interface PortfolioData {
  /** List of all projects in the portfolio */
  projects: Project[];
}

/**
 * Work experience role with title and period
 */
export interface ExperienceRole {
  /** Job title */
  title: string;
  /** Employment period in human-readable format */
  period: string;
}

/**
 * Company work experience information
 */
export interface Experience {
  /** Company name */
  company: string;
  /** Location (city, country) */
  location: string;
  /** List of roles held at this company */
  roles: ExperienceRole[];
  /** Short highlight of main responsibility */
  highlight: string;
  /** Detailed achievement summary */
  achievement: string;
}

/**
 * About section tab names
 */
export type AboutTab = "Background" | "Interests" | "Tech";

/**
 * Technology group categories
 */
export type TechGroup = "Build" | "Ship" | "Lead";

/**
 * Position coordinates for UI elements
 */
export interface Position {
  /** Top position as percentage string */
  top: string;
  /** Left position as percentage string */
  left: string;
}

/**
 * Animation style configuration
 */
export interface AnimationStyle {
  /** CSS animation name(s) */
  animationName: string;
  /** CSS animation duration(s) */
  animationDuration: string;
  /** CSS animation delay(s) */
  animationDelay: string;
}

/**
 * Animation configuration object
 */
export interface AnimationConfig {
  /** Inline style object for CSS animations */
  style: AnimationStyle;
}

/**
 * Star field positions organized by size
 */
export interface StarFieldPositions {
  /** Small star positions */
  small: Position[];
  /** Medium star positions */
  medium: Position[];
  /** Large star positions */
  large: Position[];
}

/**
 * Component size variants
 */
export type ComponentSize = "small" | "medium" | "large";

/**
 * Theme variants
 */
export type Theme = "masculine" | "light" | "dark";

/**
 * Error severity levels
 */
export type ErrorSeverity = "low" | "medium" | "high" | "critical";

/**
 * Application error object
 */
export interface AppError extends Error {
  /** Error severity level */
  severity?: ErrorSeverity;
  /** Error code for categorization */
  code?: string;
  /** Additional context data */
  context?: Record<string, unknown>;
}
