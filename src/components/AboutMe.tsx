"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { portfolio, PROFILE_STATS, CONTACT_LINKS } from "@/data/portfolio";
import { useCountUp, useShineEffect } from "@/hooks";

interface AboutMeProps {
  onToggleFlip?: () => void;
  isAnimating?: boolean;
}

const RESUME_LINK = CONTACT_LINKS.find((l) => l.download);

// What I Build — 4 categories in a 2×2 grid
const BUILD_FOCUS = [
  {
    title: "Healthcare Platforms",
    desc: "HIS, EMR, inpatient workflows, clinical documentation, and discharge summaries.",
    span: "col-span-2",
    prominent: true,
  },
  {
    title: "Interoperability",
    desc: "SATUSEHAT, HL7 FHIR, legacy database integration, and data validation.",
    span: "col-span-2",
    prominent: true,
  },
  {
    title: "Enterprise Systems",
    desc: "HCIS, secretariat platforms, employee data, and corporate workflows.",
    span: "col-span-2",
    prominent: false,
  },
  {
    title: "Scalable Architecture",
    desc: "React, Next.js, Docker, Kubernetes, CI/CD, feature flags, and design systems.",
    span: "col-span-2",
    prominent: false,
  },
];

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Zustand", "Tailwind CSS", "Storybook"],
  },
  {
    label: "Backend",
    skills: ["Laravel", "Node.js", "Express.js", "PostgreSQL", "MySQL", "REST API", "GraphQL"],
  },
  {
    label: "Infra",
    skills: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "MinIO", "HashiCorp Vault"],
  },
  {
    label: "Healthcare",
    skills: ["HIS/EMR", "SATUSEHAT", "HL7 FHIR", "Unleash", "Healthcare Interoperability"],
  },
];

const LEADERSHIP_SKILLS = [
  "Sprint planning",
  "Architecture reviews",
  "Code reviews",
  "Mentorship",
  "Stakeholder alignment",
  "Technical documentation",
  "Risk mitigation",
  "Production stability",
];

const HOW_I_WORK = [
  "Clarify business and clinical workflow requirements first.",
  "Design scalable frontend architecture and API contracts.",
  "Reduce release risk with feature flags and staged rollouts.",
  "Document architecture decisions and implementation tradeoffs.",
  "Mentor engineers through code review and pairing sessions.",
  "Optimize for long-term maintainability, not only delivery speed.",
];

