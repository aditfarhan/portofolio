"use client";

import { memo, useCallback, useEffect, useState } from "react";
import "@/styles/profile-card.css";

interface AboutMeProps {
  onToggleFlip?: () => void;
  isAnimating?: boolean;
}

const STATS = [
  { value: 5, suffix: "+", label: "Years" },
  { value: 12, suffix: "+", label: "Hospitals" },
  { value: 3, suffix: "", label: "Industries", detail: "Healthcare · Logistics · E-commerce" },
];

const PRINCIPLES = [
  {
    title: "Explicit trade-offs",
    desc: "Decisions are intentional, documented, and shared with the team.",
    span: "col-span-4",
    prominent: true,
  },
  {
    title: "Maintainable systems",
    desc: "Written for the person who comes after.",
    span: "col-span-2",
    prominent: false,
  },
  {
    title: "Calm execution",
    desc: "Urgency in shipping, not in panic.",
    span: "col-span-2",
    prominent: false,
  },
  {
    title: "Team-first engineering",
    desc: "Code is a team sport. Decisions should be too.",
    span: "col-span-4 sm:col-span-2 sm:col-start-2",
    prominent: false,
  },
];

const SKILL_GROUPS = [
  { label: "Frontend", skills: ["React", "Next.js", "TypeScript"] },
  { label: "Backend", skills: ["Laravel", "Node.js", "PostgreSQL"] },
  { label: "Infra", skills: ["Docker", "Kubernetes"] },
];

