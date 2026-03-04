/**
 * Application Constants
 * 
 * Centralized constants for the entire application.
 * Includes experience data, UI configurations, and animation settings.
 * 
 * @module lib/constants
 */

import type {
  Experience,
  AboutTab,
  TechGroup,
  StarFieldPositions,
  AnimationConfig,
} from "@/types";

/**
 * Company work experience data
 * 
 * Chronological list of professional experience, sorted by most recent first.
 * Each entry includes company information, roles, and achievements.
 */
export const EXPERIENCE: readonly Experience[] = [
  {
    company: "PT. Pertamina Bina Medika IHC",
    location: "Jakarta, Indonesia",
    roles: [
      { title: "Frontend Engineer", period: "Dec 2023 – Mar 2024" },
      { title: "Software Engineer", period: "Apr 2024 – Present" },
    ],
    highlight:
      "Leading digital transformation across Indonesia's hospital network",
    achievement:
      "Delivered scalable EMR/HIS platforms for 12+ hospitals, architected hybrid deployments, optimized CI/CD pipelines, and drove major technical initiatives like feature flags, design systems, secure storage, and secrets management.",
  },
  {
    company: "OrderOnline.id",
    location: "Bandung, Indonesia",
    roles: [{ title: "Frontend Engineer", period: "Jan 2023 – Nov 2023" }],
    highlight: "Accelerating logistics and warehousing automation for SMEs",
    achievement:
      "Built logistics tracking apps (OEXpress, Ologi), introduced feature flags, Storybook, standardized API contracts, improved reliability through on-call, and elevated engineering quality through reviews and documentation.",
  },
  {
    company: "Orami by SIRCLO",
    location: "Tangerang, Indonesia",
    roles: [{ title: "Frontend Engineer", period: "Oct 2021 – Dec 2022" }],
    highlight: "Enhancing large-scale retail and reseller ecosystems",
    achievement:
      "Developed core modules for reseller, brand, and influencer apps, created scalable component foundations, improved performance, and strengthened frontend quality via tests, refactoring, and cross-team collaboration.",
  },
  {
    company: "PT Nexwave - Huawei",
    location: "Jakarta, Indonesia",
    roles: [{ title: "Frontend Engineer", period: "Oct 2020 – Oct 2021" }],
    highlight: "Empowering telco decision-making with real-time analytics",
    achievement:
      "Built a telecommunications analytics dashboard used by leadership, delivering reliable features, resolving issues, and supporting high-availability operations.",
  },
  {
    company: "PT Bejana Investidata Globalindo",
    location: "Bandung, Indonesia",
    roles: [
      { title: "Frontend Engineer Intern", period: "Jul 2019 – Nov 2019" },
    ],
    highlight: "Early foundation in dashboard and user-centric app development",
    achievement:
      "Created an internet usage dashboard with tracking and account features, contributing to new development, bug fixes, and UX improvements.",
  },
] as const;

/**
 * Available tab names for the About section
 * 
 * These tabs organize different aspects of the about information:
 * - Background: Professional experience and education
 * - Interests: Personal interests and hobbies
 * - Tech: Technical skills and expertise
 */
export const ABOUT_TABS: readonly AboutTab[] = [
  "Background",
  "Interests",
  "Tech",
] as const;

/**
 * Technology group categories
 * 
 * Organizes technical skills into three categories:
 * - Build: Core development technologies and frameworks
 * - Ship: Deployment, DevOps, and infrastructure tools
 * - Lead: Leadership, design, and project management skills
 */
export const TECH_GROUPS: readonly TechGroup[] = [
  "Build",
  "Ship",
  "Lead",
] as const;

/**
 * Star field positions for background effects
 * 
 * Defines the positioning of decorative stars in the background.
 * Stars are organized by size for visual depth and variety.
 * Positions are specified as percentages of viewport dimensions.
 */
