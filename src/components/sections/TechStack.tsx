import { RevealSection } from "@/components/RevealSection";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    accent: true,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Zustand", "Tailwind CSS", "Storybook"],
  },
  {
    label: "Backend",
    accent: false,
    skills: ["Laravel", "Node.js", "Express.js", "PostgreSQL", "MySQL", "REST API", "GraphQL"],
  },
  {
    label: "Infrastructure",
    accent: false,
    skills: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "MinIO", "HashiCorp Vault"],
  },
  {
    label: "Healthcare Systems",
    accent: true,
    skills: ["HIS/EMR", "SATUSEHAT", "HL7 FHIR", "Unleash Feature Flags", "Healthcare Interoperability"],
  },
] as const;

const LEADERSHIP_SKILLS = [
  "Sprint planning",
  "Architecture reviews",
  "Code reviews",
  "Mentorship",
  "Stakeholder alignment",
  "Technical documentation",
  "Risk mitigation",
  "Production stability",
] as const;

export default function TechStack() {
  return (
    <RevealSection
      id="tech-stack"
      className="relative py-16 sm:py-20"
      aria-label="Technical stack and skills"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal-header mb-8 sm:mb-10">
          <p className="text-2xs text-white/25 mb-2" style={{ letterSpacing: "var(--tracking-caps)" }} aria-hidden="true">
            05 · TECHNICAL STACK
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ letterSpacing: "var(--tracking-tight)" }}>
            Core Technologies
          </h2>
        </div>

        {/* Skill groups — 2-column on tablet+, 1-column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="reveal-card flex flex-col gap-2">
              <span className="about-skill-group-label about-skill-group-label--enhanced">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={[
                      "about-skill-chip",
                      group.accent ? "ring-1 ring-white/15 text-white/80" : "",
                    ].join(" ")}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Leadership row */}
        <div className="reveal-card flex flex-col gap-2">
          <span className="about-skill-group-label about-skill-group-label--enhanced">
            Engineering Leadership
          </span>
          <div className="flex flex-wrap gap-1.5">
            {LEADERSHIP_SKILLS.map((skill) => (
              <span key={skill} className="about-skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </RevealSection>
  );
}
