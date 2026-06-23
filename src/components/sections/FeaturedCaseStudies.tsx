"use client";

import { forwardRef, memo, useState, useCallback } from "react";
import type { Project } from "@/types";
import ProjectEntry from "@/components/ProjectEntry";
import { useScrollReveal } from "@/hooks";

interface FeaturedCaseStudiesProps {
  projects: Project[];
}

const INDUSTRY_MAP: Record<string, string> = {
  "PT. Pertamina Bina Medika IHC": "Healthcare",
  "OrderOnline.id": "Logistics",
  "Orami by SIRCLO": "E-commerce",
  "PT Nexwave (Huawei)": "Telecom",
};

// Short summaries for the compact card view
const CARD_SUMMARIES: Record<string, { context: string; role: string; impactChips: string[] }> = {
  "his-emr-platform": {
    context: "Nationwide HIS/EMR platform deployed across 12+ hospitals, covering inpatient, outpatient, and clinical documentation workflows.",
    role: "Lead Software Engineer",
    impactChips: ["12+ Hospitals", "Thousands of daily transactions", "10+ clinical modules"],
  },
  "satusehat-integration": {
    context: "Health data exchange platform connecting IHC hospitals to Indonesia's national SATUSEHAT registry using HL7 FHIR.",
    role: "Full-stack Engineer",
    impactChips: ["National health registry", "FHIR integration", "Multi-hospital data sync"],
  },
  "ihc-office": {
    context: "Enterprise secretariat platform replacing paper-based correspondence with multi-level digital approval workflows.",
    role: "Full-stack Engineer",
    impactChips: ["Paperless workflows", "Multi-level approvals", "Full audit trail"],
  },
};

interface CaseStudyCardProps {
  project: Project;
  index: number;
  visible: boolean;
}

const CaseStudyCard = memo(function CaseStudyCard({ project, index, visible }: CaseStudyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const industry = INDUSTRY_MAP[project.company ?? ""] ?? "Other";
  const summary = CARD_SUMMARIES[project.id];

  const toggleExpand = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  const impactChips = summary?.impactChips ?? (project.impact ? project.impact.split(" · ").map(s => s.trim()) : []);

  return (
    <article
      data-industry={industry}
      className={`
        case-study-card
        transition-all duration-slower
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
      aria-label={project.title}
    >
      {/* Company badge */}
      <div className="flex items-center justify-between gap-2">
        {project.company && (
          <span className="entry-company" style={{ borderLeftColor: "rgba(74, 222, 128, 0.5)" }}>
            {project.company}
          </span>
        )}
        {project.period && (
          <span className="text-2xs text-white/25 font-mono tabular-nums flex-shrink-0" style={{ letterSpacing: "var(--tracking-mono)" }}>
            {project.period.end === null ? `${project.period.start.slice(0, 4)}–now` : project.period.start.slice(0, 4)}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-white leading-snug" style={{ letterSpacing: "var(--tracking-tight)" }}>
        {project.title}
      </h3>

      {/* Context */}
      {summary && (
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
          {summary.context}
        </p>
      )}

      {/* Impact chips */}
      {impactChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Project impact">
          {impactChips.map((chip) => (
            <span key={chip} className="entry-impact-chip text-2xs">
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* Role */}
      {summary?.role && (
        <div className="flex items-center gap-1.5">
          <span className="text-2xs text-white/25" style={{ letterSpacing: "var(--tracking-caps)" }}>MY ROLE</span>
          <span className="text-xs text-white/60 font-medium">{summary.role}</span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" aria-hidden="true" />

      {/* Expand button */}
      <button
        onClick={toggleExpand}
        className="
          group flex items-center gap-1.5 text-xs text-white/38
          hover:text-white/70 transition-colors duration-fast
          focus-visible:outline-2 focus-visible:outline-white/38 focus-visible:rounded
          focus-visible:outline-offset-2
        "
        aria-expanded={expanded}
        aria-controls={`case-study-${project.id}`}
        aria-label={expanded ? `Collapse ${project.title} case study` : `Read ${project.title} full case study`}
      >
        <svg
          className={`w-3 h-3 transition-transform duration-slow ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {expanded ? "Collapse case study" : "Read full case study"}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div
          id={`case-study-${project.id}`}
          className="pt-3 mt-1 border-t border-white/8"
        >
          <ProjectEntry
            project={project}
            industry={industry}
            direction="next"
            expandedTags={false}
            maxTags={6}
          />
        </div>
      )}
    </article>
  );
});

const FeaturedCaseStudies = forwardRef<HTMLElement, FeaturedCaseStudiesProps>(
  function FeaturedCaseStudies({ projects }, ref) {
    const { ref: revealRef, visible } = useScrollReveal(0.08);

    return (
      <section
        ref={(el) => {
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
          (revealRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        id="case-studies"
        className="relative py-16 sm:py-20"
        aria-label="Featured case studies"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div
            className={`
              mb-10 sm:mb-12
              transition-all duration-slower
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <p
              className="text-2xs text-white/25 mb-2"
              style={{ letterSpacing: "var(--tracking-caps)" }}
              aria-hidden="true"
            >
              01 · FEATURED WORK
            </p>
            <h2
              className="text-xl sm:text-2xl font-bold text-white"
              style={{ letterSpacing: "var(--tracking-tight)" }}
            >
              Top Healthcare Case Studies
            </h2>
            <p className="text-sm text-white/45 mt-2 max-w-lg">
              Enterprise-scale systems serving real patients at real hospitals — built, led, and maintained in production.
            </p>
          </div>

          {/* Cards grid — items-start prevents card stretching when one expands */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-start">
            {projects.map((project, i) => (
              <CaseStudyCard
                key={project.id}
                project={project}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* Resume CTA below case studies */}
          <div
            className={`
              mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3
              transition-all duration-slower delay-[300ms]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            `}
          >
            <span className="text-sm text-white/30">Want the full professional summary?</span>
            <a
              href="/Muhammad-Aditia-Farhan-Resume.pdf"
              download
              className="
                text-sm text-white/55 hover:text-white/80
                flex items-center gap-1.5
                border border-border-1 hover:border-border-2
                rounded-btn px-3 py-1.5
                transition-all duration-fast
                focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
              "
              aria-label="Download 2026 Resume PDF"
            >
              <svg className="w-3.5 h-3.5" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Resume
            </a>
          </div>

        </div>
      </section>
    );
  }
);

export default FeaturedCaseStudies;
