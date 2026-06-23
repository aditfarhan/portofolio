"use client";

import { memo } from "react";
import { useScrollReveal } from "@/hooks";

const TrustNote = memo(function TrustNote() {
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <aside
      ref={ref as React.RefObject<HTMLElement>}
      id="trust"
      className="relative pb-6"
      aria-label="Confidentiality note"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className={`
            flex items-start gap-3 rounded-lg
            border border-border-1 bg-surface-1
            px-4 py-3.5
            transition-all duration-slower
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
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

          <p className="text-xs text-white/42 leading-relaxed">
            <span className="text-white/60 font-semibold">Confidentiality-first portfolio. </span>
            Enterprise and healthcare projects are summarized without patient data, private screenshots,
            credentials, or sensitive infrastructure details. Production code and client systems
            remain private by professional obligation.
          </p>
        </div>
      </div>
    </aside>
  );
});

export default TrustNote;
