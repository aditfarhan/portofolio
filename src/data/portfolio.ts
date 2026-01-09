/**
 * Portfolio Data Module
 * 
 * Canonical, typed portfolio dataset for static rendering.
 * This is a pure TypeScript module imported by Server Components.
 * 
 * @module data/portfolio
 */

import type { PortfolioData, Project } from "@/types";
import { isValidProject } from "@/lib/validators";
import { DEV_CONFIG } from "@/config/app.config";

/**
 * All portfolio projects with detailed information
 * 
 * Each project includes:
 * - Unique identifier
 * - Title and tagline
 * - Detailed description
 * - Technology tags
 * - External links (demos, repos, case studies)
 * - Time period
 * - Key highlights
 */
const projects: Project[] = [
  {
    id: "proj-00",
    title: "National HIS & EMR Platform",
    tagline: "Scalable, mission-critical healthcare technology",
    description:
      "A comprehensive HIS and EMR platform transforming patient care across corporate and regional hospitals. This system handles complex clinical workflows and processes millions of transactions daily to ensure seamless medical operations.",
    decision: "Architected a multi-tenant frontend framework to standardize clinical workflows across 12+ hospital ecosystems.",
    outcome: "Processed millions of daily transactions with consistent medical accuracy and streamlined regional hospital operations.",
    tags: [
      "React.js",
      "Next.js",
      "Laravel",
      "Docker",
      "Kubernetes",
      "Feature Flags",
    ],
    period: { start: "2023-12", end: "Present" },
    highlights: [
      "Designed mission-critical inpatient workflows utilized by medical teams for daily operations",
      "Architected frontend solutions scaling across 12+ diverse hospital ecosystems",
      "Optimized system resilience through automated CI/CD and hybrid deployment strategies",
    ],
  },
  {
    id: "proj-01",
    title: "OEXpress Logistics Platform",
    tagline: "Streamlining deliveries with real-time insights",
    description:
      "A logistics management platform enabling SMEs and enterprises to track deliveries and monitor performance. Engineered for high reliability and frictionless logistics operations from pickup to final delivery.",
    decision: "Implemented feature-flagged technical upgrades and structured API frameworks to modernize legacy logistics workflows.",
    outcome: "Achieved frictionless tracking from pickup to delivery for SMEs while maintaining high system availability.",
    tags: ["Vue.js", "Tailwind", "SCSS", "Vuex"],
    period: { start: "2023-01", end: "2023-11" },
    highlights: [
      "Developed high-availability logistics workflows supporting daily business operations",
      "Implemented technical upgrades using feature flags and structured API frameworks",
      "Maintained system uptime via horizontal scaling and proactive infrastructure maintenance",
    ],
  },
  {
    id: "proj-02",
    title: "IbuSibuk Ecosystem",
    tagline: "Empowering resellers, brands, and influencers",
    description:
      "A multi-platform e-commerce ecosystem at Orami by SIRCLO. Focused on frontend scalability and maintainability to handle massive traffic and high-concurrency interactions.",
    decision: "Built a standardized UI component library to unify the multi-platform e-commerce ecosystem at SIRCLO.",
    outcome: "Accelerated cross-team development and improved platform stability during high-concurrency traffic events.",
    tags: ["Next.js", "TypeScript", "Tailwind", "SCSS", "Redux"],
    period: { start: "2021-10", end: "2022-12" },
    highlights: [
      "Built standardized UI component libraries to accelerate cross-team development",
      "Enhanced platform stability through strategic refactoring and performance monitoring",
      "Established engineering standards for design consistency across the product ecosystem",
    ],
  },
  {
    id: "proj-03",
    title: "PMT–CMT Telecom Dashboard",
    tagline: "Network performance intelligence for leadership",
    description:
      "A real-time dashboard for Huawei leadership. Uses data visualization and interactive UI to transform complex telecom metrics into actionable insights for operational decision-making.",
    decision: "Engineered high-performance data-driven dashboards using FusionCharts for real-time network monitoring.",
    outcome: "Transformed complex telecom metrics into actionable leadership insights for operational decision-making at Huawei.",
    tags: ["React.js", "Redux", "Material UI", "FusionCharts"],
    period: { start: "2020-10", end: "2021-10" },
    highlights: [
      "Engineered data-driven dashboards for real-time network performance monitoring",
      "Streamlined complex analytics workflows into intuitive interaction models",
      "Focused on system reliability and data accuracy in high-pressure production environments",
    ],
  },
  {
    id: "proj-04",
    title: "Prime Internet (PINTER)",
    tagline: "Putting account control in customers' hands",
    description:
      "A customer portal for real-time usage tracking and account management. Focused on simplifying telecommunications workflows through intuitive UI and real-time data integration.",
    decision: "Developed an integrated usage analytics portal to centralize customer account management and workflows.",
    outcome: "Simplified recurring customer lifecycle operations and improved data transparency for end-user account control.",
    tags: ["React.js", "Bootstrap", "Chart.js", "Redux"],
    period: { start: "2019-07", end: "2019-11" },
    highlights: [
      "Developed data visualizations for usage analytics and account management",
      "Optimized user journeys to simplify recurring customer lifecycle operations",
      "Coordinated with backend teams to integrate complex telecommunications APIs",
    ],
  },
  {
    id: "proj-05",
    title: "Sales Prediction Platform",
    tagline: "Data-driven coffee forecasting for better inventory",
    description:
      "A sales platform for 372 Kopi that transforms transactional data into business insights. Enables demand forecasting and inventory optimization through predictive modeling.",
    decision: "Integrated predictive modeling with business intelligence dashboards to automate demand forecasting.",
    outcome: "Enabled data-driven procurement decisions for 372 Kopi, reducing manual inventory overhead.",
    tags: ["Django", "Chart.js", "MySQL", "Bootstrap"],
    period: { start: "2020-03", end: "2020-09" },
    highlights: [
      "Developed business intelligence dashboards to identify seasonal sales patterns",
      "Integrated forecasting models with data visualizations for stakeholder reporting",
      "Built a focused management interface for daily inventory and procurement planning",
    ],
  },
  {
    id: "proj-06",
    title: "OurInvitation.id",
    tagline: "Customizable digital event platforms",
    description:
      "A platform for event microsites featuring dynamic themes and optimized RSVP flows. Focused on high-performance customization and seamless user engagement for diverse event scales.",
    decision: "Architected a dynamic template engine to support rapid theme deployment and real-time UI customization.",
    outcome: "Optimized RSVP processing and theme scaling for diverse event sizes, ensuring high performance under peak engagement.",
    tags: ["React.js", "Tailwind", "Material UI", "Styled Components"],
    period: { start: "2021-06", end: "2021-12" },
    highlights: [
      "Engineered a dynamic template engine for rapid theme deployment and scaling",
      "Developed performant UI components supporting real-time theme customization",
      "Optimized automated RSVP processing and guest notification systems",
    ],
  },
];

