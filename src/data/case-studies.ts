/**
 * Case Study Data
 *
 * Extended data for featured case study detail pages.
 * Maps portfolio project IDs to URL slugs and provides
 * decision ledger entries, impact metrics, and related links.
 */

import { portfolio } from "./portfolio";
import type { Project } from "@/types";

export interface DecisionEntry {
  decision: string;
  why: string;
  tradeoff: string;
  outcome: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  context: string;
}

export interface CaseStudy {
  slug: string;
  project: Project;
  impactMetrics: CaseStudyMetric[];
  decisions: DecisionEntry[];
  relatedSlugs: string[];
}

const SLUG_MAP: Record<string, string> = {
  "his-emr-platform":      "national-his-emr",
  "satusehat-integration":  "satusehat-integration",
  "ihc-office":             "ihc-office",
};

export const CASE_STUDY_SLUGS = Object.values(SLUG_MAP);

function findProject(id: string): Project {
  const p = portfolio.projects.find((proj) => proj.id === id);
  if (!p) throw new Error(`Project not found: ${id}`);
  return p;
}

const CASE_STUDIES: CaseStudy[] = [
  // ─── NATIONAL HIS & EMR PLATFORM ─────────────────────────────────────
  {
    slug: "national-his-emr",
    project: findProject("his-emr-platform"),
    impactMetrics: [
      {
        value: "12+",
        label: "Hospitals",
        context: "Nationwide IHC deployment across active facilities",
      },
      {
        value: "1,000s+",
        label: "Daily Clinical Transactions",
        context: "Handled in active production environments",
      },
      {
        value: "10+",
        label: "Clinical Workflow Modules",
        context: "From admission through discharge and follow-up",
      },
    ],
    decisions: [
      {
        decision: "Shared Storybook component library across all hospital modules",
        why: "10+ hospital facilities needed consistent clinical UI. Per-facility bespoke frontend development would have been unsustainable at scale.",
        tradeoff: "Higher upfront component design investment and ongoing governance overhead.",
        outcome: "Single component library served every hospital module, reducing UI inconsistency without redundant implementation across facilities.",
      },
      {
        decision: "Unleash feature flags for incremental production rollout",
        why: "Active hospitals cannot tolerate big-bang release failures during clinical operations. Patient safety is the primary constraint.",
        tradeoff: "Additional deployment complexity, flag lifecycle management, and monitoring overhead.",
        outcome: "Controlled exposure per hospital facility reduced release risk. Failed rollouts could be contained without affecting other hospital sites.",
      },
      {
        decision: "Jenkins CI/CD on bare-metal Kubernetes supporting hybrid cloud and on-premise deployment",
        why: "Healthcare data regulation and existing IHC infrastructure required on-premise deployment capability alongside cloud options.",
        tradeoff: "Higher operational maintenance burden than cloud-managed alternatives.",
        outcome: "Reliable deployment pipeline supporting both cloud-native and on-premise hospital deployment models across different facility infrastructure.",
      },
    ],
    relatedSlugs: ["satusehat-integration", "ihc-office"],
  },

  // ─── SATUSEHAT INTEGRATION INTERFACE ─────────────────────────────────
  {
    slug: "satusehat-integration",
    project: findProject("satusehat-integration"),
    impactMetrics: [
      {
        value: "National",
        label: "Health Registry",
        context: "Ministry of Health SATUSEHAT platform compliance",
      },
      {
        value: "HL7 FHIR",
        label: "Data Standard",
        context: "International interoperability standard for health data exchange",
      },
      {
        value: "Multi-site",
        label: "Hospital Synchronization",
        context: "Across all IHC hospital facilities",
      },
    ],
    decisions: [
      {
        decision: "Dedicated integration service isolated from the HIS/EMR core application",
        why: "Ministry of Health FHIR payload requirements evolve independently from internal clinical workflow logic.",
        tradeoff: "Additional service boundary to design, deploy, and maintain independently from the main HIS/EMR application.",
        outcome: "Clean separation between internal hospital data models and national FHIR standard requirements. Regulatory changes can be absorbed without touching clinical workflow code.",
      },
      {
        decision: "Legacy Sybase database adapter alongside modern PostgreSQL connectors",
        why: "Some IHC hospital facilities operate legacy Sybase databases that cannot be immediately replaced without major operational disruption.",
        tradeoff: "Dual database maintenance burden and an extra validation layer to handle legacy data quality differences.",
        outcome: "Enabled compliant national health data exchange without requiring immediate full legacy system migration at each facility.",
      },
      {
        decision: "Retry, audit, and validation mechanisms gating every sync event",
        why: "National health registry data must be accurate and auditable. Ministry of Health compliance requires traceable operations and provable data integrity.",
        tradeoff: "Additional latency per sync event; slower aggregate throughput than a fire-and-forget approach.",
        outcome: "Reliable synchronization with full audit trail. Reduced manual correction overhead after failed or partial sync events.",
      },
    ],
    relatedSlugs: ["national-his-emr", "ihc-office"],
  },

  // ─── IHC OFFICE — ENTERPRISE SECRETARIAT ─────────────────────────────
  {
    slug: "ihc-office",
    project: findProject("ihc-office"),
    impactMetrics: [
      {
        value: "0",
        label: "Remaining Paper Processes",
        context: "Full digitization of enterprise correspondence workflows",
      },
      {
        value: "Multi-level",
        label: "Approval Engine",
        context: "Configurable routing across all organizational departments",
      },
      {
        value: "100%",
        label: "Audit Coverage",
        context: "Every document state change tracked for compliance",
      },
    ],
    decisions: [
      {
        decision: "Configurable approval routing chains rather than hardcoded organizational hierarchy",
        why: "Enterprise org hierarchies evolve as departments merge or restructure. Hardcoded chains require code deployments for every org change.",
        tradeoff: "More complex admin configuration interface and longer initial setup time for each department.",
        outcome: "Flexible approval routing survives organizational restructuring without code deployments or IT intervention.",
      },
      {
        decision: "Immutable document versioning with audit trail on every state transition",
        why: "Enterprise correspondence in a regulated healthcare organization requires full traceability for compliance, governance, and dispute resolution.",
        tradeoff: "Increased storage requirements and added query complexity for versioned document history.",
        outcome: "Complete compliance-ready audit trail on all official correspondence. Eliminated governance gaps that existed in the prior paper-based process.",
      },
    ],
    relatedSlugs: ["national-his-emr", "satusehat-integration"],
  },
];

const BY_SLUG = new Map(CASE_STUDIES.map((cs) => [cs.slug, cs]));

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return BY_SLUG.get(slug);
}

export function getProjectSlug(projectId: string): string | undefined {
  return SLUG_MAP[projectId];
}

export { CASE_STUDIES };
