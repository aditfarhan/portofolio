import { RevealSection } from "@/components/RevealSection";

const WORKFLOWS = [
  {
    id: "clinical",
    label: "HIS/EMR — Clinical Workflow",
    desc: "Patient data flow through the nationwide platform from admission to discharge.",
    steps: [
      { label: "Registration", detail: "Patient intake & scheduling" },
      { label: "Assessment", detail: "Triage, vitals & clinical notes" },
      { label: "Orders & Results", detail: "Lab, radiology & pharmacy" },
      { label: "Treatment", detail: "Nursing notes & care plans" },
      { label: "Discharge", detail: "Summary & follow-up care" },
    ],
  },
  {
    id: "satusehat",
    label: "SATUSEHAT — National Health Integration",
    desc: "Compliant data exchange with Indonesia's Ministry of Health national registry.",
    steps: [
      { label: "Hospital DB", detail: "Source systems & records" },
      { label: "Validation", detail: "Data integrity checks" },
      { label: "FHIR Mapping", detail: "HL7 standard transform" },
      { label: "Secure API", detail: "Ministry-compliant exchange" },
      { label: "Sync Monitor", detail: "Retry & audit trail" },
    ],
  },
  {
    id: "release",
    label: "Engineering Release Flow",
    desc: "Safe, controlled deployments across live hospital environments.",
    steps: [
      { label: "Feature Flag", detail: "Controlled exposure via Unleash" },
      { label: "Staging", detail: "Integration & regression validation" },
      { label: "Rollout", detail: "Incremental production deployment" },
      { label: "Monitoring", detail: "Production health & incident alerts" },
    ],
  },
] as const;

function ArrowConnector() {
  return (
    <div className="flex-shrink-0 flex items-start pt-[1.3rem] px-1.5" aria-hidden="true">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="text-white/20">
        <path
          d="M0 4h12M9 1l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

interface StepCardProps {
  step: { label: string; detail: string };
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  return (
    <div
      className="
        self-stretch flex flex-col
        flex-shrink-0 w-[100px] sm:w-[116px]
        bg-surface-1 border border-border-1 rounded-md
        px-2.5 py-2.5
        hover:border-border-2 hover:bg-surface-2
        transition-colors duration-fast
      "
    >
      <div
        className="text-2xs text-white/22 font-mono mb-1.5"
        aria-hidden="true"
        style={{ letterSpacing: "var(--tracking-mono)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div
        className="text-xs font-semibold text-white/80 leading-tight mb-0.5"
        style={{ letterSpacing: "var(--tracking-tight)" }}
      >
        {step.label}
      </div>
      <div className="text-xs text-white/50 leading-snug">{step.detail}</div>
    </div>
  );
}

export default function ArchitectureProof() {
  return (
    <RevealSection
      id="architecture"
      className="relative py-16 sm:py-20"
      aria-label="Architecture and workflow proof"
      threshold={0.08}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="reveal-header mb-10 sm:mb-12">
          <p
            className="text-2xs text-white/25 mb-2"
            style={{ letterSpacing: "var(--tracking-caps)" }}
            aria-hidden="true"
          >
            02 · PROOF OF WORK
          </p>
          <h2
            className="text-xl sm:text-2xl font-bold text-white"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            How These Systems Work
          </h2>
          <p className="text-sm text-white/55 mt-2 max-w-lg">
            Sanitized workflow overviews — no patient data, credentials, or internal infrastructure details.
          </p>
        </div>

        {/* Workflow flows */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {WORKFLOWS.map((workflow) => (
            <div key={workflow.id} className="reveal-card">
              {/* Workflow label */}
              <div className="mb-3">
                <h3
                  className="text-sm font-semibold text-white/80"
                  style={{ letterSpacing: "var(--tracking-tight)" }}
                >
                  {workflow.label}
                </h3>
                <p className="text-xs text-white/50 mt-0.5">{workflow.desc}</p>
              </div>

              {/* Step chain — horizontal scroll on mobile */}
              <div
                className="flex items-stretch -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
                role="list"
                aria-label={`${workflow.label} steps`}
              >
                {workflow.steps.map((step, sIdx) => (
                  <div key={step.label} className="flex items-center" role="listitem">
                    {sIdx > 0 && <ArrowConnector />}
                    <StepCard step={step} index={sIdx} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </RevealSection>
  );
}
