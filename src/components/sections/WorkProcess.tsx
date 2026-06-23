"use client";

import { memo } from "react";
import { useScrollReveal } from "@/hooks";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand Workflows",
    desc: "Clarify clinical and business requirements before designing anything. Align with product, clinical, and operational stakeholders.",
  },
  {
    number: "02",
    title: "Design Architecture",
    desc: "Build scalable frontend architecture with clear API contracts, component boundaries, and documented design decisions.",
  },
  {
    number: "03",
    title: "Ship Safely",
    desc: "Use feature flags, staged rollouts, and CI/CD pipelines to reduce release risk across live hospital environments.",
  },
  {
    number: "04",
    title: "Improve Continuously",
    desc: "Document tradeoffs, mentor engineers through code review, and optimize for long-term maintainability over delivery speed.",
  },
] as const;

const WorkProcess = memo(function WorkProcess() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="process"
      className="relative py-16 sm:py-20"
      aria-label="How I work"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`mb-8 sm:mb-10 transition-all duration-slower ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-2xs text-white/25 mb-2" style={{ letterSpacing: "var(--tracking-caps)" }} aria-hidden="true">
            03 · PROCESS
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ letterSpacing: "var(--tracking-tight)" }}>
            How I Work
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className={`
                process-step
                transition-all duration-slower
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
              style={{ transitionDelay: visible ? `${idx * 80}ms` : "0ms" }}
            >
              <span className="process-step-number">{step.number}</span>
              <h3 className="text-sm font-semibold text-white/88 leading-snug" style={{ letterSpacing: "var(--tracking-tight)" }}>
                {step.title}
              </h3>
              <p className="text-xs text-white/45 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default WorkProcess;
