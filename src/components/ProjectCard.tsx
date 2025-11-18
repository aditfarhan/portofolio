import React, { memo } from "react";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  isCompact?: boolean;
}

const ProjectCard = memo(function ProjectCard({
  project,
  isCompact = false,
}: ProjectCardProps) {
  return (
    <article
      className={`group bg-card border border-token rounded-lg ${
        isCompact ? "p-3" : "p-4"
      } flex flex-col ${
        isCompact ? "gap-1" : "gap-2"
      } card-floating shimmer-card`}
    >
      <header>
        <h3
          className={`${
            isCompact ? "text-sm" : "text-base"
          } font-semibold text-[var(--primary)]`}
        >
          {project.title}
        </h3>
        {project.tagline ? (
          <p
            className={`${
              isCompact ? "text-xs" : "text-sm"
            } text-muted clamp-2`}
          >
            {project.tagline}
          </p>
        ) : null}
      </header>

      <p className={`${isCompact ? "text-xs" : "text-sm"} text-muted clamp-3`}>
        {project.description}
      </p>

      {project.highlights?.length ? (
        <ul className="reveal list-disc pl-4 text-xs text-muted space-y-1 mt-1">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      ) : null}

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-1 mt-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-xs py-0.5 px-1.5 rounded-md bg-[color-mix(in_srgb,var(--muted)_30%,transparent)] text-muted border border-[color-mix(in_srgb,var(--muted)_50%,transparent)]"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {project.links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs py-1 px-2 rounded-md border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] transition-colors"
              aria-label={(l.label ?? l.type) + " (opens in new tab)"}
              title={(l.label ?? l.type) + " (opens in new tab)"}
            >
              {l.label ?? l.type}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
});

export default ProjectCard;
