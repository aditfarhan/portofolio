import React, { memo } from "react";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  isCompact?: boolean;
}

const getIconId = (type: string) => {
  switch (type) {
    case "github":
      return "icon-github";
    case "demo":
      return "icon-demo";
    case "docs":
      return "icon-docs";
    case "npm":
      return "icon-npm";
    case "storybook":
      return "icon-storybook";
    case "article":
      return "icon-article";
    case "design":
      return "icon-design";
    case "video":
      return "icon-video";
    case "case-study":
      return "icon-case-study";
    default:
      return null;
  }
};

const ProjectCard = memo(function ProjectCard({
  project,
  isCompact = false,
}: ProjectCardProps) {
  return (
    <article
      className={`group bg-card border border-token rounded-lg ${
        isCompact ? "p-3" : "p-5"
      } flex flex-col ${
        isCompact ? "gap-1" : "gap-3"
      } card-floating shimmer-card hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all duration-300`}
    >
      <header>
        <h3
          className={`${
            isCompact ? "text-sm" : "text-base"
          } font-semibold text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors`}
        >
          {project.title}
        </h3>
        {project.tagline ? (
          <div className="flex items-start gap-1 mt-2 group/tagline">
            <svg
              className="w-3 h-3 mt-0.5 text-[var(--accent)] opacity-60 flex-shrink-0 group-hover/tagline:opacity-80 group-hover/tagline:scale-110 transition-all duration-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z" />
            </svg>
            <p
              className={`${
                isCompact ? "text-xs" : "text-sm"
              } italic text-[var(--accent)] opacity-80 group-hover/tagline:opacity-100 transition-opacity duration-300`}
            >
              {project.tagline}
            </p>
          </div>
        ) : null}
      </header>

      <div className="relative group/desc">
        <svg
          className="absolute -top-1 -left-1 w-4 h-4 text-[var(--accent)] opacity-30 group-hover/desc:opacity-50 group-hover/desc:scale-110 transition-all duration-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z" />
        </svg>
        <p
          className={`${
            isCompact ? "text-sm" : "text-base"
          } text-muted pl-5 leading-relaxed group-hover/desc:text-[color-mix(in_srgb,var(--foreground)_95%,var(--muted-fg))] transition-colors duration-300`}
        >
          {project.description}
        </p>
      </div>

      {project.highlights?.length ? (
        <div className="space-y-2 mt-3">
          {project.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-md bg-[color-mix(in_srgb,var(--muted)_10%,transparent)] border border-[color-mix(in_srgb,var(--muted)_20%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] transition-all duration-300 hover:scale-[1.01] hover:shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <svg
                className="w-3 h-3 mt-0.5 text-[var(--accent)] opacity-70 flex-shrink-0 animate-pulse"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span className="text-sm text-muted leading-relaxed">{h}</span>
            </div>
          ))}
        </div>
      ) : null}

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-xs py-0.5 px-1.5 rounded-md bg-[color-mix(in_srgb,var(--muted)_30%,transparent)] text-muted border border-[color-mix(in_srgb,var(--muted)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] hover:text-[var(--accent)] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="mt-3 flex flex-wrap gap-1">
          {project.links.map((l, i) => {
            const iconId = getIconId(l.type);
            return (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs py-1 px-2 rounded-md border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] hover:scale-105 transition-all duration-200"
                aria-label={(l.label ?? l.type) + " (opens in new tab)"}
                title={(l.label ?? l.type) + " (opens in new tab)"}
              >
                {iconId && (
                  <svg className="w-3 h-3" aria-hidden="true">
                    <use href={`/icons.svg#${iconId}`} />
                  </svg>
                )}
                {l.label ?? l.type}
                <span className="sr-only">(opens in new tab)</span>
              </a>
            );
          })}
        </div>
      ) : null}
    </article>
  );
});

export default ProjectCard;
