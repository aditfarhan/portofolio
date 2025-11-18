// Canonical, Notion-free portfolio dataset and schema.
// This is a pure TypeScript module imported by Server Components for static rendering.

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
export interface Link {
  type: LinkType;
  url: string;
  label?: string;
}

export interface Period {
  start: string; // ISO-8601 or human string, e.g. "2023-01" or "Jan 2023"
  end?: string; // same format or "Present"
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  tags: string[];
  links?: Link[];
  period?: Period;
  image?: string; // public path e.g. /images/project.png
  highlights?: string[];
}

export interface PortfolioData {
  projects: Project[];
}

export const portfolio: PortfolioData = {
  projects: [
    {
      id: "proj-00",
      title: "National HIS & EMR Platform",
      tagline:
        "Clinical workflows, hospital operations, and scalable architecture",
      description:
        "A large-scale Hospital Information System (HIS) and Electronic Medical Record (EMR) platform serving corporate and regional hospitals across Indonesia. Designed to support complex clinical workflows, high-volume transactions, and hybrid deployments across cloud and on-prem environments.",
      tags: [
        "React.js",
        "Next.js",
        "Laravel",
        "TypeScript",
        "Docker",
        "Kubernetes",
        "REST API",
        "Feature Flags",
        "Storybook",
      ],
      period: { start: "2023-12", end: "Present" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/his",
          label: "System Overview",
        },
      ],
      highlights: [
        "Designed and implemented core inpatient clinical flows used daily by medical teams",
        "Led frontend architecture for scalable EMR modules across 12+ hospital environments",
        "Enhanced platform reliability through CI/CD optimization, hybrid deployments, and performance tuning",
      ],
    },

    {
      id: "proj-01",
      title: "OEXpress Logistics Platform",
      tagline: "Delivery, revenue tracking, and shipment monitoring",
      description:
        "A modern logistics platform enabling SMEs and enterprises to manage deliveries, track performance, and operate with clarity. Built with an emphasis on reliability, consistency, and a smooth end-to-end experience.",
      tags: ["Vue.js", "Tailwind", "SCSS", "Vuex", "REST API"],
      period: { start: "2023-01", end: "2023-11" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/oexpress",
          label: "Project Overview",
        },
      ],
      highlights: [
        "Delivered essential logistics workflows powering daily business operations",
        "Introduced engineering improvements including feature flags and API standards",
        "Strengthened reliability through on-call ownership and proactive maintenance",
      ],
    },

    {
      id: "proj-02",
      title: "IbuSibuk Ecosystem",
      tagline: "Reseller, brand, and influencer platforms",
      description:
        "A refined multi-platform e-commerce ecosystem built for resellers, brands, and influencers at Orami by SIRCLO. Focused on delivering elegant user experiences, scalable frontend foundations, and long-term maintainability across high-traffic applications.",
      tags: ["Next.js", "TypeScript", "Tailwind", "SCSS", "Redux", "REST API"],
      period: { start: "2021-10", end: "2022-12" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/ibusibuk",
          label: "Project Overview",
        },
      ],
      highlights: [
        "Crafted polished, reusable UI patterns supporting multiple product teams",
        "Enhanced platform stability through thoughtful optimization and refactoring",
        "Established consistent engineering and design standards across the ecosystem",
      ],
    },

    {
      id: "proj-03",
      title: "PMT–CMT Telecom Dashboard",
      tagline: "Operational analytics for telco leadership",
      description:
        "A real-time operational dashboard for Huawei, offering leadership clear visibility into telecom network performance through elegant data visualization and responsive UI components.",
      tags: ["React.js", "Redux", "Material UI", "FusionCharts", "REST API"],
      period: { start: "2020-10", end: "2021-10" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/telco-dashboard",
          label: "Project Overview",
        },
      ],
      highlights: [
        "Developed insightful dashboards with intuitive, data-rich visualizations",
        "Designed seamless interaction patterns for dense analytical views",
        "Maintained stable, reliable performance across production environments",
      ],
    },

    {
      id: "proj-04",
      title: "Prime Internet (PINTER)",
      tagline: "Customer dashboard for internet service management",
      description:
        "A customer-focused dashboard for tracking internet usage, managing packages, and monitoring account activity—designed with clarity, simplicity, and ease of use at its core.",
      tags: ["React.js", "Bootstrap", "Chart.js", "REST API", "Redux"],
      period: { start: "2019-07", end: "2019-11" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/pinter",
          label: "Project Overview",
        },
      ],
      highlights: [
        "Developed intuitive analytics and usage-monitoring visualizations",
        "Improved user flows to create a smooth and guided experience",
        "Delivered features in tight collaboration with backend teams",
      ],
    },

    {
      id: "proj-05",
      title: "Sales Prediction Platform",
      tagline: "Demand forecasting for 372 Kopi",
      description:
        "A forecasting platform turning transactional data into meaningful insights, helping a growing coffee business anticipate demand with elegant visual analysis.",
      tags: ["Django", "Chart.js", "MySQL", "Bootstrap"],
      period: { start: "2020-03", end: "2020-09" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/sales-forecast",
          label: "Project Overview",
        },
      ],
      highlights: [
        "Created clear, expressive dashboards to reveal sales patterns",
        "Implemented forecasting logic paired with intuitive visual outputs",
        "Designed a minimal, business-friendly interface for daily decision making",
      ],
    },

    {
      id: "proj-06",
      title: "OurInvitation.id",
      tagline: "Digital invitation and event microsites",
      description:
        "A beautifully crafted digital-invitation platform offering customizable event microsites with elegant themes, modern UI, and a seamless guest experience.",
      tags: [
        "React.js",
        "Tailwind",
        "Material UI",
        "Styled Components",
        "REST API",
      ],
      period: { start: "2021-06", end: "2021-12" },
      links: [
        {
          type: "case-study",
          url: "https://example.com/ourinvitation",
          label: "Live Preview",
        },
      ],
      highlights: [
        "Designed dynamic templates featuring refined, modern aesthetics",
        "Developed themeable components blending style and performance",
        "Optimized RSVP and guest-flow interactions for a delightful experience",
      ],
    },
  ],
};
