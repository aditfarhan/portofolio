import { RevealAside } from "@/components/RevealSection";

export default function TrustNote() {
  return (
    <RevealAside
      id="trust"
      className="relative pb-6"
      aria-label="Confidentiality note"
      threshold={0.2}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="reveal-card flex items-start gap-3 rounded-lg border border-border-1 bg-surface-1 px-4 py-3.5">
          {/* Lock icon */}
          <svg
            className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/22"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect x="2" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          <p className="text-xs text-white/55 leading-relaxed">
            <span className="text-white/70 font-semibold">Confidentiality-first portfolio. </span>
            Enterprise and healthcare projects are summarized without patient data, private screenshots,
            credentials, or sensitive infrastructure details. Production code and client systems
            remain private by professional obligation.
          </p>
        </div>
      </div>
    </RevealAside>
  );
}
