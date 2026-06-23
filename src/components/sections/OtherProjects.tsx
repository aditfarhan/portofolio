"use client";

import { memo } from "react";
import type { Project } from "@/types";
import { useScrollReveal } from "@/hooks";

interface OtherProjectsProps {
  projects: Project[];
}

const INDUSTRY_MAP: Record<string, string> = {
  "PT. Pertamina Bina Medika IHC": "Healthcare",
  "OrderOnline.id": "Logistics",
  "Orami by SIRCLO": "E-commerce",
  "PT Nexwave (Huawei)": "Telecom",
  "PT Bejana Investidata Globalindo": "Other",
  "Personal Project": "Personal",
  "Freelance": "Personal",
};

const INDUSTRY_COLORS: Record<string, string> = {
  Healthcare: "rgba(74, 222, 128, 0.8)",
  Logistics: "rgba(251, 146, 60, 0.8)",
  "E-commerce": "rgba(244, 114, 182, 0.8)",
  Telecom: "rgba(96, 165, 250, 0.8)",
  Other: "rgba(167, 139, 250, 0.8)",
  Personal: "rgba(148, 163, 184, 0.7)",
};


const OtherProjects = memo(function OtherProjects({ projects }: OtherProjectsProps) {
  const { ref, visible } = useScrollReveal();

  if (projects.length === 0) return null;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="other-projects"
      className="relative py-16 sm:py-20"
      aria-label="Other projects"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`mb-8 sm:mb-10 transition-all duration-slower ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-2xs text-white/25 mb-2" style={{ letterSpacing: "var(--tracking-caps)" }} aria-hidden="true">
            05 · MORE WORK
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ letterSpacing: "var(--tracking-tight)" }}>
            Other Projects
          </h2>
          <p className="text-sm text-white/40 mt-1.5">
            Logistics, e-commerce, telecom, and personal projects across 5+ years.
          </p>
        </div>

        {/* Compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((project, idx) => {
            const industry = INDUSTRY_MAP[project.company ?? ""] ?? "Other";
            const accentColor = INDUSTRY_COLORS[industry] ?? INDUSTRY_COLORS.Other;
            const impactParts = project.impact
              ? project.impact.split(" · ").map((s) => s.trim()).slice(0, 2)
              : [];
            const visibleTags = (project.tags ?? []).slice(0, 4);

            return (
              <article
                key={project.id}
                data-industry={industry}
                className={`
                  other-project-card
                  transition-all duration-slower
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{ transitionDelay: visible ? `${idx * 50}ms` : "0ms" }}
                aria-label={project.title}
              >
                {/* Company row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  {project.company && (
                    <span
                      className="text-2xs font-bold uppercase flex-1 min-w-0 truncate"
                      style={{
                        color: accentColor,
                        letterSpacing: "var(--tracking-caps)",
                        opacity: 0.9,
                      }}
                    >
                      {project.company}
                    </span>
                  )}
                  {project.period && (
                    <span
                      className="text-2xs text-white/35 flex-shrink-0 font-mono tabular-nums"
                      style={{ letterSpacing: "var(--tracking-mono)" }}
                    >
                      {project.period.start.slice(0, 4)}
                      {project.period.end === null ? "–now" : ""}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-semibold text-white/88 leading-snug mb-1.5"
                  style={{ letterSpacing: "var(--tracking-tight)" }}
                >
                  {project.title}
                </h3>

                {/* Impact */}
                {impactParts.length > 0 && (
                  <p className="text-xs text-white/40 mb-2.5 leading-snug">
                    {impactParts.join(" · ")}
                  </p>
                )}

                {/* Tech tags */}
                {visibleTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {visibleTags.map((tag) => (
                      <span key={tag} className="entry-tag text-2xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="entry-tag text-2xs opacity-40">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Live links */}
                {project.links && project.links.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-white/6">
                    {project.links.map((link) => (
                      <a
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-1.5 text-2xs text-white/38
                          hover:text-white/70 transition-colors duration-fast
                          focus-visible:outline-2 focus-visible:outline-white/38 focus-visible:rounded
                        "
                        aria-label={link.label ?? `Visit ${project.title}`}
                      >
                        <svg className="w-2.5 h-2.5" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {link.label ?? "Live →"}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default OtherProjects;
