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
  const hasCaseStudyFields = project.scale || project.systemScope || project.complexity;

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

      {/* ── MY ROLE ──────────────────────────── */}
      {project.myRole && (
        <div className="entry-section entry-section--role">
          <span className="entry-label entry-label--role">My Role</span>
          <p className="entry-text entry-text--primary">{project.myRole}</p>
        </div>
      )}

      {/* ── IMPACT CHIPS — visual identity zone ─ */}
      {impactChips.length > 0 && (
        <div className="entry-impact-chips" aria-label="Project impact">
          {impactChips.map((chip) => (
            <span key={chip} className="entry-impact-chip">
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* ── PROBLEM / CONTEXT ─────────────────
          Always shown — even when highlights exist.
          Provides the "why" before the "what."
      ──────────────────────────────────────── */}
      {project.description && (
        <div className="entry-section entry-section--problem">
          <span className="entry-label entry-label--problem">Problem</span>
          <p className="entry-context">{project.description}</p>
        </div>
      )}

      {/* ── SCALE + SCOPE ────────────────────── */}
      {hasCaseStudyFields && (
        <div className="entry-case-study-meta">
          {project.scale && (
            <div className="entry-meta-item">
              <span className="entry-meta-key">Scale</span>
              <span className="entry-meta-val">{project.scale}</span>
            </div>
          )}
          {project.systemScope && (
            <div className="entry-meta-item">
              <span className="entry-meta-key">System scope</span>
              <span className="entry-meta-val">{project.systemScope}</span>
            </div>
          )}
          {project.complexity && (
            <div className="entry-meta-item">
              <span className="entry-meta-key">Complexity</span>
              <span className="entry-meta-val">{project.complexity}</span>
            </div>
          )}
        </div>
      )}

      {/* ── HIGHLIGHTS — key contributions ───── */}
      {hasHighlights && (
        <ul className="entry-highlights" aria-label="Key contributions">
          {project.highlights!.map((h, i) => (
            <li key={i} className="entry-highlight">
              <span className="entry-highlight-dot" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ── BODY — technical decisions & impact ── */}
      {(project.decision || project.outcome) && (
        <div className="entry-body">
          {project.decision && (
            <div className="entry-section entry-section--decision">
              <span className="entry-label entry-label--decision">Technical Decisions</span>
              <p className="entry-text entry-text--primary">{project.decision}</p>
            </div>
          )}

          {project.outcome && (
            <div className="entry-section entry-section--outcome">
              <span className="entry-label entry-label--outcome">Impact</span>
              <p className="entry-text">{project.outcome}</p>
            </div>
          )}
        </div>
      )}

      {/* ── CONFIDENTIALITY NOTE ──── */}
      {project.note && (
        <aside
          className="
            flex items-start gap-2 mt-2
            px-2.5 py-2 rounded border border-white/10 bg-white/3
            text-2xs text-white/38 leading-snug
          "
          aria-label="Confidentiality note"
        >
          <svg
            className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-50"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span>{project.note}</span>
        </aside>
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
