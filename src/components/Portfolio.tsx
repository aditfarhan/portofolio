import {
  portfolio,
  type PortfolioData,
  type Project,
  type Experience,
} from "@/data/portfolio";

type Props = {
  data?: PortfolioData;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group bg-card border border-token rounded-lg p-5 flex flex-col gap-3 card-floating">
      <header>
        <h3 className="text-lg font-semibold text-[var(--primary)]">
          {project.title}
        </h3>
        {project.tagline ? (
          <p className="text-sm text-muted clamp-2">{project.tagline}</p>
        ) : null}
      </header>

      <p className="text-sm text-muted clamp-3">{project.description}</p>

      {project.highlights?.length ? (
        <ul className="reveal list-disc pl-5 text-sm text-muted space-y-1 mt-1">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      ) : null}

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {project.links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline h-9 px-3 text-sm"
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
}

function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <li className="bg-card border border-token rounded-lg p-5 card-floating">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h4 className="font-semibold">{exp.role}</h4>
          <p className="text-muted text-sm">{exp.company}</p>
        </div>
        <div className="text-xs text-muted">
          {exp.period.start} — {exp.period.end ?? "Present"}
        </div>
      </div>

      {exp.location ? (
        <p className="mt-1 text-xs text-muted">Location: {exp.location}</p>
      ) : null}

      {exp.details?.length ? (
        <ul className="mt-3 list-disc pl-5 text-sm text-muted space-y-1">
          {exp.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ) : null}

      {exp.skills?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {exp.skills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export default function PortfolioSection({ data = portfolio }: Props) {
  const p = data;

  return (
    <section id="portfolio" className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h2 className="section-title text-2xl font-bold text-[var(--primary)]">
          Portfolio
        </h2>
        <p className="text-muted">Selected projects</p>
      </header>

      {/* Projects */}
      {p.projects?.length ? (
        <>
          <div className="grid-cards">
            {p.projects.slice(0, 4).map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
          {p.projects.length > 4 ? (
            <div className="mt-4">
              <a href="/portfolio" className="btn btn-gradient">
                See all projects
              </a>
            </div>
          ) : null}
        </>
      ) : (
        <div className="bg-card border border-token rounded-lg p-4 text-muted">
          No projects yet.
        </div>
      )}

      {/* Experience */}
      {p.experience?.length ? (
        <section className="mt-10">
          <h3 className="section-title text-xl font-semibold text-[var(--primary)] mb-3">
            Experience
          </h3>
          <ul className="space-y-3">
            {p.experience.map((exp, idx) => (
              <ExperienceItem key={idx} exp={exp} />
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