/**
 * Validate all projects in development mode
 * This helps catch data issues early during development
 */
if (DEV_CONFIG.enableDebugLogging) {
  projects.forEach((project, index) => {
    if (!isValidProject(project)) {
      console.error(`Invalid project at index ${index}:`, project);
    }
  });
}

/**
 * Main portfolio data export
 * Contains all projects and can be extended with other portfolio sections
 */
export const portfolio: PortfolioData = {
  projects,
};

/**
 * Helper function to get a project by ID
 * 
 * @param id - The project ID to search for
 * @returns The project if found, undefined otherwise
 * 
 * @example
 * ```ts
 * const project = getProjectById("proj-00");
 * ```
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

/**
 * Helper function to get projects by tag
 * 
 * @param tag - The tag to filter by
 * @returns Array of projects with the specified tag
 * 
 * @example
 * ```ts
 * const reactProjects = getProjectsByTag("React.js");
 * ```
 */
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((project) => project.tags.includes(tag));
}

/**
 * Helper function to get projects sorted by start date (most recent first)
 * 
 * @returns Array of projects sorted by start date descending
 * 
 * @example
 * ```ts
 * const recentProjects = getProjectsByDate();
 * ```
 */
export function getProjectsByDate(): Project[] {
  return [...projects].sort((a, b) => {
    const aDate = a.period?.start ? new Date(a.period.start).getTime() : 0;
    const bDate = b.period?.start ? new Date(b.period.start).getTime() : 0;
    return bDate - aDate;
  });
}

