import { RevealSection } from "@/components/RevealSection";

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

export default function WorkProcess() {
  return (
    <RevealSection
      id="process"
      className="relative py-16 sm:py-20"
      aria-label="How I work"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal-header mb-8 sm:mb-10">
          <p className="text-2xs text-white/25 mb-2" style={{ letterSpacing: "var(--tracking-caps)" }} aria-hidden="true">
            04 · PROCESS
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ letterSpacing: "var(--tracking-tight)" }}>
            How I Work
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="reveal-card process-step">
              <span className="process-step-number" aria-hidden="true">{step.number}</span>
              <h3 className="text-sm font-semibold text-white/88 leading-snug" style={{ letterSpacing: "var(--tracking-tight)" }}>
                {step.title}
              </h3>
              <p className="text-xs text-white/52 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </RevealSection>
  );
}
