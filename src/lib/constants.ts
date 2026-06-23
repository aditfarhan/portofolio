/**
 * Application Constants
 *
 * Centralized constants for the application.
 * Background animation data (stars, meteors) and utility exports.
 *
 * Note: EXPERIENCE, ABOUT_TABS, TECH_GROUPS were removed — the UI features
 * they served (experience accordion, about tabs, tech group nav) were
 * removed in a previous refactor. Only actively used constants remain.
 *
 * @module lib/constants
 */

import type { StarFieldPositions, AnimationConfig } from "@/types";

/**
 * Star field positions for background effects
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
      animationName: "meteorRealisticFireball, meteorHeatColor",
      animationDuration: "28s, 4.2s",
      animationDelay: "8s, 2.5s",
    },
  },
  {
    style: {
      animationName: "meteorMicrometeor, meteorHeatColor",
      animationDuration: "32s, 4.8s",
      animationDelay: "18s, 5s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticPhysics, meteorHeatColor",
      animationDuration: "26s, 3.8s",
      animationDelay: "30s, 7s",
    },
  },
] as const;

/**
 * Meteor burst animation configurations
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
