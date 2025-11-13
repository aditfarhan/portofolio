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
    highlight: "Healthcare digital transformation",
    achievement: "Building modern healthcare platforms serving millions",
  },
  {
    company: "OrderOnline.id",
    location: "Bandung, Indonesia",
    roles: [{ title: "Frontend Engineer", period: "Jan 2023 – Nov 2023" }],
    highlight: "E-commerce innovation",
    achievement: "Delivered seamless shopping experiences at scale",
  },
  {
    company: "Orami by SIRCLO",
    location: "Tangerang, Indonesia",
    roles: [{ title: "Frontend Engineer", period: "Oct 2021 – Dec 2022" }],
    highlight: "Enterprise e-commerce",
    achievement: "Optimized performance for high-traffic retail platforms",
  },
  {
    company: "PT Nexwave - Huawei",
    location: "Jakarta, Indonesia",
    roles: [{ title: "Frontend Engineer", period: "Oct 2020 – Oct 2021" }],
    highlight: "Telecommunications tech",
    achievement: "Contributed to next-gen telecom solutions",
  },
  {
    company: "PT Bejana Investidata Globalindo",
    location: "Bandung, Indonesia",
    roles: [
      { title: "Frontend Engineer Intern", period: "Jul 2019 – Nov 2019" },
    ],
    highlight: "Data-driven applications",
    achievement: "Gained foundational experience in data visualization",
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
      animationDuration: "18s, 3.5s",
      animationDelay: "0s, 0s",
    },
  },
  {
    style: {
      animationName: "meteorMicrometeor, meteorHeatColor",
      animationDuration: "22s, 4s",
      animationDelay: "10s, 3s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticFireball, meteorHeatColor",
      animationDuration: "28s, 4s",
      animationDelay: "20s, 5s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticPhysics, meteorHeatColor",
      animationDuration: "15s, 3s",
      animationDelay: "5s, 2s",
    },
  },
  {
    style: {
      animationName: "meteorMicrometeor, meteorHeatColor",
      animationDuration: "25s, 3.5s",
      animationDelay: "15s, 4s",
    },
  },
  {
    style: {
      animationName: "meteorRealisticFireball, meteorHeatColor",
      animationDuration: "20s, 3s",
      animationDelay: "25s, 6s",
    },
  },
] as const;

// Meteor Burst Configurations
export const METEOR_BURST_CONFIGS = [
  {
    style: {
      animationName: "meteorShowerBurst",
      animationDuration: "12s",
      animationDelay: "8s",
    },
  },
  {
    style: {
      animationName: "meteorShowerBurst",
      animationDuration: "16s",
      animationDelay: "25s",
    },
  },
  {
    style: {
      animationName: "meteorShowerBurst",
      animationDuration: "14s",
      animationDelay: "40s",
    },
  },
] as const;
