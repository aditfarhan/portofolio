/**
 * Portfolio Data
 *
 * Central source of truth for all project, profile, and contact data.
 */

import type { PortfolioData, ProfileStat, ContactLink } from "@/types";

/** Single source of truth for displayed job title across ProfileCard, OG meta, and schema. */
export const PROFILE_ROLE = "Senior Software Engineer";

/** Industries subtitle — avoids brittle PROFILE_STATS[2].detail index access. */
export const PROFILE_INDUSTRIES = "Healthcare · Logistics · E-commerce · Telecom";

/** Positioning tagline shown under name on both profile layouts. */
export const PROFILE_TAGLINE = "Enterprise Healthcare · HIS/EMR · Infrastructure";

/**
 * Employment timeline — single source of truth for the company line in ProfileCard.
 * Order: most-recent first. `end: null` means current.
 */
export const EMPLOYMENT = [
  { company: "Pertamina IHC", period: "2023–now", end: null },
  { company: "Orami", period: "2021–2023", end: "2023-05" },
] as const;

/**
 * Shared stats used by both ProfileCard and AboutMe.
 * `detail` on the last stat renders as the industries subtitle in AboutMe.
 */
export const PROFILE_STATS: ProfileStat[] = [
  { value: 5, suffix: "+", label: "years" },
  { value: 12, suffix: "+", label: "hospitals" },
  { value: 4, suffix: "", label: "industries", detail: PROFILE_INDUSTRIES },
];

/**
 * Contact / social links — single source of truth used by ProfileCard and ProjectCard.
 */
export const CONTACT_LINKS: ContactLink[] = [
  {
    href: "mailto:aditiafarhan25@gmail.com?subject=Software%20Engineer%20Opportunity",
    icon: "icon-mail",
    label: "Email Me",
    tooltip: "Email",
  },
  {
    href: "/Muhammad-Aditia-Farhan-Resume.pdf",
    icon: "icon-download",
    label: "Download 2026 Resume",
    tooltip: "Resume 2026",
    download: true,
  },
  {
    href: "https://github.com/aditfarhan",
    icon: "icon-github",
    label: "GitHub",
    tooltip: "GitHub",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/muhammad-aditia-farhan",
    icon: "icon-linkedin",
    label: "LinkedIn",
    tooltip: "LinkedIn",
    external: true,
  },
];

const CONFIDENTIALITY_NOTE =
  "Due to healthcare data privacy and confidentiality requirements, production screenshots and source code are not publicly available. This case study focuses on architecture, responsibilities, technical decisions, and business impact.";

