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
        "Powering healthcare workflows with scalable, life-saving technology",
      description:
        "Dive into the heart of Indonesia's healthcare revolution—a comprehensive HIS and EMR platform that transforms patient care across corporate and regional hospitals. This powerhouse handles complex clinical workflows, processes millions of transactions daily, and seamlessly bridges cloud and on-premise worlds, ensuring doctors and nurses focus on what matters most: saving lives.",
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
        "Crafted intuitive inpatient flows that medical teams rely on every single day",
        "Architected frontend solutions scaling effortlessly across 12+ diverse hospital ecosystems",
        "Boosted system resilience with cutting-edge CI/CD, hybrid deployments, and lightning-fast performance optimizations",
      ],
    },

    {
      id: "proj-01",
      title: "OEXpress Logistics Platform",
      tagline:
        "Streamlining deliveries with real-time insights and rock-solid reliability",
      description:
        "Step into the fast-paced world of logistics where every package matters. OEXpress empowers SMEs and enterprises with a sleek platform to master deliveries, monitor performance in real-time, and navigate operations with crystal-clear visibility. Engineered for unwavering reliability and a frictionless user journey from pickup to doorstep.",
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
        "Built mission-critical logistics workflows that keep businesses moving every day",
        "Pioneered engineering upgrades with smart feature flags and robust API frameworks",
        "Fortified system uptime through dedicated on-call support and forward-thinking maintenance",
      ],
    },

    {
      id: "proj-02",
      title: "IbuSibuk Ecosystem",
      tagline:
        "Empowering e-commerce dreams for resellers, brands, and influencers",
      description:
        "Welcome to the vibrant universe of IbuSibuk—an exquisite multi-platform e-commerce ecosystem at Orami by SIRCLO that brings resellers, brands, and influencers together in perfect harmony. Designed with elegance at its core, it delivers breathtaking user experiences, rock-solid frontend scalability, and enduring maintainability that handles massive traffic with grace.",
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
        "Designed elegant, reusable UI components that empowered multiple teams to shine",
        "Elevated platform stability with strategic optimizations and smart refactoring",
        "Set the gold standard for engineering and design consistency across the entire ecosystem",
      ],
    },

    {
      id: "proj-03",
      title: "PMT–CMT Telecom Dashboard",
      tagline: "Illuminating telecom operations with real-time intelligence",
      description:
        "Enter the command center of telecom excellence—a dynamic dashboard for Huawei's leadership that unveils network performance in stunning real-time. Through sophisticated data visualizations and fluid UI interactions, it transforms complex metrics into crystal-clear insights, empowering decisions that keep the digital world connected.",
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
        "Engineered compelling dashboards brimming with intuitive, data-driven visualizations",
        "Crafted fluid interaction flows that make complex analytics feel effortless",
        "Ensured rock-solid performance and reliability in demanding production settings",
      ],
    },

    {
      id: "proj-04",
      title: "Prime Internet (PINTER)",
      tagline:
        "Putting internet control in customers' hands with elegant simplicity",
      description:
        "Experience the future of internet management with PINTER—a customer-centric dashboard that puts control at your fingertips. Track usage in real-time, tweak packages effortlessly, and monitor account activity with breathtaking clarity. Built with simplicity as the guiding star, it makes complex internet management feel like second nature.",
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
        "Created captivating analytics and usage visualizations that speak volumes",
        "Streamlined user journeys for an experience that's as smooth as silk",
        "Collaborated seamlessly with backend wizards to deliver feature magic",
      ],
    },

    {
      id: "proj-05",
      title: "Sales Prediction Platform",
      tagline: "Brewing smarter decisions with data-driven coffee forecasting",
      description:
        "Sip into the art of prediction with this innovative platform for 372 Kopi that transforms raw transactional data into golden insights. Watch as a thriving coffee business gains the power to foresee demand, optimize inventory, and serve customers with perfect timing—all through stunning visual analysis that makes complex data dance.",
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
        "Built expressive dashboards that unveil hidden sales patterns with elegance",
        "Wove forecasting algorithms with visuals that tell stories at a glance",
        "Crafted a clean, intuitive interface perfect for daily business brilliance",
      ],
    },

    {
      id: "proj-06",
      title: "OurInvitation.id",
      tagline:
        "Crafting unforgettable digital invitations with timeless elegance",
      description:
        "Step into a world where celebrations come alive digitally—OurInvitation.id, a masterpiece of customizable event microsites that blend stunning themes, cutting-edge UI, and flawless guest experiences. Whether it's a wedding, birthday, or milestone, this platform turns ordinary invites into extraordinary memories with effortless customization and breathtaking design.",
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
        "Engineered dynamic templates that radiate modern sophistication and charm",
        "Built flexible, themeable components where beauty meets blazing performance",
        "Perfected RSVP flows and guest interactions for pure, joyful engagement",
      ],
    },
  ],
};