export const STAR_POSITIONS: StarFieldPositions = {
  small: [
    { insetBlockStart: "5%", insetInlineStart: "25%" },
    { insetBlockStart: "12%", insetInlineStart: "75%" },
    { insetBlockStart: "8%", insetInlineStart: "45%" },
    { insetBlockStart: "15%", insetInlineStart: "85%" },
    { insetBlockStart: "18%", insetInlineStart: "10%" },
    { insetBlockStart: "75%", insetInlineStart: "15%" },
    { insetBlockStart: "82%", insetInlineStart: "35%" },
    { insetBlockStart: "85%", insetInlineStart: "55%" },
  ],
  medium: [
    { insetBlockStart: "35%", insetInlineStart: "20%" },
    { insetBlockStart: "40%", insetInlineStart: "80%" },
    { insetBlockStart: "45%", insetInlineStart: "35%" },
    { insetBlockStart: "30%", insetInlineStart: "60%" },
    { insetBlockStart: "50%", insetInlineStart: "5%" },
    { insetBlockStart: "78%", insetInlineStart: "85%" },
  ],
  large: [
    { insetBlockStart: "25%", insetInlineStart: "65%" },
    { insetBlockStart: "55%", insetInlineStart: "25%" },
    { insetBlockStart: "42%", insetInlineStart: "90%" },
    { insetBlockStart: "60%", insetInlineStart: "70%" },
  ],
} as const;

/**
 * Meteor animation configurations
 * 
 * Defines animation parameters for individual meteors in the background.
 * Each config includes animation names, durations, and delays for variety.
 * Creates a realistic meteor shower effect when combined.
 */
export const METEOR_CONFIGS: readonly AnimationConfig[] = [
  {
    style: {
      animationName: "meteorRealisticPhysics, meteorHeatColor",
      animationDuration: "25s, 4s",
      animationDelay: "0s, 0s",
    },
  },
  {
    style: {
      animationName: "meteorMicrometeor, meteorHeatColor",
      animationDuration: "30s, 4.5s",
      animationDelay: "12s, 3.5s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticFireball, meteorHeatColor",
      animationDuration: "35s, 5s",
      animationDelay: "25s, 6s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticPhysicsAlt, meteorHeatColor",
      animationDuration: "28s, 4.2s",
      animationDelay: "8s, 2.5s",
    },
  },
  {
    style: {
      animationName: "meteorMicrometeorAlt, meteorHeatColor",
      animationDuration: "32s, 4.8s",
      animationDelay: "18s, 5s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticPhysicsAlt2, meteorHeatColor",
      animationDuration: "26s, 3.8s",
      animationDelay: "30s, 7s",
    },
  },
] as const;

/**
 * Meteor burst animation configurations
 * 
 * Defines animation parameters for meteor shower bursts.
 * Bursts create periodic clusters of meteors for visual interest.
 * Positioned strategically to avoid overlapping with primary UI elements.
 */
export const METEOR_BURST_CONFIGS: readonly AnimationConfig[] = [
  {
    style: {
      animationName: "meteorShowerBurst",
      animationDuration: "18s",
      animationDelay: "10s",
    },
  },
  {
    style: {
      animationName: "meteorShowerBurst",
      animationDuration: "22s",
      animationDelay: "28s",
    },
  },
  {
    style: {
      animationName: "meteorShowerBurst",
      animationDuration: "20s",
      animationDelay: "45s",
    },
  },
] as const;

/**
 * Get total number of experiences
 * 
 * @returns Total count of work experiences
 */
export function getExperienceCount(): number {
  return EXPERIENCE.length;
}

/**
 * Get experience by index
 * 
 * @param index - Zero-based index of the experience
 * @returns Experience object or undefined if index is invalid
 */
export function getExperienceByIndex(index: number): Experience | undefined {
  if (index < 0 || index >= EXPERIENCE.length) {
    return undefined;
  }
  return EXPERIENCE[index];
}

/**
 * Check if an about tab is valid
 * 
 * @param tab - Tab name to validate
 * @returns True if tab is valid
 */
export function isValidAboutTab(tab: string): tab is AboutTab {
  return ABOUT_TABS.includes(tab as AboutTab);
}

/**
 * Check if a tech group is valid
 * 
 * @param group - Group name to validate
 * @returns True if group is valid
 */
export function isValidTechGroup(group: string): group is TechGroup {
  return TECH_GROUPS.includes(group as TechGroup);
}

