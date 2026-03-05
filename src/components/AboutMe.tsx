"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import "@/styles/components.css";
import { portfolio, PROFILE_STATS, TESTIMONIALS, HOW_I_WORK } from "@/data/portfolio";
import { useCountUp, useShineEffect } from "@/hooks";

interface AboutMeProps {
  onToggleFlip?: () => void;
  isAnimating?: boolean;
}

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
    span: "col-span-4",
    prominent: false,
  },
];

const SKILL_GROUPS = [
  { label: "Frontend", skills: ["React", "Next.js", "TypeScript"] },
  { label: "Backend", skills: ["Laravel", "Node.js", "PostgreSQL"] },
  { label: "Infra", skills: ["Docker", "Kubernetes"] },
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

  // Re-trigger count-up each time the section enters the viewport
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

  // Single unified rAF loop for all three counters
  const counts = useCountUp(
    PROFILE_STATS.map((s) => s.value),
    900,
    countTriggered
  );

  // Dynamic project count from data
  const projectCount = portfolio.projects.length;

  return (
    <section
      ref={sectionRef}
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
          Build software with long-term{" "}
          <em className="font-semibold not-italic" style={{ color: "rgba(255,255,255,0.95)" }}>
            clarity
          </em>{" "}
          &amp; intent.
        </h2>

        {/* SUPPORTING CONTEXT */}
        <p
          className={`
            mt-1 pl-2 border-l border-white/15
            text-[0.72rem] sm:text-xs
            text-white/50 hover:text-white/65
            transition-all duration-500 delay-75
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}
        >
          Built the EMR platform running across 12+ hospitals nationwide.
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
          {PROFILE_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center min-w-[2.5rem]">
                <span className="about-stat-value">
                  {counts[i]}{stat.suffix}
                </span>
                <span className="about-stat-label">{stat.label}</span>
                {stat.detail && (
                  <span
                    title={stat.detail}
                    className="
                      sm:hidden
                      text-[8px] text-white/40 mt-0.5
                      whitespace-nowrap leading-none
                    "
                    aria-label={stat.detail}
                  >
                    {stat.detail}
                  </span>
                )}
              </div>
              {i < PROFILE_STATS.length - 1 && (
                <div className="about-stat-divider about-stat-divider--breathe" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* AMBIENT DIVIDER */}
        <div
          className={`
            mt-3 h-px w-full
            bg-gradient-to-r from-white/12 via-white/6 to-transparent
            transition-all duration-700 delay-200 origin-left
            ${mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
          aria-hidden="true"
        />
      </div>

      {/* ── MIDDLE BLOCK — PRINCIPLES ───────────────────── */}
      <div className="about-principles-grid grid grid-cols-4 gap-1.5 sm:gap-2 my-2 sm:my-3">

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
            style={{ transitionDelay: `${idx * 60}ms` }}
          >
            {/* Reading-order micro-number */}
            <span
              className="absolute top-1.5 right-2 text-[8px] text-white/20 font-mono select-none"
              aria-hidden="true"
            >
              0{idx + 1}
            </span>
            {/* Always-on subtle mobile glow */}
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
                  : "text-white/65 text-[0.7rem] sm:text-[0.75rem] group-hover:text-white/85"
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
                  ? "text-white/55 text-[0.68rem] sm:text-[0.72rem] group-hover:text-white/70"
                  : "text-white/45 text-[0.65rem] sm:text-[0.68rem] group-hover:text-white/60"
                }
              `}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── TESTIMONIAL (single, rotating in future) ──── */}
      {TESTIMONIALS.length > 0 && (
        <div
          className={`
            px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03]
            mb-2
            transition-all duration-500 delay-250
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <p className="text-[0.65rem] sm:text-[0.7rem] text-white/55 italic leading-snug">
            &ldquo;{TESTIMONIALS[0].quote}&rdquo;
          </p>
          <p className="mt-1 text-[0.6rem] text-white/40">
            — {TESTIMONIALS[0].role}, {TESTIMONIALS[0].company}
          </p>
        </div>
      )}

      {/* ── HOW I WORK (compact) ──── */}
      {HOW_I_WORK.length > 0 && (
        <div
          className={`
            flex gap-2 mb-2
            transition-all duration-500 delay-300
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          {HOW_I_WORK.map((item) => (
            <div
              key={item.title}
              className="flex-1 px-2 py-1.5 rounded border border-white/[0.06] bg-white/[0.02]"
            >
              <p className="text-[0.62rem] sm:text-[0.67rem] font-semibold text-white/60 leading-tight">
                {item.title}
              </p>
              <p className="text-[0.55rem] sm:text-[0.6rem] text-white/40 leading-snug mt-0.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── BOTTOM BLOCK — SKILLS + CTA ─────────────────── */}
      <div className="w-full">

        {/* SKILLS GROUPED */}
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
              <span className="about-skill-group-label about-skill-group-label--enhanced">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={[
                      "about-skill-chip about-skill-chip--interactive",
                      // Primary skills elevated — React, Next.js, TypeScript
                      group.label === "Frontend"
                        ? "ring-1 ring-white/18 text-white/90"
                        // Infra is supporting — slightly dimmer label
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
        </div>

        {/* CTA */}
        <div className="mt-4 sm:mt-5 flex flex-col items-start gap-1">
          <button
            onClick={handleExplore}
            disabled={isAnimating}
            className="
              group
              about-cta-btn about-cta-btn--weighted
              w-full sm:w-auto
              flex items-center justify-center sm:justify-start gap-2
            "
            aria-label={`Browse ${projectCount} projects`}
          >
            <span className="relative overflow-visible">
              See what I&apos;ve built
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
            {/* SVG arrow for crisp DPR rendering */}
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
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

          {/* Dynamic context label */}
          <span className="text-[9px] sm:text-[10px] text-white/40 tracking-wide">
            Healthcare&nbsp;·&nbsp;Logistics&nbsp;·&nbsp;E-commerce
          </span>
        </div>

      </div>
    </section>
  );
});

export default AboutMe;
