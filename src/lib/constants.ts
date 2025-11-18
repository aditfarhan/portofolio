/**
 * Centralized constants for the application
 */

// Company Experience Constants
export const EXPERIENCE = [
  {
    company: "PT. Pertamina Bina Medika IHC",
    location: "Jakarta, Indonesia",
    roles: [
      { title: "Frontend Engineer", period: "Dec 2023 – Mar 2024" },
      { title: "Software Engineer", period: "Apr 2024 – Present" },
    ],
    highlight:
      "Leading digital transformation across Indonesia’s hospital network",
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

// About Tabs
export const ABOUT_TABS = ["Background", "Interests", "Tech"] as const;
export type AboutTab = (typeof ABOUT_TABS)[number];

// Tech Groups
export const TECH_GROUPS = ["Build", "Ship", "Lead"] as const;
export type TechGroup = (typeof TECH_GROUPS)[number];

// Star Field Positions
export const STAR_POSITIONS = {
  small: [
    { top: "5%", left: "25%" },
    { top: "12%", left: "75%" },
    { top: "8%", left: "45%" },
    { top: "15%", left: "85%" },
    { top: "18%", left: "10%" },
    { top: "75%", left: "15%" },
    { top: "82%", left: "35%" },
    { top: "85%", left: "55%" },
  ],
  medium: [
    { top: "35%", left: "20%" },
    { top: "40%", left: "80%" },
    { top: "45%", left: "35%" },
    { top: "30%", left: "60%" },
    { top: "50%", left: "5%" },
    { top: "78%", left: "85%" },
  ],
  large: [
    { top: "25%", left: "65%" },
    { top: "55%", left: "25%" },
    { top: "42%", left: "90%" },
    { top: "60%", left: "70%" },
  ],
} as const;

// Meteor Animation Configurations
export const METEOR_CONFIGS = [
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

// Meteor Burst Configurations
export const METEOR_BURST_CONFIGS = [
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
