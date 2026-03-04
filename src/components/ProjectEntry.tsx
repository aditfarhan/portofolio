import { memo } from "react";
import type { Project } from "@/types";

interface ProjectEntryProps {
    project: Project;
    direction?: "next" | "prev";
    expandedTags?: boolean;
    maxTags?: number;
    onExpandTags?: () => void;
}

function formatPeriodDate(date: string | null | undefined): string {
    if (!date) return "Present";
    const [year, month] = date.split("-");
    if (!month) return year;
    const monthName = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
        month: "short",
    });
    return `${monthName} ${year}`;
}

const ProjectEntry = memo(function ProjectEntry({
    project,
    direction = "next",
    expandedTags = false,
    maxTags = 5,
    onExpandTags,
}: ProjectEntryProps) {
    const periodLabel = project.period
        ? `${formatPeriodDate(project.period.start)} – ${formatPeriodDate(project.period.end)}`
        : null;

    const allTags = project.tags ?? [];
    const visibleTags = expandedTags ? allTags : allTags.slice(0, maxTags);
    const hiddenCount = allTags.length - maxTags;

    return (
        <article
            className={[
                "project-entry",
                "animate-project-focus",
                direction === "prev" ? "is-prev" : "is-next",
                "w-full",
            ].join(" ")}
            aria-label={project.title}
        >
            {/* ── COMPANY BADGE ─────────────────── */}
            {project.company && (
                <div className="entry-company">{project.company}</div>
            )}

            {/* ── HEADER ────────────────────────── */}
            <header className="entry-header">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="entry-title">{project.title}</h3>
                    {periodLabel && (
                        <span
                            className="entry-period"
                            aria-label={`Project period: ${periodLabel}`}
                        >
                            {periodLabel}
                        </span>
                    )}
                </div>

                {project.impact && (
                    <div className="entry-impact">
                        <span className="entry-impact-dot" aria-hidden="true" />
                        {project.impact}
                    </div>
                )}

                {(project.tagline || project.description) && (
                    <p className="entry-context">
                        {project.tagline ?? project.description}
                    </p>
                )}
            </header>

            {/* ── BODY ──────────────────────────── */}
            <div className="entry-body">
                {project.decision && (
                    <div className="entry-section entry-section--decision">
                        <span className="entry-label entry-label--active">Decision</span>
                        <p className="entry-text entry-text--primary">{project.decision}</p>
                    </div>
                )}

                {project.outcome && (
                    <div className="entry-section entry-section--outcome">
                        <span className="entry-label">Outcome</span>
                        <p className="entry-text">{project.outcome}</p>
                    </div>
                )}
            </div>

            {/* ── TECH CHIPS — with +N more ──────── */}
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
                            +{hiddenCount}
                        </button>
                    )}
                </div>
            )}
        </article>
    );
});

export default ProjectEntry;
