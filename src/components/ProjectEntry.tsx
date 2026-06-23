import { memo } from "react";
import type { Project, LinkType } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProjectEntryProps {
  project: Project;
  industry?: string;
  direction?: "next" | "prev";
  expandedTags?: boolean;
  maxTags?: number;
  onExpandTags?: () => void;
  onCollapseTags?: () => void;
}

const LINK_ICONS: Record<LinkType, string> = {
  github: "icon-github",
  demo: "icon-external",
  docs: "icon-docs",
  npm: "icon-npm",
  storybook: "icon-storybook",
  article: "icon-article",
  design: "icon-design",
  video: "icon-video",
  "case-study": "icon-case-study",
};

const LINK_LABELS: Record<LinkType, string> = {
  github: "GitHub",
  demo: "Live demo",
  docs: "Docs",
  npm: "npm",
  storybook: "Storybook",
  article: "Article",
  design: "Design",
  video: "Video",
  "case-study": "Case study",
};

const DIRECTION_CLASS = {
  next: "is-next",
  prev: "is-prev",
} as const;

const ProjectEntry = memo(function ProjectEntry({
  project,
  industry = "Other",
  direction = "next",
  expandedTags = false,
  maxTags = 5,
  onExpandTags,
  onCollapseTags,
}: ProjectEntryProps) {
  const periodLabel = project.period
    ? `${formatDate(project.period.start)} – ${formatDate(project.period.end ?? "")}`
    : null;

  const allTags = project.tags ?? [];
  const visibleTags = expandedTags ? allTags : allTags.slice(0, maxTags);
  const hiddenCount = allTags.length - maxTags;
  const hasLinks = (project.links ?? []).length > 0;
  const hasHighlights = (project.highlights ?? []).length > 0;

  // Split impact on · separator — each part becomes its own colored chip
  const impactChips = project.impact
    ? project.impact.split(" · ").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <article
      className={[
        "project-entry",
        "animate-project-focus",
        DIRECTION_CLASS[direction],
        "w-full",
      ].join(" ")}
      data-industry={industry}
      aria-label={project.title}
    >
      {/* ── COMPANY + PERIOD ROW ──────────────── */}
      <div className="entry-meta-row">
        {project.company && (
          <div className="entry-company">{project.company}</div>
        )}
        {periodLabel && (
          <span
            className="entry-period"
            aria-label={`Project period: ${periodLabel}`}
          >
            {periodLabel}
          </span>
        )}
      </div>

      {/* ── TITLE ─────────────────────────────── */}
      <h3 className="entry-title">{project.title}</h3>

      {/* ── IMPACT CHIPS — visual identity zone ─
          Each · segment becomes its own colored chip.
          Color is keyed by industry via data-industry on the article.
      ──────────────────────────────────────────── */}
      {impactChips.length > 0 && (
        <div className="entry-impact-chips" aria-label="Project impact">
          {impactChips.map((chip) => (
            <span key={chip} className="entry-impact-chip">
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* ── HIGHLIGHTS — bullet achievements ─────────────────
          First: most impressive content visible without scrolling.
      ──────────────────────────────────────────────────────── */}
      {hasHighlights && (
        <ul className="entry-highlights" aria-label="Key highlights">
          {project.highlights!.map((h, i) => (
            <li key={i} className="entry-highlight">
              <span className="entry-highlight-dot" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ── CONTEXT — only shown when no highlights ──── */}
      {!hasHighlights && project.description && (
        <p className="entry-context">
          {project.description}
        </p>
      )}

      {/* ── BODY — decision & outcome ──── */}
      {(project.decision || project.outcome) && (
        <div className="entry-body">
          {project.decision && (
            <div className="entry-section entry-section--decision">
              <span className="entry-label entry-label--decision">Decision</span>
              <p className="entry-text entry-text--primary">{project.decision}</p>
            </div>
          )}

          {project.outcome && (
            <div className="entry-section entry-section--outcome">
              <span className="entry-label entry-label--outcome">Outcome</span>
              <p className="entry-text">{project.outcome}</p>
            </div>
          )}
        </div>
      )}

      {/* ── TECH CHIPS — +N expand/collapse ──── */}
      {allTags.length > 0 && (
        <div className="entry-tech">
          {visibleTags.map((tag) => (
            <span key={tag} className="entry-tag">
              {tag}
            </span>
          ))}
          {!expandedTags && hiddenCount > 0 && (
            <button
              onClick={onExpandTags}
              className="entry-tag entry-tag--expand"
              aria-label={`Show ${hiddenCount} more technologies`}
            >
              +{hiddenCount} more
            </button>
          )}
          {expandedTags && hiddenCount > 0 && (
            <button
              onClick={onCollapseTags}
              className="entry-tag entry-tag--expand"
              aria-label="Show fewer technologies"
            >
              − less
            </button>
          )}
        </div>
      )}

      {/* ── PROJECT LINKS ──── */}
      {hasLinks && (
        <div className="entry-links" role="list" aria-label="Project links">
          {project.links!.map((link) => (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="entry-link"
              aria-label={link.label ?? LINK_LABELS[link.type]}
              data-tooltip={link.label ?? LINK_LABELS[link.type]}
              role="listitem"
            >
              <svg className="w-3.5 h-3.5" aria-hidden="true">
                <use href={`/icons.svg#${LINK_ICONS[link.type]}`} />
              </svg>
              <span className="entry-link-label">
                {link.label ?? LINK_LABELS[link.type]}
              </span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
});

export default ProjectEntry;