const AboutMe = memo(function AboutMe({
  onToggleFlip,
  isAnimating = false,
}: AboutMeProps) {
  const [mounted, setMounted] = useState(false);
  const [countTriggered, setCountTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { handleShine } = useShineEffect();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let pendingTimeout: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountTriggered(false);
          if (pendingTimeout) clearTimeout(pendingTimeout);
          pendingTimeout = setTimeout(() => setCountTriggered(true), 120);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (pendingTimeout) clearTimeout(pendingTimeout);
    };
  }, []);

  const handleExplore = useCallback(() => {
    if (isAnimating || !onToggleFlip) return;
    onToggleFlip();
  }, [isAnimating, onToggleFlip]);

  const counts = useCountUp(
    PROFILE_STATS.map((s) => s.value),
    900,
    countTriggered
  );

  const projectCount = portfolio.projects.length;

  return (
    <section
      ref={sectionRef}
      className="
        interactive-card relative flex-1
        flex flex-col gap-2.5
        px-5 py-4 sm:px-6 sm:py-5
      "
      role="region"
      aria-label="About Muhammad Aditia Farhan"
    >
      {/* ── HERO HEADING + BIO ──────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <h2
          className={`
            text-sm sm:text-base
            font-semibold leading-snug text-white
            transition-all duration-slower
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Senior Software Engineer building{" "}
          <em className="font-semibold not-italic text-foreground">
            nationwide HIS/EMR platforms
          </em>{" "}
          and enterprise healthcare systems.
        </h2>

        <p
          className={`
            text-2xs sm:text-xs text-white/55 leading-relaxed
            transition-all duration-slower delay-50
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}
        >
          Jakarta-based engineer with 5+ years across healthcare, logistics, e-commerce, and telecom.
          Lead engineer for a nationwide HIS/EMR platform deployed across 12+ hospitals, covering
          thousands of daily clinical transactions and full inpatient workflows.
        </p>
      </div>

      {/* ── STATS ──────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        {/* Single accessible text node — one clean read for AT and crawlers */}
        <span className="sr-only">
          {PROFILE_STATS.map(s => `${s.value}${s.suffix} ${s.label}`).join(", ")}
        </span>

        {/* Visual animated stats — entirely hidden from AT to prevent duplication */}
        <div
          aria-hidden="true"
          className={`
            flex items-center gap-0
            transition-all duration-scene delay-100
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {PROFILE_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center min-w-[2.5rem]">
                <span className="about-stat-value">
                  {counts[i]}{stat.suffix}
                </span>
                <span className="about-stat-label">
                  {stat.label}
                </span>
              </div>
              {i < PROFILE_STATS.length - 1 && (
                <div className="about-stat-divider about-stat-divider--breathe" />
              )}
            </div>
          ))}
        </div>

        <div
          className={`
            h-px w-full
            bg-gradient-to-r from-white/25 via-white/25 to-transparent
            transition-all duration-scene delay-150 origin-left
            ${mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
          aria-hidden="true"
        />
      </div>

      {/* ── WHAT I BUILD ──────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <p
          className="text-2xs text-white/25 uppercase"
          style={{ letterSpacing: "var(--tracking-caps)" }}
          aria-hidden="true"
        >
          What I build
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {BUILD_FOCUS.map((item, idx) => (
            <div
              key={item.title}
              onMouseMove={handleShine}
              className={`
                group shine-card ${item.span} relative
                rounded-lg border
                px-2.5 py-2 sm:px-3 sm:py-2
                cursor-default
                transition-all duration-slow ease-out
                hover:-translate-y-[2px]
                active:translate-y-0 active:scale-[0.99]
                ${item.prominent
                  ? "border-white/25 bg-surface-2 hover:border-white/38 hover:bg-surface-hover hover:shadow-lg"
                  : "border-border-1 bg-surface-1 hover:bg-surface-2 hover:border-border-2"
                }
              `}
              style={{ transitionDelay: `calc(${idx} * var(--duration-instant))` }}
            >
              <span
                className="absolute top-1.5 right-2 text-2xs text-white/25 font-mono select-none"
                aria-hidden="true"
              >
                {`0${idx + 1}`}
              </span>
              <div className="
                absolute inset-0 rounded-lg pointer-events-none opacity-0
                group-hover:opacity-100 transition-opacity duration-slower
                bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),var(--surface-hover),transparent_60%)]
              " />
              <p
                className={`
                  relative font-semibold leading-tight
                  transition-all duration-slow
                  group-hover:-translate-y-[1px]
                  ${item.prominent
                    ? "text-white/88 text-xs sm:text-sm group-hover:text-white"
                    : "text-white/70 text-xs group-hover:text-white/88"
                  }
                `}
                style={{ letterSpacing: "var(--tracking-tight)" }}
              >
                {item.title}
              </p>
              <p
                className={`
                  relative mt-0.5 leading-snug
                  transition-all duration-slow delay-[var(--duration-instant)]
                  group-hover:-translate-y-[1px]
                  ${item.prominent
                    ? "text-white/55 text-2xs sm:text-xs group-hover:text-white/70"
                    : "text-white/38 text-2xs sm:text-2xs group-hover:text-white/55"
                  }
                `}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW I WORK ────────────────────────────────── */}
      <div
        className={`
          flex flex-col gap-1
          transition-all duration-slower delay-150
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
      >
        <p
          className="text-2xs text-white/25 uppercase"
          style={{ letterSpacing: "var(--tracking-caps)" }}
          aria-hidden="true"
        >
          How I work
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 list-none p-0 m-0">
          {HOW_I_WORK.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-2xs text-white/45 leading-snug">
              <span className="text-accent/60 flex-shrink-0 mt-0.5" aria-hidden="true">›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── SKILLS ────────────────────────────────────── */}
      <div
        className={`
          flex flex-wrap gap-x-4 gap-y-2
          transition-all duration-slower delay-200
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
        aria-label="Core technologies and skills"
      >
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <span className="about-skill-group-label about-skill-group-label--enhanced">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-1">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className={[
                    "about-skill-chip",
                    group.label === "Frontend"
                      ? "ring-1 ring-white/18 text-white/88"
                      : group.label === "Healthcare"
                        ? "ring-1 ring-white/12 text-white/70"
                        : group.label === "Infra"
                          ? "opacity-70"
                          : "",
                  ].join(" ")}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Engineering Leadership */}
        <div className="flex flex-col gap-1 w-full">
          <span className="about-skill-group-label about-skill-group-label--enhanced">
            Leadership
          </span>
          <div className="flex flex-wrap gap-1">
            {LEADERSHIP_SKILLS.map((skill) => (
              <span key={skill} className="about-skill-chip opacity-60">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="flex flex-col items-start gap-2 mt-auto">
        {/* Primary CTA — opens healthcare case studies */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExplore}
            disabled={isAnimating}
            className="
              group
              about-cta-btn about-cta-btn--weighted
              w-full sm:w-auto
              flex items-center justify-center sm:justify-start gap-2
            "
            aria-label={`View ${projectCount} case studies — starting with HIS/EMR platform`}
          >
            <span className="relative overflow-visible">
              View Healthcare Case Studies
              <span
                className="
                  absolute left-0 -bottom-0.5 h-px w-full
                  bg-white/38 scale-x-0 origin-left
                  transition-transform duration-slower
                  group-hover:scale-x-100
                "
                aria-hidden="true"
              />
            </span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-slow group-hover:translate-x-1.5"
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Secondary CTA — resume download */}
          {RESUME_LINK && (
            <a
              href={RESUME_LINK.href}
              download={RESUME_LINK.download}
              className="
                text-xs text-white/45 hover:text-white/70
                flex items-center gap-1.5
                transition-colors duration-fast
                focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2 focus-visible:rounded
              "
              aria-label="Download 2026 Resume PDF"
            >
              <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </a>
          )}
        </div>

        <span className="text-2xs text-white/30" style={{ letterSpacing: "var(--tracking-caps)" }}>
          Open to Software Engineer · Senior Frontend · Healthcare IT · Technical Lead roles
        </span>
      </div>

    </section>
  );
});

export default AboutMe;
