/**
 * Centralized Type Definitions
 *
 * Only types actively used by current components are kept here.
 * Previously removed orphaned types for unused features:
 *   ExperienceRole, Experience, AboutTab, TechGroup, Theme,
 *   ComponentSize, ErrorSeverity, AppError.
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
  type: LinkType;
  url: string;
  label?: string;
}

/**
 * Time period with start and optional end date
 */
export interface Period {
  start: string;
  end?: string | null;
}

/**
 * Project information for portfolio showcase
 */
export interface Project {
  id: string;
  title: string;
  company?: string;
  tagline?: string;
  description: string;
  impact?: string;
  tags: string[];
  links?: Link[];
  period?: Period;
  image?: string;
  decision?: string;
  outcome?: string;
  highlights?: string[];
}

/**
 * Complete portfolio data structure
 */
export interface PortfolioData {
  projects: Project[];
}

/**
 * Position coordinates for UI elements (used by BackgroundEffects)
 */
export interface Position {
  insetBlockStart: string;
  insetInlineStart: string;
}

/**
 * Animation style configuration (used by BackgroundEffects)
 */
export interface AnimationStyle {
  animationName: string;
  animationDuration: string;
  animationDelay: string;
}

/**
 * Animation configuration object (used by BackgroundEffects)
 */
export interface AnimationConfig {
  style: AnimationStyle;
}

/**
 * Star field positions organized by size (used by BackgroundEffects)
 */
export interface StarFieldPositions {
  small: Position[];
  medium: Position[];
  large: Position[];
}