export const portfolio: PortfolioData = {
  projects: [
    // ─── PERTAMINA / IHC ───────────────────────────────────────────────
    {
      id: "his-emr-platform",
      featured: true,
      company: "PT. Pertamina Bina Medika IHC",
      title: "National HIS & EMR Platform",
      description:
        "Hospital groups needed standardized clinical workflows across multiple facilities with different infrastructure readiness and operational requirements — from inpatient admission and clinical documentation through to discharge summaries and follow-up care.",
      myRole:
        "Lead Frontend Engineer driving core HIS/EMR module development, continuous enhancement, frontend architecture, design system standardization, and deployment reliability across multiple hospital sites.",
      scale:
        "12+ hospitals nationally · Thousands of daily clinical transactions · 10+ clinical workflow modules · Hybrid cloud and on-premise deployments",
      systemScope:
        "Frontend (React/TypeScript) · Backend (Laravel/PostgreSQL) · CI/CD (Jenkins/Docker/Kubernetes) · Feature flags (Unleash) · Design system (Storybook) · Secrets management (HashiCorp Vault) · Document storage (MinIO)",
      complexity:
        "Multi-hospital standardization across facilities with varying infrastructure readiness; hybrid cloud and on-premise deployment strategies; clinical workflow accuracy requirements for patient safety; progressive rollout risk across active hospital environments.",
      impact: "12+ hospitals · Thousands of daily clinical transactions",
      period: { start: "2023-12", end: null },
      tags: [
        "React",
        "TypeScript",
        "Laravel",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "MinIO",
        "HashiCorp Vault",
        "Unleash",
        "Storybook",
        "Jenkins",
        "CI/CD",
      ],
      decision:
        "Adopted a modular architecture with feature flags (Unleash) to enable safe, progressive rollouts across hospitals with varying infrastructure readiness and deployment strategies — supporting both hybrid cloud and on-premise environments.",
      outcome:
        "Platform deployed across 12+ hospitals nationally, handling thousands of daily clinical transactions. Integrated SATUSEHAT national health data exchange, established UI component consistency via Storybook, and improved release reliability through Jenkins CI/CD pipelines.",
      highlights: [
        "Lead engineer for nationwide HIS/EMR system deployed across 12+ hospitals",
        "Built inpatient clinical workflows: assessment, diagnostic orders, results, treatment records, nursing notes, progress notes, discharge summaries, and follow-up care",
        "Standardized EMR implementation across hospital facilities with shared component library",
        "Supported hybrid cloud and on-premise deployment strategies",
        "Established Storybook component library shared across all hospital modules",
        "Implemented Unleash feature flags for controlled, risk-mitigated rollouts",
        "Integrated MinIO for medical document archiving and HashiCorp Vault for secrets management",
        "Set up Jenkins CI/CD pipeline with Docker and Kubernetes on bare-metal infrastructure",
        "Collaborated with clinical, product, and operational stakeholders across hospital sites",
      ],
      note: CONFIDENTIALITY_NOTE,
    },
    {
      id: "satusehat-integration",
      company: "PT. Pertamina Bina Medika IHC",
      title: "SATUSEHAT Integration Interface",
      description:
        "Hospitals needed reliable, compliant data exchange with Indonesia's national SATUSEHAT health platform (Ministry of Health), spanning multiple facilities with heterogeneous systems — including legacy Sybase hospital databases.",
      myRole:
        "Full-stack Engineer building the integration service, FHIR data transformation pipelines, legacy database connectors, validation mechanisms, and deployment infrastructure.",
      scale:
        "Multiple IHC hospital facilities · National SATUSEHAT health registry · Cross-system data synchronization",
      systemScope:
        "Frontend integration UI (React/TypeScript) · Backend integration service (Laravel) · HL7 FHIR transformation layer · PostgreSQL + legacy Sybase databases · Docker/Kubernetes deployment",
      complexity:
        "Mapping heterogeneous internal hospital data models to HL7 FHIR format; integrating with legacy Sybase databases alongside modern PostgreSQL systems; ensuring reliable synchronization with the national registry under Ministry of Health compliance requirements.",
      impact: "National health registry · FHIR-based data integration · Multi-hospital data sync",
      period: { start: "2024-03", end: null },
      tags: [
        "React",
        "TypeScript",
        "Laravel",
        "HL7 FHIR",
        "REST API",
        "PostgreSQL",
        "Sybase",
        "Docker",
        "Kubernetes",
      ],
      decision:
        "Built a dedicated integration service using HL7 FHIR-based payload requirements to map internal hospital data models to Indonesia's national health data schema, with transformation pipelines and retry mechanisms to ensure data reliability across heterogeneous source systems.",
      outcome:
        "Enabled compliant health data exchange between IHC hospitals and the national SATUSEHAT registry, meeting Ministry of Health regulatory requirements. Implemented audit mechanisms and data validation to ensure synchronization reliability across facilities.",
      highlights: [
        "Built data transformation pipelines mapping hospital records to FHIR-based payload format",
        "Integrated with legacy Sybase hospital databases alongside modern PostgreSQL systems",
        "Implemented retry, audit, and validation mechanisms for reliable data synchronization",
        "Coordinated with Ministry of Health technical team on compliance and data contract requirements",
        "Deployed integration services on Docker and Kubernetes for scalability and reliability",
      ],
      note: CONFIDENTIALITY_NOTE,
    },
    {
      id: "hcis",
      company: "PT. Pertamina Bina Medika IHC",
      title: "HCIS — Human Capital Information System",
      description:
        "Fragmented, spreadsheet-based HR processes across a regulated healthcare organization created data governance risks, audit gaps, and reporting inefficiencies. A centralized HR platform was needed to manage employee master data, payroll integration, attendance, and workforce analytics.",
      myRole:
        "Full-stack Engineer building the employee data management platform, payroll integration modules, role-based access control system, and analytics dashboards.",
      scale:
        "Company-wide deployment · All hospital units · Complete employee master data lifecycle · Full audit trails",
      systemScope:
        "Frontend (React/TypeScript) · Backend (Laravel/PostgreSQL) · Role-based access control · Payroll integration · Workforce analytics",
      complexity:
        "Regulated healthcare workforce data with strict governance requirements; replacing fragmented spreadsheet workflows without data loss; role-based access design for sensitive HR information across organizational hierarchy.",
      impact: "Company-wide HR system · Full audit trails · Master data governance",
      period: { start: "2024-01", end: null },
      tags: ["React", "TypeScript", "Laravel", "PostgreSQL", "REST API"],
      decision:
        "Replaced a legacy spreadsheet-based HR process with a centralized system, prioritizing data integrity, auditability, and role-based access for regulated healthcare workforce management.",
      outcome:
        "Reduced HR reporting time and established a single source of truth for employee records across all hospital units, with role-based access control enforcing data governance requirements.",
      highlights: [
        "Built employee master data management with organizational hierarchy support",
        "Implemented payroll integration module with full audit trails",
        "Designed role-based access control for sensitive HR data",
        "Built analytics dashboard for workforce planning and reporting",
      ],
    },
    {
      id: "ihc-office",
      company: "PT. Pertamina Bina Medika IHC",
      title: "IHC Office — Enterprise Secretariat System",
      description:
        "Enterprise correspondence workflows were paper-based and untracked, creating compliance risks and processing delays across a multi-department healthcare organization. Multi-level approval chains for official documents had no digital audit trail.",
      myRole:
        "Full-stack Engineer designing and building the digital correspondence platform, multi-level approval engine, document versioning system, and real-time notification integration.",
      scale:
        "Enterprise-wide adoption · Multiple organizational departments · Multi-level approval chains",
      systemScope:
        "Frontend (React/TypeScript) · Backend (Laravel/PostgreSQL) · Multi-level approval routing engine · Document versioning · Real-time notifications",
      complexity:
        "Complex enterprise approval routing across organizational hierarchy with configurable chains; document versioning and audit trail requirements for compliance; replacing established paper-based workflows without disrupting operations.",
      impact: "Paperless workflows · Multi-level digital approvals · Audit trail",
      period: { start: "2023-12", end: null },
      tags: ["React", "TypeScript", "Laravel", "PostgreSQL"],
      decision:
        "Digitized paper-based correspondence workflows into a trackable, auditable system with multi-level approval chains to meet enterprise compliance and administrative governance requirements.",
      outcome:
        "Eliminated paper-based correspondence processes, reduced document processing time, and established complete audit trails across all organizational communication workflows.",
      highlights: [
        "Implemented multi-level digital approval workflows with configurable routing",
        "Built document versioning and audit trail system for compliance",
        "Integrated real-time e-notifications for approval status updates",
        "Managed organizational correspondence across enterprise departments",
      ],
    },

    // ─── ORDER ONLINE / OLOGI ──────────────────────────────────────────
    {
      id: "oexpress-logistics",
      company: "OrderOnline.id",
      title: "OEXpress Logistics Platform",
      description:
        "End-to-end logistics management platform for OrderOnline.id and Ologi, handling order dispatch, real-time driver tracking, route optimization, and delivery confirmation at scale.",
      impact: "Real-time tracking · Sub-second status updates",
      period: { start: "2023-06", end: "2023-11" },
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "REST API",
      ],
      decision:
        "Adopted a real-time pub/sub architecture for driver tracking to handle concurrent delivery updates without polling overhead, ensuring accurate status freshness at scale.",
      outcome:
        "Achieved sub-second delivery status updates across the platform. Handled on-call production incidents and led major dependency upgrades to reduce security debt.",
      highlights: [
        "Built real-time driver tracking with pub/sub architecture",
        "Participated in on-call rotation for production incident response",
        "Led major framework and dependency upgrades across the codebase",
        "Improved delivery ETA accuracy through route optimization integration",
      ],
    },

    // ─── ORAMI / SIRCLO ───────────────────────────────────────────────
    {
      id: "ibusibuk-ecommerce",
      company: "Orami by SIRCLO",
      title: "IbuSibuk E-commerce Ecosystem",
      description:
        "Multi-tenant e-commerce platform under Orami by SIRCLO, serving mothers and families with product discovery, loyalty programs, content commerce, and checkout flows.",
      impact: "Multi-tenant · Loyalty & checkout optimization",
      period: { start: "2021-10", end: "2023-05" },
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "GraphQL",
        "Node.js",
        "PostgreSQL",
        "Jest",
      ],
      decision:
        "Adopted a micro-frontend approach to allow independent team deployments across product verticals while sharing a core design system.",
      outcome:
        "Scaled platform to serve a growing user base. Introduced unit testing culture with Jest and led refactoring initiatives that improved code maintainability significantly.",
      highlights: [
        "Introduced unit testing with Jest across critical business flows",
        "Led refactoring of legacy components to TypeScript with zero regressions",
        "Built loyalty and points-based rewards integration",
        "Improved checkout conversion through UX optimization",
      ],
      links: [
        { type: "demo", url: "https://www.orami.co.id", label: "Live platform" },
      ],
    },

    // ─── NEXWAVE / HUAWEI ─────────────────────────────────────────────
    {
      id: "pmt-cmt-telecom",
      company: "PT Nexwave (Huawei)",
      title: "PMT–CMT Telecom Dashboard",
      description:
        "Network performance monitoring and configuration management dashboard for PT Nexwave (Huawei project), enabling telecom engineers to track KPIs, manage cell configurations, and respond to anomalies.",
      impact: "Real-time KPI monitoring · Huawei network ops",
      period: { start: "2021-03", end: "2021-09" },
      tags: ["React", "TypeScript", "REST API", "D3.js", "Ant Design"],
      decision:
        "Used client-side D3.js visualizations for real-time KPI charts to avoid server round-trips on time-sensitive network monitoring data.",
      outcome:
        "Delivered dashboard adopted by Huawei network operations teams, providing real-time visibility into cell performance across monitored regions.",
      highlights: [
        "Built real-time network KPI visualizations with D3.js",
        "Designed configuration management workflows for cell network parameters",
        "Optimized data polling to reduce API load while maintaining freshness",
      ],
    },

    // ─── BEJANA ───────────────────────────────────────────────────────
    {
      id: "sales-prediction",
      company: "PT Bejana Investidata Globalindo",
      title: "Sales Prediction Platform",
      description:
        "Internal business intelligence platform using ML-backed forecasting to help commercial teams predict regional sales performance.",
      impact: "ML-powered forecasting · Regional sales planning",
      period: { start: "2020-06", end: "2021-02" },
      tags: ["React", "Python", "Flask", "PostgreSQL", "Chart.js"],
      decision:
        "Exposed ML model outputs via a REST API to decouple the data science pipeline from the frontend, allowing independent iteration on both layers.",
      outcome:
        "Enabled commercial teams to shift from intuition-based to data-driven regional sales planning with weekly forecast accuracy tracking.",
      highlights: [
        "Integrated Python/Flask ML prediction service with React frontend",
        "Built regional performance heatmap and trend visualizations",
        "Implemented forecast accuracy tracking dashboard",
      ],
    },

    // ─── PERSONAL / FREELANCE ─────────────────────────────────────────
    {
      id: "our-invitation",
      company: "Personal Project",
      title: "OurInvitation.id",
      description:
        "SaaS digital wedding invitation platform with customizable templates, RSVP management, guest messaging, and real-time attendance tracking.",
      impact: "100s of active invitations · Real-time RSVP",
      period: { start: "2021-01", end: "2021-06" },
      tags: ["React", "Next.js", "Laravel", "MySQL", "Tailwind CSS"],
      decision:
        "Built as a statically-generated platform with dynamic RSVP overlays to optimize SEO for each unique invitation URL while keeping hosting costs minimal.",
      outcome:
        "Launched publicly and handled hundreds of active wedding invitations with real-time RSVP tracking and guest messaging.",
      highlights: [
        "SSG-first architecture for SEO and performance",
        "Real-time RSVP and guest attendance management",
        "Multi-template customization engine",
      ],
    },
    {
      id: "pinter-isp",
      company: "Freelance",
      title: "Prime Internet (PINTER) ISP System",
      description:
        "End-to-end ISP management system for a regional internet provider, covering subscriber management, bandwidth allocation, billing cycles, and field technician dispatch.",
      impact: "Full ISP ops · Automated billing cycles",
      period: { start: "2020-01", end: "2020-05" },
      tags: ["React", "Laravel", "MySQL", "REST API"],
      decision:
        "Built a monolithic system intentionally to reduce operational complexity for a small team ISP, with clear module boundaries for future extraction.",
      outcome:
        "Replaced spreadsheet-based subscriber management with a full ISP operations system, improving billing accuracy and service tracking.",
      highlights: [
        "Subscriber lifecycle management from onboarding to churn",
        "Automated billing cycle and payment tracking",
        "Field technician dispatch and service order management",
      ],
    },
  ],
};