function useCountUp(target: number, duration = 900, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

const AboutMe = memo(function AboutMe({
  onToggleFlip,
  isAnimating = false,
}: AboutMeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleExplore = useCallback(() => {
    if (isAnimating || !onToggleFlip) return;
    onToggleFlip();
  }, [isAnimating, onToggleFlip]);

  function handleShine(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  const yearsCount = useCountUp(5, 800, mounted);
  const hospitalsCount = useCountUp(12, 1000, mounted);
  const industriesCount = useCountUp(3, 600, mounted);
  const countValues = [yearsCount, hospitalsCount, industriesCount];

  return (
    <section
      className="
        interactive-card relative
        h-full flex flex-col justify-between
        px-5 py-5 sm:px-6 sm:py-6
      "
      role="region"
      aria-label="About Muhammad Aditia Farhan"
    >
      {/* ── TOP BLOCK ─────────────────────────────────── */}
      <div className="w-full">

        {/* THESIS — PRIMARY ANCHOR */}
        <h2
          className={`
            relative text-sm sm:text-[0.95rem] md:text-[1.0rem] lg:text-[1.1rem]
            font-semibold leading-snug text-white
            transition-all duration-500
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}
        >
          Build software with long-term clarity &amp; intent.
        </h2>

        {/* SUPPORTING CONTEXT */}
        <p
          className={`
            mt-1 text-[0.72rem] sm:text-xs
            text-white/38 hover:text-white/55
            transition-all duration-500 delay-75
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}
        >
          Especially in environments where systems scale — and mistakes compound.
        </p>

        {/* STATS ROW */}
        <div
          className={`
            mt-2.5 sm:mt-3 flex items-center gap-0
            transition-all duration-700 delay-150
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
          aria-label="Career highlights"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center min-w-[2.5rem]">
                <span className="about-stat-value">
                  {countValues[i]}{stat.suffix}
                </span>
                <span className="about-stat-label">{stat.label}</span>
                {/* "3 Industries" context — visible on mobile (no hover); tooltip on desktop */}
                {stat.detail && (
                  <span
                    title={stat.detail}
                    className="
                      sm:hidden
                      text-[8px] text-white/28 mt-0.5
                      whitespace-nowrap leading-none
                    "
                    aria-label={stat.detail}
                  >
                    {stat.detail}
                  </span>
                )}
              </div>
              {i < STATS.length - 1 && (
                <div className="about-stat-divider about-stat-divider--breathe" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* AMBIENT DIVIDER */}
        <div
          className={`
            mt-3 h-px w-[55%]
            bg-gradient-to-r from-white/28 via-white/10 to-transparent
            transition-all duration-700 delay-200 origin-left
            ${mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
          aria-hidden="true"
        />
      </div>

      {/* ── MIDDLE BLOCK — PRINCIPLES ───────────────────── */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 my-2 sm:my-3">
        {PRINCIPLES.map((item, idx) => (
          <div
            key={item.title}
            onMouseMove={handleShine}
            className={`
              group shine-card ${item.span} relative
              rounded-lg border
              px-2.5 py-2 sm:px-3 sm:py-2.5
              cursor-default
              transition-all duration-300 ease-out
              hover:-translate-y-[2px]
              active:translate-y-0 active:scale-[0.99]
              ${item.prominent
                ? "border-white/20 bg-white/[0.07] hover:border-white/30 hover:bg-white/[0.10] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                : "border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.065] hover:border-white/[0.16]"
              }
            `}
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            {/* Always-on subtle mobile border glow — mobile touch has no hover */}
            <div
              className="
                absolute inset-0 rounded-lg pointer-events-none
                sm:opacity-0 opacity-[0.15]
                bg-gradient-to-br from-white/5 to-transparent
              "
              aria-hidden="true"
            />

            {/* Shine overlay on hover */}
            <div className="
              absolute inset-0 rounded-lg pointer-events-none opacity-0
              group-hover:opacity-100 transition-opacity duration-400
              bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.08),transparent_60%)]
            " />

            <p
              className={`
                relative font-semibold leading-tight
                transition-all duration-300
                group-hover:-translate-y-[1px]
                ${item.prominent
                  ? "text-white/90 text-[0.75rem] sm:text-[0.8rem] group-hover:text-white"
                  : "text-white/62 text-[0.7rem] sm:text-[0.75rem] group-hover:text-white/82"
                }
              `}
            >
              {item.title}
            </p>
            <p
              className={`
                relative mt-0.5 leading-snug
                transition-all duration-300 delay-[30ms]
                group-hover:-translate-y-[1px]
                ${item.prominent
                  ? "text-white/48 text-[0.63rem] sm:text-[0.67rem] group-hover:text-white/65"
                  : "text-white/36 text-[0.6rem] sm:text-[0.63rem] group-hover:text-white/52"
                }
              `}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM BLOCK — SKILLS + CTA ─────────────────── */}
      <div className="w-full">

        {/* SKILLS GROUPED — improved label visibility */}
        <div
          className={`
            flex flex-wrap gap-x-4 gap-y-2
            transition-all duration-500 delay-300
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
          aria-label="Core technologies by category"
        >
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              {/* Label: raised to opacity-40, left border for group separation */}
              <span className="about-skill-group-label about-skill-group-label--enhanced">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-1">
                {group.skills.map((skill) => (
                  <span key={skill} className="about-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 sm:mt-5 flex flex-col items-start sm:items-start gap-1">
          <button
            onClick={handleExplore}
            disabled={isAnimating}
            className={`
              group
              about-cta-btn about-cta-btn--weighted
              w-full sm:w-auto
              flex items-center justify-center sm:justify-start gap-2
            `}
            aria-label="View selected work — explore projects"
          >
            <span className="relative overflow-visible">
              See my work
              <span
                className="
                  absolute left-0 -bottom-0.5 h-px w-full
                  bg-white/45 scale-x-0 origin-left
                  transition-transform duration-400
                  group-hover:scale-x-100
                "
                aria-hidden="true"
              />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:opacity-90"
            >
              →
            </span>
          </button>

          {/* Context label below CTA */}
          <span className="text-[9px] sm:text-[10px] text-white/28 tracking-wide">
            Projects&nbsp;·&nbsp;10 works
          </span>
        </div>

      </div>
    </section>
  );
});

export default AboutMe;
