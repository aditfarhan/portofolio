/**
 * Portfolio Data
 *
 * Central source of truth for all project data.
 * Updated with CV data — 10 projects total.
 */

import type { PortfolioData, ProfileStat, Testimonial, HowIWorkItem } from "@/types";

/**
 * Shared stats used by both ProfileCard and AboutMe
 */
export const PROFILE_STATS: ProfileStat[] = [
  { value: 5, suffix: "+", label: "years" },
  { value: 12, suffix: "+", label: "hospitals" },
  { value: 3, suffix: "", label: "industries", detail: "Healthcare · Logistics · E-commerce" },
];

/**
 * Testimonials / endorsements
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Farhan consistently delivers clean, scalable solutions under tight deadlines. His work on the EMR rollout was critical to our nationwide deployment.",
    name: "Technical Lead",
    role: "Engineering Manager",
    company: "PT. Pertamina Bina Medika IHC",
  },
  {
    quote: "One of the most thorough frontend engineers I've worked with. He introduced testing culture and significantly improved our codebase quality.",
    name: "Senior Engineer",
    role: "Tech Lead",
    company: "Orami by SIRCLO",
  },
];

/**
 * How I Work — methodology bullets
 */
export const HOW_I_WORK: HowIWorkItem[] = [
  { title: "Iterative delivery", desc: "Ship in small, reviewable increments — weekly demos, not quarterly surprises." },
  { title: "Async-first communication", desc: "PRs, RFCs, and docs over meetings. Context stays searchable." },
  { title: "Cross-functional pairing", desc: "Work directly with designers, QA, and product — not in silos." },
];

export const portfolio: PortfolioData = {
  projects: [
    // ─── PERTAMINA / IHC ───────────────────────────────────────────────
    {
      id: "his-emr-platform",
      company: "PT. Pertamina Bina Medika IHC",
      title: "National HIS & EMR Platform",
      description:
        "Hospital Information System and Electronic Medical Record deployed across 12+ hospitals under PT. Pertamina Bina Medika IHC, handling thousands of clinical transactions daily.",
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
        "CI/CD",
      ],
      decision:
        "Adopted a modular monorepo architecture with feature flags (Unleash) to allow safe progressive rollouts across hospitals with varying readiness levels.",
      outcome:
        "Deployed to 12+ hospitals nationally. System handles thousands of daily clinical transactions. Integrated SATUSEHAT (national health data exchange) and supports EMR interoperability standards.",
      highlights: [
        "Lead engineer behind nationwide HIS/EMR system across 12+ hospitals",
        "Integrated SATUSEHAT national health data exchange protocol",
        "Built Storybook component library shared across all hospital modules",
        "Implemented HashiCorp Vault for secrets management and MinIO for medical file storage",
        "Set up full CI/CD pipeline with GitLab runners on bare-metal Kubernetes",
      ],
    },
    {
      id: "satusehat-integration",
      company: "PT. Pertamina Bina Medika IHC",
      title: "SATUSEHAT Integration",
      description:
        "National healthcare interoperability layer connecting hospital systems to Indonesia's SATUSEHAT platform (Ministry of Health), enabling standardized health data exchange across institutions.",
      impact: "National health registry · HL7 FHIR compliant",
      period: { start: "2024-03", end: null },
      tags: [
        "React",
        "TypeScript",
        "Laravel",
        "HL7 FHIR",
        "REST API",
        "PostgreSQL",
      ],
      decision:
        "Built a dedicated integration service using HL7 FHIR standards to map internal hospital data models to Indonesia's national health data schema.",
      outcome:
        "Enabled compliant health data exchange between IHC hospitals and the national registry, meeting Ministry of Health regulatory requirements.",
      highlights: [
        "Implemented HL7 FHIR-compliant data mapping for national health records",
        "Coordinated with Ministry of Health technical team on compliance requirements",
        "Designed retry and audit mechanisms for critical healthcare data transmission",
      ],
    },
    {
      id: "hcis",
      company: "PT. Pertamina Bina Medika IHC",
      title: "HCIS — Human Capital Information System",
      description:
        "Internal HR platform for PT. Pertamina Bina Medika IHC managing employee data, payroll integration, attendance, and workforce analytics across the organization.",
      impact: "Company-wide HR system · Full audit trails",
      period: { start: "2024-01", end: null },
      tags: ["React", "TypeScript", "Laravel", "PostgreSQL", "REST API"],
      decision:
        "Replaced a legacy spreadsheet-based HR process with a centralized system, prioritizing data integrity and auditability for regulated healthcare workforce management.",
      outcome:
        "Reduced HR reporting time significantly and established a single source of truth for employee records across all hospital units.",
      highlights: [
        "Built payroll integration module with audit trails",
        "Designed role-based access control for sensitive employee data",
        "Implemented analytics dashboard for workforce planning",
      ],
    },
    {
      id: "ihc-office",
      company: "PT. Pertamina Bina Medika IHC",
      title: "IHC Office Secretariat System",
      description:
        "Digital office management platform for PT. Pertamina Bina Medika IHC handling correspondence, document workflows, approvals, and organizational communication.",
      impact: "Paperless workflows · Multi-level digital approvals",
      period: { start: "2023-12", end: null },
      tags: ["React", "TypeScript", "Laravel", "PostgreSQL"],
      decision:
        "Digitized paper-based correspondence workflows into a trackable, auditable system with multi-level approval chains for enterprise compliance.",
      outcome:
        "Eliminated paper-based correspondence processes and reduced document processing time with full audit trail support.",
      highlights: [
        "Implemented multi-level digital approval workflows",
        "Built document versioning and audit trail system",
        "Integrated e-notification for real-time status updates",
      ],
    },

    // ─── ORDER ONLINE / OLOGI ──────────────────────────────────────────
    {
      id: "oexpress-logistics",
      company: "OrderOnline.id",
      title: "OEXpress Logistics Platform",
      description:
        "End-to-end logistics management platform built for OrderOnline.id and Ologi, handling order dispatch, driver tracking, route optimization, and delivery confirmation.",
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
        "Adopted real-time pub/sub architecture for driver tracking to handle concurrent delivery updates without polling overhead.",
      outcome:
        "Achieved sub-second delivery status updates across the platform. Handled on-call production incidents and drove major dependency upgrades to reduce security debt.",
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
        "Adopted micro-frontend approach to allow independent team deployments across product verticals while sharing a core design system.",
      outcome:
        "Scaled platform to serve a growing user base. Introduced unit testing culture and led refactoring initiatives that improved code maintainability significantly.",
      highlights: [
        "Introduced unit testing with Jest across critical business flows",
        "Led refactoring of legacy components to TypeScript with zero regressions",
        "Built loyalty and points-based rewards integration",
        "Improved checkout conversion through UX optimization",
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
        "Internal business intelligence platform at PT Bejana Investidata Globalindo using ML-backed forecasting to help commercial teams predict regional sales performance.",
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
