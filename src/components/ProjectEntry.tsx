import { memo } from "react";
import type { Project } from "@/types";

interface ProjectEntryProps {
    project: Project;
    direction?: "next" | "prev";
}

const ProjectEntry = memo(function ProjectEntry({
    project,
    direction = "next",
}: ProjectEntryProps) {
    return (
        <article
            className={[
                "project-entry",
                "animate-project-focus",
                direction === "prev" ? "is-prev" : "is-next",
                "max-w-[60ch]",
            ].join(" ")}
        >
            {/* HEADER */}
            <header className="entry-header">
                <h3 className="entry-title">{project.title}</h3>
                <span className="entry-context">{project.tagline}</span>
            </header>

            {/* BODY */}
            <div className="entry-body">
                <div className="entry-section">
                    <span className="entry-label entry-label--active">
                        Decision
                    </span>
                    <p className="entry-text entry-text--primary">
                        {project.decision}
                    </p>
                </div>

                <div className="entry-section entry-section--delayed">
                    <span className="entry-label">
                        Outcome
                    </span>
                    <p className="entry-text">
                        {project.outcome}
                    </p>
                </div>
            </div>

            {/* TECH */}
            {project.tags?.length ? (
                <div className="entry-tech">
                    {project.tags.join(" • ")}
                </div>
            ) : null}
        </article>
    );
});

export default ProjectEntry;
